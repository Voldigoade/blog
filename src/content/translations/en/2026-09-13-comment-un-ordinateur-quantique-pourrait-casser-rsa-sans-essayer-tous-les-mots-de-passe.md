---
title: How a quantum computer could break RSA without "trying all the passwords"
description: 'It is often repeated that a quantum computer will be able to break part of our cryptography. But how, exactly? The real danger does not come from an absurdly fast machine: it comes from an algorithm that completely changes the way the problem is attacked.'
pubDate: 2026-09-13
draft: false
featured: false
section: computing
contentType: article
tags:
  - informatique quantique
  - cryptographie
  - RSA
  - algorithme de Shor
  - cybersécurité
  - HTTPS
series:
  id: internet-face-au-quantique
  order: 2
  title: The Internet facing the quantum era
coverImage: /images/posts/8c6ab339-ddae-4116-b264-2455d5ef0f4d.png
coverAlt: Representation of a quantum computer analyzing the mathematical structure of an RSA key.
author: Voldigoade
locale: en
sourceSlug: 2026-09-13-comment-un-ordinateur-quantique-pourrait-casser-rsa-sans-essayer-tous-les-mots-de-passe
sourceHash: 4d8d5f383ebda170a015f984fd59be61dec51ec51c0c756f3cca874ae25c146c
manual: false
---

Saying that a quantum computer will be able to "break RSA" easily gives a misleading picture of the problem.

One might imagine a machine so powerful that it would try billions upon billions of keys until finding the right one.

That is not it.

The real problem is much more interesting: **a sufficiently advanced quantum computer could use a mathematical method that our classical computers do not know how to exploit efficiently.**

And it all rests on a weakness deliberately chosen nearly fifty years ago.

## RSA protects a secret with a problem that is easy in one direction, hard in the other

Let us take two prime numbers:

`61 × 53 = 3233`

Performing the multiplication is trivial.

But now imagine that I give you only:

`3233`

and ask you:

> Which prime numbers were multiplied to obtain this result?

With a number this small, you would quickly find `61` and `53`.

RSA applies essentially the same idea, but with gigantic numbers.

A modern RSA key can use a modulus of **2048 bits**, i.e., a number possessing approximately **617 decimal digits**.

Multiplying the two large prime numbers that compose it is easy for a computer.

Recovering these factors from the result is, with the best known classical methods, extremely difficult when the parameters are correctly chosen.

It is this asymmetry that makes RSA useful.

Not because factorization is impossible.

Because it is considered **impractical at the required scale** with our classical computers.

## Then Peter Shor arrives

In 1994, the mathematician Peter Shor publishes an algorithm intended for quantum computers.

And this algorithm radically changes the problem.

Shor's algorithm allows, in theory, the efficient factorization of large numbers on a sufficiently powerful quantum computer.

It still does not consist of trying each combination one by one.

It transforms factorization into another problem: **finding the period of a mathematical function**.

It is precisely in this step that quantum mechanics intervenes.

A classical computer manipulates bits that are worth `0` or `1`.

A quantum computer manipulates **qubits**, whose state can be a superposition of several possibilities. But beware of the often-repeated shortcut: this does not mean that a quantum computer "tests all the answers at the same time and reads the right one".

If it were that simple, practically all computational problems would become instantly easy.

What makes Shor powerful is much more subtle.

The algorithm prepares a quantum state containing a particular mathematical structure, then uses notably the **quantum Fourier transform** to reveal the sought periodicity. A measurement then allows obtaining enough information to reconstruct this period.

And this period can lead to the factors of the number.

Simplifying enormously:

```text

Grand nombre composé

        ↓

construction d'un problème périodique

        ↓

calcul quantique

        ↓

détection de la période

        ↓

calcul classique

        ↓

facteurs premiers

```

Cryptography is therefore not defeated by more brute force.

**One bypasses the difficulty on which it relied.**

## Why this threatens RSA

In RSA, the public key can be known to everyone.

That is even its role.

What must remain inaccessible is the private key.

Yet the public parameters contain a number constructed from two large secret prime numbers.
If an attacker manages to factor this number efficiently, they can recover the information necessary to reconstruct the private key.

From there, depending on the use of RSA, the consequences can become severe: signature forgery, compromise of authentication mechanisms, or decryption of data when the protocol depends directly on RSA.

This is why the potential arrival of a **cryptographically relevant** quantum computer sufficiently reliable and powerful to execute this kind of attack at a useful scale constitutes a real cybersecurity problem.

The NIST explicitly considers RSA as well as several systems based on elliptic curves as vulnerable to this future computing model and is organizing their gradual replacement by post-quantum standards. The current American objective is to gradually remove vulnerable algorithms from standards by **2035**, with the most sensitive systems needing to migrate earlier.

## So why has no one yet broken RSA-2048 with a quantum computer?

Because between **"the algorithm exists"** and **"we possess the machine capable of executing it"**, there is an abyss.

Current qubits are fragile.

They are extremely sensitive to noise and errors.
The longer and more complex a quantum computation becomes, the more difficult it becomes to correctly maintain the information.

The envisioned solution is **quantum error correction**: using many imperfect physical qubits to build a smaller number of so-called *logical* qubits, sufficiently reliable to perform long computations.

But this enormously increases the hardware required.

This is why today's small experimental quantum computers cannot simply receive an RSA-2048 key and break it a few seconds later.

The NIST also speaks of a **CRQC**, *cryptographically relevant quantum computer*: a quantum computer sufficiently powerful to actually attack the cryptographic systems currently in use.
The moment when such a machine will exist remains unknown.

## And it is not only RSA

RSA is an excellent way to understand the problem, but Shor also threatens another fundamental family of modern cryptography: **elliptic curves**.

They are found notably in signature and key exchange systems.

The mathematical problem is different from factorization, but Shor also knows how to efficiently solve the **discrete logarithm problem** on which these mechanisms rely.

This is an important distinction.

When one says that "quantum will break current encryption," one simplifies enormously.

Not all cryptographies are affected in the same way.

Public-key algorithms like RSA and ECC are particularly concerned.

Symmetric algorithms, like AES, are not destroyed by Shor in this way.
Other quantum algorithms, notably Grover's, can reduce their security margin, but increasing the key size allows compensating for the problem much more easily.

The future therefore does not consist of abandoning all cryptography.

It consists of **replacing certain mathematical foundations**.

## The replacements already exist

In 2024, the NIST finalized its first three major post-quantum cryptography standards:

- **ML-KEM**, intended for establishing shared secrets;
- **ML-DSA**, intended for digital signatures;
- **SLH-DSA**, another family of signatures based on hash functions.

Unlike RSA, their mathematical foundations are chosen to resist known quantum attacks.

The NIST now explicitly recommends beginning the migration rather than waiting for the hypothetical arrival of a dangerous machine.

Chrome has even already deployed a post-quantum hybrid key exchange for certain compatible TLS connections.
And Chromium is now preparing the much more complex part: making **HTTPS certificate authentication** quantum-resistant as well.

This is why this transition begins years before the supposed appearance of the threat.

A global cryptographic infrastructure cannot be replaced by pressing a button.

One must modify browsers, servers, libraries, operating systems, embedded devices, certificate authorities, protocols, and software sometimes intended to remain active for decades.

The computer capable of breaking RSA-2048 may not exist yet.

**The algorithm that explains how it could do so, however, has existed since 1994.**

It is this difference that forces the Internet to prepare its defense now.
