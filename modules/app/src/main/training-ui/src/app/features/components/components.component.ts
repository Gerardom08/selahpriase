import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrl: './components.component.css',
    standalone: false
})
export class ComponentsComponent {

  
  onBasic(): void {
    Swal.fire("SweetAlert2 is working!");
  }

  onSuccess(): void {
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }

  openModal(): void {
    $('#exampleModalLive').modal('show');
  }

}
