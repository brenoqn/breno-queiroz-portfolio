import { Routes } from "@angular/router";
import { CaseStudyPage } from "./pages/case-study.page";
import { HomePage } from "./pages/home.page";

export const routes: Routes = [
  {
    path: "",
    component: HomePage,
    data: { locale: "pt" },
    title: "Breno Queiroz — Web Designer & Desenvolvedor Full-Stack",
    pathMatch: "full",
  },
  {
    path: "en",
    component: HomePage,
    data: { locale: "en" },
    title: "Breno Queiroz — Web Designer & Full-Stack Developer",
    pathMatch: "full",
  },
  {
    path: "projetos/:slug",
    component: CaseStudyPage,
    data: { locale: "pt" },
  },
  {
    path: "en/projects/:slug",
    component: CaseStudyPage,
    data: { locale: "en" },
  },
  {
    path: "**",
    redirectTo: "",
  },
];
