---
title: Le Web est déjà partiellement post-quantique voici ce qui résiste
  vraiment en 2026
description: Chrome, Cloudflare et les principales piles TLS protègent déjà une
  partie de tes connexions contre de futurs ordinateurs quantiques. Mais
  l’échange de clés, le chiffrement, les certificats et le trajet jusqu’au
  serveur d’origine n’en sont pas au même stade.
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: research
tags:
  - cryptographie post-quantique
  - TLS 1.3
  - ML-KEM
  - X25519MLKEM768
  - Chrome
  - Cloudflare
  - NIST
  - cryptographie
coverImage: /images/posts/2348668a-d80a-4b1e-95bf-8120f40f14a5.png
coverAlt: Un navigateur communique avec un CDN puis un serveur d’origine, avec
  seulement certaines portions de la connexion représentées comme protégées par
  une cryptographie post-quantique.
author: Voldigoade
news: false
seoTitle: "TLS post-quantique en 2026 : ce qui protège déjà réellement le Web"
seoDescription: Chrome et Cloudflare utilisent déjà ML-KEM dans TLS. Voici
  exactement quelles parties d’une connexion HTTPS résistent déjà à un futur
  ordinateur quantique et lesquelles restent vulnérables.
seoTargetQuery: TLS post-quantique 2026
---
Tu ouvres un site dans Chrome. Le cadenas ou son équivalent moderne ne t’indique rien de particulier. La page s’affiche comme hier. Pourtant, dans certains cas, quelques millisecondes plus tôt, ton navigateur vient d’exécuter une primitive cryptographique conçue spécifiquement pour résister à une machine qui n’existe pas encore.

Pas à un « ordinateur quantique » au sens général : ces machines existent déjà. Ce qui manque encore est un **ordinateur quantique cryptographiquement pertinent**, suffisamment grand, fiable et corrigé des erreurs pour exécuter les attaques capables de casser les clés RSA et les courbes elliptiques utilisées à l’échelle d’Internet.

Le paradoxe est donc réel : **la menace n’est pas encore opérationnelle, mais sa contre-mesure est déjà en production**.

En août 2024, le NIST a finalisé ML-KEM dans la norme FIPS 203. Chrome avait commencé encore plus tôt avec une version pré-standard de Kyber ; il est passé à la version normalisée ML-KEM avec Chrome 131. OpenSSL 3.5 et Go 1.24 l’activent par défaut dans TLS. Cloudflare affirme désormais que plus de 65 % de son trafic humain bénéficie d’un accord de clé post-quantique. Et depuis août 2026, l’IETF a officiellement inscrit `X25519MLKEM768` dans une RFC Standards Track : la [RFC 10024].

Le Web post-quantique n’est donc plus un projet de laboratoire.

Mais il existe un piège dans cette formulation : **une connexion peut être post-quantique à un endroit et parfaitement classique à un autre**.

Et c’est là que la situation devient beaucoup plus intéressante.

## La réponse courte : qu’est-ce qui résiste déjà lorsque tu ouvres un site ?

En septembre 2026, une connexion HTTPS moderne peut grossièrement être découpée en trois briques cryptographiques.


| Partie de TLS | Rôle | Situation typique en 2026 |
| ---------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| Chiffrement symétrique | Chiffre les données une fois la session établie | Déjà considéré comme résistant aux attaques quantiques connues à cette échelle |
| Accord de clé | Crée le secret utilisé pour chiffrer la session | **Peut déjà être post-quantique**, notamment avec `X25519MLKEM768` |
| Authentification | Prouve que le serveur est réellement le site demandé | **Encore majoritairement classique**, avec RSA/ECDSA et une PKI traditionnelle |


Cloudflare décrit explicitement TLS suivant ces trois composantes et considère que la migration urgente concerne surtout les deux dernières : accord de clé et signatures. Le chiffrement symétrique utilisé ensuite pour transporter les données ne subit pas la même catastrophe théorique que RSA ou ECC face à l’algorithme de Shor.

Autrement dit, lorsqu’un site négocie `X25519MLKEM768`, **le secret de ta session est déjà protégé contre le scénario principal qui inquiète aujourd’hui les cryptographes : enregistrer ta connexion maintenant pour la déchiffrer plus tard**.

Mais l’identité du serveur, elle, ne l’est généralement pas encore.

Cette distinction explique presque toute la migration actuelle.

## Pourquoi protéger des données contre une machine qui n’existe pas encore ?

Supposons qu’un acteur suffisamment puissant intercepte aujourd’hui une connexion TLS utilisant uniquement X25519.

Il ne sait pas la déchiffrer. Il enregistre donc tout :

- les messages TLS ;
- les échanges publics nécessaires à l’accord de clé ;
- puis l’intégralité du trafic chiffré.

Il conserve ces données.

Dans quinze ans, imaginons qu’il dispose enfin d’un ordinateur quantique capable d’exécuter efficacement l’algorithme de Shor contre Curve25519.

Le caractère éphémère de la clé X25519 n’est alors plus suffisant. Les informations publiques enregistrées pendant le handshake peuvent permettre de reconstruire le secret partagé, puis les clés de trafic dérivées par TLS, et donc de revenir sur les communications archivées.

C’est le principe du **harvest now, decrypt later** : collecter maintenant, déchiffrer plus tard.

Cloudflare cite précisément cette menace comme la raison pour laquelle l’accord de clé post-quantique devait être déployé avant même l’existence d’un ordinateur quantique capable de casser TLS.

La logique temporelle est importante.

Une entreprise ne peut pas attendre que l’attaque quantique soit démontrée pour commencer sa migration si les informations transmises aujourd’hui doivent rester confidentielles pendant dix ou vingt ans.

Le problème commence **avant** le fameux « Q-Day ».

## RSA et ECC ont un problème que AES n’a pas

La cryptographie publique classique repose notamment sur des problèmes mathématiques supposés extrêmement difficiles pour les ordinateurs ordinaires.

RSA dépend de la difficulté de factoriser de très grands entiers.

ECDH et ECDSA reposent sur le problème du logarithme discret sur courbes elliptiques.

Pour les ordinateurs classiques, les paramètres correctement choisis restent hors de portée.

Un ordinateur quantique suffisamment puissant change cependant radicalement la situation avec l’algorithme de Shor : ces problèmes ne deviennent pas seulement « un peu plus faciles ». Leur structure même permet une accélération suffisamment importante pour rendre les familles RSA et ECC inadaptées à un futur post-quantique.

AES est dans une situation différente.

L’attaque quantique générique principalement évoquée contre les clés symétriques est l’algorithme de Grover, qui offre théoriquement une accélération quadratique de la recherche exhaustive, mais sans l’effondrement spectaculaire provoqué par Shor contre RSA ou ECC. Le NIST souligne d'ailleurs que les coûts pratiques, la difficulté de paralléliser Grover et les énormes ressources quantiques nécessaires rendent l’interprétation naïve « AES-128 devient simplement 64 bits » beaucoup trop simpliste. Le NIST continue actuellement de considérer AES-128, AES-192 et AES-256 comme utilisables.

C’est pourquoi le Web n’est pas en train de remplacer chaque composant de TLS.

Il remplace d’abord **la cryptographie asymétrique la plus exposée**.

## ML-KEM n’est pas un « chiffrement quantique »

La cryptographie post-quantique peut donner une impression trompeuse : celle qu’il faudrait un ordinateur quantique pour l’utiliser.

C’est exactement l’inverse.

ML-KEM fonctionne sur les processeurs ordinaires qui équipent déjà téléphones, serveurs et ordinateurs.

Il est dit *post-quantique* parce que le problème mathématique sur lequel repose sa sécurité n’a pas, à notre connaissance, d’algorithme classique **ou quantique** efficace comparable à Shor.

ML-KEM signifie **Module-Lattice-Based Key-Encapsulation Mechanism**. Il dérive de CRYSTALS-Kyber et sa sécurité est liée à des problèmes de type *Module Learning With Errors* : très schématiquement, on manipule des structures algébriques de haute dimension auxquelles est ajouté un bruit soigneusement choisi. Retrouver l’information secrète à partir des données publiques devient un problème mathématique extrêmement difficile.

Le NIST a standardisé trois ensembles de paramètres :

- ML-KEM-512 ;
- ML-KEM-768 ;
- ML-KEM-1024.

ML-KEM-768 est celui que l’on rencontre aujourd’hui dans le principal mécanisme hybride du Web.

Et contrairement à son nom parfois simplifié dans les interfaces ou articles, ML-KEM n’est pas directement le chiffrement de ta page Web.

Son travail intervient **avant**.

Il permet à deux machines de fabriquer un secret commun.

Ce secret sera ensuite utilisé par TLS pour dériver les vraies clés symétriques qui chiffreront les données.

## Pourquoi `X25519MLKEM768` contient encore X25519

Un nom comme `X25519MLKEM768` paraît presque contradictoire.

X25519 est précisément un mécanisme classique vulnérable à un futur ordinateur quantique. Pourquoi le conserver dans une solution censée préparer l’après-quantique ?

Parce que le Web ne fait pas encore entièrement confiance à une seule nouvelle primitive.

`X25519MLKEM768` est un **accord de clé hybride** :

```

```

```
X25519
   +
ML-KEM-768
   ↓
secret hybride
   ↓
TLS 1.3 / HKDF
   ↓
clés de trafic
```

Les deux mécanismes produisent chacun un secret. La RFC 10024 spécifie leur combinaison avant que TLS 1.3 dérive ses clés finales. Pour `X25519MLKEM768`, on obtient deux secrets de 32 octets, soit 64 octets combinés. 

L’intérêt est une forme de défense en profondeur.

Si une faiblesse inattendue est découverte demain dans ML-KEM mais que X25519 reste intact face aux ordinateurs classiques actuels, la migration n’a pas rendu TLS plus faible aujourd’hui.

À l’inverse, si un ordinateur quantique finit par casser X25519 mais que ML-KEM tient, la confidentialité future de la session reste protégée.

La définition de l’hybridation retenue par l’IETF vise précisément à conserver la sécurité tant qu’au moins l’un des composants résiste, sous les hypothèses du combinateur utilisé. 

Le Web ne saute donc pas d’un vieux système vers un nouveau en espérant que tout ira bien.

Il fait fonctionner les deux en parallèle.

## La protection post-quantique prend beaucoup plus de place

Cette prudence a un prix extrêmement concret : les octets.

Une clé publique éphémère X25519 ne représente que 32 octets.

Dans `X25519MLKEM768`, le `key_share` envoyé par le client contient :

-   
1 184 octets pour la clé d’encapsulation ML-KEM-768 ;  

-   
32 octets pour X25519.  


Soit **1 216 octets**.

La réponse du serveur contient de son côté :

-   
1 088 octets de ciphertext ML-KEM ;  

-   
32 octets de X25519.  


Soit **1 120 octets**. 

Ce n’est pas un détail.

Un handshake beaucoup plus volumineux peut révéler des équipements réseau qui avaient implicitement supposé qu’un `ClientHello` TLS resterait petit.

C’est exactement ce qui s’est produit lorsque Chrome a commencé à généraliser ses premiers échanges hybrides : certains pare-feu, middleboxes et équipements TLS se comportaient mal face aux nouveaux messages. OpenSSL avertit encore que le `ClientHello` plus volumineux de `X25519MLKEM768` peut provoquer des échecs ou des timeouts avec certains équipements incorrectement implémentés. 

Voilà aussi pourquoi cette migration a commencé des années avant d'être indispensable.

Changer une primitive cryptographique sur Internet ne consiste pas seulement à publier un algorithme.

Il faut découvrir tout ce qui casse autour.

## Chrome a transformé l’expérience en comportement par défaut

La chronologie de Chrome montre bien le passage progressif de la recherche à l’infrastructure.

En 2024, Chrome 124 active par défaut sur desktop un échange hybride utilisant une version pré-standard de Kyber.

Puis le NIST finalise FIPS 203.

La version définitive de ML-KEM n’étant pas compatible bit à bit avec le Kyber expérimental, Google abandonne l’ancien code point `0x6399` et bascule Chrome 131 vers le nouveau `X25519MLKEM768`, code point `0x11EC`. 

En 2026, ce n’est plus simplement documenté dans un billet de blog.

Le code courant de Chromium place directement :

```

```

```
X25519MLKEM768
X25519
P-256
P-384
```

dans sa liste de groupes supportés par défaut, avec une `key_share` envoyée pour `X25519MLKEM768`. 

C’est un changement important de statut.

La cryptographie post-quantique n’est plus quelque chose que Chrome « sait éventuellement faire ».

Elle fait partie du chemin normal.

## L’écosystème serveur a suivi

Un navigateur compatible ne suffit évidemment pas.

Pour que l’accord de clé final soit hybride, le serveur doit lui aussi comprendre `X25519MLKEM768`.

Cette condition devient beaucoup moins exceptionnelle qu’il y a quelques années.

Go 1.24, publié en février 2025, a ajouté ML-KEM dans sa bibliothèque standard et activé `X25519MLKEM768` par défaut dans `crypto/tls`. 

OpenSSL 3.5, publié en avril 2025 et devenu une branche LTS, a ajouté ML-KEM, ML-DSA et SLH-DSA. `X25519MLKEM768` figure en tête de sa liste TLS par défaut. 

Cloudflare rapportait dès octobre 2025 que les versions récentes des principaux navigateurs ainsi que des piles comme OpenSSL et Go avaient activé le mécanisme hybride par défaut. En avril 2026, l'entreprise indiquait que plus de **65 % du trafic humain vers son réseau** utilisait déjà un accord de clé post-quantique. 

Puis, en août 2026, un changement plus discret mais symbolique s'est produit : l'IETF a publié la **RFC 10024**.

`X25519MLKEM768` n'est désormais plus seulement une construction largement déployée avant finalisation du processus de standardisation : l'IETF la classe comme groupe recommandé pour TLS 1.3. 

Dans ce cas précis, le déploiement industriel a presque précédé le tampon final du standard.

## Alors mon HTTPS est-il post-quantique ?

Prenons un cas très concret.

Tu utilises un Chrome récent.

Tu visites un domaine servi par Cloudflare en TLS 1.3.

Cloudflare indique que tous les sites et API transitant par son réseau prennent en charge l'accord hybride post-quantique côté visiteur depuis octobre 2022. Avec un client lui-même compatible, le navigateur et l'edge Cloudflare peuvent donc négocier `X25519MLKEM768`. 

À cet instant, **la confidentialité de cette première connexion bénéficie bien d'un secret de session post-quantique hybride**.

Un espion qui enregistre passivement le trafic aujourd'hui ne devrait pas pouvoir simplement attendre l'apparition d'un ordinateur quantique cassant X25519 pour reconstruire la session, à condition bien sûr que ML-KEM résiste comme prévu.

Mais cela ne permet pas encore d'écrire :

> « Ma connexion au site est entièrement post-quantique. »

Car il manque au moins deux questions.

## Le certificat du site est probablement encore classique

TLS ne doit pas seulement créer une clé secrète.

Il doit également résoudre un problème plus fondamental :

**avec qui viens-tu de créer cette clé ?**

C'est le rôle de l'authentification du serveur et de la PKI Web.

Aujourd'hui, un certificat HTTPS classique repose encore généralement sur des signatures RSA ou ECDSA, directement ou quelque part dans sa chaîne de certification.

C'est une faiblesse différente.

Le risque `harvest now, decrypt later` concerne surtout la confidentialité des sessions présentes. Une signature ne chiffre pas les données : l'enregistrer aujourd'hui ne permet pas magiquement de lire le trafic plus tard.

En revanche, une fois qu'un ordinateur quantique cryptographiquement pertinent existe réellement, casser les primitives d'authentification classiques pourrait permettre de fabriquer ou compromettre des identités cryptographiques et d'effectuer des attaques actives.

C'est ici qu'une connexion possédant un accord de clé ML-KEM mais une authentification RSA/ECDSA révèle sa limite.

Elle peut être **résistante au déchiffrement rétrospectif**, tout en n'étant pas encore **entièrement résistante à un adversaire quantique actif**.

Chromium le reconnaît explicitement dans sa feuille de route publiée en février 2026 : le navigateur travaille sur l'authentification post-quantique, mais le processus nécessite plusieurs étapes avant de pouvoir éliminer les autorités et clés classiques. Tant qu'un client accepte encore une voie d'authentification classique, un futur adversaire quantique peut chercher à attaquer cette voie plus faible. 

C'est probablement la distinction la plus importante de toute cette migration :

**post-quantum key exchange ≠ HTTPS entièrement post-quantique.**

## Cloudflare commence seulement maintenant à remplacer les signatures

Le contraste entre les deux migrations est particulièrement visible chez Cloudflare.

L'accord de clé post-quantique existe déjà à grande échelle.

L'authentification post-quantique n'en est qu'au début.

En juillet 2026, Cloudflare a annoncé le support de **ML-DSA**, l'algorithme de signature post-quantique défini par le NIST dans FIPS 204, pour certains scénarios d'authentification entre son réseau et les serveurs d'origine. 

Mais sa documentation actuelle est explicite : **l'authentification post-quantique entre le navigateur du visiteur et l'edge Cloudflare reste en développement**. L'entreprise vise désormais 2029 pour une sécurité post-quantique complète de sa gamme, authentification comprise. 

Nous avons donc déjà deux générations cryptographiques superposées dans le même handshake :

```

```

```
Confidentialité de la session
X25519 + ML-KEM-768
        ↓
déjà post-quantique hybride

Authentification du site
RSA / ECDSA / PKI classique
        ↓
encore majoritairement pré-quantique
```

Cette architecture intermédiaire n'est pas une anomalie.

C'est une stratégie.

La confidentialité des données anciennes impose d'agir avant Q-Day. L'authentification, elle, devient catastrophique surtout lorsqu'un attaquant possède effectivement la machine capable de falsifier les identités.

Il était donc rationnel de migrer la première plus tôt.

## Il existe une autre frontière invisible : le CDN

Même cette analyse navigateur ↔ serveur peut être trompeuse.

De très nombreux sites n'établissent pas directement leur connexion TLS avec leur véritable serveur applicatif.

Prenons encore Cloudflare.

Pour une requête non servie depuis le cache, il peut exister au minimum :

```

```

```
Navigateur
    │
    │ TLS A
    ▼
Edge Cloudflare
    │
    │ réseau Cloudflare
    ▼
Infrastructure Cloudflare
    │
    │ TLS B
    ▼
Serveur d'origine
```

Supposons que TLS A utilise `X25519MLKEM768`.

Cela prouve que **la connexion entre ton navigateur et Cloudflare** bénéficie d'un accord hybride.

Cela ne prouve pas automatiquement que TLS B, entre Cloudflare et le serveur réel du site, bénéficie de la même propriété.

Cloudflare prend en charge l'accord post-quantique vers les origines, mais le serveur d'origine doit lui aussi être compatible. Sa documentation distingue explicitement les trois segments et indique que la protection du dernier dépend du support PQC de l'origine. 

C'est une conséquence rarement visible depuis un navigateur :

**le statut post-quantique d'un site n'est pas nécessairement une propriété unique du domaine. C'est une propriété de chaque lien cryptographique traversé par les données.**

Un CDN peut terminer une connexion post-quantique puis ouvrir derrière elle une connexion classique.

La première reste utile : un espion situé entre toi et le CDN ne peut pas simplement stocker cette session pour la casser plus tard.

Mais l'existence éventuelle d'un autre segment classique déplace la surface de collecte.

## Et si le site n'utilise pas Cloudflare ?

Tout dépend alors des deux extrémités.

Un Chrome récent sait proposer `X25519MLKEM768`.

Si le serveur le supporte également, TLS 1.3 peut le sélectionner.

Si le serveur ne le supporte pas, le navigateur dispose toujours de groupes classiques tels que X25519 et la connexion peut retomber sur ceux-ci.

C'est précisément le rôle de l'hybridation et de la négociation : permettre une migration progressive sans rendre immédiatement inaccessibles les milliards de services qui n'ont pas encore migré.

Mais cette compatibilité crée aussi une réalité inconfortable.

**Posséder un navigateur post-quantique ne signifie pas que toutes tes connexions le sont.**

Le serveur compte.

La version TLS compte.

Les éventuels intermédiaires comptent.

Et chaque connexion indépendante compte.

Cloudflare précise par exemple que ses mécanismes post-quantiques sont utilisés sur les protocoles basés sur **TLS 1.3**, HTTP/3 compris. 

## Pourquoi ne pas abandonner X25519 immédiatement ?

On pourrait imaginer une migration beaucoup plus simple :

remplacer X25519 par ML-KEM et ne plus jamais parler de l'ancien système.

Ce serait plus élégant.

Ce serait aussi plus risqué.

Un nouvel algorithme peut souffrir d'une faiblesse mathématique inconnue, mais également d'un simple défaut d'implémentation : fuite temporelle, mauvaise génération aléatoire, erreur de validation ou canal auxiliaire.

L'histoire de Kyber elle-même fournit un rappel utile avec des vulnérabilités d'implémentation comme KyberSlash, qui ont affecté diverses bibliothèques sans pour autant signifier que le principe mathématique de Kyber était cassé. Cloudflare a explicitement cité ce type de risque parmi ses raisons de conserver une construction hybride. 

L'hybridation coûte donc de la bande passante et de la complexité.

Mais elle achète quelque chose de précieux pendant une migration cryptographique : **du temps sans pari irréversible**.

## Le Web avait déjà commencé avant même que le standard soit terminé

C'est peut-être l'aspect le plus inhabituel de cette histoire.

Dans beaucoup de domaines, on imagine la séquence suivante :

```

```

```
recherche
→ standard
→ implémentation
→ déploiement
```

Ici, la chronologie s'est en partie superposée.

Chrome et Cloudflare testaient déjà Kyber sur du trafic réel alors que sa normalisation n'était pas terminée.

Le NIST a publié FIPS 203 en août 2024.

Chrome a ensuite remplacé la variante expérimentale par ML-KEM.

Go et OpenSSL l'ont intégré dans leurs valeurs par défaut en 2025.

La majorité du trafic humain mesuré par Cloudflare a franchi le seuil post-quantique la même année.

Et l'IETF n'a publié la RFC 10024 qui normalise officiellement les groupes hybrides TLS qu'en **août 2026**. 

Le standard n'a pas précédé toute expérience opérationnelle.

Il a aussi bénéficié de celle-ci.

Les problèmes de middleboxes, les tailles de messages, le comportement réel des implémentations et les incompatibilités ont été découverts sur un Internet où la primitive était déjà utilisée.

C'est moins propre qu'un basculement théorique.

C'est probablement plus réaliste pour une infrastructure de cette taille.

## Le cadenas ne raconte désormais qu'une partie de l'histoire

Pendant longtemps, l'utilisateur pouvait raisonnablement réduire TLS à deux questions :

le site utilise-t-il HTTPS ?

Le certificat est-il valide ?

La migration post-quantique rend cette représentation insuffisante.

Deux connexions affichant exactement la même interface de navigateur peuvent désormais présenter des garanties différentes.

L'une peut utiliser :

```

```

```
TLS 1.3
X25519
ECDSA
AES-GCM
```

et l'autre :

```

```

```
TLS 1.3
X25519MLKEM768
ECDSA
AES-GCM
```

À l'écran, presque rien ne change.

Pour un attaquant classique aujourd'hui, les deux peuvent être extrêmement robustes.

Pour un adversaire hypothétique qui enregistrerait les sessions afin de disposer plus tard d'un ordinateur quantique, elles ne sont pourtant pas équivalentes.

La seconde connexion contient déjà une primitive destinée précisément à faire échouer cette stratégie.

## En 2026, « post-quantique » doit donc être qualifié

Dire qu'un site est simplement « quantique-safe » masque trop d'informations.

Une description techniquement correcte devrait préciser **quoi** est post-quantique.

Pour une connexion HTTPS moderne, quatre questions suffisent :

1.   
l'accord de clé utilise-t-il `X25519MLKEM768` ou un autre mécanisme PQ ?  

2.   
l'authentification du serveur utilise-t-elle encore RSA/ECDSA ou une signature post-quantique ?  

3.   
existe-t-il un CDN ou proxy TLS qui coupe la connexion en plusieurs segments ?  

4.   
les segments suivants jusqu'au serveur d'origine utilisent-ils eux aussi un accord post-quantique ?  


C'est seulement lorsque l'ensemble des réponses importantes devient post-quantique que l'expression « connexion entièrement post-quantique » commence à être défendable.

Et nous n'en sommes pas encore là sur le Web public.

## Ce qui est réellement protégé aujourd'hui

La réponse à la question initiale est finalement assez précise.

**Quand tu ouvres un site en 2026 avec un navigateur récent, le contenu de ta connexion peut déjà bénéficier d'une protection post-quantique contre le déchiffrement futur si le serveur négocie** `X25519MLKEM768`**.**

Chrome le propose par défaut. Les piles serveur majeures savent désormais le faire. Cloudflare l'active à grande échelle. L'IETF l'a formellement standardisé en août 2026. 

Les données sont ensuite transportées avec des algorithmes symétriques comme AES-GCM ou ChaCha20-Poly1305, qui ne souffrent pas de la rupture structurelle que Shor inflige à RSA et ECC. 

Mais **l'identité cryptographique du serveur reste généralement ancrée dans une PKI classique**, et tous les segments derrière un CDN ne sont pas nécessairement post-quantiques.

Le Web de 2026 est donc dans un état beaucoup plus étrange qu'un simple « avant/après ».

Il utilise déjà la cryptographie du futur pour protéger les secrets du présent, tout en continuant à faire confiance à une infrastructure d'identité conçue pour l'ancien monde.

La transition post-quantique n'arrivera pas le jour où apparaîtra l'ordinateur capable de casser RSA.

**Elle a déjà commencé et pour une partie de ton trafic, elle est déjà terminée.**