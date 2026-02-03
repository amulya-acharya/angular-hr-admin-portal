import { AfterViewInit, Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EmployeesService } from '../../services/employees.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

/**
 * Shape used by your template:
 * e.firstName, e.lastName, e.email, e.id
 */
export interface EmployeeListItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * Expected API response for paginated list
 */
export interface EmployeeListResponse {
  items: EmployeeListItem[];
  total: number;
}

/**
 * Replace this with your real service.
 * If you already have EmployeesService, just match the method signature.
 */
export abstract class EmployeesApi {
  abstract getEmployees(params: { page: number; size: number; q?: string }): import('rxjs').Observable<EmployeeListResponse>;
}

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit, AfterViewInit {

  constructor(private api: EmployeesService, private router: Router) { }

  // UI state
  loading = false;
  error: string | null = null;
  dataSource = new MatTableDataSource<EmployeeListItem>([]);
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  actionsMenu = [
    { label: 'View Profile', action: 'view' },
    { label: 'Edit Details', action: 'edit' },
    { label: 'Deactivate Employee', action: 'deactivate' },
  ];

  // Pagination state (template uses page, size, total, pageIndex)
  page = 1;          // 1-based
  size = 10;
  total = 0;
  pageIndex = 1;     // displayed in UI

  // Data rendered by template
  employees: EmployeeListItem[] = [];

  // Search input (matches your [formControl]="searchCtrl")
  searchCtrl = new FormControl<string>('', { nonNullable: true });

  // internal streams
  private readonly page$ = new BehaviorSubject<number>(1);
  private readonly size$ = new BehaviorSubject<number>(10);

  ngOnInit(): void {
    this.getEmployeesList();
  }

  getEmployeesList(): void {
    this.loading = true;
    this.error = null;

    this.api.list(this.size, (this.page - 1) * this.size).pipe(
      finalize(() => this.loading = false),
    ).subscribe({
      next: (res) => {
        this.dataSource.data = res.users.map(user => ({
          id: user.id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }));
        this.total = res.total;
      },
      error: (err) => {
        this.error = 'Failed to load employees. Please try again later.';
      }
    });
  }

  ngAfterViewInit() {
    // DO NOT assign paginator to dataSource when doing server-side pagination
    // this.dataSource.paginator = this.paginator;  // REMOVE THIS
    // Instead, just set paginator.length and manage pagination via API calls
  }

  pagination(event: any) {
    this.page = event.pageIndex + 1;
    this.size = event.pageSize;
    this.getEmployeesList();
  }

  /**
   * Navigate to employee details page
   * @param employee The employee record
   */
  viewEmployeeDetails(employee: EmployeeListItem): void {
    this.router.navigate(['/employees', employee.id]);
  }

  /**
   * Handle action menu item click
   * @param action The action type (view, edit, deactivate)
   * @param employee The employee record
   */
  onActionClick(action: string, employee: EmployeeListItem): void {
    switch (action) {
      case 'view':
        // Navigate to employee detail/view page
        this.router.navigate(['/employees', employee.id]);
        break;
      case 'edit':
        // Navigate to employee edit page
        this.router.navigate(['/employees', employee.id, 'edit']);
        break;
      case 'deactivate':
        // Show confirmation dialog and deactivate employee
        if (confirm(`Are you sure you want to deactivate ${employee.firstName} ${employee.lastName}?`)) {
          this.deactivateEmployee(employee.id);
        }
        break;
      default:
        console.warn('Unknown action:', action);
    }
  }

  /**
   * Deactivate an employee
   * @param employeeId The employee ID to deactivate
   */
  private deactivateEmployee(employeeId: string): void {
    // TODO: Call API to deactivate employee
    console.log('Deactivating employee:', employeeId);
    alert('Employee deactivated successfully!');
    // Refresh the list
    this.getEmployeesList();
  }

}