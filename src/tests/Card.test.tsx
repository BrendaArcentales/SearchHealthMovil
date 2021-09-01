import { render, fireEvent, act } from "@testing-library/react";
import React from "react";
import CardCenterMedical from "../components/CardCenterMedical";

describe("Debería funcionar los enlaces y despliegue de información de la tarjeta de centro médico", () => {
  test("Deberia renderizar el componente CarCenterMedical sin fallas", () => {
    const { baseElement } = render(<CardCenterMedical />);
    expect(baseElement).toBeDefined();
  });

  test("Cada tarjeta de los centros médicos debe tener una imagen", () => {
    const { getByRole } = render(<CardCenterMedical />);
    const imagen = getByRole("img");
    expect(imagen).toHaveAttribute("src");
  });

  test("Debería capturar el clic en el link de Ver Mapa", async () => {
    const { findByText } = render(<CardCenterMedical />);
    const mapa = await findByText("Ver mapa");
    await act(async () => {
      fireEvent.submit(mapa);
    });
  });

  test("Debería capturar el clic en el link de Ver comentarios", async () => {
    const { findByText } = render(<CardCenterMedical />);
    const comentarios = await findByText("Ver comentarios");
    await act(async () => {
      fireEvent.submit(comentarios);
    });
  });
});
