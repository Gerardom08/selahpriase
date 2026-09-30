package com.selahpraise.selahpraise.domain.repositories.app;

import com.selahpraise.selahpraise.domain.entities.app.UsuarioEntity;
import com.selahpraise.selahpraise.domain.repositories.generic.GenericSpringDataRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
/**
 * Esta es una INTERFAZ: Spring Data la IMPLEMENTA automáticamente en
 * tiempo de ejecución (no hace falta escribir una clase
 * UsuarioRepositoryImpl a mano).
 */
public interface UsuarioRepository extends GenericSpringDataRepository<UsuarioEntity, Integer> {

    Optional<UsuarioEntity> findByCorreo(String correo);
}
