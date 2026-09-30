package com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app.impl;

import com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app.UsuarioController;
import com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.generic.GenericRestController;
import com.selahpraise.selahpraise.entities.app.UsuarioDto;
import com.selahpraise.selahpraise.usecases.app.ports.in.UsuarioUsecase;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
/**
 * IMPLEMENTACIÓN de UsuarioController. Es la clase @RestController real:
 * define las rutas HTTP que consume Postman.
 */
public class UsuarioControllerImpl extends GenericRestController implements UsuarioController {

    private final UsuarioUsecase usuarioUsecase;

    public UsuarioControllerImpl(UsuarioUsecase usuarioUsecase) {
        this.usuarioUsecase = usuarioUsecase;
    }

    @Override
    @GetMapping
    public ResponseEntity<?> listar() {
        return ResponseEntity.ok(usuarioUsecase.listar());
    }

    @Override
    @GetMapping("/{idUsuario}")
    public ResponseEntity<?> buscarPorId(@PathVariable Integer idUsuario) {
        return ResponseEntity.ok(usuarioUsecase.buscarPorId(idUsuario));
    }

    @Override
    @PostMapping
    public ResponseEntity<?> crear(@Valid @RequestBody UsuarioDto usuarioDto, BindingResult result) {
        validate(usuarioDto, result);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioUsecase.crear(usuarioDto));
    }

    @Override
    @PutMapping("/{idUsuario}")
    public ResponseEntity<?> actualizar(@PathVariable Integer idUsuario,
                                         @Valid @RequestBody UsuarioDto usuarioDto,
                                         BindingResult result) {
        validate(usuarioDto, result);
        return ResponseEntity.ok(usuarioUsecase.actualizar(idUsuario, usuarioDto));
    }

    @Override
    @DeleteMapping("/{idUsuario}")
    public ResponseEntity<?> eliminar(@PathVariable Integer idUsuario) {
        usuarioUsecase.eliminar(idUsuario);
        return ResponseEntity.noContent().build();
    }

    @Override
    @GetMapping("/paginado")
    public ResponseEntity<?> listarPaginado(@RequestParam(defaultValue = "0") int pagina,
                                             @RequestParam(defaultValue = "10") int tamano) {
        return ResponseEntity.ok(usuarioUsecase.listarPaginado(pagina, tamano));
    }
}
