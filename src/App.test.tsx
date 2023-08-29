import * as React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";

describe("App component", () => {
  it("renders App correctly", async () => {
    render(<App />);

    const header = screen.getByLabelText("header");
    expect(header).toBeInTheDocument();
  });
});
