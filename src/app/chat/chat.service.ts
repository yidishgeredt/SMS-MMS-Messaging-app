import { Injectable } from '@angular/core';
import { Chat, Message, Contact } from './chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chats: Chat[] = [
    { id: 1, contactName: 'Alice', phoneNumber: '+1234567890', lastMessage: 'Hey, how are you?', timestamp: new Date(), unreadCount: 2, isMuted: false },
    { id: 2, contactName: 'Bob', phoneNumber: '+1987654321', lastMessage: 'See you tomorrow!', timestamp: new Date(), unreadCount: 0, isMuted: true },
    { id: 3, contactName: 'Charlie', phoneNumber: '+1122334455', lastMessage: 'Thanks for the info', timestamp: new Date(), unreadCount: 1, isMuted: false },
  ];

  private messages: Message[] = [
    { id: 1, chatId: 1, content: 'Hey, how are you?', timestamp: new Date(), isIncoming: true, type: 'text' },
    { id: 2, chatId: 1, content: 'I\'m good, thanks! How about you?', timestamp: new Date(), isIncoming: false, type: 'text' },
    { id: 3, chatId: 2, content: 'See you tomorrow!', timestamp: new Date(), isIncoming: true, type: 'text' },
    { id: 4, chatId: 3, content: 'Thanks for the info', timestamp: new Date(), isIncoming: true, type: 'text' },
  ];

  private contacts: Contact[] = [
    { id: 1, name: 'Alice', phoneNumber: '+1234567890', email: 'alice@example.com', address: '123 Main St, City' },
    { id: 2, name: 'Bob', phoneNumber: '+1987654321', email: 'bob@example.com', address: '456 Elm St, Town' },
    { id: 3, name: 'Charlie', phoneNumber: '+1122334455', email: 'charlie@example.com', address: '789 Oak St, Village' },
  ];

  getChats(): Chat[] {
    return this.chats;
  }

  getChat(id: number): Chat {
    return this.chats.find(chat => chat.id === id);
  }

  getMessages(chatId: number): Message[] {
    return this.messages.filter(message => message.chatId === chatId);
  }

  getContact(id: number): Contact {
    return this.contacts.find(contact => contact.id === id);
  }

  addMessage(chatId: number, content: string, isIncoming: boolean, type: 'text' | 'image' | 'voice', mediaUrl?: string): void {
    const newMessage: Message = {
      id: this.messages.length + 1,
      chatId,
      content,
      timestamp: new Date(),
      isIncoming,
      type,
      mediaUrl
    };
    this.messages.push(newMessage);

    const chat = this.getChat(chatId);
    chat.lastMessage = type === 'text' ? content : `[${type.charAt(0).toUpperCase() + type.slice(1)}]`;
    chat.timestamp = new Date();
    if (isIncoming && !chat.isMuted) {
      chat.unreadCount++;
    }
  }

  toggleMute(chatId: number): void {
    const chat = this.getChat(chatId);
    chat.isMuted = !chat.isMuted;
  }

  setBackground(chatId: number, backgroundImage: string): void {
    const chat = this.getChat(chatId);
    chat.backgroundImage = backgroundImage;
  }

  deleteChat(chatId: number): void {
    const index = this.chats.findIndex(chat => chat.id === chatId);
    if (index !== -1) {
      this.chats.splice(index, 1);
    }
    // Remove associated messages
    this.messages = this.messages.filter(message => message.chatId !== chatId);
  }
}