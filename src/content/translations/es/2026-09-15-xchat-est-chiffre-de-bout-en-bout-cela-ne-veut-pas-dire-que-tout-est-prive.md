---
title: XChat está cifrado de extremo a extremo. Eso no significa que todo sea privado
description: 'La desaparición inexplicada de XChat de la App Store llama la atención, pero su protocolo plantea una pregunta mucho más interesante: ¿qué protege realmente una mensajería «privada» cuando los metadatos, las copias de seguridad de claves y Grok entran en la ecuación?'
pubDate: 2026-09-15
draft: false
featured: false
section: computing
contentType: review
tags:
  - XChat
  - X
  - chiffrement
  - cybersécurité
  - confidentialité
coverImage: /images/posts/0f35434a-0d9c-4279-9613-5c775deaf868.png
coverAlt: Una conversación de XChat cifrada protege su contenido pero deja visibles metadatos y puede transmitir un mensaje descifrado a Grok.
author: Voldigoade
locale: es
sourceSlug: 2026-09-15-xchat-est-chiffre-de-bout-en-bout-cela-ne-veut-pas-dire-que-tout-est-prive
sourceHash: da8b4f961a1772c1aec2b2b9e8b54eb10102c99fa7e813ac8b0c0119205c1412
manual: false
---

El 14 de septiembre de 2026, la aplicación XChat desaparece de la App Store.

La búsqueda ya no la devuelve. Su antigua página se vuelve inaccesible. MacRumors actualiza luego su artículo: parece que **X ha retirado él mismo la aplicación**, sin explicar por qué.

En Android, la aplicación sigue disponible. Y, sobre todo, el servicio Chat sigue existiendo en X y en la Web.

No sabemos, pues, hoy si la retirada en iOS corresponde a un problema temporal, una decisión de producto, una modificación técnica u otra cosa.

Inventar una explicación sería fácil.

Pero el incidente llama la atención sobre un tema mucho más interesante y perfectamente documentado:

**¿qué protege realmente XChat?**

La respuesta es notablemente más sutil que «está cifrado» o «X puede leerlo todo».

## Sí, XChat posee efectivamente cifrado de extremo a extremo

Empecemos por evitar una crítica perezosa.

X explica que al primer inicio de Chat, se genera un par de claves pública/privada para el usuario.

Cada conversación dispone luego de su propia clave que sirve para cifrar los mensajes.

El contenido, los enlaces, medios, archivos y reacciones de una conversación cifrada se cifran **antes de salir del dispositivo del remitente**, permanecen cifrados en la infraestructura de X y se descifran en el dispositivo del destinatario.

No es, pues, un simple túnel TLS hasta los servidores de X presentado abusivamente como confidencialidad.

Para las conversaciones indicadas como cifradas, existe realmente una arquitectura E2EE.

Y X ha hecho auditar su protocolo por una empresa tercera, con un informe público referenciado en su propia documentación.

La pregunta seria no es, por tanto:

> «¿Es un cifrado real?»

Sino:

> **« ¿Dónde están exactamente las fronteras de este cifrado?»**

Es mucho más instructivo.

## X puede seguir sabiendo quién habla con quién

El cifrado protege el **contenido**.

No enmascara todos los metadatos.

X indica explícitamente que informaciones tales como **el destinatario y la hora de creación del mensaje no están cifradas**. La plataforma conserva también un rastro cuando un post de X se comparte a través de una conversación cifrada.

Esto ilustra una distinción central en privacidad.

Supongamos que nadie puede leer esta conversación:

```
— On se retrouve à 22 h ?
— Oui.

```

Un operador puede, sin embargo, conocer:

```
Compte A → Compte B
22:03

```

seguido de:

```
Compte B → Compte A
22:04

```

En una sola conversación, eso parece casi insignificante.

A escala de varios meses, los metadatos pueden revelar grafos sociales, hábitos, periodos de actividad y frecuencia de las relaciones.

**Un mensaje cifrado no es un mensaje invisible.**

## La debilidad técnica más importante es reconocida directamente por X

La documentación contiene una sección inusualmente explícita:

**Forward secrecy (secreto hacia adelante).**

Y X dice claramente que su sistema actual no dispone de él.

Si la clave privada de un dispositivo registrado se ve comprometida, un atacante podría descifrar **todos los mensajes cifrados enviados o recibidos por ese dispositivo**. X indica trabajar en la rotación de claves para introducir una forma de confidencialidad persistente ulteriormente.

Para entender por qué es importante, imaginemos dos sistemas.

### Sistema A

Alice y Bob usan siempre una clave capaz de abrir la totalidad de su historial.

Un atacante roba esta clave en 2028.

Puede eventualmente descifrar sus conversaciones registradas de 2026, 2027 y 2028.

### Sistema B

Las claves evolucionan continuamente de manera que las claves antiguas son destruidas o vuelven inútiles.

Un atacante compromete el dispositivo hoy.

Puede causar daños a partir de ahora, pero no recupera automáticamente dos años de historial.

Ese es el objetivo de la *forward secrecy*.

Su ausencia no significa que XChat esté «roto».

Significa que **el impacto temporal de una compromisión de clave es mucho más importante**.

Para una mensajería que se presenta como particularmente privada, es una limitación sustancial.

## Pero X no almacena simplemente tu clave privada en claro

Por el contrario, decir:

> «X guarda tu clave en sus servidores, luego el cifrado no sirve para nada»

sería igualmente falso.

X usa el protocolo de código abierto **Juicebox** para permitir la recuperación multi-dispositivo.

La clave privada se fragmenta en varios trozos almacenados en tres *realms*. Dos usan HSM, módulos hardware diseñados para realizar operaciones criptográficas protegiendo sus secretos.

Hacen falta al menos **dos fragmentos de tres** para reconstruir la clave, con al menos un fragmento proveniente de un realm protegido materialmente.

El PIN del usuario no sale del dispositivo.

Los realms materiales aplican además un límite criptográfico de **20 intentos incorrectos** antes de volver los fragmentos inutilizables. X afirma que esta construcción impide incluso a la empresa probar masivamente todos los códigos PIN hasta encontrar el bueno.

Es una arquitectura notablemente más interesante que «contraseña + clave en una base».

## Queda sin embargo una concentración de confianza

Hoy, los **tres realms Juicebox son operados por X**.

Es un matiz importante.

No significa que X posea mágicamente las claves reconstruidas de todos: la protección del PIN, los HSM y el protocolo están precisamente diseñados para evitarlo.

Pero la separación criptográfica no va acompañada aún de una separación organizativa completa.

X indica querer en el futuro permitir el uso de realms explotados por diferentes organizaciones.

Sería interesante porque la confianza podría entonces volverse realmente distribuida.

Una arquitectura a tres cámaras es más convincente cuando las tres cámaras no pertenecen todas al mismo propietario.

## Ciertas conversaciones empiezan sin cifrado

Otro detalle que la interfaz de usuario debería hacer imposible de ignorar:

las **solicitudes de mensajes pueden no estar cifradas**.

Cuando un usuario contacta a alguien que aún no ha aceptado la conversación cifrada, X indica que la solicitud inicial permanece no cifrada hasta su aceptación.

Grok se usa también para clasificar ciertas de estas solicitudes entre las cajas «Priority» y «Hidden».

No es necesariamente una catástrofe de diseño.

Pero es exactamente el tipo de frontera que hace que la frase genérica:

> «Mis mensajes XChat están cifrados»

sea insuficientemente precisa.

La buena frase es:

> **« El contenido de mis conversaciones indicadas como cifradas se beneficia del cifrado de extremo a extremo, en las condiciones definidas por el protocolo. »**

Es menos bonita en un cartel.

Es mucho más exacta.

## «Preguntar a Grok» abre voluntariamente la caja

XChat contiene una funcionalidad extremadamente reveladora: **Ask Grok**.

Puedes seleccionar un mensaje o una imagen de una conversación y pedir a Grok que la analice.

X precisa entonces algo fundamental:

una vez ese contenido transmitido a Grok, **ya no está cifrado en este contexto**, aunque su copia original permanezca protegida en la conversación.

Esto no constituye una debilidad criptográfica.

Es una consecuencia lógica.

Una IA no puede analizar un texto que se le niega mostrar.

Pero es una excelente ilustración de un principio a menudo olvidado:

> **El cifrado de extremo a extremo protege un trayecto. No protege los datos después de que el usuario decide entregarlos a otro destinatario.**

Si Alice envía un secreto a Bob en una mensajería perfectamente cifrada y Bob lo copia en Grok, ChatGPT, un e-mail o un documento público, ningún protocolo criptográfico puede volver atrás en el tiempo.

La confidencialidad tiene siempre una frontera aplicativa.

## Incluso Grok Companion crea un caso particular

La documentación de X precisa también que los intercambios con un compañero Grok pueden ser transmitidos a través de una capa cifrada, pero que **Grok debe necesariamente descifrar el mensaje para poder entenderlo y responder**.

Otra vez: no es una prueba de engaño.

Es arquitectura.

Pero muestra por qué una interfaz que asocia mensajería privada e inteligencia artificial deberá volverse extremadamente clara sobre **quién constituye el destinatario final**.

Entre:

```
Alice → Bob

```

y:

```
Alice → Grok

```

la palabra «cifrado» puede aparecer en los dos casos.

La propiedad de confidencialidad no es sin embargo la misma.

## Entonces, ¿XChat es seguro?

No existe respuesta seria a esta pregunta sin precisar **contra qué**.

Contra alguien que solo intercepta el tráfico de red?

El cifrado de extremo a extremo constituye una protección importante.

Contra una compromisión de los servidores de almacenamiento de mensajes?

El hecho de que el contenido permanezca cifrado reduce fuertemente este riesgo.

Contra la observación de los metadatos por X?

No: estos no están íntegramente cifrados.

Contra el robo futuro de una clave privada?

La protección es actualmente menos fuerte que un sistema con forward secrecy, ya que X reconoce que una clave comprometida puede exponer el historial del dispositivo.

Contra el análisis de un mensaje voluntariamente enviado a Grok?

No, por definición.

Contra un atacante que intenta simplemente millones de PIN en la infraestructura de recuperación?

Juicebox y los HSM están precisamente diseñados para volver este enfoque imprácticable.

Esto es un **threat model**: no se pregunta si algo es «seguro» en abstracto. Se pregunta qué adversarios, qué capacidades y qué escenarios el sistema está diseñado para soportar.

## La retirada de la App Store es al final la parte menos interesante

En el momento en que se escribe este artículo, seguimos sin saber por qué la aplicación XChat autónoma ha desaparecido de la App Store.

Quizás aprendamos mañana que se trataba de un banal problema de distribución.

Quizás no.

Pero el evento habrá tenido al menos el mérito: llamar la atención sobre una mensajería cuya documentación técnica es mucho más interesante que el debate superficial «¿Puede Elon Musk leer mis mensajes?».

La respuesta real está hecha de capas.

El contenido de las conversaciones cifradas está protegido.

Los metadatos no lo están todos.

Las solicitudes iniciales pueden estar en claro.

La copia de seguridad de claves usa una construcción criptográfica elaborada, pero todos los realms son explotados actualmente por X.

La forward secrecy no está aún presente.

Y un mensaje entregado a Grok debe necesariamente salir de su sobre criptográfico para ser tratado.

Ninguna de estas frases, tomada sola, describe correctamente XChat.

Juntas, muestran algo más general:

**la privacidad no es un interruptor puesto en ON u OFF.**

Es un conjunto de propiedades.

Y «cifrado de extremo a extremo» no es más que una.