import React from "react";
import { render } from "@testing-library/react";
import { AuthProvider } from "../services/AuthProvider";

describe("Debería renderizar el contexto AuthProvider sin fallas", () => {
  test("renders AuthProvider without crashing", () => {
    const { baseElement } = render(<AuthProvider />);
    expect(baseElement).toBeDefined();
  });
});
