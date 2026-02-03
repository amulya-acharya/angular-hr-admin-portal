import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeesListComponent } from './pages/employees-list/employees-list.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './pages/employee-edit/employee-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeesListComponent,
    EmployeeDetailComponent,
    EmployeeEditComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
]
})
export class EmployeesModule { }
