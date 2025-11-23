// -------------------------------
// CONFIGURAÇÕES
// -------------------------------
const TOTAL_NUMEROS = 100;
const PRECO_NUMERO = 15;
const SEU_NUMERO_WHATSAPP = "5519981131148";

let NUMEROS_VENDIDOS = [];

const gridRifa = document.getElementById('grid-rifa');
const btnWhatsapp = document.getElementById('btn-whatsapp');
let numerosSelecionados = [];


// -------------------------------
// 1. BUSCAR NÚMEROS VENDIDOS DA API
// -------------------------------
async function carregarVendidos() {
    const url = "https://script.google.com/macros/s/AKfycbzfAaZrkhoP9aEcr-Jb4FL6vFS1KibcPsoSNrJm2q1v3Idlq16jA2EmHuOSJz6Oha68/exec";

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        NUMEROS_VENDIDOS = dados.vendidos;
        gerarGrade();
    } catch (erro) {
        console.error("Erro ao carregar API:", erro);
        gerarGrade(); 
    }
}


// -------------------------------
// 2. GERAR A GRADE
// -------------------------------
function gerarGrade() {
    gridRifa.innerHTML = "";

    for (let i = 1; i <= TOTAL_NUMEROS; i++) {
        const numeroDiv = document.createElement("div");
        numeroDiv.innerText = i.toString().padStart(3, "0");

        if (NUMEROS_VENDIDOS.includes(i)) {
            numeroDiv.classList.add("numero-vendido");

        } else {
            numeroDiv.classList.add("numero-disponivel");
            numeroDiv.addEventListener("click", () => selecionarNumero(i, numeroDiv));
        }

        gridRifa.appendChild(numeroDiv);
    }
}


// -------------------------------
// 3. SELEÇÃO DOS NÚMEROS
// -------------------------------
function selecionarNumero(numero, elemento) {
    const index = numerosSelecionados.indexOf(numero);

    if (index > -1) {
        numerosSelecionados.splice(index, 1);
        elemento.classList.remove("numero-selecionado");
        elemento.classList.add("numero-disponivel");

    } else {
        numerosSelecionados.push(numero);
        elemento.classList.remove("numero-disponivel");
        elemento.classList.add("numero-selecionado");
    }

    atualizarBotaoWhatsapp();
}


// -------------------------------
// 4. BOTÃO DO WHATSAPP
// -------------------------------
function atualizarBotaoWhatsapp() {
    if (numerosSelecionados.length > 0) {
        const total = (numerosSelecionados.length * PRECO_NUMERO).toFixed(2);
        btnWhatsapp.innerText = `Chamar no WhatsApp para finalizar: ${numerosSelecionados.length} nºs (R$ ${total})`;
        btnWhatsapp.disabled = false;

    } else {
        btnWhatsapp.innerText = "Fale Conosco (Selecione um número primeiro)";
        btnWhatsapp.disabled = true;
    }
}


// -------------------------------
// 5. ENVIAR MENSAGEM PRO WHATSAPP
// -------------------------------
function gerarMensagemWhatsapp() {
    if (numerosSelecionados.length === 0) return;

    numerosSelecionados.sort((a, b) => a - b);
    const total = (numerosSelecionados.length * PRECO_NUMERO).toFixed(2);

    const mensagem = `Olá! Quero reservar ${numerosSelecionados.length} número(s): ${numerosSelecionados.join(', ')}. Valor total: R$ ${total}.`;

    const url = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}


// -------------------------------
// 6. INICIAR
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
    carregarVendidos();
    btnWhatsapp.addEventListener("click", gerarMensagemWhatsapp);
});
