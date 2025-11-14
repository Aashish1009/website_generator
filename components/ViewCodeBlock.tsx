import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Copy } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const ViewCodeBlock = ({children,finalcode}:any) => {

    const handlecopy = async()=>{
        await navigator.clipboard.writeText(finalcode);
        toast.success("Code copied to clipboard!");
    }
  return (
    <Dialog>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent className='min-w-[900px] max-h-[500px] overflow-auto'>
    <DialogHeader>
      <DialogTitle>
        <div className='flex gap-[620px] p-2'>
            Source Code
            <Button className='flex gap-3' onClick={handlecopy}><Copy /> copy</Button>
        </div>
        </DialogTitle>
      <DialogDescription asChild>
        <div>
            <SyntaxHighlighter >
            {finalcode}
        </SyntaxHighlighter>
        </div>
       
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default ViewCodeBlock
