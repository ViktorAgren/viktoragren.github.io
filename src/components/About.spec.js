import { render, screen } from "@testing-library/react";
import { About } from "./About";

describe("About", () => {
  test("renders profile details correctly", () => {
    render(<About />);

    expect(screen.getByText("VIKTOR ÅGREN")).toBeInTheDocument();
    expect(screen.getByText("QUANTITATIVE ANALYST")).toBeInTheDocument();
    expect(screen.getByText("STOCKHOLM, SWE")).toBeInTheDocument();
  });

  test("displays all highlights metrics", () => {
    render(<About />);

    expect(screen.getByText("EXPERIENCE")).toBeInTheDocument();
    expect(screen.getByText("EDUCATION")).toBeInTheDocument();
    expect(screen.getByText("PROJECTS")).toBeInTheDocument();
    expect(screen.getByText("EXPERTISE")).toBeInTheDocument();
  });

  test("shows profile summary points", () => {
    render(<About />);

    expect(
      screen.getByText(/Financial mathematics and timeseries Analysis/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Complex data analysis and illustration/),
    ).toBeInTheDocument();
  });

  test("displays navigation links", () => {
    render(<About />);

    expect(screen.getAllByText(/PROJECTS/).length).toBeGreaterThan(0);
    expect(screen.getByText(/CONTACT/)).toBeInTheDocument();
    expect(screen.getByText(/SKILLS/)).toBeInTheDocument();
  });
});
