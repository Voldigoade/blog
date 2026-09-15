---
title: SpaceX will ein NVIDIA-Datacenter in den Orbit bringen. Das Schwierigste wird nicht sein, es zu starten
description: 'SpaceX will NVIDIAs Vera-Rubin-Systeme für Rechen-Satelliten adaptieren, die hunderte Kilowatt verbrauchen. Hinter dem Traum vom Weltraum-Datacenter verbirgt sich ein weit weniger spektakuläres Problem: jeden Watt Wärme im Vakuum abzuführen.'
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
coverAlt: ' Ein Starmind-Rechen-Satellit mit großen Solarflächen und Wärmestrahlern transportiert KI-Systeme in den Orbit.'
author: Voldigoade
locale: de
sourceSlug: 2026-09-15-spacex-veut-envoyer-un-datacenter-nvidia-en-orbite-le-plus-difficile-ne-sera-pas-de-le-lancer
sourceHash: f06782df1702c61c316f3ce86b1aadca2fdb595d8d110bf2e057d34727c43b28
manual: false
---

Elon Musk gibt an, "sehr zuversichtlich" zu sein, dass SpaceX bereits **2027** NVIDIA Vera Rubin NVL72-Computer in den Weltraum starten wird.

Diese Ankündigung klingt noch nach einer jener Meldungen, die man in die Kategorie "Elon Musk verspricht etwas für nächstes Jahr" einsortieren kann.

Ausgenommen dass es diesmal hinter dem Tweet bereits eine Architektur gibt.

NVIDIA bestätigt offiziell, mit SpaceXAI an **Starmind** zu arbeiten, einer Generation von Satelliten für KI-Berechnung, basierend auf einer raumtauglichen Adaption der Vera-Rubin-NVL72-Plattform.

SpaceX veröffentlicht sogar die Maße seines ersten Konzepts AI1: **30 Meter Höhe im ausgefahrenen Zustand, 75 Meter Spannweite, bis zu 250 kW Spitzenleistung und 175 kW im Mittel**.

Das wäre kein Satellit mehr, der ein paar Beschleuniger an Bord hat.

Das wäre ein Stück Datacenter, das in den Orbit geschickt wird.

Und entgegen dem, was die eisige Leere um ihn herum vermuten ließe, **ist das schwierigste Problem vielleicht nicht, die GPU dorthin zu bringen**.

Sondern zu verhindern, dass diese GPU kochen.

## SpaceX macht keinen Hehl mehr aus seiner Ambition

Das Projekt Starmind beruht auf drei Ressourcen, von denen SpaceX glaubt, sie besser kombinieren zu können als jeder terrestrische Betreiber:

die Sonne für den Strom;

Starship, um enorme Massen zu bewegen;

Starlink und seine Laser-Links, um die Daten zu transportieren.

SpaceX stellt sonnensynchrone Orbits als Mittel dar, eine extrem hohe Sonneneinstrahlung zu erhalten, während man den terrestrischen Zwängen von Netzanschluss, Grundstückskauf und Kraftwerksbau entgeht.

Die Berechnungsergebnisse würden anschließend über optische Intersatelliten-Links und die Starlink-Infrastruktur zurückgesendet.

Auf dem Papier ist das eine fast unwiderstehliche Idee:

warum immer mehr Kraftwerke und Datacenter auf der Erde bauen, wenn bereits ein gigantischer natürlicher Kernreaktor von **3,8 × 10²⁶ Watt** über uns strahlt?

Das Problem ist, was mit dieser Energie nach ihrer Nutzung geschieht.

## Fast der ganze Strom endet als Wärme

Ein Prozessor vernichtet die Energie, die er verbraucht, nicht.

Die hunderte Kilowatt, die in einen Rechen-Satelliten fließen, landen nahezu vollständig in thermischer Form.

Auf der Erde kann ein Datacenter diese Wärme an Luft, Wasser oder Fluide abgeben, die zu Kühltürmen zirkulieren.

Im Weltraumvakuum kommt keine Luftmasse, um den Strahler zu berühren.

Es gibt daher **keine Konvektion mit der Umgebung**.

Um die Wärme dauerhaft abzugeben, muss man sie hauptsächlich in Infrarotstrahlung umwandeln und ins All emittieren.

Das wirkt subtil.

Es ist in Wirklichkeit entscheidend.

## Ich habe die Größenordnung für AI1 berechnet

Man kann eine einfache Annäherung aus dem Stefan-Boltzmann-Gesetz ableiten:

```
P = εσAT⁴

```

wo `P` die abzuführende thermische Leistung darstellt, `A` die Strahlerfläche, `T` ihre absolute Temperatur, `ε` ihren Emissionsgrad und `σ` die Stefan-Boltzmann-Konstante.

Nehmen wir die **175 kW mittlerer Last, die SpaceX angibt**, einen idealen Strahler mit Emissionsgrad 0,9 und einer Temperatur von etwa 300 K, also 27 °C.

Man bräuchte approximativ:

**423 m² effektive Strahlerfläche.**

Für **250 kW Spitzenlast**:

**etwa 605 m².**

Akzeptiert man einen Strahlerbetrieb bei 350 K, also rund 77 °C, wird die Gleichung günstiger:

- ~229 m² für 175 kW;  

- ~326 m² für 250 kW.  


Diese Rechnung ist bewusst idealisiert. Sie berücksichtigt insbesondere nicht die von Sonne und Erde empfangene Energie, die tatsächliche Geometrie der Strahler, den Wärmetransport von den Prozessoren, Pumpen, Redundanz oder die Ausrichtung.

Sie liefert dennoch die richtige Größenordnung.

Eine im August veröffentlichte unabhängige Analyse von BCG schätzt nämlich, dass ein Satellit von lediglich **100 kW** etwa **400 m² Strahler** benötigen könnte, mit den derzeit in Betracht gezogenen Technologien.

Das Problem ist also keineswegs theoretisch.

## SpaceX gab es selbst zu, bevor sie von "überlegener Kühlung" sprach

Die aktuelle Marketing-Seite von Starmind stellt das Vakuum als effiziente thermische Dissipation ohne die Chiller und Kühltürme der Erde dar.

Aber SpaceX eigene regulatorische Dokumente bieten eine weit weniger komfortable Formulierung.

In ihrer bei der SEC eingereichten Unterlage erklärt das Unternehmen, dass KI-Rechen-Satelliten signifikant größere Solarpanels **und "substantially larger" Strahler für das Thermomanagement** benötigen werden.

Die beiden Aussagen sind nicht notwendigerweise widersprüchlich.

Strahlungskühlung verbraucht nicht den Strom eines gewaltigen Klimasystems.

Aber Energie einzusparen bedeutet nicht, **Fläche, Masse und Komplexität** einzusparen.

Genau hier zerstört der Slogan "der Weltraum ist kalt" mehr Verständnis, als er schafft.

## Und die ersten KI-GPUs sind bereits oben

SpaceX wird nicht einmal das erste Unternehmen sein, das eine moderne KI-GPU in den Orbit bringt.

Im November 2025 startete das Startup Starcloud **Starcloud-1** mit einem NVIDIA H100 an Bord.

Im folgenden Monat führte der Satellit eine Version von Gemini aus und trainierte nanoGPT, ein kleines Sprachmodell, das auf der Arbeit von Andrej Karpathy basiert.

Das macht Starcloud-1 offensichtlich nicht zum orbitalen Hyperscaler.

Aber es ändert die Frage.

Die grundlegende Machbarkeit, modernes beschleunigtes Rechnen im Weltraum zu betreiben, beginnt, den rein theoretischen Bereich zu verlassen.

SpaceX' Herausforderung ist nun **der Übergang vom Experiment zur Industrie**.

## Google arbeitet bereits an einem anderen Ansatz

Google entwickelt seinerseits **Project Suncatcher**.

Das Konzept besteht darin, Satelliten mit TPU auszustatten und sie über ausreichend schnelle optische Kommunikation zu verbinden, um schrittweise eine verteilte Recheninfrastruktur aufzubauen.

Google hat bereits Strahlungstests an seinen TPU durchgeführt und plant, mit Planet, zwei Prototyp-Satelliten Anfang **2027** zu starten.

Wir betrachten also nicht mehr eine isolierte Marotte von Elon Musk.

Mehrere Akteure beginnen ernsthaft, orbitales Rechnen zu erkunden.

Die Frage wird: **welche Berechnungen haben wirklich Interesse, die Erde zu verlassen?**

## Der schlechteste Kandidat könnte der sein, an den alle denken

Das intuitive Bild ist das eines gewaltigen Frontier-Modells, das in einer Satellitenkonstellation trainiert wird.

Genau das ist die schwierigste Anwendung.

Das verteilte Training riesiger Modelle hängt von extrem schnellen und häufigen Austauschen zwischen Beschleunigern ab. Terrestrische Cluster widmen eine gewaltige Menge an Ingenieurskunst darauf, GPU sehr nah beieinander auf Interconnects mit extrem hoher Bandbreite zu halten.

Trennt man diese Beschleuniger auf viele Satelliten auf, wird das Netzwerk selbst Teil des Informatikproblems.

Eine im Juli veröffentlichte Analyse zu Kosten und Netzwerkgrenzen des KI-Weltraumrechnens kommt zu dem Schluss, dass **Inferenz im Orbit realistisch werden kann**, während das Training von Frontier-Modellen wegen der Netzwerktopologie weit weniger wettbewerbsfähig erscheint als terrestrische Datacenter.

BCG gelangt zu einem ähnlichen Schluss: Orbitale Anlagen können für bestimmte Workloads Sinn ergeben, werden aber terrestrische Datacenter wahrscheinlich nicht ersetzen.

## Die ersten nützlichen Workloads könnten weit weniger glamourös sein

Stell dir einen Beobachtungssatelliten vor, der Terabytes an Bilddaten erzeugt.

Heute muss ein beträchtlicher Teil dieser Daten vor der Analyse zur Erde gesendet werden.

Aber wenn der Satellit lokal über ein Modell verfügt, das filtern kann:

- Wolken;  

- unnütze Bilder;  

- Feuerausbrüche;  

- Schiffe;  

- geografische Veränderungen;  

- Anomalien;  


kann er nur die nützliche Information senden.

Das Rechnen reist dann zu den Daten, statt alle Daten zum Rechnen zu transportieren.

Gleiche Logik für bestimmte souveräne Anwendungen, bestimmte latenztolerante Inferenz-Aufgaben oder Daten, die direkt im Weltraum erzeugt werden.

Diese Märkte sind weit weniger spektakulär als "GPT-8 um die Erde trainieren".

Sie sind wahrscheinlich glaubwürdiger.

## Der Zeitplan selbst verdient Überwachung

Es gibt schließlich einen kleinen chronologischen Widerspruch.

In ihrem 2026 bei der SEC eingereichten Prospekt schrieb SpaceX, man erwarte, den Einsatz von KI-Rechen-Satelliten **"as early as 2028"** zu beginnen.

Heute sagt Musk, er sei "highly confident", dass NVIDIA-Systeme **2027** geschickt werden, und die Starmind-Seite spricht von einer Produktion von Tausenden Satelliten, die bereits Ende 2027 beginnen könnte.

Das Programm scheint also beschleunigt zu haben.

Das verwandelt ein angekündigtes Datum nicht in ein garantiertes Datum.

Bei SpaceX mehr als anderswo verdient der Unterschied zwischen Ingenieursziel und tatsächlich eingehaltenem Zeitplan, beibehalten zu werden.

## Weltraum-Datacenter müssen die der Erde nicht ersetzen, um zu gelingen

BCG schätzt heute, dass orbitales Rechnen einen **erheblichen Mehrkosten** gegenüber terrestrischer Infrastruktur aufweist und dass selbst aggressive Verbesserungen bei Startkosten, Masse und Zuverlässigkeit diese Lücke nur verringern könnten.

Das ist wahrscheinlich die beste Art, Starmind zu betrachten.

Die Frage ist nicht:

> "Werden alle Datacenter in den Weltraum ziehen?"

Sondern:

> **"Gibt es ausreichend Berechnungen, für die Energie, Position, Daten oder terrestrische Zwänge rechtfertigen, mehr zu zahlen, um im Orbit zu sein?"**

Wenn die Antwort ja lautet, kann eine neue Ebene der Recheninfrastruktur entstehen, ohne jemals die zu ersetzen, die wir am Boden nutzen.

SpaceX beherrscht bereits zwei besonders seltene Zutaten: die industrielle Fertigung von Satelliten und ihren Transport in den Orbit.

NVIDIA liefert die dritte: das Rechnen.

Es bleibt nun das Problem, das weder Raketen noch Benchmarks verschwinden lassen können.

**Jeder Watt, den die künstliche Intelligenz nutzt, muss am Ende irgendwo hin.**

Sogar im Weltraum.