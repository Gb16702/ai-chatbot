"use client"

import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar"
import { SidebarHistory } from "@/components/sidebar-history"

export function AppSidebar() {
  const router = useRouter()
  const { setOpenMobile } = useSidebar()

  const handleNewChat = () => {
    setOpenMobile(false)
    router.push("/")
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between p-2">
          <span className="text-lg font-semibold">Chatbot</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNewChat}
            className="size-8"
          >
            <PlusIcon className="size-4" />
            <span className="sr-only">New Chat</span>
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarHistory />
      </SidebarContent>

      <SidebarFooter>
      </SidebarFooter>
    </Sidebar>
  )
}
