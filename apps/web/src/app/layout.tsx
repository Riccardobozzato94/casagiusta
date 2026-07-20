import type { Metadata } from "next";
import "./globals.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "CasaGiusta — Dashboard Vault | Prove Notarizzate",
  description:
    "Accedi al tuo Forziere Prove digitale. Visualizza, esporta e stampa le tue prove crittografate con hash SHA-256 e timestamp. Condividi con il tuo avvocato.",
  keywords: [
    "CasaGiusta",
    "vault prove",
    "prove notarizzate",
    "hash SHA-256",
    "tutela inquilini",
    "documenti legali",
  ],
  openGraph: {
    title: "CasaGiusta — Vault Digitale Prove",
    description:
      "Forziere Prove crittografato con hash SHA-256. Le tue prove al sicuro, pronte per il tribunale.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className="dark">
      <body className="min-h-screen bg-background antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
