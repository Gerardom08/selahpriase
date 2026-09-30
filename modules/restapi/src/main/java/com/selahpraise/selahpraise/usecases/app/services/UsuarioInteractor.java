package com.selahpraise.selahpraise.usecases.app.services;

import com.selahpraise.selahpraise.domain.entities.app.UsuarioEntity;
import com.selahpraise.selahpraise.entities.app.UsuarioDto;
import com.selahpraise.selahpraise.entities.app.PageResponseDto;
import com.selahpraise.selahpraise.usecases.app.mappers.UsuarioMapper;
import com.selahpraise.selahpraise.usecases.app.ports.in.UsuarioUsecase;
import com.selahpraise.selahpraise.usecases.app.ports.out.UsuarioBDGateway;
import com.selahpraise.selahpraise.usecases.exceptions.RequestConflictException;
import com.selahpraise.selahpraise.usecases.exceptions.ResourceNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;


public class UsuarioInteractor implements UsuarioUsecase {

    private final UsuarioBDGateway usuarioBDGateway;
    private final UsuarioMapper usuarioMapper;

    public UsuarioInteractor(UsuarioBDGateway usuarioBDGateway, UsuarioMapper usuarioMapper) {
        this.usuarioBDGateway = usuarioBDGateway;
        this.usuarioMapper = usuarioMapper;
    }

    @Override
    public List<UsuarioDto> listar() {
        return usuarioBDGateway.findAll()
                .stream()
                .map(usuarioMapper::toDto)
                .toList();
    }

    @Override
    public UsuarioDto buscarPorId(Integer idUsuario) {
        return usuarioBDGateway.findById(idUsuario)
                .map(usuarioMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario", "idUsuario", idUsuario, "USR:NOT_FOUND"));
    }

    @Override
    public UsuarioDto crear(UsuarioDto usuarioDto) {
        if (usuarioBDGateway.existsByCorreo(usuarioDto.getCorreo())) {
            throw new RequestConflictException(
                    "Usuario", "correo", usuarioDto.getCorreo(), "USR:ALREADY_EXISTS");
        }
        UsuarioEntity nuevo = usuarioMapper.toEntity(usuarioDto);
        UsuarioEntity guardado = usuarioBDGateway.save(nuevo);
        return usuarioMapper.toDto(guardado);
    }

    @Override
    public UsuarioDto actualizar(Integer idUsuario, UsuarioDto usuarioDto) {
        usuarioBDGateway.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario", "idUsuario", idUsuario, "USR:NOT_FOUND"));
        usuarioDto.setIdUsuario(idUsuario);
        UsuarioEntity actualizado = usuarioBDGateway.save(usuarioMapper.toEntity(usuarioDto));
        return usuarioMapper.toDto(actualizado);
    }

    @Override
    public void eliminar(Integer idUsuario) {
        usuarioBDGateway.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario", "idUsuario", idUsuario, "USR:NOT_FOUND"));
        usuarioBDGateway.deleteById(idUsuario);
    }

    @Override
    public PageResponseDto<UsuarioDto> listarPaginado(int pagina, int tamano) {
        Page<UsuarioEntity> paginaUsuario = usuarioBDGateway.findAllPaginado(PageRequest.of(pagina, tamano));
        List<UsuarioDto> contenido = paginaUsuario.getContent()
                .stream()
                .map(usuarioMapper::toDto)
                .toList();
        return new PageResponseDto<>(contenido, paginaUsuario.getNumber(), paginaUsuario.getTotalPages(),
                paginaUsuario.getTotalElements(), paginaUsuario.getSize());
    }
}
