import { render, screen, fireEvent } from "@testing-library/react";
import { Skills } from "./Skills";

describe("Skills", () => {
  test("renders default category (LANGUAGES)", () => {
    render(<Skills />);

    expect(screen.getByText("LANGUAGES SKILLS")).toBeInTheDocument();
    expect(screen.getByText("PYTHON")).toBeInTheDocument();
    expect(screen.getByText("JAVASCRIPT")).toBeInTheDocument();
  });

  test("switches between skill categories", () => {
    render(<Skills />);

    const frontendButton = screen.getByText("FRONTEND");
    fireEvent.click(frontendButton);

    expect(screen.getByText("FRONTEND SKILLS")).toBeInTheDocument();
    expect(screen.getByText("REACT.JS")).toBeInTheDocument();
  });

  test("displays skill expertise count correctly", () => {
    render(<Skills />);

    expect(screen.getByText("Technologies: 4")).toBeInTheDocument();
  });

  test("shows skill status badges", () => {
    render(<Skills />);

    expect(screen.getAllByText("LEARNING")).toHaveLength(3);
    expect(screen.getAllByText("MAINTAINED")).toHaveLength(2);
  });
});
