CREATE DATABASE Contactos;

USE ContactosDB;

CREATE TABLE [Contactos] (
    [Id] int NOT NULL IDENTITY,
    [Nombre] nvarchar(max) NOT NULL,
    [Apellido] nvarchar(max) NULL,
    [Telefono] nvarchar(max) NULL,
    [Email] nvarchar(max) NULL,
    [UserId] int NOT NULL,
    CONSTRAINT [PK_Contactos] PRIMARY KEY ([Id])
);

CREATE TABLE [Users] (
    [Id] int NOT NULL IDENTITY,
    [Nombre] nvarchar(max) NOT NULL,
    [Apellido] nvarchar(max) NULL,
    [Email] nvarchar(max) NOT NULL,
    [Password] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id])
);