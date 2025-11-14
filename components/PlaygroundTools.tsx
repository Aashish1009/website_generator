import React, { use, useEffect } from 'react'
import { Button } from './ui/button'
import { Download, Monitor, SquareArrowOutUpRight, TabletSmartphone, View } from 'lucide-react'
import ViewCodeBlock from './ViewCodeBlock'

const HtmlCode = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="AI Website Builder - Modern TailwindCSS + Flowbite Template">
          <title>AI Website Builder</title>

          <!-- Tailwind CSS -->
          <script src="https://cdn.tailwindcss.com"></script>

          <!-- Flowbite CSS & JS -->
          <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>

          <!-- Font Awesome / Lucide -->
          <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

          <!-- Chart.js -->
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

          <!-- AOS -->
          <link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

          <!-- GSAP -->
          <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

          <!-- Lottie -->
          <script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.11.2/lottie.min.js"></script>

          <!-- Swiper -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
          <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>

          <!-- Tippy.js -->
          <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/dist/tippy.css" />
          <script src="https://unpkg.com/@popperjs/core@2"></script>
          <script src="https://unpkg.com/tippy.js@6"></script>
      </head>
      <body id="root">
      {code}
      </body>
      </html>
    `

const PlaygroundTools = ({selectedScreenSize,SetselectedScreenSize,generatedCode}:any) => {

    const [finalcode,setFinalcode] = React.useState<string>("");

    useEffect(() => {
       const cleancode = (HtmlCode.replace("{code}", generatedCode) || "")
                    ?.replaceAll("```html", "")
                    .replaceAll("```", "")
                    .replaceAll("html", "") ?? "";
         setFinalcode(cleancode);
    },
    [ generatedCode])

    const ViewInNewTab = () => {
        if(!generatedCode) return;
        

        const blob  = new Blob([finalcode || ""], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    }

    const Downloadcode = () =>{
         const blob  = new Blob([finalcode || ""], {type: 'text/html'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    
  return (
    <div className='p-2 shadow rounded-xl flex items-center justify-between mb-2 '>
      <div className='flex gap-4' >
        <Button className={`${selectedScreenSize==="web"  ? ' border border-primary ' : ''}`} variant={"ghost"} onClick={()=>SetselectedScreenSize('web')}> <Monitor /></Button>
        <Button className={`${selectedScreenSize ==="mobile" ? 'border border-primary ' : ''}`} variant={"ghost"} onClick={()=>SetselectedScreenSize('mobile')}> <TabletSmartphone /></Button>
      </div>
      <div className='flex gap-2'>
        <Button variant={"outline"} onClick={()=>ViewInNewTab()}>
            New Tab <SquareArrowOutUpRight />
        </Button>
        <Button  variant={"outline"} onClick={Downloadcode}>
           Download <Download />
        </Button>
        <ViewCodeBlock finalcode={finalcode}>
            <Button variant={"outline"}>
         View <View />
        </Button>
        </ViewCodeBlock>
      </div>
    </div>
  )
}

export default PlaygroundTools
