import { db } from "@/config/db";
import { chatsTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest){

    const {messages,frameId}= await req.json();

    const result= await db.update(chatsTable).set({
        chatMessages:messages
    }).where(eq(chatsTable.frameId,frameId));

    return NextResponse.json({result:"Chat updated successfully"});
}