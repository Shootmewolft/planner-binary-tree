import { forwardRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  type: string;
}

export const InputDialog = forwardRef<HTMLInputElement, Props>(
  ({ label, name, placeholder, type }, ref) => {
    return (
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={name} className="text-center">
          {label}
        </Label>
        <Input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          className="col-span-3"
          ref={ref}
        />
      </div>
    );
  }
);

InputDialog.displayName = "InputDialog";
