/* ============================================================
   SELAH PRAISE - Script de creación de base de datos
   SQL Server 2022 - Ejecutar en SSMS
   ============================================================ */

CREATE DATABASE selahpraise;
GO

USE selahpraise;
GO

/* ------------------------------------------------------------
   1) USUARIOS
   ------------------------------------------------------------ */
CREATE TABLE USUARIOS (
    id_usuario  INT IDENTITY(1,1) PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL,
    correo      VARCHAR(100) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    rol         VARCHAR(20)  NOT NULL
);
GO

/* ------------------------------------------------------------
   2) CANCIONES
   ------------------------------------------------------------ */
CREATE TABLE CANCIONES (
    id_cancion    INT IDENTITY(1,1) PRIMARY KEY,
    titulo        VARCHAR(100) NOT NULL,
    autor         VARCHAR(100) NULL,
    tono          VARCHAR(10)  NULL,
    bpm           INT          NULL,
    letra_acordes TEXT         NULL,
    youtube_url   VARCHAR(255) NULL
);
GO

/* ------------------------------------------------------------
   3) REPERTORIOS
   Un usuario puede crear muchos repertorios (1:N)
   ------------------------------------------------------------ */
CREATE TABLE REPERTORIOS (
    id_repertorio INT IDENTITY(1,1) PRIMARY KEY,
    fecha         DATE         NOT NULL,
    nombre        VARCHAR(100) NOT NULL,
    descripcion   TEXT         NULL,
    id_usuario    INT          NOT NULL,
    CONSTRAINT FK_REPERTORIOS_USUARIOS
        FOREIGN KEY (id_usuario) REFERENCES USUARIOS(id_usuario)
);
GO

/* ------------------------------------------------------------
   4) DETALLE_REPERTORIO
   Tabla intermedia N:M entre REPERTORIOS y CANCIONES
   ------------------------------------------------------------ */
CREATE TABLE DETALLE_REPERTORIO (
    id_detalle    INT IDENTITY(1,1) PRIMARY KEY,
    id_repertorio INT NOT NULL,
    id_cancion    INT NOT NULL,
    orden         INT NOT NULL,
    CONSTRAINT FK_DETALLE_REPERTORIOS
        FOREIGN KEY (id_repertorio) REFERENCES REPERTORIOS(id_repertorio),
    CONSTRAINT FK_DETALLE_CANCIONES
        FOREIGN KEY (id_cancion) REFERENCES CANCIONES(id_cancion),
    CONSTRAINT UQ_DETALLE_REPERTORIO_CANCION
        UNIQUE (id_repertorio, id_cancion)
);
GO

/* ------------------------------------------------------------
   Datos de ejemplo (opcional, para probar en Postman)
   ------------------------------------------------------------ */
INSERT INTO USUARIOS (nombre, correo, password, rol) VALUES
('Gerardo Admin', 'gerardo@selahpraise.com', '123456', 'ADMINISTRADOR');

INSERT INTO CANCIONES (titulo, autor, tono, bpm, letra_acordes, youtube_url) VALUES
('Eres mi plenitud', 'Autor Ejemplo', 'G', 72, '[G] Eres mi plenitud...', 'https://youtube.com/xxxx'),
('Grande es tu amor', 'Autor Ejemplo', 'D', 80, '[D] Grande es tu amor...', 'https://youtube.com/yyyy');

INSERT INTO REPERTORIOS (fecha, nombre, descripcion, id_usuario) VALUES
('2026-09-20', 'Servicio del domingo', 'Repertorio de prueba', 1);

INSERT INTO DETALLE_REPERTORIO (id_repertorio, id_cancion, orden) VALUES
(1, 1, 1),
(1, 2, 2);
GO
