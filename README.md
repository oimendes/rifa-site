🎟️ Sistema de Rifa Online – Projeto Completo

Este projeto consiste em um sistema de rifa online, desenvolvido para facilitar a visualização, escolha e controle de números disponíveis em uma rifa beneficente.
A aplicação foi construída usando HTML, CSS e JavaScript, integrada a uma API via Google Apps Script, com hospedagem no GitHub Pages.

🔗 Acesse o site: https://oimendes.github.io/rifa-site/

✨ Funcionalidades Principais

✔️ Interface moderna com paleta rosa claro e branco

✔️ Lista de 200 números em formato de grade responsiva

✔️ Botões que mudam o visual conforme o status

✔️ Bloqueio automático de números já vendidos, usando API e Google Sheets

✔️ Envio automático da mensagem para WhatsApp ao selecionar um número

✔️ Exibição de QR Code PIX integrado no site

✔️ Configuração rápida e hospedagem gratuita pelo GitHub Pages

🧩 Arquitetura Geral do Sistema
🖥️ Front-end

Criado com:

- HTML5

- CSS3 (design personalizado)

- JavaScript (DOM e consumo de API com fetch())

☁️ Back-end

Construído com:

- Google Apps Script, utilizado para criar uma API REST própria

- Endpoint público com suporte a HTTP GET para comunicação com o site

📊 Base de dados

- Google Sheets funciona como banco de dados

- Armazena:

  - Número da rifa

  - Status (Livre/Vendido)

  - Nome do comprador

  - Data/Hora do PIX

- API lê esses dados e envia ao site em JSON

🔗 Fluxo de Funcionamento

1. O site faz uma requisição GET para a API.

2. A API consulta o Google Sheets.

3. Retorna um JSON com os números e seus status.

4. O site:

  - Desabilita automaticamente números vendidos

  - Deixa disponíveis apenas os números livres

5. O usuário escolhe um número → abre WhatsApp com mensagem pronta

6. Pagamento feito via PIX com QR Code exibido na página

📌 API Utilizada

Endpoint público (Google Apps Script):

https://script.google.com/macros/s/SEU-ENDPOINT/exec

📄 Exemplo de retorno:
[
  { "numero": "001", "status": "Livre" },
  { "numero": "004", "status": "Vendido" }
]

📂 Estrutura do Projeto
/rifa-site
 ├── index.html        # Estrutura do site
 ├── style.css         # Estilização
 ├── script.js         # Funções e comunicação com API
 └── README.md         # Descrição do projeto
