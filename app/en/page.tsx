import type { Metadata } from "next";
import { AngularShell } from "../AngularShell";

export const metadata: Metadata = {
  title: "Breno Queiroz — Web Designer & Full-Stack Developer",
  description:
    "Breno Queiroz's portfolio: web design, full-stack development, and continuous growth.",
};

export default function EnglishHome() {
  return <AngularShell />;
}
