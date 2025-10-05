// Script específico do Piloto

// Configurar dados de diálogo do Piloto
function setupPilotoDialogue() {
    const dialogueData = [
        {
            speaker: 'Carlos',
            avatar: '✈️',
            text: 'Olá %playerName%! Eu sou a Carlos! ✈️',
            isPlayer: false
        },
        {
            speaker: 'Carlos',
            avatar: '✈️',
            text: 'Você sabia que o sol é meu GPS natural? Ele me ajuda a saber para onde estou indo!',
            isPlayer: false
        },
        {
            speaker: '%playerName%',
            avatar: '👦',
            text: 'Nossa! Como o sol pode ser um GPS? 🤔',
            isPlayer: true
        },
        {
            speaker: 'Carlos',
            avatar: '✈️',
            text: 'Antigamente, os pilotos usavam o sol para se orientar! Agora temos aviões que voam usando energia solar!',
            isPlayer: false
        },
        {
            speaker: 'Carlos',
            avatar: '✈️',
            text: 'E nos aeroportos, temos painéis solares gigantes que geram energia limpa! É incrível! ☀️',
            isPlayer: false
        }
    ];
    
    return dialogueData;
}

// Inicializar diálogo do Piloto
function initPilotoDialogue() {
    const dialogueData = setupPilotoDialogue();
    
    // Configurar dados globais
    if (typeof window.setupDialogueData === 'function') {
        window.setupDialogueData('piloto');
    }
    
    // Iniciar diálogo cinematográfico
    if (typeof window.startCinematicDialogue === 'function') {
        setTimeout(() => {
            window.startCinematicDialogue();
        }, 500);
    }
}

// Função para voltar à escolha de personagens
function voltarEscolha() {
    // Redirecionar para a página principal de escolha
    window.location.href = '../../index.html#escolhaPersonagem';
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initPilotoDialogue();
});
