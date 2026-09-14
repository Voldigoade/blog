---
title: The secret war to copy the best AI
description: 'Hundreds of millions of queries, thousands of fake accounts, and models trained on the responses of their competitors: data distillation has become a major industrial and geopolitical issue. However, the line between legitimate learning, extracting capabilities, and outright theft is much more complex than it appears.'
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
coverImage: /blog/images/posts/20c92b74-6820-4ef9-929d-bfdb9fcd4971.png
coverAlt: An artificial intelligence model secretly learns the capabilities of another model by analyzing millions of queries.
author: Voldigoade
locale: en
sourceSlug: 2026-09-13-la-guerre-secrete-pour-copier-les-meilleures-ia
sourceHash: 4ff675af2579b675dccd35a47c48d951280ac2c569cf8a01496693b9ee179a9e
manual: false
---

151 million exchanges

This is the volume that Anthropic claims to have observed, between May and July 2026, as part of a campaign attributed to Alibaba targeting Claude.

Not 151 million tokens. Not 151 million characters. **More than 151 million interactions with the model.**

At the peak of the operation, Anthropic reported measuring nearly three million exchanges per day. The initial infrastructure had been using around 5,000 fraudulent accounts, using residential proxies, disposable email addresses, and virtual payment cards. When these accounts were blocked, the traffic had migrated to another infrastructure. 

The presumed goal was not to question Claude, as Alibaba needed a chatbot.

According to Anthropic, the responses, and particularly any traces of reasoning, were transformed into training data intended to improve the Qwen models.

In other words: **using an extremely advanced AI as a clandestine teacher for another AI.**

It immediately looks like theft.

The problem is that the technique used has a perfectly respectable name in the field of artificial intelligence research.

Distillation.

And it has absolutely nothing illegal or malicious about it.

## An AI can actually learn from another AI.

The principle of distillation is surprisingly simple.

Let's consider a very powerful model, which we will call the **professor**.

He presents her with a wide range of challenges:

- writing or correcting code;

- solve complex reasoning problems;

- categorizing documents;

- use tools;

- analyze data;

- answer specialized questions.

We save the answers.

Then, this vast collection of examples is used to train another model, **the student**.

The student does not receive the teacher's internal data. They do not obtain their source code. They do not receive an exact copy of their digital brain.

He simply observes, again and again, **how a more capable model behaves when faced with different problems**.

It is already incredibly valuable.

The technique is not even new. In 2015, Geoffrey Hinton, Oriol Vinyals, and Jeff Dean published "Distilling the Knowledge in a Neural Network," demonstrating how to transfer some of the knowledge from a complex system to a simpler and less expensive model. 

Today, the entire industry uses this principle.

OpenAI officially offers a **Model Distillation** system that allows the use of the outputs of powerful models to refine smaller, less expensive models. Google also proposes legitimate uses for distillation. 

Therefore, the issue is not the distillation process itself.

The question is: **Who is the teacher, who is the student, and has the teacher agreed to give the lesson?**

## Distillation, extraction, and copying: these words refer to different processes.

A recurring confusion in this case is the idea that using the output of one AI to train another AI necessarily constitutes "stealing the model."

It is important to distinguish between several levels.

![](/blog/images/posts/045cda8d-31fb-4a0e-a46e-0b9914450a09.png)

The term "**model extraction**" was not actually coined for the current conflict between AI labs.

As early as 2016, researchers demonstrated that a model accessible only through an API could sometimes be approximately reconstructed by querying it intelligently enough. Their article, titled simply *Stealing Machine Learning Models via Prediction APIs*, made this point directly. 

The principle creates a fundamental paradox.

To sell an AI, it is necessary to allow users to interact with it and ask questions.

However, each answer also reveals something about his behavior.

A single, isolated request is almost worthless.

Millions of carefully selected queries can become an extremely valuable dataset.

## What Anthropic is actually accusing Chinese laboratories of doing

It is important to be precise here.

The detailed information available publicly primarily comes from **the investigations and rulings of Anthropic**. However, these alone do not constitute an independent judicial decision establishing each fact.

However, the alleged volumes are large enough to completely transform the nature of the subject.

In its September 2026 report, Anthropic claims to have identified, among other things:

![](/blog/images/posts/5d5908f7-a26f-431f-9e6c-69ad9e63e8ee.png)

We are no longer really in the scenario of a researcher sending a few thousand prompts to study a competitor.

Anthropic describes actual **industrial pipelines**.

In the case presented to Zhipu, for example, the laboratory would have recorded the reasoning obtained and then used Claude itself to clean, normalize, evaluate, and generate additional data for training.

Therefore, the professor would no longer simply be responsible for providing answers.

He would also be involved in **creating his own dataset for copying**. 

## The Alibaba case goes even further.

The capabilities that Anthropic attributes to Alibaba would have specifically targeted reasoning, programming, the development of computer cores, and tasks requiring multiple steps.

According to Anthropic, the prompts required Claude to generate explicit traces of reasoning, which were then saved and transformed into data for **supervised fine-tuning** (SFT).

The SFT (Supervised Fine-Tuning) process involves training a model on pairs of the following type:

- `Problème → excellente réponse attendue`

Repeat this process millions of times on carefully selected problems, and you are not only transmitting factual knowledge.

You also provide **useful behaviors**: how to break down a problem, what strategy to try, how to produce clean code, how to use a tool, or how to proceed with a task over many steps.

Anthropic claims that this data was used to improve several generations of Qwen. The company also accuses Alibaba of using Claude to work on its internal AI research infrastructure, including reinforcement learning environments and certain work related to model architectures. 

Once again: this does not mean that Alibaba has downloaded "Claude's brain."

However, if the accusations are accurate, Claude would have acted as a **researcher, professor, data generator, and evaluation tool** for a competitor.

The technical detail does not diminish the impact of the phenomenon.

It makes it more interesting.

## Kimi and DeepSeek: When the model you're using might no longer be the one that's actually responding to you

The accusations against Moonshot AI, the creators of Kimi, are likely the most disturbing.

Anthropic claims to have discovered that certain queries sent by users who believed they were interacting with Kimi were **silently being transmitted to Claude**.

The response generated by Claude would then have been sent back to the user as the service's response.

Over a ten-day period, Anthropic claims to have received nearly 300,000 customer requests from Moonshot within this framework. The infrastructure allegedly used 5,380 fraudulent accounts. Some of the interactions were then retained to feed training pipelines. In total, Anthropic attributes over 23 million interactions to Moonshot between May and July. 

DeepSeek would have used a similar method.

Anthropic claims that certain user requests, particularly those originating from development tools compatible with various models, were selected and then redirected to Claude Opus.

This response could be used immediately, but also provide new data that could be used to train future in-house models. Anthropic estimates that over 12.1 million exchanges were associated with this campaign, which took place over just fourteen days in July 2026.

If these accusations are true, we are no longer just talking about intellectual property.

We also discuss **user trust**.

## The hidden problem: your conversations could become the raw material.

This may be the most concerning aspect of the report.

Anthropic claims that DeepSeek, Moonshot, and Xiaomi have shared some initial conversations with Claude that were originally intended for their own models.

And a conversation with a programming AI can contain much more than just a simple, abstract question.

It may contain:

- of proprietary code;

- internal documents;

- API keys;

- identifiers;

- professional data;

- names and contact information;

- configuration files;

- confidential information.

Anthropic claims to have observed sensitive information belonging to hundreds of users and organizations in the sessions in question, in at least a dozen languages. 

In the case of Xiaomi, Anthropic claims that over 400,000 requests from more than 1,500 accounts were sent to Claude. These conversations were then used to create data for SFT (Supervised Fine-Tuning) and reinforcement learning, which would be used to train future models. 

Therefore, there is potentially **two resources being extracted simultaneously**:

the capabilities of the competing model

and user data.

These are entirely different legal and ethical issues.

However, they can all use the exact same pipe.

## It is even possible to purchase conversations with an AI.

The Anthropic report describes an additional step: the emergence of a **secondary market for distilled data**.

Intermediary services provide access to models that are normally unavailable in certain regions. They forward requests to Claude or other models, retrieve the responses, and can also maintain the conversation history.

Anthropic claims that some of this data was subsequently resold to other laboratories.

SenseTime would have therefore used conversations obtained from third-party providers.

Anthropic also accuses MiniMax of having created its own proxy network through a shell company that, curiously, only offered access to Anthropic and OpenAI models, but not to MiniMax's own models. Anthropic believes that this infrastructure was used to collect data for training purposes. 

If this economic model proves successful on a large scale, it would fundamentally change the situation.

A conversation with an AI is no longer just an interaction between a user and a provider.

It could become a valuable asset that could be used to train a third AI.

## The U.S. government has now become involved in the conflict.

On September 8, 2026, the NSA, the FBI, and CISA jointly issued an alert regarding this phenomenon.

The document accuses Chinese companies of organizing industrial-scale operations to replicate American models.

The American argument is both economic and security-related: replicating certain capabilities of existing models would allow for a reduction in the cost required to develop them independently, including expenses related to calculation, energy, fundamental research, and experimentation. 

Distillation is therefore now presented not only as a commercial issue, but also as a strategic concern in the technological competition between the United States and China.

And China rejects this narrative.

The Chinese Ministry of Foreign Affairs responded that the country's progress in artificial intelligence stemmed from its scientific and technological capabilities and its policy of openness and cooperation. Beijing has asked the United States to stop what it considers to be unfounded accusations and attempts to discredit China. 

Therefore, we have two very different interpretations of the same phenomenon.

For Washington and several US laboratories: **industrial extraction of intellectual property**.

Regarding Beijing: a politically motivated accusation targeting Chinese companies in a sector where competition has become strategic.

The technique exists.

Her interpretation now takes a geopolitical perspective.

## The word "theft" still deserves to be used with precision.

Google does not take many lexical precautions: its Threat Intelligence team describes model extraction attacks as a form of **industrial espionage** and theft of intellectual property.

Google also reports observing large-scale campaigns regularly, and recently indicated that some campaigns exceeded **100 million prompts**. 

OpenAI holds a similar position.

The company explicitly acknowledges that there are legitimate uses of the distillation process, and it even provides the tools for this. However, it also claims to have observed activities associated with DeepSeek that it considers to be compatible with adversarial distillation and attempts to circumvent its restrictions.

 Anthropic, on the other hand, prohibits its users from using its services to develop a competing product or train a competing AI model without explicit permission. 

However, several issues need to be kept separate.

**Breach of contract, technical extraction, intellectual property, confidentiality, and criminal liability are not interchangeable terms.**

Claiming that a laboratory used thousands of fake accounts to circumvent restrictions is a statement.

Another way to put it is that he replicated the abilities of a competitor by using their own strategies.

To say that he "stole the model" could finally give the impression that his weight has been taken away, which is not what these reports describe.

Business language is not neutral.

When Anthropic refers to "illicit distillation" or Google speaks of "IP theft," these companies are describing a genuine technical problem, but they are also defending a valuable commercial asset.

This does not make their accusations false.

This simply means that one should not confuse their vocabulary with a universal definition.

## Is it truly possible to replicate Claude's abilities with enough prompts?

Not in the sense of simply copying a file.

Even with one hundred million responses, the student does not automatically acquire:

- the exact weights of the professor;

- its original training data;

- all of its capabilities;

- its internal mechanisms;

- all of his knowledge;

- nor exactly his behavior.

Distillation is typically **selective and imperfect**.

However, it doesn't need to produce a perfect clone to be extremely profitable.

Let's assume that a competitor already has a very good model.

What he may lack is not necessarily "general intelligence" in its entirety, but rather certain specific skills: agent-based programming, long-term reasoning, the use of tools, cybersecurity, mathematics, or the ability to correct his own results.

He could then query a model that is better equipped to handle these areas, create a specialized dataset, and then focus his training specifically on the areas where he was weak.

It doesn't necessarily copy **Claude**.

He is trying to emulate **what Claude does best**.

And it's much more realistic.

## The reasoning capabilities of AI have become a strategic asset.

Modern models sometimes generate responses that are significantly longer than a simple answer.

To solve a complex problem, they can perform intermediate calculations, try different approaches, use tools, write and test code, or develop a strategy over a long sequence.

These trajectories are particularly interesting for training another system.

This is precisely why Anthropic claims to have strengthened the protection of Claude's internal reasoning processes.

The company, for example, uses reasoning summaries instead of certain internal records, and has developed protections against techniques that could replay reasoning signatures across multiple sessions. It also combines this with specialized classifiers, metadata analysis, and identity verification requests when suspicious behavior is detected. 

Google, for its part, is developing techniques to identify patterns that may have originated from Gemini, as well as defenses capable of reducing the usefulness of data obtained by an attacker. 

The situation increasingly resembles a classic war between attackers and defenders:

a laboratory protects its outputs;

one finds a new way to retrieve them;

The protection is evolving;

The extraction method is being changed.

However, here, the object to be protected is not just a program.

That's just unacceptable behavior.

## The API of an AI is also a controlled release of its capabilities.

This is likely the most important idea behind the entire case.

For a long time, protecting proprietary software primarily meant protecting its source code.

However, large-scale models slightly alter this logic.

You can keep your weight, precise measurements, and training data completely confidential.

In order for your model to have commercial value, you still need to allow others to see what it can do.

Therefore, each answer is a small demonstration of competence.

On its own, it reveals very little.

On a very large scale, it becomes a body of work.

And this dataset can be used for training.

Therefore, putting an AI behind an API means selling access to your intelligence while also trying to prevent customers from gaining enough knowledge to replicate it.

This is a tension that is unlikely to disappear.

Researchers had already identified it using much simpler models a decade ago. The current models have simply dramatically increased the value of what can be extracted. 

## And that's when the discussion becomes truly uncomfortable.

There's something quite ironic about the current position of major AI labs.

A significant portion of modern artificial intelligence has been made possible by learning from massive amounts of data generated by others: text, code, images, discussions, and documents available on the internet or obtained through various licenses and sources.

Today, the same companies are realizing how unpleasant it is to see **their own products being used as training material for others**.

This does not mean that the two situations are legally or technically identical.

They are not.

However, symmetry is difficult to ignore.

For years, the main question was:

"Can an AI company train its model on data that has been created by humans?"

A second question now arises:

"Can an AI company train its model on data produced by another AI?"

And unlike what the word "distillation" might suggest, we are very far from having a universal answer.

## The next AI war may not only involve GPUs.

There's a great deal of discussion about insects, data centers, electricity, and the billions of dollars being invested in model training.

All of this remains essential.

However, a new resource becomes strategically important:

**The answers generated by the world's leading models.**

Because a laboratory that doesn't have the best professor can, at least in theory, try to restrict, circumvent, automate, or obscure access to such an extent that its expertise can be converted into data.

Therefore, the dominant laboratories will need to defend two contradictory things simultaneously:

make their models accessible enough to be useful and profitable.

while also preventing their competitors from gaining access to them in order to learn from their successes.

Anthropic can ban up to 5,000 accounts.

More will appear.

Google can detect hundreds of millions of automated queries.

The attacks can be distributed across multiple accounts.

The models can conceal their reasoning processes.

The extractors can look for other signals in the final outputs.

And each improvement made by a teacher also increases the potential value of their lessons.

Therefore, distillation is not merely a technical curiosity.

She is rapidly becoming **one of the new frontiers in global competition in artificial intelligence**.

And this type of front has a fascinating characteristic: unlike a traditional approach, it is not always necessary to access the safe through the door.

Sometimes, all it takes is to stand in front of the door and ask the right questions…

and to listen carefully to the answers.
