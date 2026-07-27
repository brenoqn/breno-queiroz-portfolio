import type { Metadata } from "next";
import { PortfolioPage } from "./PortfolioPage";

export const metadata: Metadata = {
  title: "Breno Queiroz — Web Designer & Desenvolvedor Full-Stack",
  description:
    "Portfólio de Breno Queiroz: web design, desenvolvimento full-stack e evolução contínua.",
};

export default function Home() {
  return <PortfolioPage locale="pt" />;
}

