import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "@fontsource/barlow-condensed/300.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-semi-condensed/300.css";
import "@fontsource/barlow-semi-condensed/400.css";
import "@fontsource/barlow-semi-condensed/600.css";
import "@fontsource/barlow-semi-condensed/700.css";
import "./globals.css";
import { motionConfig } from "./motionConfig";

export const metadata: Metadata = {
  title: {
    default: "EIDOS Design Studio",
    template: "%s | EIDOS Design Studio",
  },
  description: "EIDOS Design Studio — architecture, interior design and BIM services across the Middle East.",
  other: {
    "codex-preview": "development",
  },
  openGraph: {
    title: "EIDOS Design Studio",
    description: "Shaping ideas into refined design experiences.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          "--nav-char-duration": `${motionConfig.nav.characterDurationMs}ms`,
          "--nav-travel": `${motionConfig.nav.travelPx}px`,
          "--mobile-panel-duration": `${motionConfig.mobileNav.panelDurationMs}ms`,
          "--mobile-char-duration": `${motionConfig.mobileNav.characterDurationMs}ms`,
          "--loader-exit-duration": `${motionConfig.loader.exitDurationMs}ms`,
          "--page-cover-duration": `${motionConfig.pageCover.enterDurationMs}ms`,
          "--project-shape-duration": `${motionConfig.projectEntry.shapeDurationMs}ms`,
          "--project-title-duration": `${motionConfig.projectEntry.titleDurationMs}ms`,
          "--project-title-travel": `${motionConfig.projectEntry.titleTravelPx}px`,
        } as CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
