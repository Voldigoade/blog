---
title: 'Claude participated in a missile program: the real danger lies elsewhere'
description: 'In Yemen, a cell used Claude Code like a small team of software engineers to work on guidance systems, test a rocket, then analyze its failure. The case is spectacular, but it mainly reveals a deeper phenomenon: AI is starting to make rare military expertise much less rare.'
pubDate: 2026-09-14
draft: false
featured: false
section: computing
contentType: research
tags:
  - 'Claude '
  - Anthropic
  - Intelligence Artificielle
  - Armement
  - Cybersécurité
  - Renseignements
  - Agent IA
coverImage: /blog/images/posts/C335D4D2-D1B8-492A-9CBD-55FF2951BCC5.png
coverAlt: Multiple software agents work in parallel in an engineering lab linked to a weapons program.
author: Voldigoade
locale: en
sourceSlug: 2026-09-14-claude-a-participe-a-un-programme-de-missile-le-vrai-danger-est-ailleurs
sourceHash: 4929b0bcf8d6919f9f25a681b789226a6f29358c9711a86f9435a2d1e2ae8602
manual: false
---

The rocket had been launched.

The test appears to have failed.

A few hours later, its developers returned to ask Claude for help understanding why.

This scene is not lifted from a science-fiction scenario.

It appears in a report published by Anthropic on September 10, 2026.

According to the company's internal investigation, a cell based in northern Yemen was using Claude Code across several weapons programs. The model was intervening notably on guidance, navigation, control, simulation, and analysis software.

The users were no longer content with chatting with a single instance.

They put multiple Claudes to work in parallel.

One wrote.

Another researched.

A third reviewed the work produced by the first.

Anthropic sums up the situation with a phrase far more important than it appears:

**Claude Code was being used in place of human software engineers for part of the work.**

That is where the real subject lies.

Not in the simplistic idea that "an AI knows how to build a missile."

But in a much deeper question:

**what happens when certain skills that only a few specialists possessed become available in software form?**

## Let's start with what we actually know

The Anthropic document covers operations detected between December 2025 and August 2026.

The company says it identified and interrupted abuse of Claude in seven major categories: cyber operations, influence, surveillance, fraud, biology, conventional weapons development, and illicit model distillation.

The section devoted to conventional weapons describes six cases.

Three are attributed to actors located in China.

Two to actors located in Russia.

One to Yemen.

Some used Claude directly to develop software intended for weapons systems.

Others used it for research, intelligence, or procurement.

The Yemeni case is the most spectacular because it goes beyond simulation.

Anthropic states it observed sufficient elements to conclude that a guided rocket had actually been tested.

It appears to have failed.

The company emphasizes above all something many headlines will forget:

**it does not possess proof showing the cell succeeded in deploying an operational system.**

This is essential.

Claude did not produce a miraculously functional weapon.

It participated in a real engineering process that still seemed to be encountering serious difficulties.

And it is precisely for this reason that this case is interesting.

## Engineering is almost never a magical moment

We often imagine dangerous AI use in a spectacular form.

Someone writes:

> Design me a weapon.

The AI responds.

The weapon exists.

The reality of engineering is far more boring.

And far more worrying.

You have to write code.

Make a compilation chain work.

Build a simulation.

Compare results.

Hunt for a bug.

Modify parameters.

Relaunch.

Test.

Observe a failure.

Return to the data.

Correct.

Start over.

A large part of an AI's economic value does not come from its ability to immediately find the perfect answer.

It comes from the fact that it **reduces the cost of each of these small iterations**.

The Yemeni program described by Anthropic illustrates exactly this.

Claude did not replace the entire military system.

It shortened certain pieces of the loop.

And a faster loop ends up counting enormously.

## The most important detail is almost invisible: several Claudes worked together

The cell allegedly used different instances with separate functions.

Code.

Research.

Review.

This organization is interesting because it transforms AI from an individual tool into a **work structure**.

An experienced engineer can normally delegate a task to several colleagues.

The problem is that you have to possess those colleagues.

Recruit them.

Pay them.

Coordinate them.

Find people with the necessary skills.

Keep them long enough.

An organization with a single technical lead and multiple agents can theoretically reproduce part of this division of labor at a totally different cost.

This does not turn five Claude agents into five complete human engineers.

They can make the same mistakes.

They can share the same blind spots.

Their mutual review can create an illusion of consensus.

And certain tasks remain out of reach without hands-on expertise.

But economically, the change is already immense.

Because a lack of specialists is no longer necessarily a wall.

It can become merely a slowdown.

## This is what I would call the compression of expertise

For a long time, certain capabilities were hard to access not because the information was secret, but because **knowing how to use it correctly required years of training**.

The equations can be public.

The software libraries can be public.

The documentation can be public.

The open-source code can be available.

Yet very few people are capable of assembling all of this into a functional system.

The knowledge exists.

The expertise is missing.

Frontier models are precisely beginning to reduce this distance.

Anthropic developed in parallel with its report several evaluations devoted to tactical intelligence and conventional weapons systems.

Its conclusion is important:

on certain tasks, current models are capable of accomplishing work that historically required **rare and highly trained human experts**.

This does not mean they master all military engineering.

The evaluations involve simulations.

Results degrade in the most difficult environments.

And above all, a simulation is not a battlefield.

But the direction is clear.

A rare skill can gradually become a computable service.

And when that happens, the number of people able to attempt certain operations increases.

## Material constraints have obviously not disappeared

An AI does not manufacture an engine with tokens.

It does not produce components.

It does not build a factory.

It does not replace a test bench.

It does not automatically turn a working simulation into a robust system in the real world.

Anthropic acknowledges this itself.

For many actors, access to hardware, components, manufacturing, testing, and logistics will remain a major bottleneck.

This is a fundamental distinction.

AI can democratize **part of the expertise** without instantly democratizing all the industrial capacity needed to exploit that expertise.

But reducing a single bottleneck can be enough to shift the balance.

If an organization already has the hardware but lacks software specialists, AI brings exactly the resource it lacks.

If it has the specialists but not enough to analyze all its data, same thing.

If it has an existing program but advances slowly for lack of simulation or debugging capacity, same thing.

AI does not have to solve all constraints.

It simply has to remove one that is sufficiently important.

## Protections worked — partially

Anthropic's report does not tell the story of a totally absent security system.

Many requests would have been blocked.

Users therefore employed several tactics to circumvent protections.

They notably allegedly concealed the final objective of certain tasks and distributed their work across multiple conversations so that no isolated session would necessarily reveal the entire program.

This behavior reveals a very difficult problem for model providers.

An immense part of the technologies needed for a military system also has perfectly legitimate civilian uses.

A control algorithm.

A simulation.

An embedded system.

Vision software.

A trajectory optimization.

A signal processing tool.

A model cannot simply refuse everything touching on these subjects.

That would be equivalent to refusing a considerable part of modern engineering.

The challenge consists in detecting **the overall intent** behind a succession of requests that, taken individually, may be banal.

And an intelligent adversary knows precisely that this intent is what they must hide.

## The model sees a task. The adversary sees a program.

This is probably one of the most important problems the report reveals.

A traditional security system can examine a request:

"Is this dangerous?"

But a complex operation can be composed of a hundred perfectly reasonable requests.

Request A concerns a piece of code.

B concerns a compilation error.

C concerns a sensor.

D concerns a simulation.

E concerns telemetry analysis.

None says:

"here is my complete military program."

The user possesses the global context.

The model, however, may see only a fragment.

The security of advanced agents will therefore have to progressively reason not only on **what is being asked now**, but on the entire trajectory of a project.

This is much harder.

It requires linking sessions.

Understanding dependencies.

Detecting hidden objectives.

And doing so without turning every legitimate engineer, researcher, or student into a suspect.

## Claude is not the only problem, moreover

Another Anthropic conclusion deserves highlighting.

The open or semi-open models tested by the company remain globally behind the best proprietary systems on certain military evaluations.

But several already show concerning capabilities.

In other words, even if Anthropic built a perfect filter around Claude tomorrow, the problem would not disappear.

An actor can change providers.

Use multiple models.

Go through resellers.

Use an open model locally.

Mix tools according to the task.

The September report moreover describes several operations in which actors were already combining multiple AI providers for different roles.

This strongly limits the idea that the problem could be solved solely by better moderation of an American chatbot.

Closed models do, however, offer something that local models generally do not offer their creator:

**visibility.**

## Labs become involuntary intelligence services

This is an extremely strange consequence of this new era.

Historically, discovering that a group was developing a weapons system required human intelligence, intercepts, satellite imagery, recovered materiel, investigations, or open sources.

Anthropic finds itself today in a different position.

If an actor uses Claude directly to work, the company can sometimes observe traces of this activity on its own platform.

It can spot patterns.

Link accounts.

See the types of problems handled.

Identify circumvention attempts.

Close access.

Then transmit certain intelligence to authorities or other companies.

A model provider thus becomes, almost accidentally, an observation point on operations that would formerly have been invisible to it.

This is powerful.

But it also creates a new dependency.

Because a large part of the facts we know today about these operations comes precisely from the company that provided the model.

## We must therefore read the report for what it is

Anthropic has access to internal data that independent journalists and researchers do not.

That is its strength.

But the report remains **an Anthropic report on Anthropic**.

We do not publicly have the full raw data allowing reproduction of every attribution.

The internal names given to the groups are Anthropic's.

Some intent and origin assessments rest on its analysis.

It would therefore be excessive to treat every conclusion as if it had been independently established before a court.

Reuters and other media have verified the report's existence and questioned its content, but they obviously do not have the company's complete telemetry.

The right position is neither to blindly believe Anthropic nor to reject the document.

It is to distinguish:

what Anthropic claims to have directly observed;

what it infers from that;

and what these observations already suffice to demonstrate without accepting all the inferences.

Yet even with this caution, one thing remains hard to ignore.

Real actors already consider models useful enough to integrate them into real operations.

## An AI does not need to be better than the world's best expert

This is perhaps the most frequent error in discussions of risk.

We ask:

"Is Claude better than an extremely experienced military engineer?"

That is not necessarily the right question.

The real comparison may be:

Is Claude better than **the engineer this actor could have recruited otherwise?**

For a major power with thousands of specialists, the gain may be acceleration.

For a small isolated organization with little expertise, the same model can fill a much larger void.

The absolute level of the AI therefore matters less than **the gap between its capabilities and its user's initial resources**.

An average tool can produce an enormous advantage when it replaces something that did not exist.

This is the "uplift" that security teams are now trying to measure.

## The failed test in Yemen is almost more instructive than a success

At first glance, the rocket's failure might reassure.

Claude did not produce a perfect system.

Fine.

But that is not necessarily the right lesson.

Engineering programs fail.

Prototypes fail.

Human rockets explode.

Human software contains bugs.

A failure becomes dangerous when it can be analyzed quickly and turned into a new iteration.

And that is exactly what Anthropic claims to have observed.

A few hours after the test, users returned to Claude to understand what had happened.

The machine had not eliminated the failure.

It had begun to **reduce the cost of learning after failure**.

In many technological domains, that is almost as important.

## We have long protected certain capabilities by protecting information

Classified.

Secret defense.

Restricted access.

Export controls.

But a large part of modern expertise rests on something else.

Information is already public.

What protects it is its complexity.

The fact that it takes a specialist to understand it.

Years to learn how to combine it.

Experience to distinguish a theoretical idea from a usable solution.

This is an invisible barrier.

And it is exactly this barrier that models are beginning to erode.

The security question is therefore no longer only:

**what information can an AI reveal?**

It becomes:

**what skills can it make available to someone who did not possess them?**

This shift is considerable.

Because forbidden information can be filtered.

General expertise is much harder to lock away.

## The real danger is probably not the missile

The missile naturally attracts attention.

It is concrete.

Spectacular.

Easy to understand.

But it risks masking the deeper change.

The same mechanism can apply to cyber espionage.

To surveillance.

To data analysis.

To propaganda.

To fraud.

To biological research.

To engineering.

To all activities where the limiting factor was until now the quantity of people sufficiently competent to do the work.

Frontier models are beginning to attack this scarcity directly.

And when a technology reduces the scarcity of expertise, it does not only give new tools to the most powerful actors.

It can bring new actors into domains they previously had no access to.

This is perhaps what the Anthropic report documents for the first time with such clarity.

We have spent years wondering what would happen if an artificial intelligence became capable of inventing an entirely new weapon.

Meanwhile, a quieter transformation has already begun.

**It does not need to invent human knowledge.**

It only needs to make it much less rare.