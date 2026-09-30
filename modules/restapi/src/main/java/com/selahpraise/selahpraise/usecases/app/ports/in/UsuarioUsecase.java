package com.selahpraise.selahpraise.usecases.app.ports.in;

import com.selahpraise.selahpraise.entities.app.UsuarioDto;
import com.selahpraise.selahpraise.entities.app.PageResponseDto;

import java.util.List;


public interface UsuarioUsecase {

    List<UsuarioDto> listar();

    UsuarioDto buscarPorId(Integer idUsuario);

    UsuarioDto crear(UsuarioDto usuarioDto);

    UsuarioDto actualizar(Integer idUsuario, UsuarioDto usuarioDto);

    void eliminar(Integer idUsuario);

    PageResponseDto<UsuarioDto> listarPaginado(int pagina, int tamano);
}
