package com.selahpraise.selahpraise.config;

import com.selahpraise.selahpraise.usecases.app.mappers.CancionMapper;
import com.selahpraise.selahpraise.usecases.app.mappers.DetalleRepertorioMapper;
import com.selahpraise.selahpraise.usecases.app.mappers.RepertorioMapper;
import com.selahpraise.selahpraise.usecases.app.mappers.UsuarioMapper;
import com.selahpraise.selahpraise.usecases.app.mappers.impl.CancionMapperImpl;
import com.selahpraise.selahpraise.usecases.app.mappers.impl.DetalleRepertorioMapperImpl;
import com.selahpraise.selahpraise.usecases.app.mappers.impl.RepertorioMapperImpl;
import com.selahpraise.selahpraise.usecases.app.mappers.impl.UsuarioMapperImpl;
import com.selahpraise.selahpraise.usecases.app.ports.in.CancionUsecase;
import com.selahpraise.selahpraise.usecases.app.ports.in.DetalleRepertorioUsecase;
import com.selahpraise.selahpraise.usecases.app.ports.in.RepertorioUsecase;
import com.selahpraise.selahpraise.usecases.app.ports.in.UsuarioUsecase;
import com.selahpraise.selahpraise.usecases.app.ports.out.CancionBDGateway;
import com.selahpraise.selahpraise.usecases.app.ports.out.DetalleRepertorioBDGateway;
import com.selahpraise.selahpraise.usecases.app.ports.out.RepertorioBDGateway;
import com.selahpraise.selahpraise.usecases.app.ports.out.UsuarioBDGateway;
import com.selahpraise.selahpraise.usecases.app.services.CancionInteractor;
import com.selahpraise.selahpraise.usecases.app.services.DetalleRepertorioInteractor;
import com.selahpraise.selahpraise.usecases.app.services.RepertorioInteractor;
import com.selahpraise.selahpraise.usecases.app.services.UsuarioInteractor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class GlobalConfiguration {

    // ---------- USUARIOS ----------

    @Bean
    public UsuarioMapper usuarioMapper() {
        return new UsuarioMapperImpl();
    }

    @Bean
    public UsuarioUsecase usuarioUsecase(UsuarioBDGateway usuarioBDGateway, UsuarioMapper usuarioMapper) {
        return new UsuarioInteractor(usuarioBDGateway, usuarioMapper);
    }

    // ---------- CANCIONES ----------

    @Bean
    public CancionMapper cancionMapper() {
        return new CancionMapperImpl();
    }

    @Bean
    public CancionUsecase cancionUsecase(CancionBDGateway cancionBDGateway, CancionMapper cancionMapper,
                                         DetalleRepertorioBDGateway detalleRepertorioBDGateway) {
        return new CancionInteractor(cancionBDGateway, cancionMapper, detalleRepertorioBDGateway);
    }

    // ---------- REPERTORIOS ----------

    @Bean
    public RepertorioMapper repertorioMapper() {
        return new RepertorioMapperImpl();
    }

    @Bean
    public RepertorioUsecase repertorioUsecase(RepertorioBDGateway repertorioBDGateway,
                                               RepertorioMapper repertorioMapper,
                                               UsuarioBDGateway usuarioBDGateway) {
        return new RepertorioInteractor(repertorioBDGateway, repertorioMapper, usuarioBDGateway);
    }

    // ---------- DETALLE_REPERTORIO ----------

    @Bean
    public DetalleRepertorioMapper detalleRepertorioMapper() {
        return new DetalleRepertorioMapperImpl();
    }

    @Bean
    public DetalleRepertorioUsecase detalleRepertorioUsecase(DetalleRepertorioBDGateway detalleRepertorioBDGateway,
                                                             DetalleRepertorioMapper detalleRepertorioMapper,
                                                             RepertorioBDGateway repertorioBDGateway,
                                                             CancionBDGateway cancionBDGateway) {
        return new DetalleRepertorioInteractor(detalleRepertorioBDGateway, detalleRepertorioMapper,
                repertorioBDGateway, cancionBDGateway);
    }
}