import Link from 'next/link'
import { Stack } from 'phosphor-react'
import React from 'react'

export const PublicHeader = () => {

  return (
    <nav className='flex z-10'>
      <div className='w-full py-4 flex justify-center bg-slate-600 border-b border-slate-800'>
        <Stack size={24} className='text-slate-100' />
        <h1 className='text-slate-100 text-2xl leading-5 tracking-wider font-medium'>
          VistoAgil
        </h1>
      </div>
      <div className='absolute w-full flex py-2 pr-4 justify-end'>
        <Link href="/admin" >
          <a className='py-2 px-4 border border-slate-300 rounded text-slate-300 hover:text-slate-200'>
            <span>Entrar</span>
          </a>
        </Link>
      </div>
    </nav>
  )
}
