import { createElement } from "react";
import { AngularBootstrap } from "./AngularBootstrap";

export function AngularShell() {
  return (
    <>
      {createElement("app-root", {
        "data-runtime": "angular",
        suppressHydrationWarning: true,
      })}
      <noscript>
        Este portfólio precisa de JavaScript para carregar a interface Angular.
      </noscript>
      <AngularBootstrap />
    </>
  );
}
