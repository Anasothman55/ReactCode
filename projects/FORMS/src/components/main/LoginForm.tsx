import {useForm} from "@tanstack/react-form";
import {facebook, google, login_left} from "../../assets";
import {Input} from "../helper/Input.tsx";

interface FormField {
  email: string
  password: string
}

const defaultFormField: FormField = {
  email: "",
  password: "",
}

export const LoginForm = () => {
  const form = useForm({
    defaultValues: defaultFormField,
    onSubmit: async ({value}) => {
      console.log(value)
    }
  })

  return (
    <div className={"flex items-center h-screen overflow-auto"}>
      <div className="relative h-full flex-[25%] shrink-0 overflow-hidden max-xl:hidden">
        <div className="h-full">
          <img className={"rotate-45 h-full object-contain scale-350 "} alt={"left img"} src={login_left}/>
        </div>
      </div>
      <div className={'flex-[75%] xl:ml-30 '}>
        <div className={"max-w-137.5  max-xl:mx-auto flex flex-col"}>
          <div className={"flex flex-col mb-10 items-center"}>
            <div className={"bg-[#D9D9D9] rounded-[20px] w-14 h-11"}></div>
            <h1 className={"mt-7.5 mb-5 font-bold text-[30px]"}>Welcome Back to AceBlog</h1>
            <p className={"text-[#BABABA] text-[16px]"}>Enter your Email and password to continue</p>
          </div>
          <form  onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}>
            <div>
              <form.Field
                name="email"
                validators={{
                  onChange: ({value}) =>
                    !value ? "required" : value.length < 3 ? "More than 3" : undefined
                }}
              >
                {(field) => {
                  return <Input label={"Email"} field={field} placeholder={"example@..."}/>
                }}
              </form.Field>
            </div>
            <div className={"mt-5"}>
              <form.Field
                name="password"
                validators={{
                  onChange: ({value}) =>
                    !value ? "required" :  undefined
                }}
              >
                {(field) => {
                  return <Input label={"Password"} field={field} placeholder={"Enter your password"}/>
                }}
              </form.Field>
            </div>
            <div className={"mt-5 flex justify-between items-center mb-10"}>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  className="
                    appearance-none
                    h-5 w-5
                    rounded
                    border-2 border-[#D9D9D9]
                    cursor-pointer
                    checked:bg-blue-500
                    checked:border-blue-500
                    relative
                    checked:after:content-['✓']
                    checked:after:absolute
                    checked:after:text-white
                    checked:after:text-sm
                    checked:after:font-bold
                    checked:after:left-1/2
                    checked:after:top-1/2
                    checked:after:-translate-x-1/2
                    checked:after:-translate-y-1/2
                  "
                />

                <span className="text-[16px] text-[#BABABA] font-medium">
                  Remember me
                </span>
              </label>
              <a  href={"/"} className={'text-[16px] '}>Forgot password</a>
            </div>
            <button className={"bg-[#1C1F26] w-full text-white text-[16px] px-3.75 py-2.5 rounded-[5px] cursor-pointer"} type={"submit"}>Sign In</button>
          </form>

          <div className={"flex items-center mt-5 gap-7.5 mb-5"}>
            <hr className={'flex-1 text-[#D9D9D9]'}/>
            <p className={"text-[#BABABA] text-[16px] whitespace-nowrap"}>
              Or Sign In with
            </p>
            <hr className={'flex-1 text-[#D9D9D9]'}/>
          </div>
          <div className={'flex justify-between gap-5 items-center mb-7.5'}>
            <button className={'w-full flex items-center cursor-pointer justify-center gap-2.5 border border-[#D9D9D9] rounded-[5px] px-3.75 py-2.5'}>
              <img className={"h-7.5 w-7.5"} src={google} alt={'google'} />
              <p className={" text-[16px] "}>Google</p>
            </button>
            <button className={'w-full flex items-center cursor-pointer justify-center gap-2.5 border border-[#D9D9D9] rounded-[5px] px-3.75 py-2.5'}>
              <img className={"h-7.5 w-7.5"} src={facebook} alt={'facebook'} />
              <p className={" text-[16px] "}>Facebook</p>
            </button>
          </div>
          <p className={"text-[#BABABA] text-[16px] text-center"}>
            Don’t have an account?  <span className={'text-black'}>Register</span>
          </p>
        </div>

      </div>
    </div>
  )
}