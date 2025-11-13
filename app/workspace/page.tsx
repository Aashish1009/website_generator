import Hero from '@/components/Hero'
import { SidebarProvider } from '@/components/ui/sidebar'

import { AppSidebar } from './AppSidebar'
import AppHeader from './AppHeader'

const page = () => {
  return (
     <SidebarProvider>
        <AppSidebar />
    <div className='w-full'>
        <AppHeader/>
      <Hero />
    </div>
    </SidebarProvider>
  )
}

export default page
