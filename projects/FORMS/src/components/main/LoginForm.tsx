import {useForm, useSelector,} from "@tanstack/react-form";
import {facebook, google, login_left} from "../../assets";
import {Input} from "../helper/Input.tsx";
import { Button } from "../helper/Button.tsx";
import { SocialButton } from "../helper/SocialButton.tsx";


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

  const formState = useSelector(form.store, (s) => s)
  console.log(formState)
 
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
          <form
            noValidate
            onSubmit={async (e) => {
              e.preventDefault()
              e.stopPropagation()

              // Force the store to fully reconcile every field's errorMap
              // before handleSubmit's own internal validateAllFields pass runs.
              // This is what actually fixes the "sibling field errors missing
              // after one field was touched" bug — see TanStack/form#1874.
              await form.validateAllFields('submit')

              form.handleSubmit()
            }}
          >
            <div>  
              <form.Field
                name="email"
                validators={{
                  
                  onBlurAsync: ({value}) =>
                    !value ? "required" : value.length < 3 ? "More than 3" : !value.includes("@") ? "Valide email" : undefined,
                }}
              >
                {(field) => {
                  return <Input type="email" label={"Email"} field={field} placeholder={"example@..."}/>
                }}
              </form.Field>
            </div>
            <div className={"mt-5"}>
              <form.Field
                name="password"
                validators={{
                  onBlurAsync: ({value}) =>
                    !value ? "required" :  undefined
                }}
              >
                {(field) => {
                  return <Input type="password" label={"Password"} field={field} placeholder={"Enter your password"}/>
                }}
              </form.Field>
            </div>
            <div className={"mt-5 flex justify-between items-center mb-10"}>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input type="checkbox" className="CheckBox"/>

                <span className="text-[16px] text-[#BABABA] font-medium select-none">
                  Remember me
                </span>
              </label>
              <a  href={"/"} className={'text-[16px] '}>Forgot password</a>
            </div>
            <Button type="submit" title="Sign In"/>
            <Button className="mt-2.5" type="reset" title="Reset" onClick={() => {form.reset()}} variant="outline"/>
          </form>

          <div className={"flex items-center mt-5 gap-7.5 mb-5"}>
            <hr className={'flex-1 text-[#D9D9D9]'}/>
            <p className={"text-[#BABABA] text-[16px] whitespace-nowrap"}>
              Or Sign In with
            </p>
            <hr className={'flex-1 text-[#D9D9D9]'}/>
          </div>
          <div className={'flex justify-between gap-5 items-center mb-7.5'}>
            <SocialButton  src={google} alt={'google'} paragraph="Google"/>
            <SocialButton  src={facebook} alt={'facebook'} paragraph="Facebook"/>

          </div>
          <p className={"text-[#BABABA] text-[16px] text-center"}>
            Don’t have an account?  <span className={'text-black'}>Register</span>
          </p>
        </div>

      </div>
    </div>
  )
}