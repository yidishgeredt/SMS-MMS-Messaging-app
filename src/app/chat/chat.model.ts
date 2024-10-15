export interface Chat {
  id: number;
  contactName: string;
  phoneNumber: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isMuted: boolean;
  backgroundImage?: string;
}

export interface Message {
  id: number;
  chatId: number;
  content: string;
  timestamp: Date;
  isIncoming: boolean;
  type: 'text' | 'image' | 'voice';
  mediaUrl?: string;
}

export interface Contact {
  id: number;
  name: string;
  phoneNumber: string;
  email?: string;
  address?: string;
}