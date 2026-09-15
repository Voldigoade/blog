---
title: Internet ya está cambiando sus cerraduras para resistir a los ordenadores cuánticos
description: Los ordenadores cuánticos capaces de romper nuestra criptografía aún no existen. Sin embargo, una parte de la Web ya se está preparando para su llegada. Y no es ciencia ficción.
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
  title: Internet frente a lo cuántico
coverImage: /images/posts/68974f6a-7fbc-457d-bd8d-ebaf89c49a16.png
coverAlt: Un candado digital protegido por una nueva capa criptográfica frente a un ordenador cuántico.
author: Voldigoade
locale: es
sourceSlug: 2026-09-13-internet-change-deja-ses-serrures-pour-resister-aux-ordinateurs-quantiques
sourceHash: ed5c2113cfa1343e06de20d8b11ff1fabd554e74e5f8bf8f8655cfa815b16ad5
manual: false
---

Una parte de Internet está reemplazando sus cerraduras **incluso antes de que exista el ladrón capaz de abrirlas**.

Hoy, cuando te conectas a un sitio en HTTPS, realizas un pago o intercambias datos sensibles, parte de la seguridad se basa en problemas matemáticos extremadamente difíciles de resolver con nuestros ordenadores clásicos.

El problema es que un ordenador cuántico suficientemente potente no jugaría con las mismas reglas.

## El peligro no es el ordenador cuántico de 2026

Las máquinas cuánticas actuales están muy lejos de poder simplemente «romper Internet». Para romper a gran escala sistemas como RSA o ciertas criptografías de curvas elípticas, se necesitarían ordenadores cuánticos tolerantes a fallos mucho más potentes que los disponibles hoy.

Pero esperar a que existan sería una estrategia muy mala.

Los datos cifrados pueden ser **interceptados hoy, conservados durante años y luego descifrados más tarde** si la tecnología se vuelve suficientemente potente. A esto se le suele llamar *harvest now, decrypt later*.

En otras palabras: un secreto robado en 2026 puede seguir teniendo valor en 2036.

## La criptografía post-cuántica ya existe

El NIST estadounidense estandarizó en 2024 varios algoritmos diseñados para resistir tanto a los ordenadores clásicos como a los futuros ordenadores cuánticos, notablemente **ML-KEM** para el establecimiento de claves y **ML-DSA** para las firmas digitales. En 2026, el organismo considera ahora que la migración debe comenzar. 

Y esta transición comienza a tocar la Web real.

Chrome trabaja, por ejemplo, en una hoja de ruta para hacer que la autenticación HTTPS sea resistente a los ataques cuánticos. Google experimenta también una nueva arquitectura de certificados llamada **Merkle Tree Certificates**, notablemente con Cloudflare, para evitar que las protecciones post-cuánticas hagan las conexiones mucho más pesadas. 

Lo más fascinante no es, por tanto, que un ordenador cuántico pueda amenazar Internet algún día.

Es que **la defensa contra esta máquina hipotética ya se está desplegando**.

Y si la transición tiene éxito correctamente, el día en que aparezcan ordenadores cuánticos realmente peligrosos, la mayoría de los usuarios quizás no noten absolutamente nada.