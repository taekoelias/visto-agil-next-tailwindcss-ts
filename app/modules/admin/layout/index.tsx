import React, { useState } from 'react'
import { AdminContent } from '../components/AdminContent'
import { AdminHeader } from '../components/AdminHeader'
import { AdminSidebar } from '../components/AdminSidebar'

export interface AdminLayoutProps {
  children : React.ReactNode;
}

export const AdminLayout = ({children} : AdminLayoutProps) => {
  const [sidebarExpanded,setSidebarExpanded] = useState(true);

  const toggleSidebarExpanded = () => {
    setSidebarExpanded(!sidebarExpanded)
  }
  return (
    <>
      <AdminHeader 
        sidebarExpanded={sidebarExpanded} 
        toggleSidebarExpanded={toggleSidebarExpanded}/>
      <AdminSidebar 
        sidebarExpanded={sidebarExpanded}/>
      <AdminContent
        sidebarExpanded={sidebarExpanded}>
        {children}
      </AdminContent>
    </>
  )
}
