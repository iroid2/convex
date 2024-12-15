"use client";

import { useState } from "react";
import { Mic, Paperclip, Search, MoreVertical, Smile, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatList } from "@/components/chat-list";
import { ChatMessages } from "@/components/chat-messages";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { Chat, Message } from "@/types/chat";

// Sample data (unchanged)
const sampleChats: Chat[] = [
  {
    id: "1",
    name: "DR. Bruce",
    lastSeen: "yesterday at 11:50 PM",
    lastMessage: "Thanks for the boot camp",
    timestamp: "9:55 PM",
    imageUrl: "/placeholder.svg",
    unreadCount: 2,
  },
  {
    id: "2",
    name: "St. Gonzaga Fitness Team",
    lastMessage: "Please support my Daughter...",
    timestamp: "9:28 AM",
    imageUrl: "/placeholder.svg",
    unreadCount: 97,
  },
  // Add more sample chats as needed
];

const sampleMessages: Message[] = [
  {
    id: "1",
    content: "Hello Engineer",
    timestamp: "9:28 AM",
    sender: "other",
    status: "read",
  },
  {
    id: "2",
    content: "Good morning",
    timestamp: "9:28 AM",
    sender: "other",
    status: "read",
  },
  {
    id: "3",
    content: "Do you have a scanner",
    timestamp: "9:28 AM",
    sender: "other",
    status: "read",
  },
  {
    id: "4",
    content: "Thanks for the boot camp",
    timestamp: "7:37 PM",
    sender: "other",
    status: "read",
  },
  {
    id: "5",
    content:
      "Been on duty but following that's why I could participate when you called me out",
    timestamp: "7:38 PM",
    sender: "other",
    status: "read",
  },
  {
    id: "6",
    content: "It's been an interesting session",
    timestamp: "7:38 PM",
    sender: "other",
    status: "read",
  },
  {
    id: "7",
    content: "thanks",
    timestamp: "9:56 PM",
    sender: "me",
    status: "read",
  },
];

// User data (new)
const currentUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatarUrl: "/placeholder.svg?height=40&width=40",
};

export default function WhatsAppUI() {
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>(
    sampleChats[0]
  );
  const [message, setMessage] = useState("");
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);
  const [newFriend, setNewFriend] = useState({ name: "", email: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleAddFriend = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding friend:", newFriend);
    setIsAddFriendOpen(false);
    setNewFriend({ name: "", email: "" });
  };

  return (
    <div className="flex h-screen bg-background">
      <div
        className={`w-full md:w-[400px] ${
          isMobileMenuOpen ? "block" : "hidden md:block"
        }`}
      >
        <ChatList
          chats={sampleChats}
          onSelectChat={(chatId) => {
            setSelectedChat(sampleChats.find((c) => c.id === chatId));
            setIsMobileMenuOpen(false);
          }}
          selectedChatId={selectedChat?.id}
          onAddFriend={() => setIsAddFriendOpen(true)}
          userName={currentUser.name}
          userEmail={currentUser.email}
          userAvatarUrl={currentUser.avatarUrl}
        />
      </div>
      <div
        className={`flex-1 flex flex-col ${
          isMobileMenuOpen ? "hidden" : "block"
        }`}
      >
        {selectedChat ? (
          <>
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <X className="h-6 w-6" />
                </Button>
                <Avatar>
                  <AvatarImage
                    src={selectedChat.imageUrl}
                    alt={selectedChat.name}
                  />
                  <AvatarFallback>
                    {selectedChat.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold">{selectedChat.name}</h2>
                  {selectedChat.lastSeen && (
                    <p className="text-sm text-muted-foreground">
                      last seen {selectedChat.lastSeen}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <ChatMessages messages={sampleMessages} />
            <form
              onSubmit={handleSendMessage}
              className="p-4 flex items-center gap-2 border-t"
            >
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                type={message.trim() ? "submit" : "button"}
              >
                {message.trim() ? (
                  <span className="text-primary">Send</span>
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a chat to start messaging
          </div>
        )}
      </div>
      <Dialog open={isAddFriendOpen} onOpenChange={setIsAddFriendOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a new friend</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddFriend}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newFriend.name}
                  onChange={(e) =>
                    setNewFriend({ ...newFriend, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newFriend.email}
                  onChange={(e) =>
                    setNewFriend({ ...newFriend, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Friend</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
