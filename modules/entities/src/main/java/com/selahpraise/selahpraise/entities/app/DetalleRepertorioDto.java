package com.selahpraise.selahpraise.entities.app;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public class DetalleRepertorioDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer idDetalle;

    @NotNull(message = "es obligatorio")
    private Integer idRepertorio;

    @NotNull(message = "es obligatorio")
    private Integer idCancion;

    @NotNull(message = "es obligatorio")
    @Min(value = 1, message = "debe ser mayor o igual a 1")
    private Integer orden;

    public DetalleRepertorioDto() {
    }

    public Integer getIdDetalle() {
        return idDetalle;
    }

    public void setIdDetalle(Integer idDetalle) {
        this.idDetalle = idDetalle;
    }

    public Integer getIdRepertorio() {
        return idRepertorio;
    }

    public void setIdRepertorio(Integer idRepertorio) {
        this.idRepertorio = idRepertorio;
    }

    public Integer getIdCancion() {
        return idCancion;
    }

    public void setIdCancion(Integer idCancion) {
        this.idCancion = idCancion;
    }

    public Integer getOrden() {
        return orden;
    }

    public void setOrden(Integer orden) {
        this.orden = orden;
    }
}
