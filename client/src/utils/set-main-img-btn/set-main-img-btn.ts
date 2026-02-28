import {Component, output} from '@angular/core';

@Component({
  selector: 'app-set-main-img-btn',
  imports: [],
  templateUrl: './set-main-img-btn.html',
  styleUrl: './set-main-img-btn.css',
})
export class SetMainImgBtn {
  clickEvent = output<Event>();

  protected onSetImage(event: Event) {
    this.clickEvent.emit(event);
  }
}
