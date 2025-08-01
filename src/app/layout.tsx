import { Geist } from 'next/font/google'
import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: "AuroraFlow",
  description: "Um espaço para fluir seu trabalho"
}
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", geist.className)}>
        <ThemeProvider disableTransitionOnChange enableSystem defaultTheme="system">
          <SidebarProvider>
            <AppSidebar/>
            <main className="m-10">
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
