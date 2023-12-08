var alertas = [];

function obterdados(idSensor) {
    fetch(`/dashboard/buscarMedidasEmTempoReal/${idSensor}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idSensor);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idSensor} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idSensor) {
    console.log('CAIU AQUIIIII')
    console.log(resposta)
    var umid = resposta[0].umidade;

    var grauDeAviso = '';

    var limites = {
        critico_baixo: 21,
        emergencia_baixo: 41,
        alerta_baixo: 61,
        ideal: 81,
        alerta_alto: 86,
        emergencia_alto: 96,
        critico_alto: 100
    };



    if (umid >= limites.emergencia_alto) {
        cardAlerta.style.backgroundColor = "red" 
        boxAlert.innerHTML = 'Sensor em estado de crítico'
        boxAlert.style.display = 'block'
        boxAlert.style.backgroundColor = 'red'


    }
    else if (umid >= limites.alerta_alto && umid < limites.emergencia_alto) {
        cardAlerta.style.backgroundColor = "orange"
        boxAlert.innerHTML = 'Sensor em estado de emergência'
        boxAlert.style.display = 'block'
        boxAlert.style.backgroundColor = 'orange'


    }

    else if (umid >= limites.emergencia_baixo && umid < limites.alerta_baixo) {
        cardAlerta.style.backgroundColor = "yellow"
        boxAlert.innerHTML = 'Sensor em estado de alerta'
        boxAlert.style.display = 'block'
        boxAlert.style.backgroundColor = 'yellow'

    }
    else if (umid >= limites.alerta_baixo && umid < limites.ideal) {
        cardAlerta.style.backgroundColor = "green"
        boxAlert.style.display = 'none'

        
    }
    else if (umid >= limites.ideal && umid < limites.alerta_alto) {
        cardAlerta.style.backgroundColor = "yellow"
        boxAlert.innerHTML = 'Sensor em estado de alerta'
        boxAlert.style.display = 'block'
        boxAlert.style.backgroundColor = 'yellow'


    }
    else if (umid < limites.emergencia_baixo && umid >= limites.critico_baixo) {
        cardAlerta.style.backgroundColor = "orange"
        boxAlert.innerHTML = 'Sensor em estado de emergência'
        boxAlert.style.display = 'block'
        boxAlert.style.backgroundColor = 'orange'
        
    }
    else if (umid < limites.critico_baixo) {
        cardAlerta.style.backgroundColor = "red"
        boxAlert.innerHTML = 'Sensor em estado de crítico'
        boxAlert.style.display = 'block'
        boxAlert.style.backgroundColor = 'red'

    }
}

function exibirAlerta(umid, idSensor, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idSensor == idSensor);

    if (indice >= 0) {
        alertas[indice] = { idSensor, umid, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idSensor, umid, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
}

// function removerAlerta(idSensor) {
//     alertas = alertas.filter(item => item.idSensor != idSensor);
//     exibirCards();
// }

// function exibirCards() {
//     alerta.innerHTML = '';

//     for (var i = 0; i < alertas.length; i++) {
//         var mensagem = alertas[i];
//         alerta.innerHTML += transformarEmDiv(mensagem);
//     }
// }

// function transformarEmDiv({ idSensor, umid, grauDeAviso, grauDeAvisoCor }) {

//     var descricao = JSON.parse(sessionStorage.AQUARIOS).find(item => item.id == idSensor).descricao;
//     return `
//     <div class="mensagem-alarme">
//         <div class="informacao">
//             <div class="${grauDeAvisoCor}">&#12644;</div> 
//             <h3>${descricao} está em estado de ${grauDeAviso}!</h3>
//             <small>Umidade ${umid}.</small>   
//         </div>
//         <div class="alarme-sino"></div>
//     </div>
//     `;
// }

function atualizacaoPeriodica() {
   
    setTimeout(atualizacaoPeriodica, 6000);
}