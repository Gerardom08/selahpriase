package com.selahpraise.selahpraise.usecases.exceptions;

public class UseCaseException extends Exception {

    private static final long serialVersionUID = -4832723785081860373L;

    private String error;

    public UseCaseException() {

    }

    public UseCaseException(String message) {
        super(message);
    }

    public UseCaseException(String message, String error) {
        super(message);
        this.error = error;
    }

    public UseCaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public UseCaseException(String message, String error, Throwable cause) {
        this(message, cause);
        this.error = error;
    }

    public UseCaseException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public String getError() {
        return error;
    }
}
