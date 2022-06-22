import React from 'react'

export interface InputFileProps extends  React.HTMLProps<HTMLInputElement> {
  label?: string;
  errors?: string[] | null;
}

export const InputFile = ({label, errors, ...props} : InputFileProps) => {
  return (
    <fieldset className="mb-4">
      {label && <label className="inline-block text-sm mb-2">{label}</label>}
      <input className={`${errors ? 'border-rose-600 ring-1 ring-rose-600' : ''} block text-sm w-full px-4 py-2 text-zinc-800 bg-white border-zinc-400 rounded overflow-visible transition-colors ease-in-out duration-150 focus:border-cyan-500 focus:ring-0 focus:outline-0 shadow-none`} type='file' {...props} />
      {errors && errors.map((error,i) => {
        return (<p key={i} className='text-xs text-rose-600'>{error}</p>)
      })}
    </fieldset>
  )
}
