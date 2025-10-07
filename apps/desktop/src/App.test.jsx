import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders desktop app heading", () => {
    render(<App />);
    const headingElement = screen.getByText(/React Desktop App/i);
    expect(headingElement).toBeInTheDocument();
});
