package com.selahpraise.selahpraise.domain.repositories.app;

import com.selahpraise.selahpraise.domain.entities.app.CancionEntity;
import com.selahpraise.selahpraise.domain.repositories.generic.GenericSpringDataRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
/**
 * Esta es una INTERFAZ: Spring Data la IMPLEMENTA automáticamente en
 * tiempo de ejecución (no hace falta escribir una clase
 * CancionRepositoryImpl a mano).
 */
public interface CancionRepository extends GenericSpringDataRepository<CancionEntity, Integer> {

    List<CancionEntity> findByTituloContainingIgnoreCase(String titulo);
}
