import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050806",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : "http://localhost:3000";

  return {
    title: {
      default: "Breno Queiroz — Portfolio",
      template: "%s",
    },
    description:
      "Web design, desenvolvimento full-stack e evolução contínua.",
    applicationName: "Breno Queiroz — Portfolio",
    authors: [{ name: "Breno Queiroz" }],
    creator: "Breno Queiroz",
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "Breno Queiroz — Portfolio",
      title: "Breno Queiroz — Web Designer & Desenvolvedor Full-Stack",
      description:
        "Design, desenvolvimento e evolução contínua para produtos digitais.",
      images: [
        {
          url: `${origin}/og.png`,
          width: 1200,
          height: 630,
          alt: "Breno Queiroz — Web Designer & Desenvolvedor Full-Stack",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Breno Queiroz — Portfolio",
      description:
        "Design, desenvolvimento e evolução contínua para produtos digitais.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" id="top">
      <body className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

