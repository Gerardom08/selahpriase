import { Component } from '@angular/core';
import { LayoutService } from '../../../core/services';
import { I18nService } from '../../i18n/i18n.service';
import { languages } from '../../i18n/languages.model';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';
import { I18nPipe } from '../../i18n/i18n.pipe';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    standalone: false
})
export class HeaderComponent {

  windowWidth!: number;
  public navCollapsedMob: boolean;
  public languages: Array<any> | undefined;
  public currentLanguage: any;
  public domainName:string = "";
  private i18nPipe?:any;

  constructor(private layoutService: LayoutService, private i18nService: I18nService,
    private authService:AuthService
  ) {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
    this.domainName=(this.authService.user?.domain?.name ?? "");
    this.i18nPipe=new I18nPipe(this.i18nService);
    //console.log(this.authService.user?.domain);
  }

  ngOnInit() {
    this.languages = languages;
    this.currentLanguage = this.i18nService.currentLanguage;
  }

  navCollapse(): void {
    this.layoutService.onCollapseMenu();
  }

  navMobClick(): void {
    if (this.navCollapsedMob && !document.querySelector('.pcoded-navbar')?.classList.contains('mob-open')) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
  }

  setLanguage(language: any) {
    this.currentLanguage = language;
    this.i18nService.setLanguage(language);
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
