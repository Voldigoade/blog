---
title: Cómo un ordenador cuántico podría romper RSA sin "probar todas las contraseñas"
description: 'A menudo se repite que un ordenador cuántico puede romper una parte de nuestra criptografía. Pero, ¿cómo exactamente? El verdadero peligro no viene de una máquina absurdamente rápida: viene de un algoritmo que cambia completamente la forma de atacar el problema.'
pubDate: 2026-09-13
draft: false
featured: false
section: computing
contentType: article
tags:
  - informatique quantique
  - cryptographie
  - RSA
  - algorithme de Shor
  - cybersécurité
  - HTTPS
series:
  id: internet-face-au-quantique
  order: 2
  title: Internet frente al cuántico
coverImage: /blog/images/posts/8c6ab339-ddae-4116-b264-2455d5ef0f4d.png
coverAlt: Representación de un ordenador cuántico que analiza la estructura matemática de una clave RSA.
author: Voldigoade
locale: es
sourceSlug: 2026-09-13-comment-un-ordinateur-quantique-pourrait-casser-rsa-sans-essayer-tous-les-mots-de-passe
sourceHash: 4d8d5f383ebda170a015f984fd59be61dec51ec51c0c756f3cca874ae25c146c
manual: false
---

Dicir que un ordenador cuántico puede "combinar RSA" da fácilmente una mala imagen del problema.

Podríamos imaginar una máquina tan poderosa que intentaría miles de millones de claves hasta encontrar la correcta.

No es eso.

El verdadero problema es mucho más interesante: **Un ordenador cuántico lo suficientemente avanzado podría utilizar un método matemático que nuestros ordenadores clásicos no saben explotar de manera eficiente.**

Y todo se basa en una debilidad voluntariamente elegida hace casi cincuenta años.

## RSA protege un secreto con un problema fácil en un sentido, difícil en el otro

Tomemos dos primeros números:

`61 × 53 = 3233`

La multiplicación es trivial.

Pero ahora imaginemos que solo te damos:

`3233`

y que te pido:

> ¿Cuáles son los primeros números que se multiplicaron para obtener este resultado?

Con un número tan pequeño, encontrarás rápidamente `61` y `53`.

RSA aplica esencialmente la misma idea, pero con números gigantescos.

Una clave RSA moderna puede utilizar un módulo de **2048 bits**Un número que tiene aproximadamente **617 cifras decimales**.

Multiplicar los dos grandes primeros números que lo componen es fácil para un ordenador.

Encontrar estos factores a partir del resultado es, con los mejores métodos clásicos conocidos, extremadamente difícil cuando los parámetros se seleccionan correctamente.

Es este desequilibrio que hace que RSA sea útil.

No porque la factorización es imposible.

Porque se considera como **Impraticable a la escala necesaria** con nuestros ordenadores clásicos.

## Entonces Peter Shor llega

En 1994, el matemático Peter Shor publicó un algoritmo para los ordenadores cuánticos.

Y este algoritmo cambia radicalmente el problema.

El algoritmo de Shor permite, en teoría, factorizar efectivamente grandes números en un ordenador cuántico lo suficientemente potente.

No se trata de probar cada combinación una por una.

Transforma la factorización en otro problema: **Encontrar el período de una función matemática**.

Es precisamente en esta etapa que interviene la mecánica cuántica.

Un ordenador clásico manipula los bits que valen `0` o `1`.

Un ordenador cuántico manipula **Los qubits**, cuyo estado puede ser una superposición de varias posibilidades. Pero tenga cuidado con la abreviatura frecuente: esto no significa que un ordenador cuántico “teste todas las respuestas al mismo tiempo y lea la correcta”.

Si fuera tan sencillo, prácticamente todos los problemas informáticos se convertirían instantáneamente en fáciles.

Lo que hace que Shor sea más potente es mucho más sutil.

El algoritmo prepara un estado cuántico que contiene una estructura matemática particular, y luego utiliza la **Transformación de Fourier Quántico** para mostrar la periodicidad buscada. Una medida luego permite obtener suficiente información para reconstruir este período.

Y este período puede conducir a los factores del número.

Simplificando enormemente:

```text

Grand nombre composé

        ↓

construction d'un problème périodique

        ↓

calcul quantique

        ↓

détection de la période

        ↓

calcul classique

        ↓

facteurs premiers

```

Por lo tanto, la criptografía no es derrotada por más fuerza bruta.

**Evita la dificultad en la que se encontraba.**

## ¿Por qué amenaza RSA?

En RSA, la clave pública puede ser conocida por todo el mundo.

Eso es incluso su papel.

Lo que debe permanecer inaccesible es la clave privada.

Pero los parámetros públicos contienen un número construido a partir de dos grandes números secretos. Si un atacante consigue factorizar eficazmente este número, puede encontrar la información necesaria para reconstruir la llave privada.

A partir de ahí, según el uso de RSA, las consecuencias pueden convertirse en graves: falsificación de firmas, compromisos de mecanismos de autenticación o desciframiento de datos cuando el protocolo depende directamente de la RSA.

Es por eso que la llegada posible de un ordenador cuántico **Criptográficamente relevante** lo suficientemente fiable y potente para ejecutar este tipo de ataque a una escala útil constituye un problema de ciberseguridad real.

El NIST considera explícitamente RSA y varios sistemas basados en curvas elípticas como vulnerables a este futuro modelo de cálculo y organiza su sustitución progresiva por estándares post-quánticos. El objetivo actual de los Estados Unidos es retirar gradualmente de los estándares los algoritmos vulnerables de aquí **2035**Los sistemas más sensibles deben migrar más temprano. 

## ¿Por qué nadie ha roto RSA-2048 con un ordenador cuántico?

Porque entre **“El algoritmo existe”** y **“Tenemos la máquina capaz de hacerlo”**Hay un agujero.

Los quebts actuales son fragiles.

Son muy sensibles al ruido y a los errores. Cuanto más largo y complejo se convierte un cálculo cuántico, más difícil es mantener la información correctamente.

La solución prevista es la **Corrección de errores cuánticos** Utilizar muchos qubits físicos imperfectos para construir un menor número de qubitos *Lógica*lo suficiente para realizar largos cálculos.

Esto aumenta considerablemente el material necesario.

Por lo tanto, los pequeños ordenadores cuánticos experimentales de hoy no pueden simplemente recibir una llave RSA-2048 y romperla unos segundos después.

El Nico habla de uno de los **CRQC**, *Criptográficamente relevante cuántico computador* Un ordenador cuántico lo suficientemente potente para atacar realmente los sistemas criptográficos actualmente utilizados. El momento en que una máquina de este tipo existirá sigue siendo desconocido. 

## Y no es sólo RSA

RSA es una excelente manera de entender el problema, pero Shor también amenaza con otra familia fundamental de la criptografía moderna: los **Curvas elípticas**.

Se encuentran principalmente en sistemas de firmas y intercambio de claves.

El problema matemático es diferente de la factorización, pero Shor también sabe resolver eficazmente el problema. **Problemas del logaritmo discreto** sobre el que se basan estos mecanismos.

Es una distinción importante.

Cuando se dice que "el cuántico romperá la cifrado actual", se simplifica enormemente.

No todas las criptografías están afectadas de la misma manera.

Los algoritmos de clave pública como RSA y ECC están especialmente afectados.

Los algoritmos simétricos, como AES, no son destruidos por Shor de esta manera. Otros algoritmos cuánticos, incluido el de Grover, pueden reducir su margen de seguridad, pero aumentar el tamaño de las claves permite compensar mucho más fácilmente el problema.

Por lo tanto, el futuro no consiste en abandonar toda criptografía.

Consiste en que **reemplazar las bases matemáticas**.

## Los sustitutos ya existen.

En 2024, el NIST finalizó sus tres principales estándares de criptografía post-quántica:

- **El ML-KEM**destinado a establecer secretos compartidos;

- **El ML-DSA**para las firmas digitales;

- **El SLH-DSA**, otra familia de firmas basada en funciones de hash.

A diferencia de RSA, sus bases matemáticas son escogidas para resistir los ataques cuánticos conocidos.

El NIST ahora recomienda explícitamente comenzar la migración en lugar de esperar la llegada hipotética de una máquina peligrosa. 

Chrome ya ha lanzado un intercambio de claves híbridas post-quántico para ciertas conexiones TLS compatibles. Y Chromium ahora prepara la parte mucho más compleja: hacer también **autenticación de los certificados HTTPS** Resistente al cuántico. 

Es por eso que esta transición comienza años antes de la supuesta aparición de la amenaza.

Una infraestructura de criptografía global no se reemplaza presionando un botón.

Hay que modificar navegadores, servidores, bibliotecas, sistemas operativos, dispositivos embarcados, autoridades de certificación, protocolos y software a veces destinados a permanecer activos durante décadas.

El ordenador capaz de romper RSA-2048 puede no existir todavía.

**El algoritmo que explica cómo podría hacerlo, él, existe desde 1994.**

Es esa diferencia que obliga a Internet a preparar su defensa ahora.

