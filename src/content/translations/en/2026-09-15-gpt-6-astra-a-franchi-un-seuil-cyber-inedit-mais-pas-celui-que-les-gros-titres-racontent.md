---
title: GPT-6 Astra Crosses an Unprecedented Cyber Threshold — But Not the One the Headlines Tell
description: 'OpenAI has just classified GPT-6 Astra at the ''Critical'' level in cybersecurity. Behind this spectacular term lies a much more concrete shift: AI is beginning to transition from security assistant to genuine autonomous vulnerability researcher.'
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: article
tags:
  - intelligence artificielle
  - cybersécurité
  - GPT-6 Astra
  - OpenAI
  - Zero-Day
  - sécurité informatique
  - agents IA
coverImage: /images/posts/6135a580-bb11-43a5-b9ef-6b292bf80d6c.png
coverAlt: An artificial intelligence system autonomously analyzes code and computer systems for vulnerabilities.
author: Voldigoade
locale: en
sourceSlug: 2026-09-15-gpt-6-astra-a-franchi-un-seuil-cyber-inedit-mais-pas-celui-que-les-gros-titres-racontent
sourceHash: edf32dcce10394e91c66c2a773e835872730c864af59f84bc665701ae7d75063
manual: false
---

On September 3, 2026, OpenAI used a word that none of its previous models had yet received: **Critical**.

Not "excellent in cybersecurity." Not "expert."

Critical.

The word can easily give the impression that a chatbot has suddenly acquired the power to hack anything on the Internet. That is not what the data shows.

But what the data shows may be more interesting.

For the first time, we are beginning to see an AI capable of conducting genuine vulnerability research for hours on end, exploring multiple leads on its own, discovering unknown flaws, and chaining some of them together to produce a working exploit.

This is a change in nature.

## What "Critical" Actually Means

The term comes from **OpenAI's Preparedness Framework**. It is therefore neither a government certification nor a level universally recognized by the industry.

Under this framework, a model reaches the cyber Critical level if it becomes notably capable of autonomously discovering and developing functional zero-day exploits against numerous heavily secured real-world systems, or of building novel end-to-end attack strategies from a general objective.

A **zero-day**, here, is a vulnerability unknown to those who would normally be responsible for fixing it. The potential attacker therefore has a flaw for which no public patch yet exists.

It is precisely for this reason that a detail of the Astra report deserves far more attention than its results on standard benchmarks.

The AI genuinely found flaws that were not previously known.

## They Gave It a Browser. Then They Let It Search

OpenAI placed Astra in front of widely deployed software in a laboratory environment, notably a browser and an operating system kernel.

The model received the source code, software builds, classic vulnerability research tools, and an objective. Human researchers could monitor the experiment, but not feed it leads to explore.

Astra did, however, have considerable resources at its disposal: Ultra reasoning, Web access, and up to **64 sub-agents**. One should therefore not imagine a simple ChatGPT tab running for five minutes on a laptop.

On the browser, Astra discovered several previously unknown vulnerabilities and built an exploitation chain allowing it to achieve out-of-sandbox code execution.

The first version required approximately **29 hours** of research. The researchers then found that the configuration used lacked certain protections present in the production version. Astra then resumed work and adapted its exploit to the official stable version in approximately **12 additional hours**.

On the operating system kernel, the model also discovered several new vulnerabilities and produced a local privilege escalation exploit in under twelve hours.

This is the part that truly changes the discussion.

An AI that knows security techniques has existed for a long time.

An AI that can pursue a technical investigation on its own for tens of hours until producing a discovery that the humans responsible for the software did not yet know is something else entirely.

## The Benchmarks Tell the Same Story With a Major Caveat

The numbers are impressive.

On **Sandbox Bench**, an internal evaluation composed of 22 vulnerable targets, Astra compromised 10. GPT-5.6 Sol had managed only one.

On **SRE-Bench**, dedicated to reverse engineering binaries without source code, Astra achieves **99.2%** in pass@4 versus 68.7% for Sol, while using roughly four times fewer output tokens.

Even the spectacular perfect score achieved on ExploitBench must, however, be read with caution: OpenAI itself acknowledges that certain historical vulnerabilities may have contaminated the model's training data. A security benchmark becomes far less convincing if the model can simply recognize an exploit encountered during its training.

It is precisely for this reason that the most interesting results are those concerning recent or unknown vulnerabilities.

And why an outside evaluation is particularly useful.

## An Independent Lab Tried to Push It Much Further

The security research firm Irregular also tested Astra.

On its **FrontierCyber** benchmark, which uses real software and hardware, Astra succeeded on **86 out of 226** challenges.

GPT-5.6 Sol: **34 out of 226**.

On CyScenarioBench, which tests longer offensive operations, Astra succeeded at least once on 9 out of 10 scenarios, with an average success rate of 59%.

But here is the figure that prevents turning this story into fantasy:

**neither of the two models succeeded on the seven challenges classified as Elite.**

Irregular also did not observe Astra successfully compromising the fully hardened targets in its evaluation.

This is probably the best description of the current state of the technology.

Astra is not a universal key capable of opening just any system.

It has become good enough to automate a portion of the work that previously required a highly skilled specialist.

The boundary is shifting.

## The Real Change Is Autonomy

We still measure models largely with questions: how many problems solved, how many correct answers, how many lines of code generated.

These measures are beginning to become insufficient.

For cybersecurity, the important metric could soon become much more concrete:

**how many hours and how much money does it take a machine to discover a new exploitable vulnerability?**

A human researcher can spend several days or weeks on a target before finding anything.

A software agent can launch multiple leads simultaneously, abandon those that fail, generate its own tools, read thousands of lines of code, and start over all night long.

It does not necessarily need to become better than the world's best researcher.

It is enough that its cost and research time continue to decrease.

This is where scale becomes dangerously interesting.

A vulnerability discovered by a human is one vulnerability.

A thousand agents searching in parallel across a thousand different projects turn vulnerability research into an industrial process.

## And It Is Also Probably the Defenders' Best Weapon

The paradox is obvious: exactly the same capability allows one to search for a flaw before an attacker finds it.

Cloudflare already announced in September a service using OpenAI's cyber models to examine authorized codebases, validate vulnerabilities, and help apply protections. OpenAI also funds programs where these models are used to examine and fix open source software.

Cybersecurity has always worked this way: offensive and defensive tools share a large portion of their skills.

The problem is now speed.

We have spent years wondering when an AI would be capable of programming correctly.

The next question could be much more concrete:

**what happens when every piece of software published on the Internet can be continuously inspected by thousands of vulnerability researchers who never sleep?**

Astra does not yet provide the answer.

But for the first time, this question no longer really looks like science fiction.