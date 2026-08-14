import {Modal} from "./ui/Modal.tsx";
import { useCart, type ItemsType} from "../store/cartContext.tsx";
import {Button} from "./ui/Button.tsx";
import {useUserProgress} from "../store/UserProgresContext.tsx";
import {useForm} from "@tanstack/react-form";
import Input from "./ui/Input.tsx";
import { useRef, useState } from "react";


interface FormType {
  email: string
  name: string
  city: string
  street: string
  postal_code: number
}

const formDefault :FormType  = {
  email: '',
  name: '',
  city: '',
  street: '',
  postal_code: 0,
}

const server = "http://10.141.45.191:8000/orders"

const Chekout = () => {
  const [isPosting, setIsPosting] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const {items, resetItem} = useCart()
  const {progress, hideCheckout} = useUserProgress()
  
  const [formKey, setFormKey] = useState(0)
  const cartTotal = items.reduce((acum, i) => {
    return acum + (Number(i.price) * i.quantity)
  },0)

  const form = useForm({
    defaultValues: formDefault,
    onSubmit: async({value}) => {
      setIsPosting(true)

      try {
        setError('')
        const res = await fetch(server, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...value,
            items: items
          })
        })
          
        if (!res.ok) {
          
          let message = `Request failed with status ${res.status}`;
          try {
            const errBody = await res.json();
            console.log(errBody)
            message = errBody.message ?? message;
          } catch {
            message = res.statusText || message;
          }
          setError(message);
          return;
        }
        
        const meals = await res.json()

        resetItem()
        hideCheckout()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsPosting(false)
      }
    }
  })

  return (
    <Modal key={formKey} openDialog={progress === "checkout"}>
      <form
        
        noValidate
        onSubmit={async (e)=> {
          e.preventDefault()
          e.stopPropagation()

          await form.validateAllFields('submit')
          await form.validateAllFields('submit')
          
          await form.handleSubmit()
      }}>
        <h2>Checkout</h2>
        <p className="mb-2.5">Total Amount: {cartTotal}</p>

        <form.Field 
          name="email"
          validators={{
            onBlur: ({value}) => 
              !value.trim() ? "Email is required" 
                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Please enter a valid email" 
                : undefined,
          }}
        >
          {(filed) => <Input type="email" label="Email" field={filed} placeholder="...@example.com" />}
        </form.Field>
        <form.Field
          name="name"
          validators={{
            onBlur: ({ value }) =>
              !value.trim() ? "Name is required" : undefined,
          }}
        >
          {(field) => (<Input type="text" label="Name" field={field} placeholder="Your name"/>)}
        </form.Field>

        <form.Field
          name="city"
          validators={{
            onBlur: ({ value }) =>
              !value.trim() ? "City is required" : undefined,
          }}
        >
          {(field) => ( <Input type="text" label="City" field={field} placeholder="Your city"/>)}
        </form.Field>

        <form.Field
          name="street"
          validators={{
            onBlur: ({ value }) =>
              !value.trim() ? "Street is required" : undefined,
          }}
        >
          {(field) => (<Input type="text" label="Street" field={field} placeholder="Your street"/> )}
        </form.Field>

        <form.Field
          name="postal_code"
          validators={{
            onBlur: ({ value }) =>
              value === 0 ? "Postal code is required" : undefined,
          }}
        >
          {(field) => (<Input type="number" label="Postal Code" field={field} placeholder="Postal code"/> )}
        </form.Field>
        <p className={"modal-actions mt-2.5"}>
          {
            !isPosting && <Button onMouseDown={(e) => e.preventDefault()} disabled={isPosting} onClick={() => {
              form.reset()
              hideCheckout()
              setFormKey(p=> p+1)
            }} type={"button"}>Close</Button>
          }
          <Button  disabled={isPosting} type={"submit"}>{isPosting? "Loading..." : "Submit Checkout"}</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Chekout;