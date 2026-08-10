import type {AnyFieldApi} from "@tanstack/react-form";

interface InputProps 
extends React.InputHTMLAttributes<HTMLInputElement>
{
  label: string
  placeholder?: string
  field: AnyFieldApi
}

export const Input = ({label, placeholder, field, ...attr}: InputProps) => {
  const {isTouched, isValid, errors} = field.state.meta
  const showErrors = (isTouched && !isValid)

  return (
    <div className={"flex flex-col"}>
      <label
        className={"text-[20px] font-medium mb-2.5"}
        htmlFor={field.name}
      >
        {label}
      </label>
      <input
        {...attr}
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => {
          field.setMeta((prev) => ({ ...prev, errorMap: {} , errorSourceMap: {}, errors: [],}));
          field.handleChange(e.target.value)
        }}
        placeholder={placeholder}
        className={"text-[16px] px-3.75 py-2.5 border border-[#D9D9D9] rounded-[5px] outline-none "}
      />
      {
        showErrors && <ul className="mt-2.5">
          {errors.map((e) => <li key={e} className="text-rose-600 text-[16px] ml-3.75">
            {e}
          </li> )}
        </ul>
      }
    </div>
  );
};

