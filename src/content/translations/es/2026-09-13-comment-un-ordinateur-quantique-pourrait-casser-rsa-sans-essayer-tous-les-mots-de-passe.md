---
title: Cómo un ordenador cuántico podría romper RSA sin « probar todas las contraseñas »
description: 'A menudo se repite que un ordenador cuántico podrá romper parte de nuestra criptografía. Pero ¿cómo, exactamente? El verdadero peligro no proviene de una máquina absurdamente rápida: proviene de un algoritmo que cambia completamente la manera de atacar el problema.'
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
  title: Internet frente a lo cuántico
coverImage: /blog/images/posts/8c6ab339-ddae-4116-b264-2455d5ef0f4d.png
coverAlt: Representación de un ordenador cuántico analizando la estructura matemática de una clave RSA.
author: Voldigoade
locale: es
sourceSlug: 2026-09-13-comment-un-ordinateur-quantique-pourrait-casser-rsa-sans-essayer-tous-les-mots-de-passe
sourceHash: 4d8d5f383ebda170a015f984fd59be61dec51ec51c0c756f3cca874ae25c146c
manual: false
---

Decir que un ordenador cuántico podrá « romper RSA » da fácilmente una imagen errónea del problema.

Se podría imaginar una máquina tan potente que probaría miles de millones de miles de millones de claves hasta encontrar la correcta.

No es eso.

El verdadero problema es mucho más interesante: **un ordenador cuántico lo suficientemente avanzado podría utilizar un método matemático que nuestros ordenadores clásicos no saben explotar eficientemente.**

Y todo se basa en una debilidad elegida deliberadamente hace casi cincuenta años.

## RSA protege un secreto con un problema fácil en un sentido, difícil en el otro

Tomemos dos números primos:

`61 × 53 = 3233`

Hacer la multiplicación es trivial.

Pero imaginemos ahora que te doy solo:

`3233`

y te pregunto:

> ¿Qué números primos se multiplicaron para obtener este resultado?

Con un número tan pequeño, encontrarías rápidamente `61` y `53`.

RSA aplica esencialmente la misma idea, pero con números gigantescos.

Una clave RSA moderna puede usar un módulo de **2048 bits**, es decir, un número que posee aproximadamente **617 cifras decimales**.

Multiplicar los dos grandes números primos que lo componen es fácil para un ordenador.

Recuperar estos factores a partir del resultado es, con los mejores métodos clásicos conocidos, extremadamente difícil cuando los parámetros se eligen correctamente.

Es este desequilibrio lo que hace útil a RSA.

No porque la factorización sea imposible.

Porque se considera **impráctica a la escala requerida** con nuestros ordenadores clásicos.

## Entonces llega Peter Shor

En 1994, el matemático Peter Shor publica un algoritmo destinado a los ordenadores cuánticos.

Y este algoritmo cambia radicalmente el problema.

El algoritmo de Shor permite, en teoría, factorizar eficientemente números grandes en un ordenador cuántico lo suficientemente potente.

Tampoco consiste en probar cada combinación una por una.

Transforma la factorización en otro problema: **encontrar el período de una función matemática**.

Es precisamente en este paso donde interviene la mecánica cuántica.

Un ordenador clásico manipula bits que valen `0` o `1`.

Un ordenador cuántico manipula **qubits**, cuyo estado puede ser una superposición de varias posibilidades. Pero cuidado con el atajo que a menudo se repite: esto no significa que un ordenador cuántico « pruebe todas las respuestas a la vez y lea la correcta ».

Si fuera tan simple, prácticamente todos los problemas informáticos se volverían instantáneamente fáciles.

Lo que hace potente a Shor es mucho más sutil.

El algoritmo prepara un estado cuántico que contiene una estructura matemática particular, luego utiliza notamment la **transformada de Fourier cuántica** para hacer aparecer la periodicidad buscada. Una medida permite luego obtener suficiente información para reconstruir este período.

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

La criptografía no es vencida, pues, por más fuerza bruta.

**Se rodea la dificultad en la que se basaba.**

## Por qué esto amenaza a RSA

En RSA, la clave pública puede ser conocida por todos.

Ese es precisamente su papel.

Lo que debe permanecer inaccesible es la clave privada.

Pero los parámetros públicos contienen un número construido a partir de dos grandes números primos secretos. Si un atacante logra factorizar eficientemente este número, puede recuperar la información necesaria para reconstruir la clave privada.

A partir de ahí, según el uso de RSA, las consecuencias pueden volverse graves: falsificación de firmas, compromiso de mecanismos de autenticación o descifrado de datos cuando el protocolo depende directamente de RSA.

Es por esto que la eventual llegada de un ordenador cuántico **criptográficamente relevante** lo suficientemente fiable y potente para ejecutar este tipo de ataque a una escala útil constituye un problema real de ciberseguridad.

El NIST considera explícitamente RSA así como varios sistemas basados en curvas elípticas como vulnerables a este futuro modelo de computación y organiza su reemplazo progresivo por estándares post-cuánticos. El objetivo actual estadounidense es retirar progresivamente de los estándares los algoritmos vulnerables para **2035**, debiendo migrar antes los sistemas más sensibles.

## Entonces, ¿por qué nadie ha roto aún RSA-2048 con un ordenador cuántico?

Porque entre **« el algoritmo existe »** y **« poseemos la máquina capaz de ejecutarlo »**, hay un abismo.

Los qubits actuales son frágiles.

Son extremadamente sensibles al ruido y a los errores. Cuanto más largo y complejo se vuelve un cálculo cuántico, más difícil resulta mantener correctamente la información.

La solución prevista es la **corrección de errores cuánticos**: usar muchos qubits físicos imperfectos para construir un número menor de qubits llamados *lógicos*, lo suficientemente fiables para realizar cálculos largos.

Pero esto aumenta enormemente el hardware necesario.

Por eso los pequeños ordenadores cuánticos experimentales de hoy no pueden simplemente recibir una clave RSA-2048 y romperla unos segundos después.

El NIST habla además de un **CRQC**, *cryptographically relevant quantum computer*: un ordenador cuántico lo suficientemente potente para atacar realmente los sistemas criptográficos usados actualmente. El momento en que tal máquina existirá sigue siendo desconocido.

## Y no es solo RSA

RSA es una excelente manera de entender el problema, pero Shor amenaza también otra familia fundamental de la criptografía moderna: las **curvas elípticas**.

Se las encuentra notamment en sistemas de firmas e intercambio de claves.

El problema matemático es diferente de la factorización, pero Shor sabe resolver también eficientemente el **problema del logaritmo discreto** en el que se basan estos mecanismos.

Es una distinción importante.

Cuando se dice que « lo cuántico va a romper el cifrado actual », se simplifica enormemente.

No todas las criptografías se ven afectadas de la misma manera.

Los algoritmos de clave pública como RSA y ECC son los particularmente afectados.

Los algoritmos simétricos, como AES, no son destruidos por Shor de esta manera. Otros algoritmos cuánticos, notablemente el de Grover, pueden reducir su margen de seguridad, pero aumentar el tamaño de las claves permite compensar el problema mucho más fácilmente.

El futuro no consiste, pues, en abandonar toda la criptografía.

Consiste en **reemplazar ciertos fundamentos matemáticos**.

## Los reemplazos ya existen

En 2024, el NIST finalizó sus tres primeros estándares mayores de criptografía post-cuántica:

- **ML-KEM**, destinado a establecer secretos compartidos;
- **ML-DSA**, destinado a firmas digitales;
- **SLH-DSA**, otra familia de firmas basada en funciones de hash.

A diferencia de RSA, sus fundamentos matemáticos se eligen para resistir a los ataques cuánticos conocidos.

El NIST recomienda ahora explícitamente comenzar la migración en lugar de esperar la llegada hipotética de una máquina peligrosa.

Chrome incluso ya ha desplegado un intercambio de claves híbrido post-cuántico para ciertas conexiones TLS compatibles. Y Chromium prepara ahora la parte mucho más compleja: hacer también **la autenticación de los certificados HTTPS** resistente a lo cuántico.

He aquí por qué esta transición comienza años antes de la supuesta aparición de la amenaza.

Una infraestructura criptográfica mundial no se reemplaza apretando un botón.

Hay que modificar navegadores, servidores, bibliotecas, sistemas operativos, dispositivos embebidos, autoridades de certificación, protocolos y software a veces destinados a permanecer activos durante décadas.

El ordenador capaz de romper RSA-2048 quizá no exista aún.

**El algoritmo que explica cómo podría hacerlo, ese, existe desde 1994.**

Es esta diferencia la que obliga a Internet a preparar su defensa ahora.
