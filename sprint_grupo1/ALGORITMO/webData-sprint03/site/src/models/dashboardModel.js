var database = require("../database/config");

function buscarUltimasMedidas(idSensor) {

    instrucaoSql = ''

    // if (process.env.AMBIENTE_PROCESSO == "producao") {
    //     instrucaoSql = `select  
    //     registroLeitura,
    //     umidadeSoloTomate as umidade,
    //                     FORMAT(registroLeitura, 'HH:mm:ss') as registroLeitura
    //                 from Registro
    //                 where fkSensor = ${idSensor}
    //                 order by id desc`;

    // } else
     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        umidadeSoloTomate as umidade,
			registroLeitura,
                    from registro
						join sensores on fkSensor = idSensor
							where fkSensor = ${idSensor};
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

    // if (process.env.AMBIENTE_PROCESSO == "producao") {
    //     instrucaoSql = `select top 1
    //                      registroLeitura,
    //                     umidadeSoloTomate as umidade,
    //                     CONVERT(varchar, registroLeitura, 108) as registroLeitura, 
    //                     fkSensor 
    //                     from Registro where fkSensor = ${idSensor} 
    //                 order by id desc`;

    // } else
     if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        umidadeSoloTomate as umidade,
			registroLeitura,
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


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
