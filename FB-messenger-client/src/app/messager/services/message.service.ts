import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { getCustomerResponseModel } from '../models/customers.model';
import { MessageModel, SendMessageModel, GetMessagesModel } from '../models/message.model';


@Injectable()
export class MessageService {
  private socket: any;
  private socketUrl = environment.socketUrl
  private customersUrl = `${environment.backendUrl}/customers`;

  constructor(private http: HttpClient) {
    this.socket = io(this.socketUrl);
  }

  /**
   * Get Customers from endpoint
   *
   */
  getCustomers(): Observable<getCustomerResponseModel> {
    return this.http.get<getCustomerResponseModel>(this.customersUrl);
  }


  /**
   * Send Message Event
   * @param obj: SendMessageModel
   */
	sendMessage(obj: SendMessageModel): void {
			this.socket.emit('sendMessage', obj);
  }

  /**
   * Receive Messages  Event
   *
   */
	receiveMessages(): Observable<MessageModel> {
		return new Observable<MessageModel>(observer => {
			this.socket.on('message', (data) => {
				observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		});
	}

  /**
   * Get Customer Messages Event
   * @param customerId: string
   */
	getCustomerMessages(customerId: string): Observable<GetMessagesModel> {
		if (customerId !== null) {
			this.socket.emit('getCustomerMessages', { customerId });
		}
		return new Observable(observer => {
			this.socket.on('customerMessages', (data: GetMessagesModel) => {
				observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		});
  }

}
