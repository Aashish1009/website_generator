"use client";

import Image from 'next/image'
import React, { use } from 'react'
import { Button } from './ui/button'
import { SignInButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'


const menuOptions = [{
    name:"Pricing",
    path:"/pricing"
},{
    name:"Contact us",
    path:"/contact-us"
}]
const Header = () => {

  const {user}  = useUser();
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
       {!user ?  <SignInButton mode='modal' forceRedirectUrl={"/workspace"}> 
          <Button >
            Get Started
        </Button>
        </SignInButton>:
        <Link href={"/workspace"}>
          <Button>
            Go to Workspace
          </Button>
        </Link>}

      </div>
    </div>
  )
}

export default Header
