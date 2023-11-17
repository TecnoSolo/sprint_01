var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT id, nome, email, fk_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, email, senha, cnpj, telefone, razaoSocial, cep, UF, cidade, bairro, rua, complemento) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresa (email, senha, nome, razaoSocial, cnpj, telefone) VALUES ('${email}', '${senha}', '${nome}', '${razaoSocial}', '${cnpj}', '${telefone}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    

    var instrucaoEndereco = `
        INSERT INTO endereco (cep, uf, cidade, bairro, rua, complemento) VALUES ('${cep}', '${UF}', '${cidade}', '${bairro}', '${rua}', '${complemento}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoEndereco);
    return database.executar(instrucao, instrucaoEndereco);
}

module.exports = {
    autenticar,
    cadastrar
};