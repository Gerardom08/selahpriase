package com.selahpraise.selahpraise.usecases.app.ports.out;

import com.selahpraise.selahpraise.domain.entities.app.DetalleRepertorioEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface DetalleRepertorioBDGateway {

    List<DetalleRepertorioEntity> findAll();

    Optional<DetalleRepertorioEntity> findById(Integer idDetalle);

    List<DetalleRepertorioEntity> findByIdRepertorioOrdenado(Integer idRepertorio);

    boolean existeCancionEnRepertorio(Integer idRepertorio, Integer idCancion);

    DetalleRepertorioEntity save(DetalleRepertorioEntity detalleRepertorioEntity);

    void deleteById(Integer idDetalle);

    void deleteByIdCancion(Integer idCancion);

    Page<DetalleRepertorioEntity> findAllPaginado(Pageable pageable);
}