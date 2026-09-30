package com.selahpraise.selahpraise.usecases.app.mappers.impl;

import com.selahpraise.selahpraise.domain.entities.app.CancionEntity;
import com.selahpraise.selahpraise.entities.app.CancionDto;
import com.selahpraise.selahpraise.usecases.app.mappers.CancionMapper;

/**
 * IMPLEMENTACIÓN de CancionMapper. Clase Java pura (sin anotaciones de
 * Spring): traduce campo por campo entre Entity y Dto.
 */
public class CancionMapperImpl implements CancionMapper {

    @Override
    public CancionDto toDto(CancionEntity entity) {
        if (entity == null) {
            return null;
        }
        CancionDto dto = new CancionDto();
        dto.setIdCancion(entity.getIdCancion());
        dto.setTitulo(entity.getTitulo());
        dto.setAutor(entity.getAutor());
        dto.setTono(entity.getTono());
        dto.setBpm(entity.getBpm());
        dto.setLetraAcordes(entity.getLetraAcordes());
        dto.setYoutubeUrl(entity.getYoutubeUrl());
        return dto;
    }

    @Override
    public CancionEntity toEntity(CancionDto dto) {
        if (dto == null) {
            return null;
        }
        CancionEntity entity = new CancionEntity();
        entity.setIdCancion(dto.getIdCancion());
        entity.setTitulo(dto.getTitulo());
        entity.setAutor(dto.getAutor());
        entity.setTono(dto.getTono());
        entity.setBpm(dto.getBpm());
        entity.setLetraAcordes(dto.getLetraAcordes());
        entity.setYoutubeUrl(dto.getYoutubeUrl());
        return entity;
    }
}
