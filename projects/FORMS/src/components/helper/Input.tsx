import type {AnyFieldApi} from "@tanstack/react-form";

interface InputProps {
  label: string
  placeholder?: string
  field: AnyFieldApi
}

export const Input = ({label, placeholder, field}: InputProps) => {
  return (
    <div className={"flex flex-col"}>
      <label
        className={"text-[20px] font-medium mb-2.5"}
        htmlFor={field.name}
      >
        {label}
      </label>
      <input
        type="text"
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        className={"text-[16px] px-3.75 py-2.5 border border-[#D9D9D9] rounded-[5px] outline-none "}
      />
    </div>
  );
};

