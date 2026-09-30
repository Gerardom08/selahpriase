package com.selahpraise.selahpraise.usecases.app.mappers.impl;

import com.selahpraise.selahpraise.domain.entities.app.DetalleRepertorioEntity;
import com.selahpraise.selahpraise.entities.app.DetalleRepertorioDto;
import com.selahpraise.selahpraise.usecases.app.mappers.DetalleRepertorioMapper;

/**
 * IMPLEMENTACIÓN de DetalleRepertorioMapper. Clase Java pura (sin anotaciones de
 * Spring): traduce campo por campo entre Entity y Dto.
 */
public class DetalleRepertorioMapperImpl implements DetalleRepertorioMapper {

    @Override
    public DetalleRepertorioDto toDto(DetalleRepertorioEntity entity) {
        if (entity == null) {
            return null;
        }
        DetalleRepertorioDto dto = new DetalleRepertorioDto();
        dto.setIdDetalle(entity.getIdDetalle());
        dto.setIdRepertorio(entity.getIdRepertorio());
        dto.setIdCancion(entity.getIdCancion());
        dto.setOrden(entity.getOrden());
        return dto;
    }

    @Override
    public DetalleRepertorioEntity toEntity(DetalleRepertorioDto dto) {
        if (dto == null) {
            return null;
        }
        DetalleRepertorioEntity entity = new DetalleRepertorioEntity();
        entity.setIdDetalle(dto.getIdDetalle());
        entity.setIdRepertorio(dto.getIdRepertorio());
        entity.setIdCancion(dto.getIdCancion());
        entity.setOrden(dto.getOrden());
        return entity;
    }
}
