import {ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {EMPTY} from 'rxjs';

import {MemberService} from '../../../core/services/member-service';
import {IMember} from '../../../interfaces/member';

export const resolverResolver: ResolveFn<IMember> = (route, _state) => {
  const memberService = inject(MemberService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if(!id) {
    router.navigateByUrl('/not-found');
    return EMPTY;
  }

  return memberService.getMember(id);
};
