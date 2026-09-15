---
title: 'La Web ya es parcialmente postcuántica: esto es lo que realmente resiste en 2026'
description: Chrome, Cloudflare y las principales pilas TLS ya protegen parte de tus conexiones contra futuros ordenadores cuánticos. Pero el intercambio de claves, el cifrado, los certificados y el trayecto hasta el servidor de origen no están en la misma etapa.
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
coverAlt: Un navegador se comunica con un CDN y luego un servidor de origen, con solo ciertas porciones de la conexión representadas como protegidas por criptografía postcuántica.
author: Voldigoade
news: false
seoTitle: 'TLS post-quantique en 2026 : ce qui protège déjà réellement le Web'
seoDescription: Chrome et Cloudflare utilisent déjà ML-KEM dans TLS. Voici exactement quelles parties d’une connexion HTTPS résistent déjà à un futur ordinateur quantique et lesquelles restent vulnérables.
seoTargetQuery: TLS post-quantique 2026
locale: es
sourceSlug: 2026-09-15-le-web-est-deja-partiellement-post-quantique-voici-ce-qui-resiste-vraiment-en-2026
sourceHash: 8a9750813cd32eacb922885cf2f5a415d1f7de7e6b8268fb294b293e8fbf52a0
manual: false
---

Abres un sitio en Chrome. El candado o su equivalente moderno no te indica nada especial. La página se muestra como ayer. Sin embargo, en ciertos casos, unos milisegundos antes, tu navegador acaba de ejecutar una primitiva criptográfica diseñada específicamente para resistir a una máquina que aún no existe.

No a un «ordenador cuántico» en sentido general: esas máquinas ya existen. Lo que falta todavía es un **ordenador cuánticamente relevante criptográficamente**, lo suficientemente grande, fiable y corregido de errores para ejecutar los ataques capaces de romper las claves RSA y las curvas elípticas usadas a escala de Internet.

El paradójico es real: **la amenaza no está operativa todavía, pero su contramedida ya está en producción**.

En agosto de 2024, el NIST finalizó ML-KEM en la norma FIPS 203. Chrome había empezado antes con una versión preestándar de Kyber; pasó a la versión normalizada ML-KEM con Chrome 131. OpenSSL 3.5 y Go 1.24 lo activan por defecto en TLS. Cloudflare afirma ahora que más del 65 % de su tráfico humano se beneficia de un acuerdo de clave postcuántico. Y desde agosto de 2026, la IETF ha inscrito oficialmente `X25519MLKEM768` en una RFC Standards Track: la [RFC 10024].

La Web postcuántica ya no es, pues, un proyecto de laboratorio.

Pero existe una trampa en esta formulación: **una conexión puede ser postcuántica en un punto y perfectamente clásica en otro**.

Y es ahí donde la situación se vuelve mucho más interesante.

## La respuesta corta: ¿qué resiste ya cuando abres un sitio?

En septiembre de 2026, una conexión HTTPS moderna puede desglosarse grosso modo en tres ladrillos criptográficos.


| Parte de TLS | Rol | Situación típica en 2026 |
| ---------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| Cifrado simétrico | Cifra los datos una vez establecida la sesión | Ya considerado resistente a los ataques cuánticos conocidos a esta escala |
| Acuerdo de clave | Crea el secreto usado para cifrar la sesión | **Puede ser ya postcuántico**, notablemente con `X25519MLKEM768` |
| Autenticación | Prueba que el servidor es realmente el sitio pedido | **Todavía mayoritariamente clásica**, con RSA/ECDSA y una PKI tradicional |


Cloudflare describe explícitamente TLS siguiendo estas tres componentes y considera que la migración urgente atañe sobre todo a las dos últimas: acuerdo de clave y firmas. El cifrado simétrico usado luego para transportar los datos no sufre la misma catástrofe teórica que RSA o ECC frente al algoritmo de Shor.

En otras palabras, cuando un sitio negocia `X25519MLKEM768`, **el secreto de tu sesión ya está protegido contra el escenario principal que preocupa hoy a los criptógrafos: grabar tu conexión ahora para descifrarla más tarde**.

Pero la identidad del servidor, en cambio, generalmente no lo está aún.

Esta distinción explica casi toda la migración actual.

## ¿Por qué proteger datos contra una máquina que no existe todavía?

Supongamos que un actor suficientemente potente intercepta hoy una conexión TLS que usa solo X25519.

No sabe descifrarla. Así que lo graba todo:

- los mensajes TLS;
- los intercambios públicos necesarios para el acuerdo de clave;
- luego la totalidad del tráfico cifrado.

Conserva esos datos.

Dentro de quince años, imaginemos que dispone finalmente de un ordenador cuántico capaz de ejecutar eficientemente el algoritmo de Shor contra Curve25519.

El carácter efímero de la clave X25519 ya no basta. Las informaciones públicas grabadas durante el handshake pueden permitir reconstruir el secreto compartido, luego las claves de tráfico derivadas por TLS, y por tanto volver sobre las comunicaciones archivadas.

Es el principio del **harvest now, decrypt later**: recoger ahora, descifrar más tarde.

Cloudflare cita precisamente esta amenaza como la razón por la que el acuerdo de clave postcuántico debía desplegarse antes incluso de la existencia de un ordenador cuántico capaz de romper TLS.

La lógica temporal es importante.

Una empresa no puede esperar a que el ataque cuántico sea demostrado para empezar su migración si las informaciones transmitidas hoy deben seguir confidenciales durante diez o veinte años.

El problema empieza **antes** del famoso «Q-Day».

## RSA y ECC tienen un problema que AES no tiene

La criptografía pública clásica se apoya en problemas matemáticos supuestamente extremadamente difíciles para los ordenadores ordinarios.

RSA depende de la dificultad de factorizar enteros muy grandes.

ECDH y ECDSA se apoyan en el problema del logaritmo discreto en curvas elípticas.

Para los ordenadores clásicos, los parámetros bien elegidos siguen fuera de alcance.

Un ordenador cuántico suficientemente potente cambia radicalmente la situación con el algoritmo de Shor: esos problemas no se vuelven solo «un poco más fáciles». Su misma estructura permite una aceleración lo bastante importante para volver las familias RSA y ECC inadaptadas a un futuro postcuántico.

AES está en una situación distinta.

El ataque cuántico genérico evocado principalmente contra las claves simétricas es el algoritmo de Grover, que ofrece teóricamente una aceleración cuadrática de la búsqueda exhaustiva, pero sin el colapso espectacular provocado por Shor contra RSA o ECC. El NIST subraya además que los costes prácticos, la dificultad de paralelizar Grover y los enormes recursos cuánticos necesarios hacen que la interpretación ingenua «AES-128 se vuelve simplemente 64 bits» sea demasiado simplista. El NIST sigue considerando actualmente AES-128, AES-192 y AES-256 como utilizables.

Por eso la Web no está reemplazando cada componente de TLS.

Reemplaza primero **la criptografía asimétrica más expuesta**.

## ML-KEM no es un «cifrado cuántico»

La criptografía postcuántica puede dar una impresión engañosa: la de que haría falta un ordenador cuántico para usarla.

Es exactamente lo contrario.

ML-KEM funciona en los procesadores ordinarios que ya equipan teléfonos, servidores y ordenadores.

Se dice *postcuántico* porque el problema matemático en el que reposa su seguridad no tiene, a nuestro conocimiento, algoritmo clásico **ni cuántico** eficiente comparable a Shor.

ML-KEM significa **Module-Lattice-Based Key-Encapsulation Mechanism**. Deriva de CRYSTALS-Kyber y su seguridad está ligada a problemas de tipo *Module Learning With Errors*: muy esquemáticamente, se manipulan estructuras algebraicas de alta dimensión a las que se añade un ruido cuidadosamente elegido. Recuperar la información secreta a partir de los datos públicos se vuelve un problema matemático extremadamente difícil.

El NIST ha normalizado tres conjuntos de parámetros:

- ML-KEM-512;
- ML-KEM-768;
- ML-KEM-1024.

ML-KEM-768 es el que se encuentra hoy en el principal mecanismo híbrido de la Web.

Y a diferencia de su nombre a veces simplificado en interfaces o artículos, ML-KEM no es directamente el cifrado de tu página Web.

Su trabajo interviene **antes**.

Permite a dos máquinas fabricar un secreto común.

Ese secreto será usado luego por TLS para derivar las verdaderas claves simétricas que cifrarán los datos.

## Por qué `X25519MLKEM768` contiene todavía X25519

Un nombre como `X25519MLKEM768` parece casi contradictorio.

X25519 es precisamente un mecanismo clásico vulnerable a un futuro ordenador cuántico. ¿Por qué conservarlo en una solución supuesta preparar el postcuántico?

Porque la Web no confía aún enteramente en una sola nueva primitiva.

`X25519MLKEM768` es un **acuerdo de clave híbrido**:

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

Los dos mecanismos producen cada uno un secreto. La RFC 10024 especifica su combinación antes de que TLS 1.3 derive sus claves finales. Para `X25519MLKEM768`, se obtienen dos secretos de 32 octetos, o sea 64 octetos combinados.

El interés es una forma de defensa en profundidad.

Si se descubre mañana una debilidad inesperada en ML-KEM pero X25519 sigue intacto frente a los ordenadores clásicos actuales, la migración no ha vuelto TLS más débil hoy.

A la inversa, si un ordenador cuántico acaba rompiendo X25519 pero ML-KEM aguanta, la confidencialidad futura de la sesión sigue protegida.

La definición de la hibridación retenida por la IETF apunta precisamente a conservar la seguridad mientras al menos uno de los componentes resista, bajo las hipótesis del combinador usado.

La Web no salta, pues, de un viejo sistema a uno nuevo esperando que todo vaya bien.

Hace funcionar los dos en paralelo.

## La protección postcuántica ocupa mucho más espacio

Esta prudencia tiene un precio extremadamente concreto: los octetos.

Una clave pública efímera X25519 representa solo 32 octetos.

En `X25519MLKEM768`, el `key_share` enviado por el cliente contiene:

-   
1 184 octetos para la clave de encapsulación ML-KEM-768;

-   
32 octetos para X25519.


O sea **1 216 octetos**.

La respuesta del servidor contiene por su lado:

-   
1 088 octetos de ciphertext ML-KEM;

-   
32 octetos de X25519.


O sea **1 120 octetos**.

No es un detalle.

Un handshake mucho más voluminoso puede revelar equipamientos de red que habían supuesto implícitamente que un `ClientHello` TLS seguiría siendo pequeño.

Es exactamente lo que pasó cuando Chrome empezó a generalizar sus primeros intercambios híbridos: ciertos firewalls, middleboxes y equipamientos TLS se comportaban mal ante los nuevos mensajes. OpenSSL advierte todavía que el `ClientHello` más voluminoso de `X25519MLKEM768` puede provocar fallos o timeouts con ciertos equipamientos mal implementados.

He ahí también por qué esta migración empezó años antes de ser indispensable.

Cambiar una primitiva criptográfica en Internet no consiste solo en publicar un algoritmo.

Hay que descubrir todo lo que se rompe alrededor.

## Chrome ha transformado la experiencia en comportamiento por defecto

La cronología de Chrome muestra bien el paso progresivo de la investigación a la infraestructura.

En 2024, Chrome 124 activa por defecto en escritorio un intercambio híbrido usando una versión preestándar de Kyber.

Luego el NIST finaliza FIPS 203.

La versión definitiva de ML-KEM no siendo compatible bit a bit con el Kyber experimental, Google abandona el antiguo code point `0x6399` y pasa Chrome 131 al nuevo `X25519MLKEM768`, code point `0x11EC`.

En 2026, ya no está simplemente documentado en un post de blog.

El código corriente de Chromium coloca directamente:

```

```

```
X25519MLKEM768
X25519
P-256
P-384
```

en su lista de grupos soportados por defecto, con una `key_share` enviada para `X25519MLKEM768`.

Es un cambio importante de estatus.

La criptografía postcuántica ya no es algo que Chrome «sabe eventualmente hacer».

Forma parte del camino normal.

## El ecosistema servidor ha seguido

Un navegador compatible no basta, evidentemente.

Para que el acuerdo de clave final sea híbrido, el servidor debe también entender `X25519MLKEM768`.

Esta condición se vuelve mucho menos excepcional que hace unos años.

Go 1.24, publicado en febrero de 2025, añadió ML-KEM en su biblioteca estándar y activó `X25519MLKEM768` por defecto en `crypto/tls`.

OpenSSL 3.5, publicado en abril de 2025 y convertido en rama LTS, añadió ML-KEM, ML-DSA y SLH-DSA. `X25519MLKEM768` figura en cabeza de su lista TLS por defecto.

Cloudflare reportaba ya en octubre de 2025 que las versiones recientes de los principales navegadores así como pilas como OpenSSL y Go habían activado el mecanismo híbrido por defecto. En abril de 2026, la empresa indicaba que más del **65 % del tráfico humano hacia su red** usaba ya un acuerdo de clave postcuántico.

Luego, en agosto de 2026, un cambio más discreto pero simbólico se produjo: la IETF publicó la **RFC 10024**.

`X25519MLKEM768` ya no es solo una construcción ampliamente desplegada antes de la finalización del proceso de normalización: la IETF la clasifica como grupo recomendado para TLS 1.3.

En este caso preciso, el despliegue industrial ha casi precedido al sello final del estándar.

## ¿Mi HTTPS es, pues, postcuántico?

Tomemos un caso muy concreto.

Usas un Chrome reciente.

Visitas un dominio servido por Cloudflare en TLS 1.3.

Cloudflare indica que todos los sitios y API que transitan por su red admiten el acuerdo híbrido postcuántico lato visitante desde octubre de 2022. Con un cliente compatible, el navegador y el edge Cloudflare pueden negociar `X25519MLKEM768`.

En ese instante, **la confidencialidad de esta primera conexión se beneficia efectivamente de un secreto de sesión híbrido postcuántico**.

Un espía que grabe pasivamente el tráfico hoy no debería poder simplemente esperar la aparición de un ordenador cuántico rompiendo X25519 para reconstruir la sesión, siempre que ML-KEM resista como se prevé.

Pero eso no permite aún escribir:

> «Mi conexión al sitio es enteramente postcuántica.»

Porque faltan al menos dos preguntas.

## El certificado del sitio es probablemente todavía clásico

TLS no debe solo crear una clave secreta.

Debe también resolver un problema más fundamental:

**¿con quién acabas de crear esa clave?**

Es el rol de la autenticación del servidor y de la PKI Web.

Hoy, un certificado HTTPS clásico reposa aún generalmente sobre firmas RSA o ECDSA, directamente o en algún lugar de su cadena de certificación.

Es una debilidad distinta.

El riesgo `harvest now, decrypt later` concierne sobre todo la confidencialidad de las sesiones presentes. Una firma no cifra los datos: grabarla hoy no permite mágicamente leer el tráfico más tarde.

En cambio, una vez que existe realmente un ordenador cuánticamente relevante criptográficamente, romper las primitivas de autenticación clásicas podría permitir fabricar o comprometer identidades criptográficas y efectuar ataques activos.

Es aquí donde una conexión que posee un acuerdo de clave ML-KEM pero una autenticación RSA/ECDSA revela su límite.

Puede ser **resistente al descifrado retrospectivo**, sin ser aún **enteramente resistente a un adversario cuántico activo**.

Chromium lo reconoce explícitamente en su hoja de ruta publicada en febrero de 2026: el navegador trabaja en la autenticación postcuántica, pero el proceso requiere varias etapas antes de poder eliminar las autoridades y claves clásicas. Mientras un cliente acepte aún una vía de autenticación clásica, un futuro adversario cuántico puede buscar atacar esa vía más débil.

Es probablemente la distinción más importante de toda esta migración:

**intercambio de clave postcuántico ≠ HTTPS enteramente postcuántico.**

## Cloudflare empieza solo ahora a reemplazar las firmas

El contraste entre las dos migraciones es particularmente visible en Cloudflare.

El acuerdo de clave postcuántico existe ya a gran escala.

La autenticación postcuántica no está más que al principio.

En julio de 2026, Cloudflare anunció el soporte de **ML-DSA**, el algoritmo de firma postcuántico definido por el NIST en FIPS 204, para ciertos escenarios de autenticación entre su red y los servidores de origen.

Pero su documentación actual es explícita: **la autenticación postcuántica entre el navegador del visitante y el edge Cloudflare sigue en desarrollo**. La empresa apunta ahora a 2029 para una seguridad postcuántica completa de su gama, autenticación incluida.

Tenemos, pues, ya dos generaciones criptográficas superpuestas en el mismo handshake:

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

Esta arquitectura intermedia no es una anomalía.

Es una estrategia.

La confidencialidad de los datos antiguos obliga a actuar antes del Q-Day. La autenticación, en cambio, se vuelve catastrófica sobre todo cuando un atacante posee efectivamente la máquina capaz de falsificar identidades.

Era, pues, racional migrar la primera antes.

## Existe otra frontera invisible: el CDN

Incluso este análisis navegador ↔ servidor puede ser engañoso.

Muy numerosos sitios no establecen directamente su conexión TLS con su verdadero servidor aplicativo.

Tomemos aún Cloudflare.

Para una petición no servida desde la caché, puede existir como mínimo:

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

Supongamos que TLS A usa `X25519MLKEM768`.

Eso prueba que **la conexión entre tu navegador y Cloudflare** se beneficia de un acuerdo híbrido.

No prueba automáticamente que TLS B, entre Cloudflare y el servidor real del sitio, se beneficie de la misma propiedad.

Cloudflare admite el acuerdo postcuántico hacia los orígenes, pero el servidor de origen debe ser también compatible. Su documentación distingue explícitamente los tres segmentos e indica que la protección del último depende del soporte PQC del origen.

Es una consecuencia rara vez visible desde un navegador:

**el estatus postcuántico de un sitio no es necesariamente una propiedad única del dominio. Es una propiedad de cada enlace criptográfico atravesado por los datos.**

Un CDN puede terminar una conexión postcuántica y abrir tras ella una conexión clásica.

La primera sigue siendo útil: un espía situado entre tú y el CDN no puede simplemente almacenar esa sesión para romperla más tarde.

Pero la existencia eventual de otro segmento clásico desplaza la superficie de recogida.

## ¿Y si el sitio no usa Cloudflare?

Todo depende entonces de los dos extremos.

Un Chrome reciente sabe proponer `X25519MLKEM768`.

Si el servidor lo soporta también, TLS 1.3 puede seleccionarlo.

Si el servidor no lo soporta, el navegador dispone siempre de grupos clásicos como X25519 y la conexión puede recaer en esos.

Es precisamente el rol de la hibridación y la negociación: permitir una migración progresiva sin volver inmediatamente inaccesibles los miles de millones de servicios que no han migrado aún.

Pero esa compatibilidad crea también una realidad incómoda.

**Tener un navegador postcuántico no significa que todas tus conexiones lo sean.**

El servidor cuenta.

La versión TLS cuenta.

Los eventuales intermediarios cuentan.

Y cada conexión independiente cuenta.

Cloudflare precisa, por ejemplo, que sus mecanismos postcuánticos se usan en los protocolos basados en **TLS 1.3**, HTTP/3 incluido.

## ¿Por qué no abandonar X25519 inmediatamente?

Se podría imaginar una migración mucho más simple:

reemplazar X25519 por ML-KEM y no hablar nunca más del antiguo sistema.

Sería más elegante.

Sería también más arriesgado.

Un nuevo algoritmo puede sufrir una debilidad matemática desconocida, pero también un simple defecto de implementación: fuga temporal, mala generación aleatoria, error de validación o canal auxiliar.

La historia de Kyber misma da un recordatorio útil con vulnerabilidades de implementación como KyberSlash, que afectaron a diversas bibliotecas sin significar que el principio matemático de Kyber estaba roto. Cloudflare citó explícitamente ese tipo de riesgo entre sus razones para conservar una construcción híbrida.

La hibridación cuesta, pues, ancho de banda y complejidad.

Pero compra algo precioso durante una migración criptográfica: **tiempo sin par irreversible**.

## La Web había empezado antes incluso de que el estándar terminara

Es quizás el aspecto más inusual de esta historia.

En muchos dominios, se imagina la secuencia siguiente:

```

```

```
recherche
→ standard
→ implémentation
→ déploiement
```

Aquí, la cronología se ha superpuesto en parte.

Chrome y Cloudflare probaban ya Kyber en tráfico real mientras su normalización no había terminado.

El NIST publicó FIPS 203 en agosto de 2024.

Chrome sustituyó luego la variante experimental por ML-KEM.

Go y OpenSSL lo integraron en sus valores por defecto en 2025.

La mayoría del tráfico humano medido por Cloudflare franqueó el umbral postcuántico ese mismo año.

Y la IETF no publicó la RFC 10024 que normaliza oficialmente los grupos híbridos TLS hasta **agosto de 2026**.

El estándar no precedió a toda experiencia operacional.

También se benefició de ella.

Los problemas de middleboxes, los tamaños de mensajes, el comportamiento real de las implementaciones y las incompatibilidades se descubrieron en una Internet donde la primitiva ya se usaba.

Es menos limpio que un basculement teórico.

Es probablemente más realista para una infraestructura de este tamaño.

## El candado no cuenta ya más que una parte de la historia

Durante mucho tiempo, el usuario podía reducir razonablemente TLS a dos preguntas:

¿el sitio usa HTTPS?

¿el certificado es válido?

La migración postcuántica vuelve esa representación insuficiente.

Dos conexiones que muestran exactamente la misma interfaz de navegador pueden presentar ahora garantías distintas.

Una puede usar:

```

```

```
TLS 1.3
X25519
ECDSA
AES-GCM
```

y la otra:

```

```

```
TLS 1.3
X25519MLKEM768
ECDSA
AES-GCM
```

En pantalla, casi nada cambia.

Para un atacante clásico hoy, las dos pueden ser extremadamente robustas.

Para un adversario hipotético que grabara las sesiones para disponer más tarde de un ordenador cuántico, no son, sin embargo, equivalentes.

La segunda conexión contiene ya una primitiva destinada precisamente a hacer fallar esa estrategia.

## En 2026, «postcuántico» hay que calificarlo

Decir que un sitio es simplemente «quantum-safe» enmascara demasiada información.

Una descripción técnicamente correcta debería precisar **qué** es postcuántico.

Para una conexión HTTPS moderna, cuatro preguntas bastan:

1.   
¿el acuerdo de clave usa `X25519MLKEM768` u otro mecanismo PQ?

2.   
¿la autenticación del servidor usa aún RSA/ECDSA o una firma postcuántica?

3.   
¿existe un CDN o proxy TLS que corte la conexión en varios segmentos?

4.   
los segmentos siguientes hasta el servidor de origen usan ellos también un acuerdo postcuántico?


Solo cuando el conjunto de respuestas importantes se vuelve postcuántico, la expresión «conexión enteramente postcuántica» empieza a ser defendible.

Y no estamos aún ahí en la Web pública.

## Lo que está realmente protegido hoy

La respuesta a la pregunta inicial es al final bastante precisa.

**Cuando abres un sitio en 2026 con un navegador reciente, el contenido de tu conexión puede beneficiarse ya de una protección postcuántica contra el descifrado futuro si el servidor negocia** `X25519MLKEM768`**.**

Chrome lo propone por defecto. Las pilas servidor mayores saben ahora hacerlo. Cloudflare lo activa a gran escala. La IETF lo normalizó formalmente en agosto de 2026.

Los datos son luego transportados con algoritmos simétricos como AES-GCM o ChaCha20-Poly1305, que no sufren la ruptura estructural que Shor inflige a RSA y ECC.

Pero **la identidad criptográfica del servidor sigue generalmente anclada en una PKI clásica**, y no todos los segmentos detrás de un CDN son necesariamente postcuánticos.

La Web de 2026 está, pues, en un estado mucho más extraño que un simple «antes/después».

Usa ya la criptografía del futuro para proteger los secretos del presente, siguiendo confiando en una infraestructura de identidad diseñada para el mundo antiguo.

La transición postcuántica no llegará el día que aparezca el ordenador capaz de romper RSA.

**Ya ha empezado y, para una parte de tu tráfico, ya ha terminado.**