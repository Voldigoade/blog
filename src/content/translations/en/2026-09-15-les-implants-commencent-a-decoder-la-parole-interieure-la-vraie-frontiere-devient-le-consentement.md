---
title: Implants begin decoding inner speech. The real frontier becomes consent
description: Two advances published almost simultaneously show brain-computer interfaces capable of restoring speech, gestures, and even imagined speech. Their next problem may no longer be decoding more, but knowing when not to listen.
pubDate: 2026-09-15
draft: false
featured: false
section: science
contentType: research
tags:
  - neurosciences
  - BCI
  - neurotechnologie
  - intelligence artificielle
  - vie privée
  - paralysie
  - interfaces cerveau-machine
coverImage: /images/posts/0413b833-dd8a-42e2-940d-c9d74e71e1a4.png
coverAlt: A brain-computer interface transforms certain intentional neural signals into speech and gestures while leaving others private.
author: Voldigoade
locale: en
sourceSlug: 2026-09-15-les-implants-commencent-a-decoder-la-parole-interieure-la-vraie-frontiere-devient-le-consentement
sourceHash: be135b5628002c250ce04a8a3e9c1144cbd637d5ad8a5c3554e09db6b140d2b6
manual: false
---

On September 14, 2026, two different stories about brain-computer interfaces converged.

At UCSF, researchers published the first demonstration of a cortical implant capable of decoding **speech and gestures simultaneously** to animate an avatar.

The same day, Paradromics revealed that the first participant in its long-term trial had been able to converse through her implant, including when she **simply imagined speaking**.

Taken separately, these are two technical advances.

Placed side by side with recent work on inner speech, they herald something deeper: we are gradually being forced to define technologically the boundary between **a thought intended to become communication and a thought intended to remain private**.

## A single implant to restore more than a voice

The UCSF study, published in *Nature Neuroscience*, involves three people with severe paralysis using high-density ECoG implants placed on the surface of the sensorimotor cortex.

Communication brain-computer interfaces had until now mostly handled capabilities separately: decoding a speech attempt, moving a cursor, recognizing a movement.

But a human does not communicate like a dialog box.

We speak while nodding. We emphasize with our hands. We refuse with a gesture. A bodily expression can complete, contradict, or replace a sentence.

Edward Chang's team therefore tried to decode these behaviors in parallel.

Two participants piloted a personalized avatar capable of displaying text corresponding to decoded speech while reproducing gestures derived from brain activity.

This seems almost obvious once achieved.

It was not at all obvious for the brain.

## Speaking and making a gesture is not the addition of two independent signals

The brain representations used for speech and body movements are not perfectly isolated.

Researchers observed partially overlapping areas of activity. Above all, models trained only when participants spoke *or* made a gesture performed less well when both behaviors were attempted simultaneously.

In other words:

> "speech + gesture" is not exactly equal to "speech signal + gesture signal".

Context changes the representation.

The team obtained better results by giving the model examples of isolated **and simultaneous** behaviors, then also teaching it to recognize when the other modality should remain inactive.

This observation goes beyond this particular experiment.

A future general-purpose brain interface probably cannot be built as a collection of small, perfectly independent decoders—one for speaking, another for moving the hand, another for controlling a mouse.

The brain was not organized to simplify our software architectures.

## No, the implant did not simply "achieve 100% accuracy"

One participant, Bravo-1r, did indeed achieve a **median accuracy of 100% for speech and gestures** during three conversational blocks.

But her experimental vocabulary comprised only five spoken expressions and four gestures.

For Bravo-6, who worked with ten sentences, ten gestures, and up to one hundred speech-gesture combinations, real-time conversation reached an average of **75% for speech and 85% for gestures**.

These results are remarkable.

They do not mean that an implant now understands all human sentences and movements with perfect accuracy.

The study itself describes a **proof of concept**, with small command sets, three participants total, and largely individualized models. The authors still cite vocabulary size, latency, generalization, and the need for studies on more patients among the next challenges.

It is precisely because the real technology is already impressive that it does not need to be exaggerated.

## Paradromics tackles another piece of the problem

Paradromics' approach is different.

In June 2026, the company and the University of Michigan durably implanted the first Connexus system as part of the FDA-authorized Connect-One clinical trial.

The implant uses a high-density intracortical array. Signals are routed to a transceiver implanted at the chest level before being transmitted **wirelessly through the skin** to an external receiver.

This is a major practical difference.

A BCI meant to become a daily device cannot forever depend on a lab full of cables.

The FDA moreover authorized Paradromics, on August 26, to prepare the connection of its system with **compatible personal laptops, tablets, and phones**, rather than limiting it to a computing environment provided by the company.

The goal is starting to look less like an experiment and more like a new computer input layer.

## Then comes imagined speech

The first participant in the Connect-One study is a woman with a motor neuron disease that makes her speech extremely difficult.

Paradromics states that its implant enabled her to produce text and synthetic voice during spontaneous real-time conversations.

Even more remarkable: the system also managed to produce speech when she **imagined what she wanted to say without physically trying to speak**. Results were slightly less clean than during speech attempts or whispering.

Here, a scientific boundary must be placed immediately.

These performances were announced by Paradromics and reported from its clinical trial. **They have not yet been the subject of a peer-reviewed publication comparable to the UCSF study.**

The standard of proof is therefore not the same.

But the technological direction is credible, because Paradromics does not arrive in a scientific vacuum.

## Inner speech was already decodable

In 2025, a study published in *Cell* had directly studied this problem with four BCI-equipped participants.

Researchers found that **inner speech**—the act of mentally pronouncing something without trying to articulate it—was strongly represented in the motor cortex.

Imagined sentences could be decoded in real time. More troubling, certain inner speech elements could also be recovered in tasks where participants had not been explicitly instructed to communicate, such as counting or sequence recall.

We are still extremely far from a machine capable of arbitrarily rummaging through everything someone thinks.

But this experiment already destroys a comfortable hypothesis:

**"If I don't try to communicate, the decoder can't capture anything exploitable."**

That is no longer entirely true.

## We must stop talking about "mind reading"

The expression is seductive and scientifically poor.

A BCI does not receive an abstract sentence floating somewhere in the brain.

It measures neural activity patterns and learns their statistical relationships with carefully defined behaviors or states: articulation attempt, inner speech, motor intention, imagined movement.

It must be calibrated. It makes mistakes. Performance varies between people. Experimental vocabularies remain constrained.

It cannot open your brain like a file and search for:

> "bank password"

or:

> "embarrassing memory from 2017".

The right question is therefore not:

**"Can we read all thoughts?"**

But:

**"Which set of cognitive states becomes sufficiently observable for a computer to act on them?"**

This formulation is less spectacular.

It is much more important.

## The future problem will be distinguishing four things

As these systems progress, four states may become technologically neighboring while being humanly radically different:

1. I physically attempt to pronounce a sentence;
2. I voluntarily imagine this sentence to transmit it to the BCI;
3. I talk to myself internally without wanting to communicate;
4. I listen to someone speak.

For an algorithm, these states produce signals presenting certain common relationships.

For us, the difference corresponds simply to **intention and consent**.

An interface sensitive enough to decode the second state must therefore be designed not to confuse the third with it.

And researchers are already working on this question.

## The first "mental password" already exists

The 2025 *Cell* study tested a surprisingly elegant solution.

Researchers trained the system to activate inner speech decoding only after detecting a **voluntarily thought keyword by the user**.

For the experiment, they chose a phonetically unusual expression so it would rarely appear by accident. The mechanism allowed locking the decoder until the user had explicitly signaled their intention to speak internally to the machine.

This is still an experimental demonstration.

But philosophically, it is fascinating.

We are already building the neural equivalent of:

> "Hey Siri".

Except it no longer needs to be spoken aloud.

## A BCI perhaps shouldn't try to understand the brain at maximum

The history of computing has accustomed us to a simple idea: the more data a sensor collects, the better.

For a brain interface, this principle becomes dangerous.

The best system will not necessarily be the one that extracts the maximum quantity of neural information.

It will need to possess three different capabilities:

**understand what I want to express;**

**know when I want to express it;**

**correctly ignore everything else.**

The third could become as important as the first two.

Because neural privacy cannot depend solely on a contractual promise that a company won't use certain signals.

The most robust protection consists in technically preventing these signals from becoming exploitable outputs when the user hasn't asked for it.

This is a new way of thinking about privacy:

no longer just controlling who can read data **after its creation**, but controlling which cognitive data becomes computational **in the first place**.

BCIs are beginning to restore a voice to people who lost it. They are beginning to restore their gestures. They could one day become general interfaces with our devices.

Their success will not be measured solely by everything they are capable of hearing.

**The best brain-computer interface might be the one that knows when to stay silent.**