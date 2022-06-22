import React, {ButtonHTMLAttributes} from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
}

export const Button = ({children, ...props}: ButtonProps) => {
  return (
    <button className='inline-block cursor-pointer min-w-[128px] m-0 px-3.5 py-2.5 bg-cyan-500 border-teal-500 text-white text-sm font-normal text-center whitespace-nowrap align-middle rounded transition-colors ease-in-out duration-150 hover:bg-cyan-400 hover:border-teal-400 active:bg-cyan-600 active:border-teal-600 disabled:bg-cyan-300 disabled:border-teal-300' {...props} >
      {children}
    </button>
  )
}
