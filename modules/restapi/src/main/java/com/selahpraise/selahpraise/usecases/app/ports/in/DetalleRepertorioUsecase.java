package com.selahpraise.selahpraise.usecases.app.ports.in;

import com.selahpraise.selahpraise.entities.app.DetalleRepertorioDto;
import com.selahpraise.selahpraise.entities.app.PageResponseDto;

import java.util.List;


public interface DetalleRepertorioUsecase {

    List<DetalleRepertorioDto> listarPorRepertorio(Integer idRepertorio);

    DetalleRepertorioDto agregarCancion(DetalleRepertorioDto detalleRepertorioDto);

    DetalleRepertorioDto actualizarOrden(Integer idDetalle, DetalleRepertorioDto detalleRepertorioDto);

    void eliminar(Integer idDetalle);

    PageResponseDto<DetalleRepertorioDto> listarPaginado(int pagina, int tamano);
}
