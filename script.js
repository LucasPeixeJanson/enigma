const enigmas = {
    0: [
        { pergunta: "Qual a sigla da proteína responsável pela contração muscular no coração?", resposta: "troponina c" },
        { pergunta: "Qual o nome do dragão que se recusa a aceitar um novo cavaleiro após a morte de seu antigo parceiro?", resposta: "tairn" },
    ],
    1: [
        { pergunta: "Qual é o nome completo do irmão de Dumbledore?", resposta: "aberforth dumbledore" },
        { pergunta: "Qual era o nome do macaco de estimação de Ross?", resposta: "marcel" },
    ],
    2: [
        { pergunta: "Qual é a senha que Dumbledore usa para entrar em seu escritório no terceiro ano de Harry?", resposta: "sorvete de limão" },
        { pergunta: "Qual o nome do pato e do pintinho que Joey e Chandler adotam??", resposta: "duck e chick" },
    ],
    3: [
        { pergunta: "Durante a viagem para Londres, Chandler e Joey brigam porque um deles não quer parar para ver um monumento. Qual era o monumento?", resposta: "big ben" },
        { pergunta: "Qual a principal enzima inibida pelos anti-inflamatórios não esteroides (AINEs)?", resposta: "ciclooxigenase" },
    ],
    4: [
        { pergunta: "Como é chamado o processo de morte celular programada?", resposta: "apoptose" },
        { pergunta: "Qual é o nome do programa de perguntas que Joey participa?", resposta: "bamboozled" },
    ],
    5: [
        { pergunta: "Qual é o nome da única bruxa conhecida que se tornou um fantasma após sua morte? - Qual é o nome do fenômeno em que o coração pode continuar batendo por alguns segundos após ser retirado do corpo?  -  Qual é o nome da boneca que Joey guarda com carinho e que Chandler tenta jogar fora?", resposta: "helena revenclaw, automatismo cardiaco, hugsy" },
    ]
};

const dataInicio = new Date("2025-03-10");
const hoje = new Date();
const diferencaDias = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));

exibeLetrasReveladas();

exibeEnigma(0);

const buttonElement = document.getElementById("verificar");
buttonElement.addEventListener("click", () => verificarResposta(0));

function exibeLetrasReveladas() {
    for (let i = 0; i < 13; i++) {
        const letra = localStorage.getItem("letra" + i);
        if (letra) {
            document.getElementById("letra" + i).textContent = letra;
        }
    }
}

function exibeEnigma(numeroDaPergunta = 0) {
    if (enigmas[diferencaDias][numeroDaPergunta] && (diferencaDias >= 0 && diferencaDias < Object.keys(enigmas).length)) {
        document.getElementById("enigma").textContent = enigmas[diferencaDias][numeroDaPergunta].pergunta;
    } else {
        document.getElementById("enigma").textContent = "Nenhum enigma disponível hoje.";
        buttonElement.disabled = true;
    }
}

function verificarResposta(numeroDaPergunta = 0) {
    const responstaElement = document.getElementById("resposta");
    const respostaUsuario = responstaElement.value.toLowerCase().trim();
    if (respostaUsuario === enigmas[diferencaDias][numeroDaPergunta].resposta) {
        document.getElementById("feedback").textContent = "Correto!";

        if (diferencaDias === 5) {
            revelaUltimoEnigma();
            return;
        }

        revelaEnigma();
        trocaPergunta(numeroDaPergunta + 1);
        responstaElement.value = "";
    } else {
        document.getElementById("feedback").textContent = "Tente novamente!";
    }
}

function revelaEnigma() {
    const enigma = "RUAITAPEVA";
    const numeroAleatorio = Math.floor(Math.random() * 10);
    if (localStorage.getItem("letra" + numeroAleatorio)) {
        revelaEnigma();
        return;
    }
    const spanElement = document.getElementById("letra" + numeroAleatorio);
    spanElement.textContent = enigma.charAt(numeroAleatorio);
    localStorage.setItem("letra" + numeroAleatorio, enigma.charAt(numeroAleatorio));
}

function trocaPergunta(numeroDaPergunta) {
    buttonElement.removeEventListener("click", () => verificarResposta(numeroDaPergunta - 1));
    buttonElement.textContent = "Próxima pergunta";
    buttonElement.addEventListener("click", () => verificarResposta(numeroDaPergunta));
    exibeEnigma(numeroDaPergunta);
}

function revelaUltimoEnigma() {
    const enigma = "636";
    for (let i = 0; i < enigma.length; i++) {
        const spanElement = document.getElementById("letra" + (i + 10));
        spanElement.textContent = enigma.charAt(i);
        localStorage.setItem("letra" + (i + 10), enigma.charAt(i));
    }
    document.getElementById("feedback").textContent = "Temos um encontro marcado!";
    buttonElement.disabled = true;
}
