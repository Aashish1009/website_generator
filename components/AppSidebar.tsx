"use client";

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { userDetailContext } from "@/context/UserDetailcontext";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image"
import Link from "next/link"
import { useContext, useState } from "react";

export function AppSidebar() {

    const [projectList, setProjectList] = useState<string[]>([]);

    const {userDetail,setUserDetail} = useContext(userDetailContext)
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-3">
            <Image src={"/logo.svg"} alt="logo" width={30} height={30}/>
            <h1 className="font-semibold text-lg">AI Website Generator</h1>
        </div>
        <Link href={"/workspace"}>
        <Button className="w-full">Add new Project +</Button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            {projectList.length === 0 ? <p className="text-sm text-gray-500 text-center">No Projects yet.</p> :
            projectList.map((projectName, index)=>(
                <Button key={index} variant={"ghost"} className="w-full justify-start"> {projectName}</Button>
            ))}
        </SidebarGroup >
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2 border bg-secondary rounded-lg p-3">
            <h2 className="flex justify-between items-center px-4">Remaining Credits <span className="font-bold">{userDetail?.credits}</span></h2>
            <Progress value={33} />
            <Button> Upgrade to Unlimited</Button>
            <div className="flex gap-5 items-center">
                <UserButton />
                <Button variant={"ghost"} className="cursor-pointer">Settings</Button>
            </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}