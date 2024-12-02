import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  
  exports: [
    ButtonModule,
    DropdownModule,
    InputNumberModule,
    ToolbarModule,
    TableModule,
    MenubarModule,
    TagModule,
    InputTextModule,
    DialogModule,
  ],
})
export class PrimeNgModule {}
