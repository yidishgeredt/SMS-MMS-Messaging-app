import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Chat } from './chat.model';
import { action } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { openUrl } from '@nativescript/core/utils';

@Component({
  selector: 'ns-chat-list',
  templateUrl: './chat-list.component.html',
})
export class ChatListComponent implements OnInit {
  chats: Chat[];

  constructor(
    private chatService: ChatService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.chats = this.chatService.getChats();
  }

  onItemLongPress(chat: Chat): void {
    action({
      message: "Choose an action",
      cancelButtonText: "Cancel",
      actions: [
        chat.isMuted ? "Unmute" : "Mute",
        "View Contact Details",
        "Call Contact",
        "Delete"
      ]
    }).then(result => {
      switch (result) {
        case "Mute":
        case "Unmute":
          this.toggleMute(chat.id);
          break;
        case "View Contact Details":
          this.viewContactDetails(chat.id);
          break;
        case "Call Contact":
          this.callContact(chat.phoneNumber);
          break;
        case "Delete":
          this.deleteChat(chat.id);
          break;
      }
    });
  }

  toggleMute(chatId: number): void {
    this.chatService.toggleMute(chatId);
    this.refreshChats();
  }

  deleteChat(chatId: number): void {
    this.chatService.deleteChat(chatId);
    this.refreshChats();
  }

  viewContactDetails(chatId: number): void {
    this.routerExtensions.navigate(['/contact', chatId]);
  }

  callContact(phoneNumber: string): void {
    openUrl(`tel:${phoneNumber}`);
  }

  private refreshChats(): void {
    this.chats = this.chatService.getChats();
  }
}