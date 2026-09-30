import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const mainGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = authService.isAuthenticated(); 
    if (!isAuthenticated) {
        router.navigateByUrl('/on-login');
    }

    // TODO: implements token expired

    return isAuthenticated;
}

