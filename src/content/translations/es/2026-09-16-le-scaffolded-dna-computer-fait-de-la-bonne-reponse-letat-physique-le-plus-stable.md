---
title: "El Scaffolded DNA Computer hace de la respuesta correcta el estado físico más estable"
description: "Un ordenador molecular publicado en Nature no se limita a calcular con ADN: está concebido para que las configuraciones erróneas queden físicamente desfavorecidas y el sistema derive espontáneamente hacia el resultado. Una idea elegante, potente y aún muy lejos de reemplazar a un procesador."
pubDate: 2026-09-16
draft: false
featured: true
section: computing
contentType: article
tags:
  - Scaffolded DNA Computer
  - calcul moléculaire
  - DNA computing
  - thermodynamique du calcul
  - ADN
  - nanotechnologie
  - Maynooth University
coverImage: /images/posts/ef9bd87a-709e-4bf3-b9de-0317fbf613b3.png
coverAlt: "Visualización de un ordenador molecular donde cadenas cortas de ADN se ensamblan a lo largo de un scaffold, mientras que las configuraciones incorrectas quedan desfavorecidas en beneficio de una estructura estable correspondiente al resultado."
author: Voldigoade
news: true
seoTitle: "Scaffolded DNA Computer : l’ordinateur ADN où la bonne réponse est thermodynamiquement favorisée"
seoTargetQuery: "Scaffolded DNA Computer thermodynamique"
locale: es
sourceSlug: 2026-09-16-le-scaffolded-dna-computer-fait-de-la-bonne-reponse-letat-physique-le-plus-stable
sourceHash: 52f909130982eb56103329d02609598d6c5ad1b89b6a8c051303e07b6428a129
manual: false
---

El hallazgo más sugerente publicado hoy en *Nature* no radica en que un grupo científico haya conseguido «computar con ADN». Leonard Adleman ya lo demostró hace más de treinta años. La verdadera ruptura conceptual se halla en otra vertiente: **¿y si programásemos la materia de modo que la respuesta correcta a un cómputo fuese precisamente el estado físico hacia el que prefiere evolucionar?**

Esa es la premisa del **Scaffolded DNA Computer**, o SDC, presentado por Tristan Stérin, Abeer Eshra, Constantine Glen Evans, Janet Adio y Damien Woods. Su sistema ejecuta diez programas moleculares, desde la comprobación de paridad hasta la multiplicación, división y suma de números binarios de 25 bits. Los autores reportan más de 700 ensayos experimentales, pequeñas instancias completadas en 30 a 60 segundos, algoritmos reutilizados hasta 25 veces y un escalado que describen como **100 bits de computación molecular**.

Sin embargo, estas métricas cobran auténtico interés al desentrañar qué altera el SDC en la física misma del procesamiento.

## La inmensa mayoría de los ordenadores deben impedir que la física se imponga

Un ordenador digital convencional sostiene estados lógicos fidedignos en un entorno surcado de fluctuaciones térmicas, ruido y disipación. Se conmutan transistores, se regeneran y sincronizan señales, se estabilizan memorias y se detectan o subsanan fallos. Los pormenores difieren de raíz entre un chip CMOS y una reacción de ADN, pero subyace un axioma universal: **el resultado pretendido no constituye forzosamente el estado de equilibrio espontáneo del sistema físico**.

Se trata de un principio clásico en la termodinámica de la información. Rolf Landauer probó ya en 1961 que las operaciones lógicamente irreversibles arrastran un coste termodinámico ineludible; Charles Bennett formalizó después el nexo entre reversibilidad lógica, ruido térmico y disipación de calor. Ello no implica que «todo cómputo deba devorar ingentes cantidades de energía» ni que el SDC sortee milagrosamente el principio de Landauer. Sugiere más bien que un computador material ha de desplegar recursos para retener y manipular información contraviniendo las tendencias termodinámicas de su soporte.

El conflicto se hace patente en la computación molecular.

Los circuitos basados en desplazamiento de cadenas de ADN, verbigracia, se conciben a menudo como cadenas secuenciales de reacciones: A dispara B, que libera C, que activa D. Los investigadores se ven forzados a acompasar velocidades relativas, sortear interacciones parásitas, limitar fugas y evitar que la mezcla alcance de forma prematura configuraciones químicamente estables pero erróneas desde el prisma informático.

Dicho de otro modo, se **programa una trayectoria cinética**.

El SDC persigue prácticamente lo contrario: **programar el destino termodinámico**.

## Un programa cuyo desenlace reposa en el fondo del valle

Imaginemos una orografía montañosa. Cada coordenada representa una configuración factible del sistema molecular y su altitud traduce su energía libre.

En una arquitectura clásica alejada del equilibrio, el programa se asemeja a un sendero señalizado: el flujo debe transitar rutas concretas en riguroso orden esquivando bifurcaciones indebidas.

En el SDC, el propósito es modelar el propio relieve para que la solución del algoritmo descanse en el valle de mayor estabilidad energética.

Esta concepción supera la mera analogía didáctica. Vertebra el diseño del dispositivo presentado en *Nature*. Los científicos buscan que la arquitectura molecular afín a la solución exacta resulte energéticamente más favorable que cualquier ensamblaje contaminado por errores. Sus deducciones de mínimos de energía libre y funciones de partición anticipan que, en los parámetros adecuados, la probabilidad de poblar el estado diana puede aproximarse a 1, mientras que el conjunto de configuraciones rivales queda desfavorecido estadísticamente.

Esto aproxima de manera singular el cálculo molecular a la programación declarativa: en vez de estipular al detalle *cómo* transitar hasta la meta, se codifica ante todo *qué debe ser* el resultado, delegando en la dinámica física su resolución.

Aquí estriba la diferencia capital frente a la comparación superficial con el recocido simulado (*simulated annealing*). Un algoritmo de recocido ejecutado en una CPU computa numéricamente una función abstracta gastando electricidad para iterarla. Aquí, **el propio relieve de energía es la materia en sí**.

## Cómo codificar una probeta

El SDC recurre a una hebra prolongada de ADN a modo de **scaffold** (armazón), segmentada en nichos de acoplamiento diferenciados.

En cada posición compiten múltiples «teselas» moleculares, conformadas a su vez por oligonucleótidos. En la formulación central, una cadena de cálculo dispone de un dominio medular de 24 bases para distinguir su posición en el scaffold y dos dominios de cálculo de 12 bases en sus flancos.

Dichos flancos portan la información imprescindible para el programa y sus parámetros.

El mecanismo se apoya en tres propiedades cardinales. Las teselas se suministran con gran holgura frente al scaffold típicamente diez veces más concentradas para asegurar la ocupación de sus anclajes. Los dominios contiguos bien apareados proveen un enlace estabilizador. Y las uniones son deliberadamente tenues para preservar su reversibilidad: una tesela espuria no queda cautiva de su desacierto.

Si dos teselas contiguas pautan una transición contradictoria, su interfaz arroja un **mismatch algorítmico**. Dicha combinación atesora menos enlaces energéticamente favorables. Al abrigo de las oscilaciones térmicas, la pieza discordante puede desprenderse y ser relevada por una contendiente más idónea.

La enmienda de erratas no depende de un procesador exterior que dictamine «fallo en el bit 17». Brota de la discrepancia de energía libre entre configuraciones moleculares.

El consorcio asegura por añadidura una tesela singular en la primera posición el **anchor** (ancla) para fijar una salida determinista. A partir de ella, la coherencia se transmite a lo largo del scaffold.

El desenlace no se almacena en registros de memoria: **la estructura molecular ensamblada es el estado computacional mismo**.

## El legado del DNA origami, con una ruptura trascendental

Esta estructura hereda una premisa sumamente eficaz del DNA origami: servirse de un largo scaffold y dispersar un exceso de cadenas cortas que lo pliegan espontáneamente hacia una geometría diana.

El origami de ADN convencional explota a fondo la termodinámica de hibridación para esculpir nanoestructuras. Pero no altera su arquitectura procesando datos mediante un algoritmo. El SDC agrega dicha dimensión computacional al permitir que varios oligonucleótidos **compitan por idéntico emplazamiento** según los patrones inscritos en sus interfaces.

Estas ilustraciones de *Nature* reflejan dos hitos fundacionales del sector la computación con ADN y el origami molecular y no el dispositivo experimental SDC del presente artículo.

![https://media.springernature.com/lw685/springer-static/esm/art%3A10.1038%2Fs41565-024-01771-6/MediaObjects/41565_2024_1771_Fig11_ESM.jpg](https://tse3.mm.bing.net/th/id/OIP.1HWGiQztZgBHy42azSJrKAHaH8?r=0&w=474&h=379&c=7&p=0)

![https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fs43586-020-00009-8/MediaObjects/43586_2020_9_Fig1_HTML.png](https://tse4.mm.bing.net/th/id/OIP.cm3LeKVAiFyf7Xf99Y5WPAHaEz?r=0&w=474&h=379&c=7&p=0)

Este paralelismo reviste enorme valor. El origami de ADN triunfa justamente porque renuncia a gobernar cada choque bimolecular. Diseña un entramado cuyo ensamblaje global se halla termodinámicamente favorecido.

El SDC plantea la cuestión: **¿podemos extrapolar este principio a un algoritmo?**

## Diez algoritmos en vez de un experimento aislado

El equipo evitó diseñar un ensayo monotemático incapaz de salirse de un único guion.

Las variantes menores del SDC compilan **autómatas finitos**, una formulación elemental de la informática teórica donde una rutina recorre una entrada preservando un estado interno condensado. En una suma binaria, dicho estado materializa, por ejemplo, el acarreo transmitido de una columna a la subsiguiente.

Los diez ensayos prácticos abarcan la adición, la réplica de un bit, la paridad de una entrada de ocho bits, el producto por 3, la división por 2 en base 3, un contador, un autómata finito no determinista de tres estados, diversas fases del autómata celular Rule 110, un problema de alcanzabilidad en grafos y la validación de paréntesis balanceados.

Este catálogo es mucho más elocuente que la dificultad numérica intrínseca de los ejercicios. Multiplicar unos pocos bits por tres no inquietará a ningún microprocesador contemporáneo. Lo sustantivo de la prueba reside en demostrar la aptitud de **reprogramar la misma gramática molecular** para codificar dinámicas lógicas dispares.

Para un SDC de cuatro posiciones, el grupo cuenta con un repertorio de 395 cadenas que atienden el cómputo, la señalización y el reciclaje. La ampliación a montajes de hasta 25 posiciones incorpora otras 1 144 cadenas.

No nos hallamos ante un microchip de uso general en miniatura. Mas tampoco ante una solitaria reacción rebautizada como «computador».

## Una suma de 10 + 3 en treinta segundos

El diferencial de tiempos observado en las series experimentales exige un análisis atento.

Las pruebas estándar sobre arquitecturas reducidas aplican por lo común un protocolo de hibridación térmica de unas tres horas, atenuando la temperatura desde 80 °C hasta 20 °C. En dichos ensayos de cuatro posiciones, el rendimiento medio estimado ronda el **95,3 %** frente a los patrones de control; la suma en solitario promedia un **96,7 %** conforme al criterio métrico adoptado.

Sin embargo, los autores ensayaron igualmente regímenes drásticamente acelerados.

Descendiendo de 80 a 55 °C en menos de un minuto, preservan una discriminación funcional de los resultados. Ciertas sumas binarias emiten sus cuatro bits en menos de 30 segundos; estas tiradas expeditivas rinden cerca de un **82,4 % de rendimiento medio estimado para la adición** y un 81,2 % en el cómputo global analizado.

Conviene asentar de inmediato dos puntualizaciones.

En primer término, dicho «rendimiento» constituye una magnitud empírica calibrada sobre intensidades de fluorescencia referenciadas a testigos. **No equivale a una tasa de exactitud equiparable al índice de fallos de compuerta de una ALU de silicio.**

En segundo término, la lectura de los bits se ejecuta vía sondas fluorescentes. En la adición de cuatro bits desglosada en *Nature*, las cuatro posiciones de salida se escrutan en ensayos independientes. Conviene descartar la imagen de un microchip de ADN enlazado a un bus sincrónico que transmita instantáneamente una cadena binaria a un computador.

La cinética molecular puede ser veloz. El acoplamiento de **entrada-salida** representa un desafío ingenieril autónomo.

## «100 bits» dista por completo de designar un «procesador de 100 bits»

Se trata probablemente del guarismo más expuesto a lecturas sensacionalistas.

Los autores dimensionaron su sumador para conjugar dos cifras de **25 bits**, esto es, 50 bits de entrada. La traza computacional engloba igualmente 25 bits de acarreo y 25 bits de salida. Los autores computan en consecuencia **100 bits de cálculo**: 50 bits de entrada complementados por 50 bits de estado dinámico y salida.

Esto no guarda analogía con la acepción de «64 bits» al calificar una CPU de 64 bits.

El ancho de bus o palabra de un procesador caracteriza el calibre nativo de sus registros, vías de datos y direccionamiento. El indicador de 100 bits aquí consignado cuantifica la suma de variables lógicas procesadas en una prueba concreta de química macromolecular.

Asimilarlos directamente supondría equiparar «100 variables en una red química» con una «arquitectura de microprocesador de 100 bits».

La marca persevera como formidable **en su ámbito experimental**, mas sujeta a esa definición estricta.

## Al agrandarse el sistema, la termodinámica pierde su pátina milagrosa

Las verificaciones a 25 posiciones articulan el segmento más clarificador del artículo, puesto que ponen de relieve el potencial del enfoque y el umbral exacto donde tropieza.

Para disponer de un scaffold prolongado y asequible, el equipo acudió al ADN monocatenario del bacteriófago M13, de unas 7,2 kilobases. Seleccionó un segmento de 624 bases que alberga las posiciones operativas.

Semejante atajo acarrea servidumbres prácticas considerables.

Los tramos de un scaffold biológico natural ostentan afinidades de unión heterogéneas. En el tramo óptimo seleccionado, los autores deducen aún valores de ΔG∘\Delta G^\circ que fluctúan entre **−20,9 a −11,1 kcal/mol a 65 °C**. Las concentraciones en los scaffolds de gran escala descienden a 10 nM (frente a los 100 nM de las muestras reducidas), ralentizando la cinética de acoplamiento de las teselas y degradando la nitidez de la señal frente al ruido. Por añadidura, varios millares de bases inertes de M13 flotan en la disolución propiciando uniones inespecíficas.

Asoma aquí un límite capital: que la **solución válida sea el estado más estable no garantiza que un sistema complejo la alcance con presteza**.

Un pozo de potencial puede erigirse en el abismo más profundo de un terreno y tornarse casi inalcanzable si la senda está sembrada de barreras o pozos metaestables.

La termodinámica dictamina hacia dónde se orienta el equilibrio. **La cinética decide si arribará antes de colmar la paciencia del investigador.**

## Una hora, catorce horas: el auténtico peaje del escalado

En las operaciones de suma a 25 posiciones, los autores introducen la variable MM, que denota la secuencia más larga de posiciones donde un fallo de acarreo prosigue su avance sin toparse con un sumidero lógico («sink») que lo neutralice.

En pares de entradas aleatorias, la media se cifra en torno a 4. Un caso con M=4M=4 rinde un diagnóstico nítido en aproximadamente **una hora**. Un escenario más riguroso con M=5M=5 dilata el proceso hasta **14 horas** para alcanzar una conclusión experimental satisfactoria. Los autores estiman, con todo, que más del 84 % de los pares numéricos de 25 bits presentan M≤5M\leq5.

Otra prueba arroja conclusiones aún más instructivas.

Para ejecutar una operación BitCopy a lo largo de un andamio extenso, el equipo se vio obligado a homogeneizar el perfil energético recalculando los dominios para asegurar configuraciones casi **isoenergéticas** ante un número equiparable de fallos. Bajo esta pauta, consignan un 71 % de rendimiento a 20 posiciones y un **59 % a 25 posiciones tras 14 horas de hibridación**.

He aquí el matiz que los resúmenes apresurados tienden a difuminar.

El SDC no dictamina que «la termodinámica resuelva por sí misma la escalabilidad». Evidencia un avance más seductor: **el relieve de energía libre deviene una entidad programable en sí misma**.

El software no se circunscribe a transcribir un circuito lógico. Debe compilarse asimismo para garantizar que su propio espacio topológico de estados físicos sea franqueable.

## La ausencia de módulos correctores no implica descuidar los fallos

Los autores defienden con razón que sus arquitecturas compactas prescinden de las pesadas redundancias modulares o los bucles activos de enmienda propios de otros sistemas moleculares.

Mas conviene esquivar lecturas extremas.

En sumas extensas, resortes intrínsecos al algoritmo amortiguan el error: los sumideros absorben acarreos e impiden su desbordamiento. En el BitCopy ampliado, la reconfiguración isoenergética persigue expresamente evitar que estados anómalos adquieran fortuitamente mayor estabilidad que la salida fidedigna.

La auténtica aportación no reside en «suprimir la corrección de errores», sino en que **la depuración puede transferirse a la física del relieve y a la estructura del algoritmo**, eludiendo la necesidad de maquinaria molecular accesoria que examine y rectifique faltas a posteriori.

La distancia conceptual es abismal.

## Un ordenador reutilizable, pero lejos de ser autónomo

Otro hito corre el riesgo de palidecer ante la pirotecnia aritmética: diversos procesos moleculares se **reprogramaron sucesivamente en la misma probeta**.

El método se basa en incorporar una nueva entrada junto a oligonucleótidos bloqueadores destinados a desactivar la anterior, aplicando un ciclo térmico para restablecer el equilibrio del sistema.

De este modo, BitCopy se ejecutó **25 veces**, un contador 24 veces con entradas consecutivas y dos modalidades de adición nueve veces. Las rondas de regeneración consumen un recocido de unos 12 minutos, a lo que se suma la manipulación de laboratorio.

El logro sobresale en el contexto macromolecular, si bien el adjetivo «reutilizable» no debe evocar un computador autónomo operando en bucle indefinido.

Se añaden reactivos. Se acumulan bloqueadores residuales. El volumen y las concentraciones derivan. En los experimentos, un dosificador acústico de líquidos asistió los aportes, si bien los firmantes atestiguan haber completado preparaciones de forma manual.

El cómputo es molecular. La gobernanza de la prueba permanece ceñida a las pautas de un laboratorio húmedo.

## El SDC no surgió de la nada

El cálculo con ADN hunde sus raíces al menos en el trabajo fundacional de Leonard Adleman en 1994. Adleman codificó un grafo en secuencias nucleotídicas y recurrió a enzimas de biología molecular para solventar un caso del dilema del camino hamiltoniano.

Desde entonces, el campo ha sondeado teselas autoensambladas, cascadas de desplazamiento de hebras, compuertas booleanas, autómatas, nanorrobots y memorias operativas.

En 2019, un equipo con presencia de Damien Woods dio a conocer en *Nature* una plataforma de **355 teselas de ADN reprogramables** capaz de procesar 21 circuitos de seis bits, acometiendo tareas como ordenación, reconocimiento de palíndromos o simulaciones celulares.

En paralelo se indagaba el régimen de equilibrio desde la teoría. En 2017, David Doty, Trent Rogers, David Soloveichik, Chris Thachuk y Damien Woods conceptualizaron las **Thermodynamic Binding Networks**, interrogando si el estado fundamental termodinámico podía coincidir con el desenlace lógico de un algoritmo.

El SDC no constituye tampoco la única plasmación experimental coetánea de esta noción.

En enero de 2026, Boya Wang, Cameron Chalk, David Doty y David Soloveichik presentaron en *Science Advances* un modelo de **computación en equilibrio guiado por entropía**, extrapolado a la propagación reversible de señales, lógica autoensamblada y síntesis de polímeros de longitud prefijada.

En 2023, Maxim Nikitin corroboró un paradigma de equilibrio sustentado en afinidades moleculares débiles entre hebras escasamente complementarias, incluyendo un módulo capaz de calcular una raíz cuadrada de cuatro bits en unos cinco minutos.

Proclamar que el SDC personifica «el primer computador termodinámico de la historia» carecería de rigor historiográfico.

Su valía es más nítida: **amalgamar una estructura con scaffold programable, versatilidad lógica, resoluciones veloces a escala reducida, reactivación cíclica y un escalado práctico hasta 25 posiciones en un marco físico coherente.**

## El competidor conceptual más revelador abraza la senda inversa

Una investigación publicada en *Nature* en 2025 por Tianqi Song y Lulu Qian ilustra con gran elocuencia el rasgo diferenciador del SDC.

Su diseño aglutina más de 200 especies químicas y capacita circuitos lógicos y redes neuronales de ADN para rearmarse al menos 16 veces. Sin embargo, su resorte se vale de impulsos térmicos para **reabastecer trampas cinéticas**, devolviendo el sistema a un régimen fuera del equilibrio presto a acometer un nuevo cómputo.

Ambas tentativas emplean ADN. Ambas recurren al calor. Ambas ambicionan la reciclabilidad.

No obstante, su cosmovisión física es casi antagónica.

Song y Qian: **reconstruir un estado metaestable rico en energía para consumirla en el transcurso del procesamiento.**

Stérin, Eshra y colaboradores: **esculpir el sistema de suerte que la solución encarne el valle energético hacia el que confluye espontáneamente.**

Esa discrepancia arroja mucha más luz que la genérica etiqueta de «computador de ADN».

## No, el procesamiento no se ha vuelto gratuito

Sería seductor deducir de inmediato: al quedar la solución termodinámicamente favorecida, esta estirpe de procesadores podría resolver la voracidad energética de los centros de datos.

El estudio no avala semejante premisa.

Se requiere sintetizar oligonucleótidos, preparar disoluciones, combinarlas, calentar la mezcla a menudo hasta 80 °C, modular térmicamente el descenso, inyectar nuevas moléculas en cada reciclaje y medir las señales por fluorescencia. Todas estas fases entrañan costes energéticos e instrumentales patentes. Los propios autores reconocen que su sistema demanda inversiones apreciables en volumen de secuencias, ciclado térmico y tiempos de recocido.

En un plano más sustantivo, **que una conformación resulte termodinámicamente ventajosa no presupone la ausencia de disipación**.

El beneficio radica en otro punto: ahorrar a la maquinaria química la servidumbre de bregar sin tregua contra los estados que la física tiende a consagrar.

Atenúa la pugna entre software y materia; no inventa el móvil perpetuo del cálculo.

## Por qué no debe cotejarse su cadencia con la de una CPU

Una adición de 25 bits que demande una hora o catorce horas resultaría cómicamente lenta si su fin fuese competir con un microprocesador.

Incluso los 30 segundos de las pruebas más veloces quedan a distancias siderales del silicio convencional.

Mas tal paralelismo asume erróneamente que el SDC aspira a suplantar la ALU de un procesador de sobremesa o un smartphone. No es ese su cometido.

El nicho genuino donde la computación molecular promete revolucionar el panorama es aquel donde **las entradas, el procesamiento y las respuestas operativas son ellos mismos moleculares**.

En nanorrobótica o terapia molecular, traducir un biomarcador químico en pulso eléctrico, canalizarlo a una CPU y reinterpretar su fallo en intervención farmacológica resulta un rodeo farragoso. Un dispositivo capaz de diagnosticar su microentorno e intervenir la materia a escala nanométrica no precisa batir récords en pruebas de rendimiento informático.

Su ventaja primordial radica en **procesar la información en el mismo medio físico en el que debe operar**.

## De la computación molecular a la materia programable

En este terreno es donde las conclusiones cobran mayor alcance prospectivo.

Los autores vislumbran que estos resortes podrán confluir con el almacenamiento masivo en ADN, con arquitecturas de DNA origami provistas de lógica intrínseca o con redes mixtas de ARN y proteínas. Apuntan asimismo a entornos biológicos complejos, si bien el experimento actual discurre en el marco delimitado de un ensayo in vitro.

En el archivo digital en ADN, la perspectiva seduce: en vez de extraer una muestra, secuenciarla, computarla en servidores y reinscribir el resultado, parte sustantiva de la lógica podría discurrir **dentro del propio soporte molecular**.

En nanotecnología, la respuesta terminal ni siquiera requeriría ser leída ópticamente: podría plasmarse en una conformación estructural, la exposición de un ligando activo, un gatillo biofísico o la activación de una cascada catalítica.

En ese horizonte, la linde entre «aparato de cómputo» y «material inteligente» comienza a difuminarse.

## El enigma científico que subyace tras el SDC

A primera vista, la investigación versa sobre oligonucleótidos. En el fondo, su aportación más fecunda concierne a la **compilación de un algoritmo hacia un paisaje de energía libre**.

En el software clásico, un compilador traspone secuencias abstractas a código máquina asimilable por una arquitectura física.

En un ordenador termodinámico, un futuro compilador habrá de resolver un desafío inédito: plasmar la lógica booleana en afinidades físicas tales que la solución fidedigna no solo sea estable, sino alcanzable con presteza, sin quedar varada en trampas intermedias.

Esto añade un nuevo eslabón a la jerarquía computacional:

algoritmo → formulación lógica → afinidades intermoleculares → relieve de energía libre → dinámicas físicas.

El marco teórico del SDC evidencia que la resolución de mínimos energéticos y funciones de partición en estas topologías puede resolverse mediante algoritmos específicos; los autores recurrieron a NUPACK y herramientas analíticas propias para optimizar las cadenas. El código y los registros de la investigación han quedado depositados en Zenodo.

La informática ya no se limita a dictar tareas a una máquina.

**Comienza a programar aquello en lo que la materia prefiere convertirse.**

## Lo que la experiencia atestigua y lo que aún queda por dilucidar

El SDC corrobora empíricamente que es viable aunar, en rutinas nada banales, **corrección lógica y estabilidad termodinámica**. Revela que este enfoque habilita respuestas ágiles a escala reducida, asimila cierta complejidad macromolecular, tolera la reutilización sucesiva y rebasa con holgura las demostraciones meramente testimoniales.

A la par, los datos exponen los obstáculos prácticos con encomiable honestidad: al alcanzar 20 o 25 posiciones, el rendimiento desciende, los tiempos saltan de segundos a horas dilatadas, aflora la rugosidad energética del ADN natural y se hace imperativo volver a perfilar minuciosamente el terreno.

Es un panorama menos estridente que proclamar que «un computador de ADN de 100 bits va a sustituir a los chips». Es asimismo infinitamente más valioso.

El estudio demuestra que, en la computación molecular, la robustez no siempre deriva de una contienda sofisticada contra las leyes físicas, sino de una alianza íntima con ellas.

Un estado erróneo ya no precisa ser interceptado y demolido sin descanso.

Basta, en la medida de lo posible, con procurar que **la propia materia carezca de motivos físicos para permanecer en él.**
