import { NextResponse } from "next/server";
import { getAllChats } from "@/lib/db/queries";

export async function GET() {
  try {
    const chats = await getAllChats();
    return NextResponse.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}
