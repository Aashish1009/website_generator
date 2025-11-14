"use client";
import PlaygroundChat from '@/components/PlaygroundChat'
import PlaygroundHeader from '@/components/PlaygroundHeader'
import PlaygroundHero from '@/components/PlaygroundHero'
import PlaygroundSetting from '@/components/PlaygroundSetting'
import axios from 'axios';
import { previousDay, set } from 'date-fns';
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

export type Frame ={
    frameId: string;
    projectId: string;
    designCode: string;
    chatMessages: Messages[];
}

export type Messages={
    role: string;
    content: string;
}

const prompt = `inputMessage: {inputMessage}

Instructions:

1. If the user input is explicitly asking to generate 
code, design, or HTML/CSS/JS output (e.g., "Create a 
landing page", "Build a dashboard", "Generate HTML +
Tailwind CSS code"), then:

    - Generate a complete HTML Tailwind CSS code using 
      Flowbite UI components.
    - Use a modern design with **blue as the primary 
      color theme**.
    - Only include the <body> content (do not add 
      <head> or <title>).
    - Make it fully responsive for all screen sizes.
    - All primary components must match the theme 
      color.
    - Add proper padding and margin for each element.
    - Components should be independent; do not connect 
      them.
    - Use placeholders for all images:
        - Light mode:
          https://community.softr.io/uploads/db9110/original/2X/7/746e0e7e382d0ff5d7773ca9a87e6f6f8817a6a8.jpeg
        - Dark mode:
          https://www.cibakery.com/wp-content/uploads/2015/12/placeholder-3.jpg
    - Add alt tag describing the image prompt.
    - Use the following libraries/components where appropriate:
        - FontAwesome icons (fa fa-)
        - Flowbite UI components: buttons, modals, 
          forms, tables, tabs, alerts, cards, dialogs, 
          dropdowns, accordions, etc.
        - Chart.js for charts & graphs
        - Swiper.js for sliders/carousels
        - Tippy.js for tooltips & popovers
    - Include interactive components like modals, 
      dropdowns, and accordions.
    - Ensure proper spacing, alignment, hierarchy, and
      theme consistency.
    - Ensure charts are visually appealing and match 
      the theme color.
    - Header menu options should be spread out and not 
      connected.
    - Do not include broken links.
    - Do not add any extra text before or after the 
      HTML code.

2. If the user input is **general text or greetings** 
   (e.g., "Hi", "Hello", "How are you?") **or does not 
   explicitly ask to generate code**, then:

    - Respond with a simple, friendly text message 
      instead of generating any code.

Example:

- User: "Hi" → Response: "Hello! How can I help you 
  today?"
- User: "Build a responsive landing page with Tailwind 
  CSS" → Response: [Generate full HTML code as per 
  instructions above]`


const page = () => {
    const {projectId} = useParams();
    const params = useSearchParams();
    const frameId = params.get('frameId');
    const [frameDetail, setFrameDetail] = React.useState<Frame>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [messages, setMessages] = React.useState<Messages[]>([]);
    const [generatedCode, setGeneratedCode] = React.useState<string>("");

    useEffect(()=>{
      getFrameDetails();
    },[frameId])

    const getFrameDetails = async()=>{
      const result = await axios.get(`/api/frames?frameId=${frameId}&projectId=${projectId}`);
      setFrameDetail(result.data);
      console.log(result.data)
      if(result.data?.chatMessages?.length==1){
        const usermsg = result.data.chatMessages[0].content;
        sendMessage(usermsg);
    }else{
      setMessages(result.data?.chatMessages);
    }

  }

    const sendMessage = async(inputMessage:string)=>{
       setLoading(true);
       setMessages((prevMessages)=>[...prevMessages, {role:'user', content: inputMessage}]);

      const response = await fetch("/api/ai-model", {
      method: "POST",
      body: JSON.stringify({
        messages: [{role: 'user', content: prompt?.replace("{inputMessage}", inputMessage)}],
      }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    let aimessage = "";
    let iscode = false;
    while (true) {
      //@ts-ignore
      const { done, value } = await reader?.read();
      if (done) break;
      const chunk = decoder.decode(value,{ stream: true });
      aimessage += chunk;
      
      if(!iscode && aimessage.includes("```html")){
        iscode = true;
        const index = aimessage.indexOf("```html") + 7;
        const codechunk = aimessage.slice(index);
        setGeneratedCode((prev)=> prev + codechunk);
      }else if(iscode){
        setGeneratedCode((prev)=> prev + chunk);
      }
    }
     if(!iscode){
        setMessages((prevMessages:any)=> 
          [...prevMessages,{role:'assistant', content: aimessage}]
        )
    }else{
         setMessages((prevMessages:any)=> [
          ...prevMessages,{role:'assistant', content: "your code is ready"}
        ])
    }
    setLoading(false);
  }

  useEffect(()=>{
if(messages.length >1 && !loading){
    saveMessages();
}
  },[messages])

  const saveMessages = async ()=>{
    const result=await axios.put('/api/chats',{
        messages,
        frameId
    })
    console.log(result.data)
  }
    
  return (
    <div>
      <PlaygroundHeader />
      <div className='flex'>
      <PlaygroundChat  messages={messages||[]} onSend={(inputMessage:string) =>sendMessage(inputMessage)}
        loading = {loading}/>
      <PlaygroundHero />
      <PlaygroundSetting />
      </div>
    </div>
  )
}

export default page
