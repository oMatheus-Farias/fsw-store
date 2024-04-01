import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/ui/footer";
import { AuthProvider } from "@/providers/auth";
import Sidebar from "./dashboard/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FSW Store | Dashboard",
  description:
    "Explore nossa plataforma de e-commerce de periféricos para computador! Encontre mouses, teclados, monitores e mais. Oferecemos uma experiência simplificada de compra, com login via Google, navegação por categorias e descontos exclusivos. Gerencie seu carrinho de compras e pague com segurança através da API do Stripe.",
  keywords:
    "e-commerce, periféricos, computador, mouses, teclados, monitores, login, Google, categorias, descontos, carrinho de compras, Stripe",
  authors: [{ name: "Matheus Farias" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="flex h-full flex-col">
          <AuthProvider>
            <div className="flex overflow-hidden">
              <Sidebar />
              {children}
            </div>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
