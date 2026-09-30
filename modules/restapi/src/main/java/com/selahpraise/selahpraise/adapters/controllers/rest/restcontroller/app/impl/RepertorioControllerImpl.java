package com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app.impl;

import com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app.RepertorioController;
import com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.generic.GenericRestController;
import com.selahpraise.selahpraise.entities.app.RepertorioDto;
import com.selahpraise.selahpraise.usecases.app.ports.in.RepertorioUsecase;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/repertorios")
/**
 * IMPLEMENTACIÓN de RepertorioController. Es la clase @RestController real:
 * define las rutas HTTP que consume Postman.
 */
public class RepertorioControllerImpl extends GenericRestController implements RepertorioController {

    private final RepertorioUsecase repertorioUsecase;

    public RepertorioControllerImpl(RepertorioUsecase repertorioUsecase) {
        this.repertorioUsecase = repertorioUsecase;
    }

    @Override
    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(repertorioUsecase.listar());
    }

    @Override
    @GetMapping("/{idRepertorio}")
    public ResponseEntity<?> buscarPorId(@PathVariable Integer idRepertorio) {
        return ResponseEntity.ok(repertorioUsecase.buscarPorId(idRepertorio));
    }

    @Override
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<?> listarPorUsuario(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(repertorioUsecase.listarPorUsuario(idUsuario));
    }

    @Override
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody RepertorioDto repertorioDto, BindingResult result) {
        validate(repertorioDto, result);
        return ResponseEntity.status(HttpStatus.CREATED).body(repertorioUsecase.crear(repertorioDto));
    }

    @Override
    @PutMapping("/{idRepertorio}")
    public ResponseEntity<?> actualizar(@PathVariable Integer idRepertorio,
                                         @Valid @RequestBody RepertorioDto repertorioDto,
                                         BindingResult result) {
        validate(repertorioDto, result);
        return ResponseEntity.ok(repertorioUsecase.actualizar(idRepertorio, repertorioDto));
    }

    @Override
    @DeleteMapping("/{idRepertorio}")
    public ResponseEntity<?> eliminar(@PathVariable Integer idRepertorio) {
        repertorioUsecase.eliminar(idRepertorio);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping("/paginado")
    public ResponseEntity<?> listarPaginado(@RequestParam(defaultValue = "0") int pagina,
                                             @RequestParam(defaultValue = "10") int tamano) {
        return ResponseEntity.ok(repertorioUsecase.listarPaginado(pagina, tamano));
    }
}
