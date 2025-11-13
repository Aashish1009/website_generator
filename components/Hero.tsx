"use client";

import React, { useState } from 'react'
import { Button } from './ui/button'
import { ArrowUp, HomeIcon, ImagePlusIcon, Key, LayoutDashboard, User } from 'lucide-react'

const suggestions = [
  {
    label: 'Dashboard',
    prompt: 'Create an analytics dashboard to track customers and revenue data for a SaaS',
    icon: <LayoutDashboard />
  },
  {
    label: 'SignUp Form',
    prompt: 'Create a modern sign up form with email/password fields, Google and Github login options, and terms checkbox',
    icon: <Key />
  },
  {
    label: 'Hero',
    prompt: 'Create a modern header and centered hero section for a productivity SaaS. Include a badge for feature announcement, a title with a subtle gradient effect, subtitle, CTA, small social proof and an image.',
    icon: <HomeIcon />
  },
  {
    label: 'User Profile Card',
    prompt: 'Create a modern user profile card component for a social media website',
    icon: <User />
  }
]


const Hero = () => {

    const [prompt,setprompt]= useState("")
  return (
    <div className='flex flex-col gap-4 items-center justify-center h-[80vh]'>
      <h1 className='text-6xl font-bold'>What should we build ?</h1>
      <p className='text-xl font-semibold'>Generate, edit and explore AI generated websites</p>
      <div className='w-full max-w-xl border p-4 rounded-2xl'>
         <textarea
       placeholder='Describe your page Design'
       className='w-full h-24 focus:outline-none focus:ring-0 resize-none'
       value={prompt}
       onChange={(e)=>setprompt(e.target.value)}
       />
       <div className='flex items-center justify-between'>
        <Button variant={"ghost"}><ImagePlusIcon /></Button>
        <Button ><ArrowUp /></Button>
       </div>
      </div>
      <div className='flex gap-2'>
        {suggestions.map((suggestion)=>(
            <Button key={suggestion.label} variant={"ghost"} onClick={()=>setprompt(suggestion.prompt)} >
                {suggestion.icon}
                {suggestion.label}
            </Button>
        ))}
      </div>
    </div>
  )
}

export default Hero
