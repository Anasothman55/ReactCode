import React from 'react'
import { extend } from 'zod/mini'

interface ButtonProps
extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
  children: React.ReactNode
  textOnly?: boolean 
}

export const Button = ({
  children,
  className, 
  textOnly=false,
  ...attr
}: ButtonProps) => {
  let cssClass = textOnly ? 'text-button' : 'button'
  cssClass = `${cssClass} ${className}`

  return (
    <button className={cssClass} {...attr}>{children}</button>
  )
}

