import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomerModel } from '../models/customers.model';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  customers$: BehaviorSubject<CustomerModel[]> = new BehaviorSubject<CustomerModel[]>([]);
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.getCustomers().subscribe(res => {
      this.customers$.next(res.customers);
    })
  }

}
