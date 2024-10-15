import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { ChatListComponent } from './chat/chat-list.component'
import { ChatDetailComponent } from './chat/chat-detail.component'
import { ContactDetailComponent } from './contact/contact-detail.component'

const routes: Routes = [
  { path: '', redirectTo: '/chats', pathMatch: 'full' },
  { path: 'chats', component: ChatListComponent },
  { path: 'chat/:id', component: ChatDetailComponent },
  { path: 'contact/:id', component: ContactDetailComponent },
]

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}