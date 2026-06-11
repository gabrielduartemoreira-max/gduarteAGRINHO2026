const questions = [
    {
        q: "Qual é o principal grão exportado pelo agronegócio brasileiro, liderando o mercado mundial?",
        options: ["Trigo", "Arroz", "Soja", "Feijão"],
        correct: 2
    },
    {
        q: "O uso de drones, sensores, Big Data e GPS no campo faz parte de qual conceito tecnológico?",
        options: ["Agricultura Subsistência", "Agricultura de Precisão", "Mecanização Primitiva", "Tração Animal"],
        correct: 1
    },
    {
        q: "Qual desses setores do agro é focado diretamente na criação e manejo de animais (bovinos, suínos, aves)?",
        options: ["Pecuária", "Silvicultura", "Floricultura", "Fruticultura"],
        correct: 0
    },
    {
        q: "O Brasil se destaca como o maior produtor e exportador mundial de qual destas commodities?",
        options: ["Suco de Laranja", "Azeite de Oliva", "Vinho Tinto", "Cacau em Pó"],
        correct: 0
    },
    {
        q: "A sigla 'ILPF' representa um sistema sustentável que une quais atividades em uma mesma área?",
        options: ["Indústria, Logística, Porto e Ferrovia", "Integração Lavoura-Pecuária-Floresta", "Incentivo Local de Pequenos Fazendeiros", "Irrigação de Lavouras por Poços Fluviais"],
        correct: 1
    },
    {
        q: "Qual região brasileira é amplamente reconhecida como a principal produtora de grãos e nova fronteira agrícola?",
        options: ["Nordeste", "Zona da Mata", "Centro-Oeste", "Litoral Sul"],
        correct: 2
    },
    {
        q: "A ciência aplicada que otimiza a produção de culturas agrícolas e a saúde do solo chama-se:",
        options: ["Geologia pura", "Agronomia", "Biologia Marinha", "Antropologia"],
        correct: 1
    },
    {
        q: "Qual biocombustível ecológico e renovável, derivado da cana-de-açúcar, é orgulho do agro brasileiro?",
        options: ["Gasolina Aditivada", "Diesel S10", "Etanol", "Gás Natural"],
        correct: 2
    },
    {
        q: "O agronegócio é um pilar econômico vital, representando cerca de qual porcentagem do PIB total do Brasil?",
        options: ["Apenas 2%", "Aproximadamente 10%", "Cerca de 25% a 30%", "Mais de 90%"],
        correct: 2
    },
    {
        q: "Qual é a principal vantagem ambiental e agronômica do sistema de 'Plantio Direto na Palha'?",
        options: ["Reduzir drasticamente a erosão do solo", "Aumentar a necessidade de adubo químico", "Eliminar completamente o uso de tratores", "Acelerar o crescimento das plantas em 5 vezes"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const progressEl = document.getElementById("progress");
const currentScoreEl = document.getElementById("current-score");
const feedbackEl = document.getElementById("feedback");
const btnNext = document.getElementById("btn-next");
const gameScreen = document.getElementById("game-screen");
const resultScreen = document.getElementById("result-screen");
const finalScoreEl = document.getElementById("final-score");
const performanceMsg = document.getElementById("performance-msg");

function loadQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    progressEl.innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    questionEl.innerText = currentQuestion.q;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn-option", `opt-${index}`);
        button.addEventListener("click", () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    feedbackEl.innerText = "";
    feedbackEl.className = "feedback";
    btnNext.style.display = "none";
    optionsContainer.innerHTML = "";
}

function selectOption(selectedIndex) {
    let currentQuestion = questions[currentQuestionIndex];
    let buttons = optionsContainer.getElementsByClassName("btn-option");

    // Bloquear novos cliques nas alternativas
    for (let button of buttons) {
        button.disabled = true;
    }

    if (selectedIndex === currentQuestion.correct) {
        score++;
        currentScoreEl.innerText = score;
        buttons[selectedIndex].classList.add("correct-answer");
        feedbackEl.innerText = "Resposta Correta! 🌾🎉";
        feedbackEl.className = "feedback correct-text";
    } else {
        buttons[selectedIndex].classList.add("wrong-answer");
        buttons[currentQuestion.correct].classList.add("correct-answer");
        feedbackEl.innerText = "Resposta Incorreta! ❌";
        feedbackEl.className = "feedback wrong-text";
    }

    btnNext.style.display = "inline-block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    gameScreen.style.display = "none";
    resultScreen.style.display = "block";
    finalScoreEl.innerText = score;

    if (score >= 8) {
        performanceMsg.innerText = "Espetacular! Você é um verdadeiro especialista no Agro Forte e sabe como a tecnologia e a sustentabilidade movem o nosso país! 🇧🇷🚜🌾";
    } else if (score >= 5) {
        performanceMsg.innerText = "Muito bom! Você tem um ótimo conhecimento sobre o agronegócio e a sua importância econômica nacional. 🌱";
    } else {
        performanceMsg.innerText = "Bom esforço! Que tal jogar novamente para aprender mais sobre as inovações, sustentabilidade e a força do nosso campo?";
    }
}

function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    currentScoreEl.innerText = "0";
    gameScreen.style.display = "block";
    resultScreen.style.display = "none";
    loadQuestion();
}

// Inicializar o quiz ao carregar a página completamente
window.onload = loadQuestion;
