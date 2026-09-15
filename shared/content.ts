// Shared by the Angular interface and the hosting layer.
export type Locale = "pt" | "en";

export type LocalizedText = Record<Locale, string>;

export interface ProcessStep {
  index: string;
  title: LocalizedText;
  description: LocalizedText;
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
  },
  {
    slug: "experiencia-web-responsiva",
    index: "02",
    category: {
      pt: "Web design",
      en: "Web design",
    },
    title: {
      pt: "Experiência web responsiva",
      en: "Responsive web experience",
    },
    summary: {
      pt: "Um case reservado para mostrar hierarquia, direção de arte, comportamento e adaptação entre telas.",
      en: "A case reserved for hierarchy, art direction, behavior, and adaptation across screens.",
    },
    status: {
      pt: "Em preparação",
      en: "In preparation",
    },
    technologies: [],
    appAccess: "coming-soon",
    context: {
      pt: "Modelo editorial privado para receber um projeto real de experiência web quando imagens e detalhes estiverem disponíveis.",
      en: "Private editorial template ready for a real web experience once imagery and details are available.",
    },
    role: {
      pt: "Direção visual, UX e implementação de interface",
      en: "Visual direction, UX, and interface implementation",
    },
    challenge: {
      pt: "Preservar intenção, legibilidade e ritmo do desktop ao mobile, tratando responsividade como parte do design.",
      en: "Preserve intent, legibility, and rhythm from desktop to mobile by treating responsiveness as part of the design.",
    },
    outcome: {
      pt: "O case final mostrará comparações entre breakpoints, decisões de conteúdo e o comportamento dos componentes.",
      en: "The final case will show breakpoint comparisons, content decisions, and component behavior.",
    },
    learning: {
      pt: "Responsividade não é redução: é uma nova composição com as mesmas prioridades.",
      en: "Responsiveness is not reduction: it is a new composition with the same priorities.",
    },
    process: [
      {
        index: "01",
        title: { pt: "Hierarquia", en: "Hierarchy" },
        description: {
          pt: "Definir o que precisa ser percebido primeiro.",
          en: "Define what needs to be perceived first.",
        },
      },
      {
        index: "02",
        title: { pt: "Sistema", en: "System" },
        description: {
          pt: "Transformar decisões em tokens e componentes reutilizáveis.",
          en: "Turn decisions into reusable tokens and components.",
        },
      },
      {
        index: "03",
        title: { pt: "Adaptação", en: "Adaptation" },
        description: {
          pt: "Recompor cada breakpoint sem perder clareza.",
          en: "Recompose each breakpoint without losing clarity.",
        },
      },
    ],
  },
  {
    slug: "laboratorio-de-evolucao",
    index: "03",
    category: {
      pt: "Full-stack + laboratório",
      en: "Full-stack + lab",
    },
    title: {
      pt: "Laboratório de evolução",
      en: "Growth laboratory",
    },
    summary: {
      pt: "Um registro vivo de experimentos, aprendizados e decisões que ampliam a prática de desenvolvimento.",
      en: "A living record of experiments, learnings, and decisions that expand the development practice.",
    },
    status: {
      pt: "Em preparação",
      en: "In preparation",
    },
    technologies: [],
    appAccess: "coming-soon",
    context: {
      pt: "Este espaço será atualizado com projetos autorais, testes técnicos e marcos verificáveis da trajetória.",
      en: "This space will be updated with self-initiated projects, technical experiments, and verifiable milestones.",
    },
    role: {
      pt: "Pesquisa, prototipagem e desenvolvimento",
      en: "Research, prototyping, and development",
    },
    challenge: {
      pt: "Apresentar evolução sem transformar o portfólio em uma lista de ferramentas ou alegações sem contexto.",
      en: "Present growth without turning the portfolio into a list of tools or context-free claims.",
    },
    outcome: {
      pt: "Cada entrada futura conectará o que foi explorado, o que mudou na prática e a evidência disponível.",
      en: "Each future entry will connect what was explored, what changed in practice, and the available evidence.",
    },
    learning: {
      pt: "Evolução ganha credibilidade quando aparece como processo documentado, não como porcentagem arbitrária.",
      en: "Growth gains credibility when shown as a documented process rather than an arbitrary percentage.",
    },
    process: [
      {
        index: "01",
        title: { pt: "Explorar", en: "Explore" },
        description: {
          pt: "Escolher uma pergunta técnica ou de produto concreta.",
          en: "Choose a concrete technical or product question.",
        },
      },
      {
        index: "02",
        title: { pt: "Experimentar", en: "Experiment" },
        description: {
          pt: "Construir o menor artefato capaz de produzir evidência.",
          en: "Build the smallest artifact capable of producing evidence.",
        },
      },
      {
        index: "03",
        title: { pt: "Documentar", en: "Document" },
        description: {
          pt: "Registrar decisões, limites e próximos passos.",
          en: "Record decisions, limits, and next steps.",
        },
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
      title: "Eu desenho experiências e construo produtos digitais de ponta a ponta.",
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
      title: "Cases preparados para mostrar raciocínio, processo e resultado.",
      note: "Preview privado · Conteúdo editorial em preparação",
      open: "Abrir case",
    },
    evolution: {
      eyebrow: "Evolução",
      title: "Aprender, aplicar, observar e melhorar.",
      body: "A trajetória será apresentada com marcos e evidências reais. Nesta primeira versão, o sistema mostra como cada etapa será organizada, sem porcentagens ou números inventados.",
      panelLabel: "Estado atual",
      panelValue: "Em evolução",
      panelRows: [
        ["Método", "Prática contínua"],
        ["Evidências", "Em curadoria"],
        ["Próxima etapa", "Cases reais"],
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
      body: "O canal público de contato será ativado antes da publicação. Por enquanto, este preview permanece privado para revisão e evolução conjunta.",
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
      flow: {
        controller: "Controlador",
        sensors: "Sensores",
        automation: "Automação",
        output: "Ventilação / Janelas",
      },
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
      title: "Cases designed to show thinking, process, and outcome.",
      note: "Private preview · Editorial content in progress",
      open: "Open case",
    },
    evolution: {
      eyebrow: "Growth",
      title: "Learn, apply, observe, and improve.",
      body: "The journey will be presented with real milestones and evidence. In this first version, the system shows how every step will be organized, without invented percentages or numbers.",
      panelLabel: "Current state",
      panelValue: "In progress",
      panelRows: [
        ["Method", "Continuous practice"],
        ["Evidence", "Being curated"],
        ["Next step", "Real case studies"],
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
      body: "The public contact channel will be enabled before release. For now, this preview remains private for review and shared iteration.",
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
      flow: {
        controller: "Controller",
        sensors: "Sensors",
        automation: "Automation",
        output: "Ventilation / Windows",
      },
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
