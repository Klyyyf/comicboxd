import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent } from "react";

interface AdminInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

interface AdminTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

export function AdminInput({ label, name, ...props }: AdminInputProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="text-slate-300">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        className="bg-slate-800 border-slate-700 focus:border-green-500 text-white placeholder:text-slate-500"
        {...props}
      />
    </div>
  );
}

export function AdminTextarea({ label, name, ...props }: AdminTextareaProps) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="text-slate-300">
        {label}
      </Label>
      <Textarea
        id={name}
        name={name}
        className="bg-slate-800 border-slate-700 focus:border-green-500 text-white min-h-[100px]"
        {...props}
      />
    </div>
  );
}
