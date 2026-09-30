package com.selahpraise.selahpraise.usecases.app.ports.in;

import com.selahpraise.selahpraise.entities.app.RepertorioDto;
import com.selahpraise.selahpraise.entities.app.PageResponseDto;

import java.util.List;


public interface RepertorioUsecase {

    List<RepertorioDto> listar();

    RepertorioDto buscarPorId(Integer idRepertorio);

    List<RepertorioDto> listarPorUsuario(Integer idUsuario);

    RepertorioDto crear(RepertorioDto repertorioDto);

    RepertorioDto actualizar(Integer idRepertorio, RepertorioDto repertorioDto);

    void eliminar(Integer idRepertorio);

    PageResponseDto<RepertorioDto> listarPaginado(int pagina, int tamano);
}
