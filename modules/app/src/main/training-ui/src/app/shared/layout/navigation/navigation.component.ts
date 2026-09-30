import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service';
import { environment } from '../../../../environments/environment';
import { I18nService } from '../../i18n/i18n.service';
import { I18nPipe } from '../../i18n/i18n.pipe';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styles: [`
    .pcoded-hasmenu {
      cursor: pointer;
    }
  `],
    standalone: false
})
export class NavigationComponent implements OnInit {
  
  private i18nPipe?:any;

  constructor(
    private i18nService:I18nService,
    private authService: AuthService,
  ) { 
    this.i18nPipe=new I18nPipe(this.i18nService);
  }

  ngOnInit(): void {

  }

  showPopup(): void {
    Swal.fire({
      title:this.i18nPipe.transform("Warning"),
      text: this.i18nPipe.transform("LogoutSwal"),
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.i18nPipe.transform("Yes"),
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.logout();
      }
    });
  }

  private logout(): void {
    const success = this.authService.logout();
    location.href = `${environment.apiUrl}/logout`;
  }

}
