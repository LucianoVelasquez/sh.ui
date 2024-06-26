import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider"
import { ProviderStore } from "@/redux/providers";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "A&G - Ventas",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="en">
      <body className={inter.className}>   
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
