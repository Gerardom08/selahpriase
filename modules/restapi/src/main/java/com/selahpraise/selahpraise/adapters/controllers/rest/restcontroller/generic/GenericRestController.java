package com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.generic;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import com.selahpraise.selahpraise.adapters.controllers.rest.constants.GlobalConstants;
import com.selahpraise.selahpraise.adapters.controllers.rest.exceptions.RequestBadException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.String.format;

public class GenericRestController implements GlobalConstants {

    protected <T> T validate(T t, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errores = result.getFieldErrors()
                    .stream()
                    .map(error -> format("El campo '%s' %s", error.getField(), error.getDefaultMessage()))
                    .toList();

            throw new RequestBadException("Uno o más campos del cuerpo de la petición son inválidos.", errores);
        }

        return t;
    }

    protected ResponseEntity<?> internalServerError(String message, String error) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        response.put("error", error);
        return ResponseEntity.internalServerError().body(response);
    }
}
