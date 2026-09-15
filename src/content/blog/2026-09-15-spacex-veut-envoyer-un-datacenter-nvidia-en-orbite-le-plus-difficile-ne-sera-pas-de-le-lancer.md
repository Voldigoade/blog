---
title: SpaceX veut envoyer un datacenter NVIDIA en orbite. Le plus difficile ne
  sera pas de le lancer
description: "SpaceX veut adapter les systèmes Vera Rubin de NVIDIA à des
  satellites de calcul consommant des centaines de kilowatts. Derrière le rêve
  du datacenter spatial se cache un problème beaucoup moins spectaculaire :
  évacuer chaque watt de chaleur dans le vide."
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: research
tags:
  - SpaceX
  - NVIDIA
  - intelligence artificielle
  - datacenter
  - Starmind
  - spatial
  - Vera Rubin
  - calcul haute performance
coverImage: /images/posts/d75c5e3b-d108-4d03-9c50-45b2c28ec6cc.png
coverAlt: " Un satellite de calcul Starmind doté de grandes surfaces solaires et
  de radiateurs thermiques transporte des systèmes d’intelligence artificielle
  en orbite."
author: Voldigoade
---
Elon Musk affirme être « très confiant » que SpaceX lancera des ordinateurs NVIDIA Vera Rubin NVL72 dans l’espace dès **2027**. 

Cette phrase ressemble encore à une de ces annonces qu’on peut ranger dans la catégorie « Elon Musk promet quelque chose pour l’année prochaine ».

Sauf que cette fois, derrière le tweet, il existe déjà une architecture.

NVIDIA confirme officiellement travailler avec SpaceXAI sur **Starmind**, une génération de satellites destinée au calcul d’intelligence artificielle et basée sur une adaptation spatiale de la plateforme Vera Rubin NVL72. 

SpaceX publie même les dimensions de son premier concept AI1 : **30 mètres de haut une fois déployé, 75 mètres d’envergure, jusqu’à 250 kW de calcul en pointe et 175 kW en moyenne**. 

Ce ne serait plus un satellite embarquant quelques accélérateurs.

Ce serait un morceau de datacenter envoyé en orbite.

Et contrairement à ce que pourrait laisser croire le vide glacial qui l’entoure, **le problème le plus difficile n’est peut-être pas d’y envoyer les GPU**.

C’est d’empêcher ces GPU de cuire.

## SpaceX ne cache plus vraiment son ambition

Le projet Starmind repose sur trois ressources que SpaceX pense pouvoir combiner mieux que n’importe quel opérateur terrestre :

le Soleil pour l’électricité ;

Starship pour déplacer énormément de masse ;

Starlink et ses liaisons laser pour transporter les données.

SpaceX présente les orbites héliosynchrones comme un moyen d’obtenir une exposition solaire extrêmement importante, tout en évitant les contraintes terrestres de raccordement au réseau, d’achat de terrains et de construction de centrales électriques. 

Les résultats du calcul seraient ensuite renvoyés à travers des liaisons optiques intersatellites et l’infrastructure Starlink.

Sur le papier, c’est une idée presque irrésistible :

pourquoi construire toujours davantage de centrales et de datacenters sur Terre alors qu’une gigantesque centrale nucléaire naturelle de **3,8 × 10²⁶ watts** brille déjà au-dessus de nous ?

Le problème est ce qui arrive à cette énergie après son utilisation.

## Presque toute l’électricité finit en chaleur

Un processeur ne détruit pas l’énergie qu’il consomme.

Les centaines de kilowatts entrant dans un satellite de calcul finissent presque intégralement sous forme thermique.

Sur Terre, un datacenter peut transférer cette chaleur à de l’air, de l’eau ou des fluides circulant vers des tours de refroidissement.

Dans le vide spatial, aucune masse d’air ne vient toucher le radiateur.

Il n’existe donc **aucune convection avec l’environnement**.

Pour rejeter durablement la chaleur, il faut principalement la transformer en rayonnement infrarouge et l’émettre vers l’espace.

Cela semble subtil.

C’est en réalité déterminant.

## J’ai calculé l’ordre de grandeur pour AI1

On peut obtenir une approximation simple à partir de la loi de Stefan-Boltzmann :

```
P = εσAT⁴

```

où `P` représente la puissance thermique à évacuer, `A` la surface radiative, `T` sa température absolue, `ε` son émissivité et `σ` la constante de Stefan-Boltzmann.

Prenons les **175 kW de charge moyenne annoncés par SpaceX**, un radiateur idéal avec une émissivité de 0,9 et une température d’environ 300 K soit 27 °C.

Il faudrait approximativement :

**423 m² de surface radiative effective.**

Pour les **250 kW de pointe** :

**environ 605 m².**

En acceptant de faire fonctionner le radiateur à 350 K, soit environ 77 °C, l’équation devient plus favorable :

- ~229 m² pour 175 kW ;  

- ~326 m² pour 250 kW.  


Ce calcul est volontairement idéalisé. Il ne tient notamment pas compte de l’énergie reçue du Soleil et de la Terre, de la géométrie réelle des radiateurs, du transport de chaleur depuis les processeurs, des pompes, de la redondance ou de l’orientation.

Il donne néanmoins le bon ordre de grandeur.

Une analyse indépendante publiée par BCG en août estime justement qu’un satellite de seulement **100 kW** pourrait demander environ **400 m² de radiateurs** avec les technologies considérées actuellement. 

Le problème n’est donc absolument pas théorique.

## SpaceX le reconnaissait elle-même avant de parler de « refroidissement supérieur »

La page marketing actuelle de Starmind présente le vide comme permettant une dissipation thermique efficace sans les chillers et tours de refroidissement terrestres. 

Mais les propres documents réglementaires de SpaceX offrent une formulation beaucoup moins confortable.

Dans son dossier déposé auprès de la SEC, l’entreprise explique que les satellites de calcul IA auront besoin de panneaux solaires significativement plus grands **et de radiateurs « substantially larger » pour la gestion thermique**. 

Les deux affirmations ne sont pas nécessairement contradictoires.

Le refroidissement radiatif ne consomme pas l’électricité d’un immense système de climatisation.

Mais économiser de l’énergie ne signifie pas économiser **surface, masse et complexité**.

C’est précisément l’un des endroits où le slogan « l’espace est froid » détruit plus de compréhension qu’il n’en apporte.

## Et les premiers GPU d’IA sont déjà là-haut

SpaceX ne sera même pas la première entreprise à placer un GPU moderne destiné à l’IA en orbite.

En novembre 2025, la startup Starcloud a lancé **Starcloud-1**, emportant un NVIDIA H100.

Le mois suivant, le satellite a exécuté une version de Gemini et entraîné nanoGPT, un petit modèle de langage développé à partir du travail d’Andrej Karpathy. 

Cela ne transforme évidemment pas Starcloud-1 en hyperscaler orbital.

Mais cela change la question.

La faisabilité fondamentale de faire fonctionner du calcul accéléré moderne dans l’espace commence à sortir du domaine purement théorique.

L’enjeu de SpaceX est désormais **le passage de l’expérience à l’industrie**.

## Google travaille déjà sur une approche différente

Google développe de son côté **Project Suncatcher**.

Le concept consiste à équiper des satellites de TPU et à les relier par des communications optiques suffisamment rapides pour construire progressivement une infrastructure de calcul distribuée.

Google a déjà effectué des essais de résistance aux radiations sur ses TPU et prévoit, avec Planet, deux satellites prototypes au début de **2027**. 

Nous ne regardons donc plus une lubie isolée d’Elon Musk.

Plusieurs acteurs commencent sérieusement à explorer le calcul orbital.

La question devient : **quels calculs ont réellement intérêt à quitter la Terre ?**

## Le pire candidat pourrait être celui auquel tout le monde pense

L’image intuitive est celle d’un gigantesque modèle frontier entraîné dans une constellation de satellites.

C’est justement l’application la plus difficile.

L’entraînement distribué de modèles géants dépend d’échanges extrêmement rapides et fréquents entre accélérateurs. Les clusters terrestres consacrent une quantité gigantesque d’ingénierie à maintenir des GPU très proches les uns des autres sur des interconnexions à très haute bande passante.

Sépare ces accélérateurs entre de nombreux satellites et le réseau devient une partie du problème informatique lui-même.

Une analyse publiée en juillet sur les coûts et limites réseau du calcul IA spatial conclut que **l’inférence en orbite peut devenir réaliste**, tandis que l’entraînement de modèles frontier paraît beaucoup moins compétitif face aux datacenters terrestres à cause de la topologie réseau.

BCG arrive à une conclusion similaire : les installations orbitales peuvent avoir du sens pour certains workloads, mais elles ne remplaceront probablement pas les datacenters terrestres. 

## Les premiers workloads utiles pourraient être beaucoup moins glamour

Imagine un satellite d’observation générant des téraoctets d’imagerie.

Aujourd’hui, une partie considérable de ces données doit être envoyée au sol avant analyse.

Mais si le satellite dispose localement d’un modèle capable de filtrer :

- les nuages ;  

- les images inutiles ;  

- les départs de feu ;  

- les navires ;  

- les changements géographiques ;  

- les anomalies ;  


il peut envoyer uniquement l’information utile.

Le calcul voyage alors jusqu’aux données au lieu de transporter toutes les données jusqu’au calcul.

Même logique pour certaines applications souveraines, certaines tâches d’inférence tolérant la latence ou des données produites directement dans l’espace.

Ces marchés sont beaucoup moins spectaculaires que « entraîner GPT-8 autour de la Terre ».

Ils sont probablement plus crédibles.

## Le calendrier lui-même mérite de rester sous surveillance

Il existe enfin une petite contradiction chronologique.

Dans son prospectus déposé en 2026 auprès de la SEC, SpaceX écrivait s’attendre à commencer le déploiement de satellites de calcul IA **« as early as 2028 »**. 

Aujourd’hui, Musk dit être « highly confident » que des systèmes NVIDIA seront envoyés en **2027**, et la page Starmind évoque une production de milliers de satellites pouvant commencer dès la fin de 2027. 

Le programme semble donc avoir accéléré.

Cela ne transforme pas une date annoncée en date garantie.

Avec SpaceX plus qu’ailleurs, la différence entre objectif d’ingénierie et calendrier réellement tenu mérite d’être conservée.

## Les datacenters spatiaux n’ont pas besoin de remplacer ceux de la Terre pour réussir

BCG estime aujourd’hui que le calcul spatial conserve un **surcoût important** par rapport à l’infrastructure terrestre et que même des améliorations agressives de coûts de lancement, de masse et de fiabilité pourraient seulement réduire cet écart. 

C’est probablement la meilleure manière d’observer Starmind.

La question n’est pas :

> « Tous les datacenters vont-ils partir dans l’espace ? »

Elle est :

> **« Existe-t-il suffisamment de calculs pour lesquels l’énergie, la position, les données ou les contraintes terrestres justifient de payer plus cher pour être en orbite ? »**

Si la réponse est oui, un nouveau niveau d’infrastructure informatique peut apparaître sans jamais remplacer celui que nous utilisons au sol.

SpaceX maîtrise déjà deux ingrédients particulièrement rares : la fabrication industrielle de satellites et leur transport vers l’orbite.

NVIDIA apporte le troisième : le calcul.

Il reste maintenant le problème que ni les fusées ni les benchmarks ne peuvent faire disparaître.

**Chaque watt utilisé par l’intelligence artificielle doit toujours finir quelque part.**

Même dans l’espace.