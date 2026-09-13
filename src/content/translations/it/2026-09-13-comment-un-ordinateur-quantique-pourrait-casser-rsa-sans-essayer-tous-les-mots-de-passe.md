---
title: Come un computer quantistico potrebbe rovinare RSA senza "provarsi tutte le password"
description: 'Si ripete spesso che un computer quantistico potrebbe rovinare una parte della nostra criptografia. Ma come, esattamente? Il vero pericolo non viene da una macchina assurdo veloce: viene da un algoritmo che cambia completamente il modo in cui si attacca il problema.'
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
  title: Internet contro la quantità
coverImage: /blog/images/posts/8c6ab339-ddae-4116-b264-2455d5ef0f4d.png
coverAlt: La rappresentazione di un computer quantistico che analizza la struttura matematica di una chiave RSA.
author: Voldigoade
locale: it
sourceSlug: 2026-09-13-comment-un-ordinateur-quantique-pourrait-casser-rsa-sans-essayer-tous-les-mots-de-passe
sourceHash: 4d8d5f383ebda170a015f984fd59be61dec51ec51c0c756f3cca874ae25c146c
manual: false
---

Dare che un computer quantistico potrebbe "rompere RSA" dà facilmente una sbagliata immagine del problema.

Si potrebbe immaginare una macchina così potente che avrebbe provato miliardi di chiacchi fino a trovare la giusta.

Non è questo.

Il vero problema è molto più interessante: **un computer quantistico sufficientemente avanzato potrebbe utilizzare un metodo matematico che i nostri computer classici non sanno sfruttare in modo efficace.**

E tutto si basa su una debolezza scelto volontariamente circa cinquanta anni fa.

## RSA protegge un segreto con un problema facile in un senso, difficile nell'altro

Prendiamo i primi due numeri:

`61 × 53 = 3233`

La moltiplicazione è triviale.

Ma ora immagino che ti dico solo:

`3233`

e che ti chiedo:

> Quali sono i primi numeri che sono stati moltiplicati per ottenere questo risultato?

Con un numero così piccolo, troverai rapidamente `61` e `53`.

RSA applica essenzialmente la stessa idea, ma con numeri giganti.

Una chiave RSA moderna può utilizzare un modulo di **2048 bit**Un numero che ha circa **617 cifre decimali**.

Moltiplicare i due grandi primi numeri che lo compongono è facile per un computer.

Trovare questi fattori dal risultato è, con i migliori metodi classici conosciuti, estremamente difficile quando le impostazioni sono selezionate correttamente.

Questo è l’equilibrio che rende RSA utile.

Non perché la fattorizzazione è impossibile.

Perché è considerato come **Impraticabile nella scala richiesta** con i nostri computer classici.

## Peter Shor è arrivato

Nel 1994, il matematico Peter Shor ha pubblicato un algoritmo per i computer quantistici.

E questo algoritmo cambia radicalmente il problema.

L'algoritmo di Shor consente, in teoria, di fatalizzare efficacemente grandi numeri su un computer quantistico abbastanza potente.

Non si tratta ancora di provare ogni combinazione una per una.

Si trasforma la fatalizzazione in un altro problema: **Scopri il periodo di una funzione matematica**.

È proprio in questa fase che interviene la meccanica quantistica.

Un computer tradizionale manipola i bit che valono `0` o `1`.

Un computer quantico manipola **dei qubits**, il cui stato può essere una sovrapposizione di molte possibilità. Ma attenzione al raccolto spesso ripetuto: questo non significa che un computer quantistico "prova tutte le risposte allo stesso tempo e legge la giusta".

Se fosse così semplice, quasi tutti i problemi informatici diventerebbero immediatamente facili.

Ciò che rende Shor potente è molto più sottile.

L'algoritmo prepara uno stato quantistico contenente una specifica struttura matematica e utilizza in particolare la **Trasformazione di Fourier Quantico** per indicare la periodicità desiderata. Una misura consente quindi di ottenere informazioni sufficienti per ricostruire questo periodo.

E questo periodo può portare ai fattori del numero.

semplificando in modo significativo:

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

Quindi la criptografia non viene sconfitta con più forza bruta.

**Si sfugge alla difficoltà su cui si è riposata.**

## Perché questo minaccia RSA

In RSA, la chiave pubblica può essere conosciuta da tutti.

Questo è anche il suo ruolo.

Ciò che deve rimanere inaccessibile è la chiave privata.

Ma i parametri pubblici contengono un numero costruito da due grandi numeri primi segreti. Se un aggressore riesce a fatalizzare efficacemente questo numero, può trovare le informazioni necessarie per ricostruire la chiave privata.

Da lì, secondo l'uso di RSA, le conseguenze possono diventare gravi: falsificazione di firme, compromissione di meccanismi di autenticazione o decryption di dati quando il protocollo dipende direttamente da RSA.

È per questo che l'eventuale arrivo di un computer quantistico **Crypto rilevante** sufficientemente affidabile e potente per eseguire questo tipo di attacco su una scala utile costituisce un vero problema di cybersecurity.

Il NIST considera esplicitamente RSA e diversi sistemi basati sulle curve elettiche vulnerabili a questo futuro modello di calcolo e organizza la loro sostituzione progressiva con standard post-quantici. L'attuale obiettivo degli Stati Uniti è quello di rimuovere gradualmente dagli standard gli algoritmi vulnerabili da qui **2035**I sistemi più sensibili devono migrare prima. 

## Quindi perché nessuno ha ancora rotto RSA-2048 con un computer quantistico?

Perché tra **“L’algoritmo esiste”** e **“Abbiamo la macchina in grado di eseguire”**C’è un buco.

I qubps attuali sono fragili.

Sono estremamente sensibili al rumore e agli errori. Più un calcolo quantistico diventa lungo e complesso, più è difficile mantenere correttamente le informazioni.

La soluzione prevista è la **Correzione di errori quantistici** Utilizzare numerosi qubit fisici imperfetti per costruire un numero minore di qubit *La logica*abbastanza affidabile per effettuare lunghi calcoli.

Ma questo aumenta notevolmente il materiale necessario.

Ecco perché i piccoli computer quantistici sperimentali di oggi non possono semplicemente ricevere una chiave RSA-2048 e romperla pochi secondi dopo.

Il Nico parla anche di un **Il CRQC**, *Il codice informatico quantico* Un computer quantistico abbastanza potente per attaccare veramente i sistemi criptografici attualmente utilizzati. Il momento in cui una tale macchina esisterà rimane sconosciuto. 

## E non è solo RSA

RSA è un ottimo modo per comprendere il problema, ma Shor minaccia anche un'altra famiglia fondamentale della criptografia moderna: le **curve elettiche**.

Si trovano in particolare nei sistemi di firma e di scambio di chiavi.

Il problema matematico è diverso dalla fattorizzazione, ma Shor sa anche risolvere efficacemente il problema **Il problema del logaritmo discreto** su cui si basano questi meccanismi.

Questa è una differenza importante.

Quando si dice che “il quantico romperà l’attuale crittografia”, si semplifica enormemente.

Non tutte le criptografie sono colpite allo stesso modo.

Gli algoritmi di chiave pubblica come RSA e ECC sono particolarmente interessati.

Gli algoritmi simetrici, come AES, non sono distrutti da Shor in questo modo. Altri algoritmi quantistici, in particolare quelli di Grover, possono ridurre il loro margine di sicurezza, ma aumentare la dimensione delle chiavi consente di compensare il problema molto più facilmente.

Il futuro, quindi, non consiste nel rinunciare a qualsiasi criptografia.

Si tratta di **sostituire alcune basi matematiche**.

## I sostituti esistono

Nel 2024, il NIST ha completato i suoi primi tre principali standard di criptografia post-quantica:

- **Il KEM**destinato a stabilire segreti condivisi;

- **di ML-DSA**per le firme digitali;

- **di SLH-DSA**, un'altra famiglia di firme basata su funzioni di hash.

A differenza di RSA, le loro basi matematiche sono selezionate per resistere agli attacchi quantici conosciuti.

Il NIST ora raccomanda esplicitamente di iniziare la migrazione piuttosto che aspettare l'arrivo ipotetico di una macchina pericolosa. 

Chrome ha già lanciato uno scambio di chiavi ibridi post-quantici per alcune connessioni TLS compatibili. E Chromium ora prepara la parte molto più complessa: rendere anche **Autenticazione dei certificati HTTPS** Resistente alla quantità. 

Questo è il motivo per cui questa transizione inizia anni prima della presunta comparsa della minaccia.

Un'infrastruttura criptografica globale non viene sostituita premendo un pulsante.

È necessario modificare i browser, i server, le biblioteche, i sistemi operativi, i dispositivi a bordo, le autorità di certificazione, i protocolli e il software a volte destinati a rimanere attivi per decenni.

Il computer in grado di rompere RSA-2048 potrebbe non esistere ancora.

**L'algoritmo che spiega come poteva farlo, egli, esiste dal 1994.**

È questa la differenza che obbliga Internet a preparare la sua difesa ora.

