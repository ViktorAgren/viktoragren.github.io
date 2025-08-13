import { render, screen, fireEvent } from "@testing-library/react";
import { Projects } from "./Projects";

describe("Projects", () => {
  test("renders all projects by default", () => {
    render(<Projects />);

    expect(
      screen.getByText("Black-Scholes Option Calculator"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fantasy Premier League Dashboard"),
    ).toBeInTheDocument();
    expect(screen.getByText("Mathematical Journal")).toBeInTheDocument();
  });

  test("filters projects by category", () => {
    render(<Projects />);

    const financeButton = screen.getByText("FINANCE");
    fireEvent.click(financeButton);

    expect(
      screen.getByText("Black-Scholes Option Calculator"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Fantasy Premier League Dashboard"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Mathematical Journal")).not.toBeInTheDocument();
  });

  test("shows all projects when all filter is selected", () => {
    render(<Projects />);

    const financeButton = screen.getByText("FINANCE");
    fireEvent.click(financeButton);

    const allButton = screen.getByText("ALL");
    fireEvent.click(allButton);

    expect(
      screen.getByText("Black-Scholes Option Calculator"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fantasy Premier League Dashboard"),
    ).toBeInTheDocument();
    expect(screen.getByText("Mathematical Journal")).toBeInTheDocument();
  });

  test("displays project statistics correctly", () => {
    render(<Projects />);

    expect(screen.getByText("TOTAL PROJECTS")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("AVG UPTIME")).toBeInTheDocument();
    expect(screen.getByText("98.7%")).toBeInTheDocument();
  });
});
