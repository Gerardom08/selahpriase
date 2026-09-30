package com.selahpraise.selahpraise.domain.repositories.app;

import com.selahpraise.selahpraise.domain.entities.app.RepertorioEntity;
import com.selahpraise.selahpraise.domain.repositories.generic.GenericSpringDataRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
/**
 * Esta es una INTERFAZ: Spring Data la IMPLEMENTA automáticamente en
 * tiempo de ejecución (no hace falta escribir una clase
 * RepertorioRepositoryImpl a mano).
 */
public interface RepertorioRepository extends GenericSpringDataRepository<RepertorioEntity, Integer> {

    List<RepertorioEntity> findByIdUsuario(Integer idUsuario);
}
