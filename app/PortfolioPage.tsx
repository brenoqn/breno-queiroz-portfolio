import Link from "next/link";
import {
  copy,
  homeHref,
  projectHref,
  projects,
  timeline,
  type Locale,
} from "./content";

function Wordmark({ locale }: { locale: Locale }) {
  return (
    <Link className="wordmark" href={homeHref(locale)} aria-label="Breno Queiroz">
      <span className="wordmark-dot" aria-hidden="true" />
      Breno Queiroz
    </Link>
  );
}

function ProjectVisual({ index }: { index: string }) {
  return (
    <div className={`project-visual project-visual-${index}`} aria-hidden="true">
      <div className="visual-window">
        <div className="visual-window-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="visual-grid">
          <div className="visual-line visual-line-accent" />
          <div className="visual-line" />
          <div className="visual-line visual-line-short" />
          <div className="visual-block" />
        </div>
      </div>
      <span className="visual-index">{index}</span>
    </div>
  );
}

export function PortfolioPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const languageHref = locale === "pt" ? "/en" : "/";

  return (
    <div className="site-shell" lang={t.htmlLang}>
      <header className="site-header">
        <Wordmark locale={locale} />
        <nav className="primary-nav" aria-label={locale === "pt" ? "Navegação principal" : "Primary navigation"}>
          <a href="#projetos">{t.nav.work}</a>
          <a href="#evolucao">{t.nav.evolution}</a>
          <a href="#sobre">{t.nav.about}</a>
        </nav>
        <Link
          className="language-switch"
          href={languageHref}
          aria-label={t.nav.languageLabel}
        >
          {t.nav.language}
          <span aria-hidden="true">↗</span>
        </Link>
      </header>

      <main>
        <section className="hero section-frame" aria-labelledby="hero-title">
          <div className="hero-copy reveal">
            <p className="eyebrow">01 / {t.hero.eyebrow}</p>
            <h1 id="hero-title">{t.hero.title}</h1>
            <p className="hero-body">{t.hero.body}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projetos">
                {t.hero.primary}
                <span aria-hidden="true">↓</span>
              </a>
              <a className="button button-secondary" href="#contato">
                {t.hero.secondary}
              </a>
            </div>
          </div>

          <div className="capability-map reveal reveal-delay" aria-label={t.trustLabel}>
            <div className="capability-orbit" aria-hidden="true">
              <span className="orbit orbit-outer" />
              <span className="orbit orbit-inner" />
              <span className="orbit-core">BQ</span>
            </div>
            <div className="capability-list">
              {t.capabilities.map((capability, index) => (
                <div className="capability-row" key={capability}>
                  <span>0{index + 1}</span>
                  <strong>{capability}</strong>
                  <i aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label={t.trustLabel}>
          <p>{t.trustLabel}</p>
          <ul>
            {t.trust.map((item) => (
              <li key={item}>
                <span aria-hidden="true">+</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="section-frame section-block" aria-labelledby="why-title">
          <div className="section-heading">
            <p className="eyebrow">02 / {t.why.eyebrow}</p>
            <h2 id="why-title">{t.why.title}</h2>
            <p>{t.why.body}</p>
          </div>
          <div className="pillar-grid">
            {t.pillars.map((pillar) => (
              <article className="pillar-card" key={pillar.index}>
                <span className="card-index">{pillar.index}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
                <span className="pillar-mark" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section
          className="section-frame section-block work-section"
          id="projetos"
          aria-labelledby="work-title"
        >
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">03 / {t.work.eyebrow}</p>
              <h2 id="work-title">{t.work.title}</h2>
            </div>
            <p className="private-note">
              <span aria-hidden="true" />
              {t.work.note}
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <Link
                className={`project-card ${project.featured ? "project-card-featured" : ""}`}
                href={projectHref(locale, project.slug)}
                key={project.slug}
                aria-label={`${t.work.open}: ${project.title[locale]}`}
              >
                <article>
                  <ProjectVisual index={project.index} />
                  <div className="project-copy">
                    <div className="project-meta">
                      <span>{project.index}</span>
                      <span>{project.category[locale]}</span>
                    </div>
                    <h3>{project.title[locale]}</h3>
                    <p>{project.summary[locale]}</p>
                    <span className="project-link">
                      {t.work.open}
                      <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section
          className="section-frame section-block evolution-section"
          id="evolucao"
          aria-labelledby="evolution-title"
        >
          <div className="section-heading">
            <p className="eyebrow">04 / {t.evolution.eyebrow}</p>
            <h2 id="evolution-title">{t.evolution.title}</h2>
            <p>{t.evolution.body}</p>
          </div>

          <div className="evolution-layout">
            <ol className="timeline-list">
              {timeline.map((item) => (
                <li key={item.index}>
                  <span>{item.index}</span>
                  <div>
                    <h3>{item.title[locale]}</h3>
                    <p>{item.description[locale]}</p>
                  </div>
                </li>
              ))}
            </ol>

            <aside className="status-panel" aria-label={t.evolution.panelLabel}>
              <div className="status-head">
                <span>{t.evolution.panelLabel}</span>
                <i aria-hidden="true" />
              </div>
              <strong>{t.evolution.panelValue}</strong>
              <div className="status-ring" aria-hidden="true">
                <span />
              </div>
              <dl>
                {t.evolution.panelRows.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </section>

        <section
          className="section-frame section-block about-section"
          id="sobre"
          aria-labelledby="about-title"
        >
          <div className="about-marker" aria-hidden="true">
            <span>BQ</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">05 / {t.about.eyebrow}</p>
            <h2 id="about-title">{t.about.title}</h2>
            <p className="about-lead">{t.about.body}</p>
            <p>{t.about.note}</p>
            <ul>
              {t.about.principles.map((principle, index) => (
                <li key={principle}>
                  <span>0{index + 1}</span>
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="contact-section"
          id="contato"
          aria-labelledby="contact-title"
        >
          <p className="eyebrow">06 / {t.contact.eyebrow}</p>
          <h2 id="contact-title">{t.contact.title}</h2>
          <p>{t.contact.body}</p>
          <div className="contact-status">
            <span aria-hidden="true" />
            {t.contact.status}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Wordmark locale={locale} />
        <p>{t.footer}</p>
        <a href="#top" aria-label={locale === "pt" ? "Voltar ao topo" : "Back to top"}>
          ↑
        </a>
      </footer>
    </div>
  );
}
