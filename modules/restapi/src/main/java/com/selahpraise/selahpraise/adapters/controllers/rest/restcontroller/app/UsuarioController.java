package com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app;

import com.selahpraise.selahpraise.entities.app.UsuarioDto;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api/usuarios")
public interface UsuarioController {

    @GetMapping
    ResponseEntity<?> listar();

    @GetMapping("/{idUsuario}")
    ResponseEntity<?> buscarPorId(@PathVariable Integer idUsuario);

    @PostMapping
    ResponseEntity<?> crear(@Valid @RequestBody UsuarioDto usuarioDto, BindingResult result);

    @PutMapping("/{idUsuario}")
    ResponseEntity<?> actualizar(@PathVariable Integer idUsuario, @Valid @RequestBody UsuarioDto usuarioDto, BindingResult result);

    @DeleteMapping("/{idUsuario}")
    ResponseEntity<?> eliminar(@PathVariable Integer idUsuario);

    @GetMapping("/paginado")
    ResponseEntity<?> listarPaginado(@RequestParam(defaultValue = "0") int pagina, @RequestParam(defaultValue = "10") int tamano);
}
