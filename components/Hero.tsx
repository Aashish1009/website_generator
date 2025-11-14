"use client";

import React, { useState } from 'react'
import { Button } from './ui/button'
import { ArrowUp, HomeIcon, ImagePlusIcon, Key, LayoutDashboard, Loader2Icon, User } from 'lucide-react'
import { SignInButton, useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

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
    const user = useUser();
    const router = useRouter();
    const [loading,setloading] = useState(false);


    const createNewProject = async () => {
      setloading(true);
      const projectId = uuidv4();
      const frameId = Math.floor(Math.random() * 10000);
      const messages = [{
        role: "user",
        content: prompt
      }]
      try {
        const result = await axios.post('/api/projects',{
          projectId,
          frameId,
          messages
        })
        toast.success("Project created successfully")
      
        router.push(`/playground/${projectId}?frameId=${frameId}`);
        setloading(false);
      } catch (error) {
        toast.error("Something went wrong")
        console.log(error)
        setloading(false);
      }
    }
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
        {!user ? <SignInButton mode='modal' forceRedirectUrl={"/workspace"}>
          <Button disabled={!prompt}><ArrowUp /></Button>
        </SignInButton>:
         <Button disabled={!prompt || loading} onClick={createNewProject}>
          {loading?<Loader2Icon className='animate-spin'/>:<ArrowUp />}</Button>}
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
