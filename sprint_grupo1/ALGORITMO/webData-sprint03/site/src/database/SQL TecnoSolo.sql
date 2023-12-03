create database tecnosolo;

use tecnosolo;

CREATE TABLE empresa (
idEmpresa int primary key auto_increment,
email varchar(245) UNIQUE, 
senha varchar(245) NOT NULL,
nome varchar(40), 
razaoSocial varchar(40),
cnpj char(18),
telefone char(11)
-- constraint chkemail check (email LIKE  ( '%@%.%')),
-- constraint chkcnpj check (cnpj LIKE '__.___.___/0001-__')
)auto_increment = 1;

create table sensores (
idSensor int primary key auto_increment,
modeloSensor varchar(40),
latitude decimal(10, 8) DEFAULT 00.000000,
longitude decimal(11, 8) DEFAULT 00.000000,
dataInstalacao date not null,
fkPlantacao int, constraint fkPT foreign key (fkPlantacao) references plantacaoTomate (idPlantacao));

drop table registro;
CREATE TABLE registro(
idRegistro int auto_increment,
registroLeitura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
umidadeSoloTomate float not null,
fkSensor int, 
constraint fkS foreign key (fkSensor) references sensores (idSensor),
primary key (idRegistro, fkSensor)
);


create table plantacaoTomate(
idPlantacao int primary key auto_increment,
hectares float default 0,
qtdAgua float default 0,
qtdSensores int default 0,
fkEmpresa int, constraint  foreign key (fkEmpresa) references empresa (idEmpresa),
qtdPlantas int,
qtdKg float,
tipoSolo varchar(45));

create table endereco(
idEndereco int primary key auto_increment,
cep char(9),
uf varchar(2),
cidade varchar(50),
bairro varchar(50),
rua varchar(50),
complemento varchar(10),
constraint chkcep check (cep LIKE '_____-___'),
fkEmpresa int, constraint  foreign key (fkEmpresa) references empresa (idEmpresa));

insert into empresa values 
	(null, 'pomodoro@tomate.com', 'EoK01!3f', 'João Carlos Gomes', 'PomodoroCompany', '01.001.001/0001-01', '997828063'),
    (null, 'tomato@gmail.com', '!OPcD05d', 'Jonas Cardooso Alves', 'TomatoCompany', '02.002.002/0001-02', '912018173');

insert into endereco values 
	(null, '05889-380', 'SP', 'São Paulo', 'Parque Fernanda', 'Rua General Ribamar de Miranda', null, 1),
    (null, '19872-331', 'RJ', 'Rio de Janeiro', 'Botafogo', 'Rua Uruguaiana', null, 2),
    (null, '83312-912', 'SP', 'São Paulo', 'Jardins', 'Rua Canadá', null, 2);

insert into plantacaoTomate values 
	(null, 25, 2000000, 125, 1, 33750, 260000, 'arenoso'),
    (null, 20, 1800000, 120, 2, 27000, 200000, 'argiloso'),
    (null, 13, 1100000, 80, 1, 17550, 135000, 'arenoso');

insert into sensores values
	(null, 'DHT11', '40.71727401', '-74.00898606', '2023-04-01', 1),
	(null, 'DHT11', '-71.6741', '36.0204', '2023-03-23', 1),
    (null, 'DHT11', '-50.2925', '29.1891', '2023-06-17', 1);


truncate table sensores;
insert into registro values
	(null, current_timestamp(), 62, 2),
    (null, current_timestamp(), 65, 2),
    (null, current_timestamp(), 70, 2);
    
insert into registro values
	(null, current_timestamp(), 40, 2);
    
insert into registro values
	(null, default, 40, 1);

select * from empresa;
select * from endereco;
select * from sensores;
select * from plantacaoTomate;
SELEct * from registro;
select sensores.idSensor from plantacaoTomate join empresa on fkEmpresa = idEmpresa join sensores on fkPlantacao = idPlantacao where idEmpresa = 2;
select registro.registroLeitura, registro.umidadeSoloTomate, sensores.idSensor, sensores.latitude, sensores.longitude from registro join sensores on fkSensor = idSensor;

select en.rua, pl.idPlantacao, pl.tipoSolo, sen.longitude, sen.latitude, 
	DATE_FORMAT(dataInstalacao,'%d/%m/%Y') as data_instalacao
  from empresa as emp join endereco as en on en.fkEmpresa = emp.idEmpresa
	join plantacaoTomate as pl on pl.fkEmpresa = emp.idEmpresa
		join sensores as sen on sen.fkPlantacao = pl.idPlantacao where idSensor = 1;

	select 
        umidadeSoloTomate as umidade,
				DATE_FORMAT(registroLeitura,'%H:%i:%s') as momento_grafico
                    from registro
						join sensores on fkSensor = idSensor
							where fkSensor = 1
                    order by idRegistro desc;

select 
        umidadeSoloTomate as umidade,
            DATE_FORMAT(registroLeitura,'%H:%i:%s') as momento_grafico
                    from registro
						join sensores on fkSensor = idSensor
							where fkSensor = 1;
                            
		