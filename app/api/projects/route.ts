import { db } from "@/config/db";
import { framesTable, projectsTable ,chatsTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const {projectId,frameId,messages} = await req.json();
    const user = await currentUser();

    const project = await db.insert(projectsTable).values({
        projectId,
        createdBy: user?.primaryEmailAddress?.emailAddress
    })

    const frame = await db.insert(framesTable).values({
        frameId,
        projectId,
    })

    const chatMessages = await db.insert(chatsTable).values({
        chatMessages:messages,
        createdBy: user?.primaryEmailAddress?.emailAddress
    })

    return NextResponse.json({projectId,frameId,messages})
}