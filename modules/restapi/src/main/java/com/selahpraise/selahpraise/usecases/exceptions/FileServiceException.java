package com.selahpraise.selahpraise.usecases.exceptions;

import java.io.Serial;

public class FileServiceException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 297088121878397324L;

    public FileServiceException(String message) {
        super(message);
    }

    public FileServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}
