import { Component, OnInit } from '@angular/core';
import { PrimeNgModule } from '../prime-ng.module';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from '../../core/core.module';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [ PrimeNgModule,CoreModule],

})
export class NavbarComponent implements OnInit {
  menuItems: any[] = [];

  constructor() {}

  ngOnInit() {
    this.menuItems = [
      { label: 'Usuarios', icon: 'pi pi-users', routerLink: '/users' },
      { label: 'Ordenes', icon: 'pi pi-shopping-cart', routerLink: '/orders' },
    ];
  }
}
