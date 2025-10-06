// Script específico do Agricultor

// Configurar dados de diálogo do Agricultor
function setupAgricultorDialogue() {
    const dialogueData = [
        {
            speaker: 'Seu Zé',
            avatar: '🌱',
            text: 'Oi Lucas! Eu sou o Seu Zé! 🌱',
            isLucas: false
        },
        {
            speaker: 'Seu Zé',
            avatar: '🌱',
            text: 'Sabia que eu uso o sol para fazer minhas plantas crescerem? Ele me ajuda a bombear água para regar tudo!',
            isLucas: false
        },
        {
            speaker: 'Lucas',
            avatar: '👦',
            text: 'Uau! Como assim, Seu Zé? 🤔',
            isLucas: true
        },
        {
            speaker: 'Seu Zé',
            avatar: '🌱',
            text: 'Eu tenho painéis solares que captam a luz do sol e transformam em energia! Aí eu uso essa energia para ligar as bombas que regam minhas plantações!',
            isLucas: false
        },
        {
            speaker: 'Seu Zé',
            avatar: '🌱',
            text: 'É como se o sol fosse meu melhor amigo! ☀️',
            isLucas: false
        }
    ];
    
    return dialogueData;
}

// Inicializar diálogo do Agricultor
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
