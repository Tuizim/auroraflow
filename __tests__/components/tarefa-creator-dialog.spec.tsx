import TarefaCreatorDialog from "@/components/tarefa-creator-dialog"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

describe("Dialog para crição de tarefa", () => {
    it("TarefaCreatorDialog - renderiza trigger sem content", () => {
        render(<TarefaCreatorDialog adicionarTarefa={() => { }} />)
        const trigger = screen.getByLabelText(/adicionar tarefa/i)
        const dialog = screen.queryByLabelText(/Dialog criar tarefa/i)

        expect(trigger.querySelector('button'))
        expect(trigger).toBeInTheDocument()
        expect(dialog).not.toBeInTheDocument()
    })
    it("TarefaCreatorDialog - renderiza dialog ao clicar no trigger", () => {
        render(<TarefaCreatorDialog adicionarTarefa={() => { }} />)
        const trigger = screen.getByLabelText(/adicionar tarefa/i)
        fireEvent.click(trigger)
        const dialog = screen.getByLabelText(/Dialog criar tarefa/i)

        expect(dialog).toBeInTheDocument()
    })
    it("TarefaCreatorDialog - renderiza formulário de tarefa", () => {
        render(<TarefaCreatorDialog adicionarTarefa={() => { }} />)
        fireEvent.click(screen.getByLabelText(/adicionar tarefa/i))
        const form = screen.getByRole('form', { name: /form de tarefa/i })

        expect(form).toBeInTheDocument()
        expect(form).toHaveAttribute('id', 'tarefa-form')
    })
    it("TarefaCreatorDialog - renderiza botões 'salvar' e 'cancelar' vinculados ao formulário", () => {
        render(<TarefaCreatorDialog adicionarTarefa={() => { }} />)
        fireEvent.click(screen.getByLabelText(/adicionar tarefa/i))

        const salvar = screen.getByLabelText(/salvar/i)
        const cancelar = screen.getByLabelText(/cancelar/i)

        expect(salvar).toBeInTheDocument()
        expect(cancelar).toBeInTheDocument()
        expect(salvar).toHaveAttribute('type', 'submit')
        expect(salvar).toHaveAttribute('form', 'tarefa-form')
        expect(cancelar).toHaveAttribute('type', 'reset')
        expect(cancelar).toHaveAttribute('form', 'tarefa-form')
    })

    it("TarefaCreatorDialog - chama 'adicionar tarefa' e fecha dialog ao salvar", async () => {
        const mockFuncao = jest.fn()
        render(<TarefaCreatorDialog adicionarTarefa={mockFuncao} />)
        fireEvent.click(screen.getByLabelText(/adicionar tarefa/i))

        const inputObrigatorio = document.getElementById('tarefa-titulo') as HTMLInputElement;
        fireEvent.change(inputObrigatorio, { target: { value: 'Minha tarefa' } });

        const salvar = screen.getByLabelText(/salvar/i)
        fireEvent.click(salvar)

        await waitFor(() => {
            expect(screen.queryByLabelText(/dialog criar tarefa/i)).not.toBeInTheDocument();
        });

        // Garante que a função foi chamada
        expect(mockFuncao).toHaveBeenCalledWith(expect.objectContaining({
            titulo: 'Minha tarefa'
        }));
    })
    it("TarefaCreatorDialog - fecha dialog ao clicar em cancelar", () => {
        render(<TarefaCreatorDialog adicionarTarefa={() => { }} />)
        fireEvent.click(screen.getByLabelText(/adicionar tarefa/i))

        const cancelar = screen.getByLabelText(/cancelar/i)
        fireEvent.click(cancelar)

        expect(screen.queryByLabelText(/dialog criar tarefa/i)).not.toBeInTheDocument();
    })
})