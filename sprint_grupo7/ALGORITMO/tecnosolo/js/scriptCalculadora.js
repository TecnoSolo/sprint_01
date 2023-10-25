
  
      function analisar(){
        mensagem.style.display = 'block';
        var quantidade_m2 = Number(qtd_m2.value);
        var quantidade_agua = Number(qtd_agua.value);
        var quantidade_produzida;
        var plantas;
        var valor_producao;


        // Pega o valor da água em litro e divide por 1000 para descobrir o valor em m³ e multiplica por 4.09 que é o valor do lt/m³
        quantidade_agua = (quantidade_agua/1000) * 4.09;


      
        // Está dando um desconto de 15% em cima do valor da água;
        var quantidade_agua_prod = quantidade_agua - (quantidade_agua - (quantidade_agua * 0.15));
         

        // Quantidade produzida por cada planta que é 7kg
        var prod_planta = 7000;

        // cada hectare possui em média 13.500 plantas de tomate
        // Então você pega 13.500 multiplica pelo tamanho da plantação e divide por 10.000 para descobrir QUANTAS PLANTAS TEM
          plantas = (13500 * quantidade_m2) / 10000

        // Pega a quantidade de plantas que tem na plantação e multriplica pela produção média de cada planta que é 7kg (7000)
        // Transformando o valor em KILOGRAMAS 
        quantidade_produzida = parseFloat((plantas * prod_planta));

        // Transformando o valor em TONELADAS;
        quantidade_produzida /= 1000000;


        // Está aumentando a quantidade produzida em 10%
        var quantidade_produzida_prod = (quantidade_produzida + (quantidade_produzida * 0.10));

        // Aqui está multiplicando a quantidade produzida por 2.72 (Valor do kg do tomate) e multiplicando por 1000 para KILOGRAMAS
        valor_producao = parseFloat((2.72 * quantidade_produzida)*1000);

        // Acrescentando 10% no valor da produção
        var valor_producao_prod = (valor_producao + (valor_producao * 0.10));



        // toLocaleString serve para formatar em valor MONETÁRIO é uma função do JS

          mensagem.innerHTML = ` Utilizando nosso sistema a produção da sua plantação irá aumentar em <strong>10%</strong>, passando de <b class='vermelho'>
            ${quantidade_produzida.toLocaleString({style: "7kg"})} toneladas de TOMATE
          </b> para <b class='green'>
            ${quantidade_produzida_prod.toLocaleString({style: "7kg"})} toneladas de TOMATE </b><br> E irá aumentar o seu faturamento de <b class='vermelho'>         
          ${valor_producao.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2})}</b> para <b class='green'>${valor_producao_prod.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2})}. </b><br>
       

                    
          E sua conta de água que era <strong class='vermelho'>${quantidade_agua.toLocaleString("pt-BR", {style: "currency" , currency: "BRL", maximumSignificantDigits: 3})}</strong> passa a ser <strong class='green'>${(quantidade_agua - quantidade_agua_prod).toLocaleString("pt-BR", {style: "currency" , currency: "BRL", maximumSignificantDigits: 3})}</strong> tendo uma economia de.<strong class='green'>
          ${quantidade_agua_prod.toLocaleString("pt-BR", {style: "currency" , currency: "BRL", maximumSignificantDigits: 3})}</strong>`
        }