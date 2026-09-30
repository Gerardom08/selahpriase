package com.selahpraise.selahpraise.usecases.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    private static final long serialVersionUID = -9079454849611061074L;
    public static final String MSG_RESOURCE_NOT_FOUND = "%s not found with %s : '%s'";

    private String error;

    public ResourceNotFoundException() {
        super();
    }

    public ResourceNotFoundException(final String message, String error) {
        super(message);
        this.error = error;
    }

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue, String error) {
        super(String.format("%s no encontrado con %s : '%s'", resourceName, fieldName, fieldValue));
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
