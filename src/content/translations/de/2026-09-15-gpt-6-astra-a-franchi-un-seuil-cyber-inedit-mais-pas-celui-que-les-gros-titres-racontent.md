---
title: GPT-6 Astra hat eine beispiellose Cyberschwelle überschritten – aber nicht die, von der die Schlagzeilen erzählen
description: 'OpenAI hat GPT-6 Astra in Cybersicherheit als „Kritisch“ eingestuft. Hinter diesem spektakulären Begriff verbirgt sich ein viel konkreterer Wandel: Die KI beginnt, vom Sicherheitsassistenten zum autonomen Schwachstellenforscher zu werden.'
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
coverAlt: Ein System künstlicher Intelligenz analysiert autonom Code und Computersysteme auf der Suche nach Schwachstellen.
author: Voldigoade
locale: de
sourceSlug: 2026-09-15-gpt-6-astra-a-franchi-un-seuil-cyber-inedit-mais-pas-celui-que-les-gros-titres-racontent
sourceHash: edf32dcce10394e91c66c2a773e835872730c864af59f84bc665701ae7d75063
manual: false
---

Am 3. September 2026 hat OpenAI ein Wort verwendet, das noch keines seiner vorherigen Modelle erhalten hatte: **Kritisch**.

Nicht „exzellent in Cybersicherheit“. Nicht „Experte“.

Kritisch.

Das Wort kann leicht den Eindruck erwecken, ein Chatbot habe plötzlich die Macht erlangt, alles im Internet zu hacken. Das zeigen die Daten nicht.

Aber was die Daten zeigen, ist vielleicht interessanter.

Zum ersten Mal beginnen wir, eine KI zu sehen, die stundenlang echte Schwachstellenforschung betreiben kann, eigenständig mehrere Spuren erkundet, unbekannte Lücken entdeckt und einige davon zu einem funktionsfähigen Exploit verknüpft.

Das ist ein Wesenswechsel.

## Was „Kritisch“ wirklich bedeutet

Der Begriff stammt aus dem **Preparedness Framework von OpenAI**. Es handelt sich also weder um eine staatliche Zertifizierung noch um ein branchenweit anerkanntes Niveau.

In diesem Rahmen erreicht ein Modell das Cyber-Niveau Kritisch, wenn es insbesondere in der Lage ist, funktionsfähige Zero-Day-Exploits gegen viele reale, stark gesicherte Systeme autonom zu entdecken und zu entwickeln, oder neuartige Angriffsstrategien Ende-zu-Ende aus einem allgemeinen Ziel heraus zu konstruieren.

Ein **Zero-Day** ist hier eine Schwachstelle, die denen, die sie normalerweise beheben müssen, unbekannt ist. Der potenzielle Angreifer verfügt also über eine Lücke, für die noch kein öffentlicher Patch existiert.

Genau deshalb verdient ein Detail im Astra-Bericht weit mehr Aufmerksamkeit als seine Ergebnisse bei klassischen Benchmarks.

Die KI hat tatsächlich Lücken gefunden, die bisher nicht bekannt waren.

## Man gab ihr einen Browser. Dann ließ man sie suchen

OpenAI stellte Astra in einer Laborumgebung gängiger Software gegenüber, darunter ein Browser und ein Betriebssystemkernel.

Das Modell erhielt den Quellcode, die Software-Builds, klassische Schwachstellensuch-Tools und ein Ziel. Menschliche Forscher konnten das Experiment überwachen, aber keine Hinweise auf zu erkundende Spuren geben.

Astra verfügte dagegen über beträchtliche Ressourcen: Ultra-Reasoning, Webzugriff und bis zu **64 Sub-Agenten**. Man sollte sich also keinesfalls einen einfachen ChatGPT-Tab vorstellen, der fünf Minuten auf einem Laptop läuft.

Beim Browser entdeckte Astra mehrere bisher unbekannte Schwachstellen und baute eine Exploit-Kette, um Code-Ausführung außerhalb der Sandbox zu erlangen.

Die erste Version erforderte etwa **29 Stunden** Recherche. Die Forscher stellten dann fest, dass die verwendete Konfiguration bestimmte Schutzmechanismen der Produktionsversion fehlten. Astra nahm die Arbeit wieder auf und passte seinen Exploit an die offizielle Stable-Version in etwa **12 zusätzlichen Stunden** an.

Beim Betriebssystemkernel entdeckte das Modell ebenfalls mehrere neue Schwachstellen und produzierte einen Exploit für lokale Privilegienerweiterung in weniger als zwölf Stunden.

Genau dieser Teil verändert die Diskussion wirklich.

Eine KI, die Sicherheitstechniken kennt, gibt es schon lange.

Eine KI, die eine technische Untersuchung dutzende Stunden lang eigenständig verfolgen kann, bis sie eine Entdeckung produziert, die die für die Software verantwortlichen Menschen noch nicht kannten, ist etwas anderes.

## Die Benchmarks erzählen die gleiche Geschichte – mit einem großen Aber

Die Zahlen sind beeindruckend.

Auf **Sandbox Bench**, einer internen Evaluation mit 22 verwundbaren Zielen, kompromittierte Astra 10. GPT-5.6 Sol hatte nur eines geschafft.

Auf **SRE-Bench**, gewidmet dem Reverse Engineering von Binaries ohne Quellcode, erreicht Astra **99,2 %** bei pass@4 gegenüber 68,7 % für Sol, dabei etwa viermal weniger Output-Tokens verbrauchend.

Selbst der spektakuläre Perfect-Score auf ExploitBench muss jedoch mit Vorsicht gelesen werden: OpenAI räumt selbst ein, dass bestimmte historische Schwachstellen die Trainingsdaten des Modells kontaminiert haben könnten. Ein Sicherheitsbenchmark wird weit weniger überzeugend, wenn das Modell einen während des Trainings begegneten Exploit einfach wiedererkennen kann.

Genau deshalb sind die interessantesten Ergebnisse jene, die kürzlich entdeckten oder unbekannten Schwachstellen betreffen.

Und deshalb ist eine externe Evaluation besonders nützlich.

## Ein unabhängiges Labor hat versucht, ihn viel weiter zu treiben

Das Sicherheitsforschungsunternehmen Irregular hat Astra ebenfalls getestet.

Auf seinem Benchmark **FrontierCyber**, der echte Software und Hardware verwendet, löste Astra **86 von 226** Herausforderungen.

GPT-5.6 Sol: **34 von 226**.

Auf CyScenarioBench, der längere offensive Operationen testet, löste Astra mindestens einmal 9 von 10 Szenarien, mit einer durchschnittlichen Erfolgsrate von 59 %.

Aber hier ist die Zahl, die verhindert, diese Geschichte in Fantasie zu verwandeln:

**Keines der beiden Modelle hat die sieben als Elite klassifizierten Herausforderungen gelöst.**

Irregular beobachtete auch nicht, dass Astra die vollständig gehärteten Ziele seiner Evaluation erfolgreich kompromittierte.

Das ist vermutlich die beste Beschreibung des aktuellen Stands der Technik.

Astra ist kein Universalschlüssel, der jedes System öffnen kann.

Es ist gut genug geworden, um einen Teil der Arbeit zu automatisieren, die zuvor einen hochkompetenten Spezialisten erforderte.

Die Grenze verschiebt sich.

## Der eigentliche Wandel ist die Autonomie

Man misst Modelle noch immer häufig an Fragen: Wie viele Probleme gelöst, wie viele korrekte Antworten, wie viele Codezeilen generiert.

Diese Metriken werden zunehmend unzureichend.

Für Cybersicherheit könnte die wichtige Metrik bald viel konkreter werden:

**Wie viele Stunden und wie viel Geld braucht eine Maschine, um eine neue ausnutzbare Schwachstelle zu entdecken?**

Ein menschlicher Forscher kann mehrere Tage oder Wochen an einem Ziel arbeiten, bevor er etwas findet.

Ein Software-Agent kann mehrere Spuren gleichzeitig verfolgen, gescheiterte aufgeben, eigene Tools generieren, tausende Codezeilen lesen und die ganze Nacht weitermachen.

Er muss nicht unbedingt besser werden als der beste Forscher der Welt.

Es reicht, wenn seine Kosten und Suchzeit weiter sinken.

Da wird die Skalierung gefährlich interessant.

Eine von einem Menschen entdeckte Schwachstelle ist eine Schwachstelle.

Tausend Agenten, die parallel in tausend verschiedenen Projekten suchen, verwandeln Schwachstellensuche in einen industriellen Prozess.

## Und das ist wahrscheinlich auch die beste Waffe der Verteidiger

Das Paradoxon ist offensichtlich: Genau dieselbe Fähigkeit ermöglicht, eine Lücke zu finden, bevor ein Angreifer sie entdeckt.

Cloudflare hat bereits im September einen Dienst angekündigt, der OpenAIs Cyber-Modelle nutzt, um autorisierte Codebasen zu prüfen, Schwachstellen zu validieren und beim Aufspielen von Schutzmaßnahmen zu helfen. OpenAI finanziert auch Programme, in denen diese Modelle Open-Source-Software prüfen und korrigieren.

Cybersicherheit hat immer so funktioniert: Offensive und defensive Werkzeuge teilen einen großen Teil ihrer Kompetenzen.

Das Problem ist jetzt die Geschwindigkeit.

Wir haben Jahre damit verbracht, uns zu fragen, wann eine KI richtig programmieren kann.

Die nächste Frage könnte viel konkreter sein:

**Was passiert, wenn jede im Internet veröffentlichte Software permanent von tausenden Schwachstellenforschern inspiziert werden kann, die nie schlafen?**

Astra gibt darauf noch keine Antwort.

Aber zum ersten Mal sieht diese Frage nicht mehr wirklich nach Science-Fiction aus.