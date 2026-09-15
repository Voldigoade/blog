---
title: XChat est chiffré de bout en bout. Cela ne veut pas dire que tout est privé
description: "La disparition inexpliquée de XChat de l’App Store attire
  l’attention, mais son protocole pose une question bien plus intéressante :
  qu’est-ce qu’une messagerie « privée » protège réellement lorsque les
  métadonnées, les sauvegardes de clés et Grok entrent dans l’équation ?"
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
coverAlt: Une conversation XChat chiffrée protège son contenu mais laisse
  visibles des métadonnées et peut transmettre un message déchiffré à Grok.
author: Voldigoade
---
Le 14 septembre 2026, l’application XChat disparaît de l’App Store.

La recherche ne la retourne plus. Son ancienne page devient inaccessible. MacRumors met ensuite son article à jour : il semble que **X ait lui-même retiré l’application**, sans expliquer pourquoi. 

Sur Android, l’application reste disponible. Et surtout, le service Chat continue d’exister dans X et sur le Web. 

Nous ne savons donc pas aujourd’hui si le retrait iOS correspond à un problème temporaire, une décision produit, une modification technique ou autre chose.

Inventer une explication serait facile.

Mais l’incident attire l’attention sur un sujet beaucoup plus intéressant et parfaitement documenté :

**qu’est-ce que XChat protège réellement ?**

La réponse est nettement plus subtile que « c’est chiffré » ou « X peut tout lire ».

## Oui, XChat possède bien du chiffrement de bout en bout

Commençons par éviter une critique paresseuse.

X explique qu’au premier démarrage de Chat, une paire de clés publique/privée est générée pour l’utilisateur.

Chaque conversation possède ensuite sa propre clé servant à chiffrer les messages.

Le contenu, les liens, médias, fichiers et réactions d’une conversation chiffrée sont chiffrés **avant de quitter l’appareil de l’expéditeur**, restent chiffrés sur l’infrastructure de X et sont déchiffrés sur l’appareil du destinataire. 

Ce n’est donc pas un simple tunnel TLS jusqu’aux serveurs de X présenté abusivement comme de la confidentialité.

Pour les conversations indiquées comme chiffrées, il existe réellement une architecture E2EE.

Et X a fait auditer son protocole par une société tierce, avec un rapport public référencé dans sa propre documentation. 

La question sérieuse n’est donc pas :

> « Est-ce du vrai chiffrement ? »

Elle est :

> **« Où sont exactement les frontières de ce chiffrement ? »**

C’est beaucoup plus instructif.

## X peut encore savoir qui parle à qui

Le chiffrement protège le **contenu**.

Il ne masque pas toutes les métadonnées.

X indique explicitement que des informations telles que **le destinataire et l’heure de création du message ne sont pas chiffrées**. La plateforme conserve également une trace lorsqu’un post X est partagé à travers une conversation chiffrée. 

Cela illustre une distinction centrale en confidentialité.

Supposons que personne ne puisse lire cette conversation :

```
— On se retrouve à 22 h ?
— Oui.

```

Un opérateur peut malgré tout connaître :

```
Compte A → Compte B
22:03

```

puis :

```
Compte B → Compte A
22:04

```

Sur une seule conversation, cela paraît presque insignifiant.

À l’échelle de plusieurs mois, les métadonnées peuvent révéler des graphes sociaux, des habitudes, des périodes d’activité et la fréquence des relations.

**Un message chiffré n’est pas un message invisible.**

## La faiblesse technique la plus importante est reconnue directement par X

La documentation contient une section inhabituellement explicite :

**Forward secrecy.**

Et X dit clairement que son système actuel n’en dispose pas.

Si la clé privée d’un appareil enregistré est compromise, un attaquant pourrait déchiffrer **tous les messages chiffrés envoyés ou reçus par cet appareil**. X indique travailler sur la rotation des clés afin d’introduire une forme de confidentialité persistante ultérieurement. 

Pour comprendre pourquoi c’est important, imaginons deux systèmes.

### Système A

Alice et Bob utilisent toujours une clé capable d’ouvrir l’ensemble de leur historique.

Un attaquant vole cette clé en 2028.

Il peut éventuellement déchiffrer leurs conversations enregistrées de 2026, 2027 et 2028.

### Système B

Les clés évoluent continuellement de telle manière que les anciennes clés sont détruites ou deviennent inutiles.

Un attaquant compromet l’appareil aujourd’hui.

Il peut causer des dégâts à partir de maintenant, mais il ne récupère pas automatiquement deux années d’historique.

C’est l’objectif de la *forward secrecy*.

Son absence ne signifie pas que XChat est « cassé ».

Elle signifie que **l’impact temporel d’une compromission de clé est beaucoup plus important**.

Pour une messagerie se présentant comme particulièrement privée, c’est une limitation substantielle.

## Mais X ne stocke pas simplement ta clé privée en clair

À l’inverse, dire :

> « X garde ta clé sur ses serveurs, donc le chiffrement ne sert à rien »

serait également faux.

X utilise le protocole open source **Juicebox** pour permettre la récupération multi-appareils.

La clé privée est découpée en plusieurs fragments stockés dans trois *realms*. Deux utilisent des HSM, des modules matériels conçus pour effectuer des opérations cryptographiques en protégeant leurs secrets.

Il faut au moins **deux fragments sur trois** pour reconstruire la clé, avec au moins un fragment provenant d’un realm protégé matériellement. 

Le PIN de l’utilisateur ne quitte pas l’appareil.

Les realms matériels appliquent par ailleurs une limite cryptographique de **20 tentatives incorrectes** avant de rendre les fragments inutilisables. X affirme que cette construction empêche même l’entreprise de simplement tester massivement tous les codes PIN jusqu’à trouver le bon. 

C’est une architecture nettement plus intéressante que « mot de passe + clé dans une base ».

## Il reste pourtant une concentration de confiance

Aujourd’hui, les **trois realms Juicebox sont opérés par X**. 

C’est une nuance importante.

Cela ne signifie pas que X possède magiquement les clés reconstruites de tout le monde : la protection du PIN, les HSM et le protocole sont précisément conçus pour éviter cela.

Mais la séparation cryptographique n’est pas encore accompagnée d’une séparation organisationnelle complète.

X indique vouloir à l’avenir permettre l’utilisation de realms exploités par différentes organisations. 

Ce serait intéressant parce que la confiance pourrait alors devenir réellement distribuée.

Une architecture à trois coffres est plus convaincante lorsque les trois coffres n’appartiennent pas tous au même propriétaire.

## Certaines conversations commencent sans chiffrement

Autre détail que l’interface utilisateur devrait rendre impossible à ignorer :

les **demandes de messages peuvent être non chiffrées**.

Lorsqu’un utilisateur contacte quelqu’un qui n’a pas encore accepté la conversation chiffrée, X indique que la demande initiale reste non chiffrée jusqu’à son acceptation. 

Grok est également utilisé pour classer certaines de ces demandes entre les boîtes « Priority » et « Hidden ». 

Ce n’est pas nécessairement une catastrophe de conception.

Mais c’est exactement le genre de frontière qui rend la phrase générique :

> « Mes messages XChat sont chiffrés »

insuffisamment précise.

La bonne phrase est :

> **« Le contenu de mes conversations indiquées comme chiffrées bénéficie du chiffrement de bout en bout, dans les conditions définies par le protocole. »**

C’est moins joli sur une affiche.

C’est beaucoup plus exact.

## « Demander à Grok » ouvre volontairement la boîte

XChat contient une fonctionnalité extrêmement révélatrice : **Ask Grok**.

Tu peux sélectionner un message ou une image d’une conversation et demander à Grok de l’analyser.

X précise alors quelque chose de fondamental :

une fois ce contenu transmis à Grok, **il n’est plus chiffré dans ce contexte**, même si sa copie originale reste protégée dans la conversation. 

Cela ne constitue pas une faiblesse cryptographique.

C’est une conséquence logique.

Une IA ne peut pas analyser un texte qu’on refuse de lui montrer.

Mais c’est une excellente illustration d’un principe souvent oublié :

> **Le chiffrement de bout en bout protège un trajet. Il ne protège pas les données après que l’utilisateur décide de les remettre à un autre destinataire.**

Si Alice envoie un secret à Bob dans une messagerie parfaitement chiffrée et que Bob le copie dans Grok, ChatGPT, un e-mail ou un document public, aucun protocole cryptographique ne peut revenir dans le temps.

La confidentialité possède toujours une frontière applicative.

## Même Grok Companion crée un cas particulier

La documentation de X précise également que les échanges avec un compagnon Grok peuvent être transmis à travers une couche chiffrée, mais que **Grok doit nécessairement déchiffrer le message pour pouvoir le comprendre et répondre**. 

Encore une fois : ce n’est pas une preuve de tromperie.

C’est de l’architecture.

Mais cela montre pourquoi une interface associant messagerie privée et intelligence artificielle devra devenir extrêmement claire sur **qui constitue le destinataire final**.

Entre :

```
Alice → Bob

```

et :

```
Alice → Grok

```

le mot « chiffré » peut apparaître dans les deux cas.

La propriété de confidentialité n’est pourtant pas la même.

## Alors XChat est-il sécurisé ?

Il n’existe pas de réponse sérieuse à cette question sans préciser **contre quoi**.

Contre quelqu’un qui intercepte simplement le trafic réseau ?

Le chiffrement de bout en bout constitue une protection importante.

Contre une compromission des serveurs de stockage de messages ?

Le fait que le contenu y reste chiffré réduit fortement ce risque.

Contre l’observation des métadonnées par X ?

Non : celles-ci ne sont pas intégralement chiffrées.

Contre le vol futur d’une clé privée ?

La protection est actuellement moins forte qu’un système disposant de forward secrecy, puisque X reconnaît qu’une clé compromise peut exposer l’historique de l’appareil.

Contre l’analyse d’un message volontairement envoyé à Grok ?

Non, par définition.

Contre un attaquant essayant simplement des millions de PIN sur l’infrastructure de récupération ?

Juicebox et les HSM sont précisément conçus pour rendre cette approche impraticable. 

C’est cela, un **threat model** : on ne demande pas si quelque chose est « sécurisé » dans l’absolu. On demande quels adversaires, quelles capacités et quels scénarios le système est conçu pour supporter.

## Le retrait de l’App Store est finalement la partie la moins intéressante

Au moment où cet article est écrit, nous ne savons toujours pas pourquoi l’application XChat autonome a disparu de l’App Store. 

Peut-être apprendrons-nous demain qu’il s’agissait d’un banal problème de distribution.

Peut-être pas.

Mais l’événement aura au moins eu un mérite : attirer l’attention sur une messagerie dont la documentation technique est beaucoup plus intéressante que le débat superficiel « Elon Musk peut-il lire mes messages ? ».

La réponse réelle est faite de couches.

Le contenu des conversations chiffrées est protégé.

Les métadonnées ne le sont pas toutes.

Les demandes initiales peuvent être en clair.

La sauvegarde de clés utilise une construction cryptographique élaborée, mais tous les realms sont actuellement exploités par X.

La forward secrecy n’est pas encore présente.

Et un message remis à Grok doit nécessairement sortir de son enveloppe cryptographique pour être traité.

Aucune de ces phrases, prise seule, ne décrit correctement XChat.

Ensemble, elles montrent quelque chose de plus général :

**la vie privée n’est pas un interrupteur réglé sur ON ou OFF.**

C’est un ensemble de propriétés.

Et « chiffré de bout en bout » n’en est qu’une.