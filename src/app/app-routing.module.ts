import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [ 
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'orders',
    loadChildren: () =>
      import('./modules/order/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UsersModule),
  },

  { path: '**', redirectTo: '/orders' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
