import { Search, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "./user-profile";
import type { Chat } from "../types/chat";

interface ChatListProps {
  chats: Chat[];
  onSelectChat: (chatId: string) => void;
  selectedChatId?: string;
  onAddFriend: () => void;
  userName: string;
  userEmail: string;
  userAvatarUrl: string;
}

export function ChatList({
  chats,
  onSelectChat,
  selectedChatId,
  onAddFriend,
  userName,
  userEmail,
  userAvatarUrl,
}: ChatListProps) {
  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>
        <Button onClick={onAddFriend} className="mt-2 w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
      </div>
      <ScrollArea className="flex-1">
        {chats.map((chat) => (
          <Button
            key={chat.id}
            variant="ghost"
            className={`w-full justify-start px-4 py-6 ${
              selectedChatId === chat.id ? "bg-muted" : ""
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <div className="flex items-center w-full gap-4">
              <Avatar>
                <AvatarImage src={chat.imageUrl} alt={chat.name} />
                <AvatarFallback>{chat.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between">
                  <span className="font-semibold">{chat.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {chat.timestamp}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage}
                </div>
              </div>
              {chat.unreadCount && (
                <div className="min-w-[20px] h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {chat.unreadCount}
                </div>
              )}
            </div>
          </Button>
        ))}
      </ScrollArea>
      <UserProfile
        name={userName}
        email={userEmail}
        avatarUrl={userAvatarUrl}
      />
    </div>
  );
}
