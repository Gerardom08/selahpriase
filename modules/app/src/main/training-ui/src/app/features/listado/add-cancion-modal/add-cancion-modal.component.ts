import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

import { CancionService } from '../../../components/services/cancion.service';
import { CancionesDTO } from '../../../components/interfaces/cancionDTO';
import { I18nPipe } from '../../../shared/i18n/i18n.pipe';
import { I18nService } from '../../../shared/i18n/i18n.service';
import { ToasterService } from '../../../shared/utils/toaster.service';

export type CancionModalMode = 'create' | 'details' | 'edit';

@Component({
  selector: 'app-add-cancion-modal',
  templateUrl: './add-cancion-modal.component.html',
  styleUrls: ['./add-cancion-modal.component.css'],
  standalone: false
})
export class AddCancionModalComponent implements OnChanges {
  @Input() visible = false;
  @Input() mode: CancionModalMode = 'create';
  @Input() cancion: CancionesDTO | null = null;

  @Output() closed = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();

  public guardando = false;
  public currentMode: CancionModalMode = 'create';
  public cancionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private cancionService: CancionService,
    private toaster: ToasterService,
    private i18nService: I18nService
  ) {
    this.cancionForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)]],
      autor: [''],
      tono: [''],
      bpm: [null],
      letraAcordes: [''],
      youtubeUrl: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.visible || !(changes['visible'] || changes['mode'] || changes['cancion'])) {
      return;
    }

    this.currentMode = this.mode;
    this.configurarValidaciones();

    if (this.currentMode === 'create') {
      this.cancionForm.reset({
        titulo: '', autor: '', tono: '', bpm: null, letraAcordes: '', youtubeUrl: ''
      });
    } else if (this.cancion) {
      this.cancionForm.reset({
        titulo: this.cancion.titulo ?? '',
        autor: this.cancion.autor ?? '',
        tono: this.cancion.tono ?? '',
        bpm: this.cancion.bpm,
        letraAcordes: this.cancion.letraAcordes ?? '',
        youtubeUrl: this.cancion.youtubeUrl ?? ''
      });
    }
  }

  public cerrar(): void {
    if (!this.guardando) {
      this.closed.emit();
    }
  }

  public editarDesdeDetalle(): void {
    if (!this.cancion) {
      return;
    }

    this.currentMode = 'edit';
    this.configurarValidaciones();
    this.cancionForm.reset({
      titulo: this.cancion.titulo ?? '',
      autor: this.cancion.autor ?? '',
      tono: this.cancion.tono ?? '',
      bpm: this.cancion.bpm,
      letraAcordes: this.cancion.letraAcordes ?? '',
      youtubeUrl: this.cancion.youtubeUrl ?? ''
    });
  }

  public guardar(): void {
    if (this.currentMode === 'details') {
      return;
    }

    if (this.cancionForm.invalid) {
      this.cancionForm.markAllAsTouched();
      return;
    }

    const values = this.cancionForm.getRawValue();
    const cancion: CancionesDTO = {
      idCancion: this.currentMode === 'edit' ? this.cancion?.idCancion : undefined,
      titulo: values.titulo.trim(),
      autor: values.autor?.trim() ?? '',
      tono: values.tono?.trim() ?? '',
      bpm: values.bpm,
      letraAcordes: values.letraAcordes?.trim() ?? '',
      youtubeUrl: values.youtubeUrl?.trim() ?? ''
    };

    if (this.currentMode === 'edit' && !cancion.idCancion) {
      return;
    }

    const i18nPipe = new I18nPipe(this.i18nService);
    this.guardando = true;

    const request = this.currentMode === 'edit'
      ? this.cancionService.actualizarCancion(cancion.idCancion!, cancion)
      : this.cancionService.crearCancion(cancion);

    request.pipe(
      finalize(() => {
        this.guardando = false;
      })
    ).subscribe({
      next: () => {
        const editando = this.currentMode === 'edit';
        this.toaster.showSuccess(
          i18nPipe,
          i18nPipe.transform(editando ? 'Song.toast.updated.success' : 'Song.toast.created.success'),
          i18nPipe.transform(editando ? 'Song.toast.updated.title' : 'Song.toast.created.title')
        );
        this.saved.emit();
        this.closed.emit();
      },
      error: (error: any) => {
        console.error('Error al guardar la canción:', error);
        this.toaster.showError(
          i18nPipe,
          i18nPipe.transform(this.currentMode === 'edit' ? 'Song.toast.save.error' : 'Song.toast.create.error'),
          i18nPipe.transform('Error')
        );
      }
    });
  }

  private configurarValidaciones(): void {
    const editando = this.currentMode === 'edit';
    const requiredText = editando
      ? [Validators.required, Validators.pattern(/\S/)]
      : [];

    this.cancionForm.get('titulo')?.setValidators([
      Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)
    ]);
    this.cancionForm.get('autor')?.setValidators([...requiredText, Validators.maxLength(100)]);
    this.cancionForm.get('tono')?.setValidators([...requiredText, Validators.maxLength(10)]);
    this.cancionForm.get('bpm')?.setValidators(editando
      ? [Validators.required, Validators.min(1), Validators.max(500)]
      : [Validators.min(1), Validators.max(500)]);
    this.cancionForm.get('letraAcordes')?.setValidators(editando ? requiredText : []);
    this.cancionForm.get('youtubeUrl')?.setValidators(editando
      ? [Validators.required, Validators.pattern(/^https?:\/\/\S+$/i), Validators.maxLength(255)]
      : [Validators.maxLength(255)]);

    Object.values(this.cancionForm.controls).forEach(control => {
      control.updateValueAndValidity({ emitEvent: false });
    });
  }
}
