import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Green Algeria - National Vegetation & Tree Mapping Platform",
  description:
    "Empowering policymakers, researchers, and citizens with real-time geospatial data to monitor and expand Algeria's green infrastructure.",
  keywords: [
    "Green Algeria",
    "Vegetation Mapping",
    "GIS",
    "Environmental Monitoring",
    "Algeria Trees",
    "Forestry",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="bg-background text-on-background min-h-screen font-body-md antialiased overflow-x-hidden transition-colors duration-200">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
