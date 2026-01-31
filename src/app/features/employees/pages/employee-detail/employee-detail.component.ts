// employee-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService, Employee } from '../../services/employees.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
})
export class EmployeeDetailComponent implements OnInit {
  employee?: Employee;
  loading = false;

  constructor(private route: ActivatedRoute, private employees: EmployeesService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;

    this.employees.getById(id).subscribe({
      next: (e) => { this.employee = e; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }
}
