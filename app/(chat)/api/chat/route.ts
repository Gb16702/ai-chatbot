import OpenAI from "openai";
import { NextRequest } from "next/server";
import { saveChat, saveMessages, getChatById } from "@/lib/db/queries";
import { generateUUID } from "@/lib/utils";

export async function POST(request: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    const { messages, chatId, userMessageId } = await request.json();

    const existingChat = await getChatById({ id: chatId });

    if (!existingChat) {
      const firstUserMessage = messages[messages.length - 1].content;
      const title = firstUserMessage.substring(0, 100);

      await saveChat({
        id: chatId,
        title,
        visibility: "private",
      });
    }

    const lastMessage = messages[messages.length - 1];
    await saveMessages({
      messages: [
        {
          id: userMessageId,
          chatId,
          role: lastMessage.role,
          content: lastMessage.content,
          createdAt: new Date(),
        },
      ],
    });

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      stream: true,
    });

    const encoder = new TextEncoder();
    let fullResponse = "";
    const assistantMessageId = generateUUID();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";

            if (content) {
              fullResponse += content;
              const data = JSON.stringify({ content });
              controller.enqueue(encoder.encode(`data: ${data}\n\n`));
            }
          }

          await saveMessages({
            messages: [
              {
                id: assistantMessageId,
                chatId,
                role: "assistant",
                content: fullResponse,
                createdAt: new Date(),
              },
            ],
          });

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get response from AI" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
