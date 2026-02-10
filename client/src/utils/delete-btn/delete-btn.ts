import {Component, output} from '@angular/core';

@Component({
  selector: 'app-delete-btn',
  imports: [],
  templateUrl: './delete-btn.html',
  styleUrl: './delete-btn.css',
})
export class DeleteBtn {
  clickEvent = output<Event>();

  protected onDelete(event: Event) {
    this.clickEvent.emit(event);
  }
}
