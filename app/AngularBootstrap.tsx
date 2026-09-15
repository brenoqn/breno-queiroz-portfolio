"use client";

import { useEffect } from "react";

export function AngularBootstrap() {
  useEffect(() => {
    if (document.querySelector("script[data-angular-entry]")) return;

    const controller = new AbortController();

    void (async () => {
      const response = await fetch("/angular/index.html", {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`Angular index could not be loaded: ${response.status}`);
      }

      const angularIndex = new DOMParser().parseFromString(
        await response.text(),
        "text/html",
      );
      const angularIndexUrl = new URL(
        "/angular/index.html",
        window.location.origin,
      );
      const entryScripts = Array.from(
        angularIndex.querySelectorAll<HTMLScriptElement>("script[src]"),
      )
        .map((entry) => new URL(entry.getAttribute("src") ?? "", angularIndexUrl))
        .filter((entry) =>
          entry.origin === angularIndexUrl.origin &&
          entry.pathname.startsWith("/angular/") &&
          /^main-[A-Za-z0-9]{8,}\.js$/.test(
            entry.pathname.split("/").at(-1) ?? "",
          ),
        );

      if (entryScripts.length !== 1) {
        throw new Error(
          "Angular index must reference exactly one hashed main bundle",
        );
      }

      if (
        controller.signal.aborted ||
        document.querySelector("script[data-angular-entry]")
      ) {
        return;
      }

      const script = document.createElement("script");
      script.type = "module";
      script.src = entryScripts[0].href;
      script.dataset.angularEntry = "true";
      document.head.appendChild(script);
    })().catch((error) => {
      if (!controller.signal.aborted) console.error(error);
    });

    return () => controller.abort();
  }, []);

  return null;
}
