import React from 'react'

export interface AdminContentProps {
  sidebarExpanded: boolean;
  header?: React.ReactNode;
  children: React.ReactNode;
}

export const AdminContent = ({sidebarExpanded, header, children}: AdminContentProps) => {
  return (
    <div className={`font-serif relative min-h-[calc(100%-32px)] pt-16 ml-0 md:ml-60 overflow-hidden transition-all duration-300}`}>
      <div className='p-4'>
        <div className='flex flex-wrap -mx-4'>
          {header}
        </div>
        <div className=''>
          {children}
        </div>
      </div>
    </div>
  )
}
