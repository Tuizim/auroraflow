import TarefaEditorSheet from "@/components/tarefa-editor-sheet";
import { Prioridade } from "@/models/enums/prioridades";
import { Tarefa } from "@/models/tarefa";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Editor de tarefas", () => {
    const tarefaTeste = new Tarefa("Teste", "Descricao", Prioridade.Media)
    const mockFuncao = jest.fn()
    const setup = () => { render(<TarefaEditorSheet tarefa={tarefaTeste} editarTarefa={mockFuncao} />) }

    it("TarefaEditorSheet - renderiza botão de abrir sheet sem exibir conteúdo", () => {
        setup()
        const trigger = screen.getByLabelText('editar tarefa');

        expect(trigger).toBeInTheDocument();
        expect(trigger).toBeEnabled();
        expect(trigger).toBeValid();
        expect(screen.queryByLabelText(/sheet editar conteudo/i)).not.toBeInTheDocument()
    });

    it("TarefaEditorSheet - abre sheet ao clicar no trigger e exibe formulário", () => {
        setup()
        const trigger = screen.getByLabelText('editar tarefa');
        fireEvent.click(trigger)
        const form = screen.getByRole('form', { name: /form de tarefa/i })

        expect(screen.queryByLabelText(/sheet editar conteudo/i)).toBeInTheDocument()
        expect(form).toBeInTheDocument()
    });

    it("TarefaEditorSheet - chama editarTarefa e fecha sheet ao submeter formulário", async () => {
        setup();
        const trigger = screen.getByLabelText('editar tarefa');
        fireEvent.click(trigger);

        const inputObrigatorio = await screen.findByLabelText(/título/i); // ou pelo id, se preferir
        fireEvent.change(inputObrigatorio, { target: { value: 'Minha tarefa' } });

        const form = screen.getByRole('form', { name: /form de tarefa/i });
        fireEvent.submit(form);

        await waitFor(() => {
            expect(mockFuncao).toHaveBeenCalledTimes(1);
        });
    });
    it("TarefaEditorSheet - renderiza botões 'salvar' e 'cancelar' vinculados ao formulário", () => {
        setup();
        const trigger = screen.getByLabelText('editar tarefa');
        fireEvent.click(trigger);
        const salvar = screen.getByLabelText(/salvar/i)
        const cancelar = screen.getByLabelText(/cancelar/i)

        expect(salvar).toBeInTheDocument()
        expect(salvar).toBeVisible()
        expect(salvar).toBeEnabled()
        expect(cancelar).toBeInTheDocument()
        expect(cancelar).toBeVisible()
        expect(cancelar).toBeEnabled()

        expect(salvar).toHaveAttribute('type', 'submit')
        expect(salvar).toHaveAttribute('form', 'tarefa-form')
        expect(cancelar).toHaveAttribute('type', 'reset')
        expect(cancelar).toHaveAttribute('form', 'tarefa-form')
    })
    it("TarefaEditorSheet - fecha sheet ao clicar no botão Cancelar", async () => {
        setup();
        const trigger = screen.getByLabelText('editar tarefa');
        fireEvent.click(trigger);

        const inputObrigatorio = await screen.findByLabelText(/título/i); // ou pelo id, se preferir
        fireEvent.change(inputObrigatorio, { target: { value: 'Minha tarefa' } });

        const form = screen.getByRole('form', { name: /form de tarefa/i });
        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.queryByLabelText(/sheet editar conteudo/i)).toBeInTheDocument()
        });
    });

    it("TarefaEditorSheet - fecha dialog ao clicar em cancelar", () => {
        setup();
        const trigger = screen.getByLabelText('editar tarefa');
        fireEvent.click(trigger);

        const cancelar = screen.getByLabelText(/cancelar/i)
        fireEvent.click(cancelar)

        expect(screen.queryByLabelText(/sheet editar conteudo/i)).not.toBeInTheDocument()
    })
});