import { VerMaisInformacao } from "@/components/ver-mais-informacao"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("ver mais informações", () => {
    const tituloMock = "Teste"
    const descricaoMock = "Teste descricao"
    const setup = () => {
        render(<VerMaisInformacao titulo={tituloMock} descricao={descricaoMock} />)
    }
    it("VerMaisInformacao - renderiza apenas o ícone inicialmente", () => {
        setup();

        expect(screen.getByLabelText(/ver mais informações/i)).toBeInTheDocument()
        expect(screen.queryByLabelText(/conteudo informações/i)).not.toBeInTheDocument()
    })
    it("VerMaisInformacao - abre o diálogo ao clicar no ícone", async () => {
        const user = userEvent.setup()
        setup()

        const trigger = screen.getByLabelText(/ver mais informações/i);
        await user.click(trigger)

        expect(screen.queryByLabelText(/conteudo informações/i)).toBeInTheDocument()
    })
})