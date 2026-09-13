---
title: How a Quantum Computer Could Break RSA Without "Testing All Passwords"
description: It is often repeated that a quantum computer can break a part of our cryptography. But how exactly? The real danger does not come from an absurdly fast machine; it comes from an algorithm that completely changes the way to attack the problem.
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
  title: The Internet to the Quantum
coverImage: /blog/images/posts/8c6ab339-ddae-4116-b264-2455d5ef0f4d.png
coverAlt: Representation of a quantum computer analyzing the mathematical structure of a RSA key.
author: Voldigoade
locale: en
sourceSlug: 2026-09-13-comment-un-ordinateur-quantique-pourrait-casser-rsa-sans-essayer-tous-les-mots-de-passe
sourceHash: 4d8d5f383ebda170a015f984fd59be61dec51ec51c0c756f3cca874ae25c146c
manual: false
---

Saying that a quantum computer will be able to “break RSA” easily gives a bad image of the problem.

You could imagine a machine so powerful that it would try billions of keys to find the right one.

It is not that.

The real problem is much more interesting: **A sufficiently advanced quantum computer could use a mathematical method that our classical computers don’t know how to efficiently exploit.**

And everything is based on a weakness voluntarily chosen fifty years ago.

## RSA protects a secret with a easy problem in one direction, difficult in the other.

Let’s take two first numbers:

`61 × 53 = 3233`

The multiplication is trivial.

But imagine now that I only give you:

`3233`

And I ask you:

> What first numbers were multiplied to this result?

With such a small number, you’ll find it quickly. `61` and `53`.

RSA applies essentially the same idea, but with giant numbers.

A modern RSA key can use a module of **by 2048 bits**A number that has approximately **617 decimal numbers**.

Multiplying the two major first numbers that make up it is easy for a computer.

To find these factors from the result is, with the best known classic methods, extremely difficult when the parameters are correctly selected.

It is this imbalance that makes RSA useful.

Not because factorization is impossible.

Because it is considered as **Improper to the required scale** with our classical computers.

## Peter Shor is coming.

In 1994, the mathematicist Peter Shor published an algorithm for quantum computers.

And this algorithm radically changes the problem.

The Shor algorithm allows, in theory, to effectively factorize large numbers on a sufficiently powerful quantum computer.

It is still not to try each combination one by one.

It turns factorization into another problem: **Find the period of a mathematical function**.

This is exactly where the quantum mechanics occurs.

A classic computer manipulates the bits that are worth `0` or `1`.

A quantum computer can manipulate the **by qubits**The state of which can be a superposition of several possibilities. But pay attention to the often repeated shortcut: this does not mean that a quantum computer “tests all the answers at the same time and reads the right.”

If this was so simple, almost all computer problems would become instantly easy.

What makes Shor powerful is much more subtle.

The algorithm prepares a quantum state containing a particular mathematical structure, and then uses the **Transformed by Quantum Fourier** The periodicity that is sought. A measure then allows to obtain sufficient information to reconstruct this period.

And this period can lead to the number factors.

This makes it greatly simplified:

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

Therefore, cryptography is not defeated by more brute force.

**He overlooked the difficulty on which he stood.**

## Why this threatens RSA

In RSA, the public key can be known to everyone.

That is even his role.

What must remain inaccessible is the private key.

But the public parameters contain a number built from two large first secret numbers. If an attacker succeeds to effectively factor this number, he can find the information necessary to reconstruct the private key.

From there, according to the use of RSA, the consequences can become serious: signature falsification, compromise of authentication mechanisms or data decryption when the protocol directly depends on RSA.

This is why the possible arrival of a quantum computer **Cryptographically relevant** reliable and powerful enough to execute this type of attack on a useful scale constitutes a real cybersecurity problem.

The NIST explicitly considers RSA as well as several elliptical curves-based systems as vulnerable to this future calculation model and organizes their gradual replacement with post-quantic standards. The current US goal is to gradually remove vulnerable algorithms from the standards. **2035**The most sensitive systems must migrate earlier. 

## So why has no one yet broken RSA-2048 with a quantum computer?

Because between **The algorithm exists.** and **“We have the machine capable of executing it.”**There is a hole.

Current qubits are weak.

They are extremely sensitive to noise and errors. The longer and more complex a quantum calculation becomes, the more difficult it becomes to maintain the information correctly.

The proposed solution is the **Correction of quantum errors** Use many imperfect physical qubits to build a smaller number of qubs *Logic*reliable enough to carry out long calculations.

This significantly increases the necessary equipment.

That’s why today’s small quantum experimental computers can’t simply get a RSA-2048 key and break it a few seconds later.

The NIS is talking about a **by CRQC**, *Cryptographically relevant quantum computer* A quantum computer that is powerful enough to actually attack the cryptographic systems that are currently used. The time when such a machine will exist remains unknown. 

## It’s not just RSA.

RSA is an excellent way to understand the problem, but Shor also threatens another fundamental family of modern cryptography: the **Elliptical curves**.

They are found in signature and key exchange systems.

The mathematical problem is different from factorization, but Shor also knows how to effectively solve the problem. **The discreet logarithm** which these mechanisms are based on.

This is an important distinction.

When we say that “the quantum will break the current encryption”, we make it greatly simplified.

Not all cryptographs are affected in the same way.

Public key algorithms such as RSA and ECC are concerned.

Simetric algorithms, such as AES, are not destroyed by Shor in this way. Other quantum algorithms, including that of Grover, can reduce their security margin, but increasing the size of the keys makes it much easier to compensate for the problem.

The future, therefore, is not to give up any cryptography.

It consists in **Replacement of Mathematical Foundations**.

## The substitute exists.

In 2024, the NIST completed its first three major post-quantic cryptography standards:

- **by KEM**to establish shared secrets;

- **by ML-DSA**for digital signatures;

- **by SLH-DSA**another family of signatures based on hashing functions.

Unlike RSA, their mathematical foundations are chosen to resist known quantum attacks.

The NIST now explicitly recommends starting migration rather than waiting for the hypothetical arrival of a dangerous machine. 

Chrome has even already deployed a post-quantic hybrid key exchange for some compatible TLS connections. And Chromium is now preparing the much more complex part: making it also **Authentication of HTTPS Certificates** Resistant to quantum. 

That’s why this transition begins years before the supposed appearance of the threat.

A global cryptographic infrastructure is not replaced by pressing a button.

It is necessary to modify browsers, servers, libraries, operating systems, embedded devices, certification authorities, protocols and software sometimes intended to remain active for decades.

The computer capable of breaking RSA-2048 may not yet exist.

**The algorithm that explains how he could do so, he has existed since 1994.**

That is the difference that forces the Internet to prepare its defense now.

