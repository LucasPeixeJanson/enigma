const enigmas = {
    0: [
        { pergunta: "O que sempre sobe, mas nunca desce?", resposta: "idade" },
        { pergunta: "Tenho cidades, mas não casas. Tenho montanhas, mas não árvores. Quem sou eu?", resposta: "mapa" },
    ],
    1: [
        { pergunta: "Quanto mais você tira, maior eu fico. O que sou?", resposta: "buraco" },
        { pergunta: "O que pode encher uma sala, mas não ocupa espaço?", resposta: "luz" },
    ],
    2: [
        { pergunta: "O que tem chaves, mas não abre portas?", resposta: "piano" },
        { pergunta: "Sou alto quando sou jovem e baixo quando sou velho. Quem sou eu?", resposta: "vela" },
    ],
    3: [
        { pergunta: "O que tem um pescoço, mas não tem cabeça?", resposta: "garrafa" },
        { pergunta: "O que pode viajar pelo mundo enquanto fica no mesmo lugar?", resposta: "selo" },
    ],
    4: [
        { pergunta: "O que pode ser quebrado sem ser tocado?", resposta: "promessa" },
        { pergunta: "O que tem mãos, mas não pode bater palmas?", resposta: "relógio" },
    ],
    5: [
        { pergunta: "Thinas?", resposta: "thinas" },
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
