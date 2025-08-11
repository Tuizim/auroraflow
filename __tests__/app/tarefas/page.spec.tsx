import { render, screen } from "@testing-library/react";
import { useTarefa } from "@/hooks/use-tarefas";
import Page from "@/app/tarefas/page";

jest.mock("@/hooks/use-tarefas");

const mockUseTarefa = useTarefa as jest.Mock;

describe("Page component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o cabeçalho corretamente", () => {
    mockUseTarefa.mockReturnValue({
      tarefas: [],
      adicionarTarefa: jest.fn(),
      mudarStatusTarefa: jest.fn(),
      editarTarefa: jest.fn(),
      excluirTarefa: jest.fn(),
    });

    render(<Page />);

    expect(screen.getByText("Organize o Seu Flow")).toBeInTheDocument();
    expect(
      screen.getByText(/Aqui estão suas tarefas para hoje/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Tarefas")).toBeInTheDocument();
  });

  it("deve renderizar tarefas quando houver dados", () => {
    const tarefasFake = [
      {
        id: "1",
        titulo: "Tarefa 1",
        descricao: "Descrição 1",
        prioridade: "Alta",
        concluido: false,
      },
      {
        id: "2",
        titulo: "Tarefa 2",
        descricao: "Descrição 2",
        prioridade: "Baixa",
        concluido: true,
      },
    ];

    mockUseTarefa.mockReturnValue({
      tarefas: tarefasFake,
      adicionarTarefa: jest.fn(),
      mudarStatusTarefa: jest.fn(),
      editarTarefa: jest.fn(),
      excluirTarefa: jest.fn(),
    });

    render(<Page />);

    expect(screen.getByText("Tarefa 1")).toBeInTheDocument();
    expect(screen.getByText("Tarefa 2")).toBeInTheDocument();
  });

  it("deve renderizar NoContent quando não houver tarefas", () => {
    mockUseTarefa.mockReturnValue({
      tarefas: [],
      adicionarTarefa: jest.fn(),
      mudarStatusTarefa: jest.fn(),
      editarTarefa: jest.fn(),
      excluirTarefa: jest.fn(),
    });

    render(<Page />);

    expect(screen.getByText(/Nada por aqui… ainda!/i)).toBeInTheDocument();
  });
});
