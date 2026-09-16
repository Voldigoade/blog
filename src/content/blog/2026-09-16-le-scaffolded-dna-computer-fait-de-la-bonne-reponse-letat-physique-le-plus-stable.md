---
title: Le Scaffolded DNA Computer fait de la bonne réponse l’état physique le
  plus stable
description: "Un ordinateur moléculaire publié dans Nature ne se contente pas de
  calculer avec de l’ADN : il est conçu pour que les configurations erronées
  soient physiquement défavorisées et que le système dérive spontanément vers le
  résultat. Une idée élégante, puissante et encore très loin de remplacer un
  processeur."
pubDate: 2026-09-16
draft: false
featured: true
section: computing
contentType: article
tags:
  - Scaffolded DNA Computer
  - calcul moléculaire
  - DNA computing
  - thermodynamique du calcul
  - ADN
  - nanotechnologie
  - Maynooth University
coverImage: /images/posts/ef9bd87a-709e-4bf3-b9de-0317fbf613b3.png
coverAlt: Visualisation d’un ordinateur moléculaire où de courts brins d’ADN
  s’assemblent le long d’un scaffold, tandis que les configurations incorrectes
  sont défavorisées au profit d’une structure stable correspondant au résultat.
author: Voldigoade
news: true
seoTitle: "Scaffolded DNA Computer : l’ordinateur ADN où la bonne réponse est
  thermodynamiquement favorisée"
seoTargetQuery: Scaffolded DNA Computer thermodynamique
---
Le résultat le plus intéressant publié aujourd’hui dans *Nature* n’est pas qu’une équipe a réussi à « faire des calculs avec de l’ADN ». Leonard Adleman le faisait déjà il y a plus de trente ans. La vraie rupture conceptuelle est ailleurs : **et si l’on programmait la matière de telle façon que la bonne réponse à un calcul soit précisément l’état physique vers lequel elle préfère évoluer ?**

C’est l’idée du **Scaffolded DNA Computer**, ou SDC, présenté par Tristan Stérin, Abeer Eshra, Constantine Glen Evans, Janet Adio et Damien Woods. Leur système exécute dix programmes moléculaires, allant de la détection de parité à la multiplication, la division et l’addition de nombres binaires de 25 bits. Les auteurs rapportent plus de 700 calculs expérimentaux, des petites instances terminées en 30 à 60 secondes, des programmes réutilisés jusqu’à 25 fois et un passage à l’échelle qu’ils qualifient de **100 bits de calcul moléculaire**.

Mais ces chiffres deviennent réellement intéressants seulement lorsqu’on comprend ce que le SDC change dans la physique même du calcul.

## La plupart des ordinateurs doivent empêcher la physique de gagner

Un ordinateur numérique ordinaire maintient des états logiques fiables dans un environnement traversé de fluctuations, de bruit et de pertes. Des transistors sont commutés, des signaux sont régénérés et synchronisés, des mémoires sont stabilisées, des erreurs sont détectées ou corrigées. Les détails diffèrent radicalement entre une puce CMOS et une réaction d’ADN, mais un principe général demeure : **le résultat désiré n’est pas nécessairement l’état d’équilibre spontané du système physique**.

C’est une distinction ancienne en thermodynamique de l’information. Rolf Landauer montrait dès 1961 que les opérations logiquement irréversibles ont un coût thermodynamique minimal ; Charles Bennett développera ensuite le lien entre réversibilité logique, bruit thermique et dissipation. Cela ne signifie pas que « tout calcul consomme forcément beaucoup d’énergie » ni que le SDC contourne magiquement le principe de Landauer. Cela signifie plutôt qu'un ordinateur réel doit disposer de mécanismes permettant de conserver et manipuler de l’information malgré les tendances thermodynamiques de son support.

Le problème devient particulièrement visible en calcul moléculaire.

Les circuits à déplacement de brins d’ADN, par exemple, sont souvent dessinés comme des séquences de réactions : A déclenche B, qui libère C, qui active D. Les chercheurs doivent alors contrôler les vitesses relatives, éviter les réactions parasites, limiter les « fuites » et empêcher le système d’atteindre trop tôt des états chimiquement stables mais informatiquement incorrects.

Autrement dit, on **programme une trajectoire cinétique**.

Le SDC tente presque l'inverse : **programmer la destination thermodynamique**.

## Un programme dont le résultat se trouve au fond de la vallée

Imaginez un paysage montagneux. Chaque position représente une configuration possible du système moléculaire et son altitude correspond à son énergie libre.

Dans une architecture classique hors équilibre, le programme ressemble à un itinéraire balisé : le système doit emprunter certaines routes dans un certain ordre et éviter les mauvais embranchements.

Dans le SDC, l’ambition est de remodeler le terrain lui-même pour que le résultat du programme se trouve dans la vallée la plus favorable.

Cette idée n’est pas une simple métaphore utilisée après l’expérience. Elle constitue le principe de conception du système publié dans *Nature*. Les auteurs cherchent à rendre la configuration correspondant à la bonne réponse énergétiquement plus favorable que les configurations contenant des erreurs. Leurs calculs de minimum d’énergie libre et de fonction de partition prédisent alors que, dans les conditions appropriées, la probabilité d’occuper l’état cible peut approcher 1 tandis que l’ensemble des configurations concurrentes devient statistiquement défavorisé.

Cela rapproche étrangement le calcul moléculaire de la programmation déclarative : au lieu d'imposer exactement *comment* arriver au résultat, on encode surtout *ce que doit être* le résultat, puis on exploite la dynamique physique pour le trouver.

C’est également la différence essentielle avec une analogie facile, mais imparfaite, au recuit simulé. Un algorithme de recuit simulé exécuté sur un CPU représente numériquement une fonction d’énergie puis dépense de l’électricité pour calculer son évolution. Ici, **le paysage énergétique est la matière elle-même**.

## Comment programmer une éprouvette

Le SDC utilise un long brin d’ADN comme **scaffold**, ou échafaudage, subdivisé en positions de liaison distinctes.

À chaque position peuvent concourir plusieurs « tuiles » moléculaires, elles-mêmes constituées de brins d’ADN. Dans l'implémentation principale, un brin de calcul possède un domaine central de 24 bases permettant de reconnaître sa position sur le scaffold et deux domaines de calcul de 12 bases placés de part et d'autre.

Ces domaines latéraux transportent l'information nécessaire au programme et à ses données.

Le mécanisme repose alors sur trois propriétés. Les tuiles sont fournies en excès par rapport au scaffold typiquement dix fois plus concentrées afin que ses positions soient occupées. Les domaines voisins correctement appariés procurent une liaison favorable. Et les liaisons sont volontairement assez faibles pour rester réversibles : une mauvaise tuile n’est donc pas nécessairement prisonnière de son erreur.

Si deux tuiles voisines encodent une transition incompatible, leur interface contient un **mismatch algorithmique**. Cette configuration possède moins de liaisons favorables. Sous l’effet des fluctuations thermiques, une tuile peut être remplacée par une concurrente plus compatible.

La correction n’est donc pas décidée par un contrôleur externe qui détecterait « erreur au bit 17 ». Elle résulte de la différence d’énergie entre assemblages moléculaires.

L’équipe fixe par ailleurs une tuile unique à la première position l’**anchor** afin de sélectionner un résultat déterministe. À partir de cette ancre, la compatibilité se propage le long du scaffold.

Le résultat final n’est pas seulement représenté quelque part dans une mémoire : **la structure moléculaire assemblée est elle-même l’état computationnel**.

## L’héritage du DNA origami, avec une différence capitale

Cette architecture reprend un principe extrêmement efficace du DNA origami : utiliser un long scaffold et placer en excès de nombreux brins plus courts qui l’amènent spontanément vers une structure particulière.

Un origami ADN classique exploite déjà massivement la thermodynamique de l’hybridation pour former une nanostructure. Mais il ne choisit pas sa structure en exécutant un programme sur des données. Le SDC ajoute cette couche algorithmique en permettant à plusieurs brins de **concourir pour une même position** selon les informations encodées dans leurs interfaces.

Ces illustrations de *Nature* montrent deux briques historiques du domaine calcul sur ADN et origami ADN et non l’appareil SDC présenté dans le nouvel article.

![https://media.springernature.com/lw685/springer-static/esm/art%3A10.1038%2Fs41565-024-01771-6/MediaObjects/41565_2024_1771_Fig11_ESM.jpg](https://tse3.mm.bing.net/th/id/OIP.1HWGiQztZgBHy42azSJrKAHaH8?r=0&w=474&h=379&c=7&p=0)

![https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fs43586-020-00009-8/MediaObjects/43586_2020_9_Fig1_HTML.png](https://tse4.mm.bing.net/th/id/OIP.cm3LeKVAiFyf7Xf99Y5WPAHaEz?r=0&w=474&h=379&c=7&p=0)

Ce rapprochement est important. L’origami ADN fonctionne précisément parce qu’on n’essaie pas de micromanager chaque collision moléculaire. On conçoit un ensemble dont l’assemblage souhaité est globalement favorisé.

Le SDC demande : **peut-on faire la même chose avec un algorithme ?**

## Dix programmes plutôt qu’une démonstration unique

L’équipe n’a pas construit une réaction spécialisée qui ne saurait résoudre qu’un problème prédéfini.

Les petites instances du SDC peuvent compiler des **automates finis**, une classe classique de modèles informatiques dans lesquels un programme parcourt une entrée tout en conservant un petit état interne. Pour une addition binaire, cet état correspond par exemple à la retenue transmise d’une colonne à la suivante.

Les dix démonstrations expérimentales comprennent l’addition, la copie d’un bit, la parité d’une entrée de huit bits, une multiplication par 3, une division par 2 en base 3, un compteur, un automate fini non déterministe à trois états, plusieurs étapes de l’automate cellulaire Rule 110, un problème de reachability dans un graphe et la reconnaissance de parenthèses équilibrées.

Ce catalogue est plus significatif que le niveau arithmétique de chacune des tâches. Multiplier quelques bits par trois n’impressionnera évidemment aucun processeur moderne. Ce que l’expérience teste est la capacité à **reprogrammer le même langage moléculaire** pour exprimer des logiques différentes.

Pour un SDC de quatre positions, l’équipe dispose déjà d’un pool de 395 brins couvrant calcul, reporting et réutilisation. Le passage à des systèmes pouvant atteindre 25 positions ajoute 1 144 autres brins.

Ce n’est donc pas un processeur généraliste miniature. Mais ce n’est pas non plus une réaction chimique unique rebaptisée « ordinateur ».

## Une addition de 10 + 3 en trente secondes

Le contraste de vitesse observé dans les données mérite d’être regardé de près.

Les expériences ordinaires sur les petites architectures sont typiquement réalisées avec un recuit d’environ trois heures, faisant descendre la température de 80 °C à 20 °C. Sur ces systèmes à quatre positions, le rendement expérimental moyen estimé est d’environ **95,3 %** par comparaison avec les contrôles ; l’addition seule atteint en moyenne **96,7 %** selon la métrique utilisée par les auteurs.

Mais les chercheurs ont aussi brutalement accéléré le protocole.

En abaissant la température de 80 à 55 °C en moins d’une minute, ils obtiennent déjà une séparation exploitable entre les sorties. Certaines additions binaires délivrent leurs quatre bits en moins de 30 secondes ; les expériences rapides donnent environ **82,4 % de rendement moyen estimé pour l’addition** et 81,2 % sur l’ensemble des calculs concernés.

Il faut immédiatement ajouter deux précisions.

Premièrement, ce « rendement » est une métrique expérimentale construite à partir des niveaux de fluorescence relativement à des contrôles. **Ce n’est pas un taux d’exactitude directement comparable au taux d’erreur d’un ALU en silicium.**

Deuxièmement, l’équipe lit les bits grâce à des reporters fluorescents. Dans l’addition quatre bits détaillée par *Nature*, les quatre positions de sortie sont mesurées dans des expériences distinctes. Il ne faut donc pas imaginer une petite puce ADN possédant déjà un bus numérique qui fournirait instantanément un mot binaire à un ordinateur.

La réaction moléculaire peut être rapide. L’**entrée-sortie** reste un problème technologique distinct.

## « 100 bits » ne signifie surtout pas « processeur 100 bits »

C’est probablement le chiffre le plus susceptible d’être massacré dans les titres.

Les chercheurs ont étendu leur additionneur à deux nombres de **25 bits**, soit 50 bits d’entrée. L’exécution contient aussi 25 bits de retenue et 25 bits de résultat. Les auteurs comptabilisent donc **100 bits de calcul** : 50 bits d’entrée auxquels s’ajoutent 50 bits d’état calculé et de sortie.

Cela n’a presque aucun rapport avec ce que signifie « 64 bits » dans « processeur 64 bits ».

La largeur en bits d’un CPU décrit notamment la largeur native de certains registres, opérations et adresses de son architecture. Le chiffre de 100 bits utilisé ici décrit la quantité d’information logique impliquée dans une instance expérimentale du calcul moléculaire.

Comparer directement les deux reviendrait à comparer « 100 variables dans une réaction » et « architecture 100 bits ».

Le nombre reste impressionnant **dans son domaine expérimental**, mais seulement avec cette définition.

## Plus le système grandit, plus la thermodynamique cesse d’être magique

Les expériences à 25 positions sont probablement la partie la plus utile du papier, car elles montrent à la fois la promesse de l’idée et l’endroit exact où elle commence à souffrir.

Pour disposer d’un long scaffold bon marché, l’équipe utilise de l’ADN simple brin provenant du bactériophage M13, long d’environ 7,2 kilobases. Elle sélectionne une région de 624 bases correspondant aux positions utiles au calcul.

Ce choix introduit cependant des imperfections très concrètes.

Les différents segments du scaffold naturel n’ont pas les mêmes énergies de liaison. Sur le meilleur segment sélectionné, les auteurs calculent encore des ΔG∘\Delta G^\circ allant approximativement de **−20,9 à −11,1 kcal/mol à 65 °C**. Les concentrations employées sur les grands scaffolds tombent également à 10 nM, contre 100 nM sur les petites expériences, ce qui ralentit l’association des tuiles et dégrade le rapport signal sur bruit. Enfin, plusieurs kilobases inutilisées de M13 restent présentes dans la solution et peuvent créer des interactions parasites.

Voilà une limite essentielle : rendre le **bon état final thermodynamiquement favorable ne garantit pas qu’un grand système l’atteindra rapidement**.

Une vallée peut être la plus basse d’un paysage et rester difficile d’accès si le trajet est rempli de bosses ou de minima locaux.

La thermodynamique dit où le système veut finir. **La cinétique détermine s’il y parvient avant que l’expérimentateur perde patience.**

## Une heure, quatorze heures : le vrai prix du passage à l’échelle

Dans les additions à 25 positions, les auteurs introduisent une mesure MM, représentant la plus longue succession de positions où une erreur de retenue peut continuer à se propager sans rencontrer un « sink » logique qui l’absorbe.

Sur des paires d’entrées aléatoires, la moyenne vaut environ 4. Une instance avec M=4M=4 obtient un résultat en approximativement **une heure**. Une instance plus difficile avec M=5M=5 nécessite jusqu’à **14 heures** pour obtenir une bonne complétion expérimentale. Les auteurs calculent toutefois que plus de 84 % des paires de nombres de 25 bits ont M≤5M\leq5.

Une autre expérience est encore plus révélatrice.

Pour copier un bit le long d’un grand scaffold, l’équipe doit rendre le paysage énergétique plus régulier en réarrangeant les domaines pour obtenir des configurations approximativement **isoénergétiques** à nombre d’erreurs égal. Avec ce design, elle rapporte environ 71 % de rendement sur 20 positions et **59 % sur 25 positions après un recuit de 14 heures**.

C’est précisément la nuance qu’un résumé de communiqué de presse risque d’effacer.

Le SDC ne démontre pas que « la thermodynamique résout automatiquement le problème de l’échelle ». Il montre quelque chose de plus intéressant : **la forme du paysage énergétique devient un objet programmable à part entière**.

Le programme ne décrit plus seulement une fonction logique. Il doit parfois aussi être compilé de façon à rendre son propre espace physique de configurations navigable.

## Pas de correcteur d’erreurs séparé ne signifie pas absence de toute stratégie anti-erreur

Les auteurs insistent à juste titre sur le fait que leurs petites instances n’ont pas besoin des systèmes de redondance ou des séquences de correction explicites typiques de nombreuses architectures moléculaires.

Mais il faut éviter une interprétation absolue.

Sur les additions longues, certaines propriétés du programme lui-même réduisent les erreurs : les « sinks » absorbent les retenues et interrompent leur propagation. Pour le BitCopy étendu, le relabelling isoénergétique est spécifiquement conçu pour empêcher certaines mauvaises configurations de devenir accidentellement plus stables que la bonne.

La nouveauté est donc moins « aucune correction d’erreur » que **la correction peut être déplacée vers la physique du paysage et la structure logique du programme**, au lieu de nécessiter une machinerie moléculaire séparée qui inspecte puis répare les fautes.

Cette différence est profonde.

## Un ordinateur réutilisable mais pas encore autonome

Un autre résultat passe facilement derrière les démonstrations arithmétiques : certaines réactions ont été **reprogrammées successivement dans le même système**.

Le principe consiste à ajouter un nouvel input ainsi qu’un brin bloquant l’ancien, puis à réchauffer et refroidir le mélange pour déplacer son équilibre.

Le BitCopy a ainsi été exécuté **25 fois**, un compteur 24 fois avec des entrées successives et deux variantes de l’addition neuf fois. Les cycles expérimentaux de renouvellement utilisent un recuit d’environ 12 minutes, auquel s’ajoute le temps de manipulation.

L’expérience est remarquable pour une architecture moléculaire, mais le terme « réutilisable » ne doit pas évoquer un ordinateur autonome qui boucle indéfiniment.

De nouvelles molécules sont ajoutées. Des blockers s’accumulent. Le volume et les concentrations évoluent. Dans les expériences, un manipulateur de liquide acoustique facilite les ajouts, même si les auteurs indiquent également avoir réussi des préparations manuelles.

Le calcul est moléculaire. Son orchestration expérimentale est encore celle d’un laboratoire.

## Le SDC n’est pas sorti de nulle part

Le calcul par ADN remonte au moins à l’expérience fondatrice de Leonard Adleman en 1994. Celui-ci avait encodé un petit graphe dans des molécules d’ADN et utilisé des opérations de biologie moléculaire pour résoudre une instance du problème du chemin hamiltonien.

Depuis, le domaine a exploré les tuiles auto-assemblées, les circuits de déplacement de brins, les réseaux logiques, les automates, les robots moléculaires et le stockage calculant.

En 2019, une équipe comprenant déjà Damien Woods présentait dans *Nature* un ensemble de **355 tuiles ADN reprogrammables** capable d’exécuter 21 circuits sur six bits, avec des tâches aussi diverses que le tri, la reconnaissance de palindromes ou la simulation d’automates cellulaires.

Le problème de l’équilibre était parallèlement étudié de manière théorique. En 2017, David Doty, Trent Rogers, David Soloveichik, Chris Thachuk et Damien Woods formalisaient les **Thermodynamic Binding Networks**, précisément pour demander si l’état thermodynamiquement favorisé pouvait coïncider avec le résultat souhaité d’un calcul.

Et le SDC n’est même pas la seule réalisation expérimentale récente de cette idée.

En janvier 2026, Boya Wang, Cameron Chalk, David Doty et David Soloveichik ont publié dans *Science Advances* un système de **calcul à l’équilibre piloté par l’entropie**, appliqué notamment à la propagation réversible de signaux, à la logique par auto-assemblage et à la synthèse de chaînes moléculaires de longueur programmée.

En 2023, Maxim Nikitin avait également démontré une approche d’équilibre fondée sur des interactions faibles entre brins largement non complémentaires, avec entre autres un circuit calculant une racine carrée sur quatre bits en environ cinq minutes.

Présenter le SDC comme « le premier ordinateur thermodynamique de l’histoire » serait donc difficile à défendre.

Son intérêt est plus spécifique : **réunir une architecture scaffoldée programmable, une assez grande diversité algorithmique, des expériences rapides sur petite échelle, une réutilisation répétée et un passage expérimental jusqu’à 25 positions dans un même cadre physique.**

## Le concurrent conceptuel le plus instructif fait exactement l’inverse

Un papier de *Nature* publié en 2025 par Tianqi Song et Lulu Qian permet de comprendre encore mieux ce qui distingue le SDC.

Leur architecture contient plus de 200 espèces moléculaires et permet à des circuits logiques ainsi qu’à des réseaux de neurones ADN d’être réutilisés au moins 16 fois. Mais le principe consiste à utiliser la chaleur pour **recharger des pièges cinétiques**, donc pour remettre le système dans un état hors équilibre capable d’effectuer un nouveau calcul.

Les deux travaux utilisent donc de l’ADN. Les deux utilisent de la chaleur. Les deux cherchent des systèmes réutilisables.

Pourtant leur philosophie physique est presque opposée.

Song et Qian : **reconstituer un état hors équilibre riche en énergie, puis dépenser cette énergie pendant le calcul.**

Stérin, Eshra et leurs collègues : **dessiner le système pour que le résultat soit l’équilibre vers lequel il descend.**

Cette distinction est bien plus intéressante que l’étiquette commune d'« ordinateur ADN ».

## Non, le calcul n’est pas devenu gratuit

Il serait tentant d’enchaîner immédiatement : puisque le résultat est thermodynamiquement favorisé, ce type d’ordinateur pourrait résoudre la consommation énergétique des datacenters.

Le papier ne démontre rien de tel.

Il faut synthétiser les brins d’ADN, préparer les solutions, les mélanger, chauffer le système parfois jusqu’à 80 °C, le refroidir selon un protocole, ajouter de nouvelles molécules lors des réutilisations et mesurer les sorties par fluorescence. Toutes ces opérations ont un coût énergétique et matériel réel. Les auteurs eux-mêmes écrivent que leur architecture possède des coûts évidents en nombre et longueur de brins, chauffage et recuit.

Plus fondamentalement, **être thermodynamiquement favorisé n’implique pas une absence de dissipation**.

L'intérêt est ailleurs : éviter de consacrer une partie de la machinerie moléculaire à lutter continuellement contre l’état que la physique préférerait produire.

C’est une réduction possible du conflit entre programme et matière, pas l’invention d’une machine à calcul perpétuel.

## Pourquoi ne jamais comparer sa vitesse à celle d’un CPU

Une addition de 25 bits demandant une heure ou quatorze heures serait grotesquement lente si l’objectif était d’émuler un processeur.

Même les 30 secondes des meilleures petites instances sont astronomiquement plus lentes qu’une addition électronique.

Mais cette comparaison suppose que le SDC vise à remplacer l’ALU d’un Ryzen ou d’un smartphone. Ce n’est pas le cas.

Le terrain où un ordinateur moléculaire pourrait devenir réellement intéressant est celui où **les entrées, les sorties et l’action souhaitée sont elles-mêmes moléculaires**.

Dans une nanomachine, par exemple, convertir une concentration biologique en signal électrique, l’envoyer dans un CPU, puis reconvertir sa décision en action chimique peut être absurdement indirect. Un système capable de reconnaître son environnement et de restructurer directement de la matière à l’échelle nanométrique n’a pas besoin de gagner un benchmark Geekbench.

Son avantage potentiel est de **calculer dans le même substrat que celui sur lequel il doit agir**.

## De l’ordinateur moléculaire à la matière programmable

C’est probablement là que le papier devient le plus prospectif.

Les auteurs envisagent que des principes similaires puissent un jour être intégrés à du stockage ADN, à des structures de DNA origami possédant leur propre logique ou à des systèmes utilisant de l’ARN et des protéines. Ils évoquent également des environnements biologiques complexes, même si leur expérience actuelle reste un système contrôlé in vitro.

Pour le stockage ADN, l’idée est particulièrement séduisante : au lieu d’extraire une information moléculaire, de la séquencer, de la traiter électroniquement puis éventuellement de réécrire le résultat, une partie du traitement pourrait avoir lieu **directement dans le support moléculaire**.

Pour les nanomachines, l’état de sortie pourrait même ne plus être une valeur destinée à être lue. Il pourrait être une structure, une liaison, l’exposition d’un domaine moléculaire ou le déclenchement d’une autre réaction.

À ce stade, la frontière entre « ordinateur » et « matériau » commence à devenir floue.

## Le problème de recherche qui apparaît derrière le SDC

Le papier semble au premier abord parler d’ADN. En réalité, son idée la plus générale concerne la **compilation d’un algorithme vers un paysage d’énergie**.

Dans un logiciel conventionnel, un compilateur transforme un programme en instructions compatibles avec une architecture.

Dans un ordinateur thermodynamique, un futur compilateur pourrait devoir résoudre un problème supplémentaire : traduire la logique en interactions physiques telles que le résultat correct soit non seulement stable, mais aussi accessible rapidement, sans pièges intermédiaires catastrophiques.

Cela ajoute une nouvelle couche à la pile informatique :

algorithme → logique → interactions moléculaires → paysage de libre énergie → dynamique physique.

Les travaux théoriques autour du SDC montrent déjà que le calcul de minimum d’énergie libre et de fonction de partition pour cette architecture peut être traité par des algorithmes spécialisés, et les auteurs utilisent notamment NUPACK et leurs propres outils pour concevoir et analyser les séquences. Le code et les données de l’étude sont publiés sur Zenodo.

Le logiciel ne programme donc plus seulement une machine.

**Il programme ce que la matière préférera devenir.**

## Ce que l’expérience démontre et ce qu’elle ne démontre pas encore

Le SDC montre expérimentalement qu’il est possible de faire coïncider, sur des programmes non triviaux, **correction logique et préférence thermodynamique**. Il montre aussi que cette stratégie peut donner des petites réactions rapides, tolérer une certaine complexité moléculaire, être réutilisée et atteindre des systèmes sensiblement plus grands que les démonstrations minimales.

Les données montrent en même temps le problème suivant avec une honnêteté assez rare : à 20 ou 25 positions, les rendements diminuent, les temps passent de secondes à des heures, l’hétérogénéité énergétique du véritable ADN devient visible et il faut recommencer à sculpter soigneusement le paysage.

C’est moins spectaculaire que « un ordinateur ADN de 100 bits va remplacer les puces ». C’est aussi beaucoup plus intéressant.

Le papier suggère qu’en informatique moléculaire, la robustesse pourrait parfois venir non pas d’une lutte toujours plus sophistiquée contre la physique, mais d’un meilleur accord avec elle.

Un mauvais état n’aurait plus à être constamment repéré puis détruit.

Il suffirait, autant que possible, de faire en sorte que **la matière elle-même n’ait aucune bonne raison d’y rester**.