import { desc, eq } from "drizzle-orm";
import { db } from "./index";
import { chat, message } from "./schema";

export async function saveChat({
  id,
  title,
  visibility = "private",
}: {
  id: string;
  title: string;
  visibility?: "private" | "public";
}) {
  try {
    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      title,
      visibility,
    });
  } catch (error) {
    console.error("Failed to save chat in database");
    throw error;
  }
}

export async function saveMessages({ messages }: { messages: Array<{
  id: string;
  chatId: string;
  role: string;
  content: string;
  createdAt: Date;
}> }) {
  try {
    return await db.insert(message).values(messages);
  } catch (error) {
    console.error("Failed to save messages in database");
    throw error;
  }
}

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    return selectedChat;
  } catch (error) {
    console.error("Failed to get chat by id from database");
    throw error;
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(message.createdAt);
  } catch (error) {
    console.error("Failed to get messages by chat id from database");
    throw error;
  }
}

export async function getAllChats() {
  try {
    return await db
      .select()
      .from(chat)
      .orderBy(desc(chat.createdAt));
  } catch (error) {
    console.error("Failed to get all chats from database");
    throw error;
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    await db.delete(message).where(eq(message.chatId, id));
    await db.delete(chat).where(eq(chat.id, id));
  } catch (error) {
    console.error("Failed to delete chat from database");
    throw error;
  }
}
