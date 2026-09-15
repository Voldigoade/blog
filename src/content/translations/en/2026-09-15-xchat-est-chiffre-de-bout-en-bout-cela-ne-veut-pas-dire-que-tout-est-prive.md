---
title: XChat Is End-to-End Encrypted. That Doesn't Mean Everything Is Private
description: 'The unexplained disappearance of XChat from the App Store draws attention, but its protocol raises a far more interesting question: what does a "private" messaging app actually protect when metadata, key backups, and Grok enter the equation?'
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: review
tags:
  - XChat
  - X
  - chiffrement
  - cybersécurité
  - confidentialité
coverImage: /images/posts/0f35434a-0d9c-4279-9613-5c775deaf868.png
coverAlt: An encrypted XChat conversation protects its content but leaves metadata visible and can transmit a decrypted message to Grok.
author: Voldigoade
locale: en
sourceSlug: 2026-09-15-xchat-est-chiffre-de-bout-en-bout-cela-ne-veut-pas-dire-que-tout-est-prive
sourceHash: da8b4f961a1772c1aec2b2b9e8b54eb10102c99fa7e813ac8b0c0119205c1412
manual: false
---

On September 14, 2026, the XChat app disappears from the App Store.

Search no longer returns it. Its former page becomes inaccessible. MacRumors then updates its article: it appears that **X itself pulled the app**, without explaining why.

On Android, the app remains available. And above all, the Chat service continues to exist within X and on the Web.

We therefore do not know today whether the iOS removal corresponds to a temporary issue, a product decision, a technical change, or something else.

Inventing an explanation would be easy.

But the incident draws attention to a much more interesting and perfectly documented subject:

**what does XChat actually protect?**

The answer is considerably more subtle than "it's encrypted" or "X can read everything".

## Yes, XChat Does Have End-to-End Encryption

Let's start by avoiding a lazy critique.

X explains that on first launch of Chat, a public/private key pair is generated for the user.

Each conversation then gets its own key used to encrypt messages.

The content, links, media, files, and reactions of an encrypted conversation are encrypted **before leaving the sender's device**, remain encrypted on X's infrastructure, and are decrypted on the recipient's device.

This is therefore not a simple TLS tunnel to X's servers misleadingly presented as privacy.

For conversations marked as encrypted, there really is an E2EE architecture.

And X had its protocol audited by a third-party firm, with a public report referenced in its own documentation.

The serious question is therefore not:

> "Is this real encryption?"

It is:

> **"Where exactly are the boundaries of this encryption?"**

That is far more instructive.

## X Can Still Know Who Is Talking to Whom

Encryption protects **content**.

It does not mask all metadata.

X explicitly states that information such as **the recipient and the message creation time are not encrypted**. The platform also keeps a record when an X post is shared through an encrypted conversation.

This illustrates a central distinction in privacy.

Suppose no one can read this conversation:

```
— On se retrouve à 22 h ?
— Oui.

```

An operator can nevertheless know:

```
Compte A → Compte B
22:03

```

then:

```
Compte B → Compte A
22:04

```

On a single conversation, this seems almost insignificant.

Over several months, metadata can reveal social graphs, habits, activity periods, and relationship frequency.

**An encrypted message is not an invisible message.**

## The Most Important Technical Weakness Is Acknowledged Directly by X

The documentation contains an unusually explicit section:

**Forward secrecy.**

And X states clearly that its current system does not have it.

If a registered device's private key is compromised, an attacker could decrypt **all encrypted messages sent or received by that device**. X states it is working on key rotation to introduce a form of forward secrecy later.

To understand why this matters, imagine two systems.

### System A

Alice and Bob always use a key capable of unlocking their entire history.

An attacker steals this key in 2028.

They can potentially decrypt their recorded conversations from 2026, 2027, and 2028.

### System B

Keys continuously evolve such that old keys are destroyed or become useless.

An attacker compromises the device today.

They can cause damage from now on, but they do not automatically recover two years of history.

That is the goal of *forward secrecy*.

Its absence does not mean XChat is "broken".

It means that **the temporal impact of a key compromise is much greater**.

For a messaging app presenting itself as particularly private, this is a substantial limitation.

## But X Doesn't Simply Store Your Private Key in Plaintext

Conversely, saying:

> "X keeps your key on its servers, so the encryption is useless"

would also be false.

X uses the open-source **Juicebox** protocol to enable multi-device recovery.

The private key is split into several fragments stored in three *realms*. Two use HSMs, hardware modules designed to perform cryptographic operations while protecting their secrets.

At least **two out of three fragments** are needed to reconstruct the key, with at least one fragment coming from a hardware-protected realm.

The user's PIN never leaves the device.

The hardware realms also enforce a cryptographic limit of **20 incorrect attempts** before rendering fragments unusable. X claims this construction prevents even the company from simply brute-forcing all PIN codes until finding the right one.

This is a considerably more interesting architecture than "password + key in a database".

## There Remains a Concentration of Trust

Today, **all three Juicebox realms are operated by X**.

This is an important nuance.

This does not mean X magically possesses everyone's reconstructed keys: the PIN protection, HSMs, and protocol are precisely designed to avoid this.

But the cryptographic separation is not yet accompanied by complete organizational separation.

X states it wants in the future to allow the use of realms operated by different organizations.

That would be interesting because trust could then become truly distributed.

A three-vault architecture is more convincing when the three vaults don't all belong to the same owner.

## Some Conversations Start Without Encryption

Another detail the UI should make impossible to ignore:

**message requests can be unencrypted**.

When a user contacts someone who hasn't yet accepted the encrypted conversation, X indicates that the initial request remains unencrypted until acceptance.

Grok is also used to classify certain of these requests between the "Priority" and "Hidden" boxes.

This is not necessarily a design catastrophe.

But it is exactly the kind of boundary that makes the generic phrase:

> "My XChat messages are encrypted"

insufficiently precise.

The correct phrase is:

> **"The content of my conversations marked as encrypted benefits from end-to-end encryption, under the conditions defined by the protocol." **

It's less pretty on a poster.

It's much more accurate.

## "Ask Grok" Voluntarily Opens the Box

XChat contains an extremely revealing feature: **Ask Grok**.

You can select a message or image from a conversation and ask Grok to analyze it.

X then specifies something fundamental:

once this content is transmitted to Grok, **it is no longer encrypted in that context**, even if its original copy remains protected in the conversation.

This does not constitute a cryptographic weakness.

It is a logical consequence.

An AI cannot analyze text it is refused access to.

But it is an excellent illustration of a principle often forgotten:

> **End-to-end encryption protects a path. It does not protect data after the user decides to hand it to another recipient.**

If Alice sends a secret to Bob in a perfectly encrypted messenger and Bob copies it into Grok, ChatGPT, an email, or a public document, no cryptographic protocol can go back in time.

Privacy always has an application boundary.

## Even Grok Companion Creates a Special Case

X's documentation also specifies that exchanges with a Grok companion may be transmitted through an encrypted layer, but that **Grok must necessarily decrypt the message to understand and respond to it**.

Again: this is not proof of deception.

It's architecture.

But it shows why an interface combining private messaging and artificial intelligence will need to become extremely clear on **who constitutes the final recipient**.

Between:

```
Alice → Bob

```

and:

```
Alice → Grok

```

the word "encrypted" can appear in both cases.

The privacy property is not the same, however.

## So Is XChat Secure?

There is no serious answer to this question without specifying **against what**.

Against someone simply intercepting network traffic?

End-to-end encryption provides important protection.

Against a compromise of message storage servers?

The fact that content remains encrypted there strongly reduces this risk.

Against metadata observation by X?

No: these are not fully encrypted.

Against future theft of a private key?

Protection is currently weaker than a system with forward secrecy, since X acknowledges that a compromised key can expose the device's history.

Against analysis of a message voluntarily sent to Grok?

No, by definition.

Against an attacker simply trying millions of PINs on the recovery infrastructure?

Juicebox and HSMs are precisely designed to make this approach impractical.

This is what a **threat model** is: you don't ask if something is "secure" in the absolute. You ask which adversaries, which capabilities, and which scenarios the system is designed to withstand.

## The App Store Removal Is Ultimately the Least Interesting Part

At the time of writing, we still don't know why the standalone XChat app disappeared from the App Store.

Perhaps we'll learn tomorrow it was a mundane distribution issue.

Perhaps not.

But the event will at least have had one merit: drawing attention to a messenger whose technical documentation is far more interesting than the superficial debate "Can Elon Musk read my messages?".

The real answer is made of layers.

The content of encrypted conversations is protected.

Metadata is not all protected.

Initial requests may be in the clear.

Key backup uses an elaborate cryptographic construction, but all realms are currently operated by X.

Forward secrecy is not yet present.

And a message handed to Grok must necessarily exit its cryptographic envelope to be processed.

None of these statements, taken alone, correctly describes XChat.

Together, they show something more general:

**privacy is not a switch set to ON or OFF.**

It is a set of properties.

And "end-to-end encrypted" is only one of them.