package com.selahpraise.selahpraise.usecases.app.services;

import com.selahpraise.selahpraise.domain.entities.app.RepertorioEntity;
import com.selahpraise.selahpraise.entities.app.RepertorioDto;
import com.selahpraise.selahpraise.entities.app.PageResponseDto;
import com.selahpraise.selahpraise.usecases.app.mappers.RepertorioMapper;
import com.selahpraise.selahpraise.usecases.app.ports.in.RepertorioUsecase;
import com.selahpraise.selahpraise.usecases.app.ports.out.RepertorioBDGateway;
import com.selahpraise.selahpraise.usecases.app.ports.out.UsuarioBDGateway;
import com.selahpraise.selahpraise.usecases.exceptions.ResourceNotFoundException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;


public class RepertorioInteractor implements RepertorioUsecase {

    private final RepertorioBDGateway repertorioBDGateway;
    private final RepertorioMapper repertorioMapper;
    private final UsuarioBDGateway usuarioBDGateway;

    public RepertorioInteractor(RepertorioBDGateway repertorioBDGateway, RepertorioMapper repertorioMapper,
                                 UsuarioBDGateway usuarioBDGateway) {
        this.repertorioBDGateway = repertorioBDGateway;
        this.repertorioMapper = repertorioMapper;
        this.usuarioBDGateway = usuarioBDGateway;
    }


    private void validarUsuarioExiste(Integer idUsuario) {
        usuarioBDGateway.findById(idUsuario)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario", "idUsuario", idUsuario, "REP:USUARIO_NOT_FOUND"));
    }

    @Override
    public List<RepertorioDto> listar() {
        return repertorioBDGateway.findAll()
                .stream()
                .map(repertorioMapper::toDto)
                .toList();
    }

    @Override
    public RepertorioDto buscarPorId(Integer idRepertorio) {
        return repertorioBDGateway.findById(idRepertorio)
                .map(repertorioMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Repertorio", "idRepertorio", idRepertorio, "REP:NOT_FOUND"));
    }

    @Override
    public List<RepertorioDto> listarPorUsuario(Integer idUsuario) {
        return repertorioBDGateway.findByIdUsuario(idUsuario)
                .stream()
                .map(repertorioMapper::toDto)
                .toList();
    }

    @Override
    public RepertorioDto crear(RepertorioDto repertorioDto) {
        validarUsuarioExiste(repertorioDto.getIdUsuario());
        RepertorioEntity nuevo = repertorioMapper.toEntity(repertorioDto);
        RepertorioEntity guardado = repertorioBDGateway.save(nuevo);
        return repertorioMapper.toDto(guardado);
    }

    @Override
    public RepertorioDto actualizar(Integer idRepertorio, RepertorioDto repertorioDto) {
        repertorioBDGateway.findById(idRepertorio)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Repertorio", "idRepertorio", idRepertorio, "REP:NOT_FOUND"));
        validarUsuarioExiste(repertorioDto.getIdUsuario());
        repertorioDto.setIdRepertorio(idRepertorio);
        RepertorioEntity actualizado = repertorioBDGateway.save(repertorioMapper.toEntity(repertorioDto));
        return repertorioMapper.toDto(actualizado);
    }

    @Override
    public void eliminar(Integer idRepertorio) {
        repertorioBDGateway.findById(idRepertorio)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Repertorio", "idRepertorio", idRepertorio, "REP:NOT_FOUND"));
        repertorioBDGateway.deleteById(idRepertorio);
    }

    @Override
    public PageResponseDto<RepertorioDto> listarPaginado(int pagina, int tamano) {
        Page<RepertorioEntity> paginaRepertorio = repertorioBDGateway.findAllPaginado(PageRequest.of(pagina, tamano));
        List<RepertorioDto> contenido = paginaRepertorio.getContent()
                .stream()
                .map(repertorioMapper::toDto)
                .toList();
        return new PageResponseDto<>(contenido, paginaRepertorio.getNumber(), paginaRepertorio.getTotalPages(),
                paginaRepertorio.getTotalElements(), paginaRepertorio.getSize());
    }
}
