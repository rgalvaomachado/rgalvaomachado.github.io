// Script específico dA Astronauta

// Configurar dados de diálogo dA Astronauta
function setupAstronautaDialogue() {
    const dialogueData = [
        {
            speaker: 'Lúcia',
            avatar: '🚀',
            text: 'E aí, %playerName%! Eu sou o Lúcia! 🚀',
            isPlayer: false
        },
        {
            speaker: 'Lúcia',
            avatar: '🚀',
            text: 'Você sabia que no espaço eu posso ver o sol de um jeito que ninguém na Terra consegue?',
            isPlayer: false
        },
        {
            speaker: '%playerName%',
            avatar: '👦',
            text: 'Nossa! Como é o sol no espaço? 🤔',
            isPlayer: true
        },
        {
            speaker: 'Lúcia',
            avatar: '🚀',
            text: 'É lindo! Sem a atmosfera da Terra, o sol brilha muito mais forte! E nossa estação espacial funciona toda com painéis solares!',
            isPlayer: false
        },
        {
            speaker: 'Lúcia',
            avatar: '🚀',
            text: 'Eu estudo o sol para entender como ele funciona e ajudar a proteger a Terra! É minha missão! ☀️',
            isPlayer: false
        }
    ];
    
    return dialogueData;
}

// Inicializar diálogo dA Astronauta
function initAstronautaDialogue() {
    const dialogueData = setupAstronautaDialogue();
    
    // Configurar dados globais
    if (typeof window.setupDialogueData === 'function') {
        window.setupDialogueData('astronauta');
    }
    
    // Iniciar diálogo cinematográfico
    if (typeof window.startCinematicDialogue === 'function') {
        setTimeout(() => {
            window.startCinematicDialogue();
        }, 500);
    }
}

// Função para finalizar a aventura
function finalizarAventura() {
    // Redirecionar para a página principal de finalização
    window.location.href = '../../index.html#fim';
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initAstronautaDialogue();
});
