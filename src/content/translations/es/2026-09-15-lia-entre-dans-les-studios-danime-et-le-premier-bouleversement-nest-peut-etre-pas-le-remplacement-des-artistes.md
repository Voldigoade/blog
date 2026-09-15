---
title: La IA entra en los estudios de anime y el primer gran cambio tal vez no sea el reemplazo de los artistas
description: En OLM Digital y otros actores japoneses, la IA aún no fabrica episodios de un clic. Ya ataca tareas mucho menos visibles —búsqueda de planos, coloreado, control, retakes, animación intermedia— con ganancias a veces medibles y un efecto mucho más profundo en la organización de los estudios.
pubDate: 2026-09-15
draft: false
featured: true
section: anime-manga
contentType: research
tags:
  - intelligence artificielle
  - production d’anime
  - OLM Digital
  - GENIAC
  - ANIMINS
  - animation intermédiaire
  - colorisation
  - AI Mage
coverAlt: Un animador japonés controla en pantalla varias fases de un mismo plano de anime, del dibujo de línea al coloreado, mientras una herramienta de IA asiste discretamente el pipeline de producción.
author: Voldigoade
news: false
seoTitle: 'IA et production d’anime au Japon en 2026 : ce qui change vraiment dans les studios'
seoDescription: 'OLM Digital, GENIAC, SHIAGEDO, Mage Search, AniDepth : ce que l’IA automatise déjà dans les studios d’anime japonais, avec les gains mesurés et leurs limites. Requête cible : IA production anime Japon 2026'
locale: es
sourceSlug: 2026-09-15-lia-entre-dans-les-studios-danime-et-le-premier-bouleversement-nest-peut-etre-pas-le-remplacement-des-artistes
sourceHash: 46b7a887f27eea6ef4835d2f9074314b0ec184915481bf07e6588968c920db69
manual: false
---

Si la IA debiera entrar en la animación japonesa de la manera más espectacular posible, se esperaría verla generar personajes, decorados y secuencias enteras a partir de unas pocas instrucciones.

Sin embargo, no es ahí donde aparecen los resultados más convincentes en 2026.

En OLM Digital, la empresa implicada en series como *Pokémon* y a la cabeza del proyecto ANIMINS, las cifras publicadas en el marco del programa gubernamental GENIAC conciernen sobre todo problemas mucho menos visibles: **30 a 50 % de tiempo ahorrado en ciertas operaciones de acabado, más de 60 % en la búsqueda de cuts, 99 % en la preparación de un conjunto de datos destinado a esa búsqueda, y una tasa de retake pasada de cerca del 40 % al 10 % en un flujo de trabajo de asistencia a la supervisión**.

Ninguna de estas cifras significa « se puede suprimir el 50 % de los animadores ».

Cuentan algo más interesante.

**La primera transformación seria del anime por la IA podría ser la de su infraestructura de producción.**

El estudio empieza a volverse searchable, medible, parcialmente automatizable. Operaciones que dependían de la memoria de un empleado, de una mirada humana recorriendo cientos de planos o de una sucesión de pequeñas manipulaciones manuales pueden confiarse ahora a sistemas especializados.

Y eso podría, a término, modificar el oficio de animador casi tanto como un generador de imágenes.

## Hay que entender primero qué toca realmente la IA

Un anime 2D no es simplemente « dibujado ».

Un **cut** —más o menos el equivalente de un plano— atraviesa varios oficios y transformaciones. Los *genga*, o dibujos clave, definen las poses y momentos importantes. Los *dōga* limpian los rasgos y producen notamment los dibujos intermedios necesarios para el movimiento. Vienen luego el acabado y la puesta en color, las verificaciones, las correcciones, la fotografía/compositing y numerosos idas y vueltas de supervisión.

Un error minúsculo puede remontar en esa cadena y provocar un retake, es decir, una vuelta a corrección.

Es precisamente en esas operaciones repetitivas, numerosas y muy estructuradas donde la IA encuentra hoy su terreno más favorable.

El proyecto **ANIMINS**, lanzado a finales de 2024 en el marco de GENIAC por OLM Digital, no debía demostrar que un modelo podía producir solo un anime. Su objetivo oficial era determinar cómo la IA podía insertarse en flujos de trabajo comerciales existentes como **herramienta de apoyo**. Obras comerciales se usaron con autorización para la investigación, un corto anime titulado *LINE OUT* sirvió para ensayos cercanos a la producción y 24 empresas de la animación terminaron apoyando la experimentación.

Las tecnologías probadas cubren sin embargo un espectro considerable: dibujo clave, animación intermedia, acabado, coloreado, asistencia al dibujo de personajes, búsqueda en episodios anteriores y supervisión. Los trabajos ANIMINS presentados en conferencia exploran también la generación de escenas de anime, la edición de cabellos por difusión, la generación de humo y fluidos, la extracción de keyframes desde un video humano o aún varios métodos de in-betweening.

La distinción esencial es esta: **explorar una tecnología en laboratorio no equivale a utilizarla para producir cada semana un anime comercial**.

En 2026, estos dos mundos coexisten.


| Etapa | Sistema | Qué hace realmente | Nivel de madurez | Resultado publicado |
| ---------------------------------- | ----------- | --------------------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------- |
| Búsqueda de cuts | Mage Search | Indexa automáticamente episodios y recupera planos en lenguaje natural | Comercializado | Tiempo de búsqueda reducido en más de 60 %, preparación de datos al 99 % en la evaluación GENIAC |
| Acabado / color | SHIAGEDO | Aprende la coloración del cut a partir de imágenes ya coloreadas por el artista | Desplegado y probado en producción | 30 a 50 % de reducción del tiempo de acabado |
| Supervisión | CAS・CATool | Asiste un flujo de control/corrección de dibujos | Usado en un anime comercial | Ritmo del director de animación general ×1,2; retakes de cerca del 40 % al 10 % |
| Control de coloreado | GapFill | Detecta minúsculas zonas no coloreadas y sugiere su color | Investigación con profesionales | Cerca de 22 % más rápido en tareas específicas de búsqueda de huecos |
| Animación intermedia | AniDepth | Genera imágenes intermedias con un modelo de difusión guiado por profundidad y line art | Investigación | Ningún ganancia de productividad comercial publicada |
| Animación intermedia + acabado | ANICRA | Automatiza a partir de los dibujos clave una parte de los dōga y del acabado | Pruebas con estudios | Cerca de 70 % de trabajo menos en las etapas visadas, según su desarrollador |


La tabla revela ya el desfase: **las herramientas que disponen de las pruebas de uso más sólidas no son necesariamente las más generativas**.

## Automatizar, asistir y generar no son la misma cosa

La palabra « IA » aplasta varias transformaciones diferentes.

**La automatización** retira una manipulación ya bien definida. Detectar los colores de una hoja de referencia y registrarlos automáticamente en una paleta es un ejemplo. SAKUGADO, la herramienta interna desarrollada por OLM, puede reconocer esas referencias, actualizar la paleta cuando la hoja se modifica y reemplazar automáticamente colores ya aplicados.

**La asistencia** mantiene al humano en el centro de la decisión. El sistema busca, sugiere, detecta o prepara; el artista valida y corrige. Mage Search o GapFill pertenecen principalmente a esta categoría.

**La generación**, por fin, sintetiza realmente nuevas imágenes o nuevos estados intermedios. AniDepth usa así un modelo de difusión de video para producir in-betweens a partir de keyframes, con mapas de profundidad y dibujos de línea para constreñir el resultado.

La frontera puede volverse evidentemente borrosa. Una cadena automatizada puede llamar a un modelo generativo. Un generador puede no ser más que una pequeña etapa de una herramienta de asistencia.

Pero esta distinción evita un error frecuente: considerar toda adopción de la IA como la llegada de Stable Diffusion a un estudio.

El caso SHIAGEDO muestra hasta qué punto esa imagen es engañosa.

## SHIAGEDO aprende un cut… y luego olvida todo

El acabado es un candidato evidente para la automatización. Un personaje puede aparecer en varias imágenes sucesivas con los mismos colores, mientras un operador debe repetir gran parte del trabajo.

El sistema **SHIAGEDO** de OLM ataca precisamente ese problema.

Pero su funcionamiento es casi el inverso del de un gran generador de imágenes generalista.

Según la presentación técnica de OLM reportada por CGWORLD, SHIAGEDO **no usa ni Stable Diffusion, ni CLIP, ni otro gran modelo preentrenado en una enorme colección de imágenes**. Observa solo las imágenes no coloreadas y coloreadas pertenecientes al cut en curso. A partir de esos pocos ejemplos realizados normalmente por los artistas, entrena localmente un pequeño modelo específico del plano, lo usa para colorear las otras imágenes, y luego **destruye el modelo y sus datos cuando el trabajo termina**.

En una RTX 6000 Ada, OLM indica cerca de 30 segundos de aprendizaje y una decena de segundos de procesamiento por imagen. Una sola imagen puede bastar para empezar, pero la precisión aumenta cuando un artista colorea primero manualmente las imágenes correspondientes a las poses clave. La precisión anunciada es de cerca del 80 % cuando se incluyen los detalles, contra cerca del 90 % en algunos benchmarks de investigación; los cuts con grandes movimientos siguen siendo difíciles.

Y sin embargo, el resultado global comunicado por GENIAC es una **reducción del 30 al 50 % del tiempo de acabado** en el perímetro probado.

Ese funcionamiento es particularmente revelador.

El humano no desaparece. **Su trabajo correcto se vuelve el dato de referencia a partir del cual la máquina amplifica las repeticiones.**

El valor se desplaza pues en parte: producir las buenas imágenes de anclaje, definir correctamente los colores y detectar las excepciones se vuelve aún más importante.

## Una IA al 80 % puede ser inútil si el 20 % restante cuesta demasiado caro

En una demostración tecnológica, 80 o 90 % de éxito pueden parecer impresionantes.

En una entrega comercial, un ojo olvidado, un mechón coloreado con el tono equivocado o una zona de un píxel dejada transparente sigue siendo un error.

Es uno de los problemas que OLM formula explícitamente tras ANIMINS: una IA no necesita ser siempre correcta para ser tecnológicamente notable, pero **un anime entregado debe, él, estar terminado**.

Una investigación publicada este año permite medir muy precisamente esa paradoja.

*No Pixel Left Behind: Filling Gaps in Anime Colorization*, presentado en CHI 2026 por investigadores de la Universidad de Tokio con Akinobu Maejima de OLM Digital, estudia esas minúsculas zonas cerradas que quedan accidentalmente sin colorear. El sistema **GapFill** detecta los huecos, los vuelve inmediatamente visibles, los agranda y propone un color que el operador puede corregir. El estudio se realizó con **13 coloristas profesionales**.

El resultado no es sobre todo « la IA colorea más rápido ».

Cuando había que realizar una coloración desde el inicio, el sistema no aportó **ninguna aceleración estadísticamente significativa**: 106,50 segundos con las herramientas convencionales contra 104,17 segundos con GapFill.

En cambio, cuando se trataba específicamente de rastrear los últimos defectos, la diferencia se volvía neta: 57,69 a 45,15 segundos en una prueba, luego 66,27 a 51,91 segundos en una segunda, cerca de **22 % de tiempo ahorrado** en ambos casos. Con GapFill, ningún hueco previsto por el test fue olvidado, a diferencia de las sesiones realizadas con las herramientas clásicas.

Es un resultado mucho más importante de lo que parece.

**El mejor uso de una IA profesional no es necesariamente hacer el oficio en lugar del humano. Puede ser suprimir el momento preciso donde el humano es malo: buscar durante decenas de segundos una anomalía microscópica.**

El estudio concluye también que la exactitud del modelo no es el único determinante de su utilidad. La posibilidad de ver lo que detectó y de corregir inmediatamente su propuesta cuenta enormemente en la confianza otorgada a la herramienta.

Es una lógica de interfaz y de control, tanto como una lógica de inteligencia artificial.

## La ganancia más espectacular concierne tal vez… a la función búsqueda

Entre todos los resultados de GENIAC, Mage Search parece casi banal.

El sistema no dibuja nada.

Sabe buscar.

En una larga producción, reencontrar cómo un personaje sostenía un objeto treinta episodios atrás, la apariencia exacta de una habitación, un atuendo, una expresión o un plano similar puede requerir recorrer episodios y carpetas o preguntar a alguien que conoce particularmente bien la obra.

Mage Search ingiere el video, efectúa automáticamente el preprocesamiento necesario y permite luego buscar cuts en lenguaje natural. Los diálogos pueden ser también indexados gracias al procesamiento del habla.

GENIAC anuncia **más de 60 % de reducción del tiempo de búsqueda de cuts** y **99 % en el tiempo necesario para constituir el conjunto de datos de búsqueda**. El producto fue comercializado en marzo de 2026.

Desde entonces, la experiencia no parece ya confinada a OLM. AI Mage indicaba en julio que Mage Search había sido adoptado notamment por **ENGI, OLM y TMS Entertainment**. Su infraestructura de análisis de obras que la sociedad llama « Anime General Intelligence », a pesar de la ambigüedad evidente con el sentido habitual de AGI, había sido entonces construida o probada en 35 producciones, de las cuales 16 hacían objeto de una adopción formal. Su nuevo Mage Agent puede cruzar video, scripts, documentos de referencia y otros datos de producción. Estos números son comunicados por la propia AI Mage y no constituyen por tanto una medida independiente de rendimiento, pero atestiguan un paso de la experimentación al producto comercial.

Esa evolución merece más atención que la simple búsqueda de imágenes.

Un estudio acumula desde siempre enormes cantidades de datos: episodios, layouts, hojas de personajes, scripts, correcciones, reglas de licencia, traducciones, decorados, retakes.

Hasta aquí, una parte de su valor quedaba encerrada en las carpetas o en la memoria de las personas que allí trabajan.

Una IA de búsqueda transforma ese archivo en **memoria operacional interrogable**.

Y es tal vez una de las mutaciones más estructurales actualmente en curso.

## El verdadero yacimiento de productividad podría ser el retake

Dibujar más rápido no es necesariamente lo que hace ahorrar más dinero a una producción.

No tener que redibujar puede ser mucho más rentable.

GENIAC reporta así que la introducción de un « flujo de trabajo de asistencia al director de animación » usando **CAS・CATool** en una producción comercial hizo progresar el ritmo de trabajo del director general de la animación en cerca de **1,2 veces** y redujo la tasa de retake de cerca del **40 % al 10 %**.

La documentación pública no es lo suficientemente detallada para atribuir esos resultados a un mecanismo de IA preciso. Sería abusivo concluir que un modelo generativo efectúa las correcciones en lugar del supervisor.

Pero el resultado económico potencial es más interesante que eso.

En una cadena secuencial, una corrección tardía puede hacer perder tiempo a varias personas. Una herramienta que impide que el error llegue a la etapa siguiente puede aportar más que un generador capaz de fabricar rápidamente una primera versión imperfecta.

Eso sugiere un indicador mucho más útil para seguir la IA en el anime: **no el número de imágenes que sabe generar, sino el número de idas y vueltas que evita**.

## La animación intermedia está bel y bien en la mira

Eso no significa que los oficios gráficos centrales estén a salvo.

ANIMINS trabaja directamente en el in-betweening.

**AniDepth**, presentado en SIGGRAPH 2025 con la participación de OLM Digital, usa un modelo de difusión de video. El problema es particularmente difícil: incluso un modelo adaptado al anime conserva sesgos heredados de su entrenamiento en imágenes más realistas y puede perder las líneas precisas, los aplanos o la estructura del personaje.

Los investigadores convierten pues las imágenes en mapas de profundidad, interpolan esos últimos, deforman los line arts en función de esa geometría y luego usan esos dibujos como restricciones para producir las imágenes coloreadas intermedias. El objetivo es preservar los detalles incluso cuando el movimiento es importante.

Otros proyectos ANIMINS trabajan en **LayerPack**, en la correspondencia de líneas entre dos dibujos clave, en la recuperación de in-betweens generados previamente o aún en la coloración automática por correspondencia de segmentos.

Pero falta un elemento: **cifras públicas demostrando que AniDepth reduce efectivamente en X % el coste o la duración de una producción comercial**.

Es investigación prometedora, aún no el equivalente de Mage Search o SHIAGEDO en materia de validación industrial pública.

Otro actor japonés va más lejos.

CrestLab presenta **ANICRA** como una infraestructura capaz de generar automáticamente una parte de los dōga y del acabado a partir de los dibujos clave. La empresa anuncia tratamientos en unas decenas de segundos y afirma haber reducido en cerca de **70 % la carga de trabajo en las etapas visadas** durante experimentaciones con varios estudios. NTT Docomo, del cual el proyecto proviene antes de su spin-off en 2025, reporta el mismo orden de grandeza.

Hay que mantener sin embargo una diferencia de nivel de prueba: esos 70 % son **una afirmación del proveedor y de su antiguo grupo matriz**, sin protocolo público suficientemente detallado para compararlos directamente a las experiencias académicas o para convertirlos en « 70 % de coste menos por episodio ».

Pero muestra claramente dónde se sitúa la próxima batalla.

## Los personajes también están concernidos pero más en laboratorio

El proyecto ANIMINS no se detiene en las tareas mecánicas.

El METI cita explícitamente la **asistencia al dibujo de los personajes** entre los ejes de investigación. Las publicaciones asociadas van de la edición de cabellos guiada por difusión a la generación de escenas de anime a partir de prompts visuales estructurados, pasando por la generación controlada de humo o de movimientos fluidos.

Eso vuelve insuficiente el argumento tranquilizador según el cual « la IA solo tomará las tareas penosas ».

La investigación apunta también a tareas gráficas y creativas.

Lo que los datos permiten decir en septiembre de 2026 es más preciso: **cuanto más una tarea es abierta, creativa y difícil de verificar automáticamente, menos las pruebas públicas de una ganancia industrial robusta son hoy convincentes.**

A la inversa, los mejores resultados aparecen en problemas estrechos que disponen de un estado correcto fácilmente identificable: reencontrar un plano, propagar un color, detectar un hueco, aplicar una referencia o evitar un retake.

Probablemente no es una coincidencia.

## El problema de los datos de entrenamiento produce ya dos filosofías opuestas

Una IA de producción no solo necesita ser buena. Un estudio debe saber **por qué tiene derecho a usarla**.

El derecho japonés ofrece posibilidades relativamente amplias para ciertos usos analíticos de obras protegidas por el artículo 30-4, pero la Agencia Japonesa de Asuntos Culturales recuerda ella misma que la aplicación al generativo sigue dependiendo del objetivo del uso y que la jurisprudencia sigue siendo limitada.

Las elecciones técnicas de OLM son pues interesantes porque no buscan simplemente el límite máximo autorizado por la ley.

En GENIAC, las obras comerciales que sirven a la investigación se usaron **con autorización**, y ningún dataset público procedente del proyecto está previsto.

SHIAGEDO va aún más lejos: datos limitados al cut concernido, aprendizaje efímero, supresión del modelo al final. OLM explica que ciertas funciones de aprendizaje continuo presentes en la investigación no son precisamente previstas en el flujo de trabajo práctico a causa de las cuestiones de derechos.

Es otra visión de la IA que la del modelo gigante entrenado una vez en Internet.

**Los estudios podrían preferir pequeños modelos especializados alimentados por sus propios materiales, porque la trazabilidad se vuelve ella misma una característica del producto.**

## Un incidente en WIT Studio muestra por qué

El 10 de abril de 2026, WIT Studio publicó un comunicado inusual sobre el opening de *Ascendance of a Bookworm: Adopted Daughter of an Archduke*.

Tras reacciones suscitadas por la difusión, el estudio investigó su pipeline y confirmó que IA generativa había sido usada para producir un material que intervenía en el decorado de ciertos cuts.

WIT hizo entonces redibujar el decorado y anunció su sustitución a partir del segundo episodio. Más interesante aún: el estudio precisaba que el uso de generación IA en sus producciones era **en principio prohibido**, fuera de experimentaciones específicas, y atribuía el incidente a un fallo de gestión y de control de la producción.

Ese caso invierte la pregunta habitual.

El problema no es ya solo: « ¿un estudio debe adoptar la IA? »

Se vuelve: **« ¿un estudio puede realmente saber dónde se usó la IA en una cadena que implica numerosos intervinientes? »**

A medida que los modelos se vuelven disponibles en Photoshop, servicios Web, software de producción y chez subcontratistas, una política de empresa no basta más.

Hay que poder controlar la procedencia de los elementos, imponer reglas a los prestadores, documentar las herramientas usadas y verificar lo que vuelve al pipeline.

La IA hace pues nacer un nuevo trabajo en el momento mismo donde automatiza otros: **la gobernanza de producción**.

## Lo que las economías del 30 %, 60 % o 99 % no dicen

Sería tentador sumar todas esas cifras.

Sería un error.

Reducir en 50 % la duración de una operación de acabado no reduce en 50 % el coste de un episodio. Una disminución del 99 % del tiempo de construcción de un índice de búsqueda no significa tampoco que la producción entera se vuelva cien veces más barata.

Esos resultados conciernen **sub-tareas diferentes, medidas según protocolos diferentes**.

No contabilizan necesariamente la integración técnica, las GPU, el desarrollo de software, la limpieza de datos, la formación del personal, las verificaciones humanas o el coste de los nuevos errores.

Y ninguna de las fuentes públicas examinadas aquí demuestra, a día de hoy, que un anime televisado completo producido gracias a esas herramientas cuesta X % menos que un equivalente tradicional a calidad igual.

Es una ausencia importante.

Las ganancias pueden además ser absorbidas de otra manera que por una baja de efectivos: más tiempo dedicado a los planos complejos, menos retrasos, menos subcontratación, más controles o simplemente una capacidad para producir en un sector que ya falta de personal.

El ministerio japonés de Cultura describía aún en 2026 la escasez de mano de obra en la animación como lo bastante seria para hacer de la formación y la retención de profesionales una prioridad nacional.

La encuesta de NAFCA realizada entre 323 trabajadores del sector había hallado una mediana de **225 horas trabajadas por mes** y una remuneración horaria equivalente mediana de 1 111 yenes en su muestra. No es un censo exhaustivo de la industria, pero recuerda que las ganancias de productividad llegan en un entorno ya bajo fuerte tensión.

La verdadera pregunta económica es pues: **¿quién recupera el tiempo ahorrado?**

¿El asalariado? ¿El freelance? ¿El estudio? ¿El calendario? ¿La calidad? ¿O simplemente un volumen de producción aún superior?

Los experimentos tecnológicos no permiten aún responder.

## Automatizar los dōga crea también un problema que los benchmarks no miden

Existe por fin una consecuencia paradójica.

La animación intermedia es precisamente una de las etapas más automatizables. Pero constituye también, en varios estudios japoneses, una puerta de entrada al oficio.

CloverWorks explica aún que sus animadores comienzan su recorrido por los *dōga* y considera ese trabajo como una manera de aprender los métodos, los materiales y el funcionamiento completo de la producción antes de pasar a los *genga*. Toei Animation mantiene por su parte en 2026 una formación específica consagrada a los dōga al lado de su cursus genga.

Eso no significa que habría que preservar artificialmente todas las tareas repetitivas.

Pero una inferencia se vuelve difícil de evitar: **si la industria automatiza una parte importante del trabajo junior, tendrá que repensar la manera en que fabrica a sus profesionales seniors.**

Un estudio puede ganar miles de horas a corto plazo y perder una parte de su mecanismo de transmisión de competencias a largo plazo.

Es un riesgo diferente de « la IA roba los empleos », y probablemente más concreto.

## El antiguo precedente de Toei muestra lo que podría pasar realmente

Esa transformación no empezó por demás con ChatGPT.

En 2021, Toei Animation ya había usado con Preferred Networks la herramienta **Scenify** para su corto experimental *URVAN*. Fotografías de Sasebo eran transformadas en materiales de decorado base; los artistas realizaban luego el trabajo creativo y los retoques.

Toei había medido una reducción del tiempo de pretratamiento a cerca de **un sexto** del método tradicional en ese proyecto. La herramienta había sido empleada en cerca de dos tercios de los decorados.

El punto notable es lo que Toei había hecho del tiempo ganado: los artistas podían dedicar más esfuerzos a los elementos cyberpunk que necesitaban realmente sus decisiones visuales.

Es tal vez una mejor representación del futuro próximo que un estudio vacío lleno de GPU.

No:

**artista → IA**

sino:

**trabajo repetitivo → herramienta → artista reasignado al problema difícil**.

Evidentemente, nada garantiza que una empresa elija siempre usar la productividad de esa manera. Puede también reducir sus costes o aumentar los ritmos.

La tecnología no decide el reparto de la ganancia.

## El verdadero cambio es tal vez un estudio vuelto « calculable »

Uno de los hallazgos más interesantes de OLM no tiene al final casi nada que ver con la generación de imágenes.

En 3DCG, los equipos trabajan desde hace tiempo alrededor de DCC —software como Maya o Blender— que proporcionan una infraestructura común a la que se pueden conectar scripts, plugins y automatizaciones.

La 2D japonesa es mucho más fragmentada. Papel y digital pueden aún coexistir; varios softwares se encadenan; ciertas informaciones circulan en forma de archivos y de conocimientos tácitos. OLM ve pues SAKUGADO no solo como una herramienta de dibujo, sino como una posible **base técnica común** sobre la que podrán enchufarse nuevas tecnologías.

Es aquí donde todas las piezas de esta investigación se encuentran.

SHIAGEDO necesita datos del cut.

Mage Search transforma los archivos en base interrogable.

GapFill mide precisamente un defecto que se buscaba antes visualmente.

CAS・CATool interviene en los ciclos de corrección.

ANIMINS experimenta incluso la acumulación automática de las producciones intermedias y sus metadatos.

En otras palabras, **antes de poder automatizar el anime, hay que volver su proceso legible por una máquina**.

Es tal vez el bouleversamiento más importante de 2026.

La primera generación de IA realmente útil a los estudios no reemplaza al director ni al animador estrella. Transforma progresivamente un pipeline artesanal, fragmentado y extremadamente dependiente de las personas en un sistema donde los materiales están indexados, las repeticiones detectadas, los errores medidos y ciertos gestos amplificados automáticamente.

La etapa siguiente puede perfectamente alcanzar tareas más creativas. AniDepth, ANICRA y las investigaciones sobre los personajes muestran que esa frontera ya es atacada.

Pero para saber si la IA transforma realmente la animación japonesa, el número de clips generados por difusión es probablemente uno de los indicadores menos interesantes a seguir.

Las cifras mucho más reveladoras serán **el número de retakes por cut, el tiempo pasado buscando una referencia, la proporción de salidas que requieren una corrección, el caudal de los supervisores, la cantidad de trabajo junior automatizado y, sobre todo, lo que los estudios harán de las horas recuperadas**.

Es ahí donde se decidirá si la IA mejora realmente la fabricación de los anime o si simplemente permite pedirles más a las mismas personas.