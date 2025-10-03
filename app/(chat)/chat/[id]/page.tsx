import { notFound } from "next/navigation";
import { Chat } from "@/components/chat";
import { getChatById, getMessagesByChatId } from "@/lib/db/queries";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const chat = await getChatById({ id });

  if (!chat) {
    notFound();
  }

  const messagesFromDb = await getMessagesByChatId({ id });

  const messages = messagesFromDb.map((msg) => ({
    id: msg.id,
    role: msg.role as "user" | "assistant",
    content: msg.content,
    createdAt: msg.createdAt,
  }));

  return <Chat id={id} initialMessages={messages} />;
}
