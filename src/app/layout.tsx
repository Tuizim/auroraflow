import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { YoutubeProvider } from "@/components/youtube-provider";

export const metadata: Metadata = {
  title: "AuroraFlow",
  description: "Um espaço para fluir seu trabalho"
}
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <YoutubeProvider>
            <SidebarProvider>
              <AppSidebar />
              <main className="flex-grow m-20">
                {children}
              </main>
            </SidebarProvider>
          </YoutubeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
