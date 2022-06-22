import { Popover } from '@headlessui/react'
import { MagnifyingGlass } from 'phosphor-react'
import React, { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {

}

const InputSearch = ({placeholder = 'Pesquisar', ...props}: Props) => {
  return (
    <Popover>
      <Popover.Button className='text-slate-800 block float-left pt-6 pb-4 px-4 bg-transparent cursor-pointer'>
        <MagnifyingGlass weight='bold' className='text-xl mr-1 self-center md:text-white' />
      </Popover.Button>
      <Popover.Panel as='div' className='float-left pt-4 w-40'>
        <input 
          {...props}
          type="text" 
          placeholder={placeholder} 
          className='placeholder-zinc-500 md:placeholder-zinc-400 text-zinc-700  md:text-zinc-200 text-sm border-0 border-b border-zinc-500 bg-transparent w-40 px-2.5 pt-2 pb-1 m-0 z-[1] -top-3 overflow-hidden outline-none focus:outline-none focus:ring-0 focus:border-zinc-700 focus:md:border-zinc-400'
        />
      </Popover.Panel>
    </Popover>
  )
}

export default InputSearch