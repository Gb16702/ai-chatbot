"use client"

import { useEffect, useState } from "react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar"
import { SidebarItem } from "@/components/sidebar-item"

type Chat = {
  id: string
  title: string
  createdAt: Date
  visibility: string
}

type GroupedChats = {
  today: Chat[]
  yesterday: Chat[]
  lastWeek: Chat[]
  lastMonth: Chat[]
  older: Chat[]
}

function groupChatsByDate(chats: Chat[]): GroupedChats {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const lastWeek = new Date(today)
  lastWeek.setDate(lastWeek.getDate() - 7)
  const lastMonth = new Date(today)
  lastMonth.setDate(lastMonth.getDate() - 30)

  const grouped: GroupedChats = {
    today: [],
    yesterday: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  }

  chats.forEach((chat) => {
    const chatDate = new Date(chat.createdAt)
    if (chatDate >= today) {
      grouped.today.push(chat)
    } else if (chatDate >= yesterday) {
      grouped.yesterday.push(chat)
    } else if (chatDate >= lastWeek) {
      grouped.lastWeek.push(chat)
    } else if (chatDate >= lastMonth) {
      grouped.lastMonth.push(chat)
    } else {
      grouped.older.push(chat)
    }
  })

  return grouped
}

export function SidebarHistory() {
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchChats = async () => {
    try {
      const response = await fetch("/api/chats")
      const data = await response.json()
      setChats(data)
    } catch (error) {
      console.error("Failed to fetch chats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteChat = (chatId: string) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId))
  }

  useEffect(() => {
    fetchChats()
  }, [])

  if (isLoading) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {Array.from({ length: 5 }).map((_, i) => (
              <SidebarMenuSkeleton key={i} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  if (chats.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="text-ds-text-secondary px-4 py-2 text-sm">
            No chats yet
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  const groupedChats = groupChatsByDate(chats)

  return (
    <>
      {groupedChats.today.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Today</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedChats.today.map((chat) => (
                <SidebarItem key={chat.id} chat={chat} onDelete={handleDeleteChat} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {groupedChats.yesterday.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Yesterday</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedChats.yesterday.map((chat) => (
                <SidebarItem key={chat.id} chat={chat} onDelete={handleDeleteChat} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {groupedChats.lastWeek.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Last 7 days</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedChats.lastWeek.map((chat) => (
                <SidebarItem key={chat.id} chat={chat} onDelete={handleDeleteChat} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {groupedChats.lastMonth.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Last 30 days</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedChats.lastMonth.map((chat) => (
                <SidebarItem key={chat.id} chat={chat} onDelete={handleDeleteChat} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {groupedChats.older.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Older</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {groupedChats.older.map((chat) => (
                <SidebarItem key={chat.id} chat={chat} onDelete={handleDeleteChat} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      )}
    </>
  )
}
