import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CustomerModel } from '../models/customers.model';
import { MessageModel } from '../models/message.model';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit, AfterViewChecked  {
  @ViewChild('messageInput', {static: true}) messageInput: ElementRef;
  @ViewChild('messagesView', {static: true}) messagesView: ElementRef;

  messages$: BehaviorSubject<MessageModel[]> = new BehaviorSubject<MessageModel[]>([]);
  customer$: BehaviorSubject<CustomerModel> = new BehaviorSubject<CustomerModel>(null);
  customerId: string;

  constructor(private messageService: MessageService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listenForMessages();
    this.activatedRoute.params.subscribe(params => {
      this.messageService.getCustomerMessages(params.customerId).subscribe(res => {
        if (res) {
          const { messages,  firstName, lastName, createdAt, _id} = res;
          this.customerId = _id;
          this.customer$.next({
            firstName, lastName, createdAt
          })
          this.messages$.next(messages);
          this.scrollToBottom();
        }
      });
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  listenForMessages(): void {
		this.messageService.receiveMessages().subscribe((response: any) => {
			if (response) {
        const currentMessages = this.messages$.value;
        this.messages$.next([...currentMessages, response.message]);
        this.scrollToBottom();
			}
		});
	}


  onReplyToCustomer(): void {
    const message =  this.messageInput.nativeElement.value?.trim();
    if (message) {
      this.messageService.sendMessage({
        message,
        customerId: this.customerId
      });
      this.messageInput.nativeElement.value = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
        this.messagesView.nativeElement.scrollIntoView({behavior: "smooth"});
        this.messagesView.nativeElement.scrollTop = this.messagesView.nativeElement.scrollHeight;

    } catch (e) {
        console.error(e);
    }
  }

}
