import { Routes } from "@angular/router";
import { CaseStudyPage } from "./pages/case-study.page";
import { HomePage } from "./pages/home.page";
import { localePreferenceGuard } from "./services/locale.service";

export const routes: Routes = [
  {
    path: "",
    component: HomePage,
    canActivate: [localePreferenceGuard],
    data: { locale: "pt" },
    title: "Breno Queiroz — Software Engineer",
    pathMatch: "full",
  },
  {
    path: "en",
    component: HomePage,
    canActivate: [localePreferenceGuard],
    data: { locale: "en" },
    title: "Breno Queiroz — Software Engineer",
    pathMatch: "full",
  },
  {
    path: "projetos/:slug",
    component: CaseStudyPage,
    canActivate: [localePreferenceGuard],
    data: { locale: "pt" },
  },
  {
    path: "en/projects/:slug",
    component: CaseStudyPage,
    canActivate: [localePreferenceGuard],
    data: { locale: "en" },
  },
  {
    path: "**",
    redirectTo: "",
  },
];
