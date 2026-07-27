import Link from "next/link";
import {
  copy,
  homeHref,
  projectHref,
  projects,
  type Locale,
  type Project,
} from "./content";

export function CaseStudyPage({
  locale,
  project,
}: {
  locale: Locale;
  project: Project;
}) {
  const t = copy[locale];
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="case-shell" lang={t.htmlLang}>
      <header className="case-header">
        <Link className="wordmark" href={homeHref(locale)}>
          <span className="wordmark-dot" aria-hidden="true" />
          Breno Queiroz
        </Link>
        <Link className="back-link" href={`${homeHref(locale)}#projetos`}>
          <span aria-hidden="true">←</span>
          {t.case.back}
        </Link>
      </header>

      <main>
        <section className="case-hero">
          <div className="case-hero-copy">
            <p className="eyebrow">
              {project.index} / {project.category[locale]}
            </p>
            <h1>{project.title[locale]}</h1>
            <p>{project.summary[locale]}</p>
            <div className="model-badge">
              <span aria-hidden="true" />
              {t.case.model}
            </div>
          </div>
          <div className="case-cover" aria-hidden="true">
            <div className="case-cover-window">
              <div className="case-cover-top">
                <span />
                <span>{project.index}</span>
              </div>
              <div className="case-cover-title">
                <span>DESIGN</span>
                <span>BUILD</span>
                <span>EVOLVE</span>
              </div>
              <div className="case-cover-grid">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        </section>

        <section className="case-facts" aria-label={t.case.overview}>
          <div>
            <span>{t.case.overview}</span>
            <p>{project.context[locale]}</p>
          </div>
          <div>
            <span>{t.case.role}</span>
            <p>{project.role[locale]}</p>
          </div>
          <div>
            <span>Status</span>
            <p>{t.case.model}</p>
          </div>
        </section>

        <section className="case-section case-section-split">
          <p className="eyebrow">01 / {t.case.challenge}</p>
          <div>
            <h2>{t.case.challenge}</h2>
            <p className="case-lead">{project.challenge[locale]}</p>
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-head">
            <p className="eyebrow">02 / {t.case.process}</p>
            <h2>{t.case.process}</h2>
          </div>
          <div className="case-process-grid">
            {project.process.map((step) => (
              <article key={step.index}>
                <span>{step.index}</span>
                <h3>{step.title[locale]}</h3>
                <p>{step.description[locale]}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section outcome-section">
          <div>
            <p className="eyebrow">03 / {t.case.outcome}</p>
            <h2>{t.case.outcome}</h2>
            <p className="case-lead">{project.outcome[locale]}</p>
          </div>
          <aside>
            <span>{t.case.evidence}</span>
            <strong>—</strong>
            <p>{t.case.evidenceBody}</p>
          </aside>
        </section>

        <section className="case-section learning-section">
          <p className="eyebrow">04 / {t.case.learning}</p>
          <blockquote>{project.learning[locale]}</blockquote>
        </section>

        <Link
          className="next-case"
          href={projectHref(locale, nextProject.slug)}
          aria-label={`${t.case.next}: ${nextProject.title[locale]}`}
        >
          <span>{t.case.next}</span>
          <strong>{nextProject.title[locale]}</strong>
          <i aria-hidden="true">↗</i>
        </Link>
      </main>
    </div>
  );
}
