'use client'

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Send } from 'lucide-react'
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

interface Message {
 
  content: string
  isUser: boolean
  timestamp: Date
}

export default function MessageApp() {
  const createMessege=useMutation(api.messeges.createMessege)
    const messagesData =useQuery(api.messeges.getMesseges)
    const messages=messagesData?.map((item)=>{
      return {
        id:item._id,
        content:item.content,
        isUser:item.isUser
      }
    }) ||  []
  const [message, setMessage] = useState("")

  const createMessage = (content: string, isUser: boolean): Message => {
    return {
      content,
      isUser,
      timestamp: new Date()
    }
  }

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Create a user message
      const userMessage = createMessage(message, true)
      
      // Create a mock sender response
      await createMessege({
        content: userMessage.content,
      isUser: userMessage.isUser,
      timestamp: userMessage.timestamp.toISOString(),
      }) 
      const senderMessage = createMessage("This is a mock response", false)
      
      // Add both messages to the chat
    //   setMessages(prev => [...prev, userMessage, senderMessage])
      console.log("New message:", userMessage)
      
      setMessage("")
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto h-[600px] flex flex-col bg-white">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg,i) => (
            <div
              key={i}
              className={cn(
                "flex",
                msg.isUser ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "rounded-2xl px-4 py-2 max-w-[80%] break-words",
                  msg.isUser
                    ? "bg-gray-100 text-gray-900"
                    : "bg-blue-500 text-white"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full h-10 w-10 bg-blue-500 hover:bg-blue-600"
          >
            <Send className="h-4 w-4 text-white" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

