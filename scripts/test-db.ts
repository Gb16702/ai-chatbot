import { config } from "dotenv";
import { getMessagesByChatId, saveChat, saveMessages } from "../lib/db/queries";
import { generateUUID } from "../lib/utils";

config({ path: ".env.local" });

async function testDatabase() {
  try {
    console.log("Testing database connection...\n");

    const chatId = generateUUID();
    console.log(`Creating chat with ID: ${chatId}`);

    await saveChat({
      id: chatId,
      title: "Test Chat",
    });
    console.log("Chat saved successfully!\n");

    console.log("Saving test messages...");
    await saveMessages({
      messages: [
        {
          id: generateUUID(),
          chatId,
          role: "user",
          content: "Hello, this is a test message!",
          createdAt: new Date(),
        },
        {
          id: generateUUID(),
          chatId,
          role: "assistant",
          content: "Hi! This is a test response.",
          createdAt: new Date(),
        },
      ],
    });
    console.log("Messages saved successfully!\n");

    console.log("Retrieving messages...");
    const messages = await getMessagesByChatId({ id: chatId });
    console.log(`Found ${messages.length} messages:`);
    messages.forEach((msg) => {
      console.log(`  - [${msg.role}]: ${msg.content}`);
    });

    console.log("\nDatabase test completed successfully!");
  } catch (error) {
    console.error("Database test failed:", error);
    process.exit(1);
  }
}

testDatabase();
