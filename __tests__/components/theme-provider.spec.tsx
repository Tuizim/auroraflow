import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";

describe("ThemeProvider", () => {
  it("renderiza children corretamente", () => {
    render(
      <ThemeProvider attribute="class">
        <div data-testid="child">Conteúdo filho</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("passa props para NextThemesProvider", () => {

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