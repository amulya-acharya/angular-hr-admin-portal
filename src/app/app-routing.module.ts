import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './core/layout/shell/shell.component';
import { authChildGuard, authMatchGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    component: ShellComponent,
    canActivateChild: [authChildGuard],
    children: [
      {
        path: 'employees',
        canMatch: [authMatchGuard],
        loadChildren: () => import('./features/employees/employees.module').then(m => m.EmployeesModule),
      },
      {
        path: 'leave',
        canMatch: [authMatchGuard],
        loadChildren: () => import('./features/leave/leave.module').then(m => m.LeaveModule),
      },
      {
        path: 'admin',
        canMatch: [authMatchGuard],
        loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
      },
      { path: '', pathMatch: 'full', redirectTo: 'employees' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }