import { Popover, Transition } from '@headlessui/react';
import { useSession, signOut } from 'next-auth/react';
import { Bell, CornersOut, DotsThreeVertical, EnvelopeSimple, List, Power, Stack, User } from 'phosphor-react'
import React, { useState } from 'react'
import InputSearch from './InputSearch'

export interface AdminHeaderProps {
  sidebarExpanded: boolean;
  toggleSidebarExpanded: () => void;
}

export const AdminHeader = ({sidebarExpanded, toggleSidebarExpanded} : AdminHeaderProps) => {
  
  const {data, status} = useSession();

  const [navbarExpanded,setNavbarExpanded] = useState(false);

  function toggleNavbarExpanded(){
    setNavbarExpanded(!navbarExpanded)
  }

  return (
    <nav className='absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center'>
      <div className='bg-slate-600 w-full min-h-[64px] mx-auto items-center flex justify-between md:flex-nowrap flex-wrap'>
        <div className={`bg-white w-full h-16 px-4 py-2 items-center justify-center relative transition-all duration-300 ${sidebarExpanded ? 'md:w-60' : 'md:w-60' }`}>
          <ul className='flex flex-row flex-wrap rounded pl-0 my-0 list-none '>
            <li className='mr-auto leading-4 md:hidden'>
              <a onClick={toggleSidebarExpanded} 
                className='text-slate-800 block top-0.5 relative py-2 px-0 bg-transparent cursor-pointer md:px-2'>
                <List className='h-8 w-8 mr-2 self-center' />
              </a>
            </li>
            <li className='ml-0 leading-4 md:w-60'>
              <a  
                className='absolute left-1/2 -translate-x-1/2 py-2 inline-block mr-4 text-xl leading-4 whitespace-nowrap cursor-pointer bg-transparent'>
                <Stack className='w-7 h-8 align-sub inline' />
                <h2 className={`${!sidebarExpanded && '' } text-slate-800 text-2xl leading-5 tracking-wider font-medium pl-2 mb-2 inline animate-brandTextAnimation`}>
                  VistoAgil
                </h2>
              </a>
            </li>
            <li className='leading-4 ml-0 md:hidden'>
                <a onClick={toggleNavbarExpanded}
                  className='block text-slate-800 pt-2.5 pb-2 px-0 bg-transparent md:px-2'>
                  <DotsThreeVertical weight='bold' className='h-8 w-8 self-center' />
                </a>
            </li>
          </ul>
        </div>

        <div className={`w-full relative table bg-white px-4 m-0 h-auto transition-all duration-300 md:bg-inherit md:block`}>
          <div className={`basis-full grow items-center ${navbarExpanded ? 'block' : 'hidden'} md:basis-auto md:flex`}>
            <ul className='flex flex-row flex-wrap rounded m-0 mr-auto pl-0 float-left list-none md:flex-row'>
              {/*
                Toggle sidebar quando layout ampliado

              <li className='hidden float-left leading-4 md:block'>
                <a onClick={toggleSidebarExpanded}
                  className='pt-6 pb-3 px-2 text-slate-800 block bg-transparent cursor-pointer md:px-2'>
                  <List className='h-6 w-6 mr-1 self-center md:text-white' />
                </a>
              </li>
              */}
              <li className='hidden float-left leading-4 ml-0 md:block'>
                <a className='pt-6 pb-4 px-4 text-slate-800 block bg-transparent cursor-pointer md:px-2'>
                  <CornersOut className='h-6 w-6 mr-1 self-center md:text-white' />
                </a>
              </li>
              <li className='float-left leading-4 ml-0'>
                <InputSearch />
              </li>
            </ul>

            <ul className='flex flex-row flex-wrap rounded float-right pl-0 list-none md:flex-row'>
              <li className='float-left leading-4 relative'>
                {/*
                <a className='pt-6 pb-2 px-1.5 text-slate-800 block bg-transparent cursor-pointer'>
                  <Globe className='mr-1 w-4 self-center relative inline-block md:text-white' />
                </a>
                <div className='absolute top-full right-0 left-0 z-[1000] min-w-[160px] py-2 px-0 m-0 text-base text-slate-800 text-left bg-white bg-clip-padding float-none w-auto max-h-96 overflow-x-hidden overflow-y-scroll border-zinc-400 rounded-b shadow-sm transition-all duration-200 ease-linear'>
                  <a className='w-auto py-2.5 px-5 block clear-both font-normal text-slate-800 text-inherit whitespace-nowrap bg-transparent border-0 cursor-pointer'>
                    Teste
                  </a>
                </div>
                */}
              </li>
              <li className='relative float-left leading-4 ml-0'>
                <a className='pt-5 pr-0 pb-4 pl-3.5 text-slate-800 leading-4 block bg-transparent cursor-pointer md:px-2'>
                  <Bell className='mr-1 text-lg self-center md:text-white' />
                </a>
              </li>
              <li className='relative float-left leading-4 ml-0'>
                <a className='pt-5 pr-0 pb-4 pl-3.5 text-slate-800 leading-4 block bg-transparent cursor-pointer md:px-2'>
                  <EnvelopeSimple className='mr-1 text-lg self-center md:text-white' />
                </a>
              </li>
              <Popover as='li' className='float-left ml-0 leading-4 relative'>
                <Popover.Button 
                  as='a'
                  className='py-3 px-2.5 text-slate-800 block leading-4 bg-transparent cursor-pointer md:px-2'>
                      {
                        data?.user?.image
                        ?
                        <img className='w-8 h-8 rounded-full object-cover' src={data?.user?.image as string} alt="" />
                        :
                        <span className='mr-2 p-1 relative inline-block w-8 max-h-8 whitespace-nowrap rounded-full align-bottom text-slate-800 bg-zinc-400 md:bg-zinc-200'>
                          <User className='h-full w-full text-zinc-100 self-center md:text-zinc-600' />
                        </span>
                      }
                </Popover.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Popover.Panel className='absolute block right-0 z-10 w-40 h-fit mt-1 p-2 bg-white border rounded-b shadow-md'>
                    <span className='text-sm'>
                      {data?.user?.name}
                    </span>
                    <a className='flex items-center gap-2 pt-2 border-t-2' 
                      href='#'
                      onClick={() => signOut()}>
                        <Power size={24}/>
                        <span className=''>Logout</span>
                    </a>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </ul>
          </div>
        </div>

        <div className='hidden lg:w-full mx-auto h-14 items-center justify-between md:flex-nowrap flex-wrap md:px-10 bg-inherit px-2 bg-gradient-to-r from-slate-600 to-slate-500 bg-repeat-x  transition-all duration-300'>
          <div className='flex basis-auto grow items-center'>
            <ul className='flex flex-row flex-wrap rounded float-left mr-auto my-0 pl-0 list-none'>
              
              <li className='leading-4 ml-0'>
                <InputSearch />
              </li>
            </ul>
            <ul className='flex flex-row flex-wrap rounded float-right my-0 pl-0 list-none'>
              <Popover as='li' className='relative leading-4'>
                <Popover.Button as='a' 
                    className='text-white block pt-3 pr-3 pb-3 pl-4 cursor-pointer'>
                  <List className='h-5 w-5 mr-2 self-center' />
                </Popover.Button>

                <Popover.Panel className='absolute z-10 w-40 bg-white'>
                  {data?.user?.name}
                </Popover.Panel>
              </Popover>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
