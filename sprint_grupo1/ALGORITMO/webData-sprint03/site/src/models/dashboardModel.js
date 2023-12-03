var database = require("../database/config");

function buscarUltimasMedidas(idSensor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        umidadeSoloTomate as umidade,
            registroLeitura,
				DATE_FORMAT(registroLeitura,'%H:%i:%s') as momento_grafico
                    from registro
						join sensores on fkSensor = idSensor
							where fkSensor = ${idSensor}
                    order by idRegistro desc;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSensorPorEmpresa (idEmpresa) {

    instrucaoSql = `select sensores.idSensor from plantacaoTomate join empresa on fkEmpresa = idEmpresa join sensores on fkPlantacao = idPlantacao where idEmpresa = ${idEmpresa}`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
    ;
}

function buscarDadosPorSensor(idSensor) {
    var query = `select en.rua, pl.idPlantacao, pl.tipoSolo, sen.longitude, sen.latitude, 
	DATE_FORMAT(dataInstalacao,'%d/%m/%Y') as data_instalacao
  from empresa as emp join endereco as en on en.fkEmpresa = emp.idEmpresa
	join plantacaoTomate as pl on pl.fkEmpresa = emp.idEmpresa
		join sensores as sen on sen.fkPlantacao = pl.idPlantacao where idSensor = ${idSensor};`;
  
    return database.executar(query);
  }



function buscarMedidasEmTempoReal(idSensor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        umidadeSoloTomate as umidade,
            DATE_FORMAT(registroLeitura,'%H:%i:%s') as momento_grafico
                    from registro
						join sensores on fkSensor = idSensor
							where fkSensor = ${idSensor}
                            order by idRegistro desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


/*Analytics */

// function analyticsMedidasTempoReal(idSensor) {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select 
//         umidadeSoloTomate as umidade
//                     from registro
// 						join sensores on fkSensor = idSensor
// 							where fkSensor = ${idSensor}`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarDadosPorSensor,
    buscarSensorPorEmpresa
    // analyticsMedidasTempoReal
}
