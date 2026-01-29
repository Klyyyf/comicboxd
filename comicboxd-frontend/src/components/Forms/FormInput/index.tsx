type RegisterInputProps = {
  name: string;
  type: string;
};

export default function FormInput({ name, type }: RegisterInputProps) {
  return (
    <>
      <label htmlFor="">{name}</label>
      <input
        type={type}
        className="bg-slate-300 px-8 pl-3 py-2 rounded-lg w-md text-gray-700"
      />
    </>
  );
}
