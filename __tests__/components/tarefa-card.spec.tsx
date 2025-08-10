import TarefaCard from "@/components/tarefa-card"
import { Prioridade } from "@/models/enums/prioridades"
import { Tarefa } from "@/models/tarefa"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("Card tarefa", () => {
    let tarefaTesteComDescricao: Tarefa
    let tarefaTesteSemDescricao: Tarefa

    beforeEach(() => {
        tarefaTesteComDescricao = new Tarefa("Teste", "Descricao", Prioridade.Baixa)
        tarefaTesteSemDescricao = new Tarefa("Teste", "", Prioridade.Baixa)
    })

    const mudarStatusMock = jest.fn();
    const excluirTarefaMock = jest.fn();
    const editarTarefasMock = jest.fn();

    const setupComponente = (tarefa: Tarefa) => {
        render(<TarefaCard
            tarefa={tarefa}
            mudarStatus={mudarStatusMock}
            excluirTarefa={excluirTarefaMock}
            editarTarefa={editarTarefasMock}
        />)
    }

    it("deve renderizar o título da tarefa corretamente", () => {
        setupComponente(tarefaTesteSemDescricao)

        const tituloTarefa = screen.getByText(tarefaTesteComDescricao.titulo)
        expect(tituloTarefa).toBeInTheDocument()
        expect(tituloTarefa).toBeVisible()
    })
    it("deve renderizar a prioridade dentro do Badge", () => {
        setupComponente(tarefaTesteSemDescricao)

        const prioridade = screen.getByLabelText(/prioridade/i)

        expect(prioridade).toBeInTheDocument()
        expect(prioridade).toHaveTextContent(Prioridade.Baixa)
    })
    it("deve renderizar o botão de exclusão", () => {
        setupComponente(tarefaTesteSemDescricao)

        const botaoDelete = screen.getByLabelText(/deletar item/i)

        expect(botaoDelete).toBeInTheDocument()
    })
    it("deve renderizar o botão de edição", () => {
        setupComponente(tarefaTesteSemDescricao)

        const botaoEditar = screen.getByLabelText(/editar tarefa/i)

        expect(botaoEditar).toBeInTheDocument()
    })
    it("deve renderizar o componente VerMaisInformacao quando existir descrição", () => {
        setupComponente(tarefaTesteComDescricao)

        const botaoInfo = screen.getByLabelText(/Ver mais informação/i)

        expect(botaoInfo).toBeInTheDocument()
    })
    it("não deve renderizar o componente VerMaisInformacao quando a descrição estiver vazia", () => {
        setupComponente(tarefaTesteSemDescricao)

        const botaoInfo = screen.queryByLabelText(/Ver mais informação/i)

        expect(botaoInfo).not.toBeInTheDocument()
    })
    it("deve aplicar a classe 'opacity-50' quando a tarefa estiver concluída", () => {
        tarefaTesteSemDescricao.concluido = true
        setupComponente(tarefaTesteSemDescricao)

        const card = screen.getByLabelText(/card tarefa/i)

        expect(card).toHaveClass("opacity-50")
    })
    it("não deve aplicar a classe 'opacity-50' quando a tarefa não estiver concluída", () => {
        tarefaTesteSemDescricao.concluido = false
        setupComponente(tarefaTesteSemDescricao)

        const card = screen.getByLabelText(/card tarefa/i)

        expect(card).not.toHaveClass("opacity-50")
    })
    it("deve chamar mudarStatus com o valor invertido ao clicar no CheckContent", async () => {
        const user = userEvent.setup()
        setupComponente(tarefaTesteSemDescricao)

        const botaoCheckConcluir = screen.getByLabelText(/Marcar como concluída/i)
        expect(botaoCheckConcluir).toBeInTheDocument()
        await user.click(botaoCheckConcluir)

        expect(mudarStatusMock).toHaveBeenCalledWith(!tarefaTesteSemDescricao.concluido, tarefaTesteSemDescricao.id)
    })
    it("deve chamar excluirTarefa com o id correto ao clicar no DeleteBtn", async () => {
        const user = userEvent.setup()
        setupComponente(tarefaTesteSemDescricao)

        const botaoDeletar = screen.getByLabelText(/deletar item/i)
        await user.click(botaoDeletar)
        const confirmarDelete = screen.getByLabelText(/confirmar/i)
        await user.click(confirmarDelete)
        
        expect(excluirTarefaMock).toHaveBeenCalledWith(tarefaTesteSemDescricao.id)
    })
})