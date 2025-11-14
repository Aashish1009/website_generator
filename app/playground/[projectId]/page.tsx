"use client";
import PlaygroundChat from '@/components/PlaygroundChat'
import PlaygroundHeader from '@/components/PlaygroundHeader'
import PlaygroundHero from '@/components/PlaygroundHero'
import PlaygroundSetting from '@/components/PlaygroundSetting'
import axios from 'axios';
import { Html } from 'next/document';
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'sonner';

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

const prompt = `User Input: {inputMessage}

You have ONLY TWO MODES:

====================================================
🔥 MODE 1: CODE GENERATION MODE
Trigger this mode ONLY IF the user input clearly asks 
to create, build, generate, design, or output anything 
related to:

- HTML
- Tailwind CSS
- Flowbite components
- UI/UX design
- Webpages
- Sections
- Components
- Templates
- Dashboards
- Forms
- Landing pages
- Hero sections
- Cards
- Swipers/sliders
- Charts/graphs
- Layouts
- Frontend code
- Web design

If ANY of these keywords appear OR the user intent is 
to build something, you MUST enter CODE MODE.

When in CODE MODE:

1. Generate COMPLETE HTML code (ONLY the <body> content).
2. Use Tailwind CSS + Flowbite components.
3. Use **blue as the primary color theme**.
4. Make everything fully responsive.
5. Add proper spacing (padding + margin).
6. Components must be standalone (not connected).
7. Use image placeholders:

   Light mode:
   https://community.softr.io/uploads/db9110/original/2X/7/746e0e7e382d0ff5d7773ca9a87e6f6f8817a6a8.jpeg

   Dark mode:
   https://www.cibakery.com/wp-content/uploads/2015/12/placeholder-3.jpg

8. Add proper alt text for images.
9. Use:
   - FontAwesome (fa fa-)
   - Flowbite UI components
   - Chart.js
   - Swiper.js
   - Tippy.js

10. Include interactive components 
    (modals, dropdowns, accordions, tabs, alerts).

11. Do NOT include:
    - <html>, <head>, <title>
    - Explanations, notes, markdown, or backticks.
    - Anything before or after the HTML.

====================================================
😊 MODE 2: NORMAL CHAT MODE
Trigger this if:
- The user greets you ("hi", "hello", "hey")
- The user is talking generally
- The user is NOT asking for code or UI generation

When in Normal Chat Mode:
- Reply with a short, friendly text answer.
- Do NOT generate any HTML or code.

====================================================

STRICT RULE:
If you enter CODE MODE, the response MUST start with:
\`\`\`html
always start with these three backticks and the word "html"
Never write explanations or text outside the code block.
'

FOLLOW THE RULES STRICTLY.
Always choose the correct mode.
`;




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
      const designcode = result.data.designCode;
       const index = designcode.indexOf("```html") + 7;
        const newcode = designcode.slice(index);
        setGeneratedCode(newcode);
     
      if(result.data?.chatMessages?.length==1){
        const usermsg = result.data.chatMessages[0].content;
        sendMessage(usermsg);
    }else{
      setMessages(result.data?.chatMessages);
    }

  }

    const sendMessage = async(inputMessage:string)=>{
       setLoading(true);
        setGeneratedCode("");
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
      console.log(aimessage);
      
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

  useEffect(()=>{
    if(generatedCode.length>10){
        savegenratedCode(generatedCode);
        toast.success("Design code saved successfully");
    }
  },[generatedCode])



  const savegenratedCode = async (code:string)=>{
    const result = await axios.put('/api/frames',{
        frameId,
        designCode:code,
        projectId
    })
   
    
  }

  const saveMessages = async ()=>{
    const result=await axios.put('/api/chats',{
        messages,
        frameId
    })
    
  }
    
  return (
    <div >
      <PlaygroundHeader />
      <div className='flex'>
      <PlaygroundChat  messages={messages||[]} onSend={(inputMessage:string) =>sendMessage(inputMessage)}
        loading = {loading}/>
      <PlaygroundHero  generatedCode={generatedCode}/>
      <PlaygroundSetting />
      </div>
    </div>
  )
}

export default page
