import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function AppHeader() {
  return (
    <div className='flex justify-between border shadow p-3'>
      <SidebarTrigger />
      <UserButton />
    </div>
  )
}

export default AppHeader
