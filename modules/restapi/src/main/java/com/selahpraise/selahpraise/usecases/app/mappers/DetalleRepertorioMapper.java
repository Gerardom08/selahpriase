package com.selahpraise.selahpraise.usecases.app.mappers;

import com.selahpraise.selahpraise.domain.entities.app.DetalleRepertorioEntity;
import com.selahpraise.selahpraise.entities.app.DetalleRepertorioDto;


public interface DetalleRepertorioMapper {

    DetalleRepertorioDto toDto(DetalleRepertorioEntity entity);

    DetalleRepertorioEntity toEntity(DetalleRepertorioDto dto);
}
