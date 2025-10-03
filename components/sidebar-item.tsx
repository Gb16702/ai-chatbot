"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { TrashIcon } from "lucide-react"
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  useSidebar,
} from "@/components/ui/sidebar"

type Chat = {
  id: string
  title: string
  createdAt: Date
  visibility: string
}

export function SidebarItem({ chat, onDelete }: { chat: Chat; onDelete: (id: string) => void }) {
  const { id } = useParams()
  const router = useRouter()
  const { setOpenMobile } = useSidebar()
  const isActive = id === chat.id

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!confirm(`Delete chat "${chat.title}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/chat/${chat.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete chat")
      }

      onDelete(chat.id)

      if (isActive) {
        router.push("/")
      }
    } catch (error) {
      console.error("Error deleting chat:", error)
    }
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={`/chat/${chat.id}`} onClick={() => setOpenMobile(false)}>
          <span className="truncate">{chat.title}</span>
        </Link>
      </SidebarMenuButton>
      <SidebarMenuAction onClick={handleDelete} showOnHover>
        <TrashIcon className="size-4" />
        <span className="sr-only">Delete</span>
      </SidebarMenuAction>
    </SidebarMenuItem>
  )
}
