// employees-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeesService, Employee } from '../../services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit {
  loading = false;
  error = '';
  employees: Employee[] = [];
  total = 0;

  pageSize = 10;
  pageIndex = 0;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.error = '';

    const skip = this.pageIndex * this.pageSize;

    this.employeesService.list(this.pageSize, skip).subscribe({
      next: (res) => {
        this.employees = res.users;
        this.total = res.total;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load employees.';
        this.loading = false;
      },
    });
  }

  next(): void {
    if ((this.pageIndex + 1) * this.pageSize >= this.total) return;
    this.pageIndex++;
    this.load();
  }

  prev(): void {
    if (this.pageIndex === 0) return;
    this.pageIndex--;
    this.load();
  }

  trackById(_: number, e: Employee): number {
    return e.id;
  }
}