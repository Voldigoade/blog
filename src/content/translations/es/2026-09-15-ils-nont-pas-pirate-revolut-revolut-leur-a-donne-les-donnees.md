---
title: No piratearon Revolut. Revolut les dio los datos
description: 'Estafadores obtuvieron los expedientes de cientos de clientes de Revolut sin penetrar sus servidores. El incidente revela una falla más profunda: ¿qué ocurre cuando el canal destinado a autenticar al propio Estado ya no puede considerarse fiable?'
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
coverAlt: Una falsa solicitud gubernamental autenticada lleva a un banco a transmitir datos sensibles de clientes.
author: Voldigoade
locale: es
sourceSlug: 2026-09-15-ils-nont-pas-pirate-revolut-revolut-leur-a-donne-les-donnees
sourceHash: d77c01908564eee835e125fb7c9d9f79aa754148bedd541196153d018ffb3515
manual: false
---

No hizo falta explotar una vulnerabilidad zero-day. No hubo necesidad de inyectar código en un servidor, eludir un firewall o exfiltrar clandestinamente una base de datos.

Los estafadores pidieron la información.

Y Revolut se la proporcionó.

El 12 de septiembre de 2026, la fintech británica confirmó haber transmitido datos sensibles a un tercero no autorizado tras recibir solicitudes fraudulentas procedentes de un **dominio de correo electrónico perteneciente realmente a una agencia gubernamental**. Revolut afirma que sus propios sistemas no fueron comprometidos y que los fondos de los clientes permanecieron intactos.

Tres días después, el *Financial Times* aportaba una cifra: **680 clientes fueron avisados**. Pasaportes, documentos de identidad, direcciones personales e información bancaria figuran entre los datos afectados. La Information Commissioner's Office británica examina ahora el incidente.

A primera vista, 680 víctimas sobre unos 80 millones de clientes pueden parecer casi anecdóticas.

Sería mirar el número equivocado.

## Una fuga de 680 expedientes puede ser peor que una fuga de 680 000 direcciones de correo

No todos los datos personales valen lo mismo.

Las notificaciones recibidas por algunos clientes indican que la información potencialmente transmitida podía comprender el nombre, la fecha de nacimiento, la dirección postal y electrónica, el número de teléfono, copias de pasaporte o permiso de conducir, el selfie de verificación de identidad, extractos de cuenta, IBAN, retiradas e historial de transacciones incluyendo operaciones en Bitcoin para ciertos usuarios.

Es una combinación particularmente sensible porque reúne información habitualmente separada.

Un atacante ya no posee solo tu dirección de correo. Puede potencialmente saber **quién eres jurídicamente, qué aspecto tienes, dónde vives, dónde guardas tu dinero y cómo lo usas**.

Eso transforma un expediente KYC en material ideal para un fraude extremadamente personalizado.

![](/blog/images/posts/7a3529fd-9704-40c3-b765-9411e7c16e80.png)

Un falso asesor bancario que conoce tus últimas transacciones parece más creíble. Un intento de recuperación de cuenta usando tu documento de identidad se vuelve más serio. Para un tenedor importante de criptomonedas, la asociación entre identidad física, domicilio e historial financiero añade incluso una dimensión de seguridad personal.

Nada prueba por ahora que todos esos ataques secundarios hayan ocurrido efectivamente. Pero el potencial es nettamente superior al de una fuga clásica de contraseñas.

## Los 780 millones de dólares son casi una distracción

Parte de la cobertura mediática se centró en una cifra espectacular: **10 000 bitcoins**, es decir, unos 780 millones de dólares al cambio del momento, habrían sido reclamados por individuos que se presentaban como autores de la operación.

Esta reivindicación debe seguir siendo exactamente lo que es: **una reivindicación**.

Revolut no ha autenticado públicamente la demanda de rescate, y todas las afirmaciones de quienes reivindican el ataque no han sido verificadas independientemente.

El monto atrae clics. Casi no explica nada.

La información realmente importante está en otra parte: alguien descubrió que podía transformar **la infraestructura de confianza de una administración en identificador de acceso a los datos de una empresa privada**.

Y esa técnica ni siquiera es nueva.

## El FBI había descrito casi exactamente este escenario en 2024

![image.png](/blog/images/posts/image-1.png)

El 4 de noviembre de 2024, el FBI publicaba una alerta bastante notable.

Su título: *Easy Access to Information for Conducting Fraudulent Emergency Data Requests Impacts US-Based Companies and Law Enforcement Agencies*.

La agencia advertía que cibercriminales comprometían **direcciones de correo electrónico gubernamentales estadounidenses y extranjeras**, y luego las usaban para enviar a empresas falsas solicitudes urgentes de datos personales.

El FBI citaba notablemente el uso anterior de este procedimiento por Lapsus$ et signalait l’apparition, sur des forums criminels, de ventes de comptes gouvernementaux compromis et de services permettant de produire de fausses demandes officielles. 

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