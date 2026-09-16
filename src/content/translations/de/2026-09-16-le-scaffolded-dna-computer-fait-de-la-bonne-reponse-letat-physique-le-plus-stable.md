---
title: "Der Scaffolded DNA Computer macht die richtige Antwort zum physikalisch stabilsten Zustand"
description: "Ein in Nature vorgestellter molekularer Computer rechnet nicht bloß mit DNA: Er ist so konstruiert, dass fehlerhafte Konfigurationen physikalisch benachteiligt sind und das System spontan zum Ergebnis driftet. Ein eleganter, wirkmächtiger Ansatz, der freilich noch weit davon entfernt ist, einen Prozessor zu ersetzen."
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
coverAlt: "Visualisierung eines molekularen Computers, bei dem sich kurze DNA-Stränge entlang eines Scaffolds anordnen, während inkorrekte Konfigurationen zugunsten einer stabilen, dem Ergebnis entsprechenden Struktur benachteiligt sind."
author: Voldigoade
news: true
seoTitle: "Scaffolded DNA Computer : l’ordinateur ADN où la bonne réponse est thermodynamiquement favorisée"
seoTargetQuery: "Scaffolded DNA Computer thermodynamique"
locale: de
sourceSlug: 2026-09-16-le-scaffolded-dna-computer-fait-de-la-bonne-reponse-letat-physique-le-plus-stable
sourceHash: 52f909130982eb56103329d02609598d6c5ad1b89b6a8c051303e07b6428a129
manual: false
---

Das bemerkenswerteste heute in *Nature* publizierte Ergebnis besteht nicht schlicht darin, dass einem Team „Berechnungen mit DNA“ geglückt sind. Das demonstrierte Leonard Adleman bereits vor über dreißig Jahren. Der eigentliche konzeptionelle Durchbruch liegt an anderer Stelle: **Was wäre, wenn man Materie so programmierte, dass die korrekte Antwort einer Rechnung exakt jener physikalische Zustand ist, zu dem sie sich von selbst am liebsten hinbewegt?**

Das ist der Kerngedanke des **Scaffolded DNA Computer**, kurz SDC, den Tristan Stérin, Abeer Eshra, Constantine Glen Evans, Janet Adio und Damien Woods vorstellen. Ihr System führt zehn molekulare Programme aus, von der Paritätsprüfung über Multiplikation und Division bis hin zur Addition von 25-Bit-Binärzahlen. Die Autoren berichten von mehr als 700 experimentellen Durchläufen, kleinen Instanzen mit Laufzeiten von 30 bis 60 Sekunden, Programmen, die bis zu 25-mal wiederverwendet wurden, und einer Skalierungsstufe, die sie als **100 Bits molekulare Berechnung** einstufen.

Wirklich aufschlussreich werden diese Zahlen jedoch erst, wenn man versteht, was der SDC an der Physik des Rechnens selbst verändert.

## Die meisten Computer müssen die Physik daran hindern zu gewinnen

Ein gewöhnlicher digitaler Rechner hält zuverlässige logische Zustände in einer von Fluktuationen, Rauschen und Verlusten geprägten Umgebung aufrecht. Transistoren werden geschaltet, Signale regeneriert und synchronisiert, Speicherzellen stabilisiert, Fehler aufgedeckt oder korrigiert. Die Details zwischen einem CMOS-Chip und einer DNA-Reaktion unterscheiden sich grundlegend, doch ein übergreifendes Prinzip bleibt bestehen: **Das erwünschte Resultat ist nicht zwangsläufig der spontane Gleichgewichtszustand des physikalischen Systems**.

Das ist eine alte Unterscheidung in der Thermodynamik der Information. Rolf Landauer wies bereits 1961 nach, dass logisch irreversible Operationen minimale thermodynamische Kosten verursachen; Charles Bennett arbeitete anschließend die Verknüpfung von logischer Reversibilität, thermischem Rauschen und Dissipation heraus. Das bedeutet weder, dass „jede Rechnung zwangsläufig Unmengen an Energie verbrauchen muss“, noch dass der SDC das Landauer-Prinzip auf magische Weise umginge. Es bedeutet vielmehr, dass ein realer Computer Mechanismen besitzen muss, um Information gegen die thermodynamischen Driften seines Trägers zu bewahren und zu manipulieren.

In der molekularen Datenverarbeitung tritt diese Problematik besonders deutlich zutage.

Schaltkreise auf Basis von DNA-Strangverdrängung beispielsweise werden häufig als Reaktionsfolgen skizziert: A löst B aus, das C freisetzt, welches wiederum D aktiviert. Die Forschenden müssen dann relative Kinetiken kontrollieren, parasitäre Nebenreaktionen unterbinden, Leckströme eindämmen und verhindern, dass das System vorzeitig in chemisch stabile, aber rechentechnisch falsche Zustände abdriftet.

Mit anderen Worten: Man **programmiert eine kinetische Trajektorie**.

Der SDC unternimmt praktisch das Gegenteil: **das thermodynamische Ziel zu programmieren**.

## Ein Programm, dessen Lösung auf dem Talboden ruht

Man stelle sich eine Gebirgslandschaft vor. Jede Koordinate entspricht einer möglichen Konfiguration des Molekülsystems, und ihre Höhenlage spiegelt ihre freie Energie wider.

In einer klassischen Nichtgleichgewichtsarchitektur gleicht das Programm einer markierten Route: Das System muss bestimmte Pfade in festgelegter Reihenfolge ablaufen und falsche Abzweigungen meiden.

Im SDC lautet das Ziel, das Relief selbst so zu modellieren, dass das Ergebnis des Programms im energetisch günstigsten Tal liegt.

Dieser Gedanke ist keineswegs eine bloße nachträgliche Metapher. Er bildet das leitende Konstruktionsprinzip des in *Nature* präsentierten Systems. Die Autoren streben danach, jene Molekülkonfiguration, die der richtigen Antwort entspricht, energetisch günstiger zu gestalten als Konfigurationen, die Fehler aufweisen. Ihre Berechnungen des Minimums der freien Energie und der Zustandssummen prognostizieren, dass unter geeigneten Bedingungen die Wahrscheinlichkeit, den Zielzustand einzunehmen, sich 1 annähern kann, während alle konkurrierenden Konfigurationen statistisch ins Hintertreffen geraten.

Das rückt das molekulare Rechnen verblüffend nah an die deklarative Programmierung heran: Statt präzise vorzuschreiben, *wie* man zum Ergebnis gelangt, codiert man vor allem, *was* das Resultat sein soll, und überlässt der physikalischen Dynamik dessen Auffinden.

Darin liegt auch der wesentliche Unterschied zu einer naheliegenden, aber unvollkommenen Analogie zum Simulated Annealing. Ein auf einer CPU laufender Annealing-Algorithmus modelliert eine Energiefunktion digital und verbraucht elektrischen Strom, um deren Entwicklung zu berechnen. Hier ist **die Energielandschaft die Materie selbst**.

## Wie man ein Reagenzglas programmiert

Der SDC nutzt einen langen DNA-Strang als **Scaffold** (Gerüst), der in separate Bindungsstellen unterteilt ist.

An jeder Stelle können mehrere molekulare „Kacheln“ (Tiles) konkurrieren, die ihrerseits aus DNA-Strängen bestehen. In der Hauptausführung besitzt ein Rechenstrang eine zentrale Domäne von 24 Basen zur Erkennung seiner Position auf dem Scaffold sowie zwei flankierende Rechendomänen von jeweils 12 Basen.

Diese Flanken transportieren die für das Programm und seine Eingangsdaten nötige Information.

Der Mechanismus fußt auf drei Merkmalen: Die Kacheln werden im Überschuss gegenüber dem Scaffold bereitgestellt typischerweise in zehnfacher Konzentration, damit dessen Plätze besetzt werden. Benachbarte Domänen, die korrekt paaren, erzeugen eine stabilisierende Bindung. Und die Bindungen sind bewusst schwach genug gehalten, um reversibel zu bleiben: Eine falsch eingebaute Kachel bleibt mithin nicht unweigerlich in ihrem Fehler gefangen.

Codieren zwei benachbarte Kacheln einen unvereinbaren Übergang, entsteht an ihrer Schnittstelle ein **algorithmischer Mismatch**. Diese Konfiguration weist weniger günstige Bindungen auf. Unter dem Einfluss thermischer Fluktuationen kann sich eine fehlplatzierte Kachel lösen und durch eine passendere Konkurrentin ersetzt werden.

Die Fehlerkorrektur wird somit nicht von einer externen Kontrollinstanz verordnet, die „Fehler an Bit 17“ melden würde. Sie resultiert unmittelbar aus der Energiedifferenz zwischen molekularen Baugruppen.

Das Team verankert zudem eine eindeutige Kachel an der ersten Position das **Anchor** (den Anker), um ein deterministisches Ergebnis vorzugeben. Ausgehend von diesem Anker pflanzt sich die Kompatibilität entlang des Scaffolds fort.

Das Endresultat ist nicht bloß irgendwo in einem Speicher hinterlegt: **Die assemblierte molekulare Struktur ist selbst der Rechenzustand**.

## Das Erbe des DNA-Origami mit einem entscheidenden Unterschied

Diese Architektur greift ein ungemein erfolgreiches Prinzip des DNA-Origami auf: Man verwendet ein langes Gerüst und fügt einen Überschuss kürzerer Stränge hinzu, die es von selbst in eine vorgegebene Struktur zwingen.

Klassisches DNA-Origami schöpft die Thermodynamik der Hybridisierung bereits intensiv aus, um Nanostrukturen zu formen. Es wählt seine Gestalt jedoch nicht durch Abarbeitung eines Programms anhand von Daten. Der SDC fügt diese algorithmische Ebene hinzu, indem mehrere Stränge um **dieselbe Position konkurrieren** können, gesteuert durch die an ihren Schnittstellen codierte Information.

Diese Abbildungen aus *Nature* zeigen zwei historische Meilensteine des Fachgebiets DNA-Computing und DNA-Origami und nicht die im neuen Aufsatz vorgestellte SDC-Apparatur.

![https://media.springernature.com/lw685/springer-static/esm/art%3A10.1038%2Fs41565-024-01771-6/MediaObjects/41565_2024_1771_Fig11_ESM.jpg](https://tse3.mm.bing.net/th/id/OIP.1HWGiQztZgBHy42azSJrKAHaH8?r=0&w=474&h=379&c=7&p=0)

![https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fs43586-020-00009-8/MediaObjects/43586_2020_9_Fig1_HTML.png](https://tse4.mm.bing.net/th/id/OIP.cm3LeKVAiFyf7Xf99Y5WPAHaEz?r=0&w=474&h=379&c=7&p=0)

Diese Parallele ist wesentlich. DNA-Origami funktioniert gerade deshalb so gut, weil man nicht versucht, jeden molekularen Stoß mikromanagend zu steuern. Man entwirft ein Gesamtsystem, dessen gewünschte Assemblierung global begünstigt ist.

Der SDC wirft die Frage auf: **Lässt sich dasselbe mit einem Algorithmus erreichen?**

## Zehn Programme statt eines isolierten Schaustücks

Das Team baute keine hochspezifische Reaktion, die lediglich ein einziges vordefiniertes Problem bewältigen könnte.

Die kleineren SDC-Systeme können **endliche Automaten** kompilieren, eine klassische Modellklasse der theoretischen Informatik, bei der eine Routine eine Eingabesequenz abarbeitet und dabei einen kleinen internen Zustand mitführt. Bei einer binären Addition entspricht dieser Zustand beispielsweise dem Übertrag, der von einer Spalte zur nächsten weitergereicht wird.

Die zehn experimentellen Demonstrationen umfassen Addition, das Kopieren eines Bits, die Paritätsprüfung einer Acht-Bit-Eingabe, Multiplikation mit 3, Division durch 2 zur Basis 3, einen Zähler, einen nichtdeterministischen endlichen Automaten mit drei Zuständen, mehrere Entwicklungsschritte des zellulären Automaten Rule 110, ein Erreichbarkeitsproblem in Graphen sowie das Erkennen balancierter Klammerausdrücke.

Dieser Fächer ist aussagekräftiger als der arithmetische Anspruch der einzelnen Aufgaben. Das Multiplizieren weniger Bits mit drei nötigt gewiss keinem modernen Prozessor Respekt ab. Was das Experiment belegt, ist das Vermögen, **dieselbe molekulare Grammatik umzuprogrammieren**, um grundverschiedene Logiken abzubilden.

Für einen SDC mit vier Positionen steht den Forschenden bereits ein Vorrat von 395 Strängen zur Verfügung, die Berechnung, Reporting und Wiederverwendung abdecken. Der Übergang zu Systemen mit bis zu 25 Positionen erfordert weitere 1 144 Stränge.

Das ist fraglos kein miniaturisierter Universalprozessor. Aber es ist ebenso wenig eine singuläre chemische Reaktion, die nachträglich zum „Computer“ umgetauft wurde.

## Eine Addition von 10 + 3 in dreißig Sekunden

Die in den Messdaten zutage tretenden Tempounterschiede lohnen eine genaue Betrachtung.

Übliche Experimente auf den kleinen Architekturen werden standardmäßig mit einem rund dreistündigen Annealing gefahren, das die Temperatur von 80 °C auf 20 °C absenkt. Auf diesen Vier-Positionen-Systemen beläuft sich die geschätzte mittlere experimentelle Ausbeute auf rund **95,3 %** im Vergleich zu Kontrollen; die Addition allein erzielt im Schnitt **96,7 %** nach Maßgabe der von den Autoren genutzten Metrik.

Die Forschenden haben das Protokoll jedoch auch drastisch forciert.

Indem sie die Temperatur in weniger als einer Minute von 80 auf 55 °C senken, erreichen sie noch immer eine brauchbare Signaltrennung zwischen den Ausgängen. Manche Binäradditionen liefern ihre vier Bits in unter 30 Sekunden; diese Schnellversuche weisen eine **geschätzte mittlere Ausbeute von 82,4 % für die Addition** und 81,2 % über alle betrachteten Rechnungen auf.

Zwei Klarstellungen sind hier unverzüglich anzufügen.

Erstens ist diese „Ausbeute“ eine experimentelle Größe, die aus Fluoreszenzniveaus relativ zu Referenzproben berechnet wird. **Sie ist keine Fehlerquote, die direkt mit der Gatter-Fehlerrate einer Silizium-ALU vergleichbar wäre.**

Zweitens liest das Team die Bits mittels fluoreszierender Reporter aus. Bei der in *Nature* dargestellten Vier-Bit-Addition werden die vier Ausgabepositionen in getrennten Experimenten gemessen. Man darf sich keineswegs einen winzigen DNA-Chip vorstellen, der über einen Digitalbus sofort ein Binärwort an einen Rechner weiterreichte.

Die molekulare Reaktion kann rasch ablaufen. Die **Ein- und Ausgabe** bleibt eine eigenständige technologische Hürde.

## „100 Bits“ meint keineswegs einen „100-Bit-Prozessor“

Dies ist vermutlich die Kennzahl, die in reißerischen Schlagzeilen am ehesten verfälscht wird.

Die Forschenden skalierten ihren Addierer auf zwei Zahlen von **25 Bits**, also 50 Eingangsbits. Der Rechenablauf umfasst zudem 25 Übertragsbits und 25 Ergebnisbits. Die Autoren verbuchen somit **100 Bits an Berechnung**: 50 Eingangsbits zuzüglich 50 Bits an berechnetem Zustand und Ausgabe.

Das hat praktisch nichts mit dem zu tun, was „64-Bit“ bei einem 64-Bit-Prozessor bedeutet.

Die Wortbreite einer CPU beschreibt die native Breite von Registern, Rechenwerken und Datenpfaden. Der hier genannte Wert von 100 Bits beziffert die Gesamtheit der logischen Information, die in einer experimentellen Instanz des molekularen Rechnens verarbeitet wird.

Beides gleichzusetzen hieße, „100 Variablen in einem Reaktionsnetzwerk“ mit einer „100-Bit-Mikroprozessorarchitektur“ zu verwechseln.

Die Zahl bleibt **in ihrem experimentellen Umfeld** beachtlich, aber eben nur unter dieser Definition.

## Je größer das System wird, desto weniger zauberhaft wirkt die Thermodynamik

Die Experimente an 25 Positionen bilden wohl den erhellendsten Abschnitt der Publikation, da sie sowohl das Potenzial des Konzepts aufzeigen als auch jenen Punkt markieren, an dem es an Grenzen stößt.

Um über ein langes, preiswertes Scaffold zu verfügen, nutzt die Gruppe einzelsträngige DNA des Bakteriophagen M13 von etwa 7,2 Kilobasen Länge. Sie wählt daraus einen Abschnitt von 624 Basen aus, der den für die Rechnung benötigten Positionen entspricht.

Diese Wahl bringt freilich handfeste Unzulänglichkeiten mit sich.

Die verschiedenen Segmente des natürlichen Scaffolds weisen ungleiche Bindungsenergien auf. Für den optimalen Abschnitt errechnen die Autoren noch immer ΔG∘\Delta G^\circ-Werte von annähernd **−20,9 bis −11,1 kcal/mol bei 65 °C**. Die auf den großen Scaffolds eingesetzten Konzentrationen sinken zudem auf 10 nM (gegenüber 100 nM bei kleinen Versuchen), was die Anlagerung der Kacheln verlangsamt und das Signal-Rausch-Verhältnis beeinträchtigt. Schließlich verbleiben mehrere ungenutzte Kilobasen des M13 im Gemisch und können Fehlanlagerungen begünstigen.

Darin offenbart sich eine fundamentale Schranke: Den **korrekten Endzustand thermodynamisch zu begünstigen, garantiert nicht, dass ein großes System ihn zügig erreicht**.

Ein Tal mag das tiefste einer Topografie sein, aber dennoch schwer zugänglich bleiben, wenn der Weg dorthin durch Schwellen und lokale Minima verstellt ist.

Die Thermodynamik gibt vor, wo das System zur Ruhe kommen möchte. **Die Kinetik entscheidet, ob es dort eintrifft, ehe der Experimentator die Geduld verliert.**

## Eine Stunde, vierzehn Stunden: Der reale Preis der Skalierung

Bei den Additionen über 25 Positionen führen die Autoren die Kenngröße MM ein, welche die längste Kette von Positionen beschreibt, über die sich ein Übertragsfehler fortpflanzen kann, ohne auf eine logische Senke („Sink“) zu treffen, die ihn tilgt.

Bei zufälligen Eingangspaaren liegt der Mittelwert bei etwa 4. Eine Instanz mit M=4M=4 liefert ein Resultat in ungefähr **einer Stunde**. Eine anspruchsvollere Konstellation mit M=5M=5 erfordert bis zu **14 Stunden**, um einen verlässlichen experimentellen Abschluss zu erzielen. Gleichwohl berechnen die Autoren, dass mehr als 84 % aller 25-Bit-Zahlenpaare M≤5M\leq5 aufweisen.

Ein weiteres Experiment ist noch aufschlussreicher.

Um ein Bit entlang eines langen Scaffolds zu kopieren, musste das Team die Energielandschaft glätten, indem es die Domänen umordnete, um bei gleicher Fehlerzahl annähernd **isoenergetische** Konfigurationen zu erhalten. Mit diesem Design verzeichnet es rund 71 % Ausbeute bei 20 Positionen und **59 % bei 25 Positionen nach einem 14-stündigen Annealing**.

Genau das ist die Nuance, die in verkürzten Meldungen unterzugehen droht.

Der SDC belegt keineswegs, dass „die Thermodynamik das Skalierungsproblem wie von selbst löst“. Er zeigt etwas viel Faszinierenderes: **Die Gestalt der Energielandschaft wird selbst zu einem programmierbaren Konstrukt**.

Das Programm beschreibt nicht mehr bloß eine Logikfunktion. Es muss zuweilen auch so kompiliert werden, dass sein eigener physikalischer Konfigurationsraum navigierbar bleibt.

## Kein separates Korrekturmodul bedeutet nicht den Verzicht auf Fehlerstrategien

Die Autoren betonen zu Recht, dass ihre kompakten Systeme ohne die ausladenden Redundanzen oder expliziten Reparaturmechanismen auskommen, die für viele molekulare Architekturen typisch sind.

Man sollte daraus jedoch keine absolute Schlussfolgerung ziehen.

Bei langen Additionen dämmen inhärente Eigenschaften des Algorithmus selbst Fehler ein: Die Senken schlucken Überträge und stoppen deren Ausbreitung. Beim erweiterten BitCopy ist das isoenergetische Re-Engineering gezielt darauf ausgelegt zu verhindern, dass fehlerhafte Konfigurationen versehentlich stabiler werden als die korrekte Lösung.

Die Neuerung liegt somit weniger in einem „völligen Fehlen von Fehlerkorrektur“, als vielmehr darin, dass **die Fehlerunterdrückung in die Physik des Reliefs und die logische Struktur des Programms verlagert werden kann**, anstatt eine separate molekulare Maschinerie zu erfordern, die Defekte nachträglich aufspürt und behebt.

Dieser Unterschied ist tiefgreifend.

## Ein wiederverwendbarer, aber noch keineswegs autonomer Rechner

Ein anderes Resultat gerät hinter den Rechenkunststücken leicht ins Hintertreffen: Mehrere Reaktionen wurden **nacheinander im selben System umprogrammiert**.

Das Prinzip besteht darin, eine neue Eingabe sowie einen Strang zuzugeben, der die vorherige blockiert, und das Gemisch anschließend zu erwärmen und abzukühlen, um sein Gleichgewicht zu verschieben.

Das BitCopy wurde auf diese Weise **25-mal** ausgeführt, ein Zähler 24-mal mit sukzessiven Eingaben und zwei Additionsvarianten neunmal. Die experimentellen Regenerierungszyklen beanspruchen ein Annealing von etwa 12 Minuten, zuzüglich der Rüstzeit im Labor.

Für eine molekulare Plattform ist dies eine beachtliche Errungenschaft, doch das Prädikat „wiederverwendbar“ darf nicht das Bild eines autonomen Rechners wecken, der eigenständig Schleifen dreht.

Es werden frische Moleküle zudosiert. Blocker-Stränge reichern sich an. Volumen und Konzentrationen verändern sich. In den Versuchen erleichterte ein akustischer Liquid-Handler die Zugaben, wenngleich die Autoren angeben, auch manuelle Pipettierungen erfolgreich vollzogen zu haben.

Die Rechnung ist molekular. Ihre experimentelle Steuerung bleibt fest in den Abläufen eines chemischen Labors verankert.

## Der SDC entstand keineswegs aus dem Nichts

Das DNA-Computing reicht mindestens bis zu Leonard Adlemans grundlegendem Experiment im Jahr 1994 zurück. Adleman codierte einen kleinen Graphen in DNA-Molekülen und nutzte molekularbiologische Methoden, um eine Instanz des Hamiltonpfad-Problems zu lösen.

Seither hat das Forschungsfeld selbstassemblierende Kacheln, Strangverdrängungsnetzwerke, Logikgatter, Automaten, molekulare Roboter und speicherintegriertes Rechnen erforscht.

2019 stellte eine Forschungsgruppe, der bereits Damien Woods angehörte, in *Nature* ein System aus **355 umprogrammierbaren DNA-Kacheln** vor, das 21 Sechs-Bit-Schaltkreise für Aufgaben wie Sortieren, Palindromerkennung oder zelluläre Automaten ausführen konnte.

Parallel dazu wurde die Gleichgewichtsthematik theoretisch fundiert. 2017 formalisierten David Doty, Trent Rogers, David Soloveichik, Chris Thachuk und Damien Woods die **Thermodynamic Binding Networks**, um dezidiert zu untersuchen, ob der thermodynamisch begünstigte Zustand mit dem Resultat einer Berechnung zusammenfallen kann.

Der SDC ist überdies nicht die einzige neuere experimentelle Umsetzung dieses Gedankens.

Im Januar 2026 publizierten Boya Wang, Cameron Chalk, David Doty und David Soloveichik in *Science Advances* ein Konzept zur **entropiegetriebenen Gleichgewichtsberechnung**, erprobt an reversibler Signalübertragung, selbstassemblierender Logik und der Synthese programmierter Polymerketten.

2023 demonstrierte Maxim Nikitin einen Gleichgewichtsansatz auf Basis schwacher Wechselwirkungen zwischen weitgehend nicht-komplementären Strängen, darunter eine Schaltung, die eine Vier-Bit-Quadratwurzel in etwa fünf Minuten zog.

Den SDC als „ersten thermodynamischen Computer der Geschichte“ zu feiern, hielte einer wissenschaftshistorischen Prüfung mithin kaum stand.

Sein Verdienst ist spezifischer: **eine programmierbare Gerüstarchitektur, beachtliche algorithmische Vielfalt, schnelle Kleinversuche, zyklische Wiederverwendbarkeit und eine Skalierung bis zu 25 Positionen in einem geschlossenen physikalischen Rahmen zusammenzuführen.**

## Der aufschlussreichste konzeptionelle Rivale macht das genaue Gegenteil

Ein 2025 in *Nature* veröffentlichter Artikel von Tianqi Song und Lulu Qian lässt die Besonderheit des SDC noch schärfer hervortreten.

Deren System umfasst über 200 Molekülarten und gestattet es, Logikschaltungen und DNA-Neuronale-Netze mindestens 16-mal wiederzuverwenden. Ihr Prinzip beruht jedoch darauf, Wärmepulse zu nutzen, um **kinetische Fallen wieder aufzuladen** und das System damit in einen energiereichen Nichtgleichgewichtszustand zurückzuversetzen, der für einen neuen Rechenschritt bereitsteht.

Beide Ansätze greifen auf DNA zurück. Beide arbeiten mit Temperaturzyklen. Beide zielen auf Wiederverwendbarkeit ab.

Ihre physikalischen Philosophien stehen einander jedoch fast diametral entgegen:

Song und Qian: **Einen energiereichen Nichtgleichgewichtszustand regenerieren und dessen Energie während des Rechnens aufzehren.**

Stérin, Eshra und Kollegen: **Das System so anlegen, dass das Rechenergebnis jenes Gleichgewicht ist, zu dem es natürlich hinabgleitet.**

Diese Unterscheidung ist weitaus erhellender als das pauschale Etikett „DNA-Computer“.

## Nein, das Rechnen ist nicht kostenlos geworden

Es läge nahe, voreilig zu schlussfolgern: Da das Ergebnis thermodynamisch begünstigt ist, könnte diese Rechnerart den Energiehunger moderner Rechenzentren lindern.

Nichts dergleichen belegt diese Publikation.

DNA-Stränge müssen synthetisiert, Lösungen angesetzt und gemischt, das System teils auf 80 °C erhitzt und kontrolliert abgekühlt werden; bei Wiederverwendungen sind neue Reagenzien zuzuführen und Fluoreszenzsignale auszulesen. All diese Schritte fordern einen greifbaren energetischen und materiellen Tribut. Die Autoren selbst räumen ein, dass ihre Architektur spürbare Kosten in puncto Strangaufwand, Heizzyklen und Annealingzeiten verursacht.

Grundsätzlicher noch: **Thermodynamisch begünstigt zu sein, bedeutet keineswegs Dissipationsfreiheit**.

Der Gewinn liegt anderswo: Man spart sich jenen Teil des molekularen Apparats, der fortwährend gegen jenen Zustand ankämpfen müsste, den die Naturgesetze eigentlich herbeiführen wollen.

Es mildert den Konflikt zwischen Programm und Materie; es erschafft kein Perpetuum mobile des Rechnens.

## Warum man seine Geschwindigkeit nie mit einer CPU vergleichen sollte

Eine 25-Bit-Addition, die eine Stunde oder vierzehn Stunden beansprucht, wäre grotesk unbrauchbar, ginge es darum, einen Mikroprozessor nachzubilden.

Selbst die 30 Sekunden der schnellsten Kleinversuche wirken gegenüber Siliziumschaltungen astronomisch träge.

Doch dieser Vergleich unterstellt, der SDC solle die Recheneinheit eines Desktop-Prozessors oder Smartphones beerben. Das ist nicht der Fall.

Das Terrain, auf dem molekulares Rechnen sein Potenzial entfalten kann, ist jenes, auf dem **Eingaben, Verarbeitung und beabsichtigte Einwirkungen selbst molekularer Natur sind**.

In der Nanomedizin oder bei intelligenten Biomaterialien wäre es absurd umständlich, eine chemische Konzentration in ein elektrisches Signal zu wandeln, durch eine CPU zu schleusen und den Beschluss wieder in eine biochemische Freisetzung zu übersetzen. Ein System, das seine Mikroumgebung direkt erfasst und Materie im Nanomaßstab unmittelbar umstrukturiert, muss keine Benchmark-Duelle gegen Halbleiterchips gewinnen.

Sein Trumpf liegt darin, **in demselben Substrat zu rechnen, auf das es einwirken soll**.

## Vom molekularen Computer zur programmierbaren Materie

Hier öffnet die Publikation den weitesten Blick in die Zukunft.

Die Forschenden stellen in Aussicht, dass ähnliche Prinzipien dereinst mit DNA-Datenspeichern, logikfähigen DNA-Origami-Gebilden oder Systemen aus RNA und Proteinen verschmelzen könnten. Sie verweisen auch auf komplexe biologische Milieus, wenngleich ihr aktueller Versuch ein kontrolliertes In-vitro-System bleibt.

Für die molekulare Datenspeicherung ist der Gedanke faszinierend: Statt Molekülinformationen aufwendig zu isolieren, zu sequenzieren, elektronisch zu prozessieren und anschließend neu zu synthetisieren, könnte ein Teil der logischen Verarbeitung **unmittelbar im molekularen Speichermedium** stattfinden.

In der Nanorobotik müsste der finale Zustand nicht einmal mehr optisch abgelesen werden: Er könnte in einer veränderten Faltung, der Freilegung einer Bindungstasche, einem mechanischen Impuls oder dem Start einer Folgereaktion bestehen.

An diesem Punkt verschwimmt die Grenze zwischen „Rechner“ und „Werkstoff“.

## Die fundamentale Forschungsfrage hinter dem SDC

Vordergründig handelt der Aufsatz von Oligonukleotiden. Im Kern berührt seine allgemeinste Idee jedoch die **Kompilierung eines Algorithmus in eine Energielandschaft**.

In klassischer Software übersetzt ein Compiler Instruktionen in Maschinencode, der zur Zielarchitektur passt.

Bei einem thermodynamischen Rechner müsste ein künftiger Compiler ein zusätzliches Problem bewältigen: logische Verknüpfungen so in physikalische Wechselwirkungen zu übertragen, dass das korrekte Ergebnis nicht nur stabil, sondern kinetisch rasch erreichbar ist, ohne in verhängnisvollen Zwischenfallen zu stranden.

Das fügt dem Informatik-Stack eine neue Schicht hinzu:

Algorithmus → Logik → molekulare Affinitäten → freie Energielandschaft → physikalische Dynamik.

Theoretische Vorarbeiten zum SDC zeigen bereits, dass die Minimierung der freien Energie und die Zustandssummen für diese Topologie mit spezialisierten Algorithmen berechnet werden können; die Autoren nutzten NUPACK und eigene Werkzeuge zur Sequenzanalyse. Code und Datensätze sind auf Zenodo hinterlegt.

Software programmiert somit nicht mehr bloß einen Apparat.

**Sie programmiert, was die Materie von Natur aus am liebsten werden will.**

## Was das Experiment beweist und was noch offenbleibt

Der SDC belegt experimentell, dass es bei nichttrivialen Programmen gelingen kann, **logische Korrektheit und thermodynamische Präferenz** zur Deckung zu bringen. Er zeigt, dass diese Strategie schnelle Reaktionen ermöglicht, biochemische Komplexität toleriert, wiederholbar ist und weit über minimale Machbarkeitsnachweise hinausreicht.

Gleichzeitig dokumentieren die Messreihen die praktischen Grenzen mit bemerkenswerter Offenheit: Bei 20 oder 25 Positionen sinken die Ausbeuten, die Rechenzeiten dehnen sich von Sekunden auf Stunden, die energetischen Unregelmäßigkeiten natürlicher DNA treten störend hervor, und die Landschaft muss aufs Neue feinfühlig kalibriert werden.

Das ist weniger plakativ als die Behauptung, „ein 100-Bit-DNA-Computer werde Computerchips ersetzen“. Es ist aber um ein Vielfaches substanzieller.

Die Studie legt nahe, dass Robustheit in der molekularen Informatik nicht zwingend aus einem immer raffinierteren Ringen gegen die Naturgesetze erwachsen muss, sondern aus einem tieferen Einklang mit ihnen.

Ein fehlerhafter Zustand müsste dann nicht fortwährend aufgespürt und vernichtet werden.

Es genügte, soweit wie möglich dafür zu sorgen, dass **die Materie selbst keinen triftigen Grund hat, darin zu verharren.**
