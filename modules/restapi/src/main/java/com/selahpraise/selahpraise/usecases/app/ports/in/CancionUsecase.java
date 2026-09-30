package com.selahpraise.selahpraise.usecases.app.ports.in;

import com.selahpraise.selahpraise.entities.app.CancionDto;
import com.selahpraise.selahpraise.entities.app.PageResponseDto;

import java.util.List;


public interface CancionUsecase {

    List<CancionDto> listar();

    CancionDto buscarPorId(Integer idCancion);

    List<CancionDto> buscarPorTitulo(String titulo);

    CancionDto crear(CancionDto cancionDto);

    CancionDto actualizar(Integer idCancion, CancionDto cancionDto);

    void eliminar(Integer idCancion);

    PageResponseDto<CancionDto> listarPaginado(int pagina, int tamano);
}
