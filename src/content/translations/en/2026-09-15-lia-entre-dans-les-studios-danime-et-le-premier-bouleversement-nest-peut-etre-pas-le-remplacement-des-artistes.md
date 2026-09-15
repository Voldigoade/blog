---
title: AI Enters Anime Studios and the First Disruption May Not Be Replacing Artists
description: At OLM Digital and other Japanese players, AI doesn't yet produce episodes at the click of a button. It is already tackling much less visible tasks — cut search, colorization, QC, retakes, in-betweening — with sometimes measurable gains and a far deeper effect on studio organization.
pubDate: 2026-09-15
draft: false
featured: true
section: anime-manga
contentType: research
tags:
  - intelligence artificielle
  - production d’anime
  - OLM Digital
  - GENIAC
  - ANIMINS
  - animation intermédiaire
  - colorisation
  - AI Mage
coverAlt: A Japanese animator reviews multiple stages of a single anime cut on screen, from line art to colorization, while an AI tool quietly assists the production pipeline.
author: Voldigoade
news: false
seoTitle: 'IA et production d’anime au Japon en 2026 : ce qui change vraiment dans les studios'
seoDescription: 'OLM Digital, GENIAC, SHIAGEDO, Mage Search, AniDepth : ce que l’IA automatise déjà dans les studios d’anime japonais, avec les gains mesurés et leurs limites. Requête cible : IA production anime Japon 2026'
locale: en
sourceSlug: 2026-09-15-lia-entre-dans-les-studios-danime-et-le-premier-bouleversement-nest-peut-etre-pas-le-remplacement-des-artistes
sourceHash: 46b7a887f27eea6ef4835d2f9074314b0ec184915481bf07e6588968c920db69
manual: false
---

If AI were to enter Japanese animation in the most spectacular way possible, one would expect it to generate characters, backgrounds, and entire sequences from a few prompts.

That is not where the most convincing results are appearing in 2026.

At OLM Digital, the company involved in series like *Pokémon* and behind the ANIMINS project, the figures published under the government-backed GENIAC program concern much less visible problems: **30–50% time savings on certain finishing operations, over 60% on cut search, 99% on preparing a dataset for that search, and a retake rate dropping from roughly 40% to 10% in a supervision-assistance workflow**.

None of these figures means "50% of animators can be cut."

They tell something more interesting.

**The first serious transformation of anime by AI may be the transformation of its production infrastructure.**

The studio begins to become searchable, measurable, partially automatable. Operations that depended on an employee's memory, a human eye scanning hundreds of cuts, or a chain of small manual manipulations can now be entrusted to specialized systems.

And that could, in the long run, alter the animator's craft almost as much as an image generator.

## First, Understand What AI Actually Touches

A 2D anime is not simply "drawn."

A **cut** — roughly equivalent to a shot — passes through multiple crafts and transformations. The *genga*, or key frames, define the important poses and moments. The *dōga* clean up the lines and produce, among other things, the in-between drawings needed for motion. Then come finishing and coloring, checks, corrections, photography/compositing, and numerous rounds of supervision.

A tiny error can travel back up this chain and trigger a retake — a return for correction.

It is precisely in these repetitive, numerous, and highly structured operations that AI today finds its most favorable terrain.

The **ANIMINS** project, launched in late 2024 under GENIAC by OLM Digital, was not meant to demonstrate that a model could produce an anime on its own. Its official objective was to determine how AI could slot into existing commercial workflows as a **support tool**. Commercial works were used with permission for research; a short anime titled *LINE OUT* served for near-production trials; and 24 animation companies ultimately backed the experiment.

The technologies tested nevertheless cover a considerable spectrum: key frame, in-betweening, finishing, colorization, character drawing assistance, search in previous episodes, and supervision. The ANIMINS works presented at conferences also explore anime scene generation, diffusion-based hair editing, smoke and fluid generation, keyframe extraction from human video, and several in-betweening methods.

The essential distinction is this: **exploring a technology in a lab does not equate to using it to produce a commercial anime week after week**.

In 2026, these two worlds coexist.


| Stage | System | What It Actually Does | Maturity Level | Published Result |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------- |
| Cut search | Mage Search | Automatically indexes episodes and retrieves cuts via natural language | Commercialized | Search time reduced by over 60%, data preparation by 99% in GENIAC evaluation |
| Finishing / color | SHIAGEDO | Learns the cut's colorization from already-colored images by the artist | Deployed and tested in production | 30–50% reduction in finishing time |
| Supervision | CAS・CATool | Assists a workflow for checking/correcting drawings | Used on a commercial anime | General animation director's pace ×1.2; retakes from ~40% to ~10% |
| Colorization QC | GapFill | Spots tiny uncolored areas and suggests their color | Research with professionals | ~22% faster on targeted hole-finding tasks |
| In-betweening | AniDepth | Generates intermediate frames with a diffusion model guided by depth and line art | Research | No published commercial productivity gain |
| In-betweening + finishing | ANICRA | Automates part of dōga and finishing from key frames | Trials with studios | ~70% less work on targeted stages, per its developer |


The table already reveals the gap: **the tools with the strongest usage evidence are not necessarily the most generative**.

## Automate, Assist, and Generate Are Not the Same Thing

The word "AI" flattens several different transformations.

**Automation** removes an already well-defined manipulation. Detecting colors on a reference sheet and automatically registering them in a palette is one example. SAKUGADO, OLM's internal tool, can recognize these references, update the palette when the sheet changes, and automatically replace already-applied colors.

**Assistance** keeps the human at the center of the decision. The system searches, suggests, detects, or prepares; the artist validates and corrects. Mage Search and GapFill belong mainly to this category.

**Generation**, finally, genuinely synthesizes new images or new intermediate states. AniDepth thus uses a video diffusion model to produce in-betweens from keyframes, with depth maps and line art to constrain the result.

The boundary can obviously blur. An automated pipeline can call a generative model. A generator can be just a small step in an assistance tool.

But this distinction prevents a common error: treating every AI adoption as Stable Diffusion arriving in a studio.

The SHIAGEDO case shows just how misleading that image is.

## SHIAGEDO Learns a Cut… Then Forgets Everything

Finishing is an obvious candidate for automation. A character can appear across successive frames with the same colors, yet an operator must repeat much of the work.

OLM's **SHIAGEDO** system targets precisely this problem.

But its operation is almost the inverse of a general-purpose large image generator.

According to OLM's technical presentation reported by CGWORLD, SHIAGEDO **uses neither Stable Diffusion, nor CLIP, nor any other large model pre-trained on a massive image collection**. It observes only the uncolored and colored images belonging to the current cut. From these few examples done normally by the artists, it locally trains a small cut-specific model, uses it to color the remaining frames, then **destroys the model and its data when the job is done**.

On an RTX 6000 Ada, OLM reports roughly 30 seconds of training and about ten seconds of processing per frame. A single frame can suffice to start, but accuracy improves when an artist first manually colors the frames corresponding to key poses. Stated accuracy is about 80% when details are included, versus about 90% in some research benchmarks; cuts with large motion remain difficult.

And yet, the overall result reported by GENIAC is a **30–50% reduction in finishing time** on the tested scope.

This operation is particularly revealing.

The human does not disappear. **Their correct work becomes the reference data from which the machine amplifies repetitions.**

Value therefore shifts in part: producing the right anchor frames, defining colors correctly, and spotting exceptions becomes even more important.

## An AI at 80% Can Be Useless If the Remaining 20% Costs Too Much

In a tech demo, 80 or 90% success can seem impressive.

In a commercial delivery, a forgotten eye, a strand colored with the wrong shade, or a single-pixel transparent zone remains an error.

This is one of the problems OLM explicitly formulates after ANIMINS: an AI does not need to be always right to be technologically remarkable, but **a delivered anime must, itself, be finished**.

A study published this year measures this paradox with great precision.

*No Pixel Left Behind: Filling Gaps in Anime Colorization*, presented at CHI 2026 by researchers from the University of Tokyo with Akinobu Maejima of OLM Digital, examines those tiny closed zones that accidentally remain uncolored. The **GapFill** system detects the holes, makes them immediately visible, enlarges them, and proposes a color the operator can correct. The study was conducted with **13 professional colorists**.

The result is emphatically not "AI colors faster."

When performing colorization from scratch, the system brought **no statistically significant acceleration**: 106.50 seconds with conventional tools versus 104.17 seconds with GapFill.

In contrast, when specifically hunting down the last defects, the difference became clear: 57.69 to 45.15 seconds in one test, then 66.27 to 51.91 seconds in a second — roughly **22% time savings in both cases**. With GapFill, no hole anticipated by the test was missed, unlike sessions with classic tools.

This is a far more important result than it appears.

**The best use of a professional AI is not necessarily to do the job in place of the human. It can be to remove the precise moment where the human is bad: spending tens of seconds hunting a microscopic anomaly.**

The study also concludes that model accuracy is not the sole determinant of utility. The ability to see what it detected and immediately correct its proposal weighs heavily in the trust placed in the tool.

This is as much a logic of interface and control as a logic of artificial intelligence.

## The Most Spectacular Gain May Concern… the Search Function

Among all GENIAC results, Mage Search seems almost mundane.

The system draws nothing.

It knows how to search.

In a long-running production, finding how a character held an object thirty episodes earlier, the exact look of a room, an outfit, an expression, or a similar cut can require combing through episodes and folders or asking someone who knows the work particularly well.

Mage Search ingests the video, automatically performs the necessary preprocessing, and then allows searching for cuts in natural language. Dialogue can also be indexed via speech processing.

GENIAC announces **over 60% reduction in cut search time** and **99% on the time needed to build the search dataset**. The product was commercialized in March 2026.

Since then, the experience no longer seems confined to OLM. AI Mage indicated in July that Mage Search had been adopted notably by **ENGI, OLM, and TMS Entertainment**. Its work analysis infrastructure, which the company calls "Anime General Intelligence" — despite the obvious ambiguity with the usual meaning of AGI — had then been built or tested on 35 productions, 16 of which were under formal adoption. Its new Mage Agent can cross-reference video, scripts, reference documents, and other production data. These figures are communicated by AI Mage itself and therefore do not constitute an independent performance measure, but they attest to a passage from experiment to commercial product.

This evolution deserves more attention than simple image search.

A studio has always accumulated enormous quantities of data: episodes, layouts, character sheets, scripts, corrections, licensing rules, translations, backgrounds, retakes.

Until now, part of their value remained locked in folders or in the memory of the people working there.

A search AI transforms this archive into **queryable operational memory**.

And that may be one of the most structural mutations currently underway.

## The Real Productivity Reservoir May Be the Retake

Drawing faster is not necessarily what saves a production the most money.

Not having to redraw can be far more profitable.

GENIAC thus reports that introducing an "animation director assistance workflow" using **CAS・CATool** on a commercial production increased the general animation director's work pace by roughly **1.2×** and reduced the retake rate from roughly **40% to 10%**.

Public documentation is not detailed enough to attribute these results to a precise AI mechanism. It would therefore be abusive to conclude that a generative model performs corrections in place of the supervisor.

But the potential economic result is more interesting than that.

In a sequential chain, a late correction can waste multiple people's time. A tool that prevents the error from reaching the next stage can therefore bring more than a generator capable of quickly producing a flawed first version.

This suggests a far more useful indicator for tracking AI in anime: **not the number of images it can generate, but the number of round-trips it avoids**.

## In-Betweening Is Indeed in the Crosshairs

That does not mean core graphic crafts are safe.

ANIMINS works directly on in-betweening.

**AniDepth**, presented at SIGGRAPH 2025 with OLM Digital's participation, uses a video diffusion model. The problem is particularly difficult: even an anime-adapted model retains biases inherited from training on more realistic images and can lose precise lines, flat colors, or character structure.

The researchers therefore convert images into depth maps, interpolate those, warp the line arts according to this geometry, then use these drawings as constraints to produce the colored intermediate frames. The goal is to preserve details even with large motion.

Other ANIMINS projects work on **LayerPack**, on line correspondence between two key frames, on retrieval of previously generated in-betweens, or on automatic colorization by segment matching.

But one element is still missing: **public figures demonstrating that AniDepth actually reduces the cost or duration of a commercial production by X%**.

It is promising research, not yet the equivalent of Mage Search or SHIAGEDO in terms of public industrial validation.

Another Japanese player goes further.

CrestLab presents **ANICRA** as an infrastructure capable of automatically generating part of the dōga and finishing from key frames. The company announces processing in a few tens of seconds and claims to have reduced workload on targeted stages by roughly **70%** during experiments with several studios. NTT Docomo, from which the project originated before its 2025 spin-off, reports the same order of magnitude.

However, a difference in level of proof must be maintained: these 70% are **an assertion by the vendor and its former parent group**, without a sufficiently detailed public protocol to compare them directly to academic experiments or convert them into "70% less cost per episode."

But it clearly shows where the next battle lies.

## Characters Are Also Concerned, But More in the Lab

The ANIMINS project does not stop at mechanical tasks.

METI explicitly cites **character drawing assistance** among the research axes. Associated publications range from diffusion-guided hair editing to anime scene generation from structured visual prompts, including controlled generation of smoke or fluid motion.

This makes the reassuring argument that "AI will only take the tedious tasks" insufficient.

Research also targets graphic and creative tasks.

What the data allows us to say in September 2026 is more precise: **the more open, creative, and difficult to automatically verify a task is, the less convincing the public evidence of a robust industrial gain is today.**

Conversely, the best results appear on narrow problems with an easily identifiable correct state: retrieving a cut, propagating a color, detecting a hole, applying a reference, or avoiding a retake.

This is probably not a coincidence.

## The Training Data Problem Already Produces Two Opposing Philosophies

A production AI does not only need to be good. A studio must know **why it has the right to use it**.

Japanese law offers relatively broad possibilities for certain analytical uses of copyrighted works under Article 30-4, but the Agency for Cultural Affairs itself recalls that application to generative uses remains dependent on the purpose of use and that case law remains limited.

OLM's technical choices are therefore interesting because they do not simply seek the maximum limit permitted by law.

In GENIAC, the commercial works used for research were used **with permission**, and no public dataset from the project is planned.

SHIAGEDO goes even further: data limited to the relevant cut, ephemeral training, model deletion at the end. OLM explains that certain continuous learning functions present in research are precisely not envisaged in the practical workflow due to rights questions.

This is another vision of AI than the giant model trained once on the internet.

**Studios may prefer small specialized models fed with their own materials, because traceability itself becomes a product feature.**

## An Incident at WIT Studio Shows Why

On April 10, 2026, WIT Studio issued an unusual statement regarding the opening of *Ascendance of a Bookworm: Adopted Daughter of an Archduke*.

Following reactions sparked by the broadcast, the studio investigated its pipeline and confirmed that generative AI had been used to produce material intervening in the backgrounds of certain cuts.

WIT then had the backgrounds redrawn and announced their replacement starting from the second episode. More interesting still: the studio specified that the use of generative AI in its productions was **in principle prohibited**, outside of specific experiments, and attributed the incident to a management and production control failure.

This case inverts the usual question.

The problem is no longer just: "Should a studio adopt AI?"

It becomes: **"Can a studio actually know where AI has been used in a chain involving many contributors?"**

As models become available in Photoshop, web services, production software, and at subcontractors, a company policy is no longer enough.

One must be able to control element provenance, impose rules on vendors, document tools used, and verify what comes back into the pipeline.

AI therefore creates a new job at the very moment it automates others: **production governance**.

## What the 30%, 60%, or 99% Savings Do Not Say

It would be tempting to add up all these figures.

That would be a mistake.

Reducing a finishing operation's duration by 50% does not reduce an episode's cost by 50%. A 99% reduction in the time to build a search index does not mean the whole production becomes a hundred times cheaper.

These results concern **different sub-tasks, measured under different protocols**.

They do not necessarily account for technical integration, GPUs, software development, data cleaning, staff training, human checks, or the cost of new errors.

And none of the public sources examined here demonstrates, to date, that a full TV anime produced with these tools costs X% less than a traditional equivalent at equal quality.

This is an important absence.

Gains may also be absorbed otherwise than by headcount reduction: more time spent on complex cuts, fewer delays, less outsourcing, more checks, or simply the capacity to produce in a sector already short of staff.

The Japanese Ministry of Culture still described the labor shortage in animation in 2026 as serious enough to make training and retention of professionals a national priority.

A NAFCA survey of 323 industry workers found a median of **225 hours worked per month** and a median equivalent hourly wage of 1,111 yen in its sample. It is not an exhaustive industry census, but it reminds us that productivity gains arrive in an environment already under strong tension.

The real economic question is therefore: **who recovers the saved time?**

The employee? The freelancer? The studio? The schedule? The quality? Or simply an even higher production volume?

The technological experiments do not yet allow an answer.

## Automating Dōga Also Creates a Problem Benchmarks Don't Measure

There is finally a paradoxical consequence.

In-betweening is precisely one of the most automatable stages. But it also constitutes, in several Japanese studios, an entry point into the profession.

CloverWorks still explains that its animators start their careers with *dōga* and considers this work a way to learn the methods, materials, and full production functioning before moving to *genga*. Toei Animation maintains, as of 2026, a specific training program dedicated to dōga alongside its genga curriculum.

This does not mean all repetitive tasks should be artificially preserved.

But an inference becomes difficult to avoid: **if the industry automates a significant part of junior work, it will have to rethink how it manufactures its senior professionals.**

A studio can gain thousands of hours in the short term and lose part of its skill transmission mechanism in the long term.

This is a different risk from "AI steals jobs," and probably more concrete.

## The Old Toei Precedent Shows What Might Actually Happen

This transformation did not start with ChatGPT.

In 2021, Toei Animation had already used the **Scenify** tool with Preferred Networks for its experimental short *URVAN*. Photographs of Sasebo were transformed into base background materials; artists then did the creative work and retouches.

Toei had measured a reduction in preprocessing time to roughly **one-sixth** of the traditional method on this project. The tool had been used on about two-thirds of the backgrounds.

The remarkable point is what Toei did with the saved time: artists could devote more effort to the cyberpunk elements that truly required their visual decisions.

This may be a better representation of the near future than an empty studio filled with GPUs.

Not:

**artist → AI**

but:

**repetitive work → tool → artist reassigned to the hard problem**.

Obviously, nothing guarantees a company will always choose to use productivity this way. It can also reduce costs or increase cadences.

Technology does not decide the distribution of the gain.

## The Real Change May Be a Studio Become "Computable"

One of OLM's most interesting findings ultimately has almost nothing to do with image generation.

In 3DCG, teams have long worked around DCCs — software like Maya or Blender — that provide a common infrastructure to which scripts, plugins, and automations can be connected.

Japanese 2D is far more fragmented. Paper and digital can still coexist; multiple software chain together; some information circulates as files and tacit knowledge. OLM therefore sees SAKUGADO not only as a drawing tool, but as a possible **common technical base** on which new technologies can be plugged.

This is where all the pieces of this investigation converge.

SHIAGEDO needs cut data.

Mage Search turns archives into a queryable base.

GapFill precisely measures a defect that was previously hunted visually.

CAS・CATool intervenes in correction cycles.

ANIMINS even experiments with automatic accumulation of intermediate productions and their metadata.

In other words, **before you can automate anime, you must make its process machine-readable**.

That may be the most important disruption of 2026.

The first generation of truly useful AI for studios does not replace the director or the star animator. It progressively transforms an artisanal, fragmented, and extremely people-dependent pipeline into a system where materials are indexed, repetitions detected, errors measured, and certain gestures automatically amplified.

The next stage may well reach more creative tasks. AniDepth, ANICRA, and character research show that frontier is already under attack.

But to know whether AI truly transforms Japanese animation, the number of diffusion-generated clips is probably one of the least interesting indicators to follow.

The far more revealing figures will be **the number of retakes per cut, the time spent searching for a reference, the proportion of deliveries requiring correction, supervisor throughput, the amount of junior work automated, and, above all, what studios do with the recovered hours**.

That is where it will be decided whether AI truly improves anime production or simply allows demanding even more from the same people.