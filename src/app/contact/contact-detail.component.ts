import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat/chat.service';
import { Contact } from '../chat/chat.model';
import { openUrl } from '@nativescript/core/utils';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-contact-detail',
  templateUrl: './contact-detail.component.html',
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.contact = this.chatService.getContact(id);
  }

  callContact(): void {
    openUrl(`tel:${this.contact.phoneNumber}`);
  }

  emailContact(): void {
    openUrl(`mailto:${this.contact.email}`);
  }

  sendMessage(): void {
    this.routerExtensions.navigate(['/chat', this.contact.id]);
  }
}