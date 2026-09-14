---
title: Der geheime Wettlauf, um die besten KI-Modelle zu kopieren
description: 'Hunderte Millionen Anfragen, Tausende gefälschte Konten und Modelle, die auf den Antworten der Konkurrenten trainiert wurden: Datenextraktion ist zu einem industriellen und geopolitischen Thema geworden. Aber zwischen legitimer Lernprozess, der Gewinnung von Fähigkeiten und echter Diebstahl ist die Grenze deutlich komplexer, als es scheint.'
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
coverAlt: Ein KI-Modell lernt heimlich die Fähigkeiten eines anderen Modells durch Millionen von Anfragen.
author: Voldigoade
locale: de
sourceSlug: 2026-09-13-la-guerre-secrete-pour-copier-les-meilleures-ia
sourceHash: 4ff675af2579b675dccd35a47c48d951280ac2c569cf8a01496693b9ee179a9e
manual: false
---

**151 Millionen Transaktionen.**

Dies ist die Menge, die Anthropic behauptet, zwischen Mai und Juli 2026 während einer Kampagne beobachtet zu haben, die von Alibaba für Claude durchgeführt wurde.

Nicht 151 Millionen Token. Nicht 151 Millionen Zeichen. **Über 151 Millionen Interaktionen mit dem Modell.**

Während des Höhepunkt der Operation gab Anthropic an, rund 3 Millionen Nachrichten pro Tag zu verzeichnen. Eine erste Infrastruktur nutzte schätzungsweise 5.000 gefälschte Konten, die Proxys, temporäre E-Mail-Adressen und virtuelle Kreditkarten verwendeten. Als diese Konten gesperrt wurden, habe sich der Datenverkehr auf eine andere Infrastruktur verlagert. 

Das vermeintliche Ziel war nicht, Claude Fragen zu stellen, weil Alibaba einen Chatbot benötigte.

Laut Anthropic wurden die Antworten, insbesondere auch Hinweise auf den Denkprozess, in Trainingsdaten umgewandelt, die dazu dienen, die Qwen-Modelle zu verbessern.

Mit anderen Worten: **Einen hoch entwickelten KI-Algorithmus dazu bringen, als heimlicher Lehrer für eine andere KI zu fungieren.**

Das sieht sofort nach Diebstahl aus.

Das Problem ist jedoch, dass die verwendete Technik einen völlig respektablen Namen in der Forschung im Bereich der künstlichen Intelligenz hat.

Die Destillation.

Und sie hat absolut nichts Illegales oder Böses an sich.

## Eine KI kann tatsächlich von einer anderen KI lernen.

Das Prinzip der Destillation ist erstaunlich einfach.

Nehmen wir ein sehr leistungsstarkes Modell, das wir den "**Professor**" nennen.

Er wird mit einer Vielzahl von Problemen konfrontiert:

- Code schreiben oder korrigieren;

- komplexe Argumente zu analysieren und zu verstehen;

- Dokumente kategorisieren;

- Werkzeuge verwenden;

- Daten analysieren;

- spezifische Fragen beantworten.

Wir speichern die Antworten.

Anschließend wird dieser riesige Datensatz verwendet, um ein weiteres Modell zu trainieren, das **Schüler** genannt wird.

Der Schüler erhält weder die internen Daten des Lehrers, noch seinen Quellcode. Er erhält auch keine exakte Kopie seines digitalen Gehirns.

Er beobachtet lediglich immer wieder, **wie ein deutlich leistungsfähigeres Modell auf verschiedene Probleme reagiert**.

Es ist bereits von sehr großem Wert.

Diese Technik ist sogar nicht neu. Im Jahr 2015 veröffentlichten Geoffrey Hinton, Oriol Vinyals und Jeff Dean den Artikel „Distilling the Knowledge in a Neural Network“ und zeigten, wie man einen Teil des Wissens aus einem komplexen System in ein einfacheres und kostengünstigeres Modell übertragen kann. 

Heute setzen alle Unternehmen in diesem Sektor auf diesen Prinzip.

OpenAI bietet offiziell ein System zur **Modell-Destillation** an, das es ermöglicht, die Ergebnisse leistungsstarker Modelle für die Feinabstimmung kleinerer und kostengünstigerer Modelle zu verwenden. Google bietet ebenfalls legitime Anwendungsfälle für die Destillation an. 

Die Destillation ist daher nicht das eigentliche Problem.

Die Frage ist: **Wer ist der Lehrer, wer ist der Schüler, und hat der Lehrer zugestimmt, den Unterricht zu geben?**

## Destillation, Extraktion, Kopie: Diese Wörter verbergen unterschiedliche Dinge.

Ein wiederkehrendes Problem in diesem Fall ist: Die Verwendung der Antworten einer KI, um eine andere KI zu trainieren, bedeutet nicht zwangsläufig, dass ein "Modell gestohlen" wird.

Es ist wichtig, verschiedene Stufen zu unterscheiden.

![](/blog/images/posts/045cda8d-31fb-4a0e-a46e-0b9914450a09.png)

Der Begriff „Modell-Extraktion“ wurde also nicht speziell für den aktuellen Konflikt zwischen KI-Laboren erfunden.

Bere 2016 zeigten Forscher, dass ein Modell, das nur über eine API zugänglich ist, manchmal durch intelligente Abfragen approximiert werden kann. Ihr Artikel trug den Titel *Diebstahl von Machine-Learning-Modellen über Vorhersage-APIs*. 

Das Prinzip erzeugt einen fundamentalen Widerspruch.

Um eine KI zu verkaufen, muss man den Nutzern die Möglichkeit geben, sie zu befragen.

Aber jede Antwort offenbart auch etwas über sein Verhalten.

Eine einzelne Anfrage hat kaum Wert.

Durch die systematische Auswahl von Millionen von Anfragen kann ein äußerst wertvolles Datensatz entstehen.

## Was Anthropic tatsächlich von den chinesischen Laboren verlangt

Es ist hier wichtig, präzise zu sein.

Die detaillierten Informationen, die öffentlich verfügbar sind, stammen hauptsächlich **aus den Untersuchungen und Feststellungen von Anthropic**. Diese stellen jedoch nicht allein eine unabhängige gerichtliche Entscheidung dar, die jeden einzelnen Sachverhalt feststellt.

Allerdings sind die genannten Volumina ausreichend groß, um die Natur des Themas grundlegend zu verändern.

In seinem Bericht von September 2026 behauptet Anthropic unter anderem, folgende Punkte festgestellt zu haben:

![](/blog/images/posts/5d5908f7-a26f-431f-9e6c-69ad9e63e8ee.png)

Wir befinden uns nicht mehr wirklich in der Situation, dass ein Forscher einige Tausend Anfragen versendet, um einen Wettbewerber zu untersuchen.

Anthropic beschreibt tatsächliche **industrielle Produktionsketten**.

Im Fall von Zhipu, beispielsweise, hätte das Labor die gewonnenen Argumente aufgezeichnet und dann Claude selbst verwendet, um diese zu bereinigen, zu normalisieren, zu bewerten und zusätzliche Daten für das Training zu generieren.

Der Professor würde also nicht mehr nur dazu verwendet, Antworten zu generieren.

Er würde auch an der **Erstellung seines eigenen Datensatzes für die Vervollständigung** teilnehmen. 

## Der Fall Alibaba geht noch einen Schritt weiter.

Die Kampagne, die Anthropic Alibaba zur Last gelegt hat, zielte insbesondere auf die Fähigkeiten in den Bereichen logisches Denken, Programmierung, Entwicklung von Software und die Durchführung komplexer Aufgaben mit mehreren Schritten.

Laut Anthropic wurden Claude Anweisungen gegeben, explizite Beweise für das Denken zu erzeugen, die dann gespeichert und in Daten für das „supervised fine-tuning“ (SFT) umgewandelt wurden.

Das SFT (Supervised Fine-Tuning) beinhaltet das Trainieren eines Modells anhand von Paaren, wie z.B.:

- `Problème → excellente réponse attendue`

Wiederholen Sie dies millionenfach bei sorgfältig ausgewählten Problemen, und Sie vermitteln nicht nur Faktenwissen.

Sie vermitteln auch **nützliche Verhaltensweisen**: wie man ein Problem angeht, welche Strategie man ausprobieren sollte, wie man sauberen Code erzeugt, wie man ein Werkzeug nutzt oder wie man eine Aufgabe über mehrere Schritte hinweg durchführt.

Anthropic behauptet, dass diese Daten dazu verwendet wurden, mehrere Generationen von Qwen zu verbessern. Das Unternehmen wirft Alibaba außerdem vor, Claude für die Entwicklung seiner internen KI-Forschungsinfrastruktur zu verwenden, einschließlich Reinforcement-Learning-Umgebungen und bestimmten Arbeiten im Zusammenhang mit Modellarchitekturen. 

Noch einmal: Das bedeutet nicht, dass Alibaba die „Gehirne von Claude“ hochgeladen hätte.

Allerdings, wenn die Vorwürde zutreffen, hätte Claude als **Forscher, Dozent und Datenquelle** sowie als **Bewertungs-Tool** für einen Konkurrenten gearbeitet.

Die technische Nuance macht das Phänomen nicht weniger beeindruckend.

Dadurch wird es interessanter.

## Kimi und DeepSeek: Was passiert, wenn das Modell, das Sie verwenden, nicht mehr das ist, das Ihnen antwortet?

Die Vorwürfe gegen Moonshot AI, den Entwickler von Kimi, sind wahrscheinlich die beunruhigendsten.

Anthropic behauptet, herausgefunden zu haben, dass bestimmte Anfragen, die von Nutzern gesendet wurden, und zwar solche, die davon ausgehen, Kimi zu befragen, **stille an Claude weitergeleitet wurden**.

Die von Claude erstellte Antwort wurde dann dem Benutzer als Antwort des Dienstes zurückgesendet.

Innerhalb eines Zehn-Tage-Zeitraums gab Anthropic an, rund 300.000 Anfragen von Moonshot-Kunden in diesem Zusammenhang erhalten zu haben. Die Infrastruktur hätte 5.380 betrügerische Konten verwendet. Ein Teil dieser Interaktionen wurde anschließend gespeichert, um Trainingspipelines zu füttern. Insgesamt weist Anthropic über 23 Millionen Interaktionen von Moonshot zwischen Mai und Juli aus. 

DeepSeek hätte eine ähnliche Methode verwendet.

Anthropic behauptet, dass bestimmte Anfragen von DeepSeek-Nutzern, insbesondere wenn diese von Entwicklungstools stammen, die mit verschiedenen Modellen kompatibel waren, ausgewählt und dann an Claude Opus weitergeleitet wurden.

Diese Antwort konnte also sofort verwendet werden, aber auch neue Daten liefern, die für das Training zukünftiger Modelle nützlich sind. Anthropic schätzt, dass bei dieser Kampagne, die nur über vier Tage im Juli 2026 stattfand, über 12,1 Millionen Interaktionen stattgefunden haben.

Wenn diese Anschuldigungen zutreffen, geht es nicht mehr nur um geistiges Eigentum.

Wir sprechen auch über das **Vertrauen der Nutzer**.

## Das verborgene Problem: Ihre Gespräche können als Rohmaterial dienen.

Dies ist möglicherweise der besorgniserregendste Teil des Berichts.

Anthropic behauptet, dass DeepSeek, Moonshot und Xiaomi Gespräche, die ursprünglich an ihre eigenen Modelle gerichtet waren, an Claude weitergegeben haben.

Und ein Gespräch mit einer KI für die Programmierung kann viel mehr als nur eine abstrakte Frage beinhalten.

Sie kann Folgendes enthalten:

- dieser proprietäre Code;

- interne Dokumente;

- API-Schlüssel;

- Identifikatoren;

- berufliche Daten;

- Namen und Kontaktdaten;

- Konfigurationsdateien;

- vertrauliche Informationen.

Anthropic gibt an, in den betreffenden Sitzungen sensible Informationen von Hunderten von Nutzern und Organisationen in mindestens zwölf verschiedenen Sprachen festgestellt zu haben. 

Im Fall von Xiaomi behauptet Anthropic, dass über 400.000 Anfragen von über 1.500 Konten an Claude gesendet wurden. Diese Konversationen sollten dann zur Erstellung von Daten für SFT (Supervised Fine-Tuning) und Reinforcement Learning für zukünftige Modelle verwendet werden. 

Es gibt also potenziell **zwei Ressourcen, die gleichzeitig abgebaut werden**:

die Leistungsfähigkeit des Vergleichsmodells

sowie die Benutzerdaten.

Dies sind völlig unterschiedliche rechtliche oder ethische Probleme.

Aber sie können genau denselben Schlauch benutzen.

## Es ist sogar möglich, Gespräche mit einer KI zu kaufen.

Der Bericht von Anthropic beschreibt einen weiteren Schritt: die Entstehung eines **zweiten Marktes für Destillationsdaten**.

Dienstleister ermöglichen den Zugriff auf Modelle, die normalerweise in bestimmten Regionen nicht verfügbar sind. Sie leiten Anfragen an Claude oder andere Modelle weiter, erhalten die Antworten und können sogar die Gespräche speichern.

Anthropic behauptet, dass einige dieser Daten anschließend an andere Labore weiterverkauft wurden.

SenseTime hätte somit Gespräche von Claude erworben, die von Drittanbietern stammen.

Anthropic beschuldigt MiniMax außerdem, ein eigenes Proxy-Netzwerk über ein Holdingunternehmen aufgebaut zu haben, das jedoch nur den Zugang zu Modellen von Anthropic und OpenAI, aber nicht zu den Modellen von MiniMax selbst anbietet. Anthropic argumentiert, dass diese Infrastruktur dazu diente, Daten für das Training zu sammeln. 

Wenn sich dieses Geschäftsmodell in großem Umfang bewährt, ändert dies die Situation grundlegend.

Ein Gespräch mit einer KI ist nicht mehr nur eine Interaktion zwischen einem Benutzer und einem Anbieter.

Sie kann als **ein handelbares Gut dienen, um eine dritte KI zu entwickeln**.

## Die US-Regierung ist nun in den Konflikt involviert.

Am 8. September 2026 veröffentlichten die NSA, das FBI und die CISA gemeinsam eine Warnung über dieses Phänomen.

Das Dokument beschuldigt chinesische Unternehmen, auf **industrieller Ebene** groß angelegte Destillationskampagnen gegen amerikanische Modelle durchzuführen.

Das amerikanische Argument ist sowohl wirtschaftlich als auch sicherheitsrelevant: Die Wiederverwendung bestimmter Fähigkeiten von bestehenden Modellen würde dazu beitragen, einen Teil der Kosten zu senken, die für ihre unabhängige Entwicklung erforderlich sind, einschließlich der Kosten für Entwicklung, Energie, grundlegende Forschung und Experimente. 

Die Destillation wird daher nicht nur als ein kommerzielles Problem, sondern auch als eine strategische Frage in der technologischen Konkurrenz zwischen den Vereinigten Staaten und China betrachtet.

Und China lehnt diese Darstellung ab.

Das chinesische Außenministerium hat darauf hingewiesen, dass die Fortschritte des Landes im Bereich der künstlichen Intelligenz auf seinen wissenschaftlichen und technologischen Fähigkeiten sowie auf seiner Politik der Offenheit und Zusammenarbeit beruhen. Peking forderte die Vereinigten Staaten auf, die es als unbegründete Anschuldigungen und Versuche zur Verunglimpfung zu betrachten, einzustellen. 

Wir haben also zwei gegensätzliche Interpretationen desselben Phänomens.

Für Washington und mehrere US-amerikanische Labore: **Industrielle Ausbeutung von geistigem Eigentum**.

Für Peking: Eine politische Anschuldigung, die chinesische Unternehmen in einem Sektor ins Visier nimmt, in dem der Wettbewerb zu einer strategischen Frage geworden ist.

Diese Technik ist vorhanden.

Ihre Interpretation hat nun eine geopolitische Dimension.

## Der Begriff „Diebstahl“ verdient es dennoch, präzise verwendet zu werden.

Google unternimmt nicht viele sprachliche Vorsichtsmaßnahmen: Das Team für Bedrohungsinformationen beschreibt Angriffe zur Informationsbeschaffung als eine Form von **industrieller Spionage** und Diebstahl von geistigem Eigentum.

Google bestätigt ebenfalls, dass es regelmäßig groß angelegte Kampagnen beobachtet und kürzlich darauf hingewiesen hat, dass einige über **100 Millionen Klicks** hinausgingen. 

OpenAI hat eine ähnliche Position.

Das Unternehmen räumt explizit ein, dass es legitime Verwendungszwecke für die Destillation gibt, und stellt sogar die notwendigen Werkzeuge bereit. Es betont jedoch auch, dass es Aktivitäten im Zusammenhang mit DeepSeek beobachtet hat, die es als kompatibel mit der "adversarialen Destillation" und Versuchen zur Umgehung seiner Beschränkungen ansieht.

 Anthropic verbietet hingegen in seinen Geschäftsbedingungen die Nutzung seiner Dienste zur Entwicklung eines konkurrenzfähigen Produkts oder zum Trainieren eines konkurrenzfähigen KI-Modells, ohne vorherige ausdrückliche Genehmigung. 

Allerdings gibt es einige Fragen, die getrennt betrachtet werden müssen.

**Vertragsverletzungen, technische Auslegung, Schutz des geistigen Eigentums, Geheimhaltung und Strafbarkeit sind keine gleichbedeutenden Begriffe.**

Die Behauptung, dass ein Labor Tausende von Konten missbräuchlich eingesetzt hat, um Beschränkungen zu umgehen, ist eine Aussage.

Eine weitere Möglichkeit wäre, zu behaupten, er habe bestimmte Fähigkeiten eines Konkurrents nachgeahmt, indem er deren Ergebnisse genutzt habe.

Es zu sagen, dass er „das Modell gestohlen“ habe, könnte endlich den Eindruck erwecken, dass seine Gewichte gestohlen wurden, was jedoch nicht das ist, was diese Berichte beschreiben.

Die Sprache der Unternehmen ist nicht neutral.

Wenn Anthropic von „illegaler Destillation“ spricht oder Google von „Diebstahl von geistigem Eigentum“ spricht, beschreiben diese Unternehmen ein reales technisches Problem, verteidigen aber auch einen bedeutenden Geschäftsaspekt.

Dies bedeutet jedoch nicht, dass ihre Anschuldigungen falsch sind.

Dies bedeutet lediglich, dass man ihre Terminologie nicht mit einer universellen Definition verwechseln darf.

## Kann man Claude tatsächlich mit genügend Anfragen nachahmen?

Nicht im Sinne einer direkten Kopie einer Datei.

Selbst mit hundert Millionen Antworten erhält der Schüler nicht automatisch:

- die genauen Gewichte des Professors;

- seine ursprünglichen Trainingsdaten;

- alle seine Fähigkeiten;

- seine internen Mechanismen;

- all seine Kenntnisse;

- nicht genau sein Verhalten.

Die Destillation ist in der Regel **selektiv und unvollständig**.

Aber sie muss kein perfektes Exemplar produzieren, um äußerst profitabel zu sein.

Nehmen wir an, dass ein Wettbewerber bereits ein sehr gutes Modell besitzt.

Was ihm vielleicht fehlt, ist nicht unbedingt eine allgemeine Intelligenz, sondern vielmehr bestimmte Fähigkeiten: Agentenprogrammierung, komplexes Denken, die Anwendung von Werkzeugen, Cybersicherheit, Mathematik oder die Fähigkeit, seine eigenen Ergebnisse zu überprüfen.

Er kann dann massiv ein Modell abfragen, das diese Bereiche besser beherrscht, einen spezialisierten Datensatz erstellen und seine Trainingsbemühungen dann gezielt auf die Bereiche konzentrieren, in denen er Schwächen hat.

Er ahmt möglicherweise nicht unbedingt **Claude** nach.

Er versucht, **das zu imitieren, was Claude besonders gut kann**.

Und das ist viel realistischer.

## Die Schlussfolgerungen einer KI sind zu einer strategischen Ressource geworden.

Moderne Modelle erzeugen manchmal nicht nur eine kurze Antwort.

Um ein komplexes Problem zu lösen, können sie Zwischenberechnungen durchführen, verschiedene Ansätze ausprobieren, Werkzeuge verwenden, Code schreiben und testen oder eine Strategie über eine längere Zeitspanne entwickeln.

Diese Bewegungsabläufe sind äußerst interessant, um ein anderes System zu trainieren.

Genau aus diesem Grund behauptet Anthropic, dass sie die Sicherheit der internen Prozesse von Claude gestärkt habe.

Das Unternehmen verwendet beispielsweise Zusammenfassungen von Schlussfolgerungen anstelle bestimmter interner Spuren und hat Schutzmechanismen gegen Techniken entwickelt, die es ermöglichen, Schlussfolgerungen zwischen mehreren Sitzungen zu wiederholen. Darüber hinaus kombiniert es dies mit spezialisierten Klassifikatoren, Metadatenanalysen und Identitätsverifikationsanfragen, wenn ein Verhalten verdächtig erscheint. 

Google hingegen plant, Techniken zu entwickeln, die es ermöglichen, Muster zu erkennen, die möglicherweise von Gemini abgeleitet wurden, sowie Verteidigungsmechanismen, die die für Angreifer nützlichen Daten reduzieren können. 

Die Situation ähnelt zunehmend einem klassischen Krieg zwischen Angreifern und Verteidigern:

Ein Labor schützt seine Ergebnisse;

ein anderer findet eine neue Möglichkeit, sie zurückzugewinnen;

Der Schutzmechanismus entwickelt sich weiter;

Die Extraktion verwendet eine andere Technik.

Aber hier ist der zu schützende Gegenstand nicht nur ein Programm.

Das ist angemessenes Verhalten.

## Die API einer KI ist auch eine kontrollierte Offenlegung von Fähigkeiten.

Das ist wahrscheinlich die wichtigste Idee hinter dem gesamten Fall.

Lange Zeit bedeutete der Schutz eines proprietären Softwares hauptsächlich den Schutz seines Quellcodes.

Die großen Modelle verändern diese Logik jedoch leicht.

Sie können Ihre Gewichtsdaten, die genaue Architektur und Ihre Trainingsdaten vollständig geheim halten.

Damit Ihr Modell einen kommerziellen Wert hat, müssen Sie es auch ermöglichen, dass andere sehen können, was es kann.

Jeder Antwort ist also eine winzige Demonstration von Kompetenz.

Alleine, verrät sie kaum etwas.

In großem Umfang wird sie zu einer Sammlung.

Und dieser Datensatz kann auch für das Training verwendet werden.

**Das bedeutet also, eine KI hinter einer API zu verstecken, ist gleichbedeutend mit dem Verkauf des Zugangs zu dieser Intelligenz, während man gleichzeitig versucht, Kunden daran zu hindern, sie ausreichend zu verstehen, um sie nachzubauen.**

Dies ist eine Spannung, die wahrscheinlich nicht verschwinden wird.

Die Forscher hatten sie bereits vor zehn Jahren mit deutlich einfacheren Modellen identifiziert. Die aktuellen Modelle haben jedoch die Menge, die gewonnen werden kann, drastisch erhöht. 

## Und genau hier wird die Diskussion wirklich unangenehm.

Es gibt etwas sehr Ironisches an der aktuellen Position der großen KI-Forschungseinrichtungen.

Ein Großteil der modernen künstlichen Intelligenz ist durch das Training mit riesigen Datenmengen möglich geworden, die von anderen Personen erstellt wurden: Texte, Code, Bilder, Diskussionen und Dokumente, die im Internet verfügbar sind oder über verschiedene Lizenzen und Quellen erlangt wurden.

Heute stellen die gleichen Unternehmen fest, wie unangenehm es ist, zu sehen, wie **ihre eigene Produktion als Trainingsmaterial für andere verwendet wird**.

Dies bedeutet jedoch nicht, dass die beiden Situationen rechtlich oder technisch identisch sind.

Das stimmt nicht.

Aber die Symmetrie lässt sich schwer ignorieren.

Über viele Jahre war die zentrale Frage:

**"Kann ein KI-Unternehmen sein Modell anhand von Daten trainieren, die von Menschen erstellt wurden?"**

Eine weitere Frage stellt sich nun:

**"Kann ein KI-Unternehmen sein Modell mit Daten trainieren, die von einer anderen KI erstellt wurden?"**

Und im Gegensatz zu dem, was der Begriff „Destillation“ vermuten lässt, haben wir noch keine allgemeingültige Antwort gefunden.

## Der nächste Konflikt zwischen KI-Systemen wird möglicherweise nicht nur auf GPUs beschränkt sein.

Es wird viel über Insekten, Rechenzentren, Strom und die Milliarden investiert, um Modelle zu trainieren, gesprochen.

All dies ist jedoch von entscheidender Bedeutung.

Aber eine neue Ressource wird strategisch wichtig:

**Die Antworten, die von den besten Modellen der Welt erzeugt werden.**

Da ein Labor, das nicht die besten Experten hat, zumindest theoretisch, versuchen kann, den Zugang ausreichend zu beschränken, zu umgehen, zu automatisieren oder zu verbergen, um so die Fähigkeiten in Daten umzuwandeln.

Die führenden Unternehmen müssen also gleichzeitig zwei gegensätzliche Dinge verteidigen:

sicherzustellen, dass ihre Modelle ausreichend zugänglich sind, um nützlich und rentabel zu sein.

wobei sie gleichzeitig verhindern, dass ihre Konkurrenten ausreichend von ihnen lernen können.

Anthropic kann 5.000 Konten sperren.

Weitere werden folgen.

Google kann Hunderte von Millionen automatisierter Suchanfragen erkennen.

Die Angriffe können sich auf eine größere Anzahl von Konten verteilen.

Diese Modelle können ihre Denkweise verschleiern.

Die Extraktionsgeräte können nach weiteren Signalen in den Endausgängen suchen.

Und jede Verbesserung eines Lehrers erhöht auch den potenziellen Wert seiner Unterrichtsstunden.

Die Destillation ist daher keine bloße technische Kuriosität.

Sie entwickelt sich zu **einer der neuen Schwerpunkte des globalen Wettbewerbs im Bereich der künstlichen Intelligenz**.

Und diese Art des Angriffs hat eine faszinierende Besonderheit: Im Gegensatz zu einem herkömmlichen Einbruch ist es nicht immer notwendig, das Tresor zu öffnen.

Manchmal reicht es bereits, einfach vor der Tür zu stehen und genügend gute Fragen zu stellen…

und die Antworten sorgfältig zu verstehen.
