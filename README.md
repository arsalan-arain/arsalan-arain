<img src="assets/header.svg" alt="Arsalan Ali — software engineer" width="100%">

<p>
  <a href="https://www.linkedin.com/in/arsalanaliarain"><img alt="LinkedIn" src="https://img.shields.io/badge/linkedin-arsalanaliarain-0D1628?style=flat-square&logo=linkedin&logoColor=37E5FF&labelColor=0D1628&color=182740"></a>
  <a href="https://sastaticket.pk"><img alt="Sastaticket" src="https://img.shields.io/badge/building%20at-sastaticket.pk-0D1628?style=flat-square&labelColor=0D1628&color=182740"></a>
  <img alt="Karachi" src="https://img.shields.io/badge/karachi-24.86°N%2067.00°E-0D1628?style=flat-square&labelColor=0D1628&color=182740">
</p>

I build the parts of a system that have to be right when everything else is on fire.

Software engineer at [Sastaticket](https://sastaticket.pk), an online travel agency. I work across the stack of a booking platform: flight search and pricing in the backend, booking and payment flows that have to survive retries and duplicate webhooks, and the web and mobile clients on top. Backends in **Django**, **Go** and **Rust**. Interfaces in **Next.js** and **Flutter**. Machine learning where it earns its place, with evals rather than vibes.

```text
$ cat principles.md
- correct first, then fast
- assume the network lies
- make it explainable
- boring where it matters
- evals over vibes
- write it down
```

## Stack, with honest depth

Four blocks means I run it in production and can debug it at 3 a.m. One block means I have used it and would need a week to be dangerous.

| Backend | Client | Data | Ops & AI |
|---|---|---|---|
| Python / Django `████` | TypeScript `████` | PostgreSQL `████` | OpenTelemetry / Grafana `████` |
| Go `████` | Next.js / React `████` | Redis `████` | CI/CD · GitHub Actions `████` |
| Node.js `███` | Flutter / Dart `███` | Kafka / RabbitMQ `███` | Docker / Kubernetes `███` |
| Rust `███` | CSS · design systems `███` | pgvector `███` | AWS `███` |
| gRPC / REST `████` | Canvas / WebGL `██` | ClickHouse `██` | Retrieval · evals · Claude API `███` |

<p>
  <img src="https://skillicons.dev/icons?i=py,django,go,rust,ts,nextjs,react,flutter,dart,nodejs,postgres,redis,kafka,docker,kubernetes,aws,grafana,githubactions&perline=9" alt="tools">
</p>

## Currently

- Fanning flight search out to a dozen suppliers with a hard latency budget and hedged retries, so one slow airline never slows the customer.
- Making booking state machines idempotent end to end, so a payment webhook arriving twice is a no-op instead of a second ticket.
- Building retrieval over fare rules and airline policies, gated by an eval set that blocks regressions before they ship.
- Using Claude Code daily for the boring parts, and writing down what works.

## Activity

<p>
  <img src="https://github-readme-stats.vercel.app/api?username=arsalan-arain&show_icons=true&hide_border=true&bg_color=060B14&title_color=37E5FF&icon_color=37E5FF&text_color=DCE6F5&hide_title=true&hide_rank=true" alt="GitHub stats" height="165">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=arsalan-arain&layout=compact&hide_border=true&bg_color=060B14&title_color=37E5FF&text_color=DCE6F5&langs_count=6" alt="Top languages" height="165">
</p>

<img src="https://raw.githubusercontent.com/arsalan-arain/arsalan-arain/output/snake.svg" alt="Contribution graph, eaten by a snake" width="100%">

## Reach me

LinkedIn is the fastest way: [linkedin.com/in/arsalanaliarain](https://www.linkedin.com/in/arsalanaliarain). If you are building something that has to stay up, I would like to hear about it.
