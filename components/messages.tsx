import type { Message as MessageType } from "@/lib/types";
import { Message } from "@/components/message";

export function Messages({ messages }: { messages: MessageType[] }) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}
