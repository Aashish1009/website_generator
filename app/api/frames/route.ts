import { db } from "@/config/db";
import { chatsTable, framesTable } from "@/config/schema";
import { eq } from "drizzle-orm";
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