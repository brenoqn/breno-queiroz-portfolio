import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AngularShell } from "../../AngularShell";
import { getProject, projects } from "../../content";

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
    title: `${project.title.pt} — Breno Queiroz`,
    description: project.summary.pt,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return <AngularShell />;
}
