import FormInput from "../FormInput";

export default function RegisterForm() {
  return (
    <div className="flex items-center flex-col   gap-8 ">
      <h1 className="text-3xl font-bold mt-8">Preencha seus dados</h1>
      <form action="" className="flex-col flex gap-4  w-full max-w-md">
        <FormInput name="Email" type="text" />
        <FormInput name="Username" type="text" />
        <FormInput name="Senha" type="password" />
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
