# Portfólio Breno Queiroz

Portal público bilíngue e editorial da BQTECH, apresentando Breno Queiroz como Web Designer e
Desenvolvedor Full-Stack por meio dos cases reais Galinheiro, Garage e Memoriar.

## Arquitetura

- `apps/web`: interface Angular 22, componentes e rotas do portfólio.
- `shared/content.ts`: conteúdo tipado e bilíngue compartilhado.
- `app`: shell mínimo Next.js/vinext usado pela hospedagem no Sites e reservado para futuras APIs.
- `scripts/stage-angular.mjs`: prepara o bundle Angular para a camada de hospedagem.

O front-end não depende de banco de dados, autenticação, CMS, analytics ou formulário funcional nesta etapa.
Em produção, o `Dockerfile` gera somente o frontend Angular e o serve com Nginx.

## Rotas

- `/` e `/en`: home em português e inglês.
- `/projetos/:slug` e `/en/projects/:slug`: estudos de caso bilíngues.

## Desenvolvimento

Requer Node.js `>=22.13.0`.

```bash
npm install
npm run dev:web
```

`npm run dev:web` executa apenas a aplicação Angular em `http://localhost:4200`.

Para validar a integração completa com o shell de hospedagem:

```bash
npm run dev
```

## Qualidade e produção

```bash
npm test
npm run build
npm audit --omit=dev
```

O build completo gera o Angular, prepara seus artefatos e compila a camada vinext usada pelo Sites.

## Conteúdo público

Campos incompletos permanecem ocultos e nenhum dado de credibilidade deve ser inventado. Links
para sistemas reais só são exibidos quando estiverem explicitamente configurados no conteúdo.

A visão do ecossistema, os limites entre repositório e infraestrutura privada e o fluxo de
entrega estão em [docs/BQTECH-DEPLOYMENT.md](docs/BQTECH-DEPLOYMENT.md).
