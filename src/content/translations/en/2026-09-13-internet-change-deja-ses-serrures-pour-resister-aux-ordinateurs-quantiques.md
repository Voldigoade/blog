---
title: Internet is already changing its locks to resist quantum computers
description: Quantum computers capable of breaking our cryptography don't exist yet. Yet, part of the Web is already preparing for their arrival. And this isn't science fiction.
pubDate: 2026-09-13
draft: false
featured: false
section: computing
contentType: article
tags:
  - cryptographie
  - informatique
  - informatique quantique
  - cybersécurité
  - HTTPS
  - web
  - sécurité
series:
  id: internet-face-au-quantique
  order: 1
  title: The Internet facing the quantum
coverImage: /images/posts/68974f6a-7fbc-457d-bd8d-ebaf89c49a16.png
coverAlt: A digital padlock protected by a new cryptographic layer facing a quantum computer.
author: Voldigoade
locale: en
sourceSlug: 2026-09-13-internet-change-deja-ses-serrures-pour-resister-aux-ordinateurs-quantiques
sourceHash: ed5c2113cfa1343e06de20d8b11ff1fabd554e74e5f8bf8f8655cfa815b16ad5
manual: false
---

Part of the Internet is replacing its locks **before the thief capable of opening them even exists**.

Today, when you connect to a site via HTTPS, make a payment, or exchange sensitive data, part of the security rests on mathematical problems extremely difficult to solve with our classical computers.

The problem is that a sufficiently powerful quantum computer wouldn't play by the same rules.

## The danger isn't the 2026 quantum computer

Current quantum machines are a long way from being able to simply "break the Internet." To break systems like RSA or certain elliptic-curve cryptographies at scale would require fault-tolerant quantum computers far more powerful than those available today.

But waiting for them to exist would be a very bad strategy.

Encrypted data can be **intercepted today, stored for years, then decrypted later** if the technology becomes sufficiently powerful. This is often called *harvest now, decrypt later*.

In other words: a secret stolen in 2026 can still hold value in 2036.

## Post-quantum cryptography already exists

The U.S. NIST standardized in 2024 several algorithms designed to resist both classical computers and future quantum computers, notably **ML-KEM** for key establishment and **ML-DSA** for digital signatures. In 2026, the agency now considers that migration must begin.

And this transition is starting to reach the real Web.

Chrome is working, for example, on a roadmap to make HTTPS authentication resistant to quantum attacks. Google is also experimenting with a new certificate architecture called **Merkle Tree Certificates**, notably with Cloudflare, to prevent post-quantum protections from making connections significantly heavier.

The most fascinating thing isn't, therefore, that a quantum computer could one day threaten the Internet.

It's that **the defense against this hypothetical machine is already being deployed**.

And if the transition succeeds properly, the day genuinely dangerous quantum computers appear, the majority of users may not notice absolutely anything.