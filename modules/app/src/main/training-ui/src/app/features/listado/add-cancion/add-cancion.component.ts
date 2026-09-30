import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CancionService } from '../../../components/services/cancion.service';
import { CancionesDTO } from '../../../components/interfaces/cancionDTO';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { ToasterService } from '../../../shared/utils/toaster.service';

@Component({
  selector: 'app-add-cancion',
  templateUrl: './add-cancion.component.html',
  styleUrls: ['./add-cancion.component.css'],
  standalone: false
})
export class AddCancionComponent {
  public guardando = false;

  public cancionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cancionService: CancionService,
    private router: Router,
    private toaster: ToasterService,
    private i18nService: I18nService
  ) {
    this.cancionForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      autor: ['', Validators.maxLength(100)],
      tono: ['', Validators.maxLength(10)],
      bpm: [null, [Validators.min(1), Validators.max(500)]],
      letraAcordes: [''],
      youtubeUrl: ['', Validators.maxLength(255)]
    });
  }

  public guardar(): void {
    if (this.cancionForm.invalid) {
      this.cancionForm.markAllAsTouched();
      return;
    }

    const valores = this.cancionForm.getRawValue();
    const cancion: CancionesDTO = {
      titulo: valores.titulo!.trim(),
      autor: valores.autor?.trim() ?? '',
      tono: valores.tono?.trim() ?? '',
      bpm: valores.bpm,
      letraAcordes: valores.letraAcordes?.trim() ?? '',
      youtubeUrl: valores.youtubeUrl?.trim() ?? ''
    };

    this.guardando = true;
    const i18nPipe = new I18nPipe(this.i18nService);

    this.cancionService.crearCancion(cancion).subscribe({
      next: () => {
        this.toaster.showSuccess(
          i18nPipe,
          i18nPipe.transform('Song.toast.created.success'),
          i18nPipe.transform('Song.toast.created.title')
        );
        this.router.navigate(['/listado']);
      },
      error: (error: any) => {
        console.error('Error al agregar la canción:', error);
        this.guardando = false;
        this.toaster.showError(
          i18nPipe,
          i18nPipe.transform('Song.toast.create.error'),
          i18nPipe.transform('Error')
        );
      }
    });
  }

  public cancelar(): void {
    this.router.navigate(['/listado']);
  }
}
