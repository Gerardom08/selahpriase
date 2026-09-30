package com.selahpraise.selahpraise.usecases.app.ports.out;

import com.selahpraise.selahpraise.domain.entities.app.UsuarioEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface UsuarioBDGateway {

    List<UsuarioEntity> findAll();

    Optional<UsuarioEntity> findById(Integer idUsuario);

    Optional<UsuarioEntity> findByCorreo(String correo);

    UsuarioEntity save(UsuarioEntity usuarioEntity);

    void deleteById(Integer idUsuario);

    boolean existsByCorreo(String correo);

    Page<UsuarioEntity> findAllPaginado(Pageable pageable);
}
