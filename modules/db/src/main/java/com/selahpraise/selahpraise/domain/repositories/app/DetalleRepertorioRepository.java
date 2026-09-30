package com.selahpraise.selahpraise.domain.repositories.app;

import com.selahpraise.selahpraise.domain.entities.app.DetalleRepertorioEntity;
import com.selahpraise.selahpraise.domain.repositories.generic.GenericSpringDataRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
/**
 * Esta es una INTERFAZ: Spring Data la IMPLEMENTA automáticamente en
 * tiempo de ejecución (no hace falta escribir una clase
 * DetalleRepertorioRepositoryImpl a mano).
 */
public interface DetalleRepertorioRepository extends GenericSpringDataRepository<DetalleRepertorioEntity, Integer> {

    List<DetalleRepertorioEntity> findByIdRepertorioOrderByOrdenAsc(Integer idRepertorio);

    boolean existsByIdRepertorioAndIdCancion(Integer idRepertorio, Integer idCancion);

    void deleteByIdCancion(Integer idCancion);
}