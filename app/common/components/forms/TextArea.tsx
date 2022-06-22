import React from 'react'
import { ItemLabel } from './ItemLabel';

export interface TextAreaProps extends  React.HTMLProps<HTMLTextAreaElement> {
  label: string;
  errors?: string[] | null;
}

export const TextArea = ({label, errors, ...props} : TextAreaProps) => {
  return (
    <ItemLabel label={label}>
      <textarea className={`${errors ? 'border-rose-600 ring-1 ring-rose-600' : ''} resize-none block text-sm w-full px-4 py-2 text-zinc-800 bg-white border-zinc-400 rounded overflow-visible transition-colors ease-in-out duration-150 focus:border-cyan-500 focus:ring-0 focus:outline-0 shadow-none`} {...props} />
      {errors && errors.map((error,i) => {
        return (<p key={i} className='text-xs text-rose-600'>{error}</p>)
      })}
    </ItemLabel>
  )
}
