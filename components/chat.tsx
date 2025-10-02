"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChatInput } from "@/components/chat-input";
import { Messages } from "@/components/messages";
import { generateUUID } from "@/lib/utils";
import type { Message } from "@/lib/types";

export function Chat({
  id,
  initialMessages,
}: {
  id: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const router = useRouter();

  const handleSubmit = (content: string) => {
    const isFirstMessage = messages.length === 0;

    const userMessage: Message = {
      id: generateUUID(),
      role: "user",
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (isFirstMessage) {
      window.history.replaceState({}, "", `/chat/${id}`);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="bg-ds-background-primary flex min-h-screen items-center justify-center">
        <div className="mx-auto w-full max-w-4xl space-y-10 px-4">
          <div className="space-y-1 pb-2">
            <h1 className="text-2xl font-semibold">Hello there</h1>
            <p className="text-3xl font-medium text-ds-text-secondary">
              How can I help you today?
            </p>
          </div>
          <ChatInput onSubmit={handleSubmit} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-ds-background-primary flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Messages messages={messages} />
      </div>
      <div className="border-t border-ds-border-default bg-ds-background-primary">
        <div className="mx-auto w-full max-w-4xl px-4 py-4">
          <ChatInput onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
