package com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app.impl;

import com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app.CancionController;
import com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.generic.GenericRestController;
import com.selahpraise.selahpraise.entities.app.CancionDto;
import com.selahpraise.selahpraise.usecases.app.ports.in.CancionUsecase;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/canciones")
/**
 * IMPLEMENTACIÓN de CancionController. Es la clase @RestController real:
 * define las rutas HTTP que consume Postman.
 */
public class CancionControllerImpl extends GenericRestController implements CancionController {

    private final CancionUsecase cancionUsecase;

    public CancionControllerImpl(CancionUsecase cancionUsecase) {
        this.cancionUsecase = cancionUsecase;
    }

    @Override
    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(cancionUsecase.listar());
    }

    @Override
    @GetMapping("/{idCancion}")
    public ResponseEntity<?> buscarPorId(@PathVariable Integer idCancion) {
        return ResponseEntity.ok(cancionUsecase.buscarPorId(idCancion));
    }

    @Override
    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorTitulo(@RequestParam String titulo) {
        return ResponseEntity.ok(cancionUsecase.buscarPorTitulo(titulo));
    }

    @Override
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody CancionDto cancionDto, BindingResult result) {
        validate(cancionDto, result);
        return ResponseEntity.status(HttpStatus.CREATED).body(cancionUsecase.crear(cancionDto));
    }

    @Override
    @PutMapping("/{idCancion}")
    public ResponseEntity<?> actualizar(@PathVariable Integer idCancion,
                                         @Valid @RequestBody CancionDto cancionDto,
                                         BindingResult result) {
        validate(cancionDto, result);
        return ResponseEntity.ok(cancionUsecase.actualizar(idCancion, cancionDto));
    }

    @Override
    @DeleteMapping("/{idCancion}")
    public ResponseEntity<?> eliminar(@PathVariable Integer idCancion) {
        cancionUsecase.eliminar(idCancion);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping("/paginado")
    public ResponseEntity<?> listarPaginado(@RequestParam(defaultValue = "0") int pagina,
                                             @RequestParam(defaultValue = "10") int tamano) {
        return ResponseEntity.ok(cancionUsecase.listarPaginado(pagina, tamano));
    }
}
