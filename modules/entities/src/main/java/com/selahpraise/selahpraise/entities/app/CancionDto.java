package com.selahpraise.selahpraise.entities.app;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public class CancionDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer idCancion;

    @NotBlank(message = "es obligatorio")
    @Size(max = 100, message = "no puede tener más de 100 caracteres")
    private String titulo;

    @Size(max = 100, message = "no puede tener más de 100 caracteres")
    private String autor;

    @Size(max = 10, message = "no puede tener más de 10 caracteres")
    private String tono;

    private Integer bpm;

    private String letraAcordes;

    @Size(max = 255, message = "no puede tener más de 255 caracteres")
    private String youtubeUrl;

    public CancionDto() {
    }

    public Integer getIdCancion() {
        return idCancion;
    }

    public void setIdCancion(Integer idCancion) {
        this.idCancion = idCancion;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getTono() {
        return tono;
    }

    public void setTono(String tono) {
        this.tono = tono;
    }

    public Integer getBpm() {
        return bpm;
    }

    public void setBpm(Integer bpm) {
        this.bpm = bpm;
    }

    public String getLetraAcordes() {
        return letraAcordes;
    }

    public void setLetraAcordes(String letraAcordes) {
        this.letraAcordes = letraAcordes;
    }

    public String getYoutubeUrl() {
        return youtubeUrl;
    }

    public void setYoutubeUrl(String youtubeUrl) {
        this.youtubeUrl = youtubeUrl;
    }
}
