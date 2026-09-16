import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Shoply — Everyday Goods",
    template: "%s · Shoply",
  },
  description: "A polished mini ecommerce experience for browsing and carting everyday goods.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <ThemeRegistry>
          <CartProvider>
            <div className="app-shell">
              <Navbar />
              <main className="app-main">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
