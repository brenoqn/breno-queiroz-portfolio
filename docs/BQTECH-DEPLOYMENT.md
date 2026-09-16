# Arquitetura e implantação BQTECH

Este documento registra os limites arquiteturais relevantes para o portal público e a forma
como os projetos BQTECH chegam à produção. Ele não substitui a configuração privada do servidor,
do proxy ou do provedor de borda.

## Visão do ecossistema

`bqtech.com.br` é o portal público e o ponto de entrada para os cases. Os sistemas operacionais
usam subdomínios próprios:

- `galinheiro.bqtech.com.br`: automação do galinheiro, com autenticação do Home Assistant;
- `garage.bqtech.com.br`: PWA Garage, com dados locais no navegador;
- `memoriar.bqtech.com.br`: aplicação Memoriar, com frontend e API próprios.

Os cases e os sistemas são responsabilidades distintas. Um case pode ser público sem expor
administração, credenciais ou detalhes internos do sistema correspondente. Galinheiro, Garage e
Memoriar possuem cases próprios e links para seus sistemas operacionais no portal.

## Fluxo de tráfego

Em produção, a borda pública termina TLS e encaminha o tráfego por um túnel gerenciado até o
proxy reverso do ambiente BQTECH. O proxy direciona cada host para seu serviço:

```text
Internet -> borda/túnel -> proxy reverso -> aplicação ou Home Assistant
```

O Galinheiro mantém a autenticação nativa do Home Assistant. Não há uma segunda camada de login
do provedor de borda na frente desse sistema.

## Portal deste repositório

O frontend público é Angular e possui rotas em português e inglês. A imagem de produção é
construída pelo `Dockerfile` da raiz e serve o build estático com Nginx. A imagem publicada é:

```text
ghcr.io/brenoqn/breno-queiroz-portfolio
```

O shell vinext/Next existente no repositório atende o ambiente Sites e a validação integrada,
mas não faz parte da imagem Nginx criada pelo `Dockerfile` atual.

### Cache

- `index.html`: `no-cache, must-revalidate`;
- arquivos com hash: `public, max-age=31536000, immutable`;
- demais assets estáticos: revalidação obrigatória.

O nome dos bundles é gerado pelo build e nunca deve ser fixado em scripts ou testes.

## CI e entrega

O GitHub Actions valida o repositório e, em `push` para `main`, publica as tags `latest` e
`sha-<commit-curto>` no GHCR. O workflow usa runners hospedados pelo GitHub e `GITHUB_TOKEN` com
permissão de escrita em packages somente no job de publicação.

O GitHub não acessa o homelab. A atualização de produção é iniciada no próprio servidor por um
timer, que consulta o registry, valida a nova imagem e mantém uma opção de rollback. Scripts de
atualização, proxy, túnel, secrets e o compose efetivamente usado no servidor ficam fora deste
repositório.

## Fontes de verdade e limites

- Este repositório é a fonte de verdade para código, conteúdo do portal, Dockerfile, Nginx e CI.
- A infraestrutura privada do servidor é a fonte de verdade para proxy, compose de produção,
  timers, health checks operacionais, rollback e secrets.
- O `compose.yaml` versionado é apropriado para construir e executar o container na rede externa
  esperada, mas não representa necessariamente o arquivo de deploy mantido no servidor.
- `.openai/hosting.json` é metadado local opcional e ignorado pelo Git. A configuração Vite deve
  continuar funcionando quando esse arquivo não existir.

Não devem ser adicionadas ao repositório chaves do provedor de borda, credenciais do servidor,
tokens de aplicações ou arquivos `.env` reais.

## Validação antes de publicar

```bash
npm ci
npm run lint
npm test
npm run build
```

Depois da publicação da imagem, a validação operacional deve ser executada no ambiente privado:
health check pelo proxy, carregamento das rotas PT/EN, headers de cache e possibilidade de
rollback. Essa etapa não deve ser implementada como acesso SSH no GitHub Actions.
