---
title: 'Tu navegador ya no solo muestra la Web: empieza a actuar en tu lugar'
description: Firefox aprende tu historial mientras Chrome ya puede navegar en cuentas conectadas, rellenar formularios y preparar compras. Este cambio transforma el navegador en entorno de ejecución para agentes IA y desplaza con él las fronteras de la seguridad.
pubDate: 2026-09-15
draft: false
featured: true
section: computing
contentType: research
tags:
  - agents IA
  - navigateurs IA
  - Chrome
  - Gemini
  - Firefox
  - Smart Window
  - prompt injection
  - cybersécurité
coverImage: /images/posts/171d5d58-d39d-4274-a347-07eafab38d10.png
coverAlt: Un navegador representado como un entorno seguro donde un agente IA navega entre varios servicios conectados, con permisos que bloquean una acción sensible y una instrucción maliciosa oculta en una página.
author: Voldigoade
news: false
seoTitle: 'Navigateurs agents IA : Chrome auto browse face à Firefox Smart Window Description SEO :'
seoTargetQuery: navigateur agent IA Chrome Firefox
locale: es
sourceSlug: 2026-09-15-ton-navigateur-naffiche-plus-seulement-le-web-il-commence-a-agir-a-ta-place
sourceHash: 533c87e3a93f849976085bcf46f64fe56b76b3caffe58cf33281934e48abe893
manual: false
---

Hace apenas unos años, delegar una tarea a tu navegador significaba sobre todo pedirle que rellenara automáticamente una dirección, guardara una contraseña o restaurara pestañas.

En 2026, esa definición ya no se sostiene.

Chrome puede ahora confiar varios pasos de una tarea a Gemini: recorrer sitios, rellenar formularios, usar una sesión ya autenticada, añadir productos a un carrito, organizar una reserva o explotar Google Password Manager con autorización. Firefox, por su lado, acaba de introducir en Francia Smart Window, una ventana en la que un asistente puede explotar las páginas abiertas, recuperar ciertos elementos del historial y construir una memoria de la manera en que navegas.

Sin embargo, los dos navegadores no ofrecen aún lo mismo. **Firefox rechaza precisamente las capacidades más agentivas que Chrome empieza a adoptar.**

Y es esa diferencia la que mejor revela el cambio en curso.

La verdadera revolución del navegador IA no es que se haya añadido un chatbot en una barra lateral. Es que el navegador posee ya casi todo lo que un agente de software necesita: contexto, identidad, sesiones autenticadas, red, aplicaciones, permisos, memoria y una interfaz que permite actuar.

En otras palabras, el navegador empieza a ocupar para los agentes IA una posición extrañamente parecida a la que ocupó el sistema operativo para los programas clásicos.

No porque reemplace a Windows, macOS o Linux.

Sino porque se convierte en **el entorno en el que una intención humana puede transformarse en acciones sobre el mundo digital**.

## La frontera decisiva no está entre Firefox y Chrome, sino entre leer y actuar

Smart Window ha llegado para los usuarios franceses con Firefox 155, publicado el 1 de septiembre de 2026. Mozilla lo describe como una ventana opcional que integra un asistente capaz de resumir páginas, comparar informaciones, trabajar a partir de varias pestañas y recuperar páginas visitadas anteriormente.

También puede modificar una pequeña parte del estado del navegador: agrupar pestañas o cerrar las que corresponden a una petición.

Pero Mozilla traza luego un límite notablemente explícito.

Smart Window no puede clicar en tu lugar en una página, rellenar un formulario, efectuar una compra, reservar un vuelo, modificar los parámetros del navegador, conectarse con tus credenciales guardadas ni « actuar de forma independiente ». Tampoco tiene acceso a contraseñas, informaciones de pago, correos no leídos ni archivos locales.

Chrome auto browse cruza esa frontera.

Google permite a Gemini construir un plan y luego navegar realmente por páginas Web clicando, desplazándose por interfaces y rellenando campos. Google cita entre otras las reservas, formularios administrativos, notas de gastos, suscripciones, recuperación de documentos fiscales, presupuestos profesionales y compras.

La documentación actual va aún más lejos: el agente puede usar sitios en los que el navegador local ya está conectado y, con autorización, pedir a Google Password Manager que le ayude a abrir una sesión en ciertas cuentas. Gemini Spark puede también explotar el navegador local o bascular hacia un navegador remoto para proseguir ciertas tareas.

A la fecha de publicación de este artículo, **auto browse sigue sin embargo limitado a Estados Unidos en ordenador, para los usuarios elegibles de Google AI Pro o Ultra**, con un despliegue progresivo. No hay que confundir pues la existencia técnica de esta arquitectura con su disponibilidad mundial.

Esta tabla resume mejor la diferencia arquitectónica que una lista de funciones:


| Capacidad | Firefox Smart Window | Chrome auto browse |
| ----------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| Entender la página actual | Sí | Sí |
| Explotar varias pestañas | Sí | Sí |
| Interrogar el historial | Sí, según el contexto pedido | Ciertas funciones de Gemini pueden explotar el contexto de navegación |
| Memoria/personalización | Sí | Sí, según las funcionalidades activadas |
| Organizar el navegador | Agrupación/cierre de pestañas | Sí en el marco de tareas agentivas |
| Clicar en un sitio | No | Sí |
| Rellenar un formulario | No | Sí |
| Usar una sesión ya conectada | No para actuar en la cuenta | Sí |
| Explotar un gestor de contraseñas | No | Sí, con permiso y sin revelar directamente la contraseña al modelo |
| Efectuar una tarea multi-sitios | Esencialmente análisis y planificación | Sí |
| Finalizar automáticamente toda acción sensible | No aplicable | No: ciertas etapas imponen confirmación o reprise en main |


Firefox construye por tanto hoy sobre todo un **navegador consciente de su contexto**.

Google experimenta ya un **navegador capaz de ejercer la autoridad de su usuario**.

Es una diferencia mucho más profunda de lo que parece.

## La contraseña ya no es el verdadero privilegio

Cuando se habla de acceso de una IA a nuestras cuentas, la pregunta instintiva es: « ¿Puede ver mi contraseña? »

En Chrome, Google afirma que no. Cuando auto browse usa Google Password Manager, el gestor se encarga de la autenticación sin transmitir el secreto en bruto a Gemini.

Es importante.

Pero eso enmascara casi el problema más interesante.

Supongamos que ya estás conectado a Gmail, Amazon, tu aseguradora, tu operador telefónico o un portal administrativo.

El navegador conserva entonces generalmente cookies, tokens de sesión y otros estados de autenticación que indican al servicio: **este usuario ya ha probado su identidad**.

Un software capaz de actuar dentro de esa sesión ya no necesita necesariamente la contraseña.

Para entender el desafío, hay que distinguir **el secreto que sirve para obtener una autoridad** de **la autoridad misma**.

Tu contraseña permite abrir la puerta. Tu cookie de sesión prueba luego que la puerta ya ha sido abierta.

Es precisamente por eso que Google considera que un agente comprometido operando en un Chrome local representa un riesgo de fuga desde los sitios ya conectados y construye nuevas barreras alrededor de esas sesiones.

El navegador posee por tanto algo que un chatbot clásico casi nunca tiene: **tu identidad operacional en la Web**.

Ahí es donde empieza realmente la analogía con un sistema operativo.

## El navegador posee ya casi todas las primitivas necesarias para un agente

Un sistema operativo clásico no se limita a dibujar ventanas.

Proporciona un entorno que permite a los programas obtener recursos, conservar un estado, pedir permisos, comunicarse con otros servicios y actuar con ciertos privilegios.

Para una inmensa parte de nuestra vida digital, el navegador proporciona ahora el equivalente funcional.

La « aplicación » se ha convertido en la página Web. El origen `example.com`, por ejemplo, juega el papel de una frontera de seguridad. Las cookies y sesiones portan la identidad. El almacenamiento Web conserva el estado. Las API del navegador exponen localización, cámara, micrófono o notificaciones. Las pestañas encapsulan diferentes contextos. El gestor de contraseñas actúa como una caja fuerte de credenciales.

Un agente colocado encima de este conjunto obtiene entonces tres cosas esenciales.

Puede **observar** el entorno: leer páginas, pestañas, a veces un historial o servicios conectados.

Puede **razonar** sobre este entorno: « debo encontrar tres hoteles, comparar sus precios, verificar el calendario y luego rellenar el formulario ».

Y sobre todo, puede **actuar**: abrir una página, clicar, teclear, enviar informaciones o desencadenar una operación.

El salto entre las dos primeras capacidades y la tercera es inmenso.

Un asistente que se equivoca resumiendo un hotel te da una mala respuesta.

Un agente que se equivoca usando ese hotel puede reservar la habitación equivocada.

Es exactamente lo que OWASP designa bajo el concepto de **excessive agency**: las consecuencias de un error ya no dependen solo de lo que el modelo escribe, sino de las funciones, permisos y grados de autonomía que se le han concedido.

El modelo se convierte entonces solo en un componente de seguridad entre otros.

El verdadero producto es el sistema que decide **lo que tiene derecho a ver y a hacer**.

## La inyección de prompt cambia completamente de gravedad cuando un modelo puede clicar

Una página Web tradicional mezcla ya contenido controlado por varios actores: texto del editor, publicidad, comentarios, iframes, recomendaciones, resultados de usuarios.

Para ti, una frase escrita en una página es normalmente una información.

Para un gran modelo de lenguaje, una frase puede parecerse también a una instrucción.

Es el corazón de la **inyección indirecta de prompt**.

Una página puede contener una instrucción destinada no al humano que la consulta, sino al agente que la analiza.

Por ejemplo: ignorar el objetivo anterior, consultar otro sitio, recuperar una información privada o enviar ciertos datos.

Google cita explícitamente escenarios en los que una inyección buscaría extraer informaciones provenientes de correos o documentos, transferir mensajes Gmail hacia un servicio externo o revelar datos procedentes de aplicaciones conectadas.

Este riesgo ya no es puramente teórico.

En abril de 2026, el equipo de seguridad de Google analizó la Web pública mediante varias instantáneas de Common Crawl y encontró inyecciones destinadas a agentes: algunas humorísticas, otras destinadas a manipular el SEO IA, y un número más reducido apuntando a la exfiltración o destrucción de datos. Entre noviembre de 2025 y febrero de 2026, Google indica haber observado un aumento relativo del 32 % de la categoría considerada maliciosa. La empresa precisa sin embargo que esos ataques observados seguían siendo generalmente poco sofisticados y que su estudio no cubría una gran parte de las redes sociales.

La investigación académica muestra en paralelo por qué sería imprudente esperar que los modelos resuelvan solos el problema.

El benchmark WASP ha probado diferentes arquitecturas de agentes Web contra inyecciones realistas. Según las configuraciones, los agentes empezaban a seguir la instrucción hostil en **el 16 al 86 %** de los casos probados. No lograban sin embargo el objetivo malicioso completo más que en **el 0 al 17 %** de los casos, notablemente porque los propios agentes seguían siendo imperfectos. Estas cifras no miden Chrome auto browse, pero muestran una propiedad fundamental del problema: mejorar las capacidades de acción de un agente puede también hacer más explotables desvíos que fallaban antes simplemente porque el agente era malo.

En otras palabras, **los progresos de fiabilidad de los agentes son simultáneamente progresos de fiabilidad para un atacante que lograra desviarlos**.

## Google está inventando primitivas de seguridad para este nuevo « OS »

La respuesta de Chrome al problema es particularmente reveladora.

Google no intenta solo entrenar a Gemini para « no obedecer a páginas maliciosas ».

Añade nuevas barreras arquitecturales alrededor del modelo.

Una de ellas es el **User Alignment Critic**. El modelo principal prepara una acción a partir del contenido Web que consulta. Un segundo componente, voluntariamente privado del contenido Web no fiable, recibe luego una representación limitada de la acción prevista y juzga si corresponde realmente al objetivo dado por el usuario.

La idea es importante: no pedir al componente expuesto al ataque que sea también su único juez.

Chrome introduce luego los **Agent Origin Sets**.

El navegador conoce desde hace tiempo el concepto de origen: dos sitios diferentes no deben poder acceder libremente a los datos del uno del otro. Para sus agentes, Google prolonga esta lógica distinguiendo los orígenes que el agente puede solo leer de aquellos sobre los que puede también actuar.

Una página no pertinente puede así ser excluida de lo que ve el modelo. Un origen nuevo pedido por el agente debe ser controlado. Google aplica también restricciones deterministas a las URL generadas por el modelo para limitar ciertos mecanismos de exfiltración.

Ya no es solo « AI safety ».

Es **control de capacidades**.

Y eso se parece mucho a los problemas que los sistemas operativos intentan resolver desde hace décadas: qué proceso puede acceder a qué recurso, con qué permiso, durante cuánto tiempo y para realizar qué operación.

El paralelo se vuelve aún más claro con las acciones sensibles.

Chrome prevé confirmaciones o reprises en main para ciertas operaciones: navegación hacia categorías de sitios muy sensibles, autenticación vía Password Manager, compras, pagos, envío de mensajes u otras acciones de altas consecuencias. El usuario puede también observar el diario de trabajo y parar al agente.

El modelo antiguo era:

**sitio → pide un permiso → usuario acepta o rechaza.**

El agente introduce un modelo más difícil:

**usuario → expresa una intención → agente interpreta la intención → descubre sitios → recupera datos → elige acciones → el navegador debe decidir cuáles permanecen conformes a la intención inicial.**

El permiso ya no porta pues solo sobre un recurso.

Porta sobre **el sentido de una acción**.

Y una máquina debe verificar ahora ese sentido.

## Firefox reduce el problema rechazando aún la autoridad

La estrategia actual de Mozilla es casi la inversa.

Smart Window se beneficia de una cantidad de contexto que habría parecido extraordinariamente intrusiva para un chatbot integrado al navegador hace unos años, pero el asistente dispone de muy pocas capacidades de acción.

Puede explotar la página actual, pestañas añadidas explícitamente y cierta información del historial cuando una petición lo requiere. Puede también producir « memories » a partir de la actividad del navegador y de las conversaciones si el usuario activa esta función.

Durante la inicialización, Mozilla indica que hasta **60 días o 3 000 elementos de historial**, según el límite alcanzado primero, pueden ser tratados para generar esos recuerdos. Los datos pasan temporalmente por los servidores de Mozilla, pero los recuerdos obtenidos son luego almacenados localmente; Mozilla afirma no conservar esos datos después del tratamiento.

Esto representa sin embargo un cambio mayor para Firefox.

Un navegador clásico se acuerda principalmente **a dónde fuiste**.

Un navegador dotado de memoria intenta inferir **lo que te interesa** a partir de esos desplazamientos.

Mozilla añade filtros destinados a evitar ciertas memorias vinculadas notamment a la salud, las finanzas o lo jurídico, permite su supresión y excluye las ventanas privadas. Smart Window puede incluso usar un endpoint compatible con la API OpenAI elegido por el usuario, incluido un modelo local.

Pero la defensa más eficaz sigue siendo hoy extremadamente simple:

**Smart Window no puede actuar en las páginas.**

Una inyección que influye en una comparación de productos constituye un problema de integridad de la información.

Una inyección que controla un agente que tiene acceso a Gmail, una cuenta de comerciante y un formulario se convierte potencialmente en un problema de confidencialidad e integridad de las cuentas.

Mozilla reconoce sin embargo explícitamente el riesgo de inyección de prompt e indica emplear notamment una separación entre datos e instrucciones así como restricciones de acciones cuando el sistema trata contenido no fiable.

Eso sugiere que Firefox construye ya cimientos para una arquitectura más agentiva.

Pero, hoy, la diferencia de filosofía es neta: **Mozilla enriquece primero el contexto; Google extiende ya la autoridad.**

## Los permisos de los agentes corren el riesgo de ser mucho más difíciles de entender que los de las aplicaciones

En smartphone, un permiso puede ser relativamente inteligible.

« ¿Permitir el acceso a la cámara? »

El recurso es claro.

Para un agente, el equivalente podría devenir:

« ¿Permitir a Gemini realizar esta tarea? »

Pero ¿qué significa exactamente *esta tarea*?

Si pides « organiza mi viaje », ¿el agente debe poder leer un correo que contiene los horarios de una conferencia? ¿Consultar tu calendario? ¿Usar tu localización? ¿Transmitir tu nombre a un hotel? ¿Rellenar tu número de fidelidad? ¿Abrir un sitio que no estaba previsto cuando lanzaste la tarea?

Cada etapa puede ser perfectamente razonable tomada por separado.

El peligro aparece en su composición.

Es una de las propiedades más inquietantes de los agentes: **permisos benignos pueden formar juntos una capacidad extremadamente poderosa**.

Acceso al calendario + Gmail + navegador autenticado + formularios + historial + gestor de contraseñas no significa simplemente « seis funcionalidades ».

Significa potencialmente un software capaz de saber a dónde debes ir, recuperar una reserva, conectarse al proveedor, modificarla y avisar a alguien del cambio.

El navegador se convierte entonces en un **corredor de autoridad**.

Y las confirmaciones permanentes no constituyen una solución perfecta. Más el sistema pide la aprobación del usuario, menos es autónomo; más enmascara esas interrupciones, más aumenta el riesgo de acción no deseada.

Es un compromiso estructural, no un bug temporal de interfaz.

## La identidad se convierte en una superficie de ataque por derecho propio

Los agentes de navegador crean también una nueva distinción entre « datos privados » y « capacidad para actuar en tu nombre ».

No es lo mismo.

Un atacante que roba un archivo obtiene un dato.

Un agente desviado que actúa en una sesión autenticada puede eventualmente obtener algo más útil: **la posibilidad de pedir al servicio que realice una operación en nombre del usuario**.

Es el clásico problema del *confused deputy* aplicado a los agentes: un componente legítimo posee privilegios, pero otro actor logra influir en la manera en que los ejerce.

El atacante no necesita entonces robar directamente tu identidad.

Intenta convencer al software que ya posee esa identidad de que la use para él.

Las defensas de Chrome alrededor de los orígenes cobran aquí todo su sentido. Limitando lo que el agente puede leer y los sitios sobre los que puede escribir, Google intenta reducir la cantidad de autoridad ambiente disponible durante una tarea.

Este principio podría volverse tan fundamental para los agentes como el sandbox lo fue para los navegadores clásicos.

## El navegador no reemplaza sin embargo realmente el sistema operativo

La analogía tiene sus límites.

Chrome o Firefox no controlan directamente el procesador, la memoria física, los drivers, los archivos del sistema o el aislamiento material. Reposan siempre sobre los mecanismos de Windows, macOS, Linux, Android o iOS.

Los agentes pueden par ailleurs funcionar encima del propio sistema operativo, usar APIs directamente o trabajar en máquinas virtuales remotas sin interfaz gráfica.

Decir que el navegador « se vuelve el nuevo OS » en sentido literal sería pues exagerado.

Una formulación más precisa sería:

**el navegador se vuelve el sistema operativo de nuestra identidad Web.**

Es ya el lugar donde cohabitan una gran parte de nuestras aplicaciones, de nuestras sesiones y de nuestras comunicaciones. El agente añade la pieza que faltaba: un ordenador cognitivo capaz de recibir un objetivo abstracto y decidir qué aplicaciones Web movilizar para lograrlo.

El ser humano deja progresivamente de proporcionar la secuencia de acciones.

Proporciona la intención.

## La unidad fundamental de la Web podría pasar del clic a la intención

Durante tres décadas, una inmensa parte de la seguridad de la Web ha reposado sobre una hipótesis silenciosa: **el usuario es el que clica**.

Un sitio puede engañar al usuario. Una extensión puede desviar un navegador. Un script puede explotar una vulnerabilidad.

Pero el navegador en sí no decidía normalmente que un botón merecía ser pulsado porque correspondía aproximadamente a tu objetivo.

Los agentes cambian esa hipótesis.

Cuando pides « renueva mi suscripción pero encuéntrame una fórmula más barata », el sistema debe interpretar qué significa « más barata », determinar qué sitio usar, entender su interfaz, acceder a la cuenta apropiada, identificar las consecuencias y saber en qué momento tu acuerdo se vuelve indispensable.

El navegador ya no transporta simplemente intenciones humanas expresadas por clics.

**Empieza a compilarlas en acciones.**

Y eso hace aparecer un nuevo problema de seguridad extraordinariamente difícil.

Para un navegador tradicional, había que determinar notamment:

*¿este sitio tiene derecho a acceder a este dato?*

Para un navegador agentivo, la pregunta se vuelve:

**¿esta acción corresponde realmente a lo que el humano quería, a pesar de todo lo que el agente acaba de leer en la Web?**

Chrome empieza a crear mecanismos específicos para responder a esta pregunta. Firefox, por ahora, evita en gran medida tener que planteársela manteniendo su asistente del lado de la observación más que de la ejecución.

Pero la dirección general es difícil de pasar por alto.

El navegador era el software en el que usábamos Internet.

Se vuelve progresivamente **el software al que damos Internet a usar en nuestro lugar**.