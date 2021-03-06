// Constantes utéis
const EMPTY_IMPUT = "";
const LOADING_IMPUT = "Carregando...";
const BASE_URL = "https://viacep.com.br/ws/";

// Método para limpar os campos antes de fazer o
// preenchimento dos dados obtidos da api do viacep
function changeInputs(message) {
    document.getElementById("inputEndereco").value = message;
    document.getElementById("inputBairro").value = message;
    document.getElementById("inputCidade").value = message;
    document.getElementById("inputUf").value = message;
}

// Callback de retorno oriundo da API
function callbackData(data) {
    if (!("erro" in data)) {
        document.getElementById("inputEndereco").value = data.logradouro;
        document.getElementById("inputBairro").value = data.bairro;
        document.getElementById("inputCidade").value = data.localidade;
        document.getElementById("inputUf").value = data.uf;
    } else {
        showInvalidCep();
    }
}

function showInvalidCep() {
    changeInputs(EMPTY_IMPUT);
    showErrorMessage();
}

// Função de busca do CEP
function fetchCEP(valueCep) {
    const cep = valueCep.replace(/\D/g, '');

    if (cep.length === 8) {
        const cepRegex = /^[0-9]{8}$/;

        if (cepRegex.test(cep)) {
            changeInputs(LOADING_IMPUT);
            let xhr = new XMLHttpRequest();
            xhr.open('GET', BASE_URL + cep + '/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        callbackData(JSON.parse(xhr.responseText));
                    }
                }
            };
            xhr.send();
        }
        else {
            showInvalidCep();
        }
    }
    else {
        changeInputs(EMPTY_IMPUT);
    }
}

function showErrorMessage() {
    const x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}