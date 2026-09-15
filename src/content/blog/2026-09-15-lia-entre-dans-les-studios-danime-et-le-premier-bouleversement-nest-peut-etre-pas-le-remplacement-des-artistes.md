---
title: L’IA entre dans les studios d’anime et le premier bouleversement n’est
  peut-être pas le remplacement des artistes
description: Chez OLM Digital et d’autres acteurs japonais, l’IA ne fabrique pas
  encore des épisodes d’un clic. Elle s’attaque déjà à des tâches bien moins
  visibles recherche de plans, colorisation, contrôle, retakes, animation
  intermédiaire avec des gains parfois mesurables et un effet beaucoup plus
  profond sur l’organisation des studios.
pubDate: 2026-09-15
draft: false
featured: true
section: anime-manga
contentType: research
tags:
  - intelligence artificielle
  - production d’anime
  - OLM Digital
  - GENIAC
  - ANIMINS
  - animation intermédiaire
  - colorisation
  - AI Mage
coverAlt: Un animateur japonais contrôle sur écran plusieurs étapes d’un même
  plan d’anime, du dessin au trait à la colorisation, tandis qu’un outil d’IA
  assiste discrètement le pipeline de production.
author: Voldigoade
news: false
seoTitle: "IA et production d’anime au Japon en 2026 : ce qui change vraiment
  dans les studios"
seoDescription: "OLM Digital, GENIAC, SHIAGEDO, Mage Search, AniDepth : ce que
  l’IA automatise déjà dans les studios d’anime japonais, avec les gains mesurés
  et leurs limites. Requête cible : IA production anime Japon 2026"
---
Si l’IA devait entrer dans l’animation japonaise de la manière la plus spectaculaire possible, on s’attendrait à la voir générer des personnages, des décors et des séquences entières à partir de quelques instructions.

Ce n’est pourtant pas là que les résultats les plus convaincants apparaissent en 2026.

Chez OLM Digital, l’entreprise impliquée dans des séries comme *Pokémon* et à la tête du projet ANIMINS, les chiffres publiés dans le cadre du programme gouvernemental GENIAC concernent surtout des problèmes beaucoup moins visibles : **30 à 50 % de temps économisé sur certaines opérations de finition, plus de 60 % sur la recherche de cuts, 99 % sur la préparation d’un jeu de données destiné à cette recherche, et un taux de retake passé d’environ 40 % à 10 % dans un workflow d’assistance à la supervision**.

Aucun de ces chiffres ne signifie « 50 % des animateurs peuvent être supprimés ».

Ils racontent quelque chose de plus intéressant.

**La première transformation sérieuse de l’anime par l’IA pourrait être celle de son infrastructure de production.**

Le studio commence à devenir searchable, mesurable, partiellement automatisable. Des opérations qui dépendaient de la mémoire d’un employé, d’un regard humain parcourant des centaines de plans ou d’une succession de petites manipulations manuelles peuvent désormais être confiées à des systèmes spécialisés.

Et cela pourrait, à terme, modifier le métier d’animateur presque autant qu’un générateur d’images.

## Il faut d’abord comprendre ce que l’IA touche réellement

Un anime 2D n’est pas simplement « dessiné ».

Un **cut** à peu près l’équivalent d’un plan traverse plusieurs métiers et transformations. Les *genga*, ou dessins-clés, définissent les poses et moments importants. Les *dōga* nettoient les traits et produisent notamment les dessins intermédiaires nécessaires au mouvement. Viennent ensuite la finition et la mise en couleur, les vérifications, les corrections, la photographie/compositing et de nombreux allers-retours de supervision.

Une erreur minuscule peut remonter dans cette chaîne et provoquer un retake, c’est-à-dire un retour en correction.

C’est précisément dans ces opérations répétitives, nombreuses et très structurées que l’IA rencontre aujourd’hui son terrain le plus favorable.

Le projet **ANIMINS**, lancé fin 2024 dans le cadre de GENIAC par OLM Digital, ne devait d’ailleurs pas démontrer qu’un modèle pouvait produire seul un anime. Son objectif officiel était de déterminer comment l’IA pouvait s’insérer dans des workflows commerciaux existants comme **outil de support**. Des œuvres commerciales ont été utilisées avec autorisation pour la recherche, un court anime baptisé *LINE OUT* a servi aux essais proches de la production et 24 entreprises de l’animation ont finalement soutenu l’expérimentation.

Les technologies testées couvrent pourtant un spectre considérable : dessin-clé, animation intermédiaire, finition, colorisation, assistance au dessin de personnages, recherche dans les épisodes précédents et supervision. Les travaux ANIMINS présentés en conférence explorent aussi la génération de scènes d’anime, l’édition de cheveux par diffusion, la génération de fumée et de fluides, l’extraction de keyframes depuis une vidéo humaine ou encore plusieurs méthodes d’in-betweening.

La distinction essentielle est celle-ci : **explorer une technologie en laboratoire n’équivaut pas à l’utiliser pour produire chaque semaine un anime commercial**.

En 2026, ces deux mondes coexistent.


| Étape | Système | Ce qu’il fait réellement | Niveau de maturité | Résultat publié |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------- |
| Recherche de cuts | Mage Search | Indexe automatiquement des épisodes et retrouve des plans en langage naturel | Commercialisé | Temps de recherche réduit de plus de 60 %, préparation des données de 99 % dans l’évaluation GENIAC |
| Finition / couleur | SHIAGEDO | Apprend la coloration du cut à partir d’images déjà coloriées par l’artiste | Déployé et testé en production | 30 à 50 % de réduction du temps de finition |
| Supervision | CAS・CATool | Assiste un workflow de contrôle/correction des dessins | Utilisé sur un anime commercial | Rythme du directeur de l’animation générale ×1,2 ; retakes d’environ 40 % à 10 % |
| Contrôle de colorisation | GapFill | Repère les minuscules zones non coloriées et suggère leur couleur | Recherche avec professionnels | Environ 22 % plus rapide sur les tâches ciblées de recherche de trous |
| Animation intermédiaire | AniDepth | Génère des images intermédiaires avec un modèle de diffusion guidé par profondeur et line art | Recherche | Pas de gain de productivité commercial publié |
| Animation intermédiaire + finition | ANICRA | Automatise à partir des dessins-clés une partie des dōga et de la finition | Essais avec studios | Environ 70 % de travail en moins sur les étapes ciblées, selon son développeur |


Le tableau révèle déjà le décalage : **les outils disposant des preuves d'utilisation les plus solides ne sont pas nécessairement les plus génératifs**.

## Automatiser, assister et générer ne sont pas la même chose

Le mot « IA » écrase plusieurs transformations différentes.

**L’automatisation** retire une manipulation déjà bien définie. Détecter les couleurs d'une feuille de référence et les enregistrer automatiquement dans une palette en est un exemple. SAKUGADO, l’outil interne développé par OLM, peut reconnaître ces références, actualiser la palette lorsque la feuille est modifiée et remplacer automatiquement des couleurs déjà appliquées.

**L’assistance** conserve l'humain au centre de la décision. Le système cherche, suggère, détecte ou prépare ; l’artiste valide et corrige. Mage Search ou GapFill appartiennent principalement à cette catégorie.

**La génération**, enfin, synthétise réellement de nouvelles images ou de nouveaux états intermédiaires. AniDepth utilise ainsi un modèle de diffusion vidéo pour produire des in-betweens à partir de keyframes, avec des cartes de profondeur et les dessins au trait pour contraindre le résultat.

La frontière peut évidemment devenir floue. Une chaîne automatisée peut appeler un modèle génératif. Un générateur peut n'être qu'une petite étape d'un outil d'assistance.

Mais cette distinction empêche une erreur fréquente : considérer toute adoption de l'IA comme l'arrivée de Stable Diffusion dans un studio.

Le cas SHIAGEDO montre à quel point cette image est trompeuse.

## SHIAGEDO apprend un cut… puis oublie tout

La finition est un candidat évident à l'automatisation. Un personnage peut apparaître sur plusieurs images successives avec les mêmes couleurs, alors qu'un opérateur doit répéter une grande partie du travail.

Le système **SHIAGEDO** d'OLM attaque précisément ce problème.

Mais son fonctionnement est presque l'inverse de celui d'un grand générateur d'images généraliste.

D'après la présentation technique d'OLM rapportée par CGWORLD, SHIAGEDO **n'utilise ni Stable Diffusion, ni CLIP, ni autre grand modèle préentraîné sur une énorme collection d'images**. Il observe seulement les images non coloriées et coloriées appartenant au cut en cours. À partir de ces quelques exemples réalisés normalement par les artistes, il entraîne localement un petit modèle spécifique au plan, l'utilise pour colorier les autres images, puis **détruit le modèle et ses données lorsque le travail est terminé**.

Sur une RTX 6000 Ada, OLM indique environ 30 secondes d'apprentissage et une dizaine de secondes de traitement par image. Une seule image peut suffire pour commencer, mais la précision augmente lorsqu'un artiste colorie d'abord manuellement les images correspondant aux poses-clés. La précision annoncée est d'environ 80 % lorsque les détails sont inclus, contre environ 90 % dans certains benchmarks de recherche ; les cuts contenant de grands mouvements restent difficiles.

Et pourtant, le résultat global communiqué par GENIAC est une **réduction de 30 à 50 % du temps de finition** sur le périmètre testé.

Ce fonctionnement est particulièrement révélateur.

L'humain ne disparaît pas. **Son travail correct devient la donnée de référence à partir de laquelle la machine amplifie les répétitions.**

La valeur se déplace donc en partie : produire les bonnes images d'ancrage, définir correctement les couleurs et repérer les exceptions devient encore plus important.

## Une IA à 80 % peut être inutile si les 20 % restants coûtent trop cher

Dans une démonstration technologique, 80 ou 90 % de réussite peuvent sembler impressionnants.

Dans une livraison commerciale, un œil oublié, une mèche colorée avec la mauvaise teinte ou une zone d'un pixel laissée transparente reste une erreur.

C'est l'un des problèmes qu'OLM formule explicitement après ANIMINS : une IA n'a pas besoin d'être toujours correcte pour être technologiquement remarquable, mais **un anime livré doit, lui, être terminé**.

Une recherche publiée cette année permet de mesurer très précisément ce paradoxe.

*No Pixel Left Behind: Filling Gaps in Anime Colorization*, présenté à CHI 2026 par des chercheurs de l'université de Tokyo avec Akinobu Maejima d'OLM Digital, étudie ces minuscules zones fermées qui restent accidentellement non coloriées. Le système **GapFill** détecte les trous, les rend immédiatement visibles, les agrandit et propose une couleur que l'opérateur peut corriger. L'étude a été réalisée avec **13 coloristes professionnels**.

Le résultat n'est surtout pas « l'IA colorie plus vite ».

Lorsqu'il fallait réaliser une coloration depuis le début, le système n'a apporté **aucune accélération statistiquement significative** : 106,50 secondes avec les outils conventionnels contre 104,17 secondes avec GapFill.

En revanche, lorsqu'il s'agissait spécifiquement de traquer les derniers défauts, la différence devenait nette : 57,69 à 45,15 secondes dans un test, puis 66,27 à 51,91 secondes dans un second environ **22 % de temps économisé** dans les deux cas. Avec GapFill, aucun trou prévu par le test n'a été oublié, contrairement aux sessions réalisées avec les outils classiques.

C'est un résultat beaucoup plus important qu'il n'en a l'air.

**Le meilleur usage d'une IA professionnelle n'est pas nécessairement d'accomplir le métier à la place de l'humain. Il peut être de supprimer le moment précis où l'humain est mauvais : chercher pendant des dizaines de secondes une anomalie microscopique.**

L'étude conclut également que l'exactitude du modèle n'est pas le seul déterminant de son utilité. La possibilité de voir ce qu'il a détecté et de corriger immédiatement sa proposition compte énormément dans la confiance accordée à l'outil.

C'est une logique d'interface et de contrôle, autant qu'une logique d'intelligence artificielle.

## Le gain le plus spectaculaire concerne peut-être… la fonction recherche

Parmi tous les résultats de GENIAC, Mage Search semble presque banal.

Le système ne dessine rien.

Il sait chercher.

Dans une longue production, retrouver comment un personnage tenait un objet trente épisodes auparavant, l'apparence exacte d'une pièce, une tenue, une expression ou un plan similaire peut nécessiter de parcourir des épisodes et des dossiers ou de demander à quelqu'un qui connaît particulièrement bien l'œuvre.

Mage Search ingère la vidéo, effectue automatiquement le prétraitement nécessaire et permet ensuite de rechercher des cuts en langage naturel. Les dialogues peuvent également être indexés grâce au traitement de la parole.

GENIAC annonce **plus de 60 % de réduction du temps de recherche de cuts** et **99 % sur le temps nécessaire à la constitution du jeu de données de recherche**. Le produit a été commercialisé en mars 2026.

Depuis, l'expérience ne semble plus être confinée à OLM. AI Mage indiquait en juillet que Mage Search avait été adopté notamment par **ENGI, OLM et TMS Entertainment**. Son infrastructure d'analyse d'œuvres que la société appelle « Anime General Intelligence », malgré l'ambiguïté évidente avec le sens habituel d'AGI avait alors été construite ou testée sur 35 productions, dont 16 faisaient l'objet d'une adoption formelle. Son nouveau Mage Agent peut croiser vidéo, scripts, documents de référence et autres données de production. Ces nombres sont communiqués par AI Mage lui-même et ne constituent donc pas une mesure indépendante de performance, mais ils attestent d'un passage de l'expérimentation au produit commercial.

Cette évolution mérite davantage d'attention que la simple recherche d'images.

Un studio accumule depuis toujours d'énormes quantités de données : épisodes, layouts, feuilles de personnages, scripts, corrections, règles de licence, traductions, décors, retakes.

Jusqu'ici, une partie de leur valeur restait enfermée dans les dossiers ou dans la mémoire des personnes qui y travaillent.

Une IA de recherche transforme cette archive en **mémoire opérationnelle interrogeable**.

Et c'est peut-être l'une des mutations les plus structurelles actuellement en cours.

## Le vrai gisement de productivité pourrait être le retake

Dessiner plus vite n'est pas nécessairement ce qui fait économiser le plus d'argent à une production.

Ne pas devoir redessiner peut être beaucoup plus rentable.

GENIAC rapporte ainsi que l'introduction d'un « workflow d'assistance au directeur de l'animation » utilisant **CAS・CATool** sur une production commerciale a fait progresser le rythme de travail du directeur général de l'animation d'environ **1,2 fois** et réduit le taux de retake d'environ **40 % à 10 %**.

La documentation publique n'est pas suffisamment détaillée pour attribuer ces résultats à un mécanisme d'IA précis. Il serait donc abusif d'en conclure qu'un modèle génératif effectue les corrections à la place du superviseur.

Mais le résultat économique potentiel est plus intéressant que cela.

Dans une chaîne séquentielle, une correction tardive peut faire perdre du temps à plusieurs personnes. Un outil qui empêche l'erreur d'atteindre l'étape suivante peut donc apporter davantage qu'un générateur capable de fabriquer rapidement une première version imparfaite.

Cela suggère un indicateur beaucoup plus utile pour suivre l'IA dans l'anime : **pas le nombre d'images qu'elle sait générer, mais le nombre d'allers-retours qu'elle évite**.

## L'animation intermédiaire est bel et bien dans le viseur

Cela ne signifie pas que les métiers graphiques centraux sont à l'abri.

ANIMINS travaille directement sur l'in-betweening.

**AniDepth**, présenté à SIGGRAPH 2025 avec la participation d'OLM Digital, utilise un modèle de diffusion vidéo. Le problème est particulièrement difficile : même un modèle adapté à l'anime conserve des biais hérités de son entraînement sur des images plus réalistes et peut perdre les lignes précises, les aplats ou la structure du personnage.

Les chercheurs convertissent donc les images en cartes de profondeur, interpolent celles-ci, déforment les line arts en fonction de cette géométrie puis utilisent ces dessins comme contraintes pour produire les images colorées intermédiaires. L'objectif est de préserver les détails même lorsque le mouvement est important.

D'autres projets ANIMINS travaillent sur **LayerPack**, sur la mise en correspondance des lignes entre deux dessins-clés, sur la récupération d'in-betweens précédemment générés ou encore sur la colorisation automatique par correspondance de segments.

Mais un élément manque encore : **des chiffres publics démontrant qu'AniDepth réduit effectivement de X % le coût ou la durée d'une production commerciale**.

C'est de la recherche prometteuse, pas encore l'équivalent de Mage Search ou SHIAGEDO en matière de validation industrielle publique.

Un autre acteur japonais va plus loin.

CrestLab présente **ANICRA** comme une infrastructure capable de générer automatiquement une partie des dōga et de la finition à partir des dessins-clés. L'entreprise annonce des traitements en quelques dizaines de secondes et affirme avoir réduit d'environ **70 % la charge de travail sur les étapes visées** lors d'expérimentations avec plusieurs studios. NTT Docomo, dont le projet est issu avant son spin-off en 2025, rapporte le même ordre de grandeur.

Il faut cependant maintenir une différence de niveau de preuve : ces 70 % sont **une affirmation du fournisseur et de son ancien groupe parent**, sans protocole public assez détaillé pour les comparer directement aux expériences académiques ou pour les convertir en « 70 % de coût en moins par épisode ».

Mais cela montre clairement où se situe la prochaine bataille.

## Les personnages aussi sont concernés mais davantage en laboratoire

Le projet ANIMINS ne s'arrête pas aux tâches mécaniques.

Le METI cite explicitement l'**assistance au dessin des personnages** parmi les axes de recherche. Les publications associées vont de l'édition de cheveux guidée par diffusion à la génération de scènes d'anime à partir de prompts visuels structurés, en passant par la génération contrôlée de fumée ou de mouvements fluides.

Cela rend insuffisant l'argument rassurant selon lequel « l'IA ne prendra que les tâches pénibles ».

La recherche vise aussi des tâches graphiques et créatives.

Ce que les données permettent de dire en septembre 2026 est plus précis : **plus une tâche est ouverte, créative et difficile à vérifier automatiquement, moins les preuves publiques d'un gain industriel robuste sont aujourd'hui convaincantes.**

À l'inverse, les meilleurs résultats apparaissent sur des problèmes étroits disposant d'un état correct facilement identifiable : retrouver un plan, propager une couleur, détecter un trou, appliquer une référence ou éviter un retake.

Ce n'est probablement pas une coïncidence.

## Le problème des données d'entraînement produit déjà deux philosophies opposées

Une IA de production n'a pas seulement besoin d'être bonne. Un studio doit savoir **pourquoi il a le droit de l'utiliser**.

Le droit japonais offre des possibilités relativement larges pour certaines utilisations analytiques d'œuvres protégées par l'article 30-4, mais l'Agence japonaise des affaires culturelles rappelle elle-même que l'application au génératif reste dépendante du but de l'utilisation et que la jurisprudence reste limitée.

Les choix techniques d'OLM sont donc intéressants parce qu'ils ne cherchent pas simplement la limite maximale autorisée par la loi.

Dans GENIAC, les œuvres commerciales servant à la recherche ont été utilisées **avec autorisation**, et aucun dataset public issu du projet n'est prévu.

SHIAGEDO va encore plus loin : données limitées au cut concerné, apprentissage éphémère, suppression du modèle à la fin. OLM explique que certaines fonctions d'apprentissage continu présentes dans la recherche ne sont précisément pas envisagées dans le workflow pratique en raison des questions de droits.

C'est une autre vision de l'IA que celle du modèle géant entraîné une fois sur Internet.

**Des studios pourraient préférer de petits modèles spécialisés alimentés par leurs propres matériaux, parce que la traçabilité devient elle-même une caractéristique du produit.**

## Un incident chez WIT Studio montre pourquoi

Le 10 avril 2026, WIT Studio a publié un communiqué inhabituel concernant l'opening de *Ascendance of a Bookworm: Adopted Daughter of an Archduke*.

Après des réactions suscitées par la diffusion, le studio a enquêté sur son pipeline et confirmé que de l'IA générative avait été utilisée pour produire un matériau intervenant dans le décor de certains cuts.

WIT a alors fait redessiner le décor et annoncé son remplacement à partir du deuxième épisode. Plus intéressant encore : le studio précisait que l'utilisation de génération IA dans ses productions était **en principe interdite**, en dehors d'expérimentations spécifiques, et attribuait l'incident à une défaillance de gestion et de contrôle de la production.

Ce cas inverse la question habituelle.

Le problème n'est plus seulement : « un studio doit-il adopter l'IA ? »

Il devient : **« un studio peut-il réellement savoir où l'IA a été utilisée dans une chaîne impliquant de nombreux intervenants ? »**

À mesure que les modèles deviennent disponibles dans Photoshop, des services Web, des logiciels de production et chez des sous-traitants, une politique d'entreprise ne suffit plus.

Il faut pouvoir contrôler la provenance des éléments, imposer des règles aux prestataires, documenter les outils utilisés et vérifier ce qui revient dans le pipeline.

L'IA fait donc naître un nouveau travail au moment même où elle en automatise d'autres : **la gouvernance de production**.

## Ce que les économies de 30 %, 60 % ou 99 % ne disent pas

Il serait tentant d'additionner tous ces chiffres.

Ce serait une erreur.

Réduire de 50 % la durée d'une opération de finition ne réduit pas de 50 % le coût d'un épisode. Une diminution de 99 % du temps de construction d'un index de recherche ne signifie pas non plus que la production entière devient cent fois moins chère.

Ces résultats concernent **des sous-tâches différentes, mesurées selon des protocoles différents**.

Ils ne comptabilisent pas nécessairement l'intégration technique, les GPU, le développement logiciel, le nettoyage des données, la formation du personnel, les vérifications humaines ou le coût des erreurs nouvelles.

Et aucune des sources publiques examinées ici ne démontre, à ce jour, qu'un anime télévisé complet produit grâce à ces outils coûte X % de moins qu'un équivalent traditionnel à qualité égale.

C'est une absence importante.

Les gains peuvent d'ailleurs être absorbés autrement que par une baisse d'effectifs : davantage de temps consacré aux plans complexes, moins de retards, moins de sous-traitance, davantage de contrôles ou simplement une capacité à produire dans un secteur qui manque déjà de personnel.

Le ministère japonais de la Culture décrit encore en 2026 la pénurie de main-d'œuvre dans l'animation comme suffisamment sérieuse pour faire de la formation et de la rétention des professionnels une priorité nationale.

L'enquête de NAFCA menée auprès de 323 travailleurs du secteur avait trouvé une médiane de **225 heures travaillées par mois** et une rémunération horaire équivalente médiane de 1 111 yens dans son échantillon. Elle n'est pas un recensement exhaustif de l'industrie, mais rappelle que les gains de productivité arrivent dans un environnement déjà sous forte tension.

La véritable question économique est donc : **qui récupère le temps économisé ?**

Le salarié ? Le freelance ? Le studio ? Le calendrier ? La qualité ? Ou simplement un volume de production encore supérieur ?

Les expériences technologiques ne permettent pas encore d'y répondre.

## Automatiser les dōga crée aussi un problème que les benchmarks ne mesurent pas

Il existe enfin une conséquence paradoxale.

L'animation intermédiaire est précisément l'une des étapes les plus automatisables. Mais elle constitue également, dans plusieurs studios japonais, une porte d'entrée dans le métier.

CloverWorks explique encore que ses animateurs commencent leur parcours par les *dōga* et considère ce travail comme une manière d'apprendre les méthodes, les matériaux et le fonctionnement complet de la production avant de passer aux *genga*. Toei Animation maintient pour sa part en 2026 une formation spécifique consacrée aux dōga à côté de son cursus genga.

Cela ne signifie pas qu'il faudrait préserver artificiellement toutes les tâches répétitives.

Mais une inférence devient difficile à éviter : **si l'industrie automatise une partie importante du travail junior, elle devra repenser la manière dont elle fabrique ses professionnels seniors.**

Un studio peut gagner des milliers d'heures à court terme et perdre une partie de son mécanisme de transmission des compétences à long terme.

C'est un risque différent de « l'IA vole les emplois », et probablement plus concret.

## L'ancien précédent de Toei montre ce qui pourrait réellement se passer

Cette transformation n'a d'ailleurs pas commencé avec ChatGPT.

En 2021, Toei Animation avait déjà utilisé avec Preferred Networks l'outil **Scenify** pour son court métrage expérimental *URVAN*. Des photographies de Sasebo étaient transformées en matériaux de décor de base ; les artistes réalisaient ensuite le travail créatif et les retouches.

Toei avait mesuré une réduction du temps de prétraitement à environ **un sixième** de la méthode traditionnelle sur ce projet. L'outil avait été employé sur environ deux tiers des décors.

Le point remarquable est ce que Toei avait fait du temps gagné : les artistes pouvaient consacrer davantage d'efforts aux éléments cyberpunk nécessitant réellement leurs décisions visuelles.

C'est peut-être une meilleure représentation du futur proche qu'un studio vide rempli de GPU.

Non pas :

**artiste → IA**

mais :

**travail répétitif → outil → artiste réaffecté au problème difficile**.

Évidemment, rien ne garantit qu'une entreprise choisira toujours d'utiliser la productivité de cette manière. Elle peut aussi réduire ses coûts ou augmenter les cadences.

La technologie ne décide pas de la répartition du gain.

## Le véritable changement est peut-être un studio devenu « calculable »

L'un des constats les plus intéressants d'OLM n'a finalement presque rien à voir avec la génération d'images.

Dans le 3DCG, les équipes travaillent depuis longtemps autour de DCC des logiciels comme Maya ou Blender qui fournissent une infrastructure commune à laquelle on peut connecter scripts, plugins et automatisations.

La 2D japonaise est beaucoup plus fragmentée. Papier et numérique peuvent encore coexister ; plusieurs logiciels s'enchaînent ; certaines informations circulent sous forme de fichiers et de connaissances tacites. OLM voit donc SAKUGADO non seulement comme un outil de dessin, mais comme une possible **base technique commune** sur laquelle de nouvelles technologies pourront être branchées.

C'est ici que tous les morceaux de cette enquête se rejoignent.

SHIAGEDO a besoin de données du cut.

Mage Search transforme les archives en base interrogeable.

GapFill mesure précisément un défaut qui était auparavant recherché visuellement.

CAS・CATool intervient dans les cycles de correction.

ANIMINS expérimente même l'accumulation automatique des productions intermédiaires et de leurs métadonnées.

Autrement dit, **avant de pouvoir automatiser l'anime, il faut rendre son processus lisible par une machine**.

C'est peut-être le bouleversement le plus important de 2026.

La première génération d'IA réellement utile aux studios ne remplace pas le réalisateur ou l'animateur vedette. Elle transforme progressivement un pipeline artisanal, fragmenté et extrêmement dépendant des personnes en un système où les matériaux sont indexés, les répétitions détectées, les erreurs mesurées et certains gestes amplifiés automatiquement.

L'étape suivante peut parfaitement atteindre des tâches plus créatives. AniDepth, ANICRA et les recherches sur les personnages montrent que cette frontière est déjà attaquée.

Mais pour savoir si l'IA transforme réellement l'animation japonaise, le nombre de clips générés par diffusion est probablement l'un des indicateurs les moins intéressants à suivre.

Les chiffres beaucoup plus révélateurs seront **le nombre de retakes par cut, le temps passé à rechercher une référence, la proportion des sorties nécessitant une correction, le débit des superviseurs, la quantité de travail junior automatisée et, surtout, ce que les studios feront des heures récupérées**.

C'est là que se décidera si l'IA améliore réellement la fabrication des anime ou si elle permet simplement d'en demander davantage aux mêmes personnes.