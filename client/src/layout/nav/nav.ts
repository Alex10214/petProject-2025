import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

import {AccountService} from '../../core/services/account-service';
import {ToastService} from '../../core/services/toast-service';
import {ILoginCred} from '../../interfaces/user';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  private router = inject(Router);
  protected accountService = inject(AccountService);
  private toastService = inject(ToastService);
  protected cred: ILoginCred = { email: '', password: '' };

  login() {
    this.accountService.login(this.cred).subscribe({
      next: () => {
        this.router.navigateByUrl("/members");
        this.toastService.success("Login successful");
        this.cred = { email: '', password: '' };
      },
      error: er => {
        this.toastService.error(er.error);
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
