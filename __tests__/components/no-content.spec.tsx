import NoContent, { predefinicoes } from "@/components/no-content"
import { render, screen } from "@testing-library/react"

describe("No Content", () => {
    test.each(Object.entries(predefinicoes))(
        'NoContent - renderiza corretamente a predefinição "%s"',
        (tipo, { titulo, descricao }) => {
            render(<NoContent tipo_conteudo={tipo as any}/>)

            expect(screen.getByText(titulo)).toBeInTheDocument()
            expect(screen.getByText(descricao)).toBeInTheDocument()
        }
    )
})