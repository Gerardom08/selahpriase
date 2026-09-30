package com.selahpraise.selahpraise.entities.app;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.time.LocalDate;

public class RepertorioDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer idRepertorio;

    @NotNull(message = "es obligatoria")
    private LocalDate fecha;

    @NotBlank(message = "es obligatorio")
    @Size(max = 100, message = "no puede tener más de 100 caracteres")
    private String nombre;

    private String descripcion;

    @NotNull(message = "es obligatorio")
    private Integer idUsuario;

    public RepertorioDto() {
    }

    public Integer getIdRepertorio() {
        return idRepertorio;
    }

    public void setIdRepertorio(Integer idRepertorio) {
        this.idRepertorio = idRepertorio;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }
}
