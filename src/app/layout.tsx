import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { auth } from "@/config/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema para Gereciamento de AGV",
  description: "Sistema para Gereciamento de AGV",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} `} suppressHydrationWarning={true}>
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
