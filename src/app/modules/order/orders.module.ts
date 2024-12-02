import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './components/order-list/order-list.component';
import { PrimeNgModule } from '../../shared/prime-ng.module';

@NgModule({
  declarations: [
    OrderListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule {}