// Shared by the Angular interface and the hosting layer.
export type Locale = "pt" | "en";

export type LocalizedText = Record<Locale, string>;

export interface ProcessStep {
  index: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface ProjectFlowStep {
  index: string;
  label: LocalizedText;
  value: LocalizedText;
}

export interface ProjectVisual {
  src: string;
  alt: LocalizedText;
}

export interface Project {
  slug: string;
  index: string;
  featured?: boolean;
  category: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  contribution: LocalizedText;
  status: LocalizedText;
  statusDescription: LocalizedText;
  currentState: LocalizedText;
  technologies: string[];
  visual?: ProjectVisual;
  appUrl?: string;
  appAccess?: "public" | "protected" | "coming-soon";
  context: LocalizedText;
  role: LocalizedText;
  challenge: LocalizedText;
  architectureSummary: LocalizedText;
  constraints: LocalizedText[];
  decisions: ProcessStep[];
  outcome: LocalizedText;
  evidence: LocalizedText[];
  evidenceSummary: LocalizedText;
  limitations: LocalizedText[];
  nextSteps: ProcessStep[];
  vision: LocalizedText;
  learning: LocalizedText;
  process: ProcessStep[];
  coverFlow: ProjectFlowStep[];
}

export interface ExperienceEntry {
  index: string;
  company: string;
  period: string;
  role: LocalizedText;
  focus: LocalizedText;
  journey?: LocalizedText[];
  context: LocalizedText;
  responsibility: LocalizedText;
  contribution: LocalizedText;
  outcome: LocalizedText;
  technologies: string[];
  published: boolean;
}

export interface CapabilityGroup {
  index: string;
  title: LocalizedText;
  description: LocalizedText;
  items: LocalizedText[];
}

export const projects: Project[] = [
  {
    slug: "galinheiro",
    index: "01",
    featured: true,
    category: {
      pt: "IoT + Automação",
      en: "IoT + Automation",
    },
    title: {
      pt: "Galinheiro inteligente",
      en: "Smart chicken coop",
    },
    summary: {
      pt: "MVP de automação para um galinheiro futuro, desenvolvido e validado inicialmente em ambiente simulado.",
      en: "An automation MVP for a future chicken coop, initially developed and validated in a simulated environment.",
    },
    problem: {
      pt: "Projetar e validar os primeiros fluxos de automação antes da construção do ambiente físico.",
      en: "Design and validate the first automation flows before the physical environment is built.",
    },
    contribution: {
      pt: "Concepção do sistema, arquitetura do MVP, simulação em Wokwi, MQTT e integração com Home Assistant.",
      en: "System design, MVP architecture, Wokwi simulation, MQTT, and Home Assistant integration.",
    },
    status: {
      pt: "MVP v1 · Em evolução",
      en: "MVP v1 · Evolving",
    },
    statusDescription: {
      pt: "Primeira versão desenvolvida e validada em simulação, com evolução planejada para hardware físico.",
      en: "The first version was developed and validated in simulation, with a planned path to physical hardware.",
    },
    currentState: {
      pt: "O galinheiro físico ainda não foi construído. Hoje, o projeto existe como um laboratório de IoT que conecta Wokwi, MQTT e Home Assistant para experimentar os primeiros fluxos de automação.",
      en: "The physical chicken coop has not been built yet. Today, the project is an IoT lab connecting Wokwi, MQTT, and Home Assistant to experiment with the first automation flows.",
    },
    technologies: ["ESP32", "MQTT", "Home Assistant"],
    appUrl: "https://galinheiro.bqtech.com.br",
    appAccess: "protected",
    context: {
      pt: "O sistema foi iniciado antes da construção do galinheiro para que a lógica, as integrações e o caminho de evolução pudessem ser experimentados sem depender do hardware definitivo.",
      en: "The system was started before the chicken coop was built so its logic, integrations, and evolution path could be explored without depending on the final hardware.",
    },
    role: {
      pt: "Concepção, arquitetura do MVP, simulação e integração",
      en: "Concept, MVP architecture, simulation, and integration",
    },
    challenge: {
      pt: "Validar uma primeira arquitetura de automação sem apresentar a simulação como se o ambiente físico já estivesse operando.",
      en: "Validate an initial automation architecture without presenting the simulation as if the physical environment were already operating.",
    },
    architectureSummary: {
      pt: "A arquitetura atual termina na validação simulada: Wokwi representa o ambiente do MVP, MQTT transporta os estados e o Home Assistant concentra os primeiros fluxos de automação.",
      en: "The current architecture ends at simulated validation: Wokwi represents the MVP environment, MQTT carries state, and Home Assistant centralizes the first automation flows.",
    },
    constraints: [
      {
        pt: "O galinheiro e o ambiente físico ainda não foram construídos.",
        en: "The chicken coop and its physical environment have not been built yet.",
      },
      {
        pt: "Sensores e atuadores físicos ainda não estão instalados.",
        en: "Physical sensors and actuators have not been installed yet.",
      },
      {
        pt: "O uso atual de MQTT pertence ao MVP e não representa a implantação física definitiva.",
        en: "The current MQTT setup belongs to the MVP and does not represent the final physical deployment.",
      },
    ],
    decisions: [
      {
        index: "01",
        title: { pt: "Simular primeiro", en: "Simulate first" },
        description: {
          pt: "Usar o Wokwi para experimentar a primeira versão antes de investir na construção física.",
          en: "Use Wokwi to explore the first version before investing in the physical build.",
        },
      },
      {
        index: "02",
        title: { pt: "Validar o fluxo", en: "Validate the flow" },
        description: {
          pt: "Conectar simulação, comunicação e automação como um único sistema desde o MVP.",
          en: "Connect simulation, communication, and automation as one system from the MVP onward.",
        },
      },
    ],
    evidence: [
      {
        pt: "MVP v1 desenvolvido em ambiente simulado com Wokwi.",
        en: "MVP v1 developed in a simulated Wokwi environment.",
      },
      {
        pt: "MQTT e Home Assistant integrados aos primeiros fluxos de automação.",
        en: "MQTT and Home Assistant integrated into the first automation flows.",
      },
      {
        pt: "Ambiente do Home Assistant acessível com autenticação protegida.",
        en: "Home Assistant environment available behind protected authentication.",
      },
    ],
    evidenceSummary: {
      pt: "A evidência atual é a validação do fluxo em simulação — não a operação de hardware físico.",
      en: "The current evidence is the validated simulated flow — not physical hardware operation.",
    },
    limitations: [
      {
        pt: "Ainda não há ambiente físico para validar comportamento, conectividade e operação contínua.",
        en: "There is no physical environment yet to validate behavior, connectivity, or continuous operation.",
      },
      {
        pt: "Sensores, atuadores e regras definitivas permanecem fora do escopo publicado desta versão.",
        en: "Final sensors, actuators, and rules remain outside the published scope of this version.",
      },
    ],
    nextSteps: [
      {
        index: "01",
        title: { pt: "Levar ao hardware", en: "Move to hardware" },
        description: {
          pt: "Transportar o fluxo validado para componentes físicos quando o galinheiro for construído.",
          en: "Transfer the validated flow to physical components when the chicken coop is built.",
        },
      },
      {
        index: "02",
        title: { pt: "Validar no ambiente real", en: "Validate in the real environment" },
        description: {
          pt: "Evoluir MQTT, Home Assistant e automações a partir do comportamento observado no espaço físico.",
          en: "Evolve MQTT, Home Assistant, and automations based on behavior observed in the physical space.",
        },
      },
    ],
    vision: {
      pt: "Como direção futura, o domínio do Galinheiro poderá reunir telemetria e observabilidade próprias dentro da infraestrutura BQTECH, sem compartilhar seu modelo de dados com outros produtos.",
      en: "As a future direction, the Galinheiro domain may gain its own telemetry and observability within BQTECH infrastructure without sharing its data model with other products.",
    },
    outcome: {
      pt: "A primeira versão do sistema foi estruturada e validada em simulação, criando uma base concreta para a futura transição ao hardware físico.",
      en: "The first version of the system was structured and validated in simulation, creating a concrete foundation for the future transition to physical hardware.",
    },
    learning: {
      pt: "Projetos de IoT exigem pensar hardware, comunicação, automação e observabilidade como partes de um único sistema.",
      en: "IoT projects require hardware, communication, automation, and observability to be designed as parts of a single system.",
    },
    process: [
      {
        index: "01",
        title: { pt: "Modelar", en: "Model" },
        description: {
          pt: "Representar a primeira versão do ambiente e do controlador dentro do Wokwi.",
          en: "Represent the first version of the environment and controller inside Wokwi.",
        },
      },
      {
        index: "02",
        title: { pt: "Comunicar", en: "Communicate" },
        description: {
          pt: "Usar MQTT no MVP para conectar os estados simulados ao restante do fluxo.",
          en: "Use MQTT in the MVP to connect simulated states to the rest of the flow.",
        },
      },
      {
        index: "03",
        title: { pt: "Automatizar", en: "Automate" },
        description: {
          pt: "Construir os primeiros fluxos de automação no Home Assistant.",
          en: "Build the first automation flows in Home Assistant.",
        },
      },
      {
        index: "04",
        title: { pt: "Validar", en: "Validate" },
        description: {
          pt: "Verificar a integração antes da construção e da instalação do hardware real.",
          en: "Verify the integration before building and installing the real hardware.",
        },
      },
    ],
    coverFlow: [
      {
        index: "01",
        label: { pt: "Ambiente", en: "Environment" },
        value: { pt: "Wokwi", en: "Wokwi" },
      },
      {
        index: "02",
        label: { pt: "Controlador", en: "Controller" },
        value: { pt: "ESP32 / Simulação", en: "ESP32 / Simulation" },
      },
      {
        index: "03",
        label: { pt: "Protocolo", en: "Protocol" },
        value: { pt: "MQTT", en: "MQTT" },
      },
      {
        index: "04",
        label: { pt: "Central", en: "Hub" },
        value: { pt: "Home Assistant", en: "Home Assistant" },
      },
      {
        index: "05",
        label: { pt: "Lógica", en: "Logic" },
        value: { pt: "Automações", en: "Automations" },
      },
    ],
  },
  {
    slug: "garage",
    index: "02",
    category: {
      pt: "PWA + Produto pessoal",
      en: "PWA + Personal product",
    },
    title: {
      pt: "Garage",
      en: "Garage",
    },
    summary: {
      pt: "Protótipo PWA para estruturar a experiência e o modelo de gestão da Honda NX200 com dados demonstrativos.",
      en: "A PWA prototype that structures the experience and management model for a Honda NX200 using demonstrative data.",
    },
    problem: {
      pt: "Reunir manutenção, abastecimentos e histórico da motocicleta sem exigir conta ou serviço remoto.",
      en: "Bring maintenance, fuel records, and motorcycle history together without requiring an account or remote service.",
    },
    contribution: {
      pt: "Produto, experiência, modelagem do domínio, arquitetura Angular, persistência local e PWA.",
      en: "Product, experience, domain modeling, Angular architecture, local persistence, and PWA.",
    },
    status: {
      pt: "MVP · Em desenvolvimento",
      en: "MVP · In development",
    },
    statusDescription: {
      pt: "Protótipo focado na experiência e no modelo do produto, com evolução planejada para API e persistência própria.",
      en: "A prototype focused on product experience and modeling, with a planned path to its own API and persistence layer.",
    },
    currentState: {
      pt: "O Garage é hoje um protótipo navegável com dados demonstrativos. A aplicação já modela o domínio, os fluxos e a persistência local da primeira versão, mas ainda não opera com API, banco remoto ou dados reais mantidos em servidor.",
      en: "Garage is currently a navigable prototype using demonstrative data. It already models the domain, flows, and local persistence of the first version, but it does not yet operate with an API, remote database, or real server-side data.",
    },
    technologies: [
      "Angular",
      "TypeScript",
      "Angular Service Worker",
      "LocalStorage",
    ],
    visual: {
      src: "/garage-dashboard.webp",
      alt: {
        pt: "Dashboard público do Garage para a Honda NX200",
        en: "Garage public dashboard for the Honda NX200",
      },
    },
    appUrl: "https://garage.bqtech.com.br",
    appAccess: "public",
    context: {
      pt: "O Garage nasceu como um produto pessoal para acompanhar e melhorar o uso e a manutenção da moto do Breno. A Honda NX200 é o primeiro domínio de uma visão mais ampla de gerenciamento de hobbies e bens pessoais.",
      en: "Garage began as a personal product for tracking and improving how Breno uses and maintains his motorcycle. The Honda NX200 is the first domain in a broader vision for managing hobbies and personal assets.",
    },
    role: {
      pt: "Produto, experiência, arquitetura front-end, implementação e publicação",
      en: "Product, experience, front-end architecture, implementation, and delivery",
    },
    challenge: {
      pt: "Estruturar a experiência e o modelo de um produto de gestão pessoal antes de investir em uma API e em persistência remota.",
      en: "Structure the experience and model of a personal management product before investing in an API and remote persistence.",
    },
    architectureSummary: {
      pt: "A primeira versão é uma PWA Angular local-first. Estado versionado, migrações e backup JSON sustentam o protótipo no navegador enquanto a camada de API permanece como evolução.",
      en: "The first version is a local-first Angular PWA. Versioned state, migrations, and JSON backups support the browser prototype while the API layer remains a future step.",
    },
    constraints: [
      {
        pt: "Os dados atuais são demonstrativos e pertencem ao protótipo.",
        en: "The current data is demonstrative and belongs to the prototype.",
      },
      {
        pt: "Não há API, banco remoto, sincronização, login ou operação multiusuário.",
        en: "There is no API, remote database, synchronization, login, or multi-user operation.",
      },
      {
        pt: "O estado local depende da origem do navegador e usa backup JSON para portabilidade.",
        en: "Local state belongs to the browser origin and relies on JSON backups for portability.",
      },
    ],
    decisions: [
      {
        index: "01",
        title: { pt: "Produto antes da infraestrutura", en: "Product before infrastructure" },
        description: {
          pt: "Construir primeiro a experiência, os fluxos e o modelo do domínio da moto.",
          en: "Build the experience, flows, and motorcycle domain model first.",
        },
      },
      {
        index: "02",
        title: { pt: "Local-first no MVP", en: "Local-first for the MVP" },
        description: {
          pt: "Usar o navegador como base da primeira versão para reduzir dependências durante a validação do produto.",
          en: "Use the browser as the foundation of the first version to reduce dependencies while validating the product.",
        },
      },
      {
        index: "03",
        title: { pt: "Dados transportáveis", en: "Portable data" },
        description: {
          pt: "Incluir exportação, validação e restauração JSON para tornar explícitos os limites do armazenamento local.",
          en: "Include JSON export, validation, and restore to make the limits of local storage explicit.",
        },
      },
    ],
    evidence: [
      {
        pt: "Protótipo navegável com dashboard e fluxos do domínio da moto.",
        en: "Navigable prototype with a dashboard and motorcycle-domain flows.",
      },
      {
        pt: "Estado local no schema 4, com migrações verificadas por testes.",
        en: "Local schema 4 state with migrations verified by tests.",
      },
      {
        pt: "Backup e restauração JSON, PWA e Angular Service Worker implementados.",
        en: "JSON backup and restore, PWA support, and Angular Service Worker implemented.",
      },
    ],
    evidenceSummary: {
      pt: "A evidência é o protótipo tecnicamente funcional e navegável; os dados exibidos permanecem demonstrativos.",
      en: "The evidence is a technically functional, navigable prototype; the displayed data remains demonstrative.",
    },
    limitations: [
      {
        pt: "O produto ainda não trabalha com dados reais persistidos em uma infraestrutura própria.",
        en: "The product does not yet work with real data persisted in its own infrastructure.",
      },
      {
        pt: "A arquitetura atual não oferece sincronização entre dispositivos ou múltiplos usuários.",
        en: "The current architecture does not provide cross-device synchronization or multi-user operation.",
      },
    ],
    nextSteps: [
      {
        index: "01",
        title: { pt: "Criar a API", en: "Build the API" },
        description: {
          pt: "Conectar os fluxos existentes a uma camada própria de aplicação e persistência.",
          en: "Connect the existing flows to a dedicated application and persistence layer.",
        },
      },
      {
        index: "02",
        title: { pt: "Usar dados reais", en: "Use real data" },
        description: {
          pt: "Substituir o cenário demonstrativo por histórico operacional da moto.",
          en: "Replace the demonstrative scenario with the motorcycle's operational history.",
        },
      },
      {
        index: "03",
        title: { pt: "Ampliar o domínio", en: "Expand the domain" },
        description: {
          pt: "Evoluir a experiência para outros hobbies e bens sem misturar seus modelos de dados.",
          en: "Expand the experience to other hobbies and assets without mixing their data models.",
        },
      },
    ],
    vision: {
      pt: "Como direção futura, a infraestrutura BQTECH poderá fornecer API e persistência ao Garage, mantendo isolado o domínio de moto, manutenção, custos e histórico.",
      en: "As a future direction, BQTECH infrastructure may provide Garage with an API and persistence while keeping its motorcycle, maintenance, cost, and history domain isolated.",
    },
    outcome: {
      pt: "A experiência e o modelo do domínio já foram estruturados em um protótipo navegável e tecnicamente funcional, preparado para receber uma futura camada de API e dados reais.",
      en: "The experience and domain model have been structured in a navigable, technically functional prototype ready for a future API layer and real data.",
    },
    learning: {
      pt: "Uma arquitetura local-first só é realmente simples quando seus limites ficam claros e a portabilidade dos dados faz parte do produto desde o início.",
      en: "A local-first architecture is only truly simple when its boundaries are clear and data portability is designed into the product from the start.",
    },
    process: [
      {
        index: "01",
        title: { pt: "Modelar", en: "Model" },
        description: {
          pt: "Organizar óleo, freios, bateria, quilometragem, manutenção, abastecimentos, custos e histórico em um único domínio.",
          en: "Organize oil, brakes, battery, mileage, maintenance, fuel records, costs, and history in one domain.",
        },
      },
      {
        index: "02",
        title: { pt: "Projetar", en: "Design" },
        description: {
          pt: "Transformar o modelo em uma experiência navegável para o uso e a manutenção da moto.",
          en: "Turn the model into a navigable experience for motorcycle use and maintenance.",
        },
      },
      {
        index: "03",
        title: { pt: "Persistir localmente", en: "Persist locally" },
        description: {
          pt: "Implementar schema versionado, migrações e estado local para sustentar o protótipo.",
          en: "Implement versioned state, migrations, and local storage to support the prototype.",
        },
      },
      {
        index: "04",
        title: { pt: "Tornar transportável", en: "Make it portable" },
        description: {
          pt: "Adicionar backup e restauração JSON e preparar a experiência como PWA instalável.",
          en: "Add JSON backup and restore and prepare the experience as an installable PWA.",
        },
      },
    ],
    coverFlow: [
      {
        index: "01",
        label: { pt: "Interface", en: "Interface" },
        value: { pt: "Angular", en: "Angular" },
      },
      {
        index: "02",
        label: { pt: "PWA", en: "PWA" },
        value: {
          pt: "Angular Service Worker",
          en: "Angular Service Worker",
        },
      },
      {
        index: "03",
        label: { pt: "Estado local", en: "Local state" },
        value: { pt: "LocalStorage", en: "LocalStorage" },
      },
      {
        index: "04",
        label: { pt: "Estrutura", en: "Structure" },
        value: { pt: "garage_state / v4", en: "garage_state / v4" },
      },
      {
        index: "05",
        label: { pt: "Portabilidade", en: "Portability" },
        value: { pt: "Backup JSON", en: "JSON backup" },
      },
      {
        index: "06",
        label: { pt: "Estado", en: "State" },
        value: { pt: "Dados demonstrativos", en: "Demonstrative data" },
      },
    ],
  },
  {
    slug: "memoriar",
    index: "03",
    category: {
      pt: "Full-stack + Produto",
      en: "Full-stack + Product",
    },
    title: {
      pt: "Memoriar",
      en: "Memoriar",
    },
    summary: {
      pt: "Sistema para facilitar a localização e a gestão de registros em cemitérios.",
      en: "A system for making cemetery records easier to locate and manage.",
    },
    problem: {
      pt: "Tornar registros e localizações consultáveis ao público sem misturar a experiência aberta com a administração.",
      en: "Make records and locations searchable to the public without mixing the open experience with administration.",
    },
    contribution: {
      pt: "Arquitetura full-stack, contratos compartilhados, Angular, API, dados, containers e publicação.",
      en: "Full-stack architecture, shared contracts, Angular, API, data, containers, and delivery.",
    },
    status: {
      pt: "Produto · Em evolução",
      en: "Product · Evolving",
    },
    statusDescription: {
      pt: "Busca pública e gestão administrativa já disponíveis; a participação pública e a expansão da base fazem parte da evolução planejada.",
      en: "Public search and administrative management are available; public participation and a larger record base are part of the planned evolution.",
    },
    currentState: {
      pt: "O produto já reúne uma experiência pública de busca, resultados, detalhes e mapa lógico com uma área administrativa separada. A participação pública no cadastro de novos registros ainda não faz parte da versão atual.",
      en: "The product already combines a public search experience, results, details, and a logical map with a separate administrative area. Public contribution of new records is not part of the current version yet.",
    },
    technologies: [
      "Angular",
      "Node.js",
      "Express",
      "TypeScript",
      "@memoriar/shared",
      "Supabase",
      "Docker",
    ],
    visual: {
      src: "/memoriar-search.webp",
      alt: {
        pt: "Interface pública de busca do Memoriar",
        en: "Memoriar public search interface",
      },
    },
    appUrl: "https://memoriar.bqtech.com.br",
    appAccess: "public",
    context: {
      pt: "O Memoriar foi estruturado para pessoas que precisam localizar informações e registros cemiteriais, enquanto a gestão permanece em uma área administrativa autenticada.",
      en: "Memoriar was structured for people who need to locate cemetery records and information while management remains in an authenticated administrative area.",
    },
    role: {
      pt: "Arquitetura full-stack, contratos compartilhados, front-end, API, containerização e publicação",
      en: "Full-stack architecture, shared contracts, frontend, API, containerization, and delivery",
    },
    challenge: {
      pt: "Conectar busca pública, administração e persistência externa sem publicar o backend diretamente, mantendo uma API same-origin e contratos consistentes entre as camadas.",
      en: "Connect public search, administration, and external persistence without exposing the backend directly, while keeping a same-origin API and consistent contracts across layers.",
    },
    architectureSummary: {
      pt: "A experiência Angular consome uma API same-origin em /api. Node.js e Express concentram as regras, @memoriar/shared alinha os contratos e o Supabase mantém os dados externos; web e API são entregues em containers separados.",
      en: "The Angular experience consumes a same-origin API under /api. Node.js and Express hold application rules, @memoriar/shared aligns contracts, and Supabase stores external data; web and API ship in separate containers.",
    },
    constraints: [
      {
        pt: "A busca pública e a administração precisam permanecer separadas por contexto e acesso.",
        en: "Public search and administration must remain separate in both context and access.",
      },
      {
        pt: "O cadastro público colaborativo ainda não está implementado.",
        en: "Collaborative public record submission is not implemented yet.",
      },
      {
        pt: "A versão atual não sustenta afirmações sobre volume de registros, usuários ou cobertura.",
        en: "The current version does not support claims about record volume, users, or coverage.",
      },
    ],
    decisions: [
      {
        index: "01",
        title: { pt: "Separar experiências", en: "Separate experiences" },
        description: {
          pt: "Manter a consulta aberta ao público sem misturá-la às operações administrativas autenticadas.",
          en: "Keep public search open without mixing it with authenticated administrative operations.",
        },
      },
      {
        index: "02",
        title: { pt: "Contratos compartilhados", en: "Shared contracts" },
        description: {
          pt: "Usar @memoriar/shared para preservar consistência entre a interface e a API.",
          en: "Use @memoriar/shared to preserve consistency between the interface and the API.",
        },
      },
      {
        index: "03",
        title: { pt: "API same-origin", en: "Same-origin API" },
        description: {
          pt: "Encaminhar /api pelo Nginx e manter o backend fora da exposição direta.",
          en: "Route /api through Nginx and keep the backend from being exposed directly.",
        },
      },
    ],
    evidence: [
      {
        pt: "Busca pública por nome, referência ou código, com resultados e detalhes.",
        en: "Public search by name, reference, or code, with results and details.",
      },
      {
        pt: "Mapa lógico e área administrativa autenticada implementados.",
        en: "Logical map and authenticated administrative area implemented.",
      },
      {
        pt: "Containers web/API, health endpoint, GitHub Actions e publicação no GHCR documentados.",
        en: "Web/API containers, health endpoint, GitHub Actions, and GHCR publishing documented.",
      },
    ],
    evidenceSummary: {
      pt: "A evidência atual é o produto funcional: busca pública, gestão administrativa e arquitetura de entrega implementadas — sem métricas de utilização inventadas.",
      en: "The current evidence is the functioning product: public search, administrative management, and delivery architecture implemented — without invented usage metrics.",
    },
    limitations: [
      {
        pt: "A versão atual mantém o cadastro sob controle administrativo; a participação pública é uma evolução planejada.",
        en: "The current version keeps record creation under administrative control; public participation is planned for a future stage.",
      },
      {
        pt: "A cobertura atual não é apresentada como completa e não possui métricas públicas verificadas.",
        en: "Current coverage is not presented as complete and has no verified public metrics.",
      },
    ],
    nextSteps: [
      {
        index: "01",
        title: { pt: "Abrir participação", en: "Enable participation" },
        description: {
          pt: "Criar uma forma responsável de receber novos registros e informações do público.",
          en: "Create a responsible way to receive new records and information from the public.",
        },
      },
      {
        index: "02",
        title: { pt: "Ampliar a base", en: "Grow the record base" },
        description: {
          pt: "Aumentar progressivamente a disponibilidade de informações e localizações.",
          en: "Progressively increase the availability of information and locations.",
        },
      },
      {
        index: "03",
        title: { pt: "Expandir a utilidade", en: "Expand public value" },
        description: {
          pt: "Usar o crescimento da cobertura para tornar a busca mais útil ao público.",
          en: "Use broader coverage to make public search more useful.",
        },
      },
    ],
    vision: {
      pt: "A visão futura é evoluir para uma plataforma pública em que novos registros possam ser cadastrados e consultados, ampliando progressivamente a base e facilitando a localização de pessoas sepultadas.",
      en: "The future direction is a public platform where new records can be submitted and searched, progressively expanding the record base and making it easier to locate people buried in cemeteries.",
    },
    outcome: {
      pt: "A busca pública está disponível e a área administrativa está implementada, apoiadas por uma arquitetura full-stack que separa interface, API, contratos e dados.",
      en: "Public search is available and the administrative area is implemented, supported by a full-stack architecture that separates interface, API, contracts, and data.",
    },
    learning: {
      pt: "Separar interface, API e contratos compartilhados torna a evolução mais previsível quando cada limite também é validado no build, no container e no deploy.",
      en: "Separating interface, API, and shared contracts makes change more predictable when every boundary is also validated in the build, container, and deployment flow.",
    },
    process: [
      {
        index: "01",
        title: { pt: "Definir contratos", en: "Define contracts" },
        description: {
          pt: "Centralizar tipos compartilhados em @memoriar/shared para alinhar frontend e backend.",
          en: "Centralize shared types in @memoriar/shared to align the frontend and backend.",
        },
      },
      {
        index: "02",
        title: { pt: "Separar", en: "Separate" },
        description: {
          pt: "Organizar busca pública e administração no Angular, consumindo a API pelo mesmo domínio.",
          en: "Organize public search and administration in Angular while consuming the API through the same origin.",
        },
      },
      {
        index: "03",
        title: { pt: "Integrar", en: "Integrate" },
        description: {
          pt: "Manter regras na API Node.js e Express e acessar os dados externos pelo cliente Supabase.",
          en: "Keep application rules in the Node.js and Express API and access external data through the Supabase client.",
        },
      },
      {
        index: "04",
        title: { pt: "Entregar", en: "Ship" },
        description: {
          pt: "Construir imagens web e API, publicar no GHCR e atualizar a infraestrutura BQTECH de forma automatizada.",
          en: "Build web and API images, publish them to GHCR, and update the BQTECH infrastructure through automation.",
        },
      },
    ],
    coverFlow: [
      {
        index: "01",
        label: { pt: "Frontend", en: "Frontend" },
        value: { pt: "Angular", en: "Angular" },
      },
      {
        index: "02",
        label: { pt: "Same-origin", en: "Same-origin" },
        value: { pt: "/api", en: "/api" },
      },
      {
        index: "03",
        label: { pt: "Backend", en: "Backend" },
        value: { pt: "Node.js + Express", en: "Node.js + Express" },
      },
      {
        index: "04",
        label: { pt: "Contratos", en: "Contracts" },
        value: { pt: "@memoriar/shared", en: "@memoriar/shared" },
      },
      {
        index: "05",
        label: { pt: "Dados", en: "Data" },
        value: { pt: "Supabase", en: "Supabase" },
      },
      {
        index: "06",
        label: { pt: "Containers", en: "Containers" },
        value: { pt: "Web + API", en: "Web + API" },
      },
      {
        index: "07",
        label: { pt: "Produção", en: "Production" },
        value: { pt: "BQTECH", en: "BQTECH" },
      },
    ],
  },
];

export const experience: ExperienceEntry[] = [
  {
    index: "01",
    company: "MAXICON SISTEMAS",
    period: "2024 — 2026",
    role: { pt: "Desenvolvedor Full Stack", en: "Full-Stack Developer" },
    focus: {
      pt: "Modernização do ERP Maxys",
      en: "Maxys ERP modernization",
    },
    context: {
      pt: "Modernização do ERP Maxys e evolução de aplicações corporativas ligadas a processos críticos de negócio.",
      en: "Modernization of the Maxys ERP and evolution of enterprise applications supporting critical business processes.",
    },
    responsibility: {
      pt: "Atuação ponta a ponta em módulos construídos com Angular, Java, Spring Boot e Oracle, incluindo análise, implementação, troubleshooting, homologação e implantação.",
      en: "End-to-end work on modules built with Angular, Java, Spring Boot, and Oracle, covering analysis, implementation, troubleshooting, validation, and deployment.",
    },
    contribution: {
      pt: "APIs REST, componentes e bibliotecas reutilizáveis, modernização de legado e evolução de uma arquitetura baseada em Micro Frontends.",
      en: "REST APIs, reusable components and libraries, legacy modernization, and the evolution of a Micro Frontend architecture.",
    },
    outcome: {
      pt: "Maior modularidade, reutilização e confiabilidade na evolução de funcionalidades essenciais do ERP.",
      en: "Greater modularity, reuse, and reliability while evolving essential ERP capabilities.",
    },
    technologies: ["Angular", "Java", "Spring Boot", "Oracle", "REST APIs", "Micro Frontends"],
    published: true,
  },
  {
    index: "02",
    company: "EVOLUUM",
    period: "2021 — 2024",
    role: { pt: "Desenvolvedor Front-end", en: "Front-End Developer" },
    focus: {
      pt: "Da experiência ao produto em produção",
      en: "From experience design to a live product",
    },
    journey: [
      { pt: "UX", en: "UX" },
      { pt: "Figma", en: "Figma" },
      { pt: "Produto", en: "Product" },
      { pt: "Front-end", en: "Front-end" },
    ],
    context: {
      pt: "Desenvolvimento da plataforma Seu Ingresso Aqui, voltada à gestão e comercialização de eventos.",
      en: "Development of Seu Ingresso Aqui, a platform for event management and ticket sales.",
    },
    responsibility: {
      pt: "Transformação de protótipos do Figma em interfaces Angular responsivas, conectando requisitos de negócio, UX e integração REST.",
      en: "Turning Figma prototypes into responsive Angular interfaces while connecting business requirements, UX, and REST integrations.",
    },
    contribution: {
      pt: "Construção da jornada de compra, componentes reutilizáveis, integração de APIs e melhorias contínuas de experiência e performance.",
      en: "Building the purchase journey, reusable components, API integrations, and continuous experience and performance improvements.",
    },
    outcome: {
      pt: "Uma experiência de compra responsiva e integrada, construída em colaboração próxima com UX/UI e produto.",
      en: "A responsive, integrated purchase experience built in close collaboration with UX/UI and product teams.",
    },
    technologies: ["Angular", "TypeScript", "Figma", "UX", "REST APIs"],
    published: true,
  },
];

export const capabilityGroups: CapabilityGroup[] = [
  {
    index: "01",
    title: { pt: "Produto & UX", en: "Product & UX" },
    description: {
      pt: "Problema, jornada e interface tratados como partes da mesma entrega.",
      en: "Problem, journey, and interface treated as parts of the same delivery.",
    },
    items: [
      { pt: "Jornada", en: "Journey" },
      { pt: "Design responsivo", en: "Responsive design" },
      { pt: "UX/UI", en: "UX/UI" },
    ],
  },
  {
    index: "02",
    title: { pt: "Interfaces", en: "Interfaces" },
    description: {
      pt: "Arquiteturas de front-end consistentes, reutilizáveis e preparadas para evoluir.",
      en: "Consistent, reusable front-end architectures designed to evolve.",
    },
    items: [
      { pt: "Angular", en: "Angular" },
      { pt: "TypeScript", en: "TypeScript" },
      { pt: "Micro Frontends", en: "Micro Frontends" },
    ],
  },
  {
    index: "03",
    title: { pt: "Engenharia", en: "Engineering" },
    description: {
      pt: "Regras, integrações e decisões técnicas orientadas à manutenção do produto.",
      en: "Rules, integrations, and technical decisions shaped around product maintainability.",
    },
    items: [
      { pt: "Java", en: "Java" },
      { pt: "Spring Boot", en: "Spring Boot" },
      { pt: "APIs REST", en: "REST APIs" },
    ],
  },
  {
    index: "04",
    title: { pt: "Dados", en: "Data" },
    description: {
      pt: "Persistência e modelagem relacional conectadas às necessidades do sistema.",
      en: "Relational persistence and modeling connected to system needs.",
    },
    items: [
      { pt: "Oracle", en: "Oracle" },
      { pt: "SQL", en: "SQL" },
      { pt: "Modelagem relacional", en: "Relational modeling" },
    ],
  },
  {
    index: "05",
    title: { pt: "Entrega", en: "Delivery" },
    description: {
      pt: "Do versionamento à operação dos produtos publicados no ambiente BQTECH.",
      en: "From version control to operating products published in the BQTECH environment.",
    },
    items: [
      { pt: "GitHub", en: "GitHub" },
      { pt: "CI/CD", en: "CI/CD" },
      { pt: "Docker", en: "Docker" },
    ],
  },
];

export const v2Copy = {
  pt: {
    htmlLang: "pt-BR",
    nav: {
      work: "Projetos",
      experience: "Experiência",
      capabilities: "Competências",
      lab: "BQTECH Lab",
      about: "Sobre",
      contact: "Contato",
      language: "EN",
      languageLabel: "Ver portfólio em inglês",
      lightThemeLabel: "Ativar tema claro",
      darkThemeLabel: "Ativar tema escuro",
      menu: "Menu",
      menuLabel: "Abrir navegação",
      closeMenuLabel: "Fechar navegação",
    },
    hero: {
      role: "Software Engineer",
      experience: "5+ anos",
      location: "Uberlândia, Brasil",
      title: "Design, código e produto — da ideia à produção.",
      body: "Crio produtos digitais completos, combinando engenharia de software, UX e execução ponta a ponta para transformar problemas reais em experiências claras, rápidas e bem construídas.",
      primary: "Ver projetos",
      secondary: "Iniciar um projeto",
      scroll: "Scroll",
      scrollLabel: "Ir para projetos",
    },
    work: {
      eyebrow: "Projetos selecionados",
      title: "Produtos reais, construídos e operados de ponta a ponta.",
      body: "Cada case conecta uma necessidade concreta às decisões de produto, experiência, engenharia e publicação.",
      problem: "Problema",
      contribution: "Contribuição",
      stack: "Stack",
      open: "Abrir case",
    },
    experience: {
      eyebrow: "Experiência selecionada",
      title: "Engenharia aplicada a produtos e operações reais.",
      body: "Uma trajetória profissional construída entre sistemas corporativos, produtos digitais e engenharia de interface.",
      focus: "Foco",
      journey: "Fluxo de trabalho",
      context: "Contexto",
      responsibility: "Responsabilidade",
      contribution: "Contribuição",
      outcome: "Resultado",
    },
    capabilities: {
      eyebrow: "Competências",
      title: "Capacidades organizadas pela entrega.",
      body: "Tecnologia tem valor quando sustenta uma decisão de produto, uma experiência ou uma operação melhor.",
    },
    lab: {
      eyebrow: "BQTECH Lab",
      title: "Capacidade de entrega, da decisão à operação.",
      body: "A BQTECH é o ambiente em que transformo decisões de produto e engenharia em sistemas publicados, observáveis e preparados para evoluir.",
      outcomes: [
        {
          title: "Construir com consistência",
          body: "Conectar interface, arquitetura e código em uma entrega coerente.",
        },
        {
          title: "Publicar com segurança",
          body: "Automatizar validações e empacotar cada produto de forma reproduzível.",
        },
        {
          title: "Operar e evoluir",
          body: "Acompanhar a aplicação em produção e manter um caminho claro de atualização.",
        },
      ],
      evidence: "Evidência técnica",
      flow: ["Código", "CI", "Registry", "Containers", "Infraestrutura BQTECH", "Produtos"],
      details: ["GitHub Actions + GHCR", "Docker + proxy reverso", "Deploy automatizado + health checks", "Rollback e operação de homelab"],
    },
    about: {
      eyebrow: "Sobre",
      title: "Como eu trabalho.",
      body: "Transformo problemas em produtos por meio de um processo que aproxima entendimento, experiência e engenharia — sem separar a decisão do que será construído.",
      note: "A BQTECH mantém esse processo em movimento: cada produto publicado vira evidência, aprendizado e base para a próxima decisão.",
      principles: [
        {
          title: "Entender antes de construir",
          body: "Começar pelo problema, pelo contexto e pela pessoa que usará o produto.",
        },
        {
          title: "Conectar produto e engenharia",
          body: "Tratar experiência, arquitetura e implementação como uma única entrega.",
        },
        {
          title: "Entregar, observar e evoluir",
          body: "Publicar com responsabilidade e usar a operação para orientar o próximo passo.",
        },
      ],
    },
    contact: {
      eyebrow: "Contato",
      title: "Vamos construir algo que funcione de verdade?",
      body: "Estou disponível para conversar sobre produtos digitais, interfaces, sistemas e desafios que pedem execução ponta a ponta.",
      email: "Enviar e-mail",
      linkedin: "LinkedIn",
      github: "GitHub",
      resume: "Baixar currículo",
    },
    footer: {
      note: "Design, engenharia e produto — da ideia à operação.",
      top: "Voltar ao topo",
    },
  },
  en: {
    htmlLang: "en",
    nav: {
      work: "Work",
      experience: "Experience",
      capabilities: "Capabilities",
      lab: "BQTECH Lab",
      about: "About",
      contact: "Contact",
      language: "PT",
      languageLabel: "View portfolio in Portuguese",
      lightThemeLabel: "Switch to light theme",
      darkThemeLabel: "Switch to dark theme",
      menu: "Menu",
      menuLabel: "Open navigation",
      closeMenuLabel: "Close navigation",
    },
    hero: {
      role: "Software Engineer",
      experience: "5+ years",
      location: "Uberlândia, Brazil",
      title: "Design, code, and product — from idea to production.",
      body: "I build complete digital products by combining software engineering, UX, and end-to-end execution to turn real problems into clear, fast, well-crafted experiences.",
      primary: "View projects",
      secondary: "Start a project",
      scroll: "Scroll",
      scrollLabel: "Scroll to projects",
    },
    work: {
      eyebrow: "Selected work",
      title: "Real products, built and operated end to end.",
      body: "Each case connects a concrete need to product, experience, engineering, and delivery decisions.",
      problem: "Problem",
      contribution: "Contribution",
      stack: "Stack",
      open: "Open case",
    },
    experience: {
      eyebrow: "Selected experience",
      title: "Engineering applied to real products and operations.",
      body: "Experience across enterprise systems, digital products, and interface engineering.",
      focus: "Focus",
      journey: "Workflow",
      context: "Context",
      responsibility: "Responsibility",
      contribution: "Contribution",
      outcome: "Outcome",
    },
    capabilities: {
      eyebrow: "Capabilities",
      title: "Capabilities organized around outcomes.",
      body: "Technology creates value when it supports a better product decision, experience, or operation.",
    },
    lab: {
      eyebrow: "BQTECH Lab",
      title: "Products that move from repository to production.",
      body: "BQTECH is where I turn product and engineering decisions into systems that are live, observable, and ready to evolve.",
      outcomes: [
        {
          title: "Build consistently",
          body: "Connect interface, architecture, and code in one coherent delivery.",
        },
        {
          title: "Ship safely",
          body: "Automate validation and package every product in a reproducible way.",
        },
        {
          title: "Operate and evolve",
          body: "Follow the application in production and keep a clear path for updates.",
        },
      ],
      evidence: "Technical evidence",
      flow: ["Code", "CI", "Registry", "Containers", "BQTECH infrastructure", "Products"],
      details: ["GitHub Actions + GHCR", "Docker + reverse proxy", "Automated delivery + health checks", "Rollback and homelab operations"],
    },
    about: {
      eyebrow: "About",
      title: "How I work.",
      body: "I turn problems into products through a process that brings understanding, experience, and engineering together — without separating decisions from what gets built.",
      note: "BQTECH keeps that process in motion: every live product becomes evidence, learning, and a foundation for the next decision.",
      principles: [
        {
          title: "Understand before building",
          body: "Start with the problem, the context, and the person who will use the product.",
        },
        {
          title: "Connect product and engineering",
          body: "Treat experience, architecture, and implementation as one delivery.",
        },
        {
          title: "Ship, observe, and evolve",
          body: "Release responsibly and use real operation to guide the next step.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build something that truly works.",
      body: "I'm available to talk about digital products, interfaces, systems, and challenges that need end-to-end execution.",
      email: "Send an email",
      linkedin: "LinkedIn",
      github: "GitHub",
      resume: "Download CV",
    },
    footer: {
      note: "Design, engineering, and product — from idea to operation.",
      top: "Back to top",
    },
  },
} as const;

export const copy = {
  pt: {
    htmlLang: "pt-BR",
    nav: {
      work: "Projetos",
      evolution: "Evolução",
      about: "Sobre",
      language: "EN",
      languageLabel: "View portfolio in English",
    },
    hero: {
      eyebrow: "Web Designer & Desenvolvedor Full-Stack",
      title: "Eu desenho experiências e construo produtos digitais.",
      body: "Uno pensamento de produto, design de interfaces e desenvolvimento para transformar problemas em experiências claras, rápidas e confiáveis.",
      primary: "Ver projetos",
      secondary: "Vamos conversar",
    },
    capabilities: ["Design", "Front-end", "Back-end", "Evolução"],
    trustLabel: "Prática conectada",
    trust: ["Web design", "Produto", "Front-end", "Back-end"],
    why: {
      eyebrow: "Por que trabalhar comigo",
      title: "Uma visão contínua, da pergunta ao produto.",
      body: "Design e desenvolvimento funcionam melhor quando decisões visuais, técnicas e de negócio compartilham o mesmo contexto.",
    },
    pillars: [
      {
        index: "01",
        title: "Pensar",
        body: "Entender a pessoa, o problema e a evidência antes de escolher a solução.",
      },
      {
        index: "02",
        title: "Projetar",
        body: "Transformar intenção em hierarquia, fluxo e um sistema visual coerente.",
      },
      {
        index: "03",
        title: "Construir",
        body: "Levar o conceito ao código com responsividade, acessibilidade e refinamento.",
      },
    ],
    work: {
      eyebrow: "Projetos selecionados",
      title: "Projetos reais, do hardware ao produto web.",
      note: "Cases públicos · Sistemas em produção e evolução",
      open: "Abrir case",
    },
    evolution: {
      eyebrow: "Evolução",
      title: "Aprender, aplicar, observar e melhorar.",
      body: "A trajetória conecta projetos reais a decisões de produto, arquitetura e implementação, sem porcentagens ou números inventados.",
      panelLabel: "Estado atual",
      panelValue: "Em evolução",
      panelRows: [
        ["Método", "Prática contínua"],
        ["Evidências", "Projetos publicados"],
        ["Próxima etapa", "Aprofundar os cases"],
      ],
    },
    about: {
      eyebrow: "Sobre mim",
      title: "Breno Queiroz",
      body: "Sou web designer e desenvolvedor full-stack. Gosto de trabalhar na interseção entre clareza visual, pensamento de produto e execução técnica — o ponto em que uma boa ideia precisa se tornar uma experiência que realmente funciona.",
      note: "Este portfólio também é um registro de evolução: uma base viva para documentar projetos, aprendizados e escolhas com cada vez mais profundidade.",
      principles: ["Clareza antes do ruído", "Sistemas antes de exceções", "Evidência antes de afirmações"],
    },
    contact: {
      eyebrow: "Próximo passo",
      title: "Tem um produto ou desafio em mente?",
      body: "Vamos conversar sobre produtos digitais, interfaces e sistemas construídos ponta a ponta.",
      status: "Contato disponível",
    },
    footer: "Design, desenvolvimento e evolução contínua.",
    case: {
      back: "Voltar aos projetos",
      overview: "Visão geral",
      role: "Papel",
      status: "Status",
      current: "Atual",
      currentState: "Estado atual",
      problem: "Problema",
      context: "Contexto",
      constraints: "Restrições",
      architecture: "Arquitetura atual",
      decisions: "Decisões",
      implementation: "Implementação",
      challenge: "Desafio",
      process: "Processo",
      stack: "Tecnologias",
      outcome: "Resultado",
      evidence: "Evidências",
      limitations: "Limitações",
      nextSteps: "Próximos passos",
      evolution: "Evolução",
      vision: "Visão BQTECH",
      learning: "Aprendizado",
      next: "Próximo case",
      openSystem: "Acessar sistema",
      protectedAccess: "Acesso protegido",
    },
  },
  en: {
    htmlLang: "en",
    nav: {
      work: "Work",
      evolution: "Growth",
      about: "About",
      language: "PT",
      languageLabel: "Ver portfólio em português",
    },
    hero: {
      eyebrow: "Web Designer & Full-Stack Developer",
      title: "I design experiences and build digital products end to end.",
      body: "I combine product thinking, interface design, and development to turn problems into clear, fast, and reliable experiences.",
      primary: "View work",
      secondary: "Let's talk",
    },
    capabilities: ["Design", "Front-end", "Back-end", "Growth"],
    trustLabel: "Connected practice",
    trust: ["Web design", "Product", "Front-end", "Back-end"],
    why: {
      eyebrow: "Why work with me",
      title: "One continuous view, from question to product.",
      body: "Design and development work better when visual, technical, and business decisions share the same context.",
    },
    pillars: [
      {
        index: "01",
        title: "Think",
        body: "Understand the person, the problem, and the evidence before choosing a solution.",
      },
      {
        index: "02",
        title: "Design",
        body: "Turn intent into hierarchy, flow, and a coherent visual system.",
      },
      {
        index: "03",
        title: "Build",
        body: "Bring the concept to code with responsiveness, accessibility, and refinement.",
      },
    ],
    work: {
      eyebrow: "Selected work",
      title: "Real projects, from hardware to web products.",
      note: "Public cases · Systems live and evolving",
      open: "Open case",
    },
    evolution: {
      eyebrow: "Growth",
      title: "Learn, apply, observe, and improve.",
      body: "The journey connects real projects to product, architecture, and implementation decisions without invented percentages or numbers.",
      panelLabel: "Current state",
      panelValue: "In progress",
      panelRows: [
        ["Method", "Continuous practice"],
        ["Evidence", "Published projects"],
        ["Next step", "Deepen the cases"],
      ],
    },
    about: {
      eyebrow: "About me",
      title: "Breno Queiroz",
      body: "I am a web designer and full-stack developer. I like working at the intersection of visual clarity, product thinking, and technical execution — the point where a good idea needs to become an experience that truly works.",
      note: "This portfolio is also a record of growth: a living foundation for documenting projects, learnings, and decisions with increasing depth.",
      principles: ["Clarity before noise", "Systems before exceptions", "Evidence before claims"],
    },
    contact: {
      eyebrow: "Next step",
      title: "Have a product or challenge in mind?",
      body: "Let's talk about digital products, interfaces, and systems built end to end.",
      status: "Available for contact",
    },
    footer: "Design, development, and continuous growth.",
    case: {
      back: "Back to work",
      overview: "Overview",
      role: "Role",
      status: "Status",
      current: "Current",
      currentState: "Current state",
      problem: "Problem",
      context: "Context",
      constraints: "Constraints",
      architecture: "Current architecture",
      decisions: "Decisions",
      implementation: "Implementation",
      challenge: "Challenge",
      process: "Process",
      stack: "Technologies",
      outcome: "Outcome",
      evidence: "Evidence",
      limitations: "Limitations",
      nextSteps: "Next steps",
      evolution: "Evolution",
      vision: "BQTECH vision",
      learning: "Learning",
      next: "Next case",
      openSystem: "Open system",
      protectedAccess: "Protected access",
    },
  },
} as const;

export function projectHref(locale: Locale, slug: string) {
  return locale === "pt" ? `/projetos/${slug}` : `/en/projects/${slug}`;
}

export function homeHref(locale: Locale) {
  return locale === "pt" ? "/" : "/en";
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % projects.length;

  return projects[nextIndex];
}
