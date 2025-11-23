const NUMEROS_VENDIDOS = [
    // Exemplo:
    // 5, 18, 200, 
];
// ==========================================================
// ==========================================================

const TOTAL_NUMEROS = 200;
const PRECO_NUMERO = 15;
const gridRifa = document.getElementById('grid-rifa');
const btnWhatsapp = document.getElementById('btn-whatsapp');

let numerosSelecionados = [];
const SEU_NUMERO_WHATSAPP = "5519981131148"; 

// ----------------------------------------------------------

// ----------------------------------------------------------
function gerarGrade() {
    gridRifa.innerHTML = ''; // Limpa a grade antes de gerar

    for (let i = 1; i <= TOTAL_NUMEROS; i++) {
        const numeroDiv = document.createElement('div');
        numeroDiv.innerText = i.toString().padStart(3, '0'); // 001, 002...

        if (NUMEROS_VENDIDOS.includes(i)) {
            // Se já está vendido (seu array manual), aplica a cor VERDE
            numeroDiv.classList.add('numero-vendido');
        } else {
            // Se está disponível, permite a seleção
            numeroDiv.classList.add('numero-disponivel');
            numeroDiv.addEventListener('click', () => selecionarNumero(i, numeroDiv));
        }

        gridRifa.appendChild(numeroDiv);
    }
}

// ----------------------------------------------------------

// ----------------------------------------------------------
function selecionarNumero(numero, elemento) {
    // Verifica se o número já está selecionado
    const index = numerosSelecionados.indexOf(numero);

    if (index > -1) {
        // Deselecionar
        numerosSelecionados.splice(index, 1); // Remove do array
        elemento.classList.remove('numero-selecionado');
        elemento.classList.add('numero-disponivel');
    } else {
        // Selecionar
        numerosSelecionados.push(numero); // Adiciona ao array
        elemento.classList.remove('numero-disponivel');
        elemento.classList.add('numero-selecionado');
    }

    atualizarBotaoWhatsapp();
}

// ----------------------------------------------------------

// ----------------------------------------------------------
function atualizarBotaoWhatsapp() {
    if (numerosSelecionados.length > 0) {
        const total = (numerosSelecionados.length * PRECO_NUMERO).toFixed(2);
        btnWhatsapp.innerText = `Chamar no WhatsApp: ${numerosSelecionados.length} nºs (R$ ${total})`;
        btnWhatsapp.disabled = false;
    } else {
        btnWhatsapp.innerText = `Fale Conosco (Selecione um número primeiro)`;
        btnWhatsapp.disabled = true;
    }
}

function gerarMensagemWhatsapp() {
    if (numerosSelecionados.length === 0) return;

    // Coloca os números em ordem crescente
    numerosSelecionados.sort((a, b) => a - b); 
    
    const total = (numerosSelecionados.length * PRECO_NUMERO).toFixed(2);
    
    let mensagem = `Olá! Vi o site da Rifa da Wendy e gostaria de reservar ${numerosSelecionados.length} número(s): ${numerosSelecionados.join(', ')}. O valor total é R$ ${total}. Gostaria de confirmar a disponibilidade e finalizar o pagamento por PIX.`;
    
    const whatsappUrl = `https://wa.me/${SEU_NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Inicializa a grade quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    gerarGrade();
    atualizarBotaoWhatsapp();
    btnWhatsapp.addEventListener('click', gerarMensagemWhatsapp);
});
