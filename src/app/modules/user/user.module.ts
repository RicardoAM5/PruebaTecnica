import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { PrimeNgModule } from '../../shared/prime-ng.module';
import { UsersRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PrimeNgModule,
    UsersRoutingModule
  ],
})
export class UsersModule {}