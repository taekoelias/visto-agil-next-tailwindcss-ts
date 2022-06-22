import React from 'react'

export interface CardProps {
  children: React.ReactNode;
}

export interface CardHeaderProps {
  children: React.ReactNode;
}

export interface CardBodyProps {
  children: React.ReactNode;
}

const CardHeader = ({children} : CardHeaderProps) => {
  return (
    <div className='p-4 mb-0 bg-white border-b-0 rounded-sm'>
      {children}
    </div>
  )
}

const CardBody = ({children} : CardBodyProps) => {
  return (
    <div className='flex-grow flex-shrink basis-auto p-4'>
      {children}
    </div>
  )
}

const Card = ({children}: CardProps) => {
  return (
    <div className='relative flex flex-col min-w-0 bg-white mb-7 border-none rounded-none shadow-lg'>
      {children}
    </div>
  )
}

export {Card, CardBody, CardHeader}