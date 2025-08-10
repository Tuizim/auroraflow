import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { render, screen } from '@testing-library/react'

describe("AppSidebar", () => {
    it("AppSidebar - renderiza todos os botões", () => {
        render(
            <SidebarProvider>
                <AppSidebar />
            </SidebarProvider>
        )
        const botoes = screen.getAllByRole("button")
        botoes.forEach(botao => {
            expect(botao).toBeInTheDocument();
            expect(botao).toBeVisible()
            expect(botao).toBeEnabled()
        });
        expect(botoes).toHaveLength(5)
    })
    it("AppSidebar - contém o link correto em cada botão", () => {
        render(
            <SidebarProvider>
                <AppSidebar />
            </SidebarProvider>
        )
        const itensEsperados = [
            { label: "Dashboard", href: "/" },
            { label: "Tarefas", href: "/tarefas" },
            { label: "Atividades", href: "/atividades" },
            { label: "Música", href: "/musica" },
            { label: "Alarmes", href: "/alarmes" },
        ];

        itensEsperados.forEach(itemEsperado => {
            const botao = screen.getByRole("button",{name:itemEsperado.label});
            const link = botao.closest("a");
            expect(link).toHaveAttribute("href",itemEsperado.href)
        });
    })
    it("AppSidebar - contém o logo do site",()=>{
        render(
            <SidebarProvider>
                <AppSidebar />
            </SidebarProvider>
        )
        expect(screen.getByRole("img",{name:"logo"}))
    })
})