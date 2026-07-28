"use client";

import { useEffect } from "react";

export function AngularBootstrap() {
  useEffect(() => {
    if (document.querySelector("script[data-angular-entry]")) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = "/angular/main.js";
    script.dataset.angularEntry = "true";
    document.head.appendChild(script);
  }, []);

  return null;
}
