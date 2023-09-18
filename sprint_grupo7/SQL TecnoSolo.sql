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
cep char(9),
endereco varchar(50),
constraint chkemail check (email LIKE  ( '%@%.%')),
constraint chkcep check (cep LIKE '_____-___'),
constraint chkcnpj check (cnpj LIKE '__.___.___/0001-__'));

create table sensores (
idSensor int primary key auto_increment,
modelo_sensor varchar(40),
latitude decimal(8, 6) DEFAULT 00.000000,
longitude decimal(8, 6) DEFAULT 00.000000,
tipo_sensor varchar(50));


CREATE TABLE dadosLeitura(
idLeitura int primary key auto_increment,
data_instalacao date not null,
data_hora_leitura timestamp default current_timestamp not null,
umidadeSoloTomate float not null);


create table plantacaoTomate(
idPlantacao int primary key auto_increment,
hectares float default 0,
qtdAgua float default 0,
qtdSensores int default 0);

