package com.selahpraise.selahpraise.entities.app;

import java.io.Serializable;
import java.util.List;

/**
 * Envoltura genérica para respuestas paginadas. La usan TODOS los
 * "listarPaginado" (Usuario, Cancion, Repertorio, DetalleRepertorio)
 * para no repetir esta forma en cada Dto.
 *
 * @param <T> el tipo de Dto que contiene la página (ej. UsuarioDto)
 */
public class PageResponseDto<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<T> contenido;
    private int paginaActual;
    private int totalPaginas;
    private long totalElementos;
    private int tamano;

    public PageResponseDto() {
    }

    public PageResponseDto(List<T> contenido, int paginaActual, int totalPaginas, long totalElementos, int tamano) {
        this.contenido = contenido;
        this.paginaActual = paginaActual;
        this.totalPaginas = totalPaginas;
        this.totalElementos = totalElementos;
        this.tamano = tamano;
    }

    public List<T> getContenido() {
        return contenido;
    }

    public void setContenido(List<T> contenido) {
        this.contenido = contenido;
    }

    public int getPaginaActual() {
        return paginaActual;
    }

    public void setPaginaActual(int paginaActual) {
        this.paginaActual = paginaActual;
    }

    public int getTotalPaginas() {
        return totalPaginas;
    }

    public void setTotalPaginas(int totalPaginas) {
        this.totalPaginas = totalPaginas;
    }

    public long getTotalElementos() {
        return totalElementos;
    }

    public void setTotalElementos(long totalElementos) {
        this.totalElementos = totalElementos;
    }

    public int getTamano() {
        return tamano;
    }

    public void setTamano(int tamano) {
        this.tamano = tamano;
    }
}
