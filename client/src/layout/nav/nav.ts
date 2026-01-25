import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

import {AccountService} from '../../core/services/account-service';
import {ToastService} from '../../core/services/toast-service';

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
  protected cred: any = {}

  login() {
    this.accountService.login(this.cred).subscribe({
      next: response => {
        console.log(response)
        this.router.navigateByUrl("/members");
        this.toastService.success("Login successful");
        this.cred = {};
      },
      error: er => {
        console.log(er)
        this.toastService.error(er.error);
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl("/");
  }
}
