package com.selahpraise.selahpraise.adapters.gateways.sql.sqlserver.adapter.app;

import com.selahpraise.selahpraise.domain.entities.app.UsuarioEntity;
import com.selahpraise.selahpraise.domain.repositories.app.UsuarioRepository;
import com.selahpraise.selahpraise.usecases.app.ports.out.UsuarioBDGateway;

import org.springframework.stereotype.Component;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Component

public class UsuarioAdapter implements UsuarioBDGateway {

    private final UsuarioRepository usuarioRepository;

    public UsuarioAdapter(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public List<UsuarioEntity> findAll() {
        return usuarioRepository.findAll();
    }

    @Override
    public Optional<UsuarioEntity> findById(Integer idUsuario) {
        return usuarioRepository.findById(idUsuario);
    }

    @Override
    public Optional<UsuarioEntity> findByCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    @Override
    public UsuarioEntity save(UsuarioEntity usuarioEntity) {
        return usuarioRepository.save(usuarioEntity);
    }

    @Override
    public void deleteById(Integer idUsuario) {
        usuarioRepository.deleteById(idUsuario);
    }

    @Override
    public boolean existsByCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo).isPresent();
    }

    @Override
    public Page<UsuarioEntity> findAllPaginado(Pageable pageable) {
        return usuarioRepository.findAll(pageable);
    }
}
