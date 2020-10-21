import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagerRoutingModule } from './messager-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateAgoPipe } from '../pipes/date-ago.pipe';

import { MessageService} from './services/message.service'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CustomersComponent, ChatComponent, DateAgoPipe],
  imports: [
    CommonModule,
    MessagerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    MessageService
  ]
})
export class MessagerModule { }
