import {ResolveFn, Router} from '@angular/router';
import {MemberService} from '../../../core/services/member-service';
import {inject} from '@angular/core';
import {IMember} from '../../../interfaces/member';
import {EMPTY} from 'rxjs';

export const resolverResolver: ResolveFn<IMember> = (route, state) => {
  const memberService = inject(MemberService);
  const router = inject(Router);
  const id = route.paramMap.get('id');

  if(!id) {
    router.navigateByUrl('/not-found');
    return EMPTY;
  }

  return memberService.getMember(id);
};
