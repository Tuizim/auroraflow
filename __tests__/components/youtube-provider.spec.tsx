// __tests__/components/youtube-provider.spec.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { YoutubeProvider, useYoutubeProvider } from "@/components/youtube-provider";
import { YoutubePlayer } from "@/components/youtube-player";
import { useYoutubeContext } from "@/hooks/use-youtube-context";

jest.mock("@/hooks/use-youtube-context");
jest.mock("@/components/youtube-player", () => ({
  YoutubePlayer: jest.fn(() => <div data-testid="youtube-player" />),
}));

const mockUseYoutubeContext = useYoutubeContext as jest.Mock;
const mockYoutubePlayer = YoutubePlayer as jest.Mock;

describe("YoutubeProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o YoutubePlayer com o contexto correto", () => {
    const contextoFake = {
      id: "abc123",
      url: "https://youtu.be/abc123",
      setUrl: jest.fn(),
      status: false,
      setStatus: jest.fn(),
      volume: 50,
      setVolume: jest.fn(),
      statusPlayer: false,
      setStatusPlayer: jest.fn(),
      nome: "Teste",
      setNome: jest.fn(),
      setId: jest.fn(),
      resetarTodosAtributos: jest.fn(),
    };

    mockUseYoutubeContext.mockReturnValue(contextoFake);

    render(
      <YoutubeProvider>
        <div data-testid="children">Conteúdo Filho</div>
      </YoutubeProvider>
    );

    expect(mockYoutubePlayer).toHaveBeenCalledWith(
      { youtubeContext: contextoFake },
      undefined
    );

    expect(screen.getByTestId("youtube-player")).toBeInTheDocument();
    expect(screen.getByTestId("children")).toBeInTheDocument();
  });

  it("deve lançar erro se useYoutubeProvider for usado fora do provider", () => {
    const renderHookOutsideProvider = () => {
      function Teste() {
        useYoutubeProvider();
        return null;
      }
      render(<Teste />);
    };

    expect(renderHookOutsideProvider).toThrow(
      "YoutubeProviderContext must be used within a MyProvider"
    );
  });
});
