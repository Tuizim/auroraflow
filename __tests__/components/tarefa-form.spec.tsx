import TarefaForm from "@/components/tarefa-form";
import { Prioridade } from "@/models/enums/prioridades";
import { Tarefa } from "@/models/tarefa";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Formulario de tarefa", () => {
    let salvarTarefa: jest.Mock;
    let tarefaExistente: Tarefa;

    beforeEach(() => {
        salvarTarefa = jest.fn();
        tarefaExistente = new Tarefa("Tarefa Existente", "Desc Existente", Prioridade.Media);
    });

    const setupNewForm = () => {
        render(<TarefaForm salvarTarefa={salvarTarefa} />);
    };

    const setupEditForm = (tarefa: Tarefa) => {
        render(<TarefaForm salvarTarefa={salvarTarefa} tarefa={tarefa} />);
    };

    const alterarPrioridade = async (prioridade: Prioridade) => {
        const user = userEvent.setup()
        await user.click(screen.getByRole("combobox"));
        const opcao = screen.getByRole("option", {
            name: new RegExp(prioridade, "i"),
        });
        await user.click(opcao);
    }

    it("TarefaForm - renderiza o formulário corretamente", () => {
        setupNewForm();
        expect(screen.getByLabelText(/form de tarefa/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/titulo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descricao/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/seletor prioridade/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Digite o título da tarefa aqui/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Conte mais sobre essa tarefa aqui/i)).toBeInTheDocument();
        expect(screen.getByText(/Prioridade/i)).toBeInTheDocument();
    });

    it("TarefaForm - exibe erro se o título for vazio", async () => {
        setupNewForm();
        fireEvent.submit(screen.getByLabelText(/form de tarefa/i));
        await waitFor(() => {
            expect(screen.getByText(/Título é obrigatório/i)).toBeInTheDocument();
        });
        expect(salvarTarefa).not.toHaveBeenCalled();
    });

    it("TarefaForm - exibe erro se o título tiver menos de 3 caracteres", async () => {
        setupNewForm();

        const inputTitulo = screen.getByLabelText(/título/i);
        fireEvent.change(inputTitulo, { target: { value: 'ab' } });
        fireEvent.submit(screen.getByLabelText(/form de tarefa/i));

        await waitFor(() => {
            expect(screen.getByText(/Mínimo de 3 caracteres/i)).toBeInTheDocument();
        });
        expect(salvarTarefa).not.toHaveBeenCalled();
    });

    it("TarefaForm - exibe erro se o título tiver mais de 50 caracteres", async () => {
        setupNewForm();

        const inputTitulo = screen.getByLabelText(/título/i);
        fireEvent.change(inputTitulo, { target: { value: 'a'.repeat(51) } });
        fireEvent.submit(screen.getByLabelText(/form de tarefa/i));

        await waitFor(() => {
            expect(screen.getByText(/Máximo de 50 caracteres/i)).toBeInTheDocument();
        });
        expect(salvarTarefa).not.toHaveBeenCalled();
    });
    it("TarefaForm - permite selecionar uma prioridade", async () => {
        const user = userEvent.setup();
        setupNewForm()

        await alterarPrioridade(Prioridade.Alta)
        expect(screen.getByRole("combobox")).toHaveTextContent(Prioridade.Alta);
    });
    it("TarefaForm - preenche campos ao editar tarefa", () => {
        setupEditForm(tarefaExistente);

        expect(screen.getByLabelText(/título/i)).toHaveValue(tarefaExistente.titulo);
        expect(screen.getByLabelText(/descrição/i)).toHaveValue(tarefaExistente.descricao);

        const trigger = screen.getByRole('combobox', { name: /prioridade/i });
        expect(trigger).toHaveTextContent(
            tarefaExistente.prioridade.charAt(0).toUpperCase() + tarefaExistente.prioridade.slice(1)
        );
    });
    it("TarefaForm - cria nova tarefa alterando todos os campos e salva com sucesso", () => {
        const user = userEvent.setup()
        setupNewForm()

        const form = screen.getByRole("form");
        const inputTitulo = screen.getByLabelText(/título/i);
        const inputDescricao = screen.getByLabelText(/descricao/i);
        user.type(inputTitulo, "Titulo da tarefa")
        user.type(inputDescricao, "Descricao da tarefa")
        alterarPrioridade(Prioridade.Alta)

        fireEvent.submit(form);

        waitFor(() => {
            expect(salvarTarefa).toHaveBeenCalledTimes(1)
            expect(salvarTarefa).toHaveBeenCalledWith(
                expect.objectContaining({
                    titulo: "Titulo da tarefa",
                    descricao: "Descricao da tarefa",
                    prioridade: Prioridade.Alta
                })
            )
        })
    })
    it("TarefaForm - edita tarefa alterando todos os campos e salva com sucesso", () => {
        const user = userEvent.setup()
        setupEditForm(tarefaExistente)

        const form = screen.getByRole("form");
        const inputTitulo = screen.getByLabelText(/título/i);
        const inputDescricao = screen.getByLabelText(/descricao/i);
        user.type(inputTitulo, "Titulo da tarefa")
        user.type(inputDescricao, "Descricao da tarefa")
        alterarPrioridade(Prioridade.Alta)

        fireEvent.submit(form);

        waitFor(() => {
            expect(salvarTarefa).toHaveBeenCalledTimes(1)
            expect(salvarTarefa).toHaveBeenCalledWith(
                expect.objectContaining({
                    titulo: "Titulo da tarefa",
                    descricao: "Descricao da tarefa",
                    prioridade: Prioridade.Alta
                })
            )
        })
    })
    it("TarefaForm - aceita descrição vazia e com texto", () => {
        setupNewForm();
        const inputDescricao = screen.getByLabelText(/descrição/i);
        expect(inputDescricao).toHaveValue("");
        fireEvent.change(inputDescricao, { target: { value: "Descrição teste" } });
        expect(inputDescricao).toHaveValue("Descrição teste");
    });

    it("TarefaForm - prioridade padrão é Baixa ao criar nova tarefa", () => {
        setupNewForm();
        const trigger = screen.getByRole('combobox', { name: /prioridade/i });
        expect(trigger).toHaveTextContent("Baixa");
    });

    it("TarefaForm - prioridade inicial é da tarefa ao editar", () => {
        setupEditForm(tarefaExistente);
        const trigger = screen.getByRole('combobox', { name: /prioridade/i });
        expect(trigger).toHaveTextContent(
            tarefaExistente.prioridade.charAt(0).toUpperCase() + tarefaExistente.prioridade.slice(1)
        );
    });
    it("TarefaForm - todos os campos possuem labels corretos", () => {
        setupNewForm();
        expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descricao/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/seletor prioridade/i)).toBeInTheDocument();
    });
});