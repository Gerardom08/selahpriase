package com.selahpraise.selahpraise.usecases.exceptions;

public class NoAcceptableException extends RuntimeException {

    private String error;

    public NoAcceptableException() {
        super();
    }

    public NoAcceptableException(final String message, String error) {
        super(message);
        this.error = error;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
