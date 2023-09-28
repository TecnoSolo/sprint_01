create database tecnosolo;

use tecnosolo;

CREATE TABLE cliente (
idCliente int primary key auto_increment,
email varchar(245) UNIQUE, 
senha varchar(245) NOT NULL,
nome varchar(40), 
razaoSocial varchar(40),
cnpj char(18),
telefone char(11),
constraint chkemail check (email LIKE  ( '%@%.%')),
constraint chkcnpj check (cnpj LIKE '__.___.___/0001-__'))auto_increment = 1;

create table sensores (
idSensor int primary key auto_increment,
modelo_sensor varchar(40),
latitude decimal(8, 6) DEFAULT 00.000000,
longitude decimal(8, 6) DEFAULT 00.000000,
fkCliente int, constraint  foreign key (fkCliente) references cliente (idCliente),
fkPlantacao int, constraint fkPT foreign key (fkPlantacao) references plantacaoTomate (idPlantacao));

-- tipo_sensor varchar(50));


CREATE TABLE dadosLeitura(
idLeitura int primary key auto_increment,
data_instalacao date not null,
data_hora_leitura timestamp default current_timestamp not null,
umidadeSoloTomate float not null,
fkSensor int, constraint fkS foreign key (fkSensor) references sensores (idSensor));


create table plantacaoTomate(
idPlantacao int primary key auto_increment,
hectares float default 0,
qtdAgua float default 0,
qtdSensores int default 0,
fkCliente int, constraint  foreign key (fkCliente) references cliente (idCliente));
;

create table endereco(
idEndereco int primary key auto_increment,
cep char(9),
uf varchar(2),
cidade varchar(50),
bairro varchar(50),
rua varchar(50),
complemento varchar(10),
constraint chkcep check (cep LIKE '_____-___'),
fkCliente int, constraint  foreign key (fkCliente) references cliente (idCliente));

