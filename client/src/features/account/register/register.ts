import {Component, inject, input, output, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IRegisterCred, IUser} from '../../../interfaces/user';
import {AccountService} from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService = inject(AccountService);
  isCancelRegister = output<boolean>();
  protected creds = {} as IRegisterCred;

  register() {
    this.accountService.register(this.creds).subscribe({
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
