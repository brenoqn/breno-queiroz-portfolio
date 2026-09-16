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

export interface Project {
  slug: string;
  index: string;
  featured?: boolean;
  category: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  status: LocalizedText;
  technologies: string[];
  appUrl?: string;
  appAccess?: "public" | "protected" | "coming-soon";
  context: LocalizedText;
  role: LocalizedText;
  challenge: LocalizedText;
  outcome: LocalizedText;
  learning: LocalizedText;
  process: ProcessStep[];
  coverFlow: ProjectFlowStep[];
}

export interface TimelineItem {
  index: string;
  title: LocalizedText;
  description: LocalizedText;
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
      pt: "Sistema de monitoramento e automação ambiental integrando ESP32, sensores, MQTT e Home Assistant.",
      en: "Environmental monitoring and automation system integrating ESP32, sensors, MQTT, and Home Assistant.",
    },
    status: {
      pt: "Projeto em evolução",
      en: "Project in progress",
    },
    technologies: ["ESP32", "MQTT", "Home Assistant"],
    appUrl: "https://galinheiro.bqtech.com.br",
    appAccess: "protected",
    context: {
      pt: "O projeto nasceu da necessidade de acompanhar as condições ambientais de um galinheiro e permitir respostas automáticas conforme temperatura e umidade, reduzindo a dependência de intervenções manuais.",
      en: "The project was created to monitor environmental conditions inside a chicken coop and enable automatic responses based on temperature and humidity, reducing dependence on manual intervention.",
    },
    role: {
      pt: "Arquitetura, firmware, integração MQTT, automação e dashboard",
      en: "Architecture, firmware, MQTT integration, automation, and dashboard",
    },
    challenge: {
      pt: "Construir uma arquitetura simples e confiável capaz de coletar dados ambientais, transmitir as leituras e acionar dispositivos automaticamente conforme regras de temperatura.",
      en: "Build a simple and reliable architecture capable of collecting environmental data, transmitting readings, and automatically controlling devices according to temperature rules.",
    },
    outcome: {
      pt: "O protótipo integra ESP32, sensoriamento, MQTT e Home Assistant em um fluxo funcional de monitoramento e controle, servindo como base para a evolução do sistema físico.",
      en: "The prototype integrates ESP32, sensing, MQTT, and Home Assistant into a functional monitoring and control flow, providing a foundation for the physical system's evolution.",
    },
    learning: {
      pt: "Projetos de IoT exigem pensar hardware, comunicação, automação e observabilidade como partes de um único sistema.",
      en: "IoT projects require hardware, communication, automation, and observability to be designed as parts of a single system.",
    },
    process: [
      {
        index: "01",
        title: { pt: "Sensoriar", en: "Sense" },
        description: {
          pt: "Coletar temperatura e umidade por meio do ESP32 e dos sensores ambientais.",
          en: "Collect temperature and humidity through the ESP32 and environmental sensors.",
        },
      },
      {
        index: "02",
        title: { pt: "Comunicar", en: "Communicate" },
        description: {
          pt: "Publicar as leituras e estados dos dispositivos utilizando MQTT.",
          en: "Publish readings and device states using MQTT.",
        },
      },
      {
        index: "03",
        title: { pt: "Automatizar", en: "Automate" },
        description: {
          pt: "Aplicar regras de temperatura para controle automático da ventilação.",
          en: "Apply temperature rules for automatic ventilation control.",
        },
      },
      {
        index: "04",
        title: { pt: "Monitorar", en: "Monitor" },
        description: {
          pt: "Centralizar estados, leituras e controles em um dashboard do Home Assistant.",
          en: "Centralize states, readings, and controls in a Home Assistant dashboard.",
        },
      },
    ],
    coverFlow: [
      {
        index: "01",
        label: { pt: "Controlador", en: "Controller" },
        value: { pt: "ESP32", en: "ESP32" },
      },
      {
        index: "02",
        label: { pt: "Entrada", en: "Input" },
        value: { pt: "Sensores", en: "Sensors" },
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
        value: { pt: "Automação", en: "Automation" },
      },
      {
        index: "06",
        label: { pt: "Saída", en: "Output" },
        value: {
          pt: "Ventilação / Janelas",
          en: "Ventilation / Windows",
        },
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
      pt: "PWA local-first para organizar manutenção, uso e histórico da Honda NX200 com dados sob controle do próprio usuário.",
      en: "A local-first PWA for organizing Honda NX200 maintenance, usage, and history while keeping data under the user's control.",
    },
    status: {
      pt: "Em produção",
      en: "Live in production",
    },
    technologies: [
      "Angular",
      "TypeScript",
      "Angular Service Worker",
      "LocalStorage",
    ],
    appUrl: "https://garage.bqtech.com.br",
    appAccess: "public",
    context: {
      pt: "O Garage nasceu como uma ferramenta pessoal para reunir manutenção, histórico, abastecimentos e conteúdo técnico da Honda NX200 em um único lugar, sem depender de contas ou serviços remotos.",
      en: "Garage began as a personal tool to bring Honda NX200 maintenance, history, fuel records, and technical content into one place without relying on accounts or remote services.",
    },
    role: {
      pt: "Produto, experiência, arquitetura front-end, implementação e publicação",
      en: "Product, experience, front-end architecture, implementation, and delivery",
    },
    challenge: {
      pt: "Criar uma experiência confiável e instalável que funcionasse sem backend, preservasse os dados no navegador e ainda permitisse ao usuário transportar seu histórico entre origens.",
      en: "Create a reliable, installable experience that works without a backend, keeps data in the browser, and still lets the user move their history between origins.",
    },
    outcome: {
      pt: "A aplicação está publicada como PWA no ecossistema BQTECH, persiste o estado no schema 4 pela chave garage_state e oferece exportação e importação de backup JSON para dar portabilidade aos dados.",
      en: "The application is live as a PWA in the BQTECH ecosystem, persists schema 4 state under the garage_state key, and provides JSON backup export and import for data portability.",
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
          pt: "Estruturar histórico, manutenção e registros em um estado versionado com migrações verificáveis.",
          en: "Structure history, maintenance, and records in a versioned state with verifiable migrations.",
        },
      },
      {
        index: "02",
        title: { pt: "Persistir", en: "Persist" },
        description: {
          pt: "Manter os dados no LocalStorage da origem, sem login, backend ou banco remoto.",
          en: "Keep data in the origin's LocalStorage without login, backend, or a remote database.",
        },
      },
      {
        index: "03",
        title: { pt: "Transportar", en: "Make portable" },
        description: {
          pt: "Permitir exportação e importação JSON com validação para mover o histórico entre navegadores e origens.",
          en: "Provide validated JSON export and import to move history between browsers and origins.",
        },
      },
      {
        index: "04",
        title: { pt: "Publicar", en: "Deliver" },
        description: {
          pt: "Ativar instalação e uso offline com Angular Service Worker e publicar a PWA na BQTECH.",
          en: "Enable installation and offline use with Angular Service Worker and publish the PWA on BQTECH.",
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
        label: { pt: "Produção", en: "Production" },
        value: { pt: "BQTECH", en: "BQTECH" },
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
      pt: "Sistema web para consulta pública e gestão administrativa de registros cemiteriais, com frontend e API independentes.",
      en: "A web system for public search and administrative management of cemetery records, with independent frontend and API layers.",
    },
    status: {
      pt: "Em produção",
      en: "Live in production",
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
    appUrl: "https://memoriar.bqtech.com.br",
    appAccess: "public",
    context: {
      pt: "O Memoriar reúne uma busca pública e uma área administrativa para organizar registros e localizações cemiteriais, separando a experiência aberta das operações autenticadas.",
      en: "Memoriar combines public search with an administrative area for organizing cemetery records and locations, separating the open experience from authenticated operations.",
    },
    role: {
      pt: "Arquitetura full-stack, contratos compartilhados, front-end, API, containerização e publicação",
      en: "Full-stack architecture, shared contracts, frontend, API, containerization, and delivery",
    },
    challenge: {
      pt: "Conectar busca pública, administração e persistência externa sem publicar o backend diretamente, mantendo uma API same-origin e contratos consistentes entre as camadas.",
      en: "Connect public search, administration, and external persistence without exposing the backend directly, while keeping a same-origin API and consistent contracts across layers.",
    },
    outcome: {
      pt: "O sistema está publicado na BQTECH com Angular servido por Nginx, API Node.js e Express integrada ao Supabase, health endpoint e imagens Docker separadas para web e API.",
      en: "The system is live on BQTECH with Angular served by Nginx, a Node.js and Express API integrated with Supabase, a health endpoint, and separate Docker images for web and API.",
    },
    learning: {
      pt: "Separar interface, API e contratos compartilhados torna a evolução mais previsível quando cada limite também é validado no build, no container e no deploy.",
      en: "Separating interface, API, and shared contracts makes change more predictable when every boundary is also validated in the build, container, and deployment flow.",
    },
    process: [
      {
        index: "01",
        title: { pt: "Contratar", en: "Define contracts" },
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

export const timeline: TimelineItem[] = [
  {
    index: "01",
    title: { pt: "Fundamentos", en: "Foundations" },
    description: {
      pt: "Lógica, web e clareza para transformar problemas em estruturas compreensíveis.",
      en: "Logic, web fundamentals, and clarity to turn problems into understandable structures.",
    },
  },
  {
    index: "02",
    title: { pt: "Front-end", en: "Front-end" },
    description: {
      pt: "Interfaces responsivas, acessíveis e guiadas por sistemas visuais consistentes.",
      en: "Responsive, accessible interfaces guided by consistent visual systems.",
    },
  },
  {
    index: "03",
    title: { pt: "Full-stack", en: "Full-stack" },
    description: {
      pt: "Integração entre experiência, regras de negócio e fundamentos de back-end.",
      en: "Integration across experience, business rules, and back-end foundations.",
    },
  },
  {
    index: "04",
    title: { pt: "Produto", en: "Product" },
    description: {
      pt: "Decisões conectadas a pessoas, objetivos, evidências e evolução contínua.",
      en: "Decisions connected to people, goals, evidence, and continuous improvement.",
    },
  },
];

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
      body: "O canal público de contato está em preparação. Enquanto isso, os projetos e suas decisões continuam documentados por aqui.",
      status: "Contato em preparação",
    },
    footer: "Design, desenvolvimento e evolução contínua.",
    case: {
      back: "Voltar aos projetos",
      overview: "Visão geral",
      role: "Papel",
      status: "Status",
      challenge: "Desafio",
      process: "Processo",
      stack: "Tecnologias",
      outcome: "Resultado",
      evidence: "Métricas e evidências",
      evidenceBody: "Métricas serão adicionadas quando houver dados de operação verificáveis.",
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
      body: "The public contact channel is being prepared. In the meantime, the projects and their decisions remain documented here.",
      status: "Contact in progress",
    },
    footer: "Design, development, and continuous growth.",
    case: {
      back: "Back to work",
      overview: "Overview",
      role: "Role",
      status: "Status",
      challenge: "Challenge",
      process: "Process",
      stack: "Technologies",
      outcome: "Outcome",
      evidence: "Metrics and evidence",
      evidenceBody: "Metrics will be added when verifiable operating data is available.",
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
