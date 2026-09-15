---
title: They didn't hack Revolut. Revolut gave them the data
description: 'Fraudsters obtained the records of hundreds of Revolut customers without penetrating its servers. The incident reveals a deeper flaw: what happens when the channel meant to authenticate the state itself can no longer be considered trustworthy?'
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
coverAlt: An authenticated fake government request leads a bank to transmit sensitive customer data.
author: Voldigoade
locale: en
sourceSlug: 2026-09-15-ils-nont-pas-pirate-revolut-revolut-leur-a-donne-les-donnees
sourceHash: d77c01908564eee835e125fb7c9d9f79aa754148bedd541196153d018ffb3515
manual: false
---

No zero-day vulnerability needed to be exploited. No need to inject code into a server, bypass a firewall, or clandestinely exfiltrate a database.

The fraudsters asked for the information.

And Revolut provided it to them.

On September 12, 2026, the British fintech confirmed it had transmitted sensitive data to an unauthorized third party after receiving fraudulent requests originating from an **email domain genuinely belonging to a government agency**. Revolut asserts that its own systems were not compromised and that customer funds remained intact.

Three days later, the *Financial Times* provided a figure: **680 customers were notified**. Passports, identity documents, personal addresses, and banking information are among the data involved. The UK's Information Commissioner's Office is now examining the incident.

At first glance, 680 victims out of roughly 80 million customers may seem almost anecdotal.

That would be looking at the wrong number.

## A leak of 680 records can be worse than a leak of 680,000 email addresses

Not all personal data carries the same weight.

Notifications received by some customers indicate that the potentially transmitted information could include name, date of birth, postal and email address, phone number, copies of passport or driver's license, identity verification selfie, account statements, IBANs, withdrawals, and transaction history including Bitcoin transactions for some users.

This is a particularly sensitive combination because it brings together information that is usually separate.

An attacker no longer possesses just your email address. They can potentially know **who you are legally, what you look like, where you live, where you hold your money, and how you use it**.

This turns a KYC file into ideal material for extremely personalized fraud.

![](/images/posts/7a3529fd-9704-40c3-b765-9411e7c16e80.png)

A fake bank advisor knowing your latest transactions appears more credible. An account recovery attempt using your identity document becomes more serious. For a major cryptocurrency holder, the association between physical identity, home address, and financial history even adds a personal safety dimension.

Nothing proves for now that all these secondary attacks have actually occurred. But the potential is significantly higher than that of a classic password leak.

## The $780 million is almost a distraction

Part of the media coverage focused on a spectacular figure: **10,000 bitcoins**, or about $780 million at the current rate, were allegedly demanded by individuals presenting themselves as the perpetrators of the operation.

This claim must remain exactly what it is: **a claim**.

Revolut has not publicly authenticated the ransom demand, and all assertions by those claiming the attack have not been independently verified.

The amount attracts clicks. It explains almost nothing.

The truly important information lies elsewhere: someone discovered they could transform **a government administration's trust infrastructure into an access credential for a private company's data**.

And this technique isn't even new.

## The FBI had described almost exactly this scenario in 2024

![image.png](/images/posts/image-1.png)

On November 4, 2024, the FBI published a rather remarkable alert.

Its title: *Easy Access to Information for Conducting Fraudulent Emergency Data Requests Impacts US-Based Companies and Law Enforcement Agencies*.

The agency warned that cybercriminals were compromising **U.S. and foreign government email addresses**, then using them to send companies fake urgent requests for personal data.

The FBI notably cited the prior use of this method by Lapsus$ et signalait l’apparition, sur des forums criminels, de ventes de comptes gouvernementaux compromis et de services permettant de produire de fausses demandes officielles. 

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