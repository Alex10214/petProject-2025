import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';

import {IMember} from '../../../interfaces/member';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})
export class MemberCard {
  member = input.required<IMember>()
}
