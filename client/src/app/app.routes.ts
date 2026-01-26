import { Routes } from '@angular/router';

import {MemberList} from '../components/members/member-list/member-list';
import {MemberDetails} from '../components/members/member-details/member-details';
import {Lists} from '../components/lists/lists';
import {Messages} from '../components/messages/messages';
import {Home} from '../components/home/home';
import {authGuard} from '../core/guards/auth-guard';
import {TestErrors} from '../components/test-errors/test-errors';
import {NotFound} from '../components/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home},
  { path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberList, canActivate: [authGuard]},
      { path: 'members/:id', component: MemberDetails },
      { path: 'lists', component: Lists },
      { path: 'messages', component: Messages},
    ]
  },
  { path: 'errors', component: TestErrors},
  { path: '**', component: NotFound},
];
