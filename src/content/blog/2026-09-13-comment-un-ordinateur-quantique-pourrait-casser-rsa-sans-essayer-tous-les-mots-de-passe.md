---
title: Comment un ordinateur quantique pourrait casser RSA sans « essayer tous
  les mots de passe »
description: "On répète souvent qu’un ordinateur quantique pourra casser une
  partie de notre cryptographie. Mais comment, exactement ? Le véritable danger
  ne vient pas d’une machine absurdement rapide : il vient d’un algorithme qui
  change complètement la manière d’attaquer le problème."
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
  title: Internet face au quantique
coverImage: /images/posts/8c6ab339-ddae-4116-b264-2455d5ef0f4d.png
coverAlt: Représentation d’un ordinateur quantique analysant la structure
  mathématique d’une clé RSA.
author: Voldigoade
---
Dire qu’un ordinateur quantique pourra « casser RSA » donne facilement une mauvaise image du problème.

On pourrait imaginer une machine tellement puissante qu’elle essaierait des milliards de milliards de clés jusqu’à trouver la bonne.

Ce n’est pas ça.

Le véritable problème est beaucoup plus intéressant : **un ordinateur quantique suffisamment avancé pourrait utiliser une méthode mathématique que nos ordinateurs classiques ne savent pas exploiter efficacement.**

Et tout repose sur une faiblesse volontairement choisie il y a près de cinquante ans.

## RSA protège un secret avec un problème facile dans un sens, difficile dans l’autre

Prenons deux nombres premiers :

`61 × 53 = 3233`

Faire la multiplication est trivial.

Mais imaginons maintenant que je te donne seulement :

`3233`

et que je te demande :

> Quels nombres premiers ont été multipliés pour obtenir ce résultat ?

Avec un nombre aussi petit, tu trouverais rapidement `61` et `53`.

RSA applique essentiellement la même idée, mais avec des nombres gigantesques.

Une clé RSA moderne peut utiliser un module de **2048 bits**, soit un nombre possédant environ **617 chiffres décimaux**.

Multiplier les deux grands nombres premiers qui le composent est facile pour un ordinateur.

Retrouver ces facteurs à partir du résultat est, avec les meilleures méthodes classiques connues, extrêmement difficile lorsque les paramètres sont correctement choisis.

C'est ce déséquilibre qui rend RSA utile.

Pas parce que la factorisation est impossible.

Parce qu'elle est considérée comme **impraticable à l'échelle requise** avec nos ordinateurs classiques.

## Puis Peter Shor arrive

En 1994, le mathématicien Peter Shor publie un algorithme destiné aux ordinateurs quantiques.

Et cet algorithme change radicalement le problème.

L'algorithme de Shor permet, en théorie, de factoriser efficacement de grands nombres sur un ordinateur quantique suffisamment puissant.

Il ne consiste toujours pas à essayer chaque combinaison une par une.

Il transforme la factorisation en un autre problème : **trouver la période d'une fonction mathématique**.

C'est précisément dans cette étape qu'intervient la mécanique quantique.

Un ordinateur classique manipule des bits qui valent `0` ou `1`.

Un ordinateur quantique manipule des **qubits**, dont l'état peut être une superposition de plusieurs possibilités. Mais attention au raccourci souvent répété : cela ne signifie pas qu'un ordinateur quantique « teste toutes les réponses en même temps et lit la bonne ».

Si c'était aussi simple, pratiquement tous les problèmes informatiques deviendraient instantanément faciles.

Ce qui rend Shor puissant est beaucoup plus subtil.

L'algorithme prépare un état quantique contenant une structure mathématique particulière, puis utilise notamment la **transformée de Fourier quantique** pour faire apparaître la périodicité recherchée. Une mesure permet ensuite d'obtenir suffisamment d'informations pour reconstruire cette période.

Et cette période peut conduire aux facteurs du nombre.

En simplifiant énormément :

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

La cryptographie n'est donc pas vaincue par davantage de force brute.

**On contourne la difficulté sur laquelle elle reposait.**

## Pourquoi cela menace RSA

Dans RSA, la clé publique peut être connue de tout le monde.

C'est même son rôle.

Ce qui doit rester inaccessible est la clé privée.

Or les paramètres publics contiennent un nombre construit à partir de deux grands nombres premiers secrets. Si un attaquant arrive à factoriser efficacement ce nombre, il peut retrouver les informations nécessaires pour reconstruire la clé privée.

À partir de là, selon l'usage de RSA, les conséquences peuvent devenir graves : falsification de signatures, compromission de mécanismes d'authentification ou déchiffrement de données lorsque le protocole dépend directement de RSA.

C'est pour cela que l'arrivée éventuelle d'un ordinateur quantique **cryptographiquement pertinent** suffisamment fiable et puissant pour exécuter ce genre d'attaque à une échelle utile constitue un problème de cybersécurité réel.

Le NIST considère explicitement RSA ainsi que plusieurs systèmes fondés sur les courbes elliptiques comme vulnérables à ce futur modèle de calcul et organise leur remplacement progressif par des standards post-quantiques. L'objectif américain actuel est de retirer progressivement des standards les algorithmes vulnérables d'ici **2035**, les systèmes les plus sensibles devant migrer plus tôt. 

## Alors pourquoi personne n'a encore cassé RSA-2048 avec un ordinateur quantique ?

Parce qu'entre **« l'algorithme existe »** et **« nous possédons la machine capable de l'exécuter »**, il y a un gouffre.

Les qubits actuels sont fragiles.

Ils sont extrêmement sensibles au bruit et aux erreurs. Plus un calcul quantique devient long et complexe, plus maintenir correctement l'information devient difficile.

La solution envisagée est la **correction d'erreurs quantiques** : utiliser de nombreux qubits physiques imparfaits pour construire un plus petit nombre de qubits dits *logiques*, suffisamment fiables pour effectuer de longs calculs.

Mais cela augmente énormément le matériel nécessaire.

C'est pourquoi les petits ordinateurs quantiques expérimentaux d'aujourd'hui ne peuvent pas simplement recevoir une clé RSA-2048 et la casser quelques secondes plus tard.

Le NIST parle d'ailleurs d'un **CRQC**, *cryptographically relevant quantum computer* : un ordinateur quantique suffisamment puissant pour attaquer réellement les systèmes cryptographiques actuellement utilisés. Le moment où une telle machine existera reste inconnu. 

## Et ce n'est pas seulement RSA

RSA est une excellente manière de comprendre le problème, mais Shor menace également une autre famille fondamentale de la cryptographie moderne : les **courbes elliptiques**.

On les retrouve notamment dans des systèmes de signatures et d'échange de clés.

Le problème mathématique est différent de la factorisation, mais Shor sait également résoudre efficacement le **problème du logarithme discret** sur lequel reposent ces mécanismes.

C'est une distinction importante.

Quand on dit que « le quantique va casser le chiffrement actuel », on simplifie énormément.

Toutes les cryptographies ne sont pas touchées de la même façon.

Les algorithmes à clé publique comme RSA et ECC sont particulièrement concernés.

Les algorithmes symétriques, comme AES, ne sont pas détruits par Shor de cette manière. D'autres algorithmes quantiques, notamment celui de Grover, peuvent réduire leur marge de sécurité, mais augmenter la taille des clés permet de compenser beaucoup plus facilement le problème.

Le futur ne consiste donc pas à abandonner toute cryptographie.

Il consiste à **remplacer certaines fondations mathématiques**.

## Les remplaçants existent déjà

En 2024, le NIST a finalisé ses trois premiers standards majeurs de cryptographie post-quantique :

- **ML-KEM**, destiné à établir des secrets partagés ;
- **ML-DSA**, destiné aux signatures numériques ;
- **SLH-DSA**, une autre famille de signatures reposant sur des fonctions de hachage.

Contrairement à RSA, leurs fondations mathématiques sont choisies pour résister aux attaques quantiques connues.

Le NIST recommande désormais explicitement de commencer la migration plutôt que d'attendre l'arrivée hypothétique d'une machine dangereuse. 

Chrome a même déjà déployé un échange de clés hybride post-quantique pour certaines connexions TLS compatibles. Et Chromium prépare maintenant la partie beaucoup plus complexe : rendre également **l'authentification des certificats HTTPS** résistante au quantique. 

Voilà pourquoi cette transition commence des années avant l'apparition supposée de la menace.

Une infrastructure cryptographique mondiale ne se remplace pas en appuyant sur un bouton.

Il faut modifier des navigateurs, serveurs, bibliothèques, systèmes d'exploitation, appareils embarqués, autorités de certification, protocoles et logiciels parfois destinés à rester actifs pendant des décennies.

L'ordinateur capable de casser RSA-2048 n'existe peut-être pas encore.

**L'algorithme qui explique comment il pourrait le faire, lui, existe depuis 1994.**

C'est cette différence qui oblige Internet à préparer sa défense maintenant.

