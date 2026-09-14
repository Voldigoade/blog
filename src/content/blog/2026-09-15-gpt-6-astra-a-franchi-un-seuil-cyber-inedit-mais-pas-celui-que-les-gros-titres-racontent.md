---
title: GPT-6 Astra a franchi un seuil cyber inédit mais pas celui que les gros
  titres racontent
description: "OpenAI vient de classer GPT-6 Astra au niveau « Critique » en
  cybersécurité. Derrière ce terme spectaculaire se cache un changement beaucoup
  plus concret : l’IA commence à passer d’assistant de sécurité à véritable
  chercheur autonome de vulnérabilités."
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: article
tags:
  - intelligence artificielle
  - cybersécurité
  - GPT-6 Astra
  - OpenAI
  - Zero-Day
  - sécurité informatique
  - agents IA
coverImage: /blog/images/posts/6135a580-bb11-43a5-b9ef-6b292bf80d6c.png
coverAlt: Un système d’intelligence artificielle analyse de manière autonome du
  code et des systèmes informatiques à la recherche de vulnérabilités.
author: Voldigoade
---
Le 3 septembre 2026, OpenAI a utilisé un mot qu’aucun de ses modèles précédents n’avait encore reçu : **Critique**.

Pas « excellent en cybersécurité ». Pas « expert ».

Critique.

Le mot peut facilement donner l’impression qu’un chatbot vient soudainement d’acquérir le pouvoir de pirater n’importe quoi sur Internet. Ce n’est pas ce que montrent les données.

Mais ce que montrent les données est peut-être plus intéressant.

Pour la première fois, nous commençons à voir une IA capable de mener pendant des heures une véritable recherche de vulnérabilités, d’explorer seule plusieurs pistes, de découvrir des failles inconnues et d’enchaîner certaines d’entre elles jusqu’à obtenir un exploit fonctionnel.

C’est un changement de nature.

## Ce que « Critique » signifie réellement

Le terme vient du **Preparedness Framework d’OpenAI**. Il ne s’agit donc ni d'une certification gouvernementale ni d'un niveau universellement reconnu par l'industrie.

Dans ce cadre, un modèle atteint le niveau cyber Critique s’il devient notamment capable de découvrir et développer de manière autonome des exploits zero-day fonctionnels contre de nombreux systèmes réels fortement sécurisés, ou de construire des stratégies d’attaque inédites de bout en bout à partir d’un objectif général.

Un **zero-day**, ici, est une vulnérabilité inconnue de ceux qui doivent normalement la corriger. L’attaquant potentiel dispose donc d’une faille pour laquelle aucun correctif public n’existe encore.

C’est précisément pour cette raison qu’un détail du rapport d’Astra mérite beaucoup plus d’attention que ses résultats aux benchmarks classiques.

L’IA a réellement trouvé des failles qui n’étaient pas connues auparavant.

## On lui a donné un navigateur. Puis on l’a laissée chercher

OpenAI a placé Astra face à des logiciels largement déployés dans un environnement de laboratoire, notamment un navigateur et un noyau de système d’exploitation.

Le modèle recevait le code source, les builds du logiciel, des outils classiques de recherche de vulnérabilités et un objectif. Les chercheurs humains pouvaient surveiller l’expérience, mais pas lui souffler les pistes à explorer.

Astra disposait en revanche de ressources considérables : raisonnement Ultra, accès Web et jusqu’à **64 sous-agents**. Il ne faut donc surtout pas imaginer un simple onglet ChatGPT lancé cinq minutes sur un PC portable.

Sur le navigateur, Astra a découvert plusieurs vulnérabilités jusque-là inconnues et construit une chaîne d’exploitation permettant d’obtenir de l’exécution de code hors sandbox.

La première version a nécessité environ **29 heures** de recherche. Les chercheurs ont ensuite constaté que la configuration utilisée manquait de certaines protections présentes dans la version de production. Astra a alors repris le travail et adapté son exploit à la version stable officielle en environ **12 heures supplémentaires**.

Sur le noyau du système d’exploitation, le modèle a également découvert plusieurs nouvelles vulnérabilités et produit un exploit d’élévation de privilèges locale en moins de douze heures.

C’est cette partie qui change réellement la discussion.

Une IA qui connaît les techniques de sécurité existe depuis longtemps.

Une IA qui peut poursuivre seule une enquête technique pendant des dizaines d’heures jusqu’à produire une découverte que les humains responsables du logiciel ne connaissaient pas encore est autre chose.

## Les benchmarks racontent la même histoire avec une grosse nuance

Les chiffres sont impressionnants.

Sur **Sandbox Bench**, une évaluation interne composée de 22 cibles vulnérables, Astra en a compromis 10. GPT-5.6 Sol n’en avait réussi qu’une.

Sur **SRE-Bench**, consacré au reverse engineering de binaires sans code source, Astra atteint **99,2%** en pass@4 contre 68,7 % pour Sol, tout en utilisant environ quatre fois moins de tokens de sortie.

Même le spectaculaire score parfait obtenu sur ExploitBench doit cependant être lu avec prudence : OpenAI reconnaît lui-même que certaines vulnérabilités historiques pourraient avoir contaminé les données d’entraînement du modèle. Un benchmark de sécurité devient beaucoup moins convaincant si le modèle peut simplement reconnaître un exploit rencontré pendant son entraînement.

C’est précisément pourquoi les résultats les plus intéressants sont ceux portant sur des vulnérabilités récentes ou inconnues.

Et pourquoi une évaluation extérieure est particulièrement utile.

## Un laboratoire indépendant a essayé de le pousser beaucoup plus loin

La société de recherche en sécurité Irregular a également testé Astra.

Sur son benchmark **FrontierCyber**, qui utilise de vrais logiciels et matériels, Astra a réussi **86 défis sur 226**.

GPT-5.6 Sol : **34 sur 226**.

Sur CyScenarioBench, qui teste des opérations offensives plus longues, Astra a réussi au moins une fois 9 scénarios sur 10, avec un taux de réussite moyen de 59 %.

Mais voici le chiffre qui empêche de transformer cette histoire en fantasme :

**aucun des deux modèles n’a réussi les sept défis classés Elite.**

Irregular n’a pas non plus observé Astra compromettre avec succès les cibles totalement durcies de son évaluation.

Voilà probablement la meilleure description de l’état actuel de la technologie.

Astra n’est pas une clé universelle capable d’ouvrir n’importe quel système.

Il est devenu suffisamment bon pour automatiser une partie du travail qui demandait auparavant un spécialiste très compétent.

La frontière se déplace.

## Le véritable changement est l’autonomie

On mesure encore beaucoup les modèles avec des questions : combien de problèmes résolus, combien de réponses correctes, combien de lignes de code générées.

Ces mesures commencent à devenir insuffisantes.

Pour la cybersécurité, la métrique importante pourrait bientôt devenir beaucoup plus concrète :

**combien d’heures et combien d’argent faut-il à une machine pour découvrir une nouvelle vulnérabilité exploitable ?**

Un chercheur humain peut passer plusieurs jours ou semaines sur une cible avant de trouver quelque chose.

Un agent logiciel peut lancer plusieurs pistes simultanément, abandonner celles qui échouent, générer ses propres outils, lire des milliers de lignes de code et recommencer toute la nuit.

Il ne doit pas nécessairement devenir meilleur que le meilleur chercheur du monde.

Il suffit que son coût et son temps de recherche continuent de diminuer.

C’est là que l’échelle devient dangereusement intéressante.

Une vulnérabilité découverte par un humain est une vulnérabilité.

Mille agents cherchant en parallèle dans mille projets différents transforment la recherche de vulnérabilités en processus industriel.

## Et c’est aussi probablement la meilleure arme des défenseurs

Le paradoxe est évident : exactement la même capacité permet de chercher une faille avant qu’un attaquant ne la trouve.

Cloudflare a déjà annoncé en septembre un service utilisant les modèles cyber d’OpenAI pour examiner des bases de code autorisées, valider des vulnérabilités et aider à appliquer des protections. OpenAI finance également des programmes où ces modèles sont utilisés pour examiner et corriger des logiciels open source.

La cybersécurité a toujours fonctionné ainsi : les outils offensifs et défensifs partagent une grande partie de leurs compétences.

Le problème est désormais la vitesse.

Nous avons passé des années à nous demander quand une IA serait capable de programmer correctement.

La question suivante pourrait être beaucoup plus concrète :

**que se passe-t-il lorsque chaque logiciel publié sur Internet peut être inspecté en permanence par des milliers de chercheurs de vulnérabilités qui ne dorment jamais ?**

Astra ne donne pas encore la réponse.

Mais pour la première fois, cette question ne ressemble plus vraiment à de la science-fiction.