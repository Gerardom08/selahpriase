package com.selahpraise.selahpraise.usecases.app.services;

import com.selahpraise.selahpraise.domain.entities.app.DetalleRepertorioEntity;
import com.selahpraise.selahpraise.entities.app.DetalleRepertorioDto;
import com.selahpraise.selahpraise.entities.app.PageResponseDto;
import com.selahpraise.selahpraise.usecases.app.mappers.DetalleRepertorioMapper;
import com.selahpraise.selahpraise.usecases.app.ports.in.DetalleRepertorioUsecase;
import com.selahpraise.selahpraise.usecases.app.ports.out.CancionBDGateway;
import com.selahpraise.selahpraise.usecases.app.ports.out.DetalleRepertorioBDGateway;
import com.selahpraise.selahpraise.usecases.app.ports.out.RepertorioBDGateway;
import com.selahpraise.selahpraise.usecases.exceptions.RequestConflictException;
import com.selahpraise.selahpraise.usecases.exceptions.ResourceNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;


public class DetalleRepertorioInteractor implements DetalleRepertorioUsecase {

    private final DetalleRepertorioBDGateway detalleRepertorioBDGateway;
    private final DetalleRepertorioMapper detalleRepertorioMapper;
    private final RepertorioBDGateway repertorioBDGateway;
    private final CancionBDGateway cancionBDGateway;

    public DetalleRepertorioInteractor(DetalleRepertorioBDGateway detalleRepertorioBDGateway,
                                        DetalleRepertorioMapper detalleRepertorioMapper,
                                        RepertorioBDGateway repertorioBDGateway,
                                        CancionBDGateway cancionBDGateway) {
        this.detalleRepertorioBDGateway = detalleRepertorioBDGateway;
        this.detalleRepertorioMapper = detalleRepertorioMapper;
        this.repertorioBDGateway = repertorioBDGateway;
        this.cancionBDGateway = cancionBDGateway;
    }

    /**
     * Antes de tocar la tabla detalle_repertorio, confirma que el repertorio
     * y la canción referenciados realmente existan. Sin esto, un id
     * inexistente llega crudo hasta SQL Server como violación de FK y el
     * usuario recibe un 500 sin explicación.
     */
    private void validarExistenciaReferencias(Integer idRepertorio, Integer idCancion) {
        repertorioBDGateway.findById(idRepertorio)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Repertorio", "idRepertorio", idRepertorio, "DET:REPERTORIO_NOT_FOUND"));
        cancionBDGateway.findById(idCancion)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Cancion", "idCancion", idCancion, "DET:CANCION_NOT_FOUND"));
    }

    @Override
    public List<DetalleRepertorioDto> listarPorRepertorio(Integer idRepertorio) {
        return detalleRepertorioBDGateway.findByIdRepertorioOrdenado(idRepertorio)
                .stream()
                .map(detalleRepertorioMapper::toDto)
                .toList();
    }

    @Override
    public DetalleRepertorioDto agregarCancion(DetalleRepertorioDto detalleRepertorioDto) {
        validarExistenciaReferencias(detalleRepertorioDto.getIdRepertorio(), detalleRepertorioDto.getIdCancion());
        boolean yaExiste = detalleRepertorioBDGateway.existeCancionEnRepertorio(
                detalleRepertorioDto.getIdRepertorio(), detalleRepertorioDto.getIdCancion());
        if (yaExiste) {
            throw new RequestConflictException(
                    "DetalleRepertorio", "idCancion", detalleRepertorioDto.getIdCancion(),
                    "DET:CANCION_YA_AGREGADA");
        }
        DetalleRepertorioEntity nuevo = detalleRepertorioMapper.toEntity(detalleRepertorioDto);
        DetalleRepertorioEntity guardado = detalleRepertorioBDGateway.save(nuevo);
        return detalleRepertorioMapper.toDto(guardado);
    }

    @Override
    public DetalleRepertorioDto actualizarOrden(Integer idDetalle, DetalleRepertorioDto detalleRepertorioDto) {
        detalleRepertorioBDGateway.findById(idDetalle)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "DetalleRepertorio", "idDetalle", idDetalle, "DET:NOT_FOUND"));
        validarExistenciaReferencias(detalleRepertorioDto.getIdRepertorio(), detalleRepertorioDto.getIdCancion());
        detalleRepertorioDto.setIdDetalle(idDetalle);
        DetalleRepertorioEntity actualizado =
                detalleRepertorioBDGateway.save(detalleRepertorioMapper.toEntity(detalleRepertorioDto));
        return detalleRepertorioMapper.toDto(actualizado);
    }

    @Override
    public void eliminar(Integer idDetalle) {
        detalleRepertorioBDGateway.findById(idDetalle)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "DetalleRepertorio", "idDetalle", idDetalle, "DET:NOT_FOUND"));
        detalleRepertorioBDGateway.deleteById(idDetalle);
    }

    @Override
    public PageResponseDto<DetalleRepertorioDto> listarPaginado(int pagina, int tamano) {
        Page<DetalleRepertorioEntity> paginaDetalleRepertorio = detalleRepertorioBDGateway.findAllPaginado(PageRequest.of(pagina, tamano));
        List<DetalleRepertorioDto> contenido = paginaDetalleRepertorio.getContent()
                .stream()
                .map(detalleRepertorioMapper::toDto)
                .toList();
        return new PageResponseDto<>(contenido, paginaDetalleRepertorio.getNumber(), paginaDetalleRepertorio.getTotalPages(),
                paginaDetalleRepertorio.getTotalElements(), paginaDetalleRepertorio.getSize());
    }
}
