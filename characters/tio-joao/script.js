// Script específico do Tio João

// Configurar dados de diálogo do Tio João
function setupTioJoaoDialogue() {
    const dialogueData = [
        {
            speaker: 'Tio João',
            avatar: '👨‍🔬',
            text: 'Lucas, você sabia que o sol é muito importante para muitas pessoas trabalharem?',
            isLucas: false
        },
        {
            speaker: 'Lucas',
            avatar: '👦',
            text: 'Sério, tio? Como assim? 🤔',
            isLucas: true
        },
        {
            speaker: 'Tio João',
            avatar: '👨‍🔬',
            text: 'Vou te apresentar alguns amigos meus que trabalham com o sol todos os dias!',
            isLucas: false
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
    console.log('Tio João - Página carregada');
    initTioJoaoDialogue();
});
