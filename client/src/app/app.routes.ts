import { Routes } from '@angular/router';
import {authGuard} from '../core/guards/auth-guard';

import {MemberList} from '../components/members/member-list/member-list';
import {MemberDetails} from '../components/members/member-details/member-details';
import {Lists} from '../components/lists/lists';
import {Messages} from '../components/messages/messages';
import {Home} from '../components/home/home';
import {NotFound} from '../components/not-found/not-found';
import {MemberProfile} from '../components/members/member-profile/member-profile';
import {MemberMessages} from '../components/members/member-messages/member-messages';
import {MemberImages} from '../components/members/member-images/member-images';
import {resolverResolver} from '../components/members/member-resolver/resolver-resolver';

export const routes: Routes = [
  { path: '', component: Home},
  { path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberList, canActivate: [authGuard]},
      {
        path: 'members/:id',
        resolve: {member: resolverResolver},
        runGuardsAndResolvers: 'always',
        component: MemberDetails,
        children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: MemberProfile, title: 'Profile' },
          { path: 'messages', component: MemberMessages, title: 'Messages' },
          { path: 'images', component: MemberImages, title: 'Images' },
        ]
      },
      { path: 'lists', component: Lists },
      { path: 'messages', component: Messages},
    ]
  },
  { path: '**', component: NotFound},
];
