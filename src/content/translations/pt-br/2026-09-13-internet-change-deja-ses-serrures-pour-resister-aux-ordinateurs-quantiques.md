---
title: Internet já muda fechaduras para resistir a computadores quânticos
description: Os computadores quânticos capazes de quebrar nossa criptografia ainda não existem. No entanto, uma parte da web já está preparando sua chegada. E isso não é ficção científica.
pubDate: 2026-09-13
draft: false
featured: false
section: computing
contentType: article
tags:
  - cryptographie
  - informatique
  - informatique quantique
  - cybersécurité
  - HTTPS
  - web
  - sécurité
series:
  id: internet-face-au-quantique
  order: 1
  title: Internet em relação ao Quântico
coverImage: /blog/images/posts/68974f6a-7fbc-457d-bd8d-ebaf89c49a16.png
coverAlt: Uma cadeia digital protegida por uma nova camada criptográfica em relação a um computador quântico.
author: Voldigoade
locale: pt-br
sourceSlug: 2026-09-13-internet-change-deja-ses-serrures-pour-resister-aux-ordinateurs-quantiques
sourceHash: ed5c2113cfa1343e06de20d8b11ff1fabd554e74e5f8bf8f8655cfa815b16ad5
manual: false
---

Uma parte da internet está a substituir as fechaduras **Até mesmo quando o ladrão é capaz de abri-los**.

Hoje, quando você se conecta a um site em HTTPS, faz um pagamento ou troca de dados sensíveis, uma parte da segurança é baseada em problemas matemáticos extremamente difíceis de resolver com nossos computadores clássicos.

O problema é que um computador quântico suficientemente poderoso não jogaria com as mesmas regras.

## O perigo não é o computador quântico de 2026

As máquinas quânticas atuais estão longe de ser capazes de simplesmente “combater a Internet”. Para quebrar em grande escala sistemas como RSA ou certas criptografias de curvas elípticas, seria necessário computadores quânticos tolerantes a erros muito mais poderosos do que os disponíveis hoje.

Mas esperar que eles existam seria uma estratégia muito ruim.

Os dados criptografados podem ser **interceptadas hoje, preservadas por anos e depois descriptografadas mais tarde** Se a tecnologia se torna poderosa o suficiente. É o que muitas vezes se chama *Harvest Now, decrypt mais tarde*.

Em outras palavras, um segredo roubado em 2026 ainda pode ter valor em 2036.

## A criptografia pós-quântica já existe

Em 2024, o NIST standardizou vários algoritmos projetados para resistir tanto aos computadores clássicos quanto aos futuros computadores quânticos. **Ação ML-KEM** para a criação de chaves e **Ação ML-DSA** para as assinaturas digitais. Em 2026, a Agência considera que a migração deve começar. 

E essa transição começa a tocar a web real.

Por exemplo, o Chrome trabalha em um guia para tornar a autenticação HTTPS resistente a ataques quânticos. Google também está experimentando uma nova arquitetura de certificados chamada **Certificação de Mercle Tree**, especialmente com Cloudflare, para evitar que as proteções pós-quânticas tornem as conexões muito mais pesadas. 

O mais fascinante, portanto, não é que um computador quântico possa um dia ameaçar a Internet.

É que **A defesa contra esta máquina hipotética já está sendo implementada**.

E se a transição for bem sucedida, no dia em que computadores quânticos realmente perigosos aparecerão, a maioria dos usuários talvez não perceberá absolutamente nada.