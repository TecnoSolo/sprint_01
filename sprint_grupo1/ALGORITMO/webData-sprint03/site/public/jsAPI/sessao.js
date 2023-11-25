// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var cnpj = sessionStorage.CNPJ_USUARIO;
    var telefone = sessionStorage.TELEFONE_USUARIO;

    var b_usuario = document.getElementById("bNome");
    var b_email = document.getElementById("bEmail");
    var b_cnpj = document.getElementById("bCnpj");
    var b_telefone = document.getElementById("bTelefone");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
        b_email.innerHTML = email;
        b_cnpj.innerHTML = cnpj;
        b_telefone.innerHTML = telefone;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

