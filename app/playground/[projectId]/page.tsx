"use client";
import PlaygroundChat from '@/components/PlaygroundChat'
import PlaygroundHeader from '@/components/PlaygroundHeader'
import PlaygroundHero from '@/components/PlaygroundHero'
import PlaygroundSetting from '@/components/PlaygroundSetting'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const {projectId} = useParams();
    const params = useSearchParams();
    const frameId = params.get('frameId');
    
  return (
    <div>
      <PlaygroundHeader />
      <div className='flex'>
      <PlaygroundChat />
      <PlaygroundHero />
      <PlaygroundSetting />
      </div>
    </div>
  )
}

export default page
