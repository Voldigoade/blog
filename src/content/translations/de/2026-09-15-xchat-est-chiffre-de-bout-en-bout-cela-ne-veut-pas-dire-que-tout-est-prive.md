---
title: XChat ist Ende-zu-Ende-verschlüsselt. Das heißt nicht, dass alles privat ist
description: 'Das ungeklärte Verschwinden von XChat aus dem App Store erregt Aufmerksamkeit, doch sein Protokoll wirft eine weitaus interessantere Frage auf: Was schützt ein „privater“ Messenger tatsächlich, wenn Metadaten, Schlüssel-Backups und Grok ins Spiel kommen?'
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: review
tags:
  - XChat
  - X
  - chiffrement
  - cybersécurité
  - confidentialité
coverImage: /images/posts/0f35434a-0d9c-4279-9613-5c775deaf868.png
coverAlt: Eine verschlüsselte XChat-Unterhaltung schützt ihren Inhalt, lässt aber Metadaten sichtbar und kann eine entschlüsselte Nachricht an Grok übermitteln.
author: Voldigoade
locale: de
sourceSlug: 2026-09-15-xchat-est-chiffre-de-bout-en-bout-cela-ne-veut-pas-dire-que-tout-est-prive
sourceHash: da8b4f961a1772c1aec2b2b9e8b54eb10102c99fa7e813ac8b0c0119205c1412
manual: false
---

Am 14. September 2026 verschwindet die App XChat aus dem App Store.

Die Suche liefert sie nicht mehr. Ihre bisherige Seite wird unzugänglich. MacRumors aktualisiert daraufhin seinen Artikel: Es scheint, dass X die App selbst zurückgezogen hat, ohne zu erklären, warum. 

Auf Android bleibt die App verfügbar. Und vor allem: Der Chat-Dienst existiert weiterhin in X und im Web. 

Wir wissen also heute nicht, ob der iOS-Rückzug einem vorübergehenden Problem, einer Produktentscheidung, einer technischen Änderung oder etwas anderem entspricht.

Eine Erklärung zu erfinden, wäre einfach.

Doch der Vorfall lenkt die Aufmerksamkeit auf ein weitaus interessanteres und bestens dokumentiertes Thema:

**was XChat tatsächlich schützt?**

Die Antwort ist deutlich nuancierter als „es ist verschlüsselt“ oder „X kann alles lesen“.

## Ja, XChat verfügt tatsächlich über Ende-zu-Ende-Verschlüsselung

Beginnen wir damit, faule Kritik zu vermeiden.

X erklärt, dass beim ersten Start von Chat ein öffentlicher/privater Schlüsselpaar für den Nutzer generiert wird.

Anschließend besitzt jede Konversation ihren eigenen Schlüssel zur Verschlüsselung der Nachrichten.

Der Inhalt, Links, Medien, Dateien und Reaktionen einer verschlüsselten Konversation werden verschlüsselt, **bevor sie das Gerät des Absenders verlassen**, bleiben auf Xs Infrastruktur verschlüsselt und werden auf dem Gerät des Empfängers entschlüsselt. 

Es handelt sich also nicht um einen simplen TLS-Tunnel zu Xs Servern, der missbräuchlich als Vertraulichkeit ausgegeben wird.

Für als verschlüsselt gekennzeichnete Konversationen existiert tatsächlich eine E2EE-Architektur.

Und X hat sein Protokoll von einem Drittunternehmen auditieren lassen, mit einem öffentlichen Bericht, der in der eigenen Dokumentation referenziert wird. 

Die ernsthafte Frage lautet also nicht:

> "Ist das echte Verschlüsselung?"

Sondern:

> **"Wo verlaufen genau die Grenzen dieser Verschlüsselung?"**

Das ist weitaufschlussreicher.

## X kann immer noch wissen, wer mit wem spricht

Die Verschlüsselung schützt den **Inhalt**.

Sie maskiert nicht alle Metadaten.

X gibt explizit an, dass Informationen wie **der Empfänger und der Erstellungszeitpunkt der Nachricht nicht verschlüsselt sind**. Die Plattform behält zudem eine Spur, wenn ein X-Post über eine verschlüsselte Konversation geteilt wird. 

Dies veranschaulicht eine zentrale Unterscheidung in Sachen Privatsphäre.

Angenommen, niemand kann diese Konversation lesen:

```
— On se retrouve à 22 h ?
— Oui.

```

Ein Betreiber kann dennoch erfahren:

```
Compte A → Compte B
22:03

```

und dann:

```
Compte B → Compte A
22:04

```

Bei einer einzelnen Konversation wirkt das fast unbedeutend.

Über mehrere Monate hinweg können Metadaten soziale Graphen, Gewohnheiten, Aktivitätszeiträume und die Häufigkeit von Beziehungen offenbaren.

**Eine verschlüsselte Nachricht ist keine unsichtbare Nachricht.**

## Die wichtigste technische Schwäche wird von X selbst eingeräumt

Die Dokumentation enthält einen ungewöhnlich expliziten Abschnitt:

**Forward Secrecy.**

Und X sagt klar, dass sein aktuelles System diese nicht besitzt.

Wird der private Schlüssel eines registrierten Geräts kompromittiert, könnte ein Angreifer **alle von diesem Gerät gesendeten oder empfangenen verschlüsselten Nachrichten entschlüsseln**. X gibt an, an der Schlüsselrotation zu arbeiten, um später eine Form von dauerhafter Vertraulichkeit einzuführen. 

Um zu verstehen, warum das wichtig ist, stellen wir uns zwei Systeme vor.

### System A

Alice und Bob verwenden stets einen Schlüssel, der ihren gesamten Verlauf öffnen kann.

Ein Angreifer stiehlt diesen Schlüssel 2028.

Er kann möglicherweise ihre aufgezeichneten Gespräche von 2026, 2027 und 2028 entschlüsseln.

### System B

Die Schlüssel entwickeln sich kontinuierlich so weiter, dass alte Schlüssel zerstört werden oder nutzlos werden.

Ein Angreifer kompromittiert das Gerät heute.

Er kann von jetzt an Schaden anrichten, erhält aber nicht automatisch zwei Jahre Historie.

Das ist das Ziel von *Forward Secrecy*.

Ihre Abwesenheit bedeutet nicht, dass XChat „kaputt“ ist.

Sie bedeutet, dass **der zeitliche Impact einer Schlüsselkompromittierung deutlich größer ist**.

Für einen Messenger, der sich als besonders privat darstellt, ist das eine substanzielle Einschränkung.

## Aber X speichert deinen privaten Schlüssel nicht einfach im Klartext

Umgekehrt zu sagen:

> "X bewahrt deinen Schlüssel auf seinen Servern auf, also nützt die Verschlüsselung nichts"

wäre ebenfalls falsch.

X nutzt das Open-Source-Protokoll **Juicebox**, um die Multi-Gerät-Wiederherstellung zu ermöglichen.

Der private Schlüssel wird in mehrere Fragmente aufgeteilt, die in drei *Realms* gespeichert sind. Zwei nutzen HSMs – Hardware-Module, die dafür ausgelegt sind, kryptografische Operationen durchzuführen, während sie ihre Geheimnisse schützen.

Es werden mindestens **zwei von drei Fragmenten** benötigt, um den Schlüssel zu rekonstruieren, wobei mindestens ein Fragment aus einem hardwareschützten Realm stammen muss. 

Die PIN des Nutzers verlässt das Gerät nicht.

Die Hardware-Realms wenden zudem eine kryptografische Grenze von **20 fehlerhaften Versuchen** an, bevor sie die Fragmente unbrauchbar machen. X versichert, dass diese Konstruktion sogar das Unternehmen daran hindert, einfach massenhaft alle PIN-Codes durchzuprobieren, bis der richtige gefunden ist. 

Das ist eine deutlich interessantere Architektur als „Passwort + Schlüssel in einer Datenbank“.

## Es bleibt jedoch eine Konzentration von Vertrauen

Heute werden **alle drei Juicebox-Realms von X betrieben**. 

Das ist eine wichtige Nuance.

Das bedeutet nicht, dass X magischerweise die rekonstruierten Schlüssel aller besitzt: PIN-Schutz, HSMs und Protokoll sind genau dafür ausgelegt, dies zu verhindern.

Doch die kryptografische Trennung wird noch nicht von einer vollständigen organisatorischen Trennung begleitet.

X gibt an, künftig die Nutzung von Realms ermöglichen zu wollen, die von verschiedenen Organisationen betrieben werden. 

Das wäre interessant, weil das Vertrauen dann tatsächlich verteilt werden könnte.

Eine Drei-Tresor-Architektur ist überzeugender, wenn nicht alle drei Tresore demselben Besitzer gehören.

## Manche Konversationen beginnen ohne Verschlüsselung

Ein weiteres Detail, das die Benutzeroberfläche unmöglich zu ignorieren machen sollte:

**Nachrichtenanfragen können unverschlüsselt sein**.

Wenn ein Nutzer jemanden kontaktiert, der die verschlüsselte Konversation noch nicht angenommen hat, gibt X an, dass die initiale Anfrage unverschlüsselt bleibt, bis sie angenommen wird. 

Grok wird zudem genutzt, um einige dieser Anfragen in die Boxen „Priority“ und „Hidden“ zu sortieren. 

Das ist nicht unbedingt ein Design-Desaster.

Aber es ist genau die Art von Grenze, die den generischen Satz:

> "Meine XChat-Nachrichten sind verschlüsselt"

unzureichend präzise macht.

Der richtige Satz lautet:

> **"Der Inhalt meiner als verschlüsselt gekennzeichneten Konversationen profitiert von Ende-zu-Ende-Verschlüsselung unter den vom Protokoll definierten Bedingungen."**

Das macht sich auf einem Plakat weniger gut.

Es ist aber weitaus genauer.

## „Grok fragen“ öffnet die Büchse freiwillig

XChat enthält eine äußerst aufschlussreiche Funktion: **Ask Grok**.

Du kannst eine Nachricht oder ein Bild aus einer Konversation auswählen und Grok bitten, es zu analysieren.

X präzisiert dann etwas Grundlegendes:

sobald dieser Inhalt an Grok übermittelt wird, **ist er in diesem Kontext nicht mehr verschlüsselt**, auch wenn seine Originalkopie in der Konversation geschützt bleibt. 

Das stellt keine kryptografische Schwäche dar.

Es ist eine logische Konsequenz.

Eine KI kann keinen Text analysieren, den man ihr verweigert zu zeigen.

Aber es ist eine hervorragende Illustration eines oft vergessenen Prinzips:

> **Ende-zu-Ende-Verschlüsselung schützt einen Übertragungsweg. Sie schützt die Daten nicht mehr, nachdem der Nutzer beschlossen hat, sie an einen anderen Empfänger zu übergeben.**

Wenn Alice ein Geheimnis an Bob in einem perfekt verschlüsselten Messenger sendet und Bob es in Grok, ChatGPT, eine E-Mail oder ein öffentliches Dokument kopiert, kann kein kryptografisches Protokoll die Zeit zurückdrehen.

Vertraulichkeit hat immer eine anwendungsseitige Grenze.

## Auch Grok Companion schafft einen Sonderfall

Die Dokumentation von X präzisiert zudem, dass Austausche mit einem Grok-Companion zwar über eine verschlüsselte Schicht übertragen werden können, **Grok die Nachricht aber zwingend entschlüsseln muss, um sie zu verstehen und zu antworten**. 

Auch hier: Das ist kein Beweis für Täuschung.

Das ist Architektur.

Aber es zeigt, warum eine Oberfläche, die privaten Messenger und KI kombiniert, extrem klar darüber werden muss, **wer der endgültige Empfänger ist**.

Zwischen:

```
Alice → Bob

```

et:

```
Alice → Grok

```

kann das Wort „verschlüsselt“ in beiden Fällen auftauchen.

Die Vertraulichkeitseigenschaft ist dennoch nicht dieselbe.

## Ist XChat also sicher?

Es gibt keine ernsthafte Antwort auf diese Frage, ohne zu präzisieren: **wogegen?**

Gegen jemanden, der lediglich den Netzwerkverkehr abfängt?

Die Ende-zu-Ende-Verschlüsselung stellt einen wichtigen Schutz dar.

Gegen eine Kompromittierung der Nachrichtenspeicher-Server?

Die Tatsache, dass der Inhalt dort verschlüsselt bleibt, verringert dieses Risiko stark.

Gegen die Beobachtung der Metadaten durch X?

Nein: Diese sind nicht vollständig verschlüsselt.

Gegen den zukünftigen Diebstahl eines privaten Schlüssels?

Der Schutz ist derzeit schwächer als bei einem System mit Forward Secrecy, da X einräumt, dass ein kompromittierter Schlüssel den Geräteverlauf offenlegen kann.

Gegen die Analyse einer freiwillig an Grok gesendeten Nachricht?

Nein, per Definition.

Gegen einen Angreifer, der einfach Millionen PINs auf der Wiederherstellungsinfrastruktur ausprobiert?

Juicebox und die HSMs sind genau dafür ausgelegt, diesen Ansatz unpraktikabel zu machen. 

Das ist ein **Threat Model**: Man fragt nicht, ob etwas „sicher“ im Absoluten ist. Man fragt, welche Angreifer, welche Fähigkeiten und welche Szenarien das System bewältigen soll.

## Der App-Store-Rückzug ist letztlich der uninteressanteste Teil

Zum Zeitpunkt der Verfassung dieses Artikels wissen wir immer noch nicht, warum die eigenständige XChat-App aus dem App Store verschwunden ist. 

Vielleicht erfahren wir morgen, dass es ein banales Vertriebsproblem war.

Vielleicht auch nicht.

Doch das Ereignis hat zumindest ein Verdienst gehabt: die Aufmerksamkeit auf einen Messenger zu lenken, dessen technische Dokumentation weitaus interessanter ist als die oberflächliche Debatte „Kann Elon Musk meine Nachrichten lesen?“.

Die wahre Antwort besteht aus Schichten.

Der Inhalt verschlüsselter Konversationen ist geschützt.

Nicht alle Metadaten sind es.

Initiale Anfragen können im Klartext vorliegen.

Die Schlüssel-Backups nutzen eine aufwendige kryptografische Konstruktion, doch alle Realms werden derzeit von X betrieben.

Forward Secrecy ist noch nicht vorhanden.

Und eine an Grok übergebene Nachricht muss zwangsläufig ihre kryptografische Hülle verlassen, um verarbeitet zu werden.

Keiner dieser Sätze beschreibt für sich allein XChat korrekt.

Zusammen zeigen sie etwas Allgemeineres:

**Privatsphäre ist kein Schalter, der auf AN oder AUS steht.**

Es ist ein Ensemble von Eigenschaften.

Und „Ende-zu-Ende-verschlüsselt“ ist nur eine davon.