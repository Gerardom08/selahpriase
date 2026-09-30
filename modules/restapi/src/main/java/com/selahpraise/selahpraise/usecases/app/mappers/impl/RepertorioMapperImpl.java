package com.selahpraise.selahpraise.usecases.app.mappers.impl;

import com.selahpraise.selahpraise.domain.entities.app.RepertorioEntity;
import com.selahpraise.selahpraise.entities.app.RepertorioDto;
import com.selahpraise.selahpraise.usecases.app.mappers.RepertorioMapper;

/**
 * IMPLEMENTACIÓN de RepertorioMapper. Clase Java pura (sin anotaciones de
 * Spring): traduce campo por campo entre Entity y Dto.
 */
public class RepertorioMapperImpl implements RepertorioMapper {

    @Override
    public RepertorioDto toDto(RepertorioEntity entity) {
        if (entity == null) {
            return null;
        }
        RepertorioDto dto = new RepertorioDto();
        dto.setIdRepertorio(entity.getIdRepertorio());
        dto.setFecha(entity.getFecha());
        dto.setNombre(entity.getNombre());
        dto.setDescripcion(entity.getDescripcion());
        dto.setIdUsuario(entity.getIdUsuario());
        return dto;
    }

    @Override
    public RepertorioEntity toEntity(RepertorioDto dto) {
        if (dto == null) {
            return null;
        }
        RepertorioEntity entity = new RepertorioEntity();
        entity.setIdRepertorio(dto.getIdRepertorio());
        entity.setFecha(dto.getFecha());
        entity.setNombre(dto.getNombre());
        entity.setDescripcion(dto.getDescripcion());
        entity.setIdUsuario(dto.getIdUsuario());
        return entity;
    }
}
