---
title: 'Nvidia, Palantir, Booz Allen: Why AI Champions Limit What They Entrust to External Models'
description: The best models promise immense productivity gains, but their APIs, logs, and tools create new trust boundaries. In 2026, the best trade-off between power and confidentiality is neither all-cloud nor all-local.
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
coverAlt: Enterprise data remains in a secure infrastructure while a controlled connection enables the use of a remotely hosted AI model.
author: Voldigoade
news: true
seoTargetQuery: peut-on confier des données sensibles à une IA
locale: en
sourceSlug: 2026-09-15-nvidia-palantir-booz-allen-pourquoi-les-champions-de-lia-limitent-ce-quils-confient-aux-modeles-externes
sourceHash: b7924f772a681bac7b00da36500de8ee64e164ac873b3867dd4c9eee518c2dd5
manual: false
---

On September 10, 2026, Nvidia and Palantir jointly announced a "sovereign AI" infrastructure intended in particular for Nvidia's supply chain. The highlighted principle was almost paradoxical for two companies at the heart of the current revolution: use AI massively, while retaining control over proprietary data and the environment in which models operate.

Four days later, the paradox became much more explicit.

According to an investigation by *The Information* relayed by Reuters, Palantir reportedly demanded **irrevocable Zero Data Retention guarantees** from Anthropic before making some of its models available in its software. Nvidia would limit the use of Anthropic's models to the least sensitive tasks and rely more on its own Nemotron for internal work. Booz Allen Hamilton, for its part, reportedly banned the use of Anthropic's commercial service for certain proprietary cybersecurity work.

Yet these are not companies hostile to external AI. Booz Allen announced as recently as June a partnership with OpenAI to deploy advanced systems to public agencies and critical infrastructure.

The problem is therefore more interesting than a simple "companies are afraid of the cloud."

**The organizations that probably understand best what AI can bring them are also among those that best understand what they risk losing by giving it too much context.**

And that risk is often misunderstood.

## The problem is no longer really "my code will train the next GPT"

That's the intuitive fear: you send a confidential prototype to a model, the company operating it adds it to its training set, and the secret eventually resurfaces with another user.

For serious professional offerings, this scenario is generally no longer the default behavior.

OpenAI states that data sent to its API is not used to train or improve its models unless the customer explicitly opts in. Anthropic likewise affirms that data retained in its commercial offerings is not used for training without express permission. Palantir states that it obtains technical and contractual guarantees preventing model providers accessible via AIP from retaining prompts, responses, or using them to retrain their models.

It would therefore be a mistake to reduce the problem to training.

The real question is: **how many temporary or permanent copies of your secret can exist while the service is running?**

A prompt sent to a model can traverse multiple layers: application, proxy, API gateway, anti-abuse system, cache, inference service, conversation storage, tools, RAG engine, tracing system, and sometimes third-party services.

None of these layers needs to train a model to become a new leak surface.

## "We don't train on your data" is not the same thing as "we don't keep anything"

OpenAI is a good example.

By default, its APIs produce logs intended in particular for abuse detection, which may contain prompts, responses, and metadata. Their retention period can reach 30 days.

Eligible customers can request **Zero Data Retention**, or ZDR. In this configuration, customer content is excluded from these logs and certain APIs are forced to operate without persistence.

But ZDR is not a magic button applied uniformly across the entire platform.

Persistent conversations, agents, files, vector stores, and various stateful functions have their own rules. Some are simply not eligible for ZDR. Data sent to a remote MCP server, moreover, falls under that server's policy, no longer just OpenAI's.

Anthropic presents a comparable distinction.

Under a ZDR agreement, the company indicates it does not retain prompts and responses **at rest after the response is returned**. But the ordinary Claude Teams and Enterprise interfaces are not equivalent to a ZDR API, some agents are stateful, some features retain data, and since June 2026, several of its advanced models known as "Covered Models" impose a 30-day retention unless a specific agreement is in place.

This change helps understand Palantir's reported reaction.

A company can perfectly trust a provider's commitments today while refusing an architecture in which that provider retains the technical or contractual right to change tomorrow the retention period for a new model.

For ordinary code, thirty days may seem insignificant.

For an unknown vulnerability, a military architecture, the mask of a still-secret chip, or the design of a product that won't launch for two years, **30 days represent 30 days too many**.

## What Zero Data Retention actually means

The term is almost misleading when read literally.

ZDR generally does not mean that no byte corresponding to the prompt ever exists on the provider's machines. Without processing the data, the model could obviously not produce a response.

The important distinction is between **transient processing** and **persistent storage**.

A provider can receive a request in RAM, process it on GPU, then erase that state when the operation is complete, without durably writing the prompt to a database or log.

Google, for example, documents certain in-memory caching mechanisms in its Gemini infrastructure: data may remain temporarily in memory to accelerate requests without being considered stored "at rest." Google also explains that certain functions make true ZDR impossible: conversation persistence, grounding via certain services, or functions that themselves require retention.

The important word is therefore not "zero."

It's **retention**.

And even there, the next question remains: *retention by whom?*

## Going through AWS or Azure can completely change the trust boundary

Calling a model directly via its creator's API and using that same model through a hyperscaler can constitute two very different security architectures.

Amazon explains, for example, that model providers available via Bedrock do not have access to the accounts used by AWS for their deployment, nor to Bedrock logs, customer prompts, or responses. The model is provided to Amazon, then executed in infrastructure controlled by AWS.

This still does not mean "no retention."

For certain Anthropic models currently imposing a particular review, AWS indicates it may retain prompts and responses for up to 30 days **within its own perimeter**, without transmitting them to Anthropic.

Microsoft adopts a similar logic in Foundry. Microsoft affirms that prompts and responses from models sold via Azure are not accessible to OpenAI or other creators of those models and are not used to train their foundations. In the standard configuration, certain flagged content may however be retained for abuse review by Microsoft employees; a modified monitoring regime can remove this step for approved organizations.

The choice is therefore no longer simply:

**"Do I trust OpenAI or Anthropic?"**

It becomes:

**"Which organizations, machines, logs, and administrators am I willing to expose this precise category of information to?"**

## The "private cloud" is not necessarily private in the sense one imagines

Another frequent confusion concerns VPCs, Private Link, and private endpoints.

Azure allows, for example, disabling public network access to Microsoft Foundry and using private endpoints. Communications can then circulate inside a virtual network controlled by the company and on Microsoft's network infrastructure, without directly exposing the service on the Internet.

AWS offers an equivalent architecture with PrivateLink for Bedrock, which allows calling the service from a VPC without going through an Internet gateway or a public IP address.

This is extremely useful.

But **private network does not mean private compute**.

PrivateLink primarily protects the path between your infrastructure and the service. It reduces certain possibilities of interception, accidental exfiltration, or network exposure.

The compute continues to take place at AWS, Azure, or Google.

It is therefore not an alternative to ZDR, contractual terms, or data control: it's an additional layer.

## With agents, the model provider isn't even necessarily the most dangerous link

Classic chatbots essentially received text and returned text.

Modern agents can read a Git repository, open a database, execute code, call an API, retrieve a document, use an MCP server, or browse the Web.

The data boundary therefore becomes much broader.

Even if the model provider perfectly respects its ZDR, an agent can send information to an external tool that, itself, retains it.

OpenAI explicitly warns that information sent to remote MCP servers falls under those services' policies. Anthropic similarly excludes third-party integrations from its ZDR coverage.

The leak can also be caused by **indirect prompt injection**: an agent reads a document or page controlled by an attacker, interprets its content as an instruction, and then uses the permissions granted to it to reveal information.

The problem is therefore no longer simply model confidentiality.

It's that of **the entire tool graph** around the model.

Nvidia's red team precisely recommends not entrusting this security to LLM instructions alone: access control, sandboxing, outbound network filtering, and external secrets management must be enforced by deterministic mechanisms that the model itself cannot bypass.

## Local models seem to solve the problem. Until you look at who now has to secure everything

The most radical answer seems obvious:

Download the model. Disconnect the Internet. Keep the data at home.

In a truly air-gapped architecture, this is indeed the most direct way to eliminate the model provider from the processing chain.

Nvidia explicitly documents NIM deployments in air-gapped environments, and Palantir/Nvidia present their open Nemotron models as a way to keep models, data, and training in infrastructure controlled by the customer.

The capability trade-off has also become less obvious than it was until recently. In July, for example, NIST evaluated the open-weight GLM-5.2 as globally comparable to GPT-5.2 on its evaluation suite. This obviously doesn't mean an open model equals the best closed models in every domain, but the gap is no longer systematically that of a "small local model" versus inaccessible intelligence.

However, the risk doesn't disappear.

It changes owners.

You now have to secure the weights, container images, inference server, GPU drivers, dependencies, admin access, backups, telemetry, agents, and the entire software supply chain.

A company unable to properly maintain this infrastructure can perfectly obtain **less security by self-hosting** than by using Azure, AWS, or Google correctly configured.

This is one of the most important counter-arguments to the "local = secure" reflex.

## A third way is starting to become much more interesting: confidential computing

There is an architecture that precisely seeks to resolve the conflict between the company that wants to protect its data and the lab that wants to protect its proprietary model.

Nvidia now documents a **Confidential Computing** architecture in which a closed model can be sent encrypted to infrastructure controlled by the customer.

Execution takes place inside a hardware-attested environment. The keys to decrypt the model are provided only after verification of the environment's integrity. The provider thus keeps its weights secret, while the data owner keeps inputs and outputs in its own perimeter; Nvidia indicates the model provider does not see them.

Conceptually, this is almost the ideal architecture:

the model can remain proprietary without forcing the company to send its secrets to the model's owner.

It remains, however, more expensive and significantly less turnkey than a simple API call.

## So which architecture best protects secrets without sacrificing the best models?

There is no single right answer because not all of a company's data is worth the same.


| Architecture | Accessible Power | Data Control | Main Trade-off |
| ------------------------------- | ------------------------ | -------------------- | -------------------------------------------------------------- |
| Standard SaaS chatbot | Very high | Low to medium | Stateful product, interface-specific retention rules |
| Frontier model API | Very high | Good | Provider remains in trust boundary |
| Frontier API with ZDR | Very high | Very good | Features sometimes incompatible or subject to exceptions |
| AWS/Azure/Google + private network | Very high | Very good | Cloud remains processor |
| Self-hosted open-weight model | Variable to high | Excellent | Hardware cost, maintenance, and security at your expense |
| Air gap | Variable to high | Maximum | Major loss of flexibility and integrations |
| Confidential Computing | Potentially frontier | Excellent | Availability, cost, and complexity |


For the majority of companies, **the best trade-off in 2026 is probably not to choose a single one of these architectures**.

The best architecture is hybrid.

An internal gateway knows the data classification and decides which model can receive it. Ordinary information can go to the best available frontier model. Confidential data uses an approved provider with ZDR, private network, strict IAM, and no unnecessary persistent functions. The most critical secrets stay on a self-hosted, air-gapped model or in a confidential computing environment.

A RAG system transmits only the necessary fragments to the model rather than an entire repository or database. API keys and passwords are stripped before inference. Agents have minimal permissions and their outbound communications are filtered. Technical traces record the model identity, cost, and security decisions without systematically copying confidential content.

This architecture is less spectacular than a giant "private" model.

It's also much more realistic.

## What Nvidia and Palantir may be showing

The most revealing development of recent days is ultimately not that Nvidia would use certain external models with caution.

It's that at the same time, Nvidia and Palantir are deploying **their own open and customizable models on Nvidia's internal data**, publicly insisting on retaining control and ownership of the information used.

This looks less like a crisis of confidence in AI than the birth of a new architectural separation.

For a few years, the competition consisted mainly of getting **the best model**.

In companies with lots of intellectual property, a second competition is now becoming just as important:

**getting the best model that one can reasonably let see one's data.**

And that won't necessarily be the same one.

The future of enterprise AI could therefore be much less monolithic than imagined: remote frontier models for hard problems, sovereign models for strategic data, automatic policies to route requests between them, and all around, a security infrastructure that has become almost as important as the model's intelligence itself.

This may be the true paradox of professional AI in 2026.

The more models become capable of understanding a company's code, research, contracts, and internal decisions, **the more that context becomes valuable to protect precisely because AI now knows how to extract something from it.**