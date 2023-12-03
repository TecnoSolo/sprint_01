var dashboardModel = require("../models/dashboardModel");

function buscarUltimasMedidas(req, res) {

    // const limite_linhas = 7;

    var idSensor = req.params.idSensor;

    console.log(`Recuperando as ultimas medidas`);

    dashboardModel.buscarUltimasMedidas(idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosPorSensor(req, res) {
    var idSensor = req.params.idSensor;
  
    dashboardModel.buscarDadosPorSensor(idSensor).then((resultado) => {
      resultado.forEach(objeto => {
        res.status(200).json(objeto);
      });  
    });
  }

function buscarSensorPorEmpresa(req, res) {
var idEmpresa = req.params.idEmpresa;

dashboardModel.buscarSensorPorEmpresa(idEmpresa).then((resultado) => {
    if (resultado.length > 0) {
    res.status(200).json(resultado);
    } else {
    res.status(204).json([]);
    }
}).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os aquarios: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
});
}


function buscarMedidasEmTempoReal(req, res) {

    var idSensor = req.params.idSensor;

    console.log(`Recuperando medidas em tempo real`);

    dashboardModel.buscarMedidasEmTempoReal(idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

// function analyticsMedidasTempoReal(req, res) {

//     var idSensor = req.params.idSensor;

//     console.log(`Recuperando medidas em tempo real`);

//     dashboardModel.analyticsMedidasTempoReal(idSensor).then(function (resultado) {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     }).catch(function (erro) {
//         console.log(erro);
//         console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
//         res.status(500).json(erro.sqlMessage);
//     });
// }

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarSensorPorEmpresa,
    buscarDadosPorSensor
    // analyticsMedidasTempoReal

}