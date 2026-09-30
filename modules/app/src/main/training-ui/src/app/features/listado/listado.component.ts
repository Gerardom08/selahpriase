import { Component, OnInit } from '@angular/core';

import { CancionService } from '../../components/services/cancion.service';
import { CancionesDTO } from '../../components/interfaces/cancionDTO';
import { ToasterService } from '../../shared/utils/toaster.service';
import { I18nPipe } from '../../shared/i18n/i18n.pipe';
import { I18nService } from '../../shared/i18n/i18n.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  standalone: false
})
export class ListadoComponent implements OnInit {

  public canciones: CancionesDTO[] = [];
  public cargando: boolean = false;
  public paginator: any = null;
  public size: number = 2;
  public tituloBusqueda: string = '';

  // Modal de agregar / editar / ver detalle
  public modalVisible: boolean = false;
  public modalMode: 'create' | 'edit' | 'details' = 'create';
  public modalCancion: CancionesDTO | null = null;

  constructor(
    private cancionService: CancionService,
    private toaster: ToasterService,
    private i18nService: I18nService
  ) {}

  ngOnInit(): void {
    this.getCanciones(0);
  }

  public getCanciones(page: number): void {
    this.cargando = true;

    this.cancionService.getCancion(page, this.size).subscribe({
      next: (response: any) => {
        if (response?.contenido && Array.isArray(response.contenido)) {
          this.canciones = response.contenido;
          this.paginator = {
            number: response.paginaActual,
            totalPages: response.totalPaginas,
            totalElements: response.totalElementos,
            size: response.tamano,
            first: response.paginaActual === 0,
            last: response.paginaActual === response.totalPaginas - 1
          };
        } else {
          this.canciones = [];
          this.paginator = null;
        }
        this.cargando = false;
      },
      error: (error: any) => {
        console.error('Error al obtener las canciones:', error);
        this.canciones = [];
        this.paginator = null;
        this.cargando = false;
      }
    });
  }

  public buscar(): void {
    const texto = this.tituloBusqueda.trim();
    const i18nPipe = new I18nPipe(this.i18nService);

    if (!texto) {
      this.toaster.showError(i18nPipe, 'Debes escribir un texto para buscar', 'Error');
      return;
    }

    this.cargando = true;

    this.cancionService.getCancion(0, 1000).subscribe({
      next: (response: any) => {
        if (!response?.contenido || !Array.isArray(response.contenido)) {
          this.canciones = [];
          this.paginator = null;
          this.cargando = false;
          this.toaster.showError(i18nPipe, 'No se pudieron obtener las canciones', 'Error');
          return;
        }

        const textoNormalizado = this.normalizarTexto(texto);

        const resultados: CancionesDTO[] = response.contenido.filter((cancion: CancionesDTO) => {
          const titulo = this.normalizarTexto(cancion.titulo || '');
          const autor = this.normalizarTexto(cancion.autor || '');
          return titulo.includes(textoNormalizado) || autor.includes(textoNormalizado);
        });

        this.canciones = resultados;
        this.paginator = null;
        this.cargando = false;

        if (resultados.length > 0) {
          this.toaster.showSuccess(i18nPipe, `${resultados.length} Songs were found `, 'Correct');
        } else {
          this.toaster.showError(i18nPipe, 'No se encontraron canciones con ese texto', 'Sin resultados');
        }
      },
      error: (error: any) => {
        console.error('Error al buscar canciones:', error);
        this.canciones = [];
        this.paginator = null;
        this.cargando = false;
        this.toaster.showError(i18nPipe, 'No se pudo realizar la búsqueda', 'Error');
      }
    });
  }

  public deleteCancion(idCancion?: number): void {
    if (idCancion == null) return;

    const i18nPipe = new I18nPipe(this.i18nService);

    Swal.fire({
      icon: 'question',
      title: '¿Deseas borrar la canción?',
      showCancelButton: true,
      confirmButtonText: i18nPipe.transform('confirm'),
      cancelButtonText: i18nPipe.transform('cancel'),
      customClass: { confirmButton: 'btn btn-primary', cancelButton: 'btn btn-danger' },
      buttonsStyling: false
    }).then((result) => {
      if (!result.isConfirmed) return;

      this.cancionService.deleteCancion(idCancion).subscribe({
        next: () => {
          this.toaster.showSuccess(i18nPipe, 'La canción se eliminó correctamente', 'Eliminación correcta');
          this.recargarLista();
        },
        error: (error: any) => {
          console.error('Error al eliminar la canción:', error);
          if (error.status === 409) return;
          this.toaster.showError(i18nPipe, 'No se pudo eliminar la canción', 'Error');
        }
      });
    });
  }

  // ---------- MODAL ----------

  public agregarCancion(): void {
    this.abrirModal('create', null);
  }

  public verCancion(cancion: CancionesDTO): void {
    this.abrirModal('details', cancion);
  }

  public editarCancion(cancion: CancionesDTO): void {
    this.abrirModal('edit', cancion);
  }

  public cerrarCancionModal(): void {
    this.modalVisible = false;
    this.modalCancion = null;
  }

  public cancionGuardada(): void {
    this.cerrarCancionModal();
    this.recargarLista();
  }

  private abrirModal(mode: 'create' | 'edit' | 'details', cancion: CancionesDTO | null): void {
    this.modalMode = mode;
    this.modalCancion = cancion;
    this.modalVisible = true;
  }

  // ---------- UTILIDADES ----------

  private recargarLista(): void {
    if (this.tituloBusqueda.trim()) {
      this.buscar();
    } else {
      this.getCanciones(this.paginator?.number ?? 0);
    }
  }

  private normalizarTexto(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  public limpiarBusqueda(): void {
    this.tituloBusqueda = '';
    this.getCanciones(0);
  }

  public enlaceYoutube(cancion: CancionesDTO): string {
    return cancion.youtubeUrl ? cancion.youtubeUrl : '#';
  }
}