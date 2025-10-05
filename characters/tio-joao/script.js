// Script específico do Tio João

// Configurar dados de diálogo do Tio João
function setupTioJoaoDialogue() {
    const dialogueData = [
        {
            speaker: 'Tio João',
            avatar: '👨‍🔬',
            text: '%playerName%, você sabia que o sol é muito importante para muitas pessoas trabalharem?',
            isPlayer: false
        },
        {
            speaker: '%playerName%',
            avatar: '👦',
            text: 'Sério, tio? Como assim? 🤔',
            isPlayer: true
        },
        {
            speaker: 'Tio João',
            avatar: '👨‍🔬',
            text: 'Vou te apresentar alguns amigos meus que trabalham com o sol todos os dias!',
            isPlayer: false
        }
    ];
    
    return dialogueData;
}

// Inicializar diálogo do Tio João
function initTioJoaoDialogue() {
    const dialogueData = setupTioJoaoDialogue();
    
    // Configurar dados globais
    if (typeof window.setupDialogueData === 'function') {
        window.setupDialogueData('tio');
    }
    
    // Iniciar diálogo cinematográfico
    if (typeof window.startCinematicDialogue === 'function') {
        setTimeout(() => {
            window.startCinematicDialogue();
        }, 500);
    }
}

// Função para conhecer os amigos (navegação)
function conhecerAmigos() {
    // Redirecionar para a página principal de escolha
    window.location.href = '../../index.html#escolhaPersonagem';
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initTioJoaoDialogue();
});
