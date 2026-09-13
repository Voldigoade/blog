---
title: Como um computador quântico poderia quebrar RSA sem "provar todas as senhas"
description: 'Muitas vezes se repete que um computador quântico pode quebrar uma parte da nossa criptografia. Mas como, exatamente? O verdadeiro perigo não vem de uma máquina absurdamente rápida: ele vem de um algoritmo que muda completamente a maneira de atacar o problema.'
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
  title: Internet em relação ao Quântico
coverImage: /blog/images/posts/8c6ab339-ddae-4116-b264-2455d5ef0f4d.png
coverAlt: Representação de um computador quântico que analisa a estrutura matemática de uma chave RSA.
author: Voldigoade
locale: pt-br
sourceSlug: 2026-09-13-comment-un-ordinateur-quantique-pourrait-casser-rsa-sans-essayer-tous-les-mots-de-passe
sourceHash: 4d8d5f383ebda170a015f984fd59be61dec51ec51c0c756f3cca874ae25c146c
manual: false
---

Dizer que um computador quântico pode “combater RSA” dá facilmente uma imagem errada do problema.

Pode-se imaginar uma máquina tão poderosa que seria capaz de tentar bilhões de biliões de chaves até encontrar a certa.

Não é isso.

O verdadeiro problema é muito mais interessante: **Um computador quântico suficientemente avançado poderia usar um método matemático que nossos computadores clássicos não sabem explorar efetivamente.**

E tudo se baseia em uma fraqueza voluntariamente escolhida há quase cinquenta anos.

## RSA protege um segredo com um problema fácil em um sentido, difícil no outro

Tomemos dois primeiros números:

`61 × 53 = 3233`

A multiplicação é trivial.

Mas imagine agora que eu só lhe darei:

`3233`

E que eu te peço:

> Quais números foram multiplicados para obter esse resultado?

Com um número tão pequeno, você encontrará rapidamente `61` e `53`.

RSA aplica basicamente a mesma ideia, mas com números gigantescos.

Uma chave RSA moderna pode usar um módulo de **2048 bits**Um número que tem cerca de **617 Números decimais**.

Multiplicar os dois principais números que o compõem é fácil para um computador.

Encontrar esses fatores a partir do resultado é, com os melhores métodos clássicos conhecidos, extremamente difícil quando os parâmetros são corretamente selecionados.

É esse desequilíbrio que torna RSA útil.

Não porque a factorização é impossível.

Porque é considerado como **Impraticável à escala necessária** com os nossos computadores clássicos.

## Então Peter Shor chega

Em 1994, o matemático Peter Shor publicou um algoritmo para computadores quânticos.

E esse algoritmo muda radicalmente o problema.

O algoritmo de Shor permite, em teoria, facturar efetivamente grandes números em um computador quântico suficientemente poderoso.

Ainda não consiste em tentar cada combinação uma por uma.

Ele transforma a factorização em outro problema: **Encontrar o período de uma função matemática**.

É precisamente nesta fase que a mecânica quântica interveia.

Um computador clássico manipula bits que valem a pena `0` ou `1`.

Um computador quântico manipula **Québitos**, cujo estado pode ser uma superposição de várias possibilidades. Mas fique atento à abreviatura frequentemente repetida: isso não significa que um computador quântico "teste todas as respostas ao mesmo tempo e leia a correta".

Se fosse tão simples, quase todos os problemas informáticos se tornariam instantaneamente fáceis.

O que torna Shor poderoso é muito mais sutil.

O algoritmo prepara um estado quântico que contém uma estrutura matemática específica e, em seguida, utiliza **Transformação de Fúria Quântica** para mostrar a periodicidade procurada. Uma medida então permite obter informações suficientes para reconstruir esse período.

E esse período pode levar aos fatores do número.

Simplificando muito:

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

A criptografia, portanto, não é derrotada por mais força bruta.

**Acontece a dificuldade em que ela se encontrava.**

## Por que isso ameaça RSA

Na RSA, a chave pública pode ser conhecida por todos.

É mesmo o seu papel.

O que deve permanecer inacessível é a chave privada.

Os parâmetros públicos contêm um número construído a partir de dois grandes números secretos. Se um atacante consegue efetivamente factorizar esse número, ele pode encontrar as informações necessárias para reconstruir a chave privada.

A partir daí, de acordo com o uso da RSA, as consequências podem se tornar graves: falsificação de assinaturas, compromisso de mecanismos de autenticação ou descriptografia de dados quando o protocolo depende diretamente da RSE.

É por isso que a eventual chegada de um computador quântico **Criptograficamente relevante** confiável e poderoso o suficiente para executar esse tipo de ataque em uma escala útil constitui um problema de cibersegurança real.

O NIST considera explicitamente RSA e vários sistemas baseados em curvas elípticas como vulneráveis a este futuro modelo de cálculo e organiza sua substituição progressiva por padrões pós-quânticos. O objetivo atual dos EUA é retirar gradualmente dos padrões os algoritmos vulneráveis de aqui **2035**Os sistemas mais sensíveis devem migrar mais cedo. 

## Então, por que ninguém ainda quebrou RSA-2048 com um computador quântico?

Porque entre **“O algoritmo existe”** e **“Temos a máquina capaz de executá-la”**Há um buraco.

Os qubits atuais são fracos.

Eles são extremamente sensíveis ao ruído e aos erros. Quanto mais longo e complexo for um cálculo quântico, mais difícil será manter a informação corretamente.

A solução prevista é a **Correção de Erros Quânticos** Utilizar muitos qubits físicos imperfeitos para construir um menor número de qubit *Lógica*Ele é confiável o suficiente para fazer cálculos longos.

Mas isso aumenta consideravelmente o material necessário.

É por isso que os pequenos computadores quânticos experimentais de hoje não podem simplesmente receber uma chave RSA-2048 e quebrá-la alguns segundos depois.

No entanto, o Nico fala de um **CRQC**, *Criptograficamente relevante quantum computador* Um computador quântico suficientemente poderoso para realmente atacar os sistemas criptográficos atualmente usados. O momento em que tal máquina existirá permanece desconhecido. 

## E não é apenas RSA.

RSA é uma ótima maneira de entender o problema, mas Shor também ameaça uma outra família fundamental da criptografia moderna: **curvas elípticas**.

Eles são encontrados principalmente em sistemas de assinaturas e troca de chaves.

O problema matemático é diferente da factorização, mas Shor também sabe resolver eficazmente o problema. **Problemas do logaritmo discreto** sobre o qual se baseiam esses mecanismos.

É uma distinção importante.

Quando se diz que "o quantico vai quebrar a criptografia atual", é muito simplificado.

Nem todas as criptografias são afetadas da mesma forma.

Algoritmos de chave pública como RSA e ECC são particularmente relevantes.

Algoritmos simétricos, como AES, não são destruídos por Shor desta forma. Outros algoritmos quânticos, incluindo o de Grover, podem reduzir sua margem de segurança, mas aumentar o tamanho das chaves permite compensar muito mais facilmente o problema.

O futuro, portanto, não consiste em abandonar toda criptografia.

Consiste em **Substituição de fundamentos matemáticos**.

## Os substitutos já existem.

Em 2024, o NIST completou seus três primeiros padrões principais de criptografia pós-quântica:

- **Ação ML-KEM**para estabelecer segredos compartilhados;

- **Ação ML-DSA**para assinaturas digitais;

- **Avaliação SLH-DSA**Outra família de assinaturas baseada em funções de hash.

Ao contrário da RSA, suas fundações matemáticas são escolhidas para resistir aos ataques quânticos conhecidos.

O NIST recomenda agora explicitamente iniciar a migração em vez de esperar a chegada hipotética de uma máquina perigosa. 

O Chrome já implementou uma troca de chaves híbrida pós-quântica para algumas conexões TLS compatíveis. E Chromium agora prepara a parte muito mais complexa: fazer também **autenticação de certificados HTTPS** Resistente ao Quântico. 

É por isso que essa transição começa anos antes da suposta aparição da ameaça.

Uma infraestrutura criptográfica global não é substituída por pressionar um botão.

É necessário modificar navegadores, servidores, bibliotecas, sistemas operacionais, dispositivos embarcados, autoridades de certificação, protocolos e software, às vezes destinados a permanecer ativos por décadas.

O computador capaz de quebrar RSA-2048 pode ainda não existir.

**O algoritmo que explica como ele poderia fazê-lo, ele existe desde 1994.**

É essa diferença que obriga a Internet a preparar sua defesa agora.

