import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

import Swal from 'sweetalert2';

export const roleGuard: CanActivateFn = (route, state) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
        router.navigate(['/on-login']);
        return false;
    }

    // validamos el rol de administrador con acceso a todos los recursos
    if (authService.hasRole('ROLE_ADMIN')) {
        return true;
    }

    const role = route.data['role'] as string;
    // console.log(role);

    if (authService.hasRole(role)) {
        return true;
    }

    Swal.fire('Acceso denegado', `Hola ${authService.user.username} no tienes acceso a este recurso.`, 'warning');
    router.navigate(['/home']);
    return false;
}
