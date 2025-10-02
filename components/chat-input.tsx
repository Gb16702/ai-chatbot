"use client";

import { type FormEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export function ChatInput({ onSubmit }: { onSubmit: (content: string) => void }) {
  const [message, setMessage] = useState("");
  const isDisabled = message.trim().length === 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) return;

    onSubmit(trimmedMessage);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full overflow-hidden rounded-xl border border-ds-border-default bg-ds-background-secondary p-3 shadow-xs transition-all duration-200 focus-within:border-ds-border-active hover:focus-within:border-ds-border-active hover:border-ds-border-hover"
    >
      <div className="flex flex-row items-end gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message"
          rows={6}
          className="min-h-[44px] grow resize-none border-none bg-transparent p-2 shadow-none outline-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          disabled={isDisabled}
          type="submit"
          size="icon"
          className="size-8 shrink-0 rounded-full"
        >
          <ArrowUp className="size-4" />
        </Button>
      </div>
    </form>
  );
}
