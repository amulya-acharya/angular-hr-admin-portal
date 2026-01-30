// src/app/features/employees/services/employees.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string;
  company?: { department?: string; title?: string };
}

export interface EmployeesResponse {
  users: Employee[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({ providedIn: 'root' })
export class EmployeesService {
  private baseUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) { }

  list(limit = 10, skip = 0): Observable<EmployeesResponse> {
    return this.http.get<EmployeesResponse>(`${this.baseUrl}?limit=${limit}&skip=${skip}`);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  search(query: string, limit = 10, skip = 0): Observable<EmployeesResponse> {
    return this.http.get<EmployeesResponse>(
      `${this.baseUrl}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`
    );
  }
}
