import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps 
extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  variant?: "outline" | undefined
}

export const Button = ({title, className, variant, ...attr}:ButtonProps) => {

  const outlineStyle: string = "bg-transparent text-[#1C1F26] border border-[#1C1F26]"
  const normalStyle = "bg-[#1C1F26] text-white"

  return (
    <button 
      {...attr}
      className={`
        w-full 
        text-[16px] 
        px-3.75 
        py-2.5 
        rounded-[5px] 
        cursor-pointer
        ${variant === "outline" ? outlineStyle : normalStyle}
        ${className ?? ""}
      `} 
    >{title}</button>
  )
}
