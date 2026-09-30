import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrl: './authorized.component.css',
  standalone: false
})
export class AuthorizedComponent implements OnInit, AfterViewInit {

  route = inject(ActivatedRoute);
  spinner: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.logout();

    this.route.queryParamMap.subscribe(params => {
      const code = params.get('code');

      if (code) {
        this.authenticate(code);
      } else {
        //console.log('redirect url....'); // TODO: redirect url pending
        this.spinner = false;
      }
    });
  }

  ngAfterViewInit(): void {
    this.spinner = true;
  }

  authenticate(code: string): void {
    this.authService.sendAuthCode(code).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/home']);
        }

        this.spinner = false;
        // TODO: implements redirect page acces denied or show in this view a button to try again
      }
    );
  }
}
