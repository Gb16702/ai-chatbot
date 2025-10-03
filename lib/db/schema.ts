import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const chat = pgTable("Chat", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("createdAt").notNull(),
  title: text("title").notNull(),
  visibility: text("visibility").notNull().default("private"),
});

export const message = pgTable("Message", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chatId")
    .notNull()
    .references(() => chat.id),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});
