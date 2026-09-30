package com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app;

import com.selahpraise.selahpraise.entities.app.CancionDto;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api/canciones")
public interface CancionController {

    @GetMapping
    ResponseEntity<?> listar();

    @GetMapping("/{idCancion}")
    ResponseEntity<?> buscarPorId(@PathVariable Integer idCancion);

    @GetMapping("/buscar")
    ResponseEntity<?> buscarPorTitulo(@RequestParam String titulo);

    @PostMapping
    ResponseEntity<?> crear(@Valid @RequestBody CancionDto cancionDto, BindingResult result);

    @PutMapping("/{idCancion}")
    ResponseEntity<?> actualizar(@PathVariable Integer idCancion, @Valid @RequestBody CancionDto cancionDto, BindingResult result);

    @DeleteMapping("/{idCancion}")
    ResponseEntity<?> eliminar(@PathVariable Integer idCancion);

    @GetMapping("/paginado")
    ResponseEntity<?> listarPaginado(@RequestParam(defaultValue = "0") int pagina, @RequestParam(defaultValue = "10") int tamano);
}
