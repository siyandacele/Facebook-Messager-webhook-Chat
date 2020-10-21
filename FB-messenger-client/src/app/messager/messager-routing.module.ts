import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { CustomersComponent } from './customers/customers.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      {
        path: ':customerId',
        component: ChatComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagerRoutingModule { }
