---
title: 'Nvidia, Palantir, Booz Allen: por qué los campeones de la IA limitan lo que confían a los modelos externos'
description: Los mejores modelos prometen enormes ganancias de productividad, pero sus API, registros y herramientas crean nuevas fronteras de confianza. En 2026, el mejor compromiso entre potencia y confidencialidad no es ni todo en la nube ni todo en local.
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: article
tags:
  - confidentialité IA
  - Zero Data Retention
  - Nvidia
  - Palantir
  - Booz Allen
  - modèles locaux
  - cloud privé
  - sécurité des données
coverImage: /images/posts/911abae5-075a-4928-ba96-69a62aca2282.png
coverAlt: Los datos empresariales permanecen en una infraestructura segura mientras una conexión controlada permite utilizar un modelo de IA alojado de forma remota.
author: Voldigoade
news: true
seoTargetQuery: peut-on confier des données sensibles à une IA
locale: es
sourceSlug: 2026-09-15-nvidia-palantir-booz-allen-pourquoi-les-champions-de-lia-limitent-ce-quils-confient-aux-modeles-externes
sourceHash: b7924f772a681bac7b00da36500de8ee64e164ac873b3867dd4c9eee518c2dd5
manual: false
---

El 10 de septiembre de 2026, Nvidia y Palantir anunciaban juntas una infraestructura de «IA soberana» destinada, entre otros, a la cadena logística de Nvidia. El principio destacado era casi paradójico para dos empresas en el corazón de la revolución actual: usar la IA masivamente, manteniendo al mismo tiempo el control sobre los datos propietarios y sobre el entorno en el que operan los modelos.

Cuatro días después, el paradoja se volvía mucho más explícita.

Según una investigación de *The Information* replicada por Reuters, Palantir habría pedido a Anthropic garantías **irrevocables de Zero Data Retention** antes de poner ciertos de sus modelos a disposición en su software. Nvidia limitaría el uso de los modelos de Anthropic a las tareas menos sensibles y usaría más sus propios Nemotron para sus trabajos internos. Booz Allen Hamilton habría, por su parte, prohibido el uso del servicio comercial de Anthropic para ciertos trabajos propietarios de ciberseguridad.

Sin embargo, no son empresas hostiles a la IA externa. Booz Allen anunciaba todavía en junio una asociación con OpenAI para desplegar sistemas avanzados ante agencias públicas e infraestructuras críticas.

El problema es, pues, más interesante que un simple «las empresas temen a la nube».

**Las organizaciones que probablemente entienden mejor lo que la IA puede aportarles están también entre las que mejor saben lo que arriesgan al darle demasiado contexto.**

Y ese riesgo a menudo se comprende mal.

## El problema ya no es realmente «mi código va a entrenar al próximo GPT**

Es el temor intuitivo: se envía un prototipo confidencial a un modelo, la empresa que lo explota lo añade a su conjunto de entrenamiento y el secreto termina un día apareciendo ante otro usuario.

Para las ofertas profesionales serias, este escenario ya no es generalmente el comportamiento por defecto.

OpenAI indica que los datos enviados a su API no sirven para entrenar o mejorar sus modelos salvo elección explícita del cliente. Anthropic afirma también que los datos conservados en sus ofertas comerciales no se usan para el entrenamiento sin autorización expresa. Palantir afirma de su lado obtener garantías técnicas y contractuales que impiden a los proveedores de modelos accesibles vía AIP conservar los prompts, las respuestas o usarlas para reentrenar sus modelos.

Sería, pues, un error reducir el problema al entrenamiento.

El verdadero tema es: **¿cuántas copias temporales o permanentes de tu secreto pueden existir mientras el servicio funciona?**

Un prompt enviado a un modelo puede atravesar varias capas: aplicación, proxy, API gateway, sistema antiabuso, caché, servicio de inferencia, almacenamiento de conversación, herramientas, motor RAG, sistema de trazas y a veces servicios de terceros.

Ninguna de estas capas necesita entrenar un modelo para convertirse en una nueva superficie de fuga.

## «No entrenamos con tus datos» no es lo mismo que «no guardamos nada**

OpenAI es un buen ejemplo.

Por defecto, sus API producen registros destinados, entre otros, a la detección de abusos, susceptibles de contener prompts, respuestas y metadatos. Su duración de conservación puede alcanzar 30 días.

Los clientes elegibles pueden solicitar el **Zero Data Retention**, o ZDR. En esta configuración, el contenido del cliente se excluye de esos registros y ciertas API se fuerzan a funcionar sin persistencia.

Pero ZDR no es un botón mágico aplicado uniformemente a toda la plataforma.

Las conversaciones persistentes, agentes, archivos, vector stores y distintas funciones stateful poseen sus propias reglas. Algunas simplemente no son elegibles para ZDR. Los datos enviados a un servidor MCP remoto dependen, por lo demás, de la política de ese servidor, y no solo de la de OpenAI.

Anthropic presenta una distinción comparable.

En un acuerdo ZDR, la empresa indica no conservar los prompts y respuestas **en reposo tras el retorno de la respuesta**. Pero las interfaces Claude Teams y Enterprise ordinarias no son equivalentes a una API ZDR, ciertos agentes son stateful, ciertas funcionalidades conservan datos y, desde junio de 2026, varios de sus modelos avanzados llamados «Covered Models» imponen una conservación de 30 días salvo acuerdo específico.

Esta modificación ayuda a entender la reacción reportada de Palantir.

Una empresa puede confiar perfectamente en los compromisos de un proveedor hoy, mientras rechaza una arquitectura en la que ese proveedor conserve el derecho técnico o contractual de modificar mañana la duración de retención de un nuevo modelo.

Para código ordinario, treinta días pueden parecer insignificantes.

Para una vulnerabilidad desconocida, una arquitectura militar, la máscara de un chip aún secreto o el diseño de un producto que no saldrá sino dentro de dos años, **30 días representan 30 días de más**.

## Qué significa realmente Zero Data Retention

El término es casi engañoso cuando se lee literalmente.

ZDR no quiere decir generalmente que ningún byte correspondiente al prompt exista jamás en las máquinas del proveedor. Sin tratar los datos, el modelo no podría evidentemente producir respuesta.

La distinción importante es la que hay entre **tratamiento transitorio** y **almacenamiento persistente**.

Un proveedor puede recibir una petición en memoria viva, tratarla en GPU y luego borrar ese estado cuando la operación termina, sin escribir duraderamente el prompt en una base o un registro.

Google, por ejemplo, documenta ciertos mecanismos de caché en memoria en su infraestructura Gemini: los datos pueden quedar temporalmente en memoria para acelerar las peticiones sin ser considerados como almacenados «at rest». Google explica también que ciertas funciones hacen imposible un verdadero ZDR: persistencia de una conversación, grounding a través de ciertos servicios o funciones que requieren ellos mismos una conservación.

La palabra importante no es, pues, «cero».

Es **retención**.

Y aun ahí, queda la pregunta siguiente: *¿retención por quién?*

## Pasar por AWS o Azure puede cambiar completamente la frontera de confianza

Llamar directamente a un modelo vía la API de su creador y usar ese mismo modelo a través de un hiperscaler pueden constituir dos arquitecturas de seguridad muy diferentes.

Amazon explica, por ejemplo, que los proveedores de modelos disponibles vía Bedrock no tienen acceso a las cuentas usadas por AWS para su despliegue, ni a los logs Bedrock, prompts o respuestas de los clientes. El modelo es proporcionado a Amazon, y luego ejecutado en una infraestructura controlada por AWS.

Eso no significa siempre «ninguna conservación».

Para ciertos modelos Anthropic que imponen actualmente una revisión particular, AWS indica poder conservar prompts y respuestas hasta 30 días **en su propio perímetro**, sin transmitirlos a Anthropic.

Microsoft adopta una lógica similar en Foundry. Microsoft afirma que los prompts y respuestas de los modelos vendidos por Azure no son accesibles a OpenAI ni a los otros creadores de esos modelos y no sirven para entrenar sus fundaciones. En la configuración estándar, ciertos contenidos señalados pueden, no obstante, conservarse para una revisión antiabuso por empleados Microsoft; un régimen de vigilancia modificado puede suprimir esta etapa para las organizaciones aprobadas.

La elección ya no es, pues, simplemente:

**«¿Confío en OpenAI o en Anthropic?»**

Se vuelve:

**«¿A qué organizaciones, máquinas, registros y administradores estoy dispuesto a exponer esta categoría precisa de informaciones?»**

## La «nube privada» no es necesariamente privada en el sentido que se imagina

Otra confusión frecuente concierne a los VPC, Private Link y endpoints privados.

Azure permite, por ejemplo, desactivar el acceso de red público a Microsoft Foundry y usar endpoints privados. Las comunicaciones pueden entonces circular dentro de una red virtual controlada por la empresa y sobre la infraestructura de red de Microsoft, sin exponer directamente el servicio en Internet.

AWS propone una arquitectura equivalente con PrivateLink para Bedrock, que permite llamar al servicio desde un VPC sin pasar por una pasarela Internet o una dirección IP pública.

Es extremadamente útil.

Pero **red privada no quiere decir cálculo privado**.

PrivateLink protege ante todo el camino entre tu infraestructura y el servicio. Reduce ciertas posibilidades de interceptación, de exfiltración accidental o de exposición de red.

El cálculo sigue efectuándose, no obstante, en AWS, Azure o Google.

No es, pues, una alternativa al ZDR, a las condiciones contractuales o al control de los datos: es una capa adicional.

## Con los agentes, el proveedor del modelo ni siquiera es ya forzosamente el eslabón más peligroso

Los chatbots clásicos recibían esencialmente un texto y devolvían un texto.

Los agentes modernos pueden leer un repositorio Git, abrir una base de datos, ejecutar código, llamar una API, recuperar un documento, usar un servidor MCP o navegar por la Web.

La frontera de datos se vuelve, pues, mucho más vasta.

Incluso si el proveedor del modelo respeta perfectamente su ZDR, un agente puede enviar una información hacia una herramienta externa que, ella, la conserve.

OpenAI advierte explícitamente que las informaciones enviadas a servidores MCP remotos dependen de la política de esos servicios. Anthropic excluye de manera comparable las integraciones de terceros de su cobertura ZDR.

La fuga puede también ser provocada por una **inyección de prompt indirecta**: un agente lee un documento o una página controlada por un atacante, interpreta su contenido como una instrucción y usa luego los permisos que se le han concedido para revelar informaciones.

El problema ya no es, pues, simplemente la confidencialidad del modelo.

Es la del **conjunto del grafo de herramientas** alrededor del modelo.

El equipo de red team de Nvidia recomienda justamente no confiar esa seguridad a las solas instrucciones del LLM: control de acceso, sandboxing, filtrado de red saliente y gestión externa de secretos deben imponerse por mecanismos deterministas que el modelo no pueda eludir él mismo.

## Los modelos locales parecen resolver el problema. Hasta que se mira quién debe ahora asegurar todo

La respuesta más radical parece evidente:

Descargar el modelo. Desconectar Internet. Guardar los datos en casa.

En una arquitectura realmente air-gapped, es efectivamente la manera más directa de eliminar al proveedor del modelo de la cadena de tratamiento.

Nvidia documenta explícitamente despliegues NIM en entornos air-gapped, y Palantir/Nvidia presentan sus modelos Nemotron abiertos como una manera de conservar modelos, datos y entrenamiento en una infraestructura controlada por el cliente.

El compromiso en capacidades es, por lo demás, menos evidente que lo era aún recientemente. En julio, el NIST ha evaluado, por ejemplo, el open-weight GLM-5.2 como globalmente comparable a GPT-5.2 en su conjunto de evaluaciones. Eso no significa, evidentemente, que un modelo abierto iguale a los mejores modelos cerrados en todos los dominios, pero la brecha ya no es sistemáticamente la de un «pequeño modelo local» frente a una inteligencia inaccesible.

En cambio, el riesgo no desaparece.

Cambia de propietario.

Hay que asegurar, a partir de ahora, los pesos, las imágenes de contenedor, el servidor de inferencia, los drivers GPU, las dependencias, los accesos de administrador, las copias de seguridad, la telemetría, los agentes y toda la cadena de software.

Una empresa incapaz de mantener correctamente esa infraestructura puede perfectamente obtener **menos seguridad autoalojándose** que usando Azure, AWS o Google correctamente configurado.

Es uno de los contraargumentos más importantes al reflejo «local = seguro».

## Una tercera vía empieza a volverse mucho más interesante: el cálculo confidencial

Existe una arquitectura que busca precisamente resolver el conflicto entre la empresa que quiere proteger sus datos y el laboratorio que quiere proteger su modelo propietario.

Nvidia documenta ahora una arquitectura de **Confidential Computing** en la que un modelo cerrado puede ser enviado cifrado sobre una infraestructura controlada por el cliente.

La ejecución se desarrolla dentro de un entorno material atestado. Las claves que permiten descifrar el modelo no se entregan sino tras la verificación de la integridad del entorno. El proveedor conserva, pues, sus pesos secretos, mientras que el propietario de los datos guarda sus entradas y salidas en su propio perímetro; Nvidia indica que el proveedor del modelo no las ve.

Conceptualmente, es casi la arquitectura ideal:

el modelo puede seguir siendo propietario sin obligar a la empresa a enviar sus secretos al propietario del modelo.

Sigue siendo, no obstante, más costosa y notablemente menos trivial que una simple llamada API.

## Entonces, ¿qué arquitectura protege mejor los secretos sin sacrificar los mejores modelos?**

No existe una única buena respuesta porque no todos los datos de una empresa valen lo mismo.


| Arquitectura | Potencia accesible | Control de los datos | Principal compromiso |
| ------------------------------- | ------------------------ | -------------------- | -------------------------------------------------------------- |
| Chatbot SaaS estándar | Muy alta | Baja a media | Producto stateful, reglas de retención propias de la interfaz |
| API de un modelo frontier | Muy alta | Buena | El proveedor permanece en la frontera de confianza |
| API frontier con ZDR | Muy alta | Muy buena | Funcionalidades a veces incompatibles o sujetas a excepciones |
| AWS/Azure/Google + red privada | Muy alta | Muy buena | La nube sigue siendo operadora del tratamiento |
| Modelo open-weight autoalojado | Variable a alta | Excelente | Coste hardware, mantenimiento y seguridad a tu cargo |
| Air gap | Variable a alta | Máximo | Fuerte pérdida de flexibilidad e integraciones |
| Confidential Computing | Potencialmente frontier | Excelente | Disponibilidad, coste y complejidad |


Para la mayoría de las empresas, **el mejor compromiso en 2026 es probablemente no elegir una sola de estas arquitecturas**.

La mejor arquitectura es híbrida.

Un gateway interno conoce la clasificación de los datos y decide qué modelo puede recibirlos. Las informaciones ordinarias pueden ir hacia el mejor modelo frontier disponible. Los datos confidenciales usan un proveedor aprobado con ZDR, red privada, IAM estricto y ausencia de funciones persistentes innecesarias. Los secretos más críticos permanecen en un modelo autoalojado, air-gapped o en un entorno de cálculo confidencial.

Un sistema RAG no transmite al modelo más que los fragmentos necesarios en lugar de un repositorio o una base entera. Las claves API y contraseñas se retiran antes de la inferencia. Los agentes disponen de autorizaciones mínimas y sus comunicaciones salientes son filtradas. Las trazas técnicas registran la identidad del modelo, el coste y las decisiones de seguridad sin recopiar sistemáticamente el contenido confidencial.

Esta arquitectura es menos espectacular que un gigantesco modelo «privado».

Es también mucho más realista.

## Lo que Nvidia y Palantir están quizá mostrando

El desarrollo más revelador de estos últimos días no es, en fin, que Nvidia usaría ciertos modelos externos con prudencia.

Es que, al mismo tiempo, Nvidia y Palantir despliegan **sus propios modelos abiertos y personalizables sobre los datos internos de Nvidia**, insistiendo públicamente en la conservación del control y de la propiedad de las informaciones usadas.

Parece menos una crisis de confianza hacia la IA que el nacimiento de una nueva separación arquitectural.

Durante algunos años, la competencia consistía principalmente en obtener **el mejor modelo**.

En las empresas que poseen mucha propiedad intelectual, una segunda competencia se vuelve ahora igual de importante:

**obtener el mejor modelo que se pueda razonablemente dejar ver sus datos.**

Y no será necesariamente el mismo.

El futuro de la IA empresarial podría, pues, ser mucho menos monolítico de lo que se imaginaba: modelos frontier remotos para los problemas difíciles, modelos soberanos para los datos estratégicos, políticas automáticas para enrutar las peticiones entre ellos y, todo alrededor, una infraestructura de seguridad devenue casi tan importante como la inteligencia del modelo mismo.

Es quizás el verdadero paradoja de la IA profesional en 2026.

Cuanto más los modelos se vuelven capaces de comprender el código, la investigación, los contratos y las decisiones internas de una empresa, **más ese contexto se vuelve valioso para proteger precisamente porque la IA sabe ahora extraer algo de él.**