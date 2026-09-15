---
title: "Nvidia, Palantir, Booz Allen : pourquoi les champions de l’IA limitent
  ce qu’ils confient aux modèles externes"
description: Les meilleurs modèles promettent d’immenses gains de productivité,
  mais leurs API, journaux et outils créent de nouvelles frontières de
  confiance. En 2026, le meilleur compromis entre puissance et confidentialité
  n’est ni le tout-cloud ni le tout-local.
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: article
tags:
  - confidentialité IA
  - Zero Data Retention
  - Nvidia
  - Palantir
  - Booz Allen
  - modèles locaux
  - cloud privé
  - sécurité des données
coverImage: /images/posts/911abae5-075a-4928-ba96-69a62aca2282.png
coverAlt: Des données d’entreprise restent dans une infrastructure sécurisée
  tandis qu’une connexion contrôlée permet d’utiliser un modèle d’IA hébergé à
  distance.
author: Voldigoade
news: true
seoTargetQuery: peut-on confier des données sensibles à une IA
---
Le 10 septembre 2026, Nvidia et Palantir annonçaient ensemble une infrastructure d’« IA souveraine » destinée notamment à la chaîne logistique de Nvidia. Le principe mis en avant était presque paradoxal pour deux entreprises au cœur de la révolution actuelle : utiliser l’IA massivement, tout en conservant le contrôle sur les données propriétaires et sur l’environnement dans lequel les modèles fonctionnent.

Quatre jours plus tard, le paradoxe devenait beaucoup plus explicite.

Selon une enquête de *The Information* relayée par Reuters, Palantir aurait demandé à Anthropic des garanties **irrévocables de Zero Data Retention** avant de mettre certains de ses modèles à disposition dans ses logiciels. Nvidia limiterait l’utilisation des modèles d’Anthropic aux tâches les moins sensibles et utiliserait davantage ses propres Nemotron pour ses travaux internes. Booz Allen Hamilton aurait, de son côté, interdit l’utilisation du service commercial d’Anthropic pour certains travaux propriétaires de cybersécurité.

Ce ne sont pourtant pas des entreprises hostiles à l’IA externe. Booz Allen a encore annoncé en juin un partenariat avec OpenAI pour déployer des systèmes avancés auprès d’agences publiques et d’infrastructures critiques.

Le problème est donc plus intéressant qu'un simple « les entreprises ont peur du cloud ».

**Les organisations qui comprennent probablement le mieux ce que l’IA peut leur apporter sont aussi parmi celles qui savent le mieux ce qu’elles risquent de perdre en lui donnant trop de contexte.**

Et ce risque est souvent mal compris.

## Le problème n’est plus vraiment « mon code va entraîner le prochain GPT »

C’est la crainte intuitive : on envoie un prototype confidentiel à un modèle, l’entreprise qui exploite celui-ci l’ajoute à son jeu d’entraînement et le secret finit un jour par ressortir chez un autre utilisateur.

Pour les offres professionnelles sérieuses, ce scénario n’est généralement plus le comportement par défaut.

OpenAI indique que les données envoyées à son API ne servent pas à entraîner ou améliorer ses modèles sauf choix explicite du client. Anthropic affirme également que les données conservées dans ses offres commerciales ne sont pas utilisées pour l’entraînement sans autorisation expresse. Palantir affirme de son côté obtenir des garanties techniques et contractuelles empêchant les fournisseurs de modèles accessibles via AIP de conserver les prompts, les réponses ou de les utiliser pour réentraîner leurs modèles.

Ce serait donc une erreur de résumer le problème à l'entraînement.

Le vrai sujet est : **combien de copies temporaires ou permanentes de ton secret peuvent exister pendant que le service fonctionne ?**

Un prompt envoyé à un modèle peut traverser plusieurs couches : application, proxy, API gateway, système anti-abus, cache, service d’inférence, stockage de conversation, outils, moteur RAG, système de traces et parfois services tiers.

Aucune de ces couches n’a besoin d’entraîner un modèle pour devenir une nouvelle surface de fuite.

## « Nous n’entraînons pas sur vos données » n’est pas la même chose que « nous ne gardons rien »

OpenAI constitue un bon exemple.

Par défaut, ses API produisent des journaux destinés notamment à la détection des abus, susceptibles de contenir prompts, réponses et métadonnées. Leur durée de conservation peut atteindre 30 jours.

Les clients éligibles peuvent demander le **Zero Data Retention**, ou ZDR. Dans cette configuration, le contenu client est exclu de ces journaux et certaines API sont forcées à fonctionner sans persistance.

Mais ZDR n’est pas un bouton magique appliqué uniformément à toute la plateforme.

Les conversations persistantes, agents, fichiers, vector stores et différentes fonctions stateful possèdent leurs propres règles. Certaines ne sont tout simplement pas éligibles au ZDR. Des données envoyées à un serveur MCP distant relèvent par ailleurs de la politique de ce serveur, et non plus seulement de celle d’OpenAI.

Anthropic présente une distinction comparable.

Dans un accord ZDR, l’entreprise indique ne pas conserver les prompts et réponses **au repos après le retour de la réponse**. Mais les interfaces Claude Teams et Enterprise ordinaires ne sont pas équivalentes à une API ZDR, certains agents sont stateful, certaines fonctionnalités conservent des données et, depuis juin 2026, plusieurs de ses modèles avancés dits « Covered Models » imposent une conservation de 30 jours sauf accord spécifique.

Cette modification aide à comprendre la réaction rapportée de Palantir.

Une entreprise peut parfaitement faire confiance aux engagements d’un fournisseur aujourd’hui tout en refusant une architecture dans laquelle ce fournisseur conserve le droit technique ou contractuel de modifier demain la durée de rétention d’un nouveau modèle.

Pour du code ordinaire, trente jours peuvent sembler insignifiants.

Pour une vulnérabilité inconnue, une architecture militaire, le masque d’une puce encore secrète ou la conception d’un produit qui ne sortira que dans deux ans, **30 jours représentent 30 jours de trop**.

## Ce que Zero Data Retention signifie réellement

Le terme est presque trompeur lorsqu’on le lit littéralement.

ZDR ne veut généralement pas dire qu’aucun octet correspondant au prompt n’existe jamais sur les machines du fournisseur. Sans traiter les données, le modèle ne pourrait évidemment pas produire de réponse.

La distinction importante est celle entre **traitement transitoire** et **stockage persistant**.

Un fournisseur peut recevoir une requête en mémoire vive, la traiter sur GPU puis effacer cet état lorsque l’opération est terminée, sans écrire durablement le prompt dans une base ou un journal.

Google, par exemple, documente certains mécanismes de cache mémoire dans son infrastructure Gemini : les données peuvent rester temporairement en mémoire pour accélérer les requêtes sans être considérées comme stockées « at rest ». Google explique également que certaines fonctions rendent impossible un véritable ZDR : persistance d'une conversation, grounding via certains services ou fonctions nécessitant elles-mêmes une conservation.

Le mot important n’est donc pas « zéro ».

C’est **rétention**.

Et même là, la question suivante reste : *rétention par qui ?*

## Passer par AWS ou Azure peut complètement changer la frontière de confiance

Appeler directement un modèle via l’API de son créateur et utiliser ce même modèle à travers un hyperscaler peuvent constituer deux architectures de sécurité très différentes.

Amazon explique par exemple que les fournisseurs de modèles disponibles via Bedrock n’ont pas accès aux comptes utilisés par AWS pour leur déploiement, ni aux logs Bedrock, prompts ou réponses des clients. Le modèle est fourni à Amazon, puis exécuté dans une infrastructure contrôlée par AWS.

Cela ne signifie toujours pas « aucune conservation ».

Pour certains modèles Anthropic imposant actuellement une revue particulière, AWS indique pouvoir conserver prompts et réponses jusqu’à 30 jours **dans son propre périmètre**, sans les transmettre à Anthropic.

Microsoft adopte une logique similaire dans Foundry. Microsoft affirme que les prompts et réponses des modèles vendus par Azure ne sont pas accessibles à OpenAI ou aux autres créateurs de ces modèles et ne servent pas à entraîner leurs fondations. Dans la configuration standard, certains contenus signalés peuvent cependant être conservés pour une revue anti-abus par des employés Microsoft ; un régime de surveillance modifiée peut supprimer cette étape pour les organisations approuvées.

Le choix n’est donc plus simplement :

**« Est-ce que je fais confiance à OpenAI ou Anthropic ? »**

Il devient :

**« À quelles organisations, machines, journaux et administrateurs suis-je disposé à exposer cette catégorie précise d’informations ? »**

## Le « cloud privé » n’est pas forcément privé au sens où on l’imagine

Une autre confusion fréquente concerne les VPC, Private Link et private endpoints.

Azure permet par exemple de désactiver l’accès réseau public à Microsoft Foundry et d’utiliser des endpoints privés. Les communications peuvent alors circuler à l’intérieur d’un réseau virtuel contrôlé par l’entreprise et sur l’infrastructure réseau de Microsoft, sans exposer directement le service sur Internet.

AWS propose une architecture équivalente avec PrivateLink pour Bedrock, qui permet d'appeler le service depuis un VPC sans passer par une passerelle Internet ou une adresse IP publique.

C’est extrêmement utile.

Mais **réseau privé ne veut pas dire calcul privé**.

PrivateLink protège avant tout le chemin entre ton infrastructure et le service. Il réduit certaines possibilités d’interception, d’exfiltration accidentelle ou d’exposition réseau.

Le calcul continue néanmoins à s’effectuer chez AWS, Azure ou Google.

Ce n’est donc pas une alternative au ZDR, aux conditions contractuelles ou au contrôle des données : c’est une couche supplémentaire.

## Avec les agents, le fournisseur du modèle n’est même plus forcément le maillon le plus dangereux

Les chatbots classiques recevaient essentiellement un texte et renvoyaient un texte.

Les agents modernes peuvent lire un dépôt Git, ouvrir une base de données, exécuter du code, appeler une API, récupérer un document, utiliser un serveur MCP ou naviguer sur le Web.

La frontière de données devient donc beaucoup plus vaste.

Même si le fournisseur du modèle respecte parfaitement son ZDR, un agent peut envoyer une information vers un outil externe qui, lui, la conserve.

OpenAI prévient explicitement que les informations envoyées à des serveurs MCP distants relèvent de la politique de ces services. Anthropic exclut de manière comparable les intégrations tierces de sa couverture ZDR.

La fuite peut également être provoquée par une **prompt injection indirecte** : un agent lit un document ou une page contrôlée par un attaquant, interprète son contenu comme une instruction et utilise ensuite les permissions qui lui ont été accordées pour révéler des informations.

Le problème n’est donc plus simplement la confidentialité du modèle.

C’est celle de **l’ensemble du graphe d’outils** autour du modèle.

L’équipe de red team de Nvidia recommande justement de ne pas confier cette sécurité aux seules instructions du LLM : contrôle d’accès, sandboxing, filtrage réseau sortant et gestion externe des secrets doivent être imposés par des mécanismes déterministes que le modèle ne peut pas contourner lui-même.

## Les modèles locaux semblent résoudre le problème. Jusqu’à ce qu’on regarde qui doit maintenant tout sécuriser

La réponse la plus radicale paraît évidente :

Télécharger le modèle. Débrancher Internet. Garder les données chez soi.

Dans une architecture réellement air-gapped, c’est effectivement la manière la plus directe d’éliminer le fournisseur de modèle de la chaîne de traitement.

Nvidia documente explicitement des déploiements NIM dans des environnements air-gapped, et Palantir/Nvidia présentent leurs modèles Nemotron ouverts comme une manière de conserver modèles, données et entraînement dans une infrastructure contrôlée par le client.

Le compromis en capacités est par ailleurs devenu moins évident qu’il ne l’était encore récemment. En juillet, le NIST a par exemple évalué l’open-weight GLM-5.2 comme étant globalement comparable à GPT-5.2 sur son ensemble d’évaluations. Cela ne signifie évidemment pas qu’un modèle ouvert égale les meilleurs modèles fermés dans tous les domaines, mais l’écart n’est plus systématiquement celui d’un « petit modèle local » face à une intelligence inaccessible.

En revanche, le risque ne disparaît pas.

Il change de propriétaire.

Il faut désormais sécuriser les poids, les images de conteneur, le serveur d’inférence, les pilotes GPU, les dépendances, les accès administrateur, les sauvegardes, la télémétrie, les agents et la chaîne logicielle entière.

Une entreprise incapable de maintenir correctement cette infrastructure peut parfaitement obtenir **moins de sécurité en auto-hébergeant** qu’en utilisant Azure, AWS ou Google correctement configuré.

C’est l’un des contre-arguments les plus importants au réflexe « local = sécurisé ».

## Une troisième voie commence à devenir beaucoup plus intéressante : le calcul confidentiel

Il existe une architecture qui cherche précisément à résoudre le conflit entre l’entreprise qui veut protéger ses données et le laboratoire qui veut protéger son modèle propriétaire.

Nvidia documente désormais une architecture de **Confidential Computing** dans laquelle un modèle fermé peut être envoyé chiffré sur une infrastructure contrôlée par le client.

L’exécution se déroule à l’intérieur d’un environnement matériel attesté. Les clés permettant de déchiffrer le modèle ne sont fournies qu’après vérification de l’intégrité de l’environnement. Le fournisseur conserve donc ses poids secrets, tandis que le propriétaire des données garde ses entrées et sorties dans son propre périmètre ; Nvidia indique que le fournisseur du modèle ne les voit pas.

Conceptuellement, c’est presque l’architecture idéale :

le modèle peut rester propriétaire sans obliger l’entreprise à envoyer ses secrets au propriétaire du modèle.

Elle reste toutefois plus coûteuse et nettement moins banale qu’un simple appel API.

## Alors quelle architecture protège le mieux les secrets sans sacrifier les meilleurs modèles ?

Il n’existe pas une seule bonne réponse parce que toutes les données d’une entreprise ne valent pas la même chose.


| Architecture | Puissance accessible | Contrôle des données | Principal compromis |
| ------------------------------- | ------------------------ | -------------------- | -------------------------------------------------------------- |
| Chatbot SaaS standard | Très élevée | Faible à moyen | Produit stateful, règles de rétention propres à l’interface |
| API d’un modèle frontier | Très élevée | Bon | Le fournisseur reste dans la frontière de confiance |
| API frontier avec ZDR | Très élevée | Très bon | Fonctionnalités parfois incompatibles ou soumises à exceptions |
| AWS/Azure/Google + réseau privé | Très élevée | Très bon | Le cloud reste opérateur du traitement |
| Modèle open-weight auto-hébergé | Variable à élevée | Excellent | Coût matériel, maintenance et sécurité à votre charge |
| Air gap | Variable à élevée | Maximal | Forte perte de souplesse et d’intégrations |
| Confidential Computing | Potentiellement frontier | Excellent | Disponibilité, coût et complexité |


Pour la majorité des entreprises, **le meilleur compromis en 2026 est probablement de ne pas choisir une seule de ces architectures**.

La meilleure architecture est hybride.

Un gateway interne connaît la classification des données et décide quel modèle peut les recevoir. Les informations ordinaires peuvent partir vers le meilleur modèle frontier disponible. Les données confidentielles utilisent un fournisseur approuvé avec ZDR, réseau privé, IAM strict et absence de fonctions persistantes inutiles. Les secrets les plus critiques restent sur un modèle auto-hébergé, air-gapped ou dans un environnement de calcul confidentiel.

Un système RAG ne transmet au modèle que les fragments nécessaires plutôt qu’un dépôt ou une base entière. Les clés API et mots de passe sont retirés avant inférence. Les agents disposent d’autorisations minimales et leurs communications sortantes sont filtrées. Les traces techniques enregistrent l’identité du modèle, le coût et les décisions de sécurité sans recopier systématiquement le contenu confidentiel.

Cette architecture est moins spectaculaire qu’un gigantesque modèle « privé ».

Elle est aussi beaucoup plus réaliste.

## Ce que Nvidia et Palantir sont peut-être en train de montrer

Le développement le plus révélateur de ces derniers jours n’est finalement pas que Nvidia utiliserait certains modèles externes avec prudence.

C’est qu’au même moment, Nvidia et Palantir déploient **leurs propres modèles ouverts et personnalisables sur les données internes de Nvidia**, en insistant publiquement sur la conservation du contrôle et de la propriété des informations utilisées.

Cela ressemble moins à une crise de confiance envers l’IA qu’à la naissance d’une nouvelle séparation architecturale.

Pendant quelques années, la compétition consistait principalement à obtenir **le meilleur modèle**.

Dans les entreprises possédant beaucoup de propriété intellectuelle, une seconde compétition devient maintenant tout aussi importante :

**obtenir le meilleur modèle que l’on puisse raisonnablement laisser voir ses données.**

Et ce ne sera pas nécessairement le même.

Le futur de l’IA d’entreprise pourrait donc être beaucoup moins monolithique qu’on ne l’imaginait : des modèles frontier distants pour les problèmes difficiles, des modèles souverains pour les données stratégiques, des politiques automatiques pour router les requêtes entre eux et, tout autour, une infrastructure de sécurité devenue presque aussi importante que l’intelligence du modèle lui-même.

C’est peut-être le véritable paradoxe de l’IA professionnelle en 2026.

Plus les modèles deviennent capables de comprendre le code, la recherche, les contrats et les décisions internes d’une entreprise, **plus ce contexte devient précieux à protéger précisément parce que l’IA sait désormais en tirer quelque chose.**