import DeleteBtn from "@/components/delete-btn"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

describe("Delete-Button", () => {
    it("DeleteBtn - renderiza botão para abrir dialog", () => {
        render(<DeleteBtn funcaoExcluir={() => { }} />)

        const trigger = screen.getByLabelText(/deletar item/i)
        const triggerIcon = trigger.querySelector('svg');

        expect(trigger).toBeInTheDocument();
        expect(trigger).toBeEnabled()
        expect(triggerIcon).toBeInTheDocument()
        expect(triggerIcon).toBeVisible()
    })
    it("DeleteBtn - não exibe dialog antes do clique", () => {
        render(<DeleteBtn funcaoExcluir={() => { }} />)

        expect(screen.queryByLabelText(/deletar dialog/i)).not.toBeInTheDocument()
    })
    it("DeleteBtn - exibe dialog após o clique", () => {
        render(<DeleteBtn funcaoExcluir={() => { }} />)
        fireEvent.click(screen.getByLabelText(/deletar item/i))

        expect(screen.getByLabelText(/deletar dialog/i)).toBeInTheDocument()
    })
    it("DeleteBtn - dialogo renderiza todos os botões", () => {
        render(<DeleteBtn funcaoExcluir={() => { }} />)
        fireEvent.click(screen.getByLabelText(/deletar item/i))

        const cancelar = screen.getByLabelText(/cancelar/i)
        const confirmar = screen.getByLabelText(/confirmar/i)

        expect(cancelar).toBeInTheDocument()
        expect(cancelar).toBeVisible()
        expect(cancelar).toBeEnabled()
        expect(confirmar).toBeInTheDocument()
        expect(confirmar).toBeVisible()
        expect(confirmar).toBeEnabled()
    })
    it("DeleteBtn - dialogo fecha ao clicar 'cancelar' sem executar funcaoExcluir", () => {
        const mockFuncao = jest.fn()
        render(<DeleteBtn funcaoExcluir={mockFuncao} />)
        fireEvent.click(screen.getByLabelText(/deletar item/i))

        const cancelar = screen.getByLabelText(/cancelar/i)
        fireEvent.click(cancelar)

        expect(screen.queryByLabelText(/deletar dialog/i)).not.toBeInTheDocument()
        expect(mockFuncao).not.toHaveBeenCalled()
    })
    it("DeleteBtn - dialogo fecha ao clicar 'confirmar' e executa funcaoExcluir", () => {
        const mockFuncao = jest.fn()
        render(<DeleteBtn funcaoExcluir={mockFuncao} />)
        fireEvent.click(screen.getByLabelText(/deletar item/i))

        const confirmar = screen.getByLabelText(/confirmar/i)
        fireEvent.click(confirmar)
        
        expect(screen.queryByLabelText('deletar dialog')).not.toBeInTheDocument()
        expect(mockFuncao).toHaveBeenCalledTimes(1)
    })
})