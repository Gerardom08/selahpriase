package com.selahpraise.selahpraise.usecases.app.ports.out;

import com.selahpraise.selahpraise.domain.entities.app.RepertorioEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface RepertorioBDGateway {

    List<RepertorioEntity> findAll();

    Optional<RepertorioEntity> findById(Integer idRepertorio);

    List<RepertorioEntity> findByIdUsuario(Integer idUsuario);

    RepertorioEntity save(RepertorioEntity repertorioEntity);

    void deleteById(Integer idRepertorio);

    Page<RepertorioEntity> findAllPaginado(Pageable pageable);
}
