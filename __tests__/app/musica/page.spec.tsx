import { render, screen, fireEvent } from "@testing-library/react";
import Page from "@/app/musica/page";
import { useYoutubeProvider } from "@/components/youtube-provider";

jest.mock("@/components/youtube-provider");
jest.mock("@/components/musica-controle-popover", () => () => (
  <div data-testid="musica-controle">Controle de Música</div>
));

const mockUseYoutubeProvider = useYoutubeProvider as jest.Mock;

describe("Página de Música", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar textos e instruções corretamente", () => {
    mockUseYoutubeProvider.mockReturnValue({
      youtubeContext: {
        statusPlayer: false,
        setUrl: jest.fn(),
      },
    });

    render(<Page />);

    expect(screen.getByText("Foco com Música")).toBeInTheDocument();
    expect(
      screen.getByText(/Trilhas suaves para potencializar seu foco/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/https:\/\/www\.youtube\.com\/watch\?v=/i)
    ).toBeInTheDocument();

    expect(screen.getByText("Como usar")).toBeInTheDocument();
  });

  it("deve chamar setUrl com o valor digitado ao clicar no botão", () => {
    const setUrlMock = jest.fn();

    mockUseYoutubeProvider.mockReturnValue({
      youtubeContext: {
        statusPlayer: false,
        setUrl: setUrlMock,
      },
    });

    render(<Page />);

    const input = screen.getByPlaceholderText(/https:\/\/www\.youtube\.com\/watch\?v=/i);
    const button = screen.getByRole("button", { name: /Carregar Música/i });

    fireEvent.change(input, { target: { value: "https://youtu.be/teste" } });
    fireEvent.click(button);

    expect(setUrlMock).toHaveBeenCalledWith("https://youtu.be/teste");
  });

  it("deve renderizar MusicaControlePopover quando statusPlayer for true", () => {
    mockUseYoutubeProvider.mockReturnValue({
      youtubeContext: {
        statusPlayer: true,
        setUrl: jest.fn(),
      },
    });

    render(<Page />);

    expect(screen.getByTestId("musica-controle")).toBeInTheDocument();
  });
});
