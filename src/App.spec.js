import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders all main sections", () => {
    render(<App />);

    expect(document.querySelector("#about")).toBeInTheDocument();
    expect(document.querySelector("#skills")).toBeInTheDocument();
    expect(document.querySelector("#projects")).toBeInTheDocument();
  });

  test("has proper page structure", () => {
    render(<App />);

    const appContainer = document.querySelector(".min-h-screen");
    expect(appContainer).toBeInTheDocument();
    expect(appContainer).toHaveClass("bg-gradient-to-b");
  });
});
