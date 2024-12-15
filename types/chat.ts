export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: string;
  status: "sent" | "delivered" | "read";
}

export interface Chat {
  id: string;
  name: string;
  lastSeen?: string;
  lastMessage?: string;
  unreadCount?: number;
  timestamp: string;
  imageUrl: string;
}
