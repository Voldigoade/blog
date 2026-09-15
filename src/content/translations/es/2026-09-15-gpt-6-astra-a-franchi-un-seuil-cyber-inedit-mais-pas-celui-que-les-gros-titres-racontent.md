---
title: GPT-6 Astra ha cruzado un umbral cibernético inédito, pero no el que cuentan los titulares
description: 'OpenAI acaba de clasificar a GPT-6 Astra en el nivel «Crítico» en ciberseguridad. Detrás de este término espectacular se esconde un cambio mucho más concreto: la IA empieza a pasar de asistente de seguridad a verdadero investigador autónomo de vulnerabilidades.'
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: article
tags:
  - intelligence artificielle
  - cybersécurité
  - GPT-6 Astra
  - OpenAI
  - Zero-Day
  - sécurité informatique
  - agents IA
coverImage: /images/posts/6135a580-bb11-43a5-b9ef-6b292bf80d6c.png
coverAlt: Un sistema de inteligencia artificial analiza de forma autónoma código y sistemas informáticos en busca de vulnerabilidades.
author: Voldigoade
locale: es
sourceSlug: 2026-09-15-gpt-6-astra-a-franchi-un-seuil-cyber-inedit-mais-pas-celui-que-les-gros-titres-racontent
sourceHash: edf32dcce10394e91c66c2a773e835872730c864af59f84bc665701ae7d75063
manual: false
---

El 3 de septiembre de 2026, OpenAI utilizó una palabra que ninguno de sus modelos anteriores había recibido aún: **Crítico**.

No «excelente en ciberseguridad». No «experto».

Crítico.

La palabra puede dar fácilmente la impresión de que un chatbot ha adquirido repentinamente el poder de piratear cualquier cosa en Internet. No es lo que muestran los datos.

Pero lo que muestran los datos es quizás más interesante.

Por primera vez, empezamos a ver una IA capaz de llevar a cabo durante horas una verdadera investigación de vulnerabilidades, explorar por sí misma varias pistas, descubrir fallos desconocidos y encadenar algunos de ellos hasta obtener un exploit funcional.

Es un cambio de naturaleza.

## Qué significa realmente «Crítico»

El término proviene del **Preparedness Framework de OpenAI**. No se trata, por tanto, ni de una certificación gubernamental ni de un nivel universalmente reconocido por la industria.

En este marco, un modelo alcanza el nivel ciber Crítico si se vuelve capaz, entre otras cosas, de descubrir y desarrollar de forma autónoma exploits zero-day funcionales contra numerosos sistemas reales fuertemente protegidos, o de construir estrategias de ataque inéditas de extremo a extremo a partir de un objetivo general.

Un **zero-day**, aquí, es una vulnerabilidad desconocida para quienes normalmente deben corregirla. El atacante potencial dispone, pues, de un fallo para el que aún no existe ningún parche público.

Es precisamente por esta razón que un detalle del informe de Astra merece mucha más atención que sus resultados en los benchmarks clásicos.

La IA ha encontrado realmente fallos que no se conocían previamente.

## Se le dio un navegador. Luego se la dejó buscar

OpenAI colocó a Astra frente a software ampliamente desplegado en un entorno de laboratorio, notamment un navegador y un núcleo de sistema operativo.

El modelo recibía el código fuente, los builds del software, herramientas clásicas de búsqueda de vulnerabilidades y un objetivo. Los investigadores humanos podían supervisar el experimento, pero no soplarle las pistas a explorar.

Astra disponía, en cambio, de recursos considerables: razonamiento Ultra, acceso Web y hasta **64 sub-agentes**. No hay que imaginar, pues, una simple pestaña de ChatGPT lanzada cinco minutos en un portátil.

En el navegador, Astra descubrió varias vulnerabilidades hasta entonces desconocidas y construyó una cadena de explotación que permitía obtener ejecución de código fuera del sandbox.

La primera versión necesitó aproximadamente **29 horas** de investigación. Los investigadores constataron luego que la configuración utilizada carecía de ciertas protecciones presentes en la versión de producción. Astra reanudó entonces el trabajo y adaptó su exploit a la versión estable oficial en aproximadamente **12 horas adicionales**.

En el núcleo del sistema operativo, el modelo también descubrió varias nuevas vulnerabilidades y produjo un exploit de elevación de privilegios local en menos de doce horas.

Es esta parte la que cambia realmente la discusión.

Una IA que conoce las técnicas de seguridad existe desde hace tiempo.

Una IA que puede perseguir sola una investigación técnica durante decenas de horas hasta producir un descubrimiento que los humanos responsables del software aún no conocían es otra cosa.

## Los benchmarks cuentan la misma historia con un gran matiz

Las cifras son impresionantes.

En **Sandbox Bench**, una evaluación interna compuesta por 22 objetivos vulnerables, Astra comprometió 10. GPT-5.6 Sol solo había conseguido uno.

En **SRE-Bench**, dedicado al reverse engineering de binarios sin código fuente, Astra alcanza **99,2 %** en pass@4 frente al 68,7 % de Sol, utilizando aproximadamente cuatro veces menos tokens de salida.

Incluso el espectacular puntaje perfecto obtenido en ExploitBench debe leerse con prudencia: el propio OpenAI reconoce que ciertas vulnerabilidades históricas podrían haber contaminado los datos de entrenamiento del modelo. Un benchmark de seguridad se vuelve mucho menos convincente si el modelo puede simplemente reconocer un exploit encontrado durante su entrenamiento.

Es precisamente por eso que los resultados más interesantes son los que conciernen a vulnerabilidades recientes o desconocidas.

Y por eso una evaluación externa es particularmente útil.

## Un laboratorio independiente intentó empujarlo mucho más lejos

La empresa de investigación en seguridad Irregular también probó a Astra.

En su benchmark **FrontierCyber**, que usa software y hardware reales, Astra superó **86 desafíos de 226**.

GPT-5.6 Sol: **34 de 226**.

En CyScenarioBench, que prueba operaciones ofensivas más largas, Astra superó al menos una vez 9 escenarios de 10, con una tasa de éxito media del 59 %.

Pero he aquí la cifra que impide convertir esta historia en fantasía:

**ninguno de los dos modelos superó los siete desafíos clasificados como Elite.**

Irregular tampoco observó a Astra comprometer con éxito los objetivos totalmente endurecidos de su evaluación.

He aquí probablemente la mejor descripción del estado actual de la tecnología.

Astra no es una llave universal capaz de abrir cualquier sistema.

Se ha vuelto lo bastante bueno para automatizar una parte del trabajo que antes requería a un especialista muy competente.

La frontera se desplaza.

## El verdadero cambio es la autonomía

Seguimos midiendo mucho los modelos con preguntas: ¿cuántos problemas resueltos?, ¿cuántas respuestas correctas?, ¿cuántas líneas de código generadas?

Estas medidas empiezan a volverse insuficientes.

Para la ciberseguridad, la métrica importante podría volverse pronto mucho más concreta:

**¿cuántas horas y cuánto dinero le cuesta a una máquina descubrir una nueva vulnerabilidad explotable?**

Un investigador humano puede pasar varios días o semanas en un objetivo antes de encontrar algo.

Un agente de software puede lanzar varias pistas simultáneamente, abandonar las que fallan, generar sus propias herramientas, leer miles de líneas de código y recomenzar toda la noche.

No tiene que volverse necesariamente mejor que el mejor investigador del mundo.

Basta con que su coste y su tiempo de investigación sigan disminuyendo.

Es allí donde la escala se vuelve peligrosamente interesante.

Una vulnerabilidad descubierta por un humano es una vulnerabilidad.

Mil agentes buscando en paralelo en mil proyectos distintos transforman la búsqueda de vulnerabilidades en proceso industrial.

## Y es también probablemente la mejor arma de los defensores

La paradoja es evidente: exactamente la misma capacidad permite buscar una falla antes de que un atacante la encuentre.

Cloudflare ya anunció en septiembre un servicio que usa los modelos cibernéticos de OpenAI para examinar bases de código autorizadas, validar vulnerabilidades y ayudar a aplicar protecciones. OpenAI financia también programas donde estos modelos se usan para examinar y corregir software de código abierto.

La ciberseguridad siempre ha funcionado así: las herramientas ofensivas y defensivas comparten una gran parte de sus competencias.

El problema es ahora la velocidad.

Hemos pasado años preguntándonos cuándo una IA sería capaz de programar correctamente.

La siguiente pregunta podría ser mucho más concreta:

**¿qué pasa cuando cada software publicado en Internet pueda ser inspeccionado permanentemente por miles de investigadores de vulnerabilidades que nunca duermen?**

Astra aún no da la respuesta.

Pero por primera vez, esta pregunta ya no parece realmente ciencia-ficción.