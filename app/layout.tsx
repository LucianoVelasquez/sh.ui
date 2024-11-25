import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider"
import { ProviderStore } from "@/redux/providers";
import { Toaster } from "@/components/ui/toaster";

const noto_sans = Noto_Sans({
  subsets : ["latin"]
});

export const metadata: Metadata = {
  title: "A&G - Ventas",
  icons:{
    icon: "/icon-new.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="es">
      <body className={noto_sans.className}>   
      <ProviderStore>
        <ThemeProvider attribute="class" defaultTheme="system">
          
            {children}
        </ThemeProvider>
        <Toaster />
      </ProviderStore>
        
      </body>
    </html>
  );
}
