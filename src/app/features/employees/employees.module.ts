import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeesListComponent } from './pages/employees-list/employees-list.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { EmployeeEditComponent } from './pages/employee-edit/employee-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule
  ]
})
export class EmployeesModule { }
