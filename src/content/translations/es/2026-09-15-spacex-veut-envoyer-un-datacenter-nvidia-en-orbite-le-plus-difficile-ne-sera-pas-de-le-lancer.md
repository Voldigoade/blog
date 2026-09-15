---
title: SpaceX quiere enviar un centro de datos NVIDIA a órbita. Lo más difícil no será lanzarlo
description: 'SpaceX quiere adaptar los sistemas Vera Rubin de NVIDIA a satélites de cómputo que consumen cientos de kilovatios. Detrás del sueño del centro de datos espacial se esconde un problema mucho menos espectacular: evacuar cada vatio de calor en el vacío.'
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: research
tags:
  - SpaceX
  - NVIDIA
  - intelligence artificielle
  - datacenter
  - Starmind
  - spatial
  - Vera Rubin
  - calcul haute performance
coverImage: /images/posts/d75c5e3b-d108-4d03-9c50-45b2c28ec6cc.png
coverAlt: ' Un satélite de cómputo Starmind dotado de grandes superficies solares y radiadores térmicos transporta sistemas de inteligencia artificial en órbita.'
author: Voldigoade
locale: es
sourceSlug: 2026-09-15-spacex-veut-envoyer-un-datacenter-nvidia-en-orbite-le-plus-difficile-ne-sera-pas-de-le-lancer
sourceHash: f06782df1702c61c316f3ce86b1aadca2fdb595d8d110bf2e057d34727c43b28
manual: false
---

Elon Musk afirma estar « muy confiado » en que SpaceX lanzará ordenadores NVIDIA Vera Rubin NVL72 al espacio ya en **2027**.

Esta frase sigue pareciendo una de esos anuncios que se pueden archivar en la categoría « Elon Musk promete algo para el año que viene ».

Salvo que esta vez, detrás del tuit, ya existe una arquitectura.

NVIDIA confirma oficialmente trabajar con SpaceXAI en **Starmind**, una generación de satélites destinada al cómputo de inteligencia artificial y basada en una adaptación espacial de la plataforma Vera Rubin NVL72.

SpaceX incluso publica las dimensiones de su primer concepto AI1: **30 metros de alto una vez desplegado, 75 metros de envergadura, hasta 250 kW de cómputo en punta y 175 kW de media**.

Ya no sería un satélite que embarca unos pocos aceleradores.

Sería un trozo de centro de datos enviado a órbita.

Y, contrariamente a lo que podría sugerir el vacío glaciar que lo rodea, **el problema más difícil quizá no sea enviar allí las GPU**.

Es impedir que esas GPU se cocinen.

## SpaceX ya no oculta realmente su ambición

El proyecto Starmind se apoya en tres recursos que SpaceX cree poder combinar mejor que ningún operador terrestre:

el Sol para la electricidad;

Starship para mover enormes masas;

Starlink y sus enlaces láser para transportar los datos.

SpaceX presenta las órbitas heliosincrónicas como un medio para obtener una exposición solar extremadamente importante, evitando al mismo tiempo las limitaciones terrestres de conexión a la red, compra de terrenos y construcción de centrales eléctricas.

Los resultados del cómputo se devolverían a continuación a través de enlaces ópticos intersatelitales y la infraestructura Starlink.

Sobre el papel, es una idea casi irresistible:

¿por qué seguir construyendo más centrales y centros de datos en la Tierra cuando una gigantesca central nuclear natural de **3,8 × 10²⁶ vatios** ya brilla sobre nosotros?

El problema es lo que ocurre con esa energía tras su uso.

## Casi toda la electricidad acaba en calor

Un procesador no destruye la energía que consume.

Los cientos de kilovatios que entran en un satélite de cómputo acaban casi íntegramente en forma térmica.

En la Tierra, un centro de datos puede transferir ese calor a aire, agua o fluidos que circulan hacia torres de refrigeración.

En el vacío espacial, ninguna masa de aire viene a tocar el radiador.

Por tanto, **no existe convección con el entorno**.

Para rechazar duraderamente el calor, hay que transformarlo principalmente en radiación infrarroja y emitirla hacia el espacio.

Esto parece sutil.

Es en realidad determinante.

## He calculado el orden de magnitud para AI1

Se puede obtener una aproximación simple a partir de la ley de Stefan-Boltzmann:

```
P = εσAT⁴

```

don `P` representa la potencia térmica a evacuar, `A` la superficie radiante, `T` su temperatura absoluta, `ε` su emisividad y `σ` la constante de Stefan-Boltzmann.

Tomemos los **175 kW de carga media anunciados por SpaceX**, un radiador ideal con emisividad de 0,9 y una temperatura de unos 300 K, es decir 27 °C.

Harían falta aproximadamente:

**423 m² de superficie radiante efectiva.**

Para los **250 kW de punta**:

**unos 605 m².**

Aceptando hacer funcionar el radiador a 350 K, es decir unos 77 °C, la ecuación se vuelve más favorable:

- ~229 m² para 175 kW;

- ~326 m² para 250 kW.


Este cálculo es deliberadamente idealizado. No tiene en cuenta, en particular, la energía recibida del Sol y de la Tierra, la geometría real de los radiadores, el transporte de calor desde los procesadores, las bombas, la redundancia ni la orientación.

Da no obstante el buen orden de magnitud.

Un análisis independiente publicado por BCG en agosto estima precisamente que un satélite de solo **100 kW** podría requerir unos **400 m² de radiadores** con las tecnologías consideradas actualmente.

El problema no es, por tanto, en absoluto teórico.

## SpaceX lo reconocía ella misma antes de hablar de « refrigeración superior »

La página de marketing actual de Starmind presenta el vacío como permitiendo una disipación térmica eficiente sin los chillers y torres de refrigeración terrestres.

Pero los propios documentos regulatorios de SpaceX ofrecen una formulación mucho menos cómoda.

En su expediente depositado ante la SEC, la empresa explica que los satélites de cómputo IA necesitarán paneles solares significativamente más grandes **y radiadores « substantially larger » para la gestión térmica**.

Las dos afirmaciones no son necesariamente contradictorias.

La refrigeración radiante no consume la electricidad de un inmenso sistema de aire acondicionado.

Pero ahorrar energía no significa ahorrar **superficie, masa y complejidad**.

Es precisamente uno de los lugares donde el eslogan « el espacio es frío » destruye más comprensión de la que aporta.

## Y las primeras GPU de IA ya están allá arriba

SpaceX ni siquiera será la primera empresa en colocar una GPU moderna destinada a la IA en órbita.

En noviembre de 2025, la startup Starcloud lanzó **Starcloud-1**, llevando un NVIDIA H100.

El mes siguiente, el satélite ejecutó una versión de Gemini y entrenó nanoGPT, un pequeño modelo de lenguaje desarrollado a partir del trabajo de Andrej Karpathy.

Esto no transforma obviamente Starcloud-1 en un hiperscaler orbital.

Pero cambia la pregunta.

La factibilidad fundamental de hacer funcionar cómputo acelerado moderno en el espacio empieza a salir del dominio puramente teórico.

El reto de SpaceX es ahora **el paso de la experiencia a la industria**.

## Google ya trabaja en un enfoque diferente

Google desarrolla por su lado **Project Suncatcher**.

El concepto consiste en equipar satélites con TPU y unirlos mediante comunicaciones ópticas lo bastante rápidas para construir progresivamente una infraestructura de cómputo distribuida.

Google ya ha realizado pruebas de resistencia a la radiación en sus TPU y prevé, con Planet, dos satélites prototipo a principios de **2027**.

Ya no observamos, por tanto, una excentricidad aislada de Elon Musk.

Varios actores empiezan a explorar seriamente el cómputo orbital.

La pregunta se convierte en: **¿qué cómputos tienen realmente interés en abandonar la Tierra?**

## El peor candidato podría ser aquel en el que todos piensan

La imagen intuitiva es la de un gigantesco modelo frontier entrenado en una constelación de satélites.

Es precisamente la aplicación más difícil.

El entrenamiento distribuido de modelos gigantes depende de intercambios extremadamente rápidos y frecuentes entre aceleradores. Los clusters terrestres dedican una cantidad gigantesca de ingeniería a mantener las GPU muy cercanas unas de otras sobre interconexiones de muy alta banda ancha.

Separa esos aceleradores entre numerosos satélites y la red se convierte en parte del problema informático mismo.

Un análisis publicado en julio sobre los costes y límites de red del cómputo IA espacial concluye que **la inferencia en órbita puede volverse realista**, mientras que el entrenamiento de modelos frontier parece mucho menos competitivo frente a los centros de datos terrestres a causa de la topología de red.

BCG llega a una conclusión similar: las instalaciones orbitales pueden tener sentido para ciertas cargas de trabajo, pero probablemente no reemplazarán a los centros de datos terrestres.

## Las primeras cargas de trabajo útiles podrían ser mucho menos glamurosas

Imagina un satélite de observación generando terabytes de imágenes.

Hoy, una parte considerable de esos datos debe enviarse a tierra antes de analizarse.

Pero si el satélite dispone localmente de un modelo capaz de filtrar:

- las nubes;

- las imágenes inútiles;

- los inicios de incendio;

- los barcos;

- los cambios geográficos;

- las anomalías;


puede enviar únicamente la información útil.

El cómputo viaja entonces hasta los datos en lugar de transportar todos los datos hasta el cómputo.

Misma lógica para ciertas aplicaciones soberanas, ciertas tareas de inferencia tolerantes a la latencia o datos producidos directamente en el espacio.

Esos mercados son mucho menos espectaculares que « entrenar GPT-8 alrededor de la Tierra ».

Son probablemente más creíbles.

## El propio calendario merece seguir bajo vigilancia

Existe, por fin, una pequeña contradicción cronológica.

En su prospecto depositado en 2026 ante la SEC, SpaceX escribía que esperaba empezar el despliegue de satélites de cómputo IA **« as early as 2028 »**.

Hoy, Musk dice estar « highly confident » en que se enviarán sistemas NVIDIA en **2027**, y la página Starmind evoca una producción de miles de satélites pudiendo empezar ya a finales de 2027.

El programa parece, por tanto, haberse acelerado.

Eso no transforma una fecha anunciada en fecha garantizada.

Con SpaceX más que en cualquier otro lugar, la diferencia entre objetivo de ingeniería y calendario realmente cumplido merece ser conservada.

## Los centros de datos espaciales no necesitan reemplazar a los de la Tierra para tener éxito

BCG estima hoy que el cómputo espacial conserva un **sobrecoste importante** frente a la infraestructura terrestre y que incluso mejoras agresivas de costes de lanzamiento, masa y fiabilidad podrían solo reducir esa brecha.

Es probablemente la mejor manera de observar Starmind.

La pregunta no es:

> « ¿Se irán todos los centros de datos al espacio? »

Es:

> « **¿Existen suficientes cómputos para los que la energía, la posición, los datos o las limitaciones terrestres justifican pagar más por estar en órbita?** »

Si la respuesta es sí, un nuevo nivel de infraestructura informática puede aparecer sin nunca reemplazar al que usamos en tierra.

SpaceX domina ya dos ingredientes particularmente raros: la fabricación industrial de satélites y su transporte a la órbita.

NVIDIA aporta el tercero: el cómputo.

Queda ahora el problema que ni los cohetes ni los benchmarks pueden hacer desaparecer.

**Cada vatio utilizado por la inteligencia artificial debe acabar siempre en alguna parte.**

Incluso en el espacio.