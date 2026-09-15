---
title: SpaceX wants to send an NVIDIA datacenter into orbit. The hardest part won't be launching it
description: 'SpaceX wants to adapt NVIDIA''s Vera Rubin systems to compute satellites consuming hundreds of kilowatts. Behind the dream of the space datacenter lies a much less spectacular problem: evacuating every watt of heat into the vacuum.'
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: research
tags:
  - SpaceX
  - NVIDIA
  - intelligence artificielle
  - datacenter
  - Starmind
  - spatial
  - Vera Rubin
  - calcul haute performance
coverImage: /images/posts/d75c5e3b-d108-4d03-9c50-45b2c28ec6cc.png
coverAlt: ' A Starmind compute satellite equipped with large solar arrays and thermal radiators carries artificial intelligence systems into orbit.'
author: Voldigoade
locale: en
sourceSlug: 2026-09-15-spacex-veut-envoyer-un-datacenter-nvidia-en-orbite-le-plus-difficile-ne-sera-pas-de-le-lancer
sourceHash: f06782df1702c61c316f3ce86b1aadca2fdb595d8d110bf2e057d34727c43b28
manual: false
---

Elon Musk states he is "highly confident" that SpaceX will launch NVIDIA Vera Rubin NVL72 computers into space as early as **2027**.

This statement still resembles one of those announcements that can be filed under "Elon Musk promises something for next year".

Except this time, behind the tweet, there is already an architecture.

NVIDIA officially confirms it is working with SpaceXAI on **Starmind**, a generation of satellites intended for artificial intelligence compute and based on a space adaptation of the Vera Rubin NVL72 platform.

SpaceX even publishes the dimensions of its first AI1 concept: **30 meters tall once deployed, 75 meters wingspan, up to 250 kW of peak compute and 175 kW average**.

This would no longer be a satellite carrying a few accelerators.

It would be a piece of datacenter sent into orbit.

And contrary to what the freezing vacuum surrounding it might suggest, **the hardest problem may not be sending the GPUs up there**.

It's keeping those GPUs from cooking.

## SpaceX no longer truly hides its ambition

The Starmind project rests on three resources that SpaceX believes it can combine better than any terrestrial operator:

the Sun for electricity;

Starship to move enormous amounts of mass;

Starlink and its laser links to transport data.

SpaceX presents Sun-synchronous orbits as a way to obtain extremely high solar exposure, while avoiding terrestrial constraints of grid interconnection, land acquisition, and power plant construction.

The compute results would then be sent back through intersatellite optical links and the Starlink infrastructure.

On paper, it's an almost irresistible idea:

why keep building more power plants and datacenters on Earth when a gigantic natural nuclear power plant of **3.8 × 10²⁶ watts** already shines above us?

The problem is what happens to that energy after it is used.

## Almost all electricity ends up as heat

A processor does not destroy the energy it consumes.

The hundreds of kilowatts entering a compute satellite end up almost entirely as heat.

On Earth, a datacenter can transfer this heat to air, water, or fluids circulating to cooling towers.

In the vacuum of space, no mass of air comes to touch the radiator.

There is therefore **no convection with the environment**.

To durably reject heat, it must primarily be transformed into infrared radiation and emitted toward space.

This seems subtle.

It is in fact decisive.

## I calculated the order of magnitude for AI1

A simple approximation can be obtained from the Stefan-Boltzmann law:

```
P = εσAT⁴

```

where `P` represents the thermal power to evacuate, `A` the radiative surface, `T` its absolute temperature, `ε` its emissivity, and `σ` the Stefan-Boltzmann constant.

Take the **175 kW average load announced by SpaceX**, an ideal radiator with an emissivity of 0.9 and a temperature of approximately 300 K, or 27 °C.

One would need approximately:

**423 m² of effective radiative surface.**

For **250 kW peak**:

**approximately 605 m².**

By accepting to operate the radiator at 350 K, or approximately 77 °C, the equation becomes more favorable:

- ~229 m² for 175 kW;  

- ~326 m² for 250 kW.  


This calculation is deliberately idealized. It does not account, in particular, for energy received from the Sun and Earth, the actual geometry of the radiators, heat transport from the processors, pumps, redundancy, or orientation.

It nonetheless gives the right order of magnitude.

An independent analysis published by BCG in August estimates that a satellite of only **100 kW** could require approximately **400 m² of radiators** with currently considered technologies.

The problem is therefore absolutely not theoretical.

## SpaceX itself acknowledged this before speaking of "superior cooling"

The current Starmind marketing page presents the vacuum as enabling efficient thermal dissipation without the chillers and cooling towers of terrestrial facilities.

But SpaceX's own regulatory filings offer a much less comfortable formulation.

In its filing with the SEC, the company explains that AI compute satellites will need significantly larger solar panels **and "substantially larger" radiators for thermal management**.

The two statements are not necessarily contradictory.

Radiative cooling does not consume the electricity of an immense air conditioning system.

But saving energy does not mean saving **surface area, mass, and complexity**.

This is precisely one of the places where the slogan "space is cold" destroys more understanding than it brings.

## And the first AI GPUs are already up there

SpaceX will not even be the first company to place a modern GPU intended for AI into orbit.

In November 2025, the startup Starcloud launched **Starcloud-1**, carrying an NVIDIA H100.

The following month, the satellite ran a version of Gemini and trained nanoGPT, a small language model developed from Andrej Karpathy's work.

This obviously does not turn Starcloud-1 into an orbital hyperscaler.

But it changes the question.

The fundamental feasibility of running modern accelerated compute in space is beginning to exit the purely theoretical domain.

SpaceX's challenge is now **the transition from experiment to industry**.

## Google is already working on a different approach

Google is developing **Project Suncatcher** on its side.

The concept consists of equipping satellites with TPUs and linking them with sufficiently fast optical communications to progressively build a distributed compute infrastructure.

Google has already conducted radiation hardness tests on its TPUs and plans, with Planet, two prototype satellites at the beginning of **2027**.

We are no longer looking at an isolated whim of Elon Musk.

Several players are beginning to seriously explore orbital compute.

The question becomes: **which computes actually have an interest in leaving Earth?**

## The worst candidate could be the one everyone thinks of

The intuitive image is that of a gigantic frontier model trained in a constellation of satellites.

This is precisely the most difficult application.

Distributed training of giant models depends on extremely fast and frequent exchanges between accelerators. Terrestrial clusters dedicate a gigantic amount of engineering to keeping GPUs very close to each other on very high-bandwidth interconnects.

Separate these accelerators across many satellites and the network becomes part of the compute problem itself.

An analysis published in July on the network costs and limits of space AI compute concludes that **orbital inference may become realistic**, while frontier model training appears much less competitive against terrestrial datacenters due to network topology.

BCG reaches a similar conclusion: orbital installations may make sense for certain workloads, but they will likely not replace terrestrial datacenters.

## The first useful workloads could be much less glamorous

Imagine an observation satellite generating terabytes of imagery.

Today, a considerable portion of this data must be sent to the ground before analysis.

But if the satellite locally has a model capable of filtering:

- clouds;  

- useless images;  

- fire outbreaks;  

- vessels;  

- geographic changes;  

- anomalies;  


it can send only the useful information.

Compute then travels to the data instead of transporting all the data to compute.

Same logic for certain sovereign applications, certain latency-tolerant inference tasks, or data produced directly in space.

These markets are much less spectacular than "training GPT-8 around Earth".

They are probably more credible.

## The timeline itself deserves to remain under surveillance

Finally, there is a small chronological contradiction.

In its prospectus filed in 2026 with the SEC, SpaceX wrote it expected to begin deployment of AI compute satellites **« as early as 2028 »**.

Today, Musk says he is "highly confident" that NVIDIA systems will be sent in **2027**, and the Starmind page mentions production of thousands of satellites that could begin as early as late 2027.

The program therefore appears to have accelerated.

This does not turn an announced date into a guaranteed date.

With SpaceX more than elsewhere, the difference between engineering target and actually met timeline deserves to be preserved.

## Space datacenters don't need to replace Earth's to succeed

BCG today estimates that space compute retains a **significant cost premium** over terrestrial infrastructure and that even aggressive improvements in launch costs, mass, and reliability could only reduce this gap.

This is probably the best way to observe Starmind.

The question is not:

> "Will all datacenters go to space?"

It is:

> **"Are there enough computes for which energy, position, data, or terrestrial constraints justify paying more to be in orbit?"**

If the answer is yes, a new level of compute infrastructure can appear without ever replacing the one we use on the ground.

SpaceX already masters two particularly rare ingredients: industrial satellite manufacturing and their transport to orbit.

NVIDIA brings the third: compute.

There remains the problem that neither rockets nor benchmarks can make disappear.

**Every watt used by artificial intelligence must still end up somewhere.**

Even in space.