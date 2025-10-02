import type { Message } from "@/lib/types";

export function Message({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? "bg-ds-text-primary text-ds-background-primary"
            : "bg-ds-background-secondary text-ds-text-primary"
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}
