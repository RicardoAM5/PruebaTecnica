import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../../../core/services/order.service';
import { UserService } from '../../../../core/services/user.service';
import { ProductService } from '../../../../core/services/product.service';
import { Order } from '../../../../core/models/order.interface';
import { User } from '../../../../core/models/user.interface';
import { Product } from '../../../../core/models/product.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  users: User[] = [];
  products: Product[] = [];
  filteredUsers: User[] = [];
  filteredProducts: Product[] = [];
  orderForm!: FormGroup;
  showDialog = false;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getOrders();
    this.getUsers();
    this.getProducts();
  }

  initForm() {
    this.orderForm = this.fb.group({
      usuario: [null, Validators.required],
      producto: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(1)]],
    });
  }

  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (orders) => (this.orders = orders),
      error: () => Swal.fire('Error', 'No se pudieron cargar las órdenes.', 'error'),
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
      },
      error: () => Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error'),
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = products;
      },
      error: () => Swal.fire('Error', 'No se pudieron cargar los productos.', 'error'),
    });
  }

  openNew() {
    this.orderForm.reset();
    this.showDialog = true;
  }

  saveOrder() {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.getRawValue();
      const newOrder: Order = {
        idOrden: 0,
        usuario: formValue.usuario,
        producto: formValue.producto,
        cantidad: formValue.cantidad,
        preciounitario: formValue.precioUnitario,
        fecha: new Date(),
      };

      this.orderService.createOrder(newOrder).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Orden creada correctamente.', 'success');
          this.getOrders();
          this.showDialog = false;
        },
        error: () => Swal.fire('Error', 'No se pudo crear la orden.', 'error'),
      });
    } else {
      Swal.fire('Error', 'Por favor complete todos los campos correctamente.', 'error');
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.orderForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  filterUsers(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      user.nombre.toLowerCase().includes(query)
    );
  }

  filterProducts(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredProducts = this.products.filter((product) =>
      product.nombre.toLowerCase().includes(query)
    );
  }

  calculateGrandTotal(): number {
    return this.orders.reduce((total, order) => total + order.cantidad * order.preciounitario, 0);
  }

  calculateSmartphoneTotal(): number {
    return this.orders
      .filter((order) => order.producto.categoria === 'Smartphone')
      .reduce((total, order) => total + order.cantidad * order.preciounitario, 0);
  }
}
