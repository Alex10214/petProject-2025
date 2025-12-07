  import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
  import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient)
  protected readonly title = 'Untitled Application';
  protected members = signal<any>([]);

  ngOnInit(): void {
    this.http.get(" https://localhost:7281/api/members").subscribe({
      next: response => this.members.set(response),
      error: err => console.log(err),
      complete: () => console.log("completed http request")
    })
  }

}
