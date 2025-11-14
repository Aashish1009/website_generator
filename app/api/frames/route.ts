import { db } from "@/config/db";
import { chatsTable, framesTable } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";


export async function GET (req:NextRequest){
   
    const {searchParams} = new URL(req.url);
    const frameId = searchParams.get('frameId');
    const projectId = searchParams.get('projectId');
   //@ts-ignore
    const frameResult = await db.select().from(framesTable).where(eq(framesTable.frameId,frameId));
//@ts-ignore
    const chatResult = await db.select().from(chatsTable).where(eq(chatsTable.frameId,frameId));

    const finalresult = {
        ...frameResult[0],
        chatMessages:chatResult[0]?.chatMessages ?? []
    }

    return NextResponse.json(finalresult);
}

export async function PUT(req:NextRequest){

    const {frameId,designCode,projectId} = await req.json();

    const result = await db.update(framesTable).set({
        designCode:designCode
    }).where(and(eq(framesTable.frameId,frameId),eq(framesTable.projectId,projectId)));

    return NextResponse.json({message:"Frame updated successfully"});
}