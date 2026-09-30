package com.selahpraise.selahpraise.usecases.exceptions;

public class RequestConflictException extends RuntimeException {

    private String error;

    public RequestConflictException() {
        super();
    }

    public RequestConflictException(final String message, String error) {
        super(message);
        this.error = error;
    }

    public RequestConflictException(String resourceName, String fieldName, Object fieldValue, String error) {
        super(String.format("%s con %s : '%s' ya existe", resourceName, fieldName, fieldValue));
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

}
