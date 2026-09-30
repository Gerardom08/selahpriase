package com.selahpraise.selahpraise.adapters.controllers.rest.restcontroller.app;

import com.selahpraise.selahpraise.entities.app.DetalleRepertorioDto;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


@RequestMapping("/api/detalle-repertorio")
public interface DetalleRepertorioController {

    @GetMapping("/repertorio/{idRepertorio}")
    ResponseEntity<?> listarPorRepertorio(@PathVariable Integer idRepertorio);

    @PostMapping
    ResponseEntity<?> agregarCancion(@Valid @RequestBody DetalleRepertorioDto detalleRepertorioDto, BindingResult result);

    @PutMapping("/{idDetalle}")
    ResponseEntity<?> actualizarOrden(@PathVariable Integer idDetalle, @Valid @RequestBody DetalleRepertorioDto detalleRepertorioDto, BindingResult result);

    @DeleteMapping("/{idDetalle}")
    ResponseEntity<?> eliminar(@PathVariable Integer idDetalle);

    @GetMapping("/paginado")
    ResponseEntity<?> listarPaginado(@RequestParam(defaultValue = "0") int pagina, @RequestParam(defaultValue = "10") int tamano);
}
