import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptModule } from '@nativescript/angular'
import { NativeScriptFormsModule } from '@nativescript/angular'
import { TNSFontIconModule } from '@nativescript/fonticon'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ChatListComponent } from './chat/chat-list.component'
import { ChatDetailComponent } from './chat/chat-detail.component'
import { ContactDetailComponent } from './contact/contact-detail.component'

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    AppRoutingModule,
    TNSFontIconModule.forRoot({
      'fa': './assets/fontawesome.min.css'
    })
  ],
  declarations: [AppComponent, ChatListComponent, ChatDetailComponent, ContactDetailComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}