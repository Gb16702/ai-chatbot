"use client";

import { ChatInput } from "@/components/chat-input";

export function Chat({
  id,
  initialMessages,
}: {
  id: string;
  initialMessages: Array<unknown>;
}) {
  return (
    <div className="bg-ds-background-primary flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-4xl space-y-10 px-4">
        <div className="space-y-1 pb-2">
          <h1 className="text-2xl font-semibold">Hello there</h1>
          <p className="text-3xl font-medium text-ds-text-secondary">
            How can I help you today?
          </p>
        </div>
        <ChatInput />
      </div>
    </div>
  );
}
