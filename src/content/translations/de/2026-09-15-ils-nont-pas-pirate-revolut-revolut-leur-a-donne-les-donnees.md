---
title: Sie haben Revolut nicht gehackt. Revolut hat ihnen die Daten gegeben
description: 'Betrüger erlangten die Datensätze hunderter Revolut-Kunden, ohne dessen Server zu infiltrieren. Der Vorfall legt ein tieferes Problem offen: Was passiert, wenn der Kanal, der eigentlich den Staat authentifizieren soll, nicht mehr als vertrauenswürdig gelten kann?'
pubDate: 2026-09-15
draft: false
featured: true
section: computing
contentType: research
tags:
  - Revolut
  - cybersécurité
  - ingénierie sociale
  - protection des données
  - KYC
  - Bitcoin
  - zero trust
coverImage: /images/posts/b30b385d-80a4-4451-807e-4c0f1210dd32.png
coverAlt: Eine gefälschte, authentifizierte Regierungsanfrage führt dazu, dass eine Bank sensible Kundendaten übermittelt.
author: Voldigoade
locale: de
sourceSlug: 2026-09-15-ils-nont-pas-pirate-revolut-revolut-leur-a-donne-les-donnees
sourceHash: d77c01908564eee835e125fb7c9d9f79aa754148bedd541196153d018ffb3515
manual: false
---

Es bedurfte keiner Zero-Day-Schwachstelle. Kein Code musste in einen Server injiziert, keine Firewall umgangen, keine Datenbank heimlich exfiltriert werden.

Die Betrüger haben die Informationen schlicht angefordert.

Und Revolut hat sie ihnen übergeben.

Am 12. September 2026 bestätigte die britische Fintech, sensible Daten an einen unbefugten Dritten übermittelt zu haben, nachdem sie betrügerische Anfragen von einer **E-Mail-Domäne erhalten hatte, die tatsächlich einer Regierungsbehörde gehörte**. Revolut beteuert, die eigenen Systeme seien nicht kompromittiert gewesen und die Kundengelder seien unberührt geblieben.

Drei Tage später nannte die *Financial Times* eine Zahl: **680 Kunden wurden benachrichtigt**. Zu den betroffenen Daten zählen Reisepässe, Ausweise, private Adressen und Bankinformationen. Das britische Information Commissioner's Office prüft den Vorfall nun.

Auf den ersten Blick mögen 680 Betroffene bei rund 80 Millionen Kunden fast vernachlässigbar erscheinen.

Das wäre der falsche Blick auf die falsche Zahl.

## Ein Leck von 680 Datensätzen kann schlimmer sein als ein Leck von 680.000 E-Mail-Adressen

Nicht alle personenbezogenen Daten sind gleichwertig.

Die Benachrichtigungen, die einige Kunden erhielten, deuten darauf hin, dass die potenziell übermittelten Informationen Namen, Geburtsdatum, Post- und E-Mail-Adresse, Telefonnummer, Kopien von Reisepässen oder Führerscheinen, das Selfie zur Identitätsverifizierung, Kontoauszüge, IBANs, Abhebungen und den Transaktionsverlauf einschließlich Bitcoin-Operationen für bestimmte Nutzer umfassen konnten.

Das ist eine besonders sensible Kombination, weil sie Informationen zusammenführt, die sonst getrennt vorliegen.

Ein Angreifer besitzt nicht mehr nur deine E-Mail-Adresse. Er kann potenziell wissen, **wer du rechtlich bist, wie du aussiehst, wo du wohnst, wo du dein Geld hältst und wie du es nutzt**.

Damit wird ein KYC-Dossier zu idealem Material für extrem personalisierten Betrug.

![](/images/posts/7a3529fd-9704-40c3-b765-9411e7c16e80.png)

Ein falscher Bankberater, der deine letzten Transaktionen kennt, wirkt glaubwürdiger. Ein Konto-Wiederherstellungsversuch mit deinem Ausweisdokument wird ernster genommen. Für einen bedeutenden Kryptowährungsinhaber fügt die Verknüpfung von physischer Identität, Wohnsitz und Finanzhistorie sogar eine persönliche Sicherheitsdimension hinzu.

Bisher belegt nichts, dass all diese sekundären Angriffe tatsächlich stattgefunden haben. Aber das Potenzial übersteigt das einer klassischen Passwort-Leckage bei Weitem.

## Die 780 Millionen Dollar sind fast eine Ablenkung

Ein Teil der Berichterstattung konzentrierte sich auf eine spektakuläre Zahl: **10.000 Bitcoins**, rund 780 Millionen Dollar zum damaligen Kurs, seien von Personen gefordert worden, die sich als Urheber der Aktion ausgaben.

Diese Forderung muss genau das bleiben: **eine Behauptung**.

Revolut hat die Lösegeldforderung nicht öffentlich authentifiziert, und die Aussagen der sich zur Tat bekennenden Personen wurden nicht unabhängig verifiziert.

Der Betrag zieht Klicks an. Er erklärt so gut wie nichts.

Die eigentlich wichtige Information liegt woanders: Jemand hat herausgefunden, dass sich **die Vertrauensinfrastruktur einer Behörde in einen Zugangsausweis zu den Daten eines Privatunternehmens verwandeln lässt**.

Und diese Technik ist nicht einmal neu.

## Das FBI hatte 2024 fast genau dieses Szenario beschrieben

![image.png](/images/posts/image-1.png)

Am 4. November 2024 veröffentlichte das FBI eine bemerkenswerte Warnung.

Ihr Titel: *Easy Access to Information for Conducting Fraudulent Emergency Data Requests Impacts US-Based Companies and Law Enforcement Agencies*.

Die Behörde warnte, Cyberkriminelle kompromittierten **E-Mail-Adressen US-amerikanischer und ausländischer Regierungsbehörden** und nutzten diese, um Unternehmen gefälschte dringende Anfragen nach personenbezogenen Daten zu senden.

Das FBI nannte unter anderem die frühere Nutzung dieses Verfahrens durch Lapsus$ et signalait l’apparition, sur des forums criminels, de ventes de comptes gouvernementaux compromis et de services permettant de produire de fausses demandes officielles. 

Le document explique également pourquoi cette voie est attirante : les demandes d’urgence peuvent être conçues pour fournir rapidement des informations lorsqu’une vie ou une situation grave est en jeu, ce qui peut réduire certains contrôles normalement appliqués à une procédure plus lente. 

Deux ans plus tard, Revolut vient de tomber dans **la même famille d’attaque** : faire confiance à une requête parce qu’elle emprunte un canal gouvernemental apparemment légitime.

C’est là que l’incident devient beaucoup plus intéressant qu’un simple cas de phishing.

## Un domaine authentique ne rend pas une demande légitime

La sécurité informatique mélange souvent deux concepts qui devraient rester distincts :

**l’authentification** répond à la question *« d’où vient cette communication ? »* ;

**l’autorisation** répond à *« cette personne a-t-elle réellement le droit de demander cette opération ? »*.

Dans le cas Revolut, les contrôles techniques du domaine pouvaient être valides. Selon l’entreprise, les requêtes provenaient bien d’un domaine gouvernemental légitime et disposaient d’une authentification technique valide. 

Mais cela prouve principalement que l’infrastructure de messagerie reconnue a été utilisée.

Cela ne prouve pas que :

- l’auteur actuel du message est l’agent légitime ;
- une enquête correspond réellement à la demande ;
- cet agent possède l’autorité nécessaire ;
- les données demandées sont proportionnées ;
- le compte gouvernemental lui-même n’a pas été compromis.

C’est l’équivalent numérique de quelqu’un utilisant une véritable voiture de police volée.

La voiture reste authentique.

Le conducteur ne l’est pas.

## Le problème est structurel : les entreprises ont besoin de faire confiance aux gouvernements

On pourrait conclure qu’il suffit de « ne jamais faire confiance aux e-mails ».

Ce serait trop facile.

Une banque ne peut évidemment pas ignorer systématiquement la police, les tribunaux et les autorités financières. Les entreprises possédant des données peuvent être légalement tenues de répondre à des réquisitions.

Il existe donc nécessairement une interface entre deux systèmes :

**l’administration qui demande des informations** et **l’entreprise qui les détient**.

Cette interface est extrêmement puissante. C’est précisément pourquoi elle mérite des garanties comparables à celles d’une API sensible.

Un simple domaine connu ne devrait pas constituer à lui seul une autorisation.

Pour les demandes les plus sensibles, une architecture réellement robuste devrait pouvoir ajouter plusieurs contrôles indépendants : validation par un portail cryptographiquement authentifié, vérification du numéro de dossier auprès d’un canal déjà connu, confirmation hors bande auprès de l’agence, double approbation interne, limitation stricte des informations transmises et journalisation permettant ensuite un audit.

Le FBI recommandait déjà aux entreprises de ne pas s’arrêter à l’apparence d’une demande et de contacter directement l’expéditeur ou son organisation lorsqu’un doute existe.

Ce n’est plus seulement de la sécurité e-mail.

C’est du **zero trust appliqué à l’autorité elle-même**.

## Les données KYC ont un étrange paradoxe

Les banques accumulent les pièces d’identité pour empêcher la fraude.

C’est le principe du *Know Your Customer* : savoir précisément avec qui elles font affaire.

Mais plus le dossier KYC est complet, plus sa compromission devient utile à quelqu’un souhaitant précisément **usurper cette identité**.

Le système produit donc un paradoxe :

> Pour réduire le risque de fraude, nous centralisons les informations les plus utiles à une fraude future.

Cela ne signifie pas qu’il faudrait supprimer toute vérification d’identité. Cela signifie que ces archives devraient être considérées comme des actifs extrêmement sensibles, y compris lorsqu’elles quittent l’infrastructure bancaire par une procédure parfaitement légale.

Le chiffrement d’une base de données ne protège rien lorsqu’un employé autorisé exporte volontairement son contenu pour le remettre au mauvais destinataire.

## Le véritable périmètre de sécurité n’appartient plus entièrement à Revolut

Revolut peut sécuriser ses serveurs.

Il peut utiliser des HSM, segmenter son réseau, surveiller ses employés, auditer ses applications et déployer les meilleurs systèmes de détection disponibles.

Tout cela échoue à résoudre un problème situé en dehors de son infrastructure :

**et si l’organisation à laquelle Revolut a choisi de faire confiance est compromise ?**

C’est probablement la leçon la plus importante de cet incident.

Les entreprises modernes ne possèdent plus un périmètre de sécurité clairement délimité. Elles possèdent un **graphe de confiance** : prestataires cloud, fournisseurs, employés, autorités, partenaires, systèmes d’identité, services de paiement.

Une faiblesse dans n’importe quel nœud suffisamment privilégié peut devenir une faiblesse chez elles.

Les fraudeurs de Revolut, s’ils sont bien à l’origine de l’ensemble des faits revendiqués, n’ont pas eu besoin de vaincre directement la sécurité de Revolut.

Ils ont trouvé mieux.

Ils ont utilisé **la confiance de Revolut contre Revolut**.

Et c’est exactement pour cela que cette attaque mérite beaucoup plus d’attention que son éventuelle rançon de 10 000 bitcoins.