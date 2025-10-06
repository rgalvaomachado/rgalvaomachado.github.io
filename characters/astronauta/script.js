// Script específico do Astronauta

// Configurar dados de diálogo do Astronauta
function setupAstronautaDialogue() {
    const dialogueData = [
        {
            speaker: 'Comandante Pedro',
            avatar: '🚀',
            text: 'E aí, Lucas! Eu sou o Comandante Pedro! 🚀',
            isLucas: false
        },
        {
            speaker: 'Comandante Pedro',
            avatar: '🚀',
            text: 'Você sabia que no espaço eu posso ver o sol de um jeito que ninguém na Terra consegue?',
            isLucas: false
        },
        {
            speaker: 'Lucas',
            avatar: '👦',
            text: 'Nossa! Como é o sol no espaço? 🤔',
            isLucas: true
        },
        {
            speaker: 'Comandante Pedro',
            avatar: '🚀',
            text: 'É lindo! Sem a atmosfera da Terra, o sol brilha muito mais forte! E nossa estação espacial funciona toda com painéis solares!',
            isLucas: false
        },
        {
            speaker: 'Comandante Pedro',
            avatar: '🚀',
            text: 'Eu estudo o sol para entender como ele funciona e ajudar a proteger a Terra! É minha missão! ☀️',
            isLucas: false
        }
    ];
    
    return dialogueData;
}

// Inicializar diálogo do Astronauta
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
    console.log('Astronauta - Página carregada');
    initAstronautaDialogue();
});
