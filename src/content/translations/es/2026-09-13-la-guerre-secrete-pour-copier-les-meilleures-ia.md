---
title: La guerra secreta para copiar las mejores IA
description: 'Cientos de millones de solicitudes, miles de cuentas falsas y modelos entrenados con las respuestas de sus competidores: la "distilación" se ha convertido en un tema de gran importancia industrial y geopolítica. Sin embargo, la línea entre el aprendizaje legítimo, la extracción de capacidades y el robo real es mucho más difusa de lo que parece.'
pubDate: 2026-09-13
draft: false
featured: false
section: computing
contentType: research
tags:
  - intelligence artificielle
  - LLM
  - distillation
  - Anthropic
  - DeepSeek
  - cybersécurité
  - kimi
  - model extraction
coverImage: /blog/images/posts/20c92b74-6820-4ef9-929d-bfdb9fcd4971.png
coverAlt: Un modelo de inteligencia artificial aprende en secreto las capacidades de otro modelo a través de millones de consultas.
author: Voldigoade
locale: es
sourceSlug: 2026-09-13-la-guerre-secrete-pour-copier-les-meilleures-ia
sourceHash: 4ff675af2579b675dccd35a47c48d951280ac2c569cf8a01496693b9ee179a9e
manual: false
---

**151 millones de transacciones.**

Según Anthropic, este es el volumen que se observó entre mayo y julio de 2026, en una campaña atribuida a Alibaba para Claude.

Más de 151 millones de tokens. Más de 151 millones de caracteres. **Más de 151 millones de interacciones con el modelo.**

Durante el apogeo de la operación, Anthropic afirmó haber detectado cerca de tres millones de interacciones diarias. La primera infraestructura utilizada habría empleado alrededor de 5.000 cuentas fraudulentas, utilizando proxies residenciales, direcciones de correo electrónico desechables y tarjetas de pago virtuales. Cuando estas cuentas fueron bloqueadas, el tráfico habría migrado a otra infraestructura. 

El objetivo presuntamente no era hacerle preguntas a Claude, sino que Alibaba necesitaba un chatbot.

Según Anthropic, las respuestas, y en particular las evidencias de razonamiento, se convertían en datos de entrenamiento destinados a mejorar los modelos Qwen.

Es decir: **utilizar una IA extremadamente avanzada como profesor clandestino de otra IA.**

Esto parece inmediatamente un robo.

El problema es que la técnica utilizada tiene un nombre perfectamente respetable en el campo de la inteligencia artificial.

La destilación.

Y no tiene nada de ilegal ni de malicioso por naturaleza.

## Una IA puede realmente aprender de otra IA.

El principio de la destilación es sorprendentemente sencillo.

Consideremos un modelo muy potente, al que llamaremos el **profesor**.

Le presenta con una gran cantidad de problemas:

- escribir o corregir código;

- resolver argumentos complejos;

- clasificar documentos;

- utilizar herramientas;

- analizar datos;

- responder a preguntas específicas.

Guardamos nuestras respuestas.

Luego, se utiliza este enorme conjunto de ejemplos para entrenar otro modelo, el "estudiante".

El alumno no recibe los datos internos del profesor. Tampoco obtiene su código fuente. Tampoco obtiene una copia exacta de su cerebro digital.

Simplemente observa, una y otra vez, **cómo se comporta un modelo mucho más avanzado ante diferentes problemas**.

Ya es de gran valor.

Esta técnica ya no es nueva. En 2015, Geoffrey Hinton, Oriol Vinyals y Jeff Dean publicaron *Distilling the Knowledge in a Neural Network*, donde explicaban cómo transferir parte del conocimiento de un sistema complejo a un modelo más simple y económico. 

Actualmente, toda la industria utiliza este principio.

OpenAI propone oficialmente un sistema de **destilación de modelos** que permite utilizar las salidas de modelos potentes para refinar modelos más pequeños y económicos. Google también propone usos legítimos de la destilación. 

Por lo tanto, el problema no es la destilación.

La pregunta es: **¿Quién es el profesor, quién es el alumno, y el profesor ha aceptado impartir la clase?**

## Destilación, extracción, copia: estos términos se refieren a procesos distintos.

Una confusión recurrente en este caso es: utilizar las respuestas de una IA para entrenar a otra IA no implica necesariamente "robar el modelo".

Es necesario distinguir entre varios niveles.

![](/blog/images/posts/045cda8d-31fb-4a0e-a46e-0b9914450a09.png)

El término "**extracción de modelos**" no ha sido inventado específicamente para la actual disputa entre los laboratorios de IA.

Ya en 2016, algunos investigadores demostraron que un modelo accesible únicamente a través de una API podía, en determinadas circunstancias, ser reconstruido de forma aproximada mediante preguntas inteligentes. Su artículo se titulaba directamente "Robando modelos de aprendizaje automático a través de APIs de predicción". 

Este principio crea un paradoja fundamental.

Para vender una IA, es necesario permitir que los usuarios la consulten.

Sin embargo, cada respuesta también revela algo sobre su comportamiento.

Una solicitud aislada tiene prácticamente ningún valor.

Millones de consultas seleccionadas de manera sistemática pueden convertirse en un conjunto de datos extremadamente valioso.

## Lo que Anthropic realmente acusa a los laboratorios chinos de haber hecho

Es necesario ser preciso en este punto.

La información detallada disponible públicamente proviene principalmente de las investigaciones y decisiones de Anthropic. Sin embargo, estas no constituyen por sí mismas una decisión judicial independiente que establezca cada hecho.

Sin embargo, los volúmenes alegados son lo suficientemente grandes como para cambiar por completo la naturaleza del tema.

En su informe de septiembre de 2026, Anthropic afirma, entre otras cosas, haber identificado:

![](/blog/images/posts/5d5908f7-a26f-431f-9e6c-69ad9e63e8ee.png)

Ya no estamos en el escenario de un investigador que envía unos pocos miles de mensajes para estudiar a un competidor.

Anthropic describe auténticos **procesos industriales**.

En el caso de Zhipu, por ejemplo, el laboratorio habría registrado los argumentos obtenidos y luego habría utilizado a Claude para limpiarlos, normalizarlos, evaluarlos y generar otros datos destinados al entrenamiento.

Por lo tanto, el profesor ya no solo serviría para proporcionar respuestas.

También participaría en la creación de su propio conjunto de datos para la copia. 

## El caso de Alibaba va aún más lejos.

La campaña que Anthropic atribuye a Alibaba se centró especialmente en las capacidades de razonamiento, programación, desarrollo de núcleos informáticos y en tareas complejas que requieren múltiples pasos.

Según Anthropic, se le exigía a Claude que generara pruebas de razonamiento explícito, que luego se guardaban y se convertían en datos para el "ajuste fino supervisado" (SFT).

El SFT consiste en entrenar un modelo utilizando pares de datos del tipo:

- `Problème → excellente réponse attendue`

Repita esto millones de veces en problemas cuidadosamente seleccionados, y no solo estará transmitiendo conocimientos factuales.

También transmiten **hábitos y prácticas útiles**: cómo abordar un problema, qué estrategia probar, cómo generar código limpio, cómo utilizar una herramienta o cómo llevar a cabo una tarea en múltiples etapas.

Anthropic afirma que estos datos se utilizaron para mejorar varias generaciones de Qwen. La empresa también acusa a Alibaba de haber utilizado Claude para trabajar en sus infraestructuras internas de investigación en IA, incluyendo entornos de aprendizaje por refuerzo y algunos trabajos relacionados con las arquitecturas de modelos. 

Una vez más: esto no significa que Alibaba haya descargado "el cerebro de Claude".

Sin embargo, si las acusaciones son ciertas, Claude habría actuado como **investigador, profesor, generador de datos y herramienta de evaluación** para un competidor.

El matiz técnico no disminuye la impresión que causa el fenómeno.

Lo hace más interesante.

## Kimi y DeepSeek: cuando el modelo que estás utilizando ya no es el que te responde.

Las acusaciones contra Moonshot AI, creadora de Kimi, son probablemente las más preocupantes.

Anthropic afirma haber descubierto que ciertas consultas enviadas por los usuarios, creyendo que estaban dirigidas a Kimi, se estaban transmitiendo **en secreto** a Claude.

La respuesta generada por Claude habría sido enviada posteriormente al usuario como respuesta del servicio.

En un período de diez días, Anthropic afirma haber recibido cerca de 300.000 solicitudes de clientes de Moonshot en este contexto. La infraestructura habría utilizado 5.380 cuentas fraudulentas. Una parte de estas interacciones se habría conservado para alimentar sistemas de entrenamiento. En total, Anthropic atribuye más de 23 millones de interacciones a Moonshot entre mayo y julio. 

DeepSeek habría utilizado un método similar.

Anthropic afirma que algunas consultas de usuarios de DeepSeek, especialmente aquellas que provenían de herramientas de desarrollo compatibles con diferentes modelos, eran seleccionadas y luego redirigidas hacia Claude Opus.

Así, la respuesta podría utilizarse de inmediato, pero también proporcionar una nueva información que permita entrenar futuros modelos. Anthropic estima que esta campaña, que tuvo lugar durante solo catorce días de julio de 2026, generó más de 12,1 millones de interacciones.

Si estas acusaciones son ciertas, entonces no estamos hablando solo de propiedad intelectual.

También hablamos de la **confianza del usuario**.

## El problema oculto: tus conversaciones podrían convertirse en la materia prima.

Quizás esta sea la parte más preocupante del informe.

Anthropic afirma que DeepSeek, Moonshot y Xiaomi han compartido con Claude algunas conversaciones que originalmente estaban dirigidas a sus propios modelos.

Y una conversación con una IA de programación puede contener mucho más que una simple pregunta abstracta.

Puede contener:

- del código de propiedad;

- documentos internos;

- claves de API;

- datos de identificación;

- datos profesionales;

- nombres y datos de contacto;

- archivos de configuración;

- información confidencial.

Anthropic afirma haber detectado en las sesiones mencionadas información sensible perteneciente a cientos de usuarios y organizaciones, en al menos una docena de idiomas. 

En el caso de Xiaomi, Anthropic afirma que se enviaron más de 400.000 solicitudes desde más de 1.500 cuentas a Claude. Posteriormente, estas conversaciones se utilizarían para construir datos de SFT (aprendizaje por refuerzo) y para futuros modelos. 

Por lo tanto, potencialmente existen **dos recursos extraídos simultáneamente**:

la capacidad del modelo competidor,

y los datos de los usuarios.

No se trata exactamente de los mismos problemas legales o éticos.

Sin embargo, pueden utilizar exactamente el mismo conducto.

## Incluso se pueden comprar conversaciones con una IA.

El informe de Anthropic describe una etapa adicional: la aparición de un **mercado secundario de datos de destilación**.

Estos servicios intermedios permiten acceder a modelos que normalmente no están disponibles en ciertas regiones. Envían las solicitudes a Claude u otros modelos, obtienen las respuestas… y pueden guardar las conversaciones.

Anthropic afirma que algunas de estas informaciones fueron posteriormente vendidas a otros laboratorios.

De esta manera, SenseTime habría utilizado conversaciones de Claude adquiridas a proveedores externos.

Anthropic también acusa a MiniMax de haber creado su propia red de proxies a través de una empresa pantalla que, de manera curiosa, solo ofrecía acceso a los modelos de Anthropic y OpenAI, y no a los modelos de MiniMax. Anthropic considera que esta infraestructura se utilizaba para recopilar datos para el entrenamiento. 

Si este modelo económico se confirma a gran escala, cambiará radicalmente la situación.

Una conversación con una IA ya no es simplemente una interacción entre un usuario y un proveedor.

Puede convertirse en un **recurso valioso para entrenar una tercera IA**.

## El gobierno estadounidense ahora ha entrado en el conflicto.

El 8 de septiembre de 2026, la NSA, el FBI y la CISA publicaron conjuntamente una alerta sobre este fenómeno.

El documento acusa a empresas chinas de organizar campañas de contrabando de modelos estadounidenses a **escala industrial**.

El argumento estadounidense es tanto económico como de seguridad: replicar ciertas capacidades de modelos existentes permitiría reducir parte del coste necesario para desarrollarlos de forma independiente, incluyendo costes relacionados con el cálculo, la energía, la investigación fundamental y la experimentación. 

Por lo tanto, la destilación se presenta ahora no solo como un problema comercial, sino también como un factor estratégico en la competencia tecnológica entre Estados Unidos y China.

Y China rechaza esta narrativa.

El Ministerio de Asuntos Exteriores de China respondió que los avances del país en inteligencia artificial se debían a sus capacidades científicas y tecnológicas, así como a su política de apertura y cooperación. Beijing solicitó a Estados Unidos que dejaran de lo que considera acusaciones infundadas y intentos de difamar. 

Por lo tanto, tenemos dos interpretaciones prácticamente opuestas del mismo fenómeno.

Para Washington y varios laboratorios estadounidenses: **extracción industrial de propiedad intelectual**.

Para Pekín: una acusación política dirigida a empresas chinas en un sector donde la competencia se ha convertido en una cuestión estratégica.

La técnica existe.

Ahora, su interpretación tiene una dimensión geopolítica.

## El término « robo» merece ser utilizado con precisión.

Google no toma muchas precauciones léxicas: su equipo de inteligencia sobre amenazas describe los ataques de extracción de modelos como una forma de **espionaje industrial** y robo de propiedad intelectual.

Google también afirma observar campañas a gran escala de forma regular, y recientemente señaló que algunas superaban los **100 millones de interacciones**. 

OpenAI adopta una posición similar.

La empresa reconoce explícitamente que existen usos legítimos de la destilación, y además proporciona las herramientas necesarias. Sin embargo, también afirma haber observado actividades relacionadas con DeepSeek que considera compatibles con la destilación adversarial y con intentos de eludir sus restricciones.

 Anthropic, por su parte, en sus términos comerciales, prohíbe el uso de sus servicios para desarrollar un producto o entrenar un modelo de IA que compita con los suyos, sin obtener la autorización explícita. 

Sin embargo, hay varias cuestiones que deben tratarse por separado.

**Las infracciones contractuales, la extracción técnica, la propiedad intelectual, la confidencialidad y la calificación penal no son sinónimos.**

Afirmar que un laboratorio ha utilizado fraudulentamente miles de cuentas para eludir restricciones es una acusación.

Otra opción sería afirmar que ha replicado ciertas capacidades de un competidor a través de sus propios resultados.

Afirmar que "ha robado el modelo" finalmente podría dar la impresión de que sus componentes han sido sustraídos, lo cual no es lo que describen estos informes.

El lenguaje utilizado por las empresas no es neutral.

Cuando Anthropic habla de "destilación ilegal" o Google de "robo de propiedad intelectual", estas empresas describen un problema técnico real, pero también defienden un activo comercial de gran valor.

Esto no hace que sus acusaciones sean falsas.

Esto simplemente implica no confundir su vocabulario con una definición universal.

## ¿Es realmente posible replicar a Claude con suficientes solicitudes?

No, en el sentido de que se copiaría un archivo.

Incluso con cien millones de respuestas, el alumno no obtiene automáticamente:

- El peso exacto del profesor;

- sus datos originales de entrenamiento;

- todas sus capacidades;

- sus mecanismos internos;

- todo su conocimiento;

- ni exactamente su comportamiento.

La destilación suele ser **selectiva e imperfecta**.

Sin embargo, no necesita producir un clon perfecto para ser extremadamente rentable.

Supongamos que un competidor ya tiene un modelo muy bueno.

Lo que le falta quizás no sea la "inteligencia general" en sí, sino ciertas habilidades específicas: programación de agentes, razonamiento complejo, uso de herramientas, ciberseguridad, matemáticas o la capacidad de corregir sus propios resultados.

Entonces, podría interrogar masivamente un modelo que domine mejor estos campos, crear un conjunto de datos especializado y, posteriormente, centrar su entrenamiento específicamente en las áreas donde tenía más dificultades.

No necesariamente se trata de una copia de **Claude**.

Intenta imitar **lo que Claude sabe hacer mejor que él**.

Y esto lo hace mucho más realista.

## El razonamiento de una IA se ha convertido en un recurso estratégico.

Los modelos modernos a veces generan respuestas mucho más extensas que simples respuestas cortas.

Para resolver un problema complejo, pueden realizar cálculos intermedios, probar diferentes enfoques, utilizar herramientas, escribir y probar código, o desarrollar una estrategia a lo largo de una secuencia prolongada.

Estas trayectorias son de gran interés para entrenar otro sistema.

Es precisamente por esta razón que Anthropic afirma haber reforzado la protección de los procesos internos de Claude.

La empresa, por ejemplo, utiliza resúmenes de razonamiento en lugar de ciertas huellas internas, y ha desarrollado mecanismos de protección contra técnicas que permiten reproducir firmas de razonamiento entre varias sesiones. Además, combina esto con clasificadores especializados, análisis de metadatos y solicitudes de verificación de identidad cuando se detecta un comportamiento sospechoso. 

Google, por su parte, ha anunciado que está desarrollando técnicas para identificar patrones que podrían haber sido extraídos de Gemini, así como defensas capaces de reducir la utilidad de los datos obtenidos por un atacante. 

La situación se asemeja cada vez más a una guerra convencional entre atacantes y defensores:

una empresa protege sus resultados;

otro encuentra una nueva forma de recuperarlos;

La protección está en constante evolución;

El proceso de extracción implica un cambio de técnica.

Sin embargo, aquí, **el objeto a proteger no es solo un programa**.

Es un comportamiento.

## La API de una IA también representa una liberación controlada de capacidades.

Probablemente, esta es la idea más importante que subyace a todo este asunto.

Durante mucho tiempo, proteger un software de propiedad significaba principalmente proteger su código fuente.

Los modelos más grandes modifican ligeramente esta lógica.

Puede mantener completamente confidenciales sus datos de peso, su arquitectura específica y sus datos de entrenamiento.

Para que su modelo tenga valor comercial, aún debe permitir que otros vean qué puede hacer.

Por lo tanto, cada respuesta es una pequeña demostración de competencia.

Por sí sola, no revela prácticamente nada.

A gran escala, se convierte en un conjunto de datos.

Y este conjunto de datos puede utilizarse para el entrenamiento.

Por lo tanto, poner una IA detrás de una API equivale a vender el acceso a su inteligencia, al mismo tiempo que se intenta evitar que los clientes adquieran el conocimiento necesario para replicarla.

Es una situación que probablemente no se resolverá fácilmente.

Los investigadores ya la habían identificado utilizando modelos mucho más simples hace diez años. Los modelos actuales simplemente han amplificado enormemente el valor que se puede obtener. 

## Y es ahí donde el debate se vuelve realmente incómodo.

Es bastante irónico la situación actual de los grandes laboratorios de inteligencia artificial.

Gran parte de la inteligencia artificial moderna se ha hecho posible gracias al aprendizaje a partir de cantidades masivas de datos generados por otras personas: textos, código, imágenes, conversaciones y documentos disponibles en Internet o obtenidos a través de diferentes licencias y fuentes.

Hoy, las mismas empresas descubren lo desagradable que resulta ver **que su propia producción se convierta en material de entrenamiento para otra persona**.

Esto no significa que las dos situaciones sean legal o técnicamente idénticas.

No, no lo son.

Sin embargo, la simetría es difícil de ignorar.

Durante años, la pregunta central era:

¿Puede una empresa de IA entrenar su modelo utilizando los datos que han creado los humanos?

Ahora surge una segunda pregunta:

¿Puede una empresa de IA entrenar su modelo utilizando los datos generados por otra IA?

Y, a diferencia de lo que la palabra "destilación" podría sugerir, estamos muy lejos de tener una respuesta universal.

## La próxima guerra entre las IA podría no limitarse solo a las GPU.

Se habla mucho sobre los servidores, los centros de datos, la electricidad y las miles de millones de dólares invertidos en el entrenamiento de los modelos.

Todo esto sigue siendo fundamental.

Sin embargo, una nueva fuente de recursos se convierte en estratégica:

**las respuestas generadas por los mejores modelos del mundo.**

Dado que un laboratorio que no cuenta con el mejor profesor puede, al menos en teoría, intentar alquilar, eludir, automatizar o ocultar suficientes accesos para convertir sus conocimientos en datos.

Por lo tanto, las empresas dominantes tendrán que defender simultáneamente dos cosas contradictorias:

hacer que sus modelos sean lo suficientemente accesibles para que sean útiles y rentables.

al tiempo que impiden que sus competidores accedan a ellos para aprender de ellos.

Anthropic puede bloquear 5.000 cuentas.

Aparecerán más.

Google puede detectar cientos de millones de consultas automatizadas.

Los ataques pueden dirigirse a múltiples cuentas.

Los modelos pueden ocultar su proceso de razonamiento.

Los extractores pueden buscar otros señales en las salidas finales.

Y cada mejora que haga un profesor también aumenta el valor potencial de sus clases.

Por lo tanto, la destilación no es simplemente un concepto técnico curioso.

Está convirtiéndose en **uno de los nuevos frentes de la competencia a nivel mundial en inteligencia artificial**.

Y esta técnica tiene una particularidad fascinante: a diferencia del método tradicional, no siempre es necesario acceder al cofre.

A veces, basta con permanecer frente a la puerta y hacer suficientes preguntas pertinentes…

y de escuchar atentamente las respuestas.
