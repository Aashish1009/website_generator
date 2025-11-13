import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { SignInButton } from '@clerk/nextjs'


const menuOptions = [{
    name:"Pricing",
    path:"/pricing"
},{
    name:"Contact us",
    path:"/contact-us"
}]
const Header = () => {
  return (
    <div className='flex justify-between items-center p-2 shadow-lg'>
      <div className='flex items-center gap-2'>
        <Image src={"./logo.svg"} alt='logo' width={35} height={35} />
        <h1 className='font-bold'>AI Website Generator</h1>
      </div>
      <div className='flex gap-3'>
        {menuOptions.map((option)=>(
            <Button key={option.name} variant={"ghost"} className='text-xl'>
                {option.name}
            </Button>
        ))}
      </div>
      <div>
        <SignInButton mode='modal' forceRedirectUrl={"/workspace"}>
          <Button >
            Get Started
        </Button>
        </SignInButton>

      </div>
    </div>
  )
}

export default Header
