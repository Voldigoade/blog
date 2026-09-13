---
title: Internet change déjà ses serrures pour résister aux ordinateurs quantiques
description: Les ordinateurs quantiques capables de casser notre cryptographie
  n’existent pas encore. Pourtant, une partie du Web prépare déjà leur arrivée.
  Et ce n’est pas de la science-fiction.
pubDate: 2026-09-13
draft: false
featured: false
section: computing
contentType: article
tags:
  - cryptographie
  - informatique
  - informatique quantique
  - cybersécurité
  - HTTPS
  - web
  - sécurité
coverImage: /blog/images/posts/68974f6a-7fbc-457d-bd8d-ebaf89c49a16.png
coverAlt: Un cadenas numérique protégé par une nouvelle couche cryptographique
  face à un ordinateur quantique.
author: Voldigoade
---
Une partie d’Internet est en train de remplacer ses serrures **avant même que le voleur capable de les ouvrir existe**.

Aujourd’hui, lorsque tu te connectes à un site en HTTPS, effectues un paiement ou échanges des données sensibles, une partie de la sécurité repose sur des problèmes mathématiques extrêmement difficiles à résoudre avec nos ordinateurs classiques.

Le problème, c’est qu’un ordinateur quantique suffisamment puissant ne jouerait pas avec les mêmes règles.

## Le danger n’est pas l’ordinateur quantique de 2026

Les machines quantiques actuelles sont très loin de pouvoir simplement « casser Internet ». Pour briser à grande échelle des systèmes comme RSA ou certaines cryptographies à courbes elliptiques, il faudrait des ordinateurs quantiques tolérants aux erreurs beaucoup plus puissants que ceux disponibles aujourd’hui.

Mais attendre qu’ils existent serait une très mauvaise stratégie.

Des données chiffrées peuvent être **interceptées aujourd’hui, conservées pendant des années, puis déchiffrées plus tard** si la technologie devient suffisamment puissante. C’est ce qu’on appelle souvent *harvest now, decrypt later*.

Autrement dit : un secret volé en 2026 peut encore avoir de la valeur en 2036.

## La cryptographie post-quantique existe déjà

Le NIST américain a standardisé en 2024 plusieurs algorithmes conçus pour résister aussi bien aux ordinateurs classiques qu’aux futurs ordinateurs quantiques, notamment **ML-KEM** pour l’établissement de clés et **ML-DSA** pour les signatures numériques. En 2026, l’organisme considère désormais que la migration doit commencer. 

Et cette transition commence à toucher le Web réel.

Chrome travaille par exemple sur une feuille de route pour rendre l’authentification HTTPS résistante aux attaques quantiques. Google expérimente également une nouvelle architecture de certificats appelée **Merkle Tree Certificates**, notamment avec Cloudflare, afin d’éviter que les protections post-quantiques ne rendent les connexions beaucoup plus lourdes. 

Le plus fascinant n’est donc pas qu’un ordinateur quantique puisse un jour menacer Internet.

C’est que **la défense contre cette machine hypothétique est déjà en train d’être déployée**.

Et si la transition réussit correctement, le jour où des ordinateurs quantiques réellement dangereux apparaîtront, la majorité des utilisateurs ne remarqueront peut-être absolument rien.