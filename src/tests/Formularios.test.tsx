import Login from "../pages/login";
import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import Register from "../pages/register";
import Recover from "../pages/recover";

describe("Debería llamar a la función de Iniciar sesión en Login", () => {
  test("Debería validar que captura el clic en el boton Iniciar Sesión", async () => {
    const { findByText } = render(<Login />);
    const submit = await findByText("Iniciar Sesión");
    await act(async () => {
      fireEvent.submit(submit);
    });
  });

  test("Debería mostrar mensajes de error al no ingresar datos solicitados", async () => {
    const { findByText } = render(<Login />);
    const submit = await findByText("Iniciar Sesión");
    await act(async () => {
      fireEvent.submit(submit);
      await findByText("Ingresa tu correo");
      await findByText("Ingresa tu clave");
    });
  });
});

describe("Debería llamar a la función de registrar en el Registro", () => {
  test("Debería validar que captura el clic en el boton Registrarse", async () => {
    const { findByText } = render(<Register />);
    await act(async () => {
      fireEvent.submit(await findByText("Registrarse"));
    });
  });
  test("Debería mostrar mensajes de error al no ingresar un correo electrónico", async () => {
    const { findByText } = render(<Register />);
    const submit = await findByText("Registrarse");
    await act(async () => {
      fireEvent.submit(submit);
      await findByText("Ingresa tu correo");
    });
  });
});

describe("Debería llamar a la función de recuperar contraseña en Recuperar ", () => {
  test("Debería validar que captura el clic en el boton Enviar", async () => {
    const { findByText } = render(<Recover />);
    const submit = await findByText("Enviar");
    await act(async () => {
      fireEvent.submit(submit);
    });
  });

  test("Debería mostrar mensajes de error al no ingresar un correo electrónico", async () => {
    const { findByText } = render(<Recover />);
    const submit = await findByText("Enviar");
    await act(async () => {
      fireEvent.submit(submit);
      await findByText("Ingresa tu correo");
    });
  });
});
