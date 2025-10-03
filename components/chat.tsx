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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (content: string) => {
    const isFirstMessage = messages.length === 0;

    const userMessageId = generateUUID();
    const userMessage: Message = {
      id: userMessageId,
      role: "user",
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    if (isFirstMessage) {
      window.history.replaceState({}, "", `/chat/${id}`);
    }

    setIsLoading(true);

    const assistantMessageId = generateUUID();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: id,
          userMessageId: userMessageId,
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.content || "";

              if (content) {
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, content: msg.content + content }
                      : msg
                  )
                );
              }
            } catch (error) {
              console.error("Error parsing chunk:", error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error calling API:", error);
    } finally {
      setIsLoading(false);
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
          <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
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
          <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
