import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import {Nav} from '../layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrls: ['./app.css']
})
export class App {
  protected router = inject(Router);
}
