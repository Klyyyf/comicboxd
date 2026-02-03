"use client";

import { useRouter } from "next/navigation";
import FormInput from "../FormInput";
import { useState } from "react";
import { authService } from "@/src/services/authService";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
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
      await authService.register(formData);

      router.push("/login");
    } catch (err: any) {
      console.error(err);

      setError(err.response?.data?.message || "Erro ao criar conta.");
    }
  };

  return (
    <div className="flex items-center flex-col   gap-8 ">
      <h1 className="text-3xl font-bold mt-8">Preencha seus dados</h1>
      <form
        className="flex-col flex gap-4  w-full max-w-md"
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
          label="Nome de usuário"
          name="username"
          type="text"
          placeholder="Seu usuário"
          value={formData.username}
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
          className="bg-green-600 py-2 px-6 hover:bg-green-700 rounded-2xl w-40 mx-auto cursor-pointer mt-8"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}
