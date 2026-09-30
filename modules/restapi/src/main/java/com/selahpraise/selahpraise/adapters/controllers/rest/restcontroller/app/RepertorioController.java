package com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app;

import com.selahpraise.selahpraise.entities.app.RepertorioDto;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api/repertorios")
public interface RepertorioController {

    @GetMapping
    ResponseEntity<?> listar();

    @GetMapping("/{idRepertorio}")
    ResponseEntity<?> buscarPorId(@PathVariable Integer idRepertorio);

    @GetMapping("/usuario/{idUsuario}")
    ResponseEntity<?> listarPorUsuario(@PathVariable Integer idUsuario);

    @PostMapping
    ResponseEntity<?> crear(@Valid @RequestBody RepertorioDto repertorioDto, BindingResult result);

    @PutMapping("/{idRepertorio}")
    ResponseEntity<?> actualizar(@PathVariable Integer idRepertorio, @Valid @RequestBody RepertorioDto repertorioDto, BindingResult result);

    @DeleteMapping("/{idRepertorio}")
    ResponseEntity<?> eliminar(@PathVariable Integer idRepertorio);

    @GetMapping("/paginado")
    ResponseEntity<?> listarPaginado(@RequestParam(defaultValue = "0") int pagina, @RequestParam(defaultValue = "10") int tamano);
}
