package com.selahpraise.selahpraise.adapters.gateways.sql.sqlserver.adapter.app;

import com.selahpraise.selahpraise.domain.entities.app.CancionEntity;
import com.selahpraise.selahpraise.domain.repositories.app.CancionRepository;
import com.selahpraise.selahpraise.usecases.app.ports.out.CancionBDGateway;

import org.springframework.stereotype.Component;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Component

public class CancionAdapter implements CancionBDGateway {

    private final CancionRepository cancionRepository;

    public CancionAdapter(CancionRepository cancionRepository) {
        this.cancionRepository = cancionRepository;
    }

    @Override
    public List<CancionEntity> findAll() {
        return cancionRepository.findAll();
    }

    @Override
    public Optional<CancionEntity> findById(Integer idCancion) {
        return cancionRepository.findById(idCancion);
    }

    @Override
    public List<CancionEntity> findByTitulo(String titulo) {
        return cancionRepository.findByTituloContainingIgnoreCase(titulo);
    }

    @Override
    public CancionEntity save(CancionEntity cancionEntity) {
        return cancionRepository.save(cancionEntity);
    }

    @Override
    public void deleteById(Integer idCancion) {
        cancionRepository.deleteById(idCancion);
    }

    @Override
    public Page<CancionEntity> findAllPaginado(Pageable pageable) {
        return cancionRepository.findAll(pageable);
    }
}
