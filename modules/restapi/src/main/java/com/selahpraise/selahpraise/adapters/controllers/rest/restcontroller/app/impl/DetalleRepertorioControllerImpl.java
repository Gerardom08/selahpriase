package com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app.impl;

import com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app.DetalleRepertorioController;
import com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.generic.GenericRestController;
import com.selahpraise.selahpraise.entities.app.DetalleRepertorioDto;
import com.selahpraise.selahpraise.usecases.app.ports.in.DetalleRepertorioUsecase;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/detalle-repertorio")
/**
 * IMPLEMENTACIÓN de DetalleRepertorioController. Es la clase @RestController real:
 * define las rutas HTTP que consume Postman.
 */
public class DetalleRepertorioControllerImpl extends GenericRestController implements DetalleRepertorioController {

    private final DetalleRepertorioUsecase detalleRepertorioUsecase;

    public DetalleRepertorioControllerImpl(DetalleRepertorioUsecase detalleRepertorioUsecase) {
        this.detalleRepertorioUsecase = detalleRepertorioUsecase;
    }

    @Override
    @GetMapping("/repertorio/{idRepertorio}")
    public ResponseEntity<?> listarPorRepertorio(@PathVariable Integer idRepertorio) {
        return ResponseEntity.ok(detalleRepertorioUsecase.listarPorRepertorio(idRepertorio));
    }

    @Override
    @PostMapping
    public ResponseEntity<?> agregarCancion(@Valid @RequestBody DetalleRepertorioDto detalleRepertorioDto,
                                             BindingResult result) {
        validate(detalleRepertorioDto, result);
        return ResponseEntity.status(HttpStatus.CREATED).body(detalleRepertorioUsecase.agregarCancion(detalleRepertorioDto));
    }

    @Override
    @PutMapping("/{idDetalle}")
    public ResponseEntity<?> actualizarOrden(@PathVariable Integer idDetalle,
                                              @Valid @RequestBody DetalleRepertorioDto detalleRepertorioDto,
                                              BindingResult result) {
        validate(detalleRepertorioDto, result);
        return ResponseEntity.ok(detalleRepertorioUsecase.actualizarOrden(idDetalle, detalleRepertorioDto));
    }

    @Override
    @DeleteMapping("/{idDetalle}")
    public ResponseEntity<?> eliminar(@PathVariable Integer idDetalle) {
        detalleRepertorioUsecase.eliminar(idDetalle);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping("/paginado")
    public ResponseEntity<?> listarPaginado(@RequestParam(defaultValue = "0") int pagina,
                                             @RequestParam(defaultValue = "10") int tamano) {
        return ResponseEntity.ok(detalleRepertorioUsecase.listarPaginado(pagina, tamano));
    }
}
