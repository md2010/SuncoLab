import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
   const authService = inject(AuthService);
   const router = inject(Router);

   if (authService.authorizedSubject && authService.authorizedSubject.value == undefined) {
      return await authService.checkIsAuthorized();
   }

   if (authService.authorizedSubject && authService.authorizedSubject.value?.isAuth) {
      return true;
   }
   else {
    router.navigate(['/unauthorized']);
    return false;
   }
};
