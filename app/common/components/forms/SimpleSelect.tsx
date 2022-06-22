import React from 'react'

export type ItemSelect<T> = {
  key: string|number;
  value: T;
  text: string;
  disabled?: boolean;
}

export interface InputTextProps<T> extends  React.HTMLProps<HTMLSelectElement> {
  label: string;
  items: Array<ItemSelect<T>>;
  errors?: string[] | null;
}

export const SimpleSelect = ({label, items, errors, ...props} : InputTextProps<any>) => {
  return (
    <fieldset className="mb-4">
      <label className="inline-block text-sm mb-2">{label}</label>
      <select className={`${errors ? 'border-rose-600 ring-1 ring-rose-600' : ''} block text-sm w-full px-4 py-2 text-zinc-800 bg-white border-zinc-400 rounded overflow-visible transition-colors ease-in-out duration-150 focus:border-cyan-500 focus:ring-0 focus:outline-0 shadow-none`} {...props} >
        {items.map(item => (
          <option className="" 
            key={item.key}
            value={item.value}
            disabled={item.disabled ? true : false}
          >
            {item.text}
          </option>
        ))}
      </select>
      {errors && errors.map((error,i) => {
        return (<p key={i} className='text-xs text-rose-600'>{error}</p>)
      })}
    </fieldset>
  )
}
