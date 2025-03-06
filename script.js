const enigmas = [
    { pergunta: "O que sempre sobe, mas nunca desce?", resposta: "idade" },
    { pergunta: "Tenho cidades, mas não casas. Tenho montanhas, mas não árvores. Quem sou eu?", resposta: "mapa" },
    { pergunta: "Quanto mais você tira, maior eu fico. O que sou?", resposta: "buraco" },
    { pergunta: "O que pode encher uma sala, mas não ocupa espaço?", resposta: "luz" },
    { pergunta: "O que tem chaves, mas não abre portas?", resposta: "piano" },
    { pergunta: "Sou alto quando sou jovem e baixo quando sou velho. Quem sou eu?", resposta: "vela" },
    { pergunta: "O que tem um pescoço, mas não tem cabeça?", resposta: "garrafa" },
    { pergunta: "O que pode viajar pelo mundo enquanto fica no mesmo lugar?", resposta: "selo" },
    { pergunta: "O que pode ser quebrado sem ser tocado?", resposta: "promessa" },
    { pergunta: "O que tem mãos, mas não pode bater palmas?", resposta: "relógio" }
];

const dataInicio = new Date("2025-03-06");
const hoje = new Date();
const diferencaDias = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));

if (diferencaDias >= 0 && diferencaDias < enigmas.length) {
    document.getElementById("enigma").textContent = enigmas[diferencaDias].pergunta;
} else {
    document.getElementById("enigma").textContent = "Nenhum enigma disponível hoje.";
}

function verificarResposta() {
    const respostaUsuario = document.getElementById("resposta").value.toLowerCase().trim();
    if (respostaUsuario === enigmas[diferencaDias].resposta) {
        document.getElementById("feedback").textContent = "Correto! Aguarde o próximo desafio.";
        localStorage.setItem("enigmaResolvido" + diferencaDias, "true");
    } else {
        document.getElementById("feedback").textContent = "Tente novamente!";
    }
}
