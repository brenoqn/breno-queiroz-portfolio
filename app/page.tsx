import type { Metadata } from "next";
import { AngularShell } from "./AngularShell";

export const metadata: Metadata = {
  title: "Breno Queiroz — Web Designer & Desenvolvedor Full-Stack",
  description:
    "Portfólio de Breno Queiroz: web design, desenvolvimento full-stack e evolução contínua.",
};

export default function Home() {
  return <AngularShell />;
}
