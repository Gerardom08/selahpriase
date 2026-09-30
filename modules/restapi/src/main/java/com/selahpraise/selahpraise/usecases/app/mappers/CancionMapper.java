package com.selahpraise.selahpraise.usecases.app.mappers;

import com.selahpraise.selahpraise.domain.entities.app.CancionEntity;
import com.selahpraise.selahpraise.entities.app.CancionDto;


public interface CancionMapper {

    CancionDto toDto(CancionEntity entity);

    CancionEntity toEntity(CancionDto dto);
}
