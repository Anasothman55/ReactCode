

import type { AnyFieldApi } from "@tanstack/react-form";


interface InputProps 
extends React.InputHTMLAttributes<HTMLInputElement>
{
  label: string
  placeholder?: string
  field: AnyFieldApi
}

const Input = ({label, placeholder, field, className, ...attr}: InputProps) => {
  const {isTouched, isValid, errors} = field.state.meta
  const showErrors = (isTouched && !isValid)
  
  return (
    <div className="flex justify-start flex-col gap-2">
      <label htmlFor={field.name}>{label}</label>
      <input 
        className={`text-[16px] px-3 w-full py-1.5 border border-[#ffc404] rounded-[5px] outline-none ${className ?? ''}`} {...attr}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => {
          field.setMeta((prev) => ({ ...prev, errorMap: {} , errorSourceMap: {}, errors: [],}));
          field.handleChange(e.target.value)
        }}
        placeholder={placeholder}
      />
      {
        showErrors && <ul className="mt-2.5">
          {errors.map((e) => <li key={e} className="text-rose-600 text-[16px] ml-3.75">
            • {e}
          </li> )}
        </ul>
      }
    </div>
  );
};

export default Input;