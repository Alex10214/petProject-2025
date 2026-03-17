import {Component, inject, OnInit, output, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

import {AccountService} from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit{
  private accountService = inject(AccountService);
  isCancelRegister = output<boolean>();
  protected registerForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      displayName: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      birthDay: new FormControl('', Validators.required),
    })
  }

  maxDate() {
    return new Date().toISOString().split('T')[0];
  }

  validationErrors = signal<string[]>([]);

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.validationErrors.set([]);
    this.accountService.register(this.registerForm.value).subscribe({
      next: () => {
        this.cancel();
      },
      error: (err: string[]) => this.validationErrors.set(err),
    });
  }

  cancel() {
    this.isCancelRegister.emit(false);
  }
}
