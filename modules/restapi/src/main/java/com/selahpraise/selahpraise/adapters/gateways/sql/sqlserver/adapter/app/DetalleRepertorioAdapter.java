package com.selahpraise.selahpraise.adapters.gateways.sql.sqlserver.adapter.app;

import com.selahpraise.selahpraise.domain.entities.app.DetalleRepertorioEntity;
import com.selahpraise.selahpraise.domain.repositories.app.DetalleRepertorioRepository;
import com.selahpraise.selahpraise.usecases.app.ports.out.DetalleRepertorioBDGateway;

import org.springframework.stereotype.Component;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Component

public class DetalleRepertorioAdapter implements DetalleRepertorioBDGateway {

    private final DetalleRepertorioRepository detalleRepertorioRepository;

    public DetalleRepertorioAdapter(DetalleRepertorioRepository detalleRepertorioRepository) {
        this.detalleRepertorioRepository = detalleRepertorioRepository;
    }

    @Override
    public List<DetalleRepertorioEntity> findAll() {
        return detalleRepertorioRepository.findAll();
    }

    @Override
    public Optional<DetalleRepertorioEntity> findById(Integer idDetalle) {
        return detalleRepertorioRepository.findById(idDetalle);
    }

    @Override
    public List<DetalleRepertorioEntity> findByIdRepertorioOrdenado(Integer idRepertorio) {
        return detalleRepertorioRepository.findByIdRepertorioOrderByOrdenAsc(idRepertorio);
    }

    @Override
    public boolean existeCancionEnRepertorio(Integer idRepertorio, Integer idCancion) {
        return detalleRepertorioRepository.existsByIdRepertorioAndIdCancion(idRepertorio, idCancion);
    }

    @Override
    public DetalleRepertorioEntity save(DetalleRepertorioEntity detalleRepertorioEntity) {
        return detalleRepertorioRepository.save(detalleRepertorioEntity);
    }

    @Override
    public void deleteById(Integer idDetalle) {
        detalleRepertorioRepository.deleteById(idDetalle);
    }

    @Override
    public void deleteByIdCancion(Integer idCancion) {
        detalleRepertorioRepository.deleteByIdCancion(idCancion);
    }

    @Override
    public Page<DetalleRepertorioEntity> findAllPaginado(Pageable pageable) {
        return detalleRepertorioRepository.findAll(pageable);
    }
}