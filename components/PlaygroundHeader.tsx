import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const PlaygroundHeader = () => {
  return (
    <div className='flex justify-between p-4 shadow'>
      <Image  src={"/logo.svg"} alt="logo" width={30} height={30}/>
      <Button>Save</Button>
    </div>
  )
}

export default PlaygroundHeader
