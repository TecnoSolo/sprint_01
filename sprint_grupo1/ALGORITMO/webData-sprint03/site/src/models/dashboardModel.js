var database = require("../database/config");

function buscarUltimasMedidas(idSensor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        umidadeSoloTomate as umidade,
			registroLeitura
                    from registro
						join sensores on fkSensor = idSensor
							where fkSensor = ${idSensor}
                    order by idRegistro desc`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idSensor) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        umidadeSoloTomate as umidade,
			registroLeitura
                    from registro
						join sensores on fkSensor = idSensor
							where fkSensor = ${idSensor}`;
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
    buscarMedidasEmTempoReal
    // analyticsMedidasTempoReal
}
