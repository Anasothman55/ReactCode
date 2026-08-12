import React, { forwardRef, useEffect, useRef } from 'react'

interface ButtonProps {
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({children}, ref) => {
    return <button className='text-red-700' ref={ref}>
      {children}
    </button>
  }
)



export const ForwardRef = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    buttonRef.current?.addEventListener('click', () => {
      console.log("event")
    })
  },[])
  
  

  return (
    <>
      <Button ref={buttonRef}>
        Click me
      </Button>
    </>
  )
}
