---
title: Ils n’ont pas piraté Revolut. Revolut leur a donné les données
description: "Des fraudeurs ont obtenu les dossiers de centaines de clients
  Revolut sans pénétrer ses serveurs. L’incident révèle une faille plus profonde
  : que se passe-t-il quand le canal censé authentifier l’État lui-même ne peut
  plus être considéré comme fiable ?"
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
coverAlt: Une fausse demande gouvernementale authentifiée conduit une banque à
  transmettre des données sensibles de clients.
author: Voldigoade
---
Il n’a pas fallu exploiter une vulnérabilité zero-day. Pas besoin d’injecter du code dans un serveur, de contourner un pare-feu ou d’exfiltrer clandestinement une base de données.

Les fraudeurs ont demandé les informations.

Et Revolut les leur a fournies.

Le 12 septembre 2026, la fintech britannique a confirmé avoir transmis des données sensibles à un tiers non autorisé après avoir reçu des demandes frauduleuses provenant d’un **domaine e-mail appartenant réellement à une agence gouvernementale**. Revolut affirme que ses propres systèmes n’ont pas été compromis et que les fonds des clients sont restés intacts. 

Trois jours plus tard, le *Financial Times* apportait un chiffre : **680 clients ont été avertis**. Passeports, pièces d’identité, adresses personnelles et informations bancaires figurent parmi les données concernées. L’Information Commissioner’s Office britannique examine désormais l’incident. 

À première vue, 680 victimes sur environ 80 millions de clients peuvent sembler presque anecdotiques.

Ce serait regarder le mauvais nombre.

## Une fuite de 680 dossiers peut être pire qu’une fuite de 680 000 adresses e-mail

Toutes les données personnelles ne se valent pas.

Les notifications reçues par certains clients indiquent que les informations potentiellement transmises pouvaient comprendre le nom, la date de naissance, l’adresse postale et électronique, le numéro de téléphone, des copies de passeport ou de permis de conduire, le selfie de vérification d’identité, des relevés de compte, des IBAN, des retraits et l’historique des transactions y compris des opérations en Bitcoin pour certains utilisateurs. 

C’est une combinaison particulièrement sensible parce qu’elle réunit des informations habituellement séparées.

Un attaquant ne possède plus seulement ton adresse e-mail. Il peut potentiellement savoir **qui tu es juridiquement, à quoi tu ressembles, où tu vis, où tu détiens ton argent et comment tu l’utilises**.

Cela transforme un dossier KYC en matériel idéal pour une fraude extrêmement personnalisée.

![](/blog/images/posts/7a3529fd-9704-40c3-b765-9411e7c16e80.png)

Un faux conseiller bancaire connaissant tes dernières transactions paraît plus crédible. Une tentative de récupération de compte utilisant ton document d’identité devient plus sérieuse. Pour un détenteur important de cryptomonnaies, l’association entre identité physique, domicile et historique financier ajoute même une dimension de sécurité personnelle.

Rien ne prouve pour l’instant que toutes ces attaques secondaires aient effectivement eu lieu. Mais le potentiel est nettement supérieur à celui d’une fuite classique de mots de passe.

## Les 780 millions de dollars sont presque une distraction

Une partie de la couverture médiatique s’est concentrée sur un chiffre spectaculaire : **10 000 bitcoins**, soit environ 780 millions de dollars au cours du moment, auraient été réclamés par des individus se présentant comme les auteurs de l’opération.

Cette revendication doit rester exactement ce qu’elle est : **une revendication**.

Revolut n’a pas authentifié publiquement la demande de rançon, et toutes les affirmations des personnes revendiquant l’attaque n’ont pas été vérifiées indépendamment.

Le montant attire les clics. Il n’explique presque rien.

L’information réellement importante est ailleurs : quelqu’un a découvert qu’il pouvait transformer **l’infrastructure de confiance d’une administration en identifiant d’accès aux données d’une entreprise privée**.

Et cette technique n’est même pas nouvelle.

## Le FBI avait décrit presque exactement ce scénario en 2024

![image.png](/blog/images/posts/image-1.png)

Le 4 novembre 2024, le FBI publiait une alerte assez remarquable.

Son titre : *Easy Access to Information for Conducting Fraudulent Emergency Data Requests Impacts US-Based Companies and Law Enforcement Agencies*.

L’agence avertissait que des cybercriminels compromettaient des **adresses e-mail gouvernementales américaines et étrangères**, puis les utilisaient pour envoyer à des entreprises de fausses demandes urgentes de données personnelles.

Le FBI citait notamment l’utilisation antérieure de ce procédé par Lapsus$ et signalait l’apparition, sur des forums criminels, de ventes de comptes gouvernementaux compromis et de services permettant de produire de fausses demandes officielles. 

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