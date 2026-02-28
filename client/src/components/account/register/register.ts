import {Component, inject, OnInit, output} from '@angular/core';
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

  register() {
    if (this.registerForm.invalid) return;

    this.accountService.register(this.registerForm.value).subscribe({
      next: response => {
        this.cancel();
      },
      error: err => console.log(err),
    });
  }

  cancel() {
    this.isCancelRegister.emit(false);
  }
}
