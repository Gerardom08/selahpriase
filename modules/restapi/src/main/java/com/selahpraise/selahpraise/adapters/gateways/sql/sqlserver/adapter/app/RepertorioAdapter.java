package com.selahpraise.selahpraise.adapters.gateways.sql.sqlserver.adapter.app;

import com.selahpraise.selahpraise.domain.entities.app.RepertorioEntity;
import com.selahpraise.selahpraise.domain.repositories.app.RepertorioRepository;
import com.selahpraise.selahpraise.usecases.app.ports.out.RepertorioBDGateway;

import org.springframework.stereotype.Component;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

@Component

public class RepertorioAdapter implements RepertorioBDGateway {

    private final RepertorioRepository repertorioRepository;

    public RepertorioAdapter(RepertorioRepository repertorioRepository) {
        this.repertorioRepository = repertorioRepository;
    }

    @Override
    public List<RepertorioEntity> findAll() {
        return repertorioRepository.findAll();
    }

    @Override
    public Optional<RepertorioEntity> findById(Integer idRepertorio) {
        return repertorioRepository.findById(idRepertorio);
    }

    @Override
    public List<RepertorioEntity> findByIdUsuario(Integer idUsuario) {
        return repertorioRepository.findByIdUsuario(idUsuario);
    }

    @Override
    public RepertorioEntity save(RepertorioEntity repertorioEntity) {
        return repertorioRepository.save(repertorioEntity);
    }

    @Override
    public void deleteById(Integer idRepertorio) {
        repertorioRepository.deleteById(idRepertorio);
    }

    @Override
    public Page<RepertorioEntity> findAllPaginado(Pageable pageable) {
        return repertorioRepository.findAll(pageable);
    }
}
