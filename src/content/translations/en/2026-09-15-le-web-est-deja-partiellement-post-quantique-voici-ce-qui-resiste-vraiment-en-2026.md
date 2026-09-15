---
title: 'The Web Is Already Partially Post-Quantum: Here''s What Actually Holds Up in 2026'
description: Chrome, Cloudflare, and major TLS stacks already protect part of your connections against future quantum computers. But key exchange, encryption, certificates, and the path to the origin server are not all at the same stage.
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: research
tags:
  - cryptographie post-quantique
  - TLS 1.3
  - ML-KEM
  - X25519MLKEM768
  - Chrome
  - Cloudflare
  - NIST
  - cryptographie
coverImage: /images/posts/2348668a-d80a-4b1e-95bf-8120f40f14a5.png
coverAlt: A browser communicates with a CDN then an origin server, with only certain portions of the connection represented as protected by post-quantum cryptography.
author: Voldigoade
news: false
seoTitle: 'TLS post-quantique en 2026 : ce qui protège déjà réellement le Web'
seoDescription: Chrome et Cloudflare utilisent déjà ML-KEM dans TLS. Voici exactement quelles parties d’une connexion HTTPS résistent déjà à un futur ordinateur quantique et lesquelles restent vulnérables.
seoTargetQuery: TLS post-quantique 2026
locale: en
sourceSlug: 2026-09-15-le-web-est-deja-partiellement-post-quantique-voici-ce-qui-resiste-vraiment-en-2026
sourceHash: 8a9750813cd32eacb922885cf2f5a415d1f7de7e6b8268fb294b293e8fbf52a0
manual: false
---

You open a site in Chrome. The padlock or its modern equivalent tells you nothing special. The page loads just like yesterday. Yet, in some cases, a few milliseconds earlier, your browser just executed a cryptographic primitive designed specifically to resist a machine that doesn't exist yet.

Not a "quantum computer" in the general sense: those already exist. What's still missing is a **cryptographically relevant quantum computer**, large enough, reliable enough, and error-corrected enough to run the attacks capable of breaking the RSA keys and elliptic curves used at Internet scale.

The paradox is therefore real: **the threat isn't operational yet, but its countermeasure is already in production**.

In August 2024, NIST finalized ML-KEM in the FIPS 203 standard. Chrome had started even earlier with a pre-standard version of Kyber; it switched to the standardized ML-KEM version with Chrome 131. OpenSSL 3.5 and Go 1.24 enable it by default in TLS. Cloudflare now claims that over 65% of its human traffic benefits from a post-quantum key agreement. And since August 2026, the IETF has officially entered `X25519MLKEM768` in a Standards Track RFC: [RFC 10024].

The post-quantum Web is therefore no longer a lab project.

But there's a trap in this phrasing: **a connection can be post-quantum in one place and perfectly classical in another**.

And that's where the situation becomes much more interesting.

## The Short Answer: What Already Holds Up When You Open a Site?

In September 2026, a modern HTTPS connection can roughly be broken down into three cryptographic building blocks.


| TLS Component | Role | Typical Situation in 2026 |
| ---------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| Symmetric Encryption | Encrypts data once the session is established | Already considered resistant to known quantum attacks at this scale |
| Key Agreement | Creates the secret used to encrypt the session | **Can already be post-quantum**, notably with `X25519MLKEM768` |
| Authentication | Proves the server is actually the requested site | **Still predominantly classical**, with RSA/ECDSA and a traditional PKI |


Cloudflare explicitly describes TLS along these three components and considers that the urgent migration mainly concerns the last two: key agreement and signatures. The symmetric encryption subsequently used to transport data does not suffer the same theoretical catastrophe as RSA or ECC against Shor's algorithm.

In other words, when a site negotiates `X25519MLKEM768`, **your session secret is already protected against the main scenario worrying cryptographers today: recording your connection now to decrypt it later**.

But the server's identity, generally, is not yet.

This distinction explains almost the entire current migration.

## Why Protect Data Against a Machine That Doesn't Exist Yet?

Suppose a sufficiently powerful actor intercepts a TLS connection today using only X25519.

They can't decrypt it. So they record everything:

- the TLS messages;
- the public exchanges needed for key agreement;
- then the entire encrypted traffic.

They keep this data.

Fifteen years from now, imagine they finally have a quantum computer capable of efficiently running Shor's algorithm against Curve25519.

The ephemeral nature of the X25519 key is no longer sufficient. The public information recorded during the handshake can allow reconstruction of the shared secret, then the traffic keys derived by TLS, and thus decryption of archived communications.

This is the principle of **harvest now, decrypt later**: collect now, decrypt later.

Cloudflare cites precisely this threat as the reason why post-quantum key agreement had to be deployed even before the existence of a quantum computer capable of breaking TLS.

The temporal logic is important.

A company cannot wait for the quantum attack to be demonstrated to start its migration if the information transmitted today must remain confidential for ten or twenty years.

The problem starts **before** the famous "Q-Day".

## RSA and ECC Have a Problem AES Doesn't

Classical public-key cryptography relies in particular on mathematical problems assumed to be extremely hard for ordinary computers.

RSA depends on the difficulty of factoring very large integers.

ECDH and ECDSA rely on the discrete logarithm problem on elliptic curves.

For classical computers, properly chosen parameters remain out of reach.

A sufficiently powerful quantum computer changes the situation radically, however, with Shor's algorithm: these problems don't just become "a bit easier." Their very structure allows a speedup significant enough to render the RSA and ECC families unsuitable for a post-quantum future.

AES is in a different situation.

The generic quantum attack mainly mentioned against symmetric keys is Grover's algorithm, which theoretically offers a quadratic speedup of exhaustive search, but without the spectacular collapse caused by Shor against RSA or ECC. NIST also points out that practical costs, the difficulty of parallelizing Grover, and the enormous quantum resources required make the naive interpretation "AES-128 simply becomes 64 bits" far too simplistic. NIST currently continues to consider AES-128, AES-192, and AES-256 usable.

That's why the Web isn't replacing every component of TLS.

It's replacing **the most exposed asymmetric cryptography** first.

## ML-KEM Is Not "Quantum Encryption"

Post-quantum cryptography can give a misleading impression: that you'd need a quantum computer to use it.

It's exactly the opposite.

ML-KEM runs on the ordinary processors already equipping phones, servers, and computers.

It's called *post-quantum* because the mathematical problem its security rests on has, to our knowledge, no efficient classical **or quantum** algorithm comparable to Shor.

ML-KEM stands for **Module-Lattice-Based Key-Encapsulation Mechanism**. It derives from CRYSTALS-Kyber and its security is linked to *Module Learning With Errors* problems: very schematically, it manipulates high-dimensional algebraic structures to which carefully chosen noise is added. Recovering the secret information from the public data becomes an extremely hard mathematical problem.

NIST standardized three parameter sets:

- ML-KEM-512;
- ML-KEM-768;
- ML-KEM-1024.

ML-KEM-768 is the one encountered today in the Web's main hybrid mechanism.

And contrary to its sometimes simplified name in interfaces or articles, ML-KEM is not directly your web page's encryption.

Its work happens **before**.

It allows two machines to forge a shared secret.

This secret will then be used by TLS to derive the actual symmetric keys that will encrypt the data.

## Why `X25519MLKEM768` Still Contains X25519

A name like `X25519MLKEM768` looks almost contradictory.

X25519 is precisely a classical mechanism vulnerable to a future quantum computer. Why keep it in a solution supposed to prepare for the post-quantum era?

Because the Web doesn't yet fully trust a single new primitive.

`X25519MLKEM768` is a **hybrid key agreement**:

```

```

```
X25519
   +
ML-KEM-768
   ↓
secret hybride
   ↓
TLS 1.3 / HKDF
   ↓
clés de trafic
```

Both mechanisms each produce a secret. RFC 10024 specifies their combination before TLS 1.3 derives its final keys. For `X25519MLKEM768`, you get two 32-byte secrets, i.e., 64 bytes combined.

The point is a form of defense in depth.

If an unexpected weakness is discovered tomorrow in ML-KEM but X25519 remains intact against current classical computers, the migration hasn't made TLS weaker today.

Conversely, if a quantum computer eventually breaks X25519 but ML-KEM holds, the session's future confidentiality remains protected.

The hybrid definition adopted by the IETF precisely aims to preserve security as long as at least one component resists, under the assumptions of the combiner used.

The Web isn't jumping from an old system to a new one hoping everything will be fine.

It runs both in parallel.

## Post-Quantum Protection Takes Much More Space

This caution has an extremely concrete price: bytes.

An ephemeral X25519 public key is only 32 bytes.

In `X25519MLKEM768`, the `key_share` sent by the client contains:

-   
1,184 bytes for the ML-KEM-768 encapsulation key;  

-   
32 bytes for X25519.  


Totaling **1,216 bytes**.

The server's response contains:

-   
1,088 bytes of ML-KEM ciphertext;  

-   
32 bytes of X25519.  


Totaling **1,120 bytes**.

This isn't a detail.

A much larger handshake can reveal network equipment that implicitly assumed a `ClientHello` TLS would stay small.

That's exactly what happened when Chrome started rolling out its first hybrid exchanges: some firewalls, middleboxes, and TLS equipment behaved poorly with the new messages. OpenSSL still warns that the larger `ClientHello` of `X25519MLKEM768` can cause failures or timeouts with incorrectly implemented equipment.

That's also why this migration started years before it became indispensable.

Changing a cryptographic primitive on the Internet isn't just about publishing an algorithm.

You have to discover everything that breaks around it.

## Chrome Turned the Experience into Default Behavior

Chrome's timeline shows the gradual shift from research to infrastructure.

In 2024, Chrome 124 enabled a hybrid exchange using a pre-standard Kyber version by default on desktop.

Then NIST finalized FIPS 203.

The final ML-KEM version not being bit-compatible with the experimental Kyber, Google dropped the old code point `0x6399` and switched Chrome 131 to the new `X25519MLKEM768`, code point `0x11EC`. 

In 2026, it's no longer just documented in a blog post.

Current Chromium code directly places:

```

```

```
X25519MLKEM768
X25519
P-256
P-384
```

in its list of supported groups by default, with a `key_share` sent for `X25519MLKEM768`. 

This is an important status change.

Post-quantum cryptography is no longer something Chrome "might optionally do."

It's part of the normal path.

## The Server Ecosystem Followed

A compatible browser obviously isn't enough.

For the final key agreement to be hybrid, the server must also understand `X25519MLKEM768`.

This condition becomes much less exceptional than a few years ago.

Go 1.24, released in February 2025, added ML-KEM to its standard library and enabled `X25519MLKEM768` by default in `crypto/tls`. 

OpenSSL 3.5, released in April 2025 and becoming an LTS branch, added ML-KEM, ML-DSA, and SLH-DSA. `X25519MLKEM768` sits at the top of its default TLS list. 

Cloudflare reported as early as October 2025 that recent versions of major browsers as well as stacks like OpenSSL and Go had enabled the hybrid mechanism by default. In April 2026, the company indicated that over **65% of human traffic to its network** already used a post-quantum key agreement. 

Then, in August 2026, a more discreet but symbolic change occurred: the IETF published **RFC 10024**.

`X25519MLKEM768` is no longer just a widely deployed construction before the standardization process finished: the IETF classifies it as a recommended group for TLS 1.3. 

In this specific case, industrial deployment almost preceded the final standard's stamp.

## So Is My HTTPS Post-Quantum?

Let's take a very concrete case.

You use a recent Chrome.

You visit a domain served by Cloudflare over TLS 1.3.

Cloudflare indicates that all sites and APIs transiting through its network have supported hybrid post-quantum key agreement on the visitor side since October 2022. With a compatible client, the browser and Cloudflare's edge can therefore negotiate `X25519MLKEM768`. 

At that moment, **the confidentiality of this first connection indeed benefits from a hybrid post-quantum session secret**.

A passive eavesdropper recording traffic today shouldn't be able to simply wait for a quantum computer breaking X25519 to reconstruct the session, provided ML-KEM holds as expected.

But that still doesn't let you write:

> "My connection to the site is fully post-quantum."

Because at least two questions are missing.

## The Site's Certificate Is Probably Still Classical

TLS doesn't just have to create a secret key.

It also has to solve a more fundamental problem:

**who did you just create this key with?**

That's the role of server authentication and the Web PKI.

Today, a classic HTTPS certificate still generally relies on RSA or ECDSA signatures, directly or somewhere in its certification chain.

That's a different weakness.

The `harvest now, decrypt later` risk mainly concerns the confidentiality of present sessions. A signature doesn't encrypt data: recording it today doesn't magically let you read traffic later.

However, once a cryptographically relevant quantum computer actually exists, breaking classical authentication primitives could allow forging or compromising cryptographic identities and carrying out active attacks.

This is where a connection with an ML-KEM key agreement but RSA/ECDSA authentication reveals its limit.

It can be **resistant to retrospective decryption**, while not yet being **fully resistant to an active quantum adversary**.

Chromium explicitly acknowledges this in its roadmap published in February 2026: the browser is working on post-quantum authentication, but the process requires several steps before it can eliminate classical authorities and keys. As long as a client still accepts a classical authentication path, a future quantum adversary can seek to attack that weaker path. 

This is probably the most important distinction of this entire migration:

**post-quantum key exchange ≠ fully post-quantum HTTPS.**

## Cloudflare Is Only Now Starting to Replace Signatures

The contrast between the two migrations is particularly visible at Cloudflare.

Post-quantum key agreement already exists at scale.

Post-quantum authentication is just beginning.

In July 2026, Cloudflare announced support for **ML-DSA**, the post-quantum signature algorithm defined by NIST in FIPS 204, for certain authentication scenarios between its network and origin servers. 

But its current documentation is explicit: **post-quantum authentication between the visitor's browser and Cloudflare's edge remains in development**. The company now targets 2029 for full post-quantum security across its range, including authentication. 

We therefore already have two cryptographic generations overlaid in the same handshake:

```

```

```
Confidentialité de la session
X25519 + ML-KEM-768
        ↓
déjà post-quantique hybride

Authentification du site
RSA / ECDSA / PKI classique
        ↓
encore majoritairement pré-quantique
```

This intermediate architecture isn't an anomaly.

It's a strategy.

Old data confidentiality forces action before Q-Day. Authentication, on the other hand, becomes catastrophic mainly when an attacker actually possesses the machine capable of forging identities.

It was therefore rational to migrate the first earlier.

## There's Another Invisible Frontier: the CDN

Even this browser ↔ server analysis can be misleading.

Many sites don't establish their TLS connection directly with their true application server.

Take Cloudflare again.

For a request not served from cache, there can be at minimum:

```

```

```
Navigateur
    │
    │ TLS A
    ▼
Edge Cloudflare
    │
    │ réseau Cloudflare
    ▼
Infrastructure Cloudflare
    │
    │ TLS B
    ▼
Serveur d'origine
```

Suppose TLS A uses `X25519MLKEM768`.

This proves that **the connection between your browser and Cloudflare** benefits from a hybrid agreement.

It doesn't automatically prove that TLS B, between Cloudflare and the site's real server, benefits from the same property.

Cloudflare supports post-quantum agreement to origins, but the origin server must also be compatible. Its documentation explicitly distinguishes the three segments and indicates that the last segment's protection depends on the origin's PQC support. 

This is a consequence rarely visible from a browser:

**a site's post-quantum status isn't necessarily a single property of the domain. It's a property of each cryptographic link traversed by the data.**

A CDN can terminate a post-quantum connection then open a classical one behind it.

The first remains useful: an eavesdropper between you and the CDN can't simply store this session to break it later.

But the potential existence of another classical segment shifts the collection surface.

## What If the Site Doesn't Use Cloudflare?

Everything then depends on the two endpoints.

A recent Chrome knows how to offer `X25519MLKEM768`.

If the server also supports it, TLS 1.3 can select it.

If the server doesn't support it, the browser still has classical groups like X25519 and the connection can fall back to those.

That's precisely the role of hybridization and negotiation: enabling a gradual migration without immediately making the billions of services that haven't migrated yet inaccessible.

But this compatibility also creates an uncomfortable reality.

**Having a post-quantum browser doesn't mean all your connections are.**

The server matters.

The TLS version matters.

Any intermediaries matter.

And each independent connection matters.

Cloudflare specifies, for example, that its post-quantum mechanisms are used on **TLS 1.3**-based protocols, including HTTP/3. 

## Why Not Drop X25519 Immediately?

One could imagine a much simpler migration:

replace X25519 with ML-KEM and never speak of the old system again.

That would be more elegant.

It would also be riskier.

A new algorithm can suffer from an unknown mathematical weakness, but also from a simple implementation flaw: timing leak, bad random generation, validation error, or side channel.

Kyber's own history provides a useful reminder with implementation vulnerabilities like KyberSlash, which affected various libraries without meaning Kyber's mathematical principle was broken. Cloudflare explicitly cited this type of risk among its reasons for keeping a hybrid construction. 

Hybridization costs bandwidth and complexity.

But it buys something precious during a cryptographic migration: **time without irreversible commitment**.

## The Web Started Before the Standard Was Even Finished

This is perhaps the most unusual aspect of this story.

In many fields, one imagines the following sequence:

```

```

```
recherche
→ standard
→ implémentation
→ déploiement
```

Here, the timeline partly overlapped.

Chrome and Cloudflare were already testing Kyber on real traffic while its standardization wasn't finished.

NIST published FIPS 203 in August 2024.

Chrome then replaced the experimental variant with ML-KEM.

Go and OpenSSL integrated it into their defaults in 2025.

The majority of human traffic measured by Cloudflare crossed the post-quantum threshold the same year.

And the IETF didn't publish RFC 10024 officially standardizing the hybrid TLS groups until **August 2026**. 

The standard didn't precede all operational experience.

It also benefited from it.

Middlebox issues, message sizes, real implementation behavior, and incompatibilities were discovered on an Internet where the primitive was already in use.

It's less clean than a theoretical switchover.

It's probably more realistic for infrastructure of this scale.

## The Padlock Now Tells Only Part of the Story

For a long time, users could reasonably reduce TLS to two questions:

does the site use HTTPS?

is the certificate valid?

The post-quantum migration makes this representation insufficient.

Two connections showing the exact same browser interface can now present different guarantees.

One might use:

```

```

```
TLS 1.3
X25519
ECDSA
AES-GCM
```

and the other:

```

```

```
TLS 1.3
X25519MLKEM768
ECDSA
AES-GCM
```

On screen, almost nothing changes.

For a classical attacker today, both can be extremely robust.

For a hypothetical adversary recording sessions to later have a quantum computer, they are not equivalent, however.

The second connection already contains a primitive precisely designed to make that strategy fail.

## In 2026, "Post-Quantum" Must Therefore Be Qualified

Saying a site is simply "quantum-safe" hides too much information.

A technically correct description should specify **what** is post-quantum.

For a modern HTTPS connection, four questions suffice:

1.   
does the key agreement use `X25519MLKEM768` or another PQ mechanism?  

2.   
does server authentication still use RSA/ECDSA or a post-quantum signature?  

3.   
is there a CDN or TLS proxy that splits the connection into multiple segments?  

4.   
do subsequent segments to the origin server also use a post-quantum agreement?  


Only when all important answers become post-quantum does the expression "fully post-quantum connection" begin to be defensible.

And we're not there yet on the public Web.

## What's Actually Protected Today

The answer to the initial question is ultimately quite precise.

**When you open a site in 2026 with a recent browser, your connection's content can already benefit from post-quantum protection against future decryption if the server negotiates** `X25519MLKEM768`**.**

Chrome offers it by default. Major server stacks now know how to do it. Cloudflare activates it at scale. The IETF formally standardized it in August 2026. 

Data is then transported with symmetric algorithms like AES-GCM or ChaCha20-Poly1305, which don't suffer the structural break Shor inflicts on RSA and ECC. 

But **the server's cryptographic identity remains generally anchored in a classical PKI**, and not all segments behind a CDN are necessarily post-quantum.

The 2026 Web is therefore in a much stranger state than a simple "before/after."

It already uses the cryptography of the future to protect the secrets of the present, while continuing to trust an identity infrastructure designed for the old world.

The post-quantum transition won't arrive the day the computer capable of breaking RSA appears.

**It has already started and for part of your traffic, it's already finished.**