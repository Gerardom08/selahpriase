package com.selahpraise.selahpraise.usecases.app.services;

import com.selahpraise.selahpraise.domain.entities.app.CancionEntity;
import com.selahpraise.selahpraise.entities.app.CancionDto;
import com.selahpraise.selahpraise.entities.app.PageResponseDto;
import com.selahpraise.selahpraise.usecases.app.mappers.CancionMapper;
import com.selahpraise.selahpraise.usecases.app.ports.in.CancionUsecase;
import com.selahpraise.selahpraise.usecases.app.ports.out.CancionBDGateway;
import com.selahpraise.selahpraise.usecases.app.ports.out.DetalleRepertorioBDGateway;
import com.selahpraise.selahpraise.usecases.exceptions.ResourceNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


public class CancionInteractor implements CancionUsecase {

    private final CancionBDGateway cancionBDGateway;
    private final CancionMapper cancionMapper;
    private final DetalleRepertorioBDGateway detalleRepertorioBDGateway;

    public CancionInteractor(CancionBDGateway cancionBDGateway, CancionMapper cancionMapper,
                             DetalleRepertorioBDGateway detalleRepertorioBDGateway) {
        this.cancionBDGateway = cancionBDGateway;
        this.cancionMapper = cancionMapper;
        this.detalleRepertorioBDGateway = detalleRepertorioBDGateway;
    }

    @Override
    public List<CancionDto> listar() {
        return cancionBDGateway.findAll()
                .stream()
                .map(cancionMapper::toDto)
                .toList();
    }

    @Override
    public CancionDto buscarPorId(Integer idCancion) {
        return cancionBDGateway.findById(idCancion)
                .map(cancionMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cancion", "idCancion", idCancion, "CAN:NOT_FOUND"));
    }

    @Override
    public List<CancionDto> buscarPorTitulo(String titulo) {
        return cancionBDGateway.findByTitulo(titulo)
                .stream()
                .map(cancionMapper::toDto)
                .toList();
    }

    @Override
    public CancionDto crear(CancionDto cancionDto) {
        CancionEntity nueva = cancionMapper.toEntity(cancionDto);
        CancionEntity guardada = cancionBDGateway.save(nueva);
        return cancionMapper.toDto(guardada);
    }

    @Override
    public CancionDto actualizar(Integer idCancion, CancionDto cancionDto) {
        cancionBDGateway.findById(idCancion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cancion", "idCancion", idCancion, "CAN:NOT_FOUND"));
        cancionDto.setIdCancion(idCancion);
        CancionEntity actualizada = cancionBDGateway.save(cancionMapper.toEntity(cancionDto));
        return cancionMapper.toDto(actualizada);
    }

    @Override
    @Transactional
    public void eliminar(Integer idCancion) {
        cancionBDGateway.findById(idCancion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cancion", "idCancion", idCancion, "CAN:NOT_FOUND"));

        // Primero quita la canción de cualquier repertorio que la use
        detalleRepertorioBDGateway.deleteByIdCancion(idCancion);

        // Ahora sí borra la canción
        cancionBDGateway.deleteById(idCancion);
    }

    @Override
    public PageResponseDto<CancionDto> listarPaginado(int pagina, int tamano) {
        Page<CancionEntity> paginaCancion = cancionBDGateway.findAllPaginado(PageRequest.of(pagina, tamano));
        List<CancionDto> contenido = paginaCancion.getContent()
                .stream()
                .map(cancionMapper::toDto)
                .toList();
        return new PageResponseDto<>(contenido, paginaCancion.getNumber(), paginaCancion.getTotalPages(),
                paginaCancion.getTotalElements(), paginaCancion.getSize());
    }
}