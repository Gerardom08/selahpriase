package com.selahpraise.selahpraise.usecases.app.mappers.impl;

import com.selahpraise.selahpraise.domain.entities.app.UsuarioEntity;
import com.selahpraise.selahpraise.entities.app.UsuarioDto;
import com.selahpraise.selahpraise.usecases.app.mappers.UsuarioMapper;

/**
 * IMPLEMENTACIÓN de UsuarioMapper. Clase Java pura (sin anotaciones de
 * Spring): traduce campo por campo entre Entity y Dto.
 */
public class UsuarioMapperImpl implements UsuarioMapper {

    @Override
    public UsuarioDto toDto(UsuarioEntity entity) {
        if (entity == null) {
            return null;
        }
        UsuarioDto dto = new UsuarioDto();
        dto.setIdUsuario(entity.getIdUsuario());
        dto.setNombre(entity.getNombre());
        dto.setCorreo(entity.getCorreo());
        dto.setPassword(entity.getPassword());
        dto.setRol(entity.getRol());
        return dto;
    }

    @Override
    public UsuarioEntity toEntity(UsuarioDto dto) {
        if (dto == null) {
            return null;
        }
        UsuarioEntity entity = new UsuarioEntity();
        entity.setIdUsuario(dto.getIdUsuario());
        entity.setNombre(dto.getNombre());
        entity.setCorreo(dto.getCorreo());
        entity.setPassword(dto.getPassword());
        entity.setRol(dto.getRol());
        return entity;
    }
}
