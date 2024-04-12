import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { setItemToLocalStorage } from "../utils/LocalStorageUtil";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7039/api/User/Login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("nombre", response.data.data.nombre);
      localStorage.setItem("email", response.data.data.email);
      localStorage.setItem("id", response.data.data.id);

      console.log("Respuesta del servidor:", response.data);
      router.replace("/inicio");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  function handleFormSubmit(event: { preventDefault: () => void }) {
    event.preventDefault(); // Evita la recarga de la página
    handleLogin();
  }
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="global__background"></div>
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <form onSubmit={handleFormSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Ingresar
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          No tienes cuenta?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 hover:underline"
          >
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  );
}
