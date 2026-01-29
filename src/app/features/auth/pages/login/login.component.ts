import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})


export class LoginComponent {

  loading = false;
  errorMsg = '';

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['emilys', Validators.required],
      password: ['emilyspass', Validators.required],
    });
  }



  submit(): void {
    if (this.form.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    this.auth.login({ ...this.form.getRawValue(), expiresInMins: 60 }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/employees');
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'Login failed. Check credentials.';
      },
    });
  }
}
