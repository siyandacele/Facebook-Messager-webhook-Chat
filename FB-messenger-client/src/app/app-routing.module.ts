import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  },
  {
    path: 'customers',
    loadChildren: () => import('./messager/messager.module').then(m => m.MessagerModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
