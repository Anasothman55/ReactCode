import React from 'react'

interface Props
extends React.InputHTMLAttributes<HTMLInputElement>
{
  paragraph: string
}


export const SocialButton = ({paragraph,...attr}:Props) => {
  return (
    <button className={'w-full flex items-center cursor-pointer justify-center gap-2.5 border border-[#D9D9D9] rounded-[5px] px-3.75 py-2.5'}>
      <img className={"h-7.5 w-7.5"} {...attr} />
      <p className={" text-[16px] "}>{paragraph}</p>
    </button>
  )
}
