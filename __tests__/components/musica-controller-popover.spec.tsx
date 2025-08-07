import MusicaControlePopover from "@/components/musica-controle-popover";
import { useYoutubeProvider, YoutubeProvider, YoutubeProviderContext } from "@/components/youtube-provider";
import { YoutubePlayerType } from "@/hooks/use-youtube-context";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { key } from "localforage";

describe("Popover com controles de musica", () => {
    const mockYoutubeContext: YoutubePlayerType = {
        url: 'https://youtu.be/xpto',
        setUrl: jest.fn(),
        status: true,
        setStatus: jest.fn(),
        volume: 50,
        setVolume: jest.fn(),
        statusPlayer: true,
        setStatusPlayer: jest.fn(),
        nome: 'Nome da Música',
        setNome: jest.fn(),
        id: '123',
        setId: jest.fn(),
        resetarTodosAtributos: jest.fn(),
    };
    it("Deve exibir trigger para abrir popover", () => {
        render(
            <YoutubeProvider>
                <MusicaControlePopover />
            </YoutubeProvider>
        )
        const trigger = screen.getByLabelText(/controlar musica/i)

        expect(trigger).toBeInTheDocument()
        expect(trigger).toBeEnabled()
        expect(trigger).toBeVisible()
    })
    it("Deve exibir controle somente ao clique", () => {
        render(
            <YoutubeProvider>
                <MusicaControlePopover />
            </YoutubeProvider>
        )

        expect(screen.queryByLabelText(/popover controle musica/i)).not.toBeInTheDocument()
        fireEvent.click(screen.getByLabelText(/controlar musica/i))
        expect(screen.getByLabelText(/popover controle musica/i)).toBeInTheDocument()
    })
    it("Deve exibir botao pause quando 'status' do youtubecontext for true - tocando", () => {
        mockYoutubeContext.status = true
        render(
            <YoutubeProviderContext.Provider value={{ youtubeContext: mockYoutubeContext }}>
                <MusicaControlePopover />
            </YoutubeProviderContext.Provider>
        )

        fireEvent.click(screen.getByLabelText(/controlar musica/i))
        expect(screen.getByRole('button', { name: 'botao pause' })).toBeInTheDocument()
    })
    it("Deve exibir botao play quando 'status' do youtubecontext for false - pausado", () => {
        mockYoutubeContext.status = false
        render(
            <YoutubeProviderContext.Provider value={{ youtubeContext: mockYoutubeContext }}>
                <MusicaControlePopover />
            </YoutubeProviderContext.Provider>
        )

        fireEvent.click(screen.getByLabelText(/controlar musica/i))
        expect(screen.getByRole('button', { name: 'botao play' })).toBeInTheDocument()
    })
    it("Deve chamar setStatus passando 'false' quando clicar no 'botao pause'", () => {
        mockYoutubeContext.status = true
        render(
            <YoutubeProviderContext.Provider value={{ youtubeContext: mockYoutubeContext }}>
                <MusicaControlePopover />
            </YoutubeProviderContext.Provider>
        )

        fireEvent.click(screen.getByLabelText(/controlar musica/i))
        const pause = screen.getByRole('button', { name: 'botao pause' });
        fireEvent.click(pause)

        expect(mockYoutubeContext.setStatus).toHaveBeenCalledWith(false)
    })
    it("Deve chamar setStatus passando 'true' quando clicar no 'botao play'", () => {
        mockYoutubeContext.status = false
        render(
            <YoutubeProviderContext.Provider value={{ youtubeContext: mockYoutubeContext }}>
                <MusicaControlePopover />
            </YoutubeProviderContext.Provider>
        )

        fireEvent.click(screen.getByLabelText(/controlar musica/i))
        const play = screen.getByRole('button', { name: 'botao play' });
        fireEvent.click(play)

        expect(mockYoutubeContext.setStatus).toHaveBeenCalledWith(true)
    })
    it("Deve renderizar slider com volume inicial e reagir à mudança", () => {
        render(
            <YoutubeProviderContext.Provider value={{ youtubeContext: mockYoutubeContext }}>
                <MusicaControlePopover />
            </YoutubeProviderContext.Provider>
        );
        fireEvent.click(screen.getByLabelText(/controlar musica/i))
        const slider = screen.getByLabelText(/controlar volume/i)
        expect(slider).toBeInTheDocument()
        expect(slider).toHaveAttribute("aria-valuenow", mockYoutubeContext.volume.toString());

        fireEvent.keyDown(slider, { key: 'ArrowRight', code: 'ArrowRight' })
        expect(mockYoutubeContext.setVolume).toHaveBeenCalled();
    })
    it("Deve renderizar 'botao de encerrar' e mudar 'status do player' para 'falso' ao clicar", () => {
        render(
            <YoutubeProviderContext.Provider value={{ youtubeContext: mockYoutubeContext }}>
                <MusicaControlePopover />
            </YoutubeProviderContext.Provider>
        );
        fireEvent.click(screen.getByLabelText(/controlar musica/i))
        const encerrar = screen.getByLabelText(/encerrar musica/i)
        expect(encerrar).toBeInTheDocument()
        
        fireEvent.click(encerrar)
        expect(mockYoutubeContext.setStatusPlayer).toHaveBeenCalledWith(false)
    })
})