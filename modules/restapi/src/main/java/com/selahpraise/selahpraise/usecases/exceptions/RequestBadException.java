package com.selahpraise.selahpraise.usecases.exceptions;

public class RequestBadException extends RuntimeException {

    private static final String DESCRIPTION = "Validation of parameters not successful :: ";
    private String error;

    public RequestBadException() {
        super();
    }

    public RequestBadException(final String message) {
        super(message);
    }

    public RequestBadException(final String message, String error) {
        super(DESCRIPTION + message);
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
