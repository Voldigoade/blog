---
title: The Secret War to Copy the Best AI
description: 'Hundreds of millions of queries, thousands of fake accounts, and models trained on their competitors'' responses: distillation has become an industrial and geopolitical issue. But between legitimate learning, capability extraction, and outright theft, the line is far less clear than it appears.'
pubDate: 2026-09-13
draft: false
featured: false
section: computing
contentType: research
tags:
  - intelligence artificielle
  - LLM
  - distillation
  - Anthropic
  - DeepSeek
  - cybersécurité
  - kimi
  - model extraction
coverImage: /images/posts/20c92b74-6820-4ef9-929d-bfdb9fcd4971.png
coverAlt: An artificial intelligence model secretly learns capabilities from another model through millions of queries.
author: Voldigoade
locale: en
sourceSlug: 2026-09-13-la-guerre-secrete-pour-copier-les-meilleures-ia
sourceHash: 4ff675af2579b675dccd35a47c48d951280ac2c569cf8a01496693b9ee179a9e
manual: false
---

**151 million exchanges.**

That's the volume Anthropic claims to have observed, between May and July 2026, in a campaign attributed to Alibaba targeting Claude.

Not 151 million tokens. Not 151 million characters. **Over 151 million exchanges with the model.**

At the peak of the operation, Anthropic says it measured nearly three million exchanges per day. An initial infrastructure allegedly used nearly 5,000 fraudulent accounts, with residential proxies, disposable email addresses, and virtual payment cards. When those accounts were blocked, the traffic reportedly migrated to another infrastructure.

The alleged objective was not to ask Claude questions because Alibaba needed a chatbot.

According to Anthropic, the responses—and notably reasoning traces—were transformed into training data intended to improve the Qwen models.

In other words: **making an extremely advanced AI work as the covert teacher of another AI.**

It immediately looks like theft.

The problem is that the technique used bears a perfectly respectable name in AI research.

**Distillation.**

And it is absolutely not illegal or malicious by nature.

## An AI Can Truly Learn from Another AI

The principle of distillation is surprisingly simple.

Take a very powerful model, which we'll call the **teacher**.

Submit enormous numbers of problems to it:

- writing or fixing code;

- solving complex reasoning;

- classifying documents;

- using tools;

- analyzing data;

- answering specialized questions.

Keep its responses.

Then use this immense set of examples to train another model, **the student**.

The student does not receive the teacher's internal weights. It does not get its source code. It does not recover an exact copy of its digital brain.

It simply observes, again and again, **how a much more competent model behaves when faced with different problems**.

That alone is extremely valuable.

The technique isn't even new. In 2015, Geoffrey Hinton, Oriol Vinyals, and Jeff Dean published *Distilling the Knowledge in a Neural Network*, showing how to transfer part of the knowledge from a complex system to a simpler, cheaper-to-use model.

Today, the entire industry uses this principle.

OpenAI officially offers a **Model Distillation** system allowing the use of powerful model outputs to fine-tune smaller, cheaper models. Google also offers legitimate distillation uses.

Distillation is therefore not the problem.

The question is: **who is the teacher, who is the student, and did the teacher agree to give the lesson?**

## Distillation, Extraction, Copying: Words Hide Different Things

A confusion constantly recurs in this affair: using one AI's responses to train another AI does not necessarily equate to "stealing the model."

Several levels must be distinguished.

![](/images/posts/045cda8d-31fb-4a0e-a46e-0b9914450a09.png)

The term **model extraction** wasn't invented for the current war between AI labs.

As early as 2016, researchers showed that a model accessible only through an API could sometimes be approximately reconstructed by querying it cleverly enough. Their paper was bluntly titled *Stealing Machine Learning Models via Prediction APIs*.

The principle creates a fundamental paradox.

To sell an AI, you have to let users query it.

But every response also reveals something about its behavior.

An isolated query is worth almost nothing.

Millions of methodically chosen queries can become an extremely valuable dataset.

## What Anthropic Actually Accuses Chinese Labs of Doing

Precision is needed here.

The detailed information publicly available comes mainly **from Anthropic's investigations and attributions**. They do not, by themselves, constitute an independent judicial ruling establishing every fact.

But the alleged volumes are large enough to completely change the nature of the subject.

In its September 2026 report, Anthropic notably claims to have identified:

![](/images/posts/5d5908f7-a26f-431f-9e6c-69ad9e63e8ee.png)

This is no longer really the scenario of a researcher sending a few thousand prompts to study a competitor.

Anthropic describes genuine **industrial pipelines**.

In the case attributed to Zhipu, for example, the lab allegedly recorded the retrieved reasoning then used Claude itself to clean, normalize, evaluate, and generate other data destined for training.

The teacher would therefore no longer serve only to produce responses.

It would also participate in **the fabrication of its own copy dataset**.

## The Alibaba Case Goes Even Further

The campaign Anthropic attributes to Alibaba allegedly targeted reasoning capabilities, programming, kernel development, and long tasks requiring multiple steps in particular.

According to Anthropic, prompts forced Claude to produce explicit reasoning traces that were then saved and transformed into **supervised fine-tuning** data, or SFT.

SFT consists of training a model on pairs of the type:

- `Problème → excellente réponse attendue`

Repeat this millions of times on carefully chosen problems and you don't just transmit factual knowledge.

You also transmit **useful behaviors**: how to break down a problem, which strategy to try, how to produce clean code, how to use a tool, or how to pursue a task for many steps.

Anthropic claims these data served to improve several generations of Qwen. The company also accuses Alibaba of using Claude to work on its internal AI research infrastructure, notably reinforcement learning environments and certain work related to model architectures.

Once again: this does not mean Alibaba allegedly "downloaded Claude's brain."

But if the accusations are accurate, Claude would have served as **researcher, teacher, data generator, and evaluation tool** for a competitor.

The technical nuance doesn't make the phenomenon less impressive.

It makes it more interesting.

## Kimi and DeepSeek: When the Model You Use Isn't Even the One Answering You Anymore

The accusations concerning Moonshot AI, creator of Kimi, are probably the most disturbing.

Anthropic claims to have discovered that certain queries sent by users thinking they were querying Kimi were **silently forwarded to Claude**.

The response produced by Claude would then have been returned to the user as the service's response.

Over a ten-day period, Anthropic says it received nearly 300,000 Moonshot customer queries in this framework. The infrastructure allegedly used 5,380 fraudulent accounts. Some of the exchanges would then have been retained to feed training pipelines. In total, Anthropic attributes over 23 million exchanges to Moonshot between May and July.

DeepSeek allegedly used a comparable method.

Anthropic claims that certain DeepSeek user queries—particularly those originating from development tools compatible with different models—were selected and redirected to Claude Opus.

The response could thus serve immediately, but also provide new data to train future in-house models. Anthropic estimates over 12.1 million exchanges associated with this campaign over just fourteen days in July 2026.

If these accusations are accurate, we're no longer talking only about intellectual property.

We're also talking about **user trust**.

## The Hidden Problem: Your Conversations Can Become Raw Material

This may be the most concerning part of the report.

Anthropic claims that DeepSeek, Moonshot, and Xiaomi transmitted certain conversations initially addressed to their own models to Claude.

And a conversation with a coding AI can contain much more than an abstract question.

It can contain:

- proprietary code;

- internal documents;

- API keys;

- credentials;

- professional data;

- names and contact details;

- configuration files;

- confidential information.

Anthropic says it observed sensitive information belonging to hundreds of users and organizations in the sessions concerned, in at least a dozen languages.

In the Xiaomi case, Anthropic claims over 400,000 queries from over 1,500 accounts were sent to Claude. The conversations would then have served to build SFT and reinforcement learning data for future models.

There are therefore potentially **two resources extracted simultaneously**:

the competitor model's capabilities,

and user data.

These are not at all the same legal or ethical problems.

But they can pass through exactly the same pipe.

## You Can Even Buy Conversations with an AI

Anthropic's report describes an additional step: the emergence of a **secondary market for distillation data**.

Intermediary services provide access to models normally unavailable in certain regions. They forward queries to Claude or other models, retrieve the responses… and can retain the conversations.

Anthropic claims some of this data was then resold to other labs.

SenseTime allegedly used Claude conversations purchased from third-party providers.

Anthropic also accuses MiniMax of creating its own proxy network via a shell company that, curiously, offered access only to Anthropic and OpenAI models and not to MiniMax's own models. Anthropic estimates this infrastructure served to harvest exchanges for training.

If this business model is confirmed at scale, it profoundly changes the situation.

A conversation with an AI is no longer just an interaction between a user and a provider.

It can become **a resalable asset to train a third AI**.

## The US Government Has Now Entered the Battle

On September 8, 2026, the NSA, FBI, and CISA jointly published an alert devoted to this phenomenon.

The document accuses Chinese companies of organizing distillation campaigns against American models at **industrial scale**.

The American argument is economic as much as security-related: replicating certain capabilities of existing models would reduce part of the cost needed to develop them independently—compute, energy, fundamental research, and experimentation.

Distillation is therefore now presented not only as a commercial problem, but as a strategic issue in the technological competition between the United States and China.

And China rejects this narrative.

The Chinese Ministry of Foreign Affairs responded that the country's AI progress stemmed from its scientific and technological capabilities and its policy of openness and cooperation. Beijing asked the United States to cease what it considers unfounded accusations and attempts at denigration.

We therefore have two almost opposite readings of the same phenomenon.

For Washington and several American labs: **industrial extraction of intellectual property**.

For Beijing: a political accusation targeting Chinese companies in a sector where competition has become strategic.

The technique exists.

Its interpretation is now geopolitical.

## The Word "Theft" Still Deserves to Be Used Precisely

Google doesn't mince words: its Threat Intelligence team describes model extraction attacks as a form of **industrial espionage** and intellectual property theft.

Google also claims to regularly observe large-scale campaigns and recently indicated that some exceeded **100 million prompts**.

OpenAI holds a comparable position.

The company explicitly acknowledges legitimate distillation uses—it provides the tools itself—but also claims to have observed activities associated with DeepSeek that it considers compatible with adversarial distillation and attempts to circumvent its restrictions.

Anthropic, for its part, prohibits in its commercial terms the use of its services to build a competing product or train a competing AI model without explicit authorization.

But several questions must remain separate.

**Contractual violations, technical extraction, intellectual property, confidentiality, and criminal qualification are not synonyms.**

Saying a lab fraudulently used thousands of accounts to circumvent restrictions is one claim.

Saying it replicated certain capabilities of a competitor using its outputs is another.

Saying it "stole the model" can finally give the impression its weights were stolen, which is not what these reports describe.

Corporate language is not neutral.

When Anthropic says **illicit distillation**, or Google speaks of **IP theft**, these companies describe a real technical problem, but they also defend a commercial asset worth enormously.

That doesn't make their accusations false.

It simply requires not confusing their vocabulary with a universal definition.

## Can You Really Copy Claude with Enough Queries?

Not in the sense of copying a file.

Even with a hundred million responses, the student does not automatically recover:

- the teacher's exact weights;

- its original training data;

- all its capabilities;

- its internal mechanisms;

- all its knowledge;

- nor exactly its behavior.

Distillation is generally **selective and imperfect**.

But it doesn't need to produce a perfect clone to be extremely profitable.

Suppose a competitor already has a very good model.

What it lacks may not be "general intelligence" as a whole, but certain specific skills: agentic programming, long reasoning, tool use, cybersecurity, mathematics, or the ability to correct its own results.

It can then massively query a model that masters these domains better, build a specialized dataset, then focus its training precisely where it was weak.

It doesn't necessarily copy **Claude**.

It tries to copy **what Claude does better than it**.

And that's much more realistic.

## An AI's Reasoning Has Become a Strategic Resource

Modern models sometimes produce much more than a short answer.

To solve a complex problem, they can perform intermediate calculations, try several approaches, use tools, write then test code, or develop a strategy over a long sequence.

These trajectories are extraordinarily interesting for training another system.

That's precisely why Anthropic claims to have strengthened protection of Claude's internal reasoning.

The company notably says it uses reasoning summaries in place of certain internal traces and has developed protections against techniques allowing reasoning signatures to be replayed across multiple sessions. It combines this with specialized classifiers, metadata analysis, and identity verification requests when behavior appears suspicious.

Google, for its part, says it is developing techniques to recognize models potentially distilled from Gemini, as well as defenses capable of reducing the usefulness of data recovered by an attacker.

The situation increasingly resembles a classic war between attackers and defenders:

a lab protects its outputs;

another finds a new way to recover them;

protection evolves;

extraction changes technique.

Except here, **the object to protect is not just a program**.

It's behavior.

## An AI's API Is Also a Controlled Leak of Competence

This is probably the most important idea behind this whole affair.

For a long time, protecting proprietary software mainly meant protecting its source code.

Large models slightly change this logic.

You can keep your weights, precise architecture, and training data totally secret.

But for your model to have commercial value, you still have to let others see what it knows how to do.

Every response is therefore a tiny demonstration of competence.

In isolation, it reveals almost nothing.

At very large scale, it becomes a corpus.

And that corpus can serve to train.

**Putting an AI behind an API amounts to selling access to its intelligence while trying to prevent customers from learning enough from it to reproduce it.**

That's a tension that probably won't disappear.

Researchers had already identified it with much simpler models ten years ago. Current models have simply exploded the value of what can be extracted.

## And That's Where the Debate Becomes Truly Uncomfortable

There's something rather ironic in the current position of the major AI labs.

A good part of modern artificial intelligence was made possible by learning on gigantic quantities of data produced by other people: text, code, images, discussions, and documents available on the Internet or obtained via various licenses and sources.

Today, the same companies discover how unpleasant it is to see **their own output become someone else's training material**.

That doesn't mean the two situations are legally or technically identical.

They are not.

But the symmetry is hard to ignore.

For years, the dominant question was:

**"Can an AI company train its model on what humans have produced?"**

A second question now arises:

**"Can an AI company train its model on what another AI has produced?"**

And contrary to what the word "distillation" might suggest, we are very far from having a universal answer.

## The Next AI War May Not Be Just About GPUs

We talk enormously about chips, datacenters, electricity, and billions invested in model training.

All that remains essential.

But a new resource is becoming strategic:

**the responses produced by the world's best models.**

Because a lab that doesn't possess the best teacher can, at least in theory, try to rent, circumvent, automate, or disguise enough access to transform those skills into data.

Dominant labs will therefore have to simultaneously defend two contradictory things:

making their models accessible enough to be useful and profitable,

while preventing competitors from accessing them enough to learn from them.

Anthropic can ban 5,000 accounts.

Others will appear.

Google can detect hundreds of millions of automated queries.

Attacks can spread across more accounts.

Models can mask their reasoning.

Extractors can look for other signals in final outputs.

And every improvement in a teacher also increases the potential value of its lessons.

Distillation is therefore not a technical curiosity.

It is becoming **one of the new fronts of global competition in artificial intelligence**.

And this front has a fascinating particularity: unlike classic theft, it's not always necessary to break into the vault.

Sometimes it's enough to stand at the door, ask enough good questions…

and listen carefully to the answers.