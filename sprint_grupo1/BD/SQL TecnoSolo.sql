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

create table plantacaoTomate(
idPlantacao int primary key auto_increment,
hectares float default 0,
qtdAgua float default 0, /*tirar*/
qtdSensores int default 0, /*tirar*/
fkEmpresa int, constraint  foreign key (fkEmpresa) references empresa (idEmpresa),
qtdPlantas int, /*tirar*/
qtdKg float,
tipoSolo varchar(45));

create table sensores (
idSensor int primary key auto_increment,
modeloSensor varchar(40),
latitude decimal(10, 8) DEFAULT 00.000000,
longitude decimal(11, 8) DEFAULT 00.000000,
dataInstalacao date not null,
fkPlantacao int, constraint fkPT foreign key (fkPlantacao) references plantacaoTomate (idPlantacao));


CREATE TABLE registro(
idRegistro int auto_increment,
registroLeitura datetime default current_timestamp ,
umidadeSoloTomate float not null,
fkSensor int, 
constraint fkS foreign key (fkSensor) references sensores (idSensor),
primary key (idRegistro, fkSensor)
);

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
    (null, '19872-331', 'RJ', 'Rio de Janeiro', 'Botafogo', 'Rua Uruguaiana', null, 1),
    (null, '83312-912', 'SP', 'São Paulo', 'Jardins', 'Rua Canadá', null, 2);

insert into plantacaoTomate values 
	(null, 25, 2000000, 125, 1, 33750, 260000, 'arenoso'),
    (null, 20, 1800000, 120, 2, 27000, 200000, 'argiloso'),
    (null, 13, 1100000, 80, 1, 17550, 135000, 'arenoso');

insert into sensores values
	(null, 'DHT11', '40.71727401', '-74.00898606', '2023-04-01', 1),
	(null, 'DHT11', '-71.6741', '36.0204', '2023-03-23', 3),
    (null, 'DHT11', '-50.2925', '29.1891', '2023-06-17', 2);

insert into registro values
	(null, '2023-11-23 14:00:00', 70, 1),
    (null, '2023-11-23 14:00:00', 80, 2),
    (null, '2023-11-23 14:00:00', 75, 3);
    
select * from empresa;
select * from endereco;
select plantacaoTomate.idPlantacao, empresa.razaoSocial, sensores.idSensor from plantacaoTomate join empresa on fkEmpresa = idEmpresa join sensores on fkPlantacao = idPlantacao;

select registro.registroLeitura, registro.umidadeSoloTomate, sensores.idSensor, sensores.latitude, sensores.longitude from registro join sensores on fkSensor = idSensor;

select 
        umidadeSoloTomate as umidade,
			registroLeitura
                    from registro
						join sensores on fkSensor = idSensor
							where fkSensor = 1
                    order by idRegistro desc;

insert into registro values (null, '2023-11-22 14:00:00', 90, 1);
select * from empresa;
select * from plantacaoTomate;
    
select * from sensores;
select 
        umidadeSoloTomate as umidade,
			registroLeitura
                    from registro
						join sensores on fkSensor = idSensor
							where fkSensor = idSensor;
truncate table registro;
SELECT * FROM registro;

update registro set registroLeitura = '2023-12-05 17:43:56' where idRegistro > 39;

SELECT avg(umidadeSoloTomate) as umidade, date_format(registroLeitura,'%d/%m/%Y') as dia from registro where fk	Sensor = 1 group by date_format(registroLeitura,'%d/%m/%Y') ;