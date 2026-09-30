package com.selahpraise.selahpraise.usecases.app.mappers;

import com.selahpraise.selahpraise.domain.entities.app.RepertorioEntity;
import com.selahpraise.selahpraise.entities.app.RepertorioDto;


public interface RepertorioMapper {

    RepertorioDto toDto(RepertorioEntity entity);

    RepertorioEntity toEntity(RepertorioDto dto);
}
