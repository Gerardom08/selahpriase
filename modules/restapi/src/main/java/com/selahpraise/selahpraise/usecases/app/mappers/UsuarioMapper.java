package com.selahpraise.selahpraise.usecases.app.mappers;

import com.selahpraise.selahpraise.domain.entities.app.UsuarioEntity;
import com.selahpraise.selahpraise.entities.app.UsuarioDto;


public interface UsuarioMapper {

    UsuarioDto toDto(UsuarioEntity entity);

    UsuarioEntity toEntity(UsuarioDto dto);
}
