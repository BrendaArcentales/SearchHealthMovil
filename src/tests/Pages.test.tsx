import React from "react";
import { render } from "@testing-library/react";
import Recover from "../pages/recover";
import Register from "../pages/register";
import Guide from "../pages/Guide";
import Home from "../pages/Home";
import FavoriteCenters from "../pages/FavoriteCenters";
import TabUserProfile from "../pages/TabUserProfile";

describe("Debería renderizar las pantallas ", () => {
  test("Debería renderizar el registrar sin fallar", () => {
    const { baseElement } = render(<Register />);
    expect(baseElement).toBeDefined();
  });

  test("Debería renderizar el recuperar contraseña sin fallar", () => {
    const { baseElement } = render(<Recover />);
    expect(baseElement).toBeDefined();
  });

  test("Debería renderizar la página principal sin fallar", () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeDefined();
  });

  test("Debería renderizar la guía sin fallar", () => {
    const { baseElement } = render(<Guide />);
    expect(baseElement).toBeDefined();
  });

  test("Debería renderizar la lista de favoritos sin fallar", () => {
    const { baseElement } = render(<FavoriteCenters />);
    expect(baseElement).toBeDefined();
  });

  test("Debería renderizar el perfil de usuario sin fallar", () => {
    const { baseElement } = render(<TabUserProfile />);
    expect(baseElement).toBeDefined();
  });
});
