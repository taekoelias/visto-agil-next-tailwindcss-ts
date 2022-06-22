import { Listbox, Transition } from '@headlessui/react';
import React from 'react'

export type OptionData = {
  id: number;
  value: string;
  text: string;
}

export interface SelectItemProps {
  label: string;
  value: OptionData;
  onChange: (value: OptionData) => void;
  items: Array<OptionData>;
  errors?: string[] | null;
}

export const SelectItem = ({label, items, value, onChange} : SelectItemProps) => {
  
  return (
    <Listbox as="div" className="mb-4" value={value} onChange={onChange}>
      {({open}) => (
        <>
          <Listbox.Label className='inline-block text-sm mb-2'>
            {label}
          </Listbox.Label>
          <div className='relative'>
            <span className='inline-block w-full'>
              <Listbox.Button className='relative shadow-sm text-sm text-left w-full px-4 py-2 text-zinc-800 bg-white border border-zinc-400 rounded overflow-visible transition-colors ease-in-out duration-150 focus:border-cyan-500 focus:ring-0 focus:outline-none focus:shadow-outline-cyan'>
                {value.text}
              </Listbox.Button>
            </span>
            <Transition
                show={open}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
              <Listbox.Options 
                static
                className='absolute w-full border border-gray-400 rounded mt-1 bg-white z-10'>
                {items.map(item => (
                  <Listbox.Option 
                    key={item.id}
                    value={item.value}
                  >
                    {({ selected, active}) => (
                      <div className={`${active ? 'text-zinc-800 bg-slate-200' : 'text-zinc-800'} cursor-default select-none relative py-2 pl-10 pr-4`}>
                        <span className={`${selected ? 'font-semibold' : 'font-normal'}`}>
                          {item.text}
                        </span>

                        {selected && (
                          <span
                            className={`${
                              active ? "text-zinc-600" : "text-slate-200"
                            } absolute inset-y-0 left-0 flex items-center pl-2`}
                          >
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
