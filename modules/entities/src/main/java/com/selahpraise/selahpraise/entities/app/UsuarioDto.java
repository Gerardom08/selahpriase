package com.selahpraise.selahpraise.entities.app;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.io.Serializable;

public class UsuarioDto implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer idUsuario;

    @NotBlank(message = "es obligatorio")
    @Size(max = 100, message = "no puede tener más de 100 caracteres")
    private String nombre;

    @NotBlank(message = "es obligatorio")
    @Email(message = "debe ser un correo válido")
    @Size(max = 100, message = "no puede tener más de 100 caracteres")
    private String correo;

    @NotBlank(message = "es obligatorio")
    @Size(max = 255, message = "no puede tener más de 255 caracteres")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @NotBlank(message = "es obligatorio")
    @Pattern(regexp = "ADMINISTRADOR|LIDER|MUSICO", message = "debe ser ADMINISTRADOR, LIDER o MUSICO")
    private String rol;

    public UsuarioDto() {
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}
