import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
  standalone: false
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    const success = this.authService.logout();
    if (success) {
      Swal.fire('Logout', `Ha cerrado sesion con exito!`, 'success');
      this.router.navigate(['/on-login']);
    }
  }
}
