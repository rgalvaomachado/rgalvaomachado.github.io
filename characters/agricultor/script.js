// Script específico dA Agricultora

// Configurar dados de diálogo dA Agricultora
function setupAgricultorDialogue() {
    const dialogueData = [
        {
            speaker: 'Rosa',
            avatar: '🌱',
            text: 'Oi %playerName%! Eu sou o Rosa! 🌱',
            isPlayer: false
        },
        {
            speaker: 'Rosa',
            avatar: '🌱',
            text: 'Sabia que eu uso o sol para fazer minhas plantas crescerem? Ele me ajuda a bombear água para regar tudo!',
            isPlayer: false
        },
        {
            speaker: '%playerName%',
            avatar: '👦',
            text: 'Uau! Como assim, Rosa? 🤔',
            isPlayer: true
        },
        {
            speaker: 'Rosa',
            avatar: '🌱',
            text: 'Eu tenho painéis solares que captam a luz do sol e transformam em energia! Aí eu uso essa energia para ligar as bombas que regam minhas plantações!',
            isPlayer: false
        },
        {
            speaker: 'Rosa',
            avatar: '🌱',
            text: 'É como se o sol fosse meu melhor amigo! ☀️',
            isPlayer: false
        }
    ];
    
    return dialogueData;
}

// Inicializar diálogo dA Agricultora
function initAgricultorDialogue() {
    const dialogueData = setupAgricultorDialogue();
    
    // Configurar dados globais
    if (typeof window.setupDialogueData === 'function') {
        window.setupDialogueData('agricultor');
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
    console.log('Agricultor - Página carregada');
    initAgricultorDialogue();
});
