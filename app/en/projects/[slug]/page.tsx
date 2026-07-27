import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyPage } from "../../../CaseStudyPage";
import { getProject, projects } from "../../../content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return {
    title: `${project.title.en} — Breno Queiroz`,
    description: project.summary.en,
  };
}

export default async function EnglishProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return <CaseStudyPage locale="en" project={project} />;
}

