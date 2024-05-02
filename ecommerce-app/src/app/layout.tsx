import "./globals.css";
import type { Metadata } from "next";
import Layout from "@/components/layout";
import AuthProvider from "@/contexts/AuthContext";
import { inter } from "@/fonts/fonts";


export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce online shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
