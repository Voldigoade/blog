---
title: Wie ein Quantencomputer RSA knacken könnte, ohne „alle Passwörter auszuprobieren“
description: 'Man hört oft, dass ein Quantencomputer einen Teil unserer Kryptographie brechen könnte. Aber wie genau? Die eigentliche Gefahr geht nicht von einer absurd schnellen Maschine aus: Sie geht von einem Algorithmus aus, der die Art und Weise, das Problem anzugreifen, völlig verändert.'
pubDate: 2026-09-13
draft: false
featured: false
section: computing
contentType: article
tags:
  - informatique quantique
  - cryptographie
  - RSA
  - algorithme de Shor
  - cybersécurité
  - HTTPS
series:
  id: internet-face-au-quantique
  order: 2
  title: Das Internet im Angesicht des Quantens
coverImage: /images/posts/8c6ab339-ddae-4116-b264-2455d5ef0f4d.png
coverAlt: Darstellung eines Quantencomputers, der die mathematische Struktur eines RSA-Schlüssels analysiert.
author: Voldigoade
locale: de
sourceSlug: 2026-09-13-comment-un-ordinateur-quantique-pourrait-casser-rsa-sans-essayer-tous-les-mots-de-passe
sourceHash: 4d8d5f383ebda170a015f984fd59be61dec51ec51c0c756f3cca874ae25c146c
manual: false
---

Zu sagen, ein Quantencomputer könne RSA „knacken“, vermittelt leicht ein falsches Bild des Problems.

Man könnte sich eine Maschine vorstellen, die so leistungsstark ist, dass sie Milliarden von Milliarden Schlüsseln ausprobiert, bis sie den richtigen findet.

Das ist es nicht.

Das eigentliche Problem ist weitaus interessanter: **Ein ausreichend fortgeschrittener Quantencomputer könnte eine mathematische Methode nutzen, die unsere klassischen Computer nicht effizient ausnutzen können.**

Und alles beruht auf einer vor fast fünfzig Jahren bewusst gewählten Schwäche.

## RSA schützt ein Geheimnis mit einem Problem, das in die eine Richtung leicht, in die andere schwer ist

Nehmen wir zwei Primzahlen:

`61 × 53 = 3233`

Die Multiplikation ist trivial.

Stellen wir uns nun vor, ich gebe dir nur:

`3233`

und dich frage:

> Welche Primzahlen wurden multipliziert, um dieses Ergebnis zu erhalten?

Bei einer so kleinen Zahl würdest du schnell `61` und `53` finden.

RSA wendet im Wesentlichen dieselbe Idee an, aber mit gewaltigen Zahlen.

Ein moderner RSA-Schlüssel kann einen Modulus von **2048 Bit** verwenden, also eine Zahl mit etwa **617 Dezimalstellen**.

Das Multiplizieren der beiden großen Primzahlen, aus denen er besteht, ist für einen Computer einfach.

Diese Faktoren aus dem Ergebnis wiederzufinden, ist mit den besten bekannten klassischen Methoden extrem schwierig, wenn die Parameter richtig gewählt sind.

Dieses Ungleichgewicht macht RSA nützlich.

Nicht weil die Faktorisierung unmöglich ist.

Sondern weil sie als **in der erforderlichen Größenordnung unpraktikabel** mit unseren klassischen Computern gilt.

## Dann kommt Peter Shor

1994 veröffentlicht der Mathematiker Peter Shor einen Algorithmus für Quantencomputer.

Und dieser Algorithmus verändert das Problem radikal.

Shors Algorithmus ermöglicht theoretisch die effiziente Faktorisierung großer Zahlen auf einem hinreichend leistungsstarken Quantencomputer.

Er besteht nach wie nicht darin, jede Kombination einzeln auszuprobieren.

Er transformiert die Faktorisierung in ein anderes Problem: **das Finden der Periode einer mathematischen Funktion**.

Genau in diesem Schritt kommt die Quantenmechanik ins Spiel.

Ein klassischer Computer manipuliert Bits, die `0` oder `1` sind.

Ein Quantencomputer manipuliert **Qubits**, deren Zustand eine Superposition mehrerer Möglichkeiten sein kann. Aber Vorsicht vor der oft wiederholten Abkürzung: Das bedeutet nicht, dass ein Quantencomputer „alle Antworten gleichzeitig testet und die richtige ausliest“.

Wäre es so einfach, würden praktisch alle Informatikprobleme augenblicklich leicht.

Was Shor mächtig macht, ist weit subtiler.

Der Algorithmus bereitet einen Quantenztand vor, der eine besondere mathematische Struktur enthält, und nutzt dann unter anderem die **Quanten-Fourier-Transformation**, um die gesuchte Periodizität sichtbar zu machen. Eine Messung liefert anschließend genügend Informationen, um diese Periode zu rekonstruieren.

Und diese Periode kann zu den Faktoren der Zahl führen.

Vereinfacht ausgedrückt:

```text

Grand nombre composé

        ↓

construction d'un problème périodique

        ↓

calcul quantique

        ↓

détection de la période

        ↓

calcul classique

        ↓

facteurs premiers

```

Kryptographie wird also nicht durch mehr rohe Gewalt besiegt.

**Man umgeht die Schwierigkeit, auf der sie beruhte.**

## Warum dies RSA bedroht

Bei RSA kann der öffentliche Schlüssel von jedermann bekannt sein.

Das ist sogar seine Aufgabe.

Unzugänglich bleiben muss der private Schlüssel.

Doch die öffentlichen Parameter enthalten eine Zahl, die aus zwei großen geheimen Primzahlen konstruiert ist. Wenn es einem Angreifer gelingt, diese Zahl effizient zu faktorisieren, kann er die Informationen wiederfinden, die nötig sind, um den privaten Schlüssel zu rekonstruieren.

Ab dann können, je nach Verwendung von RSA, die Folgen gravierend werden: Fälschung von Signaturen, Kompromittierung von Authentifizierungsmechanismen oder Entschlüsselung von Daten, wenn das Protokoll direkt von RSA abhängt.

Deshalb stellt die mögliche Ankunft eines **kryptographisch relevanten** Quantencomputers, der hinreichend zuverlässig und leistungsstark ist, um einen solchen Angriff in nützlichem Maßstab auszuführen, ein reales Cybersicherheitsproblem dar.

Der NIST betrachtet RSA sowie mehrere auf elliptischen Kurven basierende Systeme explizit als verwundbar gegenüber diesem zukünftigen Rechenmodell und organisiert ihre schrittweise Ersetzung durch Post-Quanten-Standards. Das aktuelle amerikanische Ziel ist es, die verwundbaren Algorithmen bis **2035** schrittweise aus den Standards zu entfernen, wobei die sensibelsten Systeme früher migrieren müssen. 

## Warum hat noch niemand RSA-2048 mit einem Quantencomputer geknackt?

Weil zwischen **„der Algorithmus existiert“** und **„wir besitzen die Maschine, die ihn ausführen kann“** ein Abgrund liegt.

Die heutigen Qubits sind fragil.

Sie sind extrem empfindlich gegenüber Rauschen und Fehlern. Je länger und komplexer ein Quantenberechnung wird, desto schwieriger wird es, die Information korrekt zu erhalten.

Die angestrebte Lösung ist die **Quantenfehlerkorrektur**: viele unvollkommene physische Qubits zu nutzen, um eine kleinere Anzahl sogenannter *logischer* Qubits aufzubauen, die hinreichend zuverlässig für lange Berechnungen sind.

Doch das erhöht den benötigten Hardware-Aufwand enorm.

Deshalb können die kleinen experimentellen Quantencomputer von heute nicht einfach einen RSA-2048-Schlüssel entgegennehmen und ihn wenige Sekunden später knacken.

Der NIST spricht übrigens von einem **CRQC**, *cryptographically relevant quantum computer*: einem Quantencomputer, der leistungsstark genug ist, um die aktuell verwendeten kryptografischen Systeme tatsächlich anzugreifen. Der Zeitpunkt, zu dem eine solche Maschine existieren wird, bleibt unbekannt. 

## Und es betrifft nicht nur RSA

RSA ist ein hervorragendes Beispiel, um das Problem zu verstehen, doch Shor bedroht auch eine andere fundamentale Familie der modernen Kryptographie: **elliptische Kurven**.

Man findet sie insbesondere in Signatursystemen und Schlüsselaustauschverfahren.

Das mathematische Problem unterscheidet sich von der Faktorisierung, doch Shor kann auch das **diskrete Logarithmusproblem**, auf dem diese Mechanismen beruhen, effizient lösen.

Das ist eine wichtige Unterscheidung.

Wenn man sagt, „das Quanten wird die aktuelle Verschlüsselung brechen“, vereinfacht man enorm.

Nicht alle Kryptografien sind auf dieselbe Weise betroffen.

Öffentliche-Schlüssel-Algorithmen wie RSA und ECC sind besonders betroffen.

Symmetrische Algorithmen wie AES werden von Shor nicht auf diese Weise zerstört. Andere Quantenalgorithmen, insbesondere der von Grover, können ihren Sicherheitsabstand verringern, aber die Schlüssellänge zu erhöhen, erlaubt, das Problem weitaus leichter zu kompensieren.

Die Zukunft besteht also nicht darin, alle Kryptographie aufzugeben.

Sie besteht darin, **bestimmte mathematische Fundamente zu ersetzen**.

## Die Ersatzverfahren existieren bereits

2024 hat der NIST seine ersten drei großen Post-Quanten-Kryptographie-Standards finalisiert:

- **ML-KEM**, für die Etablierung gemeinsamer Geheimnisse bestimmt;
- **ML-DSA**, für digitale Signaturen bestimmt;
- **SLH-DSA**, eine weitere Signaturfamilie, die auf Hashfunktionen beruht.

Im Gegensatz zu RSA sind ihre mathematischen Fundamente so gewählt, dass sie bekannten Quantenangriffen widerstehen.

Der NIST empfiehlt nun explizit, die Migration zu beginnen, statt auf das hypothetische Erscheinen einer gefährlichen Maschine zu warten.

Chrome hat sogar bereits einen hybriden Post-Quanten-Schlüsselaustausch für bestimmte kompatible TLS-Verbindungen ausgerollt. Und Chromium bereitet nun den weitaus komplexeren Teil vor: Auch die **Authentifizierung von HTTPS-Zertifikaten** quantenresistent zu machen.

Deshalb beginnt dieser Übergang Jahre vor dem vermuteten Erscheinen der Bedrohung.

Eine globale kryptografische Infrastruktur lässt sich nicht per Knopfdruck ersetzen.

Man muss Browser, Server, Bibliotheken, Betriebssysteme, eingebettete Geräte, Zertifizierungsstellen, Protokolle und Software ändern, die manchmal für Jahrzehnte aktiv bleiben sollen.

Der Computer, der RSA-2048 knacken kann, existiert vielleicht noch nicht.

**Der Algorithmus, der erklärt, wie er es tun könnte, existiert dagegen seit 1994.**

Genau dieser Unterschied zwingt das Internet, seine Verteidigung jetzt vorzubereiten.