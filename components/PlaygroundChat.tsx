"use client";

import { Messages } from '@/app/playground/[projectId]/page'
import React from 'react'
import { Button } from './ui/button'
import { ArrowUp } from 'lucide-react'

type Props = {
  messages:Messages[],
  onSend:any,
  loading:boolean
}

const PlaygroundChat = ({messages,onSend,loading}:Props) => {

  const [inputMessage,setInputMessage]= React.useState("");

  const handleSend = ()=>{
    if(!inputMessage.trim()) return;

    onSend(inputMessage);
    setInputMessage("");
  }
  return (
    <div className='w-96 h-[88vh] p-3 border-r-2 flex flex-col justify-between'>
      <div className=' flex flex-col overflow-y-auto gap-2 mb-3'>
       {messages.length ===0 ? <div className='text-center text-gray-500 '>No messages yet.</div>:
        messages.map((msg,index)=>(
          <div key={index} className={`${msg.role==="user"?"justify-end":"justify-start"} flex mb-2`}>
             <div className={`p-2 rounded-lg max-w-[80%] ${msg.role==="user"?"bg-gray-200 text-black":"bg-gray-400 text-black"}`}>
              {msg.content}
             </div>
          </div>
        ))
       }
      {loading &&  <div className='flex items-center justify-center p-3 gap-2'>
      <div className=' animate-spin h-8 w-8  border-zinc-800 rounded-full border-t-2 border-b-2'>
          </div>
          <span className='text-zinc-800'>working on it</span>
       </div>}
      </div>
      <div className='flex gap-2 border  p-2 rounded-lg mb-2 items-center '>
        <textarea
       placeholder='Type your message...'
       className='w-full h-24 focus:outline-none focus:ring-0 resize-none border-none  '
       value={inputMessage}
       onChange={(e)=>setInputMessage(e.target.value)}
       />
      <Button onClick={handleSend} >
        <ArrowUp />
      </Button>
        
      </div>
    </div>
  )
}

export default PlaygroundChat
