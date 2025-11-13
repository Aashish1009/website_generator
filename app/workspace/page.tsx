import Hero from '@/components/Hero'
import { SidebarProvider } from '@/components/ui/sidebar'

import { AppSidebar } from '../../components/AppSidebar'
import AppHeader from '../../components/AppHeader'

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
