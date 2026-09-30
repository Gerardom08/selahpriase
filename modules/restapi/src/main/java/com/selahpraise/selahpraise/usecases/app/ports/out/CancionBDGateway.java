package com.selahpraise.selahpraise.usecases.app.ports.out;

import com.selahpraise.selahpraise.domain.entities.app.CancionEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface CancionBDGateway {

    List<CancionEntity> findAll();

    Optional<CancionEntity> findById(Integer idCancion);

    List<CancionEntity> findByTitulo(String titulo);

    CancionEntity save(CancionEntity cancionEntity);

    void deleteById(Integer idCancion);

    Page<CancionEntity> findAllPaginado(Pageable pageable);
}
