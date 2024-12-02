import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { CoreModule } from './core/core.module';
import { NavbarComponent } from './shared/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule,CoreModule,NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
