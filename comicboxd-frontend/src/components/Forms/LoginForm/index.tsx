"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "nookies";
import FormInput from "../FormInput";
import { authService } from "@/src/services/authService";
import Link from "next/link";
import { toast } from "react-toastify";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      toast.error("Email ou senha incorretos");
    }
  };

  return (
    <div className="flex items-center flex-col gap-8 w-full">
      <h1 className="text-3xl font-bold mt-8">Acesse sua conta</h1>

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
        <div className="flex justify-between text-sm text-gray-400">
          <button
            type="button"
            className="hover:underline hover:text-gray-200 transition"
          >
            Esqueceu a senha?
          </button>

          <p>
            Não tem uma conta?{" "}
            <Link href={"/register"}>
              <span className="text-gray-200 font-semibold hover:underline cursor-pointer">
                Cadastre-se
              </span>
            </Link>
          </p>
        </div>

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
