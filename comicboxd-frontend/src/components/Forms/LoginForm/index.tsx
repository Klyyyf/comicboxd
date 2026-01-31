"use client"; // <--- 1. OBRIGATÓRIO no App Router

// 2. Mude o import para navigation
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "nookies";
import FormInput from "../FormInput";
import { authService } from "@/src/services/authService";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await authService.login(formData);

      const { accessToken, roles } = response;

      if (!accessToken) {
        throw new Error("Token não recebido");
      }

      setCookie(null, "comicboxd.token", accessToken, {
        maxAge: 86400,
        path: "/",
      });

      const isAdmin = roles?.includes("ROLE_ADMIN") || roles?.includes("ADMIN");

      window.location.href = isAdmin ? "/admin" : "/feed";
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Email ou senha incorretos.");
    }
  };

  return (
    <div className="flex items-center flex-col gap-8 w-full">
      <h1 className="text-3xl font-bold mt-8">Acesse sua conta</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md w-full max-w-md text-center">
          {error}
        </div>
      )}

      <form
        className="flex flex-col gap-4 w-full max-w-md px-4"
        onSubmit={handleSubmit}
      >
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="exemplo@email.com"
          value={formData.email}
          onChange={handleChange}
        />

        <FormInput
          label="Senha"
          name="password"
          type="password"
          placeholder="********"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-green-600 py-3 px-6 hover:bg-green-700 text-white font-bold rounded-2xl w-40 mx-auto cursor-pointer mt-6 transition-colors"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
