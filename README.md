# Portfólio Breno Queiroz

Portfólio bilíngue e editorial de Breno Queiroz, apresentado como Web Designer e Desenvolvedor Full-Stack. A versão atual é um preview privado com conteúdo-modelo: projetos, métricas e contatos reais serão adicionados antes da publicação.

## Arquitetura

- `apps/web`: interface Angular 22, componentes e rotas do portfólio.
- `shared/content.ts`: conteúdo tipado e bilíngue compartilhado.
- `app`: shell mínimo Next.js/vinext usado pela hospedagem no Sites e reservado para futuras APIs.
- `scripts/stage-angular.mjs`: prepara o bundle Angular para a camada de hospedagem.

O front-end não depende de banco de dados, autenticação, CMS, analytics ou formulário funcional nesta etapa.

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

A publicação pública só deve acontecer depois que projetos, resultados, métricas, links profissionais e um canal de contato forem confirmados. Campos incompletos permanecem ocultos e nenhum dado de credibilidade deve ser inventado.
