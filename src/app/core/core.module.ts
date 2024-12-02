import { NgModule} from '@angular/core';
import { UserService } from './services/user.service';
import { HttpClientModule, HttpRequest, HttpResponse } from '@angular/common/http';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';

@NgModule({
  imports: [
    HttpClientModule,
    
  ],
  providers: [
    UserService,
    OrderService,
    ProductService,
  ],
})
export class CoreModule {

}
