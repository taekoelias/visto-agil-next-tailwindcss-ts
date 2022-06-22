import { Disclosure, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CaretRight } from 'phosphor-react';
import React from 'react';
import { Url } from 'url';

export interface MenuSidebarProps {
  title: string;
  children: React.ReactNode;
}

export interface ItemMenuSidebarProps {
  title: string;
  icon?: React.ReactNode;
  link: string | Url
}

export interface ItemGroupMenuSidebarProps {
  title: string;
  icon?: JSX.Element;
  baseUrl: string;
  children: React.ReactNode;
}

const MenuSidebar = ({title, children} : MenuSidebarProps) => {
  return (
    <ul className='list-none w-full'>
      <li className='px-5 pt-5 pb-2 border-l-4 border-transparent font-serif text-sm uppercase relative whitespace-nowrap'>
        <span className='font-medium text-slate-800'>
          {title}
        </span>
      </li>
      {children}
    </ul>
  )
}
const ItemMenuSidebar = ({title, icon, link} : ItemMenuSidebarProps) => {
  const router = useRouter();

  return (
    <Disclosure as="li" className='font-serif text-sm relative whitespace-nowrap'>
      <Link href={link}>
        <Disclosure.Button className={`${router.pathname == link ? 'bg-zinc-100' : ''} border-l-4 border-transparent w-full inline-block text-zinc-800 pl-5 pr-3 py-3 hover:bg-zinc-100`}>
          <a>
            {icon}
            <span className='float-left text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300' >
                {title}
            </span>
          </a>
        </Disclosure.Button>
      </Link>
    </Disclosure>
  )
}

const ItemGroupMenuSidebar = ({title, icon, baseUrl, children} : ItemGroupMenuSidebarProps) => {
  const router = useRouter();
  
  return (
    <Disclosure as="li" className='font-serif text-sm relative whitespace-nowrap'>
      {({open}) => (
        <>
          <Disclosure.Button className={`${router.pathname.includes(baseUrl) ? 'bg-zinc-100' : ''} border-l-4 ${open ? 'border-cyan-500 bg-zinc-100' : 'border-transparent' } w-full inline-block pl-5 pr-3 py-3 text-zinc-800 hover:bg-zinc-100`}>
            {icon}
            <span className='float-left text-ellipsis overflow-hidden whitespace-nowrap transition-all duration-300' >
              {title}
            </span>
            <CaretRight className={`my-1 text-sm float-right ${open ? 'transform rotate-90' : ''}`} />
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0">
            <Disclosure.Panel as='ul' className={`font-serif text-sm text-zinc-800 border-l-4 ${open ? 'border-cyan-500' : 'border-transparent' } text-gray-500`}>
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
      
    </Disclosure>
  )
}

export {MenuSidebar,ItemMenuSidebar, ItemGroupMenuSidebar}