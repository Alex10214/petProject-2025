import {Component, inject, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
})
export class TestErrors {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:7281/api/';

  validationErrors = signal<string[]>([]);

  get404Errors() {
    this.http.get(this.baseUrl + 'bug/not-found').subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get400Errors() {
    this.http.get(this.baseUrl + 'bug/bad-request').subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get500Errors() {
    this.http.get(this.baseUrl + 'bug/server-error').subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get401Errors() {
    this.http.get(this.baseUrl + 'bug/auth').subscribe({
      next: response => console.log(response),
      error: err => console.log(err)
    });
  }

  get400ValidationErrors() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: response => console.log(response),
      error: err => {
        this.validationErrors.set(err);
      }
    });
  }
}
