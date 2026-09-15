---
title: Das Web ist bereits teilweise post-quantisch – was 2026 wirklich hält
description: Chrome, Cloudflare und die wichtigsten TLS-Stacks schützen bereits einen Teil deiner Verbindungen gegen zukünftige Quantencomputer. Aber Schlüsselaustausch, Verschlüsselung, Zertifikate und der Weg bis zum Origin-Server stehen nicht alle auf demselben Stand.
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: research
tags:
  - cryptographie post-quantique
  - TLS 1.3
  - ML-KEM
  - X25519MLKEM768
  - Chrome
  - Cloudflare
  - NIST
  - cryptographie
coverImage: /images/posts/2348668a-d80a-4b1e-95bf-8120f40f14a5.png
coverAlt: Ein Browser kommuniziert mit einem CDN und dann einem Origin-Server, wobei nur bestimmte Abschnitte der Verbindung als durch post-quantische Kryptografie geschützt dargestellt sind.
author: Voldigoade
news: false
seoTitle: 'TLS post-quantique en 2026 : ce qui protège déjà réellement le Web'
seoDescription: Chrome et Cloudflare utilisent déjà ML-KEM dans TLS. Voici exactement quelles parties d’une connexion HTTPS résistent déjà à un futur ordinateur quantique et lesquelles restent vulnérables.
seoTargetQuery: TLS post-quantique 2026
locale: de
sourceSlug: 2026-09-15-le-web-est-deja-partiellement-post-quantique-voici-ce-qui-resiste-vraiment-en-2026
sourceHash: 8a9750813cd32eacb922885cf2f5a415d1f7de7e6b8268fb294b293e8fbf52a0
manual: false
---

Du öffnest eine Seite in Chrome. Das Schloss oder sein modernes Pendant zeigt dir nichts Besonderes an. Die Seite lädt wie gestern. Doch in manchen Fällen hat dein Browser wenige Millisekunden zuvor gerade eine kryptografische Primitive ausgeführt, die eigens dafür entworfen wurde, einer Maschine zu widerstehen, die es noch gar nicht gibt.

Nicht einem „Quantencomputer“ im allgemeinen Sinne: diese Maschinen existieren bereits. Was noch fehlt, ist ein **kryptographisch relevanter Quantencomputer**, groß, zuverlässig und fehlerkorrigiert genug, um die Angriffe auszuführen, die die im Internet-Maßstab verwendeten RSA-Schlüssel und elliptischen Kurven brechen können.

Der Paradox ist also real: **die Bedrohung ist noch nicht operational, aber ihre Gegenmaßnahme läuft bereits in Produktion**.

Im August 2024 hat das NIST ML-KEM in der Norm FIPS 203 finalisiert. Chrome hatte noch früher mit einer Vorab-Version von Kyber begonnen; mit Chrome 131 wechselte es zur standardisierten Version ML-KEM. OpenSSL 3.5 und Go 1.24 aktivieren sie standardmäßig in TLS. Cloudflare gibt an, dass mittlerweile über 65 % seines menschlichen Verkehrs von einem post-quantischen Schlüsselaustausch profitieren. Und seit August 2026 hat die IETF offiziell `X25519MLKEM768` in einer RFC Standards Track aufgenommen: die [RFC 10024].

Das post-quantische Web ist also nicht mehr ein Laborprojekt.

Aber in dieser Formulierung steckt eine Falle: **eine Verbindung kann an einer Stelle post-quantisch und an einer anderen vollkommen klassisch sein**.

Und genau da wird die Situation viel interessanter.

## Die kurze Antwort: was hält bereits, wenn du eine Seite öffnest?

Im September 2026 lässt sich eine moderne HTTPS-Verbindung grob in drei kryptografische Bausteine zerlegen.


| Teil von TLS | Rolle | Typische Lage 2026 |
| ---------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| Symmetrische Verschlüsselung | Verschlüsselt die Daten, sobald die Session etabliert ist | Wird bereits als resistent gegen bekannte Quantenangriffe in diesem Maßstab betrachtet |
| Schlüsselaustausch | Erzeugt das Geheimnis, das für die Session-Verschlüsselung genutzt wird | **Kann bereits post-quantisch sein**, notamment mit `X25519MLKEM768` |
| Authentifizierung | Beweist, dass der Server tatsächlich die angeforderte Site ist | **Noch überwiegend klassisch**, mit RSA/ECDSA und einer traditionellen PKI |


Cloudflare beschreibt TLS explizit entlang dieser drei Komponenten und sieht die dringende Migration vor allem bei den beiden letzten: Schlüsselaustausch und Signaturen. Die danach für den Datentransport verwendete symmetrische Verschlüsselung erleidet nicht dieselbe theoretische Katastrophe wie RSA oder ECC gegenüber Shors Algorithmus.

Anders gesagt: wenn eine Site `X25519MLKEM768` aushandelt, **ist das Geheimnis deiner Session bereits gegen das Hauptszenario geschützt, das Kryptographen heute beunruhigt: deine Verbindung jetzt aufzeichnen, um sie später zu entschlüsseln**.

Aber die Identität des Servers ist es im Allgemeinen noch nicht.

Diese Unterscheidung erklärt fast die gesamte aktuelle Migration.

## Warum Daten gegen eine Maschine schützen, die es noch nicht gibt?

Angenommen, ein hinreichend mächtiger Akteur fängt heute eine TLS-Verbindung ab, die nur X25519 verwendet.

Er kann sie nicht entschlüsseln. Also zeichnet er alles auf:

- die TLS-Nachrichten;
- die öffentlichen Austausche, die für den Schlüsselaustausch nötig sind;
- dann den gesamten verschlüsselten Verkehr.

Er bewahrt diese Daten auf.

In fünfzehn Jahren stellen wir uns vor, er verfügt endlich über einen Quantencomputer, der effizient Shors Algorithmus gegen Curve25519 ausführen kann.

Der ephemere Charakter des X25519-Schlüssels reicht dann nicht mehr. Die während des Handshakes aufgezeichneten öffentlichen Informationen erlauben die Rekonstruktion des geteilten Geheimnisses, dann der von TLS abgeleiteten Traffic-Schlüssel, und damit den Rückgriff auf die archivierten Kommunikationen.

Das ist das Prinzip von **harvest now, decrypt later**: jetzt sammeln, später entschlüsseln.

Cloudflare nennt genau diese Bedrohung als Grund, warum der post-quantische Schlüsselaustausch schon vor Existenz eines Quantencomputers, der TLS brechen kann, ausgerollt werden musste.

Die zeitliche Logik ist wichtig.

Ein Unternehmen kann nicht warten, bis der Quantenangriff demonstriert ist, um seine Migration zu beginnen, wenn die heute übertragenen Informationen zehn oder zwanzig Jahre vertraulich bleiben müssen.

Das Problem beginnt **vor** dem berühmten „Q-Day“.

## RSA und ECC haben ein Problem, das AES nicht hat

Die klassische Public-Key-Kryptografie beruht unter anderem auf mathematischen Problemen, die für klassische Computer extrem schwer sein sollen.

RSA hängt von der Schwierigkeit ab, sehr große Ganzzahlen zu faktorisieren.

ECDH und ECDSA beruhen auf dem diskreten Logarithmusproblem auf elliptischen Kurven.

Für klassische Computer bleiben richtig gewählte Parameter außer Reichweite.

Ein hinreichend mächtiger Quantencomputer ändert die Lage jedoch radikal mit Shors Algorithmus: diese Probleme werden nicht nur „etwas einfacher“. Ihre Struktur selbst erlaubt eine Beschleunigung, die groß genug ist, um die Familien RSA und ECC für eine post-quantische Zukunft untauglich zu machen.

AES befindet sich in einer anderen Situation.

Der hauptsächlich gegen symmetrische Schlüssel diskutierte Quantenangriff ist Grovers Algorithmus, der theoretisch eine quadratische Beschleunigung der Exhaustivsuche bietet, aber ohne den spektakulären Kollaps, den Shor gegen RSA oder ECC auslöst. Das NIST betont zudem, dass die praktischen Kosten, die Schwierigkeit der Parallelisierung von Grover und die enormen nötigen Quantenressourcen die naive Interpretation „AES-128 wird einfach 64 Bit“ viel zu vereinfachend machen. Das NIST betrachtet AES-128, AES-192 und AES-256 weiterhin als einsetzbar.

Deshalb ersetzt das Web nicht jeden TLS-Bestandteil.

Es ersetzt zuerst **die am stärksten exponierte asymmetrische Kryptografie**.

## ML-KEM ist keine „Quantenverschlüsselung“

Post-quantische Kryptografie kann einen täuschenden Eindruck erwecken: man bräuchte einen Quantencomputer, um sie zu nutzen.

Genau das Gegenteil ist der Fall.

ML-KEM läuft auf den ganz normalen Prozessoren, die bereits Telefone, Server und Computer ausstatten.

Sie heißt *post-quantisch*, weil das mathematische Problem, auf dem ihre Sicherheit beruht, nach unserem Wissen keinen effizienten klassischen **oder quanten** Algorithmischen gibt, der mit Shor vergleichbar wäre.

ML-KEM steht für **Module-Lattice-Based Key-Encapsulation Mechanism**. Sie leitet sich von CRYSTALS-Kyber ab und ihre Sicherheit ist an Probleme vom Typ *Module Learning With Errors* geknüpft: sehr schematisch manipuliert man algebraische Strukturen hoher Dimension, denen sorgfältig gewähltes Rauschen hinzugefügt wird. Die geheime Information aus den öffentlichen Daten zurückzugewinnen, wird zu einem extrem schwierigen mathematischen Problem.

Das NIST hat drei Parametersets standardisiert:

- ML-KEM-512;
- ML-KEM-768;
- ML-KEM-1024.

ML-KEM-768 ist das, was man heute im wichtigsten hybriden Mechanismus des Webs antrifft.

Und entgegen seinem in Oberflächen oder Artikeln manchmal vereinfachten Namen ist ML-KEM nicht direkt die Verschlüsselung deiner Webseite.

Seine Arbeit greift **davor**.

Es ermöglicht zwei Maschinen, ein gemeinsames Geheimnis herzustellen.

Dieses Geheimnis wird dann von TLS genutzt, um die eigentlichen symmetrischen Schlüssel abzuleiten, die die Daten verschlüsseln.

## Warum `X25519MLKEM768` noch X25519 enthält

Ein Name wie `X25519MLKEM768` wirkt fast widersprüchlich.

X25519 ist genau ein klassischer Mechanismus, der einem zukünftigen Quantencomputer verwundbar ist. Warum ihn in einer Lösung behalten, die das Post-Quantum vorbereiten soll?

Weil dem Web eine einzelne neue Primitive noch nicht voll vertraut.

`X25519MLKEM768` ist ein **hybrider Schlüsselaustausch**:

```

```

```
X25519
   +
ML-KEM-768
   ↓
secret hybride
   ↓
TLS 1.3 / HKDF
   ↓
clés de trafic
```

Beide Mechanismen produzieren jeweils ein Geheimnis. Die RFC 10024 spezifiziert ihre Kombination, bevor TLS 1.3 seine endgültigen Schlüssel ableitet. Für `X25519MLKEM768` erhält man zwei 32-Byte-Geheimnisse, also 64 Byte kombiniert. 

Der Vorteil ist eine Form von Defense-in-Depth.

Wenn morgen eine unerwartete Schwäche in ML-KEM entdeckt wird, X25519 aber gegen heutige klassische Computer intakt bleibt, hat die Migration TLS heute nicht geschwächt.

Umgekehrt, wenn ein Quantencomputer schließlich X25519 bricht, ML-KEM aber hält, bleibt die zukünftige Vertraulichkeit der Session geschützt.

Die von der IETF gewählte Definition der Hybridation zielt genau darauf ab, die Sicherheit so lange zu erhalten, wie mindestens einer der Komponenten unter den Annahmen des verwendeten Kombinators hält. 

Das Web springt also nicht von einem alten System auf ein neues in der Hoffnung, alles werde gut.

Es lässt beide parallel laufen.

## Post-quantischer Schutz braucht deutlich mehr Platz

Diese Vorsicht hat einen extrem konkreten Preis: die Bytes.

Ein ephemerer X25519-Public-Key sind nur 32 Byte.

In `X25519MLKEM768` enthält der vom Client gesendete `key_share`:

-   
1 184 Byte für den ML-KEM-768-Einkapselungsschlüssel;  

-   
32 Byte für X25519.  


Also **1 216 Byte**.

Die Server-Antwort enthält ihrerseits:

-   
1 088 Byte ML-KEM-Ciphertext;  

-   
32 Byte X25519.  


Also **1 120 Byte**. 

Das ist kein Detail.

Ein deutlich voluminöserer Handshake kann Netzwerkgeräte entlarven, die implizit annahmen, ein `ClientHello` TLS bleibe klein.

Genau das passierte, als Chrome begann, seine ersten hybriden Austausche zu verallgemeinern: manche Firewalls, Middleboxes und TLS-Geräte verhielten sich schlecht gegenüber den neuen Nachrichten. OpenSSL warnt noch immer, dass der größere `ClientHello` von `X25519MLKEM768` Fehlschläge oder Timeouts bei falsch implementierten Geräten auslösen kann. 

Deshalb begann diese Migration Jahre, bevor sie unumgänglich war.

Eine kryptografische Primitive im Internet zu ändern, heißt nicht nur, einen Algorithmus zu veröffentlichen.

Man muss entdecken, was ringsum zerbricht.

## Chrome hat die Erfahrung zum Standardverhalten gemacht

Chromes Zeitlinie zeigt den schrittweisen Übergang von Forschung zur Infrastruktur.

2024 aktiviert Chrome 124 auf Desktop standardmäßig einen hybriden Austausch mit einer Vorab-Version von Kyber.

Dann finalisiert das NIST FIPS 203.

Die endgültige Version von ML-KEM ist nicht bit-kompatibel mit dem experimentellen Kyber; Google lässt den alten Codepoint `0x6399` fallen und schwenkt Chrome 131 auf das neue `X25519MLKEM768`, Codepoint `0x11EC`. 

2026 ist das nicht mehr nur in einem Blogpost dokumentiert.

Der aktuelle Chromium-Code stellt direkt:

```

```

```
X25519MLKEM768
X25519
P-256
P-384
```

in seine Liste der standardmäßig unterstützten Gruppen, mit einer `key_share` für `X25519MLKEM768`. 

Das ist ein wichtiger Statuswechsel.

Post-quantische Kryptografie ist nicht mehr etwas, das Chrome „gegebenenfalls kann“.

Sie ist Teil des normalen Pfads.

## Das Server-Ökosystem hat nachgezogen

Ein kompatibler Browser reicht offensichtlich nicht.

Damit der finale Schlüsselaustausch hybrid ist, muss der Server `X25519MLKEM768` ebenfalls verstehen.

Diese Bedingung wird viel weniger exceptionell als vor wenigen Jahren.

Go 1.24, im Februar 2025 veröffentlicht, hat ML-KEM in seine Standardbibliothek aufgenommen und `X25519MLKEM768` standardmäßig in `crypto/tls` aktiviert. 

OpenSSL 3.5, im April 2025 veröffentlicht und zum LTS-Zweig geworden, hat ML-KEM, ML-DSA und SLH-DSA hinzugefügt. `X25519MLKEM768` steht an der Spitze seiner TLS-Standardliste. 

Cloudflare meldete schon im Oktober 2025, dass aktuelle Versionen der wichtigsten Browser sowie Stacks wie OpenSSL und Go den hybriden Mechanismus standardmäßig aktiviert hatten. Im April 2026 gab das Unternehmen an, dass über **65 % des menschlichen Verkehrs zu seinem Netzwerk** bereits einen post-quantischen Schlüsselaustausch nutzte. 

Dann, im August 2026, ereignete sich ein diskreterer, aber symbolischer Wandel: die IETF veröffentlichte die **RFC 10024**.

`X25519MLKEM768` ist nicht mehr nur eine vor Abschluss des Standardisierungsprozesses breit ausgerollte Konstruktion: die IETF klassifiziert sie als empfohlene Gruppe für TLS 1.3. 

In diesem Fall hat die industrielle Ausrollung den finalen Stempel des Standards fast vorgegriffen.

## Ist mein HTTPS also post-quantisch?

Nehmen wir einen sehr konkreten Fall.

Du nutzt ein aktuelles Chrome.

Du besuchst eine Domain, die von Cloudflare über TLS 1.3 bedient wird.

Cloudflare gibt an, dass alle Sites und APIs, die über sein Netzwerk laufen, seit Oktober 2022 den hybriden post-quantischen Schlüsselaustausch auf Besucherseite unterstützen. Mit einem kompatiblen Client können Browser und Cloudflare-Edge also `X25519MLKEM768` aushandeln. 

In diesem Moment **profitiert die Vertraulichkeit dieser ersten Verbindung tatsächlich von einem hybriden post-quantischen Session-Geheimnis**.

Ein Spion, der den Verkehr heute passiv aufzeichnet, sollte nicht einfach auf das Erscheinen eines Quantencomputers warten können, der X25519 bricht, um die Session zu rekonstruieren – vorausgesetzt natürlich, ML-KEM hält wie erwartet.

Aber das erlaubt noch nicht zu schreiben:

> „Meine Verbindung zur Site ist vollständig post-quantisch.“

Denn mindestens zwei Fragen fehlen.

## Das Zertifikat der Site ist wahrscheinlich noch klassisch

TLS muss nicht nur einen geheimen Schlüssel erzeugen.

Es muss auch ein fundamentales Problem lösen:

**mit wem hast du diesen Schlüssel gerade erstellt?**

Das ist die Rolle der Server-Authentifizierung und der Web-PKI.

Heute beruht ein klassisches HTTPS-Zertifikat noch meist auf RSA- oder ECDSA-Signaturen, direkt oder irgendwo in seiner Zertifizierungskette.

Das ist eine andere Schwäche.

Das Risiko `harvest now, decrypt later` betrifft vor allem die Vertraulichkeit gegenwärtiger Sessions. Eine Signatur verschlüsselt keine Daten: sie heute aufzuzeichnen, erlaubt nicht magisch, den Verkehr später zu lesen.

En revanche, sobald ein kryptographisch relevanter Quantencomputer tatsächlich existiert, könnte das Brechen klassischer Authentifizierungsprimitiven das Fälschen oder Kompromittieren kryptografischer Identitäten und aktive Angriffe ermöglichen.

Hier zeigt eine Verbindung, die einen ML-KEM-Schlüsselaustausch aber eine RSA/ECDSA-Authentifizierung besitzt, ihre Grenze.

Sie kann **resistent gegen retrospektives Entschlüsseln** sein, ohne doch **bereits vollständig resistent gegen einen aktiven Quantenadversären** zu sein.

Chromium erkennt das explizit in seiner im Februar 2026 veröffentlichten Roadmap: der Browser arbeitet an post-quantischer Authentifizierung, aber der Prozess erfordert mehrere Schritte, bevor klassische Autoritäten und Schlüssel eliminiert werden können. Solange ein Client noch einen klassischen Authentifizierungspfad akzeptiert, kann ein zukünftiger Quantenadversär versuchen, diesen schwächeren Pfad anzugreifen. 

Das ist vermutlich die wichtigste Unterscheidung der ganzen Migration:

**post-quantum key exchange ≠ vollständig post-quantisches HTTPS.**

## Cloudflare fängt erst jetzt an, Signaturen zu ersetzen

Der Kontrast zwischen den beiden Migrationen ist bei Cloudflare besonders sichtbar.

Der post-quantische Schlüsselaustausch existiert bereits im großen Maßstab.

Die post-quantische Authentifizierung steckt erst in den Kinderschuhen.

Im Juli 2026 kündigte Cloudflare den Support von **ML-DSA**, dem post-quantischen Signaturalgorithmus, den das NIST in FIPS 204 definiert hat, für bestimmte Authentifizierungsszenarien zwischen seinem Netzwerk und den Origin-Servern an. 

Aber die aktuelle Dokumentation ist explizit: **die post-quantische Authentifizierung zwischen dem Besucher-Browser und dem Cloudflare-Edge bleibt in Entwicklung**. Das Unternehmen zielt nun auf 2029 für eine vollständige post-quantische Sicherheit seiner Palette, Authentifizierung inklusive. 

Wir haben also bereits zwei kryptografische Generationen, die im selben Handshake überlagert sind:

```

```

```
Confidentialité de la session
X25519 + ML-KEM-768
        ↓
déjà post-quantique hybride

Authentification du site
RSA / ECDSA / PKI classique
        ↓
encore majoritairement pré-quantique
```

Diese Zwischenarchitektur ist keine Anomalie.

Sie ist eine Strategie.

Die Vertraulichkeit alter Daten zwingt zum Handeln vor Q-Day. Die Authentifizierung wird vor allem dann katastrophal, wenn ein Angreifer tatsächlich die Maschine besitzt, die Identitäten fälschen kann.

Es war also rational, die erste früher zu migrieren.

## Es gibt eine weitere unsichtbare Grenze: das CDN

Selbst diese Browser ↔ Server-Analyse kann trügerisch sein.

Sehr viele Sites bauen ihre TLS-Verbindung nicht direkt zu ihrem eigentlichen Applikationsserver auf.

Nehmen wir wieder Cloudflare.

Für eine nicht aus dem Cache bediente Anfrage kann es mindestens geben:

```

```

```
Navigateur
    │
    │ TLS A
    ▼
Edge Cloudflare
    │
    │ réseau Cloudflare
    ▼
Infrastructure Cloudflare
    │
    │ TLS B
    ▼
Serveur d'origine
```

Angenommen, TLS A nutzt `X25519MLKEM768`.

Das beweist, dass **die Verbindung zwischen deinem Browser und Cloudflare** von einem hybriden Austausch profitiert.

Das beweist nicht automatisch, dass TLS B, zwischen Cloudflare und dem echten Server der Site, dieselbe Eigenschaft hat.

Cloudflare unterstützt den post-quantischen Austausch in Richtung Origin, aber der Origin-Server muss ebenfalls kompatibel sein. Die Dokumentation unterscheidet die drei Segmente explizit und zeigt an, dass der Schutz des letzten vom PQC-Support des Origins abhängt. 

Das ist eine vom Browser aus selten sichtbare Konsequenz:

**der post-quantische Status einer Site ist nicht notwendigerweise eine einzige Eigenschaft der Domain. Er ist eine Eigenschaft jedes kryptografischen Links, den die Daten durchlaufen.**

Ein CDN kann eine post-quantische Verbindung terminieren und dahinter eine klassische aufbauen.

Die erste bleibt nützlich: ein Spion zwischen dir und dem CDN kann diese Session nicht einfach speichern, um sie später zu brechen.

Aber die eventuelle Existenz eines anderen klassischen Segments verschiebt die Angriffsfläche.

## Und wenn die Site kein Cloudflare nutzt?

Alles hängt dann von den beiden Enden ab.

Ein aktuelles Chrome kann `X25519MLKEM768` anbieten.

Wenn der Server ihn ebenfalls unterstützt, kann TLS 1.3 ihn wählen.

Wenn der Server ihn nicht unterstützt, hat der Browser immer noch klassische Gruppen wie X25519 und die Verbindung kann auf diese zurückfallen.

Genau das ist die Rolle von Hybridation und Verhandlung: eine progressive Migration zu erlauben, ohne die Milliarden Dienste, die noch nicht migriert sind, sofort unzugänglich zu machen.

Aber diese Kompatibilität schafft auch eine unbequeme Realität.

**Einen post-quantischen Browser zu haben, bedeutet nicht, dass all deine Verbindungen es sind.**

Der Server zählt.

Die TLS-Version zählt.

Eventuelle Intermediäre zählen.

Und jede unabhängige Verbindung zählt.

Cloudflare präzisiert beispielsweise, dass seine post-quantischen Mechanismen auf **TLS 1.3** basierenden Protokollen genutzt werden, HTTP/3 eingeschlossen. 

## Warum X25519 nicht sofort aufgeben?

Man könnte sich eine viel einfachere Migration vorstellen:

X25519 durch ML-KEM ersetzen und nie wieder vom alten System sprechen.

Das wäre eleganter.

Das wäre auch risikoreicher.

Ein neuer Algorithmus kann an einer unbekannten mathematischen Schwäche leiden, aber auch an einem schlichten Implementierungsfehler: Zeit-Seitenkanal, schlechte Zufallsgenerierung, Validierungsfehler oder Hilfskanal.

Die Geschichte von Kyber selbst liefert eine nützliche Erinnerung mit Implementierungslücken wie KyberSlash, die diverse Bibliotheken betrafen, ohne dass das mathematische Prinzip von Kyber gebrochen wäre. Cloudflare hat genau diese Art von Risiko unter seinen Gründen für den Beibehalt einer hybriden Konstruktion genannt. 

Hybridation kostet also Bandbreite und Komplexität.

Aber sie kauft etwas Wertvolles während einer kryptografischen Migration: **Zeit ohne irreversibles Risiko**.

## Das Web hatte schon begonnen, bevor der Standard fertig war

Das ist vielleicht der ungewöhnlichste Aspekt dieser Geschichte.

In vielen Bereichen stellt man sich folgende Sequenz vor:

```

```

```
recherche
→ standard
→ implémentation
→ déploiement
```

Hier hat sich die Chronologie teilweise überlagert.

Chrome und Cloudflare testeten Kyber bereits auf echtem Verkehr, während seine Normung noch nicht abgeschlossen war.

Das NIST veröffentlichte FIPS 203 im August 2024.

Chrome ersetzte daraufhin die experimentelle Variante durch ML-KEM.

Go und OpenSSL integrierten es 2025 in ihre Defaults.

Der Großteil des von Cloudflare gemessenen menschlichen Verkehrs überschritt die post-quantische Schwelle im selben Jahr.

Und die IETF veröffentlichte die RFC 10024, die die hybriden TLS-Gruppen offiziell normt, erst im **August 2026**. 

Der Standard ist nicht der gesamten operationalen Erfahrung vorausgegangen.

Er hat auch von ihr profitiert.

Middlebox-Probleme, Nachrichtengrößen, reales Implementierungsverhalten und Inkompatibilitäten wurden auf einem Internet entdeckt, wo die Primitive bereits genutzt wurde.

Das ist weniger sauber als ein theoretischer Umstieg.

Für eine Infrastruktur dieser Größe ist es wahrscheinlich realistischer.

## Das Schloss erzählt jetzt nur noch einen Teil der Geschichte

Lange konnte der Nutzer TLS vernünftigerweise auf zwei Fragen reduzieren:

nutzt die Site HTTPS?

Ist das Zertifikat gültig?

Die post-quantische Migration macht diese Darstellung unzureichend.

Zwei Verbindungen, die exakt dieselbe Browser-Oberfläche zeigen, können nun unterschiedliche Garantien bieten.

Die eine kann nutzen:

```

```

```
TLS 1.3
X25519
ECDSA
AES-GCM
```

und die andere:

```

```

```
TLS 1.3
X25519MLKEM768
ECDSA
AES-GCM
```

Auf dem Bildschirm ändert sich fast nichts.

Für einen klassischen Angreifer heute können beide extrem robust sein.

Für einen hypothetischen Adversären, der Sessions aufzeichnet, um später über einen Quantencomputer zu verfügen, sind sie却 nicht äquivalent.

Die zweite Verbindung enthält bereits eine Primitive, die genau dazu bestimmt ist, diese Strategie scheitern zu lassen.

## 2026 muss „post-quantisch“ also qualifiziert werden

Zu sagen, eine Site sei einfach „quantum-safe“, verschleiert zu viel Information.

Eine technisch korrekte Beschreibung sollte präzisieren, **was** post-quantisch ist.

Für eine moderne HTTPS-Verbindung genügen vier Fragen:

1.   
nutzt der Schlüsselaustausch `X25519MLKEM768` oder einen anderen PQ-Mechanismus?  

2.   
nutzt die Server-Authentifizierung noch RSA/ECDSA oder eine post-quantische Signatur?  

3.   
gibt es ein CDN oder einen TLS-Proxy, der die Verbindung in mehrere Segmente zerlegt?  

4.   
nutzen die folgenden Segmente bis zum Origin-Server ebenfalls einen post-quantischen Austausch?  


Erst wenn die Gesamtheit der wichtigen Antworten post-quantisch wird, wird der Ausdruck „vollständig post-quantische Verbindung“ verteidigbar.

Und wir sind auf dem öffentlichen Web noch nicht dort.

## Was heute wirklich geschützt ist

Die Antwort auf die Ausgangsfrage ist letztlich recht präzise.

**Wenn du 2026 mit einem aktuellen Browser eine Site öffnest, kann der Inhalt deiner Verbindung bereits von einem post-quantischen Schutz gegen zukünftiges Entschlüsseln profitieren, wenn der Server** `X25519MLKEM768` **aushandelt.**

Chrome bietet es standardmäßig an. Die großen Server-Stacks beherrschen es nun. Cloudflare rollt es im großen Maßstab aus. Die IETF hat es im August 2026 formal standardisiert. 

Die Daten werden anschließend mit symmetrischen Algorithmen wie AES-GCM oder ChaCha20-Poly1305 transportiert, die nicht unter dem strukturellen Bruch leiden, den Shor RSA und ECC zufügt. 

Aber **die kryptografische Identität des Servers bleibt im Allgemeinen in einer klassischen PKI verankert**, und nicht alle Segmente hinter einem CDN sind notwendigerweise post-quantisch.

Das Web von 2026 befindet sich also in einem Zustand, der viel seltsamer ist als ein simples „vor/nach“.

Es nutzt bereits die Kryptografie der Zukunft, um die Geheimnisse der Gegenwart zu schützen, während es weiterhin einer Identitätsinfrastruktur vertraut, die für die alte Welt entworfen wurde.

Die post-quantische Transition wird nicht am Tag eintreten, an dem der Computer erscheint, der RSA brechen kann.

**Sie hat bereits begonnen und für einen Teil deines Verkehrs ist sie bereits abgeschlossen.**