package com.selahpraise.selahpraise.adapters.controllers.rest.exceptions;

import java.util.List;

public class RequestBadException extends RuntimeException {

    private static final String DESCRIPTION = "Validación de los datos de la petición no exitosa.";

    private String error;
    private List<String> errores;

    public RequestBadException() {
        super();
    }

    public RequestBadException(final String message) {
        super(message);
    }

    public RequestBadException(final String message, String error) {
        super(message);
        this.error = error;
    }

    public RequestBadException(final String message, List<String> errores) {
        super(message);
        this.error = DESCRIPTION;
        this.errores = errores;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public List<String> getErrores() {
        return errores;
    }

    public void setErrores(List<String> errores) {
        this.errores = errores;
    }
}