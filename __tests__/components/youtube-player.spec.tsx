// __tests__/componentes/youtube-player.spec.tsx
import { render, screen } from "@testing-library/react";
import { YoutubePlayer } from "@/components/youtube-player";
import { useYoutubePlayer } from "@/hooks/use-youtube-player";
import YouTube from "react-youtube";
import { YoutubePlayerType } from "@/hooks/use-youtube-context";

jest.mock("react-youtube", () => jest.fn(() => <div data-testid="youtube-mock" />));

jest.mock("@/hooks/use-youtube-player", () => ({
    useYoutubePlayer: jest.fn(),
}));

const criarYoutubeContextFalso = (sobrescritas?: Partial<YoutubePlayerType>): YoutubePlayerType => ({
    url: "https://youtu.be/falso",
    setUrl: jest.fn(),
    status: false,
    setStatus: jest.fn(),
    volume: 50,
    setVolume: jest.fn(),
    statusPlayer: false,
    setStatusPlayer: jest.fn(),
    nome: "Música Teste",
    setNome: jest.fn(),
    id: "",
    setId: jest.fn(),
    resetarTodosAtributos: jest.fn(),
    ...sobrescritas,
});

describe("Componente YoutubePlayer", () => {
    const mockEventoOnReady = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useYoutubePlayer as jest.Mock).mockReturnValue({
            eventoOnReady: mockEventoOnReady,
        });
    });

    it("não deve renderizar nada se o youtubeContext.id estiver vazio", () => {
        const contextoFalso = criarYoutubeContextFalso({ id: "" });
        const { container } = render(<YoutubePlayer youtubeContext={contextoFalso} />);
        expect(container.firstChild).toBeNull();
    });

    it("deve renderizar o componente YouTube quando existir um id", () => {
        const contextoFalso = criarYoutubeContextFalso({ id: "abc123" });
        render(<YoutubePlayer youtubeContext={contextoFalso} />);

        expect(screen.getByTestId("youtube-mock")).toBeInTheDocument();
        expect(YouTube).toHaveBeenCalledWith(
            expect.objectContaining({
                videoId: "abc123",
                opts: expect.objectContaining({
                    playerVars: { autoplay: 1 },
                }),
                onReady: mockEventoOnReady,
                className: "hidden",
                onError: expect.any(Function),
            }),
            undefined
        );
    });

    it("deve chamar console.warn quando ocorrer erro no player", () => {
        const spyWarn = jest.spyOn(console, "warn").mockImplementation(() => { });
        (YouTube as unknown as jest.Mock).mockImplementation((props) => {
            props.onError({ data: "erro-teste" });
            return <div data-testid="youtube-mock" />;
        });

        const contextoFalso = criarYoutubeContextFalso({ id: "abc123" });
        render(<YoutubePlayer youtubeContext={contextoFalso} />);

        expect(spyWarn).toHaveBeenCalledWith("Erro controlado do YouTube:", "erro-teste");
        spyWarn.mockRestore();
    });
});
