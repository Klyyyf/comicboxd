import { ChangeEvent } from "react";

type RegisterInputProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function FormInput({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}: RegisterInputProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor={name} className="text-gray-700 font-medium ml-1">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="bg-slate-300 px-4 py-2 rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}
