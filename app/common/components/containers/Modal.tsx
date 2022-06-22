import React, { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from '../elements/Button'
import Box from '../elements/Box'

export interface ModalProps {
  trigger: React.ReactNode
  title?: string
  description?: string
  children: React.ReactNode
}

export const Modal = ({title, description, children, trigger} : ModalProps) => {
  const [isOpen,setIsOpen] = useState(false);

  return (
    <>
      <a className='flex' onClick={()=>setIsOpen(true)}>
        {trigger}
      </a>
      <Transition
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Dialog 
          open={isOpen} 
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto">
            <div className="flex flex-col py-8 px-4 text-center">
              <Dialog.Overlay className="absolute inset-0 bg-black/30" />
              <Dialog.Panel className="z-20 mx-auto rounded bg-white">
                {title 
                  && <Dialog.Title className="text-lg">{title}</Dialog.Title>}
                {description 
                  && <Dialog.Description>{description}</Dialog.Description>}
                {children}
                <div className="py-2">
                  <Button type='button' onClick={() => setIsOpen(false)}>Fechar</Button>
                </div>
              </Dialog.Panel>
            </div>
        </Dialog>
      </Transition>
    </>
  )
}
