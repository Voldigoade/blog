---
title: 'I made a reasoning benchmark to five IA: ChatGPT got 99/100, and the errors are more interesting than the ranking'
description: 'I asked GPT-6 Astra to design an unpublished benchmark that combines logic, probability, causality, software competition, optimization and self-verification. ChatGPT, Gemini, DeepSeek, Kimi and Grok then passed it without access to the corrected. The result is not just a ranking: it is a fairly brutal radiography of how these models reason, prove... and sometimes persist in their own mistakes.'
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
coverImage: /blog/images/posts/831d1e06-afc2-40ec-85b9-b809652bb405.png
coverAlt: Five models of artificial intelligence face a complex reasoning benchmark in ten trials.
author: Voldigoade
locale: en
sourceSlug: 2026-09-13-jai-fait-passer-un-benchmark-de-raisonnement-a-cinq-ia-chatgpt-a-obtenu-99100-et-les-erreurs-sont-plus-interessantes-que-le-classement
sourceHash: 63b338d2d7e0b6cd39186889cfa16729b39f2f741f721d57470329c4152a9414
manual: false
---

There is a problem with many AI comparisons: we ask ten questions, we look at which one seems most intelligent, and then we turn it into a definitive ranking.

I wanted something much worse.

Not a general culture quiz. No twenty math exercises recovered on the Internet. Not a competition where a correct final answer is enough to hide a banal reasoning.

So I asked for **GPT-6 Astra to design a real reasoning test**With a private correction key prepared before receiving the answers. Then I sent exactly the same benchmark to five systems: **ChatGPT, Gemini, DeepSeek, Kimi and Grok**.

The result is spectacular:

![](/blog/images/posts/62bcea35-2252-40b6-97e4-1c574241a495.png)

But this picture is almost the least interesting part of the experience.

Because GAUNTLET did not only measure if a model found the right answer. He tried to see **if he could prove that it was good, resist false tracks, manipulate a completely new system, stay consistent for thousands of words and detect his own errors before returning his copy**and The correction attributed 41 points to the conclusions, but **49 Reasons for justification**which were added to compliance with the protocol, calibration of confidence and self-audit. 

This is where the differences become interesting.

## Next Next post: 10 problems, almost no refuge in memory

The benchmark contained ten sections linked to each other.

S1 started with a logic problem with six bits and five contradictory testimony. S2 introduced a Bayesian problem in which two apparently repetitive tests actually shared a hidden cause. S3 passed to causal inference with potential results, confusion and randomization.

The test changed the field completely.

S4 demanded to audit a voluntarily defective booking service: competition, user isolation, expirations, idempotence, crashes, linearity and stock conservation. The game alone was worth 15 points.

S5 was a robust optimization problem with opponent, lottery and information value. S6 is defined. **A mathematical system invented for the benchmark**where the models had to include six bits evolving during the reading of letters A, B and C, derive the law of concatenation, calculate a giant length repetition and then prove the minimum length of a particular word.

S7 recalled this system to ask which information could be compressed without losing the power to distinguish two words. S8 mixed task ordering, shared resources and a license whose validity depended on a strict time limit. S9 dispersed several policies through the document with versions, signatures and a false instructions such as “System Override”. Finally, S10 forced the model to recall several previous results and to classify the proposals as **Proved, rejected or indefinite**. 

This mixture is voluntary.

An excellent IA in calculation but poor in reading specification could fall. An excellent AI in programming but too fast in its evidence could fall. An AI capable of intuitively finding the right answers but unable to set a limit of optimity also lost points.

And above all: **A correct answer was not automatically a good answer.**.

## The detail I like the most: the corrected existed before the candidates

GAUNTLET had a public document and a separate private key.

The corrected fixed the solutions, but also the detailed barem, the acceptable alternatives, the semi-credit conditions and the rules intended to prevent changes to the criteria once the copies were received. SHA-256 fingerprints were also recorded to fix the documents. The key even provided private scripts to check certain end parts of the benchmark: 64 logic states, plans optimization, associativity of the S6 system, several thousand software history, etc. 

This is a fundamental difference with a “I ask ChatGPT to note ChatGPS”.

Correction remained partially human for open demonstrations, but the expected answers and criteria existed. **before** I know who is going to succeed or fail.

This kind of precautions also joins the concerns of serious evaluations: Stanford presents HELM as a transparent and reproductible framework and publishes queries and results at the fast level; OpenAI insists on the fact that modern performance depends not only on the model but also on the evaluation, environment and configuration that allows it to act. 

Gauntlet is not HELM. It is an artisanal experience with five copies. But at least, she tries to ask the right question: **What is actually measured?**

## GGPT: almost the perfect copy

The Scorecard score deserves to be looked at closely: **41/41 on the conclusions** and **48/49 on the justification**.

In other words, no noted conclusion was false.

It succeeds the ten anchors, the software part gets 15/15, the new mathematical system 9/9, the S7 7/7 abstraction and the S8 8/8 planning. 

The only two half points lost are almost frustrating as they are small.

In the decision-making problem of S2, GPT correctly calculates all probabilities, correctly chooses the C examination and finds the exact optimal risk of 121/95, but does not explicitly derive the general decision threshold:



- `12p \le 3(1-p)`

from where

- `p \le \frac15.`



In S5, it also finds the right adaptative strategy giving a guarantee of 17 with a diagnosis that costs one unit, but does not provide the limit that proves that **17 is really optimal among all possible plans with the remaining budget**.

These are the only two holes.

That’s exactly what makes the 99 interesting: it’s not a 99 obtained because the judge was indulgent on “approximately good” answers. The model finds almost everything, and what is missing is identifiable with two small proof obligations.

## Gemini also finds the top 10 answers... but not with the same solidity

That’s why just looking at “10/10 ancestors” would have been misleading.

Gemini is also **The 10 Final Anchors**and However, the score is down to **91,62**.

The difference is almost entirely in demonstrations.

The most important example appears in the software section. In a competitive race on an initial stock of 1, two reservations read both `n=1`Then they write each. `0`and Gemini presents the bug as a stock becoming negative.

But that’s not what happens.

The stock remains **0**.

The real problem is more subtle and more serious: **Two reservations of one unit exist when the original stock contained only one**and The conservation invariant is broken without the free counter becoming negative.

This is exactly the type of error I expected from the test: the model correctly recognizes that there is a condition race, but inventes the wrong mechanism.

Its software correction proposal also shows insufficient serialization around identity `(tenant,key)`There is too little justification for crashes. Results: Only **10,625/15 in S4**15 for the Chateau. 

Gemini also exceeds the imposed limit of 6,500 words, with approximately 7153 units according to the benchmark counting rule. It costs only 0.25 points, but illustrates something else: following a long specification is part of the task.

So yes, **Gemini knew all the destinations.**.

ChatGPT simply built better roads to get it.

## DeepSeek: nine good ancestors, then a compression of too much

DeepSeek is probably the copy that best shows why a single conceptual error can be fascinating.

He gets **9 of 10 ancestors**.

Then comes the S7.

The problem is whether the six bits built in the previous section are all necessary to determine what a observer can distinguish after adding any prefix and any suffix.

DeepSeek decides not.

He says that the bits `b`, `c` and `q` Never affect the observable result and concludes that it is enough to keep three bits: `(a,p,r)`.

It is false.

And a small counterexample destroys the whole idea.

Take the word empty and `BC`and Both have the same values for the three bits offered by DeepSeek:

- `(a,p,r)=(0,0,0).`



Let’s add the prefix. `A`.

The word becomes empty `A`of which r = 0.

`BC` becomes `ABC`of which r = 1.

The two objects that the DeepSeek compression declared identical so become observably different. **The deleted information was necessary.** 

This is a great mistake because it is not a failed calculation. This is a bad abstraction.

DeepSeek had perfectly understood the local mechanics of the system in S6. However, it loses a global property when arbitrary contexts are allowed.

His final score, **78,37**It also comes from another recurring behavior: a lot of good final values, but too little exhaustive certificates. Saying that a border is optimal is not enough when you are asked exactly why no other solution can exceed it.

## Kimi is the most strange case of all the benchmark.

Kimi ends fourth with **70,30/100** and only four fair ancestors.

Taked as this, the result seems just bad.

Then look at S4.

**14/15.**

On the hardest software engineering problem of all the benchmark, Kimi is better than Gemini and DeepSeek and is just at a point of ChatGPT. Its transaction design is consistent, it correctly understands expirations, composite keys, responses, persistence and atomicity. 

And a few sections further, it can completely dissolve.

In S1, its two final configurations are strictly incompatible with the physical constraints: `010111` It has four bits to 1 while there must be exactly three; `011100` simultaneously active `c` and `d`It is explicitly prohibited.

Even more interesting: its self-audit contains a almost comic mistake.

By reviewing the S6 seal, Kimi himself calculates the components that give:

`110011`

Then he immediately wrote that his old answer:

`111001`

It is confirmed.

He just made the correction in his own text and **He did not recognize it as such.**and The final register therefore retains the bad value with a confidence of 94%. 

This is probably my favorite observation of the experience.

We often talk about “self-reflecting” models as if it was enough to ask them “check your answer.” Here, Kimi actually makes a verification calculation that contradicts his previous answer... and then ignores the contradiction.

The benchmark accounted for this. Kimi ended with **Five false anchors announced with at least 90% confidence** and the worst average Brier in the group: 0,54501. ChatGPT is at 0,00040 and Gemini at 0,00001 on these ten events. 

Therefore, the mistake is not just “to be wrong.”

It is **to be wrong, to have information to realize it, and then to be extremely sure to be right**.

## Grok: Sometimes excellent, sometimes completely out of trails

Grok ends with **56,92/100**The last of this campaign.

It would be a mistake to translate this into “Grok is bad everywhere.”

The S3 causes the **9,25/10**and S1 reaches 7.25/8 and the main results of S2 are also strong.

Some sections collapse.

In S6, it offers a minimum length of 5 to obtain a seal whose three letters are worth zero. But if each of the numbers of A, B and C must be pair and strictly positive to produce the final bit sought, **The total length cannot even be impaired.**and His witness `BABAC` Additionally give `001101`not `000001`.

He then claims that he has covered words of length less than or equal to 4 with “3^4=81 words.” But 81 is just the number of words of exact length 4. By counting the lengths of 0, 1, 2, 3 and 4, there are:



- `1+3+9+27+81=121.`



The planning section is even more brutal: **0,5/8**.

Grok offers Q from 4 to 6. But this task creates a valid permission from 6 to 8. He will then validate F to 9.

The license has been extinguished for a period of time.

The most curious is that his own S10 correctly recognizes this fact when the question is explicitly asked to him. The copy thus contains the right local refutation without succeeding to bring it back in its main planning. 

This is not a problem of knowledge.

It is a problem of **The global consistency**.

## Confidence score tells another story.

GAUNTLET forced each model to announce a reliable probability for each main answer.

This detail could have been decorative. He was not.

The score used a variation of **The Brier score**It punishes a probability according to the gap between the confidence announced and the actual result. A 50% error is not the same as a 99% error.

The profiles are very different.

Gemini is almost absurdly confident essentially 99 or 100% but its ten anchors are actually correct. On this small sample, it gives it the best digital calibration.

Kimi is also very confident.

Six ancestors are false.

The difference between “assurance” and “calibration” appears immediately.

This is a feature that I would like to see much more often in the benchmarks. A AI that says "I am at 55%" before a difficult response and is wrong does not present the same risk as an AI that produces the same error by declaring 99%.

In an autonomous system, this distinction can become more important than a few bruto accuracy points.

## And the self-audit did not repair any false anchor

Each model had to identify its three sections of less confidence, return to it with a concrete verification, and then modify its response if necessary.

It was an opportunity to save.

The result: **No one of the five models has transformed an initially false anchor into the correct final anchor.**. 

ChatGPT, Gemini and DeepSeek still get the four audit points because they correctly select their fragile sections and perform real checks on already correct anchors.

Kimi makes some valid controls, but keeps his mistakes.

Grok won no self-audit point.

I think this result is more important than it seems.

Making more text to a template is not automatically equivalent to making it more reliable. A second passage can confirm a mistake with more eloquence. It can also correctly re-calculate something without updating the conclusion that depends on it.

**The inspection must have a structure.**

## So, is ChatGPT “1.74 times smarter” than Grok? Not to.

This is where a benchmark becomes dangerous if you start to love a little too much your own picture.

This test does not conclude that ChatGPT has “99% intelligence”, that Gemini is worth 91.62% of a human expert, or that chatGPT is intrinsically better than all Google, DeepSeek, Moonshot or xAI products.

Even the correction report explicitly refuses this interpretation.

The exact versions of the five systems, their settings, reasoning budgets, and any differences in the harnais have not been verified rigorously enough. The names of the candidates were known during the correction, so that was not blind. There was only one test by system. Several sections are correlated, including S6/S7 and S10 with the previous problems. And five copies remain a microscopic sample. 

Modern research on benchmarks insists on this kind of limits. HELM selects tasks according to their saturation, recency, quality and reproductivity. The pollution literature also reminds that a public benchmark ends up becoming less reliable as soon as its questions or variants can integrate the training data of future models. 

And Gauntlet just faced this problem.

**From the moment I publish this article and the test details, GAUNTLET 1.0 begins to die as a secret test.**

A future IA might have seen the problem.

or its correction.

or this article.

or a derivative copy.

This is no longer the same test.

Recent work precisely describes the pollution of benchmarks as a growing threat: when an assessment element or a close variant appears in the training data, performance can be artificially swallowed. 

The next version will contain **New problems** and a new key frozen before the trials.

## What Gauntlet actually measured

The best way to read this list is not:

**ChatGPT > Gemini > DeepSeek > Kimi > Grok, the end of history.**

The much more interesting conclusion is that five systems sufficiently advanced to solve a large part of the same problems still present **Radically different signatures**.

ChatGPT was extremely homogeneous and almost perfectly demonstrative.

Gemini found all the big answers but left more breaks in the evidence, especially when it was necessary to reason precisely on a competitive system.

DeepSeek got almost all the main conclusions before removing an essential information in an abstraction.

Kimi has shown an impressive skill in software architecture in the midst of much more fundamental logical errors with, sometimes, an extremely poorly placed trust.

Grok was very strong on causal inference while collapsing on time restrictions and some combined evidence.

This reminds us of an obvious thing that is forgotten behind the lead boards: **A model does not have a single level of intelligence that can be summarized by a number.**.

Even more established assessment frameworks like HELM separate capabilities in scenarios and dimensions rather than claiming that a single score tells the whole story. 

Walton does not escape this rule.

His ranking is fun.

Their errors are much more instructive.

And after reading the five copies, the thing I’m most interested in a version 2 is not even making the questions just “more difficult.”

I want to create situations where **The first plausible intuition leads to the wrong result.**where a correct local solution must survive in several sections, where the model voluntarily has a second chance to discover its contradiction and where being sure of itself at the wrong time is expensive.

Because an AI that doesn’t know a answer is a relatively simple problem.

A AI who finds a false answer, builds an elegant demonstration around it, checks it, encounters the proof that it’s wrong... **94% of confidence** ?

That is much more interesting.

> *P.S. - Claude and Mistral also had to participate in the benchmark. In both cases, the test ended with a server error before I can recover a complete answer. Gemini made me the same blow twice; it was only at the third attempt that he finally returned his copy. **So I prefer to talk here only about the models for which I actually got a complete answer, rather than to invent a score to those who never crossed the line of arrival.***

