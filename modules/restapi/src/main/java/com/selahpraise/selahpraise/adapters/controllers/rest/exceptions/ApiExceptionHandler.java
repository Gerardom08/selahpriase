package com.selahpraise.selahpraise.adapters.controllers.rest.exceptions;

import com.selahpraise.selahpraise.adapters.controllers.rest.dto.HandleErrorResponse;
import com.selahpraise.selahpraise.usecases.exceptions.NoAcceptableException;
import com.selahpraise.selahpraise.usecases.exceptions.RequestConflictException;
import com.selahpraise.selahpraise.usecases.exceptions.ResourceNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.servlet.http.HttpServletRequest;


@ControllerAdvice
public class ApiExceptionHandler {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    /**
     * Representa status 412 Resource Not Found
     **/
    @ResponseBody
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFound(final ResourceNotFoundException exception, final HttpServletRequest request) {

        HandleErrorResponse error = new HandleErrorResponse(
                HttpStatus.PRECONDITION_FAILED.value(),
                HttpStatus.PRECONDITION_FAILED.getReasonPhrase(),
                exception.getMessage(),
                request.getRequestURI());
        error.setCode(exception.getError());

        log.info("Error _: {} Message _: {} Request Uri _: {} Request Method _: {}",
                error.getCode(), error.getMessage(), request.getRequestURI(), request.getMethod());

        return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body(error);
    }

    /**
     * Representa status 400 Resource Bad Request
     **/
    @ResponseBody
    @ExceptionHandler({RequestBadException.class})
    public ResponseEntity<?> handleResourceBadRequest(final RequestBadException exception, final HttpServletRequest request) {

        HandleErrorResponse error = new HandleErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                exception.getMessage(),
                request.getRequestURI());
        error.setCode(exception.getError());
        error.setErrores(exception.getErrores());

        log.info("Error _: {} Message _: {} Request Uri _: {} Request Method _: {}",
                error.getCode(), error.getMessage(), request.getRequestURI(), request.getMethod());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    /**
     * Representa status 406 Resource No Acceptable
     **/
    @ResponseBody
    @ExceptionHandler({NoAcceptableException.class})
    public ResponseEntity<?> handleResourceNoAcceptable(final NoAcceptableException exception, final HttpServletRequest request) {

        HandleErrorResponse error = new HandleErrorResponse(
                HttpStatus.NOT_ACCEPTABLE.value(),
                HttpStatus.NOT_ACCEPTABLE.getReasonPhrase(),
                exception.getMessage(),
                request.getRequestURI());
        error.setCode(exception.getError());

        log.info("Error _: {} Message _: {} Request Uri _: {} Request Method _: {}",
                error.getCode(), error.getMessage(), request.getRequestURI(), request.getMethod());

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(error);
    }

    /**
     * Representa status 409 Resource Conflict (Un recurso existente)
     **/
    @ResponseBody
    @ExceptionHandler({RequestConflictException.class})
    public ResponseEntity<?> handleResourceConflict(final RequestConflictException exception, final HttpServletRequest request) {

        HandleErrorResponse error = new HandleErrorResponse(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                exception.getMessage(),
                request.getRequestURI());
        error.setCode(exception.getError());

        log.info("Error _: {} Message _: {} Request Uri _: {} Request Method _: {}",
                error.getCode(), error.getMessage(), request.getRequestURI(), request.getMethod());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    /**
     * Representa status 400 Bad Request cuando el body ni siquiera es un
     * JSON válido (faltó una coma, comillas mal cerradas, etc.). Sin este
     * manejador, este caso caería al genérico de 500 con el mensaje crudo
     * de Jackson.
     **/
    @ResponseBody
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<?> handleJsonNoLegible(final HttpMessageNotReadableException exception, final HttpServletRequest request) {

        HandleErrorResponse error = new HandleErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                "El cuerpo de la petición no es un JSON válido. Revisa comas, comillas y llaves.",
                request.getRequestURI());
        error.setCode("MT:JSON_MAL_FORMADO:400:01");

        log.info("Error _: {} Message _: {} Request Uri _: {} Request Method _: {}",
                error.getCode(), error.getMessage(), request.getRequestURI(), request.getMethod());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }

    /**
     * Representa status 409 Resource Conflict cuando SQL Server rechaza el
     * INSERT/UPDATE/DELETE por una restricción (FK, UNIQUE, NOT NULL, etc.)
     * que no fue detectada antes en la validación de negocio. Es la red de
     * seguridad: sin esto, cualquier violación de este tipo caería en el
     * handler genérico de 500 y expondría el mensaje crudo de SQL Server.
     **/
    @ResponseBody
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityViolation(final DataIntegrityViolationException exception,
                                                           final HttpServletRequest request) {

        String causaRaiz = exception.getMostSpecificCause() != null
                ? exception.getMostSpecificCause().getMessage()
                : exception.getMessage();
        String mensaje;
        String code;

        if (causaRaiz != null && causaRaiz.toUpperCase().contains("FK_")) {
            mensaje = "La operación no se pudo completar porque hace referencia a un registro "
                    + "relacionado que no existe (por ejemplo un id de usuario, repertorio o "
                    + "canción inválido), o porque el registro que intentas eliminar todavía "
                    + "está siendo usado por otro registro.";
            code = "MT:FOREIGN_KEY_VIOLATION:409:01";
        } else if (causaRaiz != null && causaRaiz.toUpperCase().contains("UQ_")) {
            mensaje = "Ya existe un registro con esos mismos datos (violación de una restricción "
                    + "de unicidad).";
            code = "MT:UNIQUE_CONSTRAINT_VIOLATION:409:01";
        } else {
            mensaje = "La operación no se pudo completar porque viola una restricción de la base "
                    + "de datos.";
            code = "MT:DATA_INTEGRITY_VIOLATION:409:01";
        }

        HandleErrorResponse error = new HandleErrorResponse(
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                mensaje,
                request.getRequestURI());
        error.setCode(code);

        log.warn("Error _: {} Message _: {} CausaRaiz _: {} Request Uri _: {} Request Method _: {}",
                error.getCode(), error.getMessage(), causaRaiz, request.getRequestURI(), request.getMethod());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    /**
     * Representa status 500 Internal Server Error (Todos los Errores no controlados)
     **/
    @ResponseBody
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleExceptionErrorInternal(final Exception exception, final HttpServletRequest request) {

        HandleErrorResponse error = new HandleErrorResponse(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                exception.getMessage() != null ? exception.getMessage() : "Ocurrió un error interno no controlado.",
                request.getRequestURI());
        error.setCode("MT:UNEXPECTED_EXCEPTION:500:01");

        log.error("Error _: {} Message _: {} Request Uri _: {} Request Method _: {}",
                error.getCode(), error.getMessage(), request.getRequestURI(), request.getMethod(), exception);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}