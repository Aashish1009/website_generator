"use client";

import React, { useEffect, useRef } from "react";
import PlaygroundTools from "./PlaygroundTools";
import PlaygroundSetting from "./PlaygroundSetting";

type Props = {
    generatedCode: string;
};

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
      </body>
      </html>
    `;

function PlaygroundHero({ generatedCode }: Props) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [selectedScreenSize, SetselectedScreenSize] = React.useState('web');
    const [selectedElement, SetselectedElement] = React.useState<HTMLElement | null>();
    
    // Use refs to persist state across re-renders without losing references
    const hoverElRef = useRef<HTMLElement | null>(null);
    const selectedElRef = useRef<HTMLElement | null>(null);

    // Initialize iframe shell once
    useEffect(() => {
        if (!iframeRef.current) return;
        const doc = iframeRef.current.contentDocument;
        if (!doc) return;

        doc.open();
        doc.write(HtmlCode);
        doc.close();
    }, []);

    // Update content and setup event listeners whenever generatedCode changes
    useEffect(() => {
        if (!iframeRef.current) return;
        const doc = iframeRef.current.contentDocument;
        if (!doc) return;

        const root = doc.getElementById("root");
        if (!root) return;

        // Update content - clean up any code block markers
        const cleanedCode = generatedCode
            ?.replaceAll("```html", "")
            .replaceAll("```", "")
            .trim() ?? "";
        
        root.innerHTML = cleanedCode;

        // Clear any previous selections
        if (selectedElRef.current) {
            selectedElRef.current.style.outline = "";
            selectedElRef.current.removeAttribute("contenteditable");
            selectedElRef.current = null;
        }
        if (hoverElRef.current) {
            hoverElRef.current.style.outline = "";
            hoverElRef.current = null;
        }

        // Event handlers
        const handleMouseOver = (e: MouseEvent) => {
            if (selectedElRef.current) return;
            const target = e.target as HTMLElement;
            if (target === root) return; // Don't highlight root itself
            
            if (hoverElRef.current && hoverElRef.current !== target) {
                hoverElRef.current.style.outline = "";
            }
            hoverElRef.current = target;
            hoverElRef.current.style.outline = "2px dotted blue";
        };

        const handleMouseOut = (e: MouseEvent) => {
            if (selectedElRef.current) return;
            if (hoverElRef.current) {
                hoverElRef.current.style.outline = "";
                hoverElRef.current = null;
            }
        };

        const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target as HTMLElement;
            if (target === root) return; // Don't select root itself

            if (selectedElRef.current && selectedElRef.current !== target) {
                selectedElRef.current.style.outline = "";
                selectedElRef.current.removeAttribute("contenteditable");
            }

            selectedElRef.current = target;
            selectedElRef.current.style.outline = "2px solid red";
            selectedElRef.current.setAttribute("contenteditable", "true");
            selectedElRef.current.focus();
            SetselectedElement(selectedElRef.current)
            console.log("Selected element:", selectedElRef.current);
        };

        const handleBlur = (e: FocusEvent) => {
            const target = e.target as HTMLElement;
            console.log("Final edited element:", target.outerHTML);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && selectedElRef.current) {
                selectedElRef.current.style.outline = "";
                selectedElRef.current.removeAttribute("contenteditable");
                selectedElRef.current.blur();
                selectedElRef.current = null;
            }
        };

        // Attach listeners to root (event delegation)
        root.addEventListener("mouseover", handleMouseOver);
        root.addEventListener("mouseout", handleMouseOut);
        root.addEventListener("click", handleClick);
        root.addEventListener("blur", handleBlur, true); // Use capture phase for blur
        doc.addEventListener("keydown", handleKeyDown);

        // Cleanup
        return () => {
            root.removeEventListener("mouseover", handleMouseOver);
            root.removeEventListener("mouseout", handleMouseOut);
            root.removeEventListener("click", handleClick);
            root.removeEventListener("blur", handleBlur, true);
            doc.removeEventListener("keydown", handleKeyDown);
        };
    }, [generatedCode]);

    return (
       <div className="flex gap-2 w-full">
         <div className="flex-1 p-1 flex justify-between flex-col">
            <iframe
                ref={iframeRef}
                className={`${selectedScreenSize === "web" ? "w-full" : "w-[400px]"} h-[480px] border-2 rounded-xl`}
                sandbox="allow-scripts allow-same-origin"
            />

            <PlaygroundTools 
                selectedScreenSize={selectedScreenSize} 
                SetselectedScreenSize={(v: string) => SetselectedScreenSize(v)} 
                generatedCode={generatedCode}
            />
        </div>
       {/* @ts-ignore */}
        <PlaygroundSetting selectedEl={selectedElement} clearSelection={()=>SetselectedElement(null)} />
       </div>
    );
}

export default PlaygroundHero;


