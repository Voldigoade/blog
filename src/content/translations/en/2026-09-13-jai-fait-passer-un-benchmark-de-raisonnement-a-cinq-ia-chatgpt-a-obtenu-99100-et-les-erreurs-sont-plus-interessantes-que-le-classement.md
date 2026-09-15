---
title: 'I Put Five AIs Through a Reasoning Benchmark: ChatGPT Scored 99/100, and the Errors Are More Interesting Than the Ranking'
description: 'I asked GPT-6 Astra to design an original benchmark blending logic, probabilities, causality, software concurrency, optimization, and self-verification. ChatGPT, Gemini, DeepSeek, Kimi, and Grok then took it without access to the answer key. The result isn''t just a ranking: it''s a fairly brutal X-ray of how these models reason, prove… and sometimes persist in their own errors.'
pubDate: 2026-09-13
draft: false
featured: true
section: computing
contentType: research
tags:
  - intelligence artificielle
  - LLM
  - benchmark
  - raisonnement
  - ChatGPT 5.6 Sol
  - Gemini 3.8 Flash
  - DeepSeek V4.1 Flash
  - Kimi K3
  - Grok
coverImage: /images/posts/831d1e06-afc2-40ec-85b9-b809652bb405.png
coverAlt: Five artificial intelligence models confronted with a complex ten-test reasoning benchmark.
author: Voldigoade
locale: en
sourceSlug: 2026-09-13-jai-fait-passer-un-benchmark-de-raisonnement-a-cinq-ia-chatgpt-a-obtenu-99100-et-les-erreurs-sont-plus-interessantes-que-le-classement
sourceHash: 63b338d2d7e0b6cd39186889cfa16729b39f2f741f721d57470329c4152a9414
manual: false
---

There's a problem with a lot of AI comparisons: you ask ten questions, you see which one seems smartest, then you turn that into a definitive ranking.

I wanted something much nastier.

Not a general-knowledge quiz. Not twenty math exercises scraped from the internet. Not a contest where a correct final answer is enough to mask shoddy reasoning.

So I asked **GPT-6 Astra to design a genuine reasoning trial**, with a private answer key prepared before receiving the responses. Then I sent exactly the same benchmark to five systems: **ChatGPT, Gemini, DeepSeek, Kimi, and Grok**.

The raw result is spectacular:

![](/images/posts/62bcea35-2252-40b6-97e4-1c574241a495.png)

But that table is almost the least interesting part of the experiment.

Because GAUNTLET wasn't just measuring whether a model found the right answer. It was trying to see **whether it could demonstrate that the answer was good, resist false leads, manipulate an entirely new system, stay coherent for thousands of words, and detect its own errors before handing in its paper**. The answer key thus allocated 41 points to conclusions, but **49 points to justifications**, to which were added protocol compliance, confidence calibration, and self-audit.

That's precisely where the differences become interesting.

## GAUNTLET: Ten Problems, Almost No Refuge in Memorization

The benchmark comprised ten interconnected sections.

S1 opened with a logic problem involving six bits and five contradictory testimonies. S2 introduced a Bayesian problem in which two seemingly repetitive tests actually shared a hidden cause. S3 moved to causal inference with potential outcomes, confounding, and randomization.

Then the test completely changed terrain.

S4 asked candidates to audit a deliberately defective booking service: concurrency, isolation between users, expirations, idempotency, crashes, linearizability, and stock conservation. This section alone was worth fifteen points.

S5 was a robust optimization problem with an adversary, lotteries, and value of information. S6 then defined **a mathematical system invented for the benchmark**, where models had to understand six bits evolving as they read letters A, B, and C, derive the concatenation law, compute a repetition of gigantic length, then prove the minimum length of a particular word.

S7 reused this system to ask which information could be compressed without losing the power to distinguish two words. S8 mixed task scheduling, shared resources, and an authorization whose validity depended on a strict temporal boundary. S9 scattered multiple policies across the document with versions, signatures, and a fake instruction of the "SYSTEM OVERRIDE" type. Finally, S10 forced the model to revisit several previous results and precisely classify propositions as **PROVEN, REFUTED, or INDETERMINATE**.

This mixture is deliberate.

An AI excellent at calculation but mediocre at reading specifications could fall. An AI excellent at programming but too rushed in its proofs could fall. An AI capable of intuitively finding the right answers but incapable of establishing an optimality bound also lost points.

And above all: **a correct answer was not automatically a good answer**.

## The Detail I Like Most: The Answer Key Existed Before the Candidates

GAUNTLET had a public document and a separate private key.

The answer key fixed the solutions, but also the detailed scoring rubric, acceptable alternatives, half-credit conditions, and rules designed to prevent modifying criteria once papers were received. SHA-256 hashes were also recorded to freeze the documents. The key even provided private scripts to verify certain finite parts of the benchmark: 64 logical states, plan optimization, associativity of the S6 system, several thousand software histories, etc.

This is a fundamental difference from "I ask ChatGPT to grade ChatGPT."

Grading remained partially human for open-ended proofs, but the expected answers and criteria existed **before** knowing who would pass or fail.

This kind of precaution incidentally echoes the concerns of serious evaluations: Stanford presents HELM as a transparent, reproducible framework and publishes prompts and results at the prompt level; OpenAI for its part insists that modern performance depends not only on the model but also on the evaluation harness, the environment, and the configuration that allows it to act.

GAUNTLET is obviously not HELM. It's an artisanal experiment with five papers. But at least it tries to ask the right question: **what was actually measured?**

## ChatGPT: Almost the Perfect Paper

ChatGPT's score deserves close examination: **41/41 on conclusions** and **48/49 on justifications**.

In other words, no graded conclusion was false.

It passes all ten anchors, the software section scores 15/15, the new mathematical system 9/9, the S7 abstraction 7/7, and the S8 scheduling 8/8.

The only two half-points lost are almost frustrating in how small they are.

In the S2 decision problem, GPT correctly computes all probabilities, correctly chooses test C, and finds the exact optimal risk of 121/95, but does not explicitly derive the general decision threshold:



- `12p \le 3(1-p)`

hence

- `p \le \frac15.`



In S5, it also finds the correct adaptive strategy giving a guarantee of 17 with a diagnostic costing one unit, but does not provide the bound proving that **17 is actually optimal among all possible plans with the remaining budget**.

Those are the only two holes.

That's exactly what makes the 99 interesting: it's not a 99 obtained because the judge was lenient on "roughly correct" answers. The model finds practically everything, and what it lacks is identifiable as two tiny proof obligations.

## Gemini Also Finds All Ten Main Answers… But Not with the Same Solidity

Here's why looking only at "10/10 anchors" would have been misleading.

Gemini also gets **all ten final anchors correct**. Yet its score drops to **91.62**.

The difference lies almost entirely in the demonstrations.

The most telling example appears in the software section. During a concurrent race on an initial stock of 1, two bookings both read `n=1`, then each writes `0`. Gemini presents the bug as the stock becoming negative.

But that's not what happens.

The stock stays **0**.

The real problem is more subtle and more serious: **two one-unit bookings exist when the initial stock contained only one**. The conservation invariant is broken without the free counter ever becoming negative.

This is exactly the kind of error I expected from the test: the model correctly recognizes that a race condition exists, but invents the wrong mechanism.

Its proposed software fix also shows insufficient serialization around the identity `(tenant,key)`, as well as too weak a justification against crashes. Result: only **10.625/15 in S4**, against 15 for ChatGPT.

Gemini also exceeds the imposed 6,500-word limit, with approximately 7,153 units according to the benchmark's counting rule. This costs it only 0.25 points, but illustrates something else: following a long specification is part of the task.

So yes, **Gemini knew all the destinations**.

ChatGPT simply built better roads to get there.

## DeepSeek: Nine Good Anchors, Then One Compression Too Many

DeepSeek is probably the paper that best shows why a single conceptual error can be fascinating.

It gets **9 anchors out of 10**.

Then comes S7.

The problem asks whether the six bits constructed in the previous section are all necessary to determine what an observer can distinguish after adding any prefix and any suffix.

DeepSeek decides no.

It claims that bits `b`, `c`, and `q` never influence the observable result and concludes that keeping three bits suffices: `(a,p,r)`.

That's false.

And a tiny counterexample destroys the whole idea.

Take the empty word and `BC`. Both have the same values for the three bits proposed by DeepSeek:

- `(a,p,r)=(0,0,0).`



Now add the prefix `A`.

The empty word becomes `A`, with r=0.

`BC` becomes `ABC`, with r=1.

The two objects that DeepSeek's compression declared identical therefore become observably different. **The deleted information was necessary.**

It's a very beautiful error because it's not a failed calculation. It's a bad abstraction.

DeepSeek had perfectly understood the local mechanics of the system in S6. Yet it loses a global property when arbitrary contexts are allowed.

Its final score, **78.37**, also comes from another recurring behavior: many correct final values, but too few exhaustive certificates. Saying a bound is optimal isn't enough when you're precisely asked why no other solution can exceed it.

## Kimi Is the Strangest Case in the Entire Benchmark

Kimi finishes fourth with **70.30/100** and only four correct anchors.

Taken at face value, the result looks simply bad.

Then you look at S4.

**14/15.**

On the heaviest software engineering problem in the entire benchmark, Kimi does better than Gemini and DeepSeek and is only one point behind ChatGPT. Its transactional design is coherent, it correctly understands expirations, composite keys, replays, persistence, and atomicity.

And a few sections later, it can completely go off the rails.

In S1, its two final configurations are flatly incompatible with physical constraints: `010111` has four bits at 1 when there must be exactly three; `011100` simultaneously activates `c` and `d`, explicitly forbidden.

Even more interesting: its self-audit contains an almost comical error.

While rechecking the S6 seal, Kimi itself computes components giving:

`110011`

… then immediately writes that its previous answer:

`111001`

is confirmed.

It had just produced the correction in its own text and **did not recognize it as such**. The final register therefore retains the wrong value with 94% confidence.

This is probably my favorite observation from the experiment.

We often talk about models' "self-reflection" as if asking them "check your answer" were enough. Here, Kimi actually performs a verification calculation that contradicts its previous answer… then ignores the contradiction.

The benchmark precisely counted this phenomenon. Kimi finishes with **five false anchors announced at at least 90% confidence** and the group's worst average Brier score: 0.54501. ChatGPT is at 0.00040 and Gemini at 0.00001 on these ten events.

The error is therefore not just "being wrong."

It's **being wrong, having the information to realize it, then remaining extremely sure of being right**.

## Grok: Sometimes Excellent, Sometimes Completely Off the Rails

Grok finishes at **56.92/100**, last in this campaign.

That would still be a mistake to translate as "Grok is bad everywhere."

Its causal S3 section scores **9.25/10**. S1 reaches 7.25/8 and S2's main results are also solid.

Then certain sections collapse.

In S6, it proposes a minimum length of 5 to obtain a seal whose three letter counters equal zero. But if each of the A, B, and C counts must be even and strictly positive to produce the sought final bit, **the total length cannot even be odd**. Its witness `BABAC` also gives `001101`, not `000001`.

It then claims to have covered words of length less than or equal to 4 with "3^4=81 words". But 81 is only the number of words of length exactly 4. Counting lengths 0, 1, 2, 3, and 4, there are:



- `1+3+9+27+81=121.`



The scheduling section is even more brutal: **0.5/8**.

Grok notably proposes Q from 4 to 6. But this task creates a valid authorization from 6 to 8. It then wants to validate F at 9.

The authorization has therefore been expired for one time unit.

The most curious thing is that its own S10 correctly recognizes this fact when asked explicitly. The paper thus contains the correct local refutation without managing to feed it back into its main schedule.

This isn't a knowledge problem.

It's a **global coherence** problem.

## The Confidence Score Tells Another Story

GAUNTLET required each model to announce a confidence probability for each main answer.

This detail could have been decorative. It wasn't.

The score used a variant of the **Brier score**, which penalizes a probability according to the gap between announced confidence and actual outcome. An error announced at 50% doesn't have the same meaning as an error announced at 99%.

And there, the profiles diverge sharply.

Gemini is almost absurdly confident—essentially 99 or 100%—but its ten anchors are indeed correct. On this tiny sample, that gives it the best numerical calibration.

Kimi is also very confident.

Except that six anchors are false.

The difference between "assurance" and "calibration" appears immediately.

This is a feature I'd like to see much more often in benchmarks. An AI that says "I'm at 55%" before a difficult answer and gets it wrong doesn't present the same risk as an AI that produces the same error while declaring 99%.

In an autonomous system, this distinction can become more important than a few points of raw accuracy.

## And the Self-Audit Repaired No False Anchors

Each model had to identify its three lowest-confidence sections, revisit them with a concrete verification, then modify its answer if necessary.

It was an explicit opportunity to save itself.

Result: **none of the five models transformed an initially false anchor into a final correct anchor**.

ChatGPT, Gemini, and DeepSeek still earn the four audit points because they correctly select their fragile sections and perform real checks on already-correct anchors.

Kimi performs some valid checks but maintains its errors.

Grok earns no self-audit points.

I find this result more important than it appears.

Making a model produce more text isn't automatically equivalent to making it more reliable. A second pass can confirm an error with more eloquence. It can also correctly recalculate something without updating the conclusion that depends on it.

**Verification must have structure.**

## So, Is ChatGPT "1.74 Times Smarter" Than Grok? No.

This is where a benchmark becomes dangerous if you start liking your own table a little too much.

This test does not allow concluding that ChatGPT possesses "99% intelligence," that Gemini is worth 91.62% of a human expert, or that ChatGPT is intrinsically better than all products from Google, DeepSeek, Moonshot, or xAI.

Even the grading report explicitly refuses this interpretation.

The exact versions of the five systems, their parameters, reasoning budgets, and any harness differences were not verified rigorously enough. The candidate names were known during grading, so grading was not blind. There was only one trial per system. Several sections are correlated, notably S6/S7 and S10 with previous problems. And five papers remain a microscopic sample.

Modern benchmark research insists precisely on these kinds of limits. HELM notably selects tasks according to their saturation, recency, quality, and reproducibility. The contamination literature reminds us in parallel that a public benchmark eventually becomes less reliable once its questions or their variants can enter future models' training data.

And GAUNTLET just ran into this problem.

**From the moment I publish this article and the test details, GAUNTLET 1.0 begins to die as a secret trial.**

A future AI might have seen the problem.

Or its answer key.

Or this article.

Or a derived copy.

It's no longer the same test.

Recent work describes benchmark contamination precisely as a growing threat: when an evaluation element or a close variant appears in training data, performance can be artificially inflated.

The next version will therefore have to contain **new problems** and a new key frozen before trials.

## What GAUNTLET Actually Measured

The best way to read this ranking is therefore not:

**ChatGPT > Gemini > DeepSeek > Kimi > Grok, end of story.**

The much more interesting conclusion is that five systems sufficiently advanced to solve a large part of the same problems still present **radically different failure signatures**.

ChatGPT was extremely homogeneous and almost perfectly demonstrative.

Gemini found all the big answers but left more cracks in the proofs, particularly when it came to reasoning precisely about a concurrent system.

DeepSeek got almost all the main conclusions before deleting an indispensable piece of information in an abstraction.

Kimi showed impressive competence in software architecture amid much more fundamental logical errors, with sometimes extraordinarily misplaced confidence.

Grok was very strong on causal inference while collapsing on temporal constraints and certain combinatorial proofs.

This recalls an obvious truth we forget behind leaderboards: **a model doesn't have a single intelligence level that could be neatly summarized by a number**.

Even more established evaluation frameworks like HELM separate capabilities into scenarios and dimensions rather than pretending a single score tells the whole story.

GAUNTLET doesn't escape this rule.

Its ranking is amusing.

Its errors are much more instructive.

And after reading the five papers, the thing that interests me most for a version 2 isn't even making the questions simply "harder" anymore.

I want to create situations where **a plausible first intuition leads exactly to the wrong result**, where a locally correct solution must survive across multiple sections, where the model deliberately gets a second chance to discover its contradiction, and where being sure of yourself at the wrong moment costs dearly.

Because an AI that doesn't know an answer is a relatively simple problem.

An AI that finds a wrong answer, builds an elegant demonstration around it, verifies it, encounters proof that it was wrong… then announces **94% confidence**?

That's much more interesting.

> *P.S. - Claude and Mistral were also supposed to participate in the benchmark. In both cases, the trial ended in a server error before I could retrieve a complete response. Gemini pulled the same stunt on me twice; it was only on the third attempt that it finally handed in its paper. **I therefore prefer to speak here only of the models for which I actually obtained a complete response, rather than inventing a score for those that never crossed the finish line.***