---
title: Internet ya cambia sus cerraduras para resistir a los ordenadores cuánticos
description: Los ordenadores cuánticos capaces de romper nuestra criptografía aún no existen. Sin embargo, una parte de la web ya está preparando su llegada. Y no es ciencia ficción.
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
series:
  id: internet-face-au-quantique
  order: 1
  title: Internet frente al cuántico
coverImage: /blog/images/posts/68974f6a-7fbc-457d-bd8d-ebaf89c49a16.png
coverAlt: Una cadena digital protegida por una nueva capa de criptografía frente a un ordenador cuántico.
author: Voldigoade
locale: es
sourceSlug: 2026-09-13-internet-change-deja-ses-serrures-pour-resister-aux-ordinateurs-quantiques
sourceHash: ed5c2113cfa1343e06de20d8b11ff1fabd554e74e5f8bf8f8655cfa815b16ad5
manual: false
---

Una parte de Internet está reemplazando sus cerraduras **Antes de que el ladrón pueda abrirlos existe**.

Hoy en día, cuando se conecta a un sitio en HTTPS, realiza un pago o intercambio de datos sensibles, una parte de la seguridad se basa en problemas matemáticos extremadamente difíciles de resolver con nuestros ordenadores clásicos.

El problema es que un ordenador cuántico lo suficientemente potente no jugaría con las mismas reglas.

## El peligro no es el ordenador cuántico de 2026

Las máquinas cuánticas actuales están muy lejos de poder simplemente “combinar Internet”. Para romper a gran escala sistemas como RSA o ciertas criptografías de curvas elípticas, se necesitarían ordenadores cuánticos que toleran errores mucho más poderosos que los disponibles hoy en día.

Pero esperar que existan sería una mala estrategia.

Los datos cifrados pueden ser **interceptadas hoy, conservadas durante años y luego descifradas más tarde** La tecnología se vuelve lo suficientemente potente. Esto es lo que a menudo se llama *Harvest Now, decrypt más tarde*.

En otras palabras, un secreto robado en 2026 puede tener valor aún en 2036.

## La criptografía post-quántica ya existe

El NIST ha normalizado en 2024 varios algoritmos diseñados para resistir tanto a los ordenadores clásicos como a los futuros ordenadores cuánticos. **El ML-KEM** para el establecimiento de claves y **El ML-DSA** para las firmas digitales. En 2026, la Organización considera que la migración debe comenzar. 

Y esta transición empieza a tocar la web real.

Por ejemplo, Chrome trabaja en una hoja de ruta para hacer que la autenticación HTTPS sea resistente a los ataques cuánticos. Google también experimenta una nueva arquitectura de certificados llamada **Certificaciones de Mercle Tree**, especialmente con Cloudflare, para evitar que las protecciones post-quánticas hacen que las conexiones sean mucho más pesadas. 

Lo más fascinante, por lo tanto, no es que un ordenador cuántico pueda un día amenazar a Internet.

Es que **La defensa contra esta máquina hipotética ya está en marcha**.

Y si la transición sucede correctamente, el día en que aparecen los ordenadores cuánticos realmente peligrosos, la mayoría de los usuarios tal vez no notará absolutamente nada.