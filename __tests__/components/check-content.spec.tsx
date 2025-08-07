import CheckContent from "@/components/check-content"
import { fireEvent, render, screen } from "@testing-library/react"

describe("check-content", () => {
    it("Renderizar como 'Marcar como concluída' quando status: false", () => {
        render(<CheckContent status={false} mudarStatus={() => { }} />)
        const elemento = screen.getByLabelText("Marcar como concluída")

        expect(elemento).toBeInTheDocument()
        expect(elemento).toHaveAttribute("aria-pressed", "false")
        expect(elemento.querySelector("svg")).toBeInTheDocument()
    })
    it("Renderizar como 'Desmarcar como concluída' quando status: true", () => {
        render(<CheckContent status={true} mudarStatus={() => { }} />)
        const elemento = screen.getByLabelText("Desmarcar como concluída")

        expect(elemento).toBeInTheDocument()
        expect(elemento).toHaveAttribute("aria-pressed", "true")
        expect(elemento.querySelector("svg")).toBeInTheDocument()
    })
    it("Chamar funcao 'mudarStatus' ao clicar", () => {
        const mockfuncao = jest.fn()
        render(<CheckContent status={false} mudarStatus={mockfuncao} />)
        const elemento = screen.getByLabelText("Marcar como concluída")

        fireEvent.click(elemento);
        
        expect(mockfuncao).toHaveBeenCalledTimes(1)
    })
})