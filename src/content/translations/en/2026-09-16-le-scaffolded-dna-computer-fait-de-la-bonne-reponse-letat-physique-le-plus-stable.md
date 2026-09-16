---
title: "The Scaffolded DNA Computer Makes the Right Answer the Most Physically Stable State"
description: "A molecular computer published in Nature does not simply compute with DNA: it is designed so that erroneous configurations are physically disfavored and the system drifts spontaneously toward the result. An elegant, powerful idea, yet still very far from replacing a processor."
pubDate: 2026-09-16
draft: false
featured: true
section: computing
contentType: article
tags:
  - Scaffolded DNA Computer
  - calcul moléculaire
  - DNA computing
  - thermodynamique du calcul
  - ADN
  - nanotechnologie
  - Maynooth University
coverImage: /images/posts/ef9bd87a-709e-4bf3-b9de-0317fbf613b3.png
coverAlt: "Visualization of a molecular computer where short DNA strands assemble along a scaffold, while incorrect configurations are disfavored in favor of a stable structure corresponding to the output."
author: Voldigoade
news: true
seoTitle: "Scaffolded DNA Computer : l’ordinateur ADN où la bonne réponse est thermodynamiquement favorisée"
seoTargetQuery: "Scaffolded DNA Computer thermodynamique"
locale: en
sourceSlug: 2026-09-16-le-scaffolded-dna-computer-fait-de-la-bonne-reponse-letat-physique-le-plus-stable
sourceHash: 52f909130982eb56103329d02609598d6c5ad1b89b6a8c051303e07b6428a129
manual: false
---

The most compelling finding published today in *Nature* is not simply that a team managed to "compute with DNA." Leonard Adleman was already doing that more than thirty years ago. The genuine conceptual breakthrough lies elsewhere: **what if we programmed matter so that the correct answer to a computation is precisely the physical state toward which it prefers to evolve?**

That is the core idea behind the **Scaffolded DNA Computer**, or SDC, introduced by Tristan Stérin, Abeer Eshra, Constantine Glen Evans, Janet Adio, and Damien Woods. Their system executes ten molecular programs, ranging from parity checking to multiplication, division, and addition of 25-bit binary numbers. The authors report more than 700 experimental runs, small instances completing in 30 to 60 seconds, programs reused up to 25 times, and a scaling milestone they characterize as **100 bits of molecular computation**.

Yet these figures become truly interesting only once one grasps how the SDC alters the very physics of computing.

## Most Computers Must Prevent Physics From Winning

A conventional digital computer preserves reliable logical states within an environment rife with fluctuations, noise, and losses. Transistors are switched, signals are regenerated and synchronized, memory cells are stabilized, and errors are detected or corrected. The details differ radically between a CMOS chip and a DNA reaction, but an overarching principle remains: **the intended result is not necessarily the spontaneous equilibrium state of the physical system**.

This is a longstanding distinction in information thermodynamics. Rolf Landauer demonstrated as early as 1961 that logically irreversible operations carry an unavoidable minimal thermodynamic cost; Charles Bennett later expanded upon the intimate relationship between logical reversibility, thermal noise, and dissipation. This does not mean that "every computation inevitably consumes massive amounts of energy," nor that the SDC magically circumvents Landauer's principle. Rather, it means that an actual computer must maintain mechanisms to preserve and manipulate information despite the thermodynamic tendencies of its substrate.

The challenge becomes acutely apparent in molecular computing.

DNA strand displacement circuits, for instance, are frequently formulated as sequences of cascading reactions: A triggers B, which releases C, which activates D. Researchers must meticulously control relative kinetic rates, prevent spurious cross-reactions, mitigate leakage, and stop the system from settling prematurely into chemically stable yet computationally flawed states.

In other words, one **programs a kinetic pathway**.

The SDC attempts nearly the reverse: **programming the thermodynamic destination**.

## A Program Whose Output Sits at the Bottom of the Valley

Imagine a rugged mountainous landscape. Each coordinate represents a possible configuration of the molecular system, and its altitude corresponds to its free energy.

In a traditional non-equilibrium architecture, the program behaves like a carefully marked trail: the system must navigate specific roads in a prescribed order while avoiding misleading forks.

In the SDC, the ambition is to reshape the topography itself so that the program's output rests in the most energetically favorable valley.

This concept is no mere post-hoc metaphor. It constitutes the governing design principle of the system unveiled in *Nature*. The authors seek to ensure that the configuration representing the correct answer is energetically favored over all configurations harboring errors. Their free energy minimum calculations and partition function models predict that, under appropriate conditions, the probability of occupying the target state can approach 1, while competing configurations become statistically disfavored.

This brings molecular computing strikingly close to declarative programming: rather than prescribing exactly *how* to reach the solution, one primarily encodes *what* the solution must be, then lets physical dynamics discover it.

This also marks the fundamental distinction from an easy, yet flawed, comparison to simulated annealing. A simulated annealing algorithm running on a CPU digitally evaluates an energy function and spends electricity computing its trajectory. Here, **the energy landscape is matter itself**.

## How to Program a Test Tube

The SDC utilizes a long DNA strand as a **scaffold**, divided into distinct binding sites.

At each site, multiple molecular "tiles"—themselves composed of short DNA strands—can compete. In the primary implementation, a computing strand features a central 24-base domain to identify its designated position on the scaffold, flanked by two 12-base computing domains.

These flanking domains carry the information necessary for the program and its input data.

The mechanism relies upon three key properties. The tiles are supplied in excess relative to the scaffold—typically ten times more concentrated—ensuring that the binding sites are promptly occupied. Adjacent domains that pair correctly form a stabilizing bond. And these bonds are intentionally kept weak enough to remain reversible: an incorrect tile is never permanently trapped in its mistake.

If two adjacent tiles encode an incompatible transition, their interface forms an **algorithmic mismatch**. This configuration features fewer stabilizing bonds. Driven by thermal fluctuations, the misplaced tile can detach and be replaced by a more compatible competitor.

Error correction is therefore not dictated by an external controller signaling "error at bit 17." It emerges naturally from the free energy differential between molecular assemblies.

The team also fastens a unique tile at the very first position—the **anchor**—to select a deterministic output. Starting from this anchor, compatibility cascades down the scaffold.

The final result is not simply recorded somewhere in memory: **the assembled molecular structure is itself the computational state**.

## The Heritage of DNA Origami, With a Pivotal Departure

This architecture borrows a remarkably effective tenet of DNA origami: taking a long single scaffold and introducing an excess of short staple strands that guide it spontaneously into a predefined geometry.

Conventional DNA origami already relies extensively on the thermodynamics of hybridization to form nanostructures. Yet it does not determine its shape by evaluating an algorithm over arbitrary inputs. The SDC injects that algorithmic layer by permitting multiple distinct strands to **compete for the same position** based on information encoded within their interfaces.

These illustrations from *Nature* showcase two historic milestones in the field—DNA computing and DNA origami—rather than the specific SDC apparatus introduced in the new study.

![https://media.springernature.com/lw685/springer-static/esm/art%3A10.1038%2Fs41565-024-01771-6/MediaObjects/41565_2024_1771_Fig11_ESM.jpg](https://tse3.mm.bing.net/th/id/OIP.1HWGiQztZgBHy42azSJrKAHaH8?r=0&w=474&h=379&c=7&p=0)

![https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fs43586-020-00009-8/MediaObjects/43586_2020_9_Fig1_HTML.png](https://tse4.mm.bing.net/th/id/OIP.cm3LeKVAiFyf7Xf99Y5WPAHaEz?r=0&w=474&h=379&c=7&p=0)

This conceptual bridge is crucial. DNA origami works precisely because one does not attempt to micromanage individual molecular collisions. One engineers a system whose desired self-assembly is globally favored.

The SDC asks: **can we accomplish the same feat with an algorithm?**

## Ten Programs Rather Than a Single Demonstration

The team did not build a narrow, purpose-built assay capable of solving only one pre-packaged problem.

Small instances of the SDC can compile **finite automata**, a classic category of computer science models where a machine traverses an input sequence while maintaining a compact internal state. For binary addition, this state corresponds, for example, to the carry value propagated from one column to the next.

The ten experimental demonstrations span addition, bit copying, parity calculation over an eight-bit input, multiplication by 3, division by 2 in base 3, a counter, a three-state non-deterministic finite automaton, several steps of the Rule 110 cellular automaton, a graph reachability problem, and balanced parentheses recognition.

This catalog carries greater weight than the arithmetic complexity of any single task. Multiplying a handful of bits by three will hardly threaten a modern CPU. What the experiment validates is the capacity to **reprogram the exact same molecular syntax** to execute diverse logical operations.

For a four-position SDC, the researchers already assemble a library of 395 strands covering computation, reporting, and reuse. Expanding to architectures supporting up to 25 positions adds another 1,144 strands.

This is clearly not a miniature general-purpose microprocessor. But neither is it an isolated chemical reaction rebaptized as a "computer."

## Une addition de 10 + 3 en trente secondes

The speed disparity observed in the experimental data warrants careful scrutiny.

Standard runs on small architectures typically employ an annealing schedule lasting approximately three hours, ramping the temperature down from 80 °C to 20 °C. On these four-position systems, the estimated average experimental yield reaches roughly **95.3%** relative to positive controls; addition alone averages **96.7%** under the authors' assessment metric.

Yet the researchers also dramatically accelerated the thermal protocol.

By dropping the temperature from 80 to 55 °C in under a minute, they still attained viable signal separation among outputs. Several binary additions yielded their four bits in fewer than 30 seconds; these rapid runs delivered an estimated **82.4% average yield for addition** and 81.2% across all tested computations.

Two immediate clarifications must be made.

First, this "yield" is an experimental metric derived from fluorescence levels normalized against controls. **It is not an accuracy rate directly equivalent to the gate-level error rate of a silicon ALU.**

Second, the team reads out bits using fluorescent reporter complexes. In the four-bit addition detailed in *Nature*, the four output positions are measured across separate experimental runs. One must not envision a tiny DNA chip equipped with a digital bus instantly delivering binary words to an electronic computer.

The molecular reaction can be rapid. The **input-output** interface remains an independent engineering hurdle.

## "100 Bits" Definitely Does Not Mean "100-Bit Processor"

This is likely the metric most vulnerable to distortion in sensationalized headlines.

The authors scaled their adder to handle two **25-bit** numbers, totaling 50 input bits. The execution trace also incorporates 25 carry bits and 25 output bits. The researchers therefore tally **100 bits of computation**: 50 input bits supplemented by 50 bits of internal state and output.

This bears almost no resemblance to what "64-bit" signifies in a "64-bit processor."

The bit-width of a CPU describes the native width of its registers, data paths, and address buses. The 100-bit figure used here quantifies the total volume of logical information processed across an experimental instance of a molecular computation.

Equating the two would be akin to conflating "100 variables in a reaction network" with a "100-bit microprocessor architecture."

The figure remains remarkable **within its experimental domain**, but strictly under that definition.

## As Systems Grow, Thermodynamics Ceases to Be Magic

The 25-position experiments represent perhaps the most valuable section of the paper, highlighting both the immense promise of the concept and the exact friction points where it begins to struggle.

To obtain a long, cost-effective scaffold, the team employs single-stranded DNA from the M13 bacteriophage, measuring roughly 7.2 kilobases. They isolate a 624-base window corresponding to the operational positions of the computation.

However, this choice introduces very tangible imperfections.

Different segments of a natural biological scaffold exhibit disparate binding affinities. Across the optimal selected window, the authors still calculate ΔG∘\Delta G^\circ values ranging from approximately **−20.9 to −11.1 kcal/mol at 65 °C**. Concentrations in the large scaffold experiments drop to 10 nM, compared to 100 nM in smaller tests, slowing tile binding kinetics and degrading signal-to-noise ratios. Finally, several unused kilobases of M13 remain in the vial, giving rise to off-target interactions.

This underscores an essential caveat: making the **correct ground state thermodynamically favorable does not guarantee that a large system will attain it swiftly**.

A valley can be the deepest point on a terrain yet remain virtually inaccessible if the journey is obstructed by ridges and metastable local minima.

Thermodynamics dictates where the system wants to settle. **Kinetics decides whether it arrives there before the experimenter runs out of patience.**

## One Hour, Fourteen Hours: The True Toll of Scaling Up

In the 25-position addition experiments, the authors introduce a metric MM, denoting the longest consecutive run of positions across which a carry error can propagate without encountering an absorbing logical "sink."

For random input pairs, the average value is roughly 4. An instance with M=4M=4 resolves in approximately **one hour**. A more demanding instance with M=5M=5 requires up to **14 hours** to achieve satisfactory experimental completion. The authors calculate, nonetheless, that over 84% of 25-bit input pairs have M≤5M\leq5.

Another experiment is even more telling.

To execute a BitCopy operation along a long scaffold, the team had to smooth the underlying energy landscape by permuting domain sequences to ensure that configurations with equal numbers of errors were approximately **isoenergetic**. With this design, they report roughly 71% yield across 20 positions and **59% across 25 positions after a 14-hour anneal**.

This is precisely the nuance that press releases risk glossing over.

The SDC does not prove that "thermodynamics automatically conquers the scaling problem." It reveals something far more intriguing: **the geometry of the energy landscape becomes an engineered, programmable medium in its own right**.

A program no longer merely describes an abstract logical truth table. It must occasionally be compiled to ensure that its own physical configuration space remains traversable.

## No Dedicated Error-Correction Subsystem Does Not Mean No Error Strategy

The authors rightly emphasize that their compact implementations dispense with the bulky modular redundancy and active repair circuits characteristic of many molecular computing schemes.

Yet this should not be read as an absolute absence of error management.

In long additions, inherent structural features of the algorithm itself curb errors: logical "sinks" absorb carries and halt error propagation. In the extended BitCopy, isoenergetic redesign is specifically implemented to prevent aberrant states from accidentally achieving greater stability than the valid output.

The real innovation is thus not "an absence of error correction," but rather that **error suppression can be offloaded onto landscape physics and algorithmic topology**, rather than relying on dedicated molecular machinery that inspects and repairs defects post-hoc.

That difference is profound.

## A Reusable, but Not Yet Autonomous, Computer

Another milestone easily overshadowed by arithmetic feats is that several molecular reactions were **reprogrammed sequentially within the same test tube**.

The technique involves introducing fresh input strands alongside competitive blockers to displace preceding inputs, followed by a thermal cycle to reset equilibrium.

BitCopy was thus cycled **25 times**, a counter 24 times across successive inputs, and two variants of addition nine times. Experimental renewal cycles required an annealing step of approximately 12 minutes, plus hands-on setup time.

This represents an impressive feat for a molecular platform, but the moniker "reusable" should not evoke an autonomous computer cycling in an unbroken while-loop.

Reagents are consumed. Waste blockers accumulate. Volume and buffer concentrations drift. In the study, an acoustic liquid handler automated dispensing, although the authors note that manual pipetting also succeeded.

The computation is undeniably molecular. Its orchestration remains firmly anchored in the wet lab.

## The SDC Did Not Emerge From a Vacuum

DNA computing dates back at least to Leonard Adleman's foundational 1994 experiment. Adleman mapped a small graph into DNA sequences and used standard molecular biology protocols to solve an instance of the Hamiltonian path problem.

Since then, researchers have explored self-assembling tile systems, strand displacement networks, logic gates, automata, molecular walkers, and in-memory computing.

In 2019, a collaboration including Damien Woods presented in *Nature* an ensemble of **355 reprogrammable DNA tiles** capable of executing 21 circuits on six bits, tackling tasks as varied as sorting, palindrome recognition, and cellular automaton simulation.

Theoretical work on equilibrium computing ran in parallel. In 2017, David Doty, Trent Rogers, David Soloveichik, Chris Thachuk, and Damien Woods formalized **Thermodynamic Binding Networks**, specifically inquiring whether an equilibrium ground state could coincide with the intended output of an algorithm.

Nor is the SDC the only recent experimental realization of this philosophy.

In January 2026, Boya Wang, Cameron Chalk, David Doty, and David Soloveichik published an **entropy-driven equilibrium computing** framework in *Science Advances*, demonstrating reversible signal transmission, self-assembling logic, and length-controlled polymer synthesis.

In 2023, Maxim Nikitin showcased an equilibrium paradigm leveraging low-affinity interactions among largely non-complementary strands, including a four-bit square root circuit resolving in roughly five minutes.

Framing the SDC as "the first thermodynamic computer in history" would therefore be historically inaccurate.

Its significance is more defined: **unifying a programmable scaffolded layout, diverse algorithmic capabilities, rapid small-scale execution, cyclic reusability, and scaling up to 25 positions within a single physical architecture.**

## The Most Illuminating Competitor Does Exactly the Opposite

A 2025 paper in *Nature* by Tianqi Song and Lulu Qian provides a stark contrast that illuminates the unique philosophy of the SDC.

Their system comprises over 200 molecular species, enabling logic circuits and DNA neural networks to be refreshed at least 16 times. However, their mechanism relies on thermal pulses to **recharge kinetic traps**, resetting the system into a high-energy non-equilibrium state poised to execute another computation.

Both approaches leverage DNA. Both apply heat cycles. Both pursue reusability.

Yet their thermodynamic strategies are virtually polarized.

Song and Qian: **rebuild an energetic non-equilibrium state, then burn that free energy during computation.**

Stérin, Eshra, and colleagues: **sculpt the physical system so that the solution is the ground state toward which it naturally flows.**

That distinction is far more illuminating than the generic umbrella term "DNA computer."

## No, Computation Has Not Become Free

It is tempting to leap to the conclusion that because the output is thermodynamically favored, this style of computing might alleviate datacenter power consumption.

The study proves no such thing.

DNA strands must be synthesized, solutions prepared and mixed, vials heated up to 80 °C, thermal schedules precisely controlled, fresh reagents injected upon reuse, and fluorescence signals measured. All of these steps carry tangible energetic and material costs. The authors acknowledge that their platform incurs substantial overhead in strand complexity, heating cycles, and annealing times.

More fundamentally, **being thermodynamically favored does not imply frictionless, zero-dissipation operation**.

The true virtue lies elsewhere: avoiding the need to dedicate layers of molecular machinery to continually resist the states that physics naturally favors.

It eases the friction between code and matter; it does not construct a perpetual motion machine.

## Why One Should Never Compare Its Clock Speed to a CPU

A 25-bit addition taking one hour or fourteen hours would be absurdly inefficient if the goal were to replicate a microprocessor.

Even the 30-second turnaround of the quickest small instances is unimaginably sluggish next to digital silicon.

Yet that comparison presupposes that the SDC is vying to replace the ALU in a smartphone or desktop CPU. It is not.

The genuine niche for molecular computation lies where **inputs, processing, and intended interventions are themselves inherently molecular**.

In nanomedicine or smart biomaterials, translating a chemical concentration into an electrical pulse, routing it through a microchip, and converting the decision back into a biological release is excessively convoluted. A molecular system capable of probing its microenvironment and restructuring matter directly at the nanoscale has no need to win benchmarks against silicon chips.

Its supreme advantage is **computing within the exact physical substrate upon which it acts**.

## From Molecular Computers to Programmable Matter

This is where the paper's vision turns most expansive.

The authors foresee similar design principles integrating with DNA data storage, logic-enabled DNA origami nanostructures, or synthetic networks combining RNA and proteins. They envision deployment within complex biological settings, although the current implementation remains confined to in vitro protocols.

In molecular data storage, the prospect is particularly captivating: rather than retrieving a DNA strand, sequencing it, analyzing it electronically, and re-synthesizing an updated record, data manipulation could transpire **directly within the molecular archive**.

For nanoscale robotics, the terminal output need not be an optical readout. It could be an altered conformation, an exposed binding pocket, a mechanical trigger, or the initiation of a downstream catalytic cascade.

At that frontier, the boundary between "computing machine" and "responsive material" dissolves.

## The Broader Research Challenge Behind the SDC

At first glance, the paper is about synthetic biology and oligonucleotides. In truth, its overarching insight concerns **compiling an algorithm directly into an energy landscape**.

In classical software, a compiler translates algorithmic logic into hardware machine code.

In a thermodynamic computer, a compiler must solve an entirely new challenge: mapping logical relations into physical potentials such that the intended state is not only thermodynamically stable, but kinetically accessible without becoming trapped in dead-end minima.

This introduces a new tier to the computing stack:

algorithm → logic → molecular affinities → free energy landscape → physical dynamics.

Theoretical research around the SDC demonstrates that partition function evaluation and free energy minimization for this architecture can be addressed through specialized algorithms; the authors notably harnessed NUPACK alongside proprietary tooling to design and analyze sequences. The accompanying code and datasets are preserved on Zenodo.

Software is no longer merely scripting a digital processor.

**It is programming what physical matter naturally seeks to become.**

## What the Experiment Demonstrates, and What Remains to Be Proven

The SDC experimentally confirms that one can align, across non-trivial programs, **logical correctness with thermodynamic equilibrium**. It shows that this approach can support rapid small-scale runs, tolerate modest molecular complexity, cycle repeatedly, and scale to configurations considerably larger than toy proofs of concept.

At the same time, the data document the practical roadblocks with refreshing candor: at 20 or 25 positions, yields decline, runtimes stretch from seconds to hours, sequence-dependent energetic quirks in natural DNA become disruptive, and the energy landscape must be meticulously re-engineered.

This reality is far more grounded than headlines proclaiming "100-bit DNA computer poised to replace silicon chips." It is also vastly more meaningful.

The work suggests that in molecular computing, resilience may stem not from an ever-escalating war against physical decay, but from harmony with underlying physical laws.

An incorrect state no longer needs to be continually monitored and purged.

It suffices, wherever possible, to ensure that **matter has no compelling physical reason to linger there.**
