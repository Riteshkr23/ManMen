import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { CartDrawer } from "@/components/cart-drawer";

export const metadata: Metadata = {
  title: "ManMen — Cinematic Ecommerce",
  description: "Premium lifestyle ecommerce with cinematic GSAP storytelling.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
