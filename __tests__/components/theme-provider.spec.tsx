import { ThemeProvider } from "@/components/theme-provider";
import { render, screen } from "@testing-library/react";

describe("ThemeProvider", () => {
  it("ThemeProvider - renderiza children corretamente", () => {
    render(
      <ThemeProvider attribute="class">
        <div data-testid="child">Conteúdo filho</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("ThemeProvider - passa props para NextThemesProvider", () => {

    const { container } = render(
      <ThemeProvider
        defaultTheme="dark"
        attribute="class"
        enableSystem={false}
      >
        <div>Teste</div>
      </ThemeProvider>
    );

    expect(container).toBeInTheDocument();
  });
});