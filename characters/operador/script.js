// Script específico do Operador

// Configurar dados de diálogo do Operador
function setupOperadorDialogue() {
    const dialogueData = [
        {
            speaker: 'Nivaldo',
            avatar: '⚡',
            text: 'Oi %playerName%! Eu sou a Nivaldo! ⚡',
            isPlayer: false
        },
        {
            speaker: 'Nivaldo',
            avatar: '⚡',
            text: 'Eu trabalho em uma usina solar gigante! É como se eu fosse a "chefe" da energia do sol!',
            isPlayer: false
        },
        {
            speaker: '%playerName%',
            avatar: '👦',
            text: 'Uau! Como funciona uma usina solar? 🤔',
            isPlayer: true
        },
        {
            speaker: 'Nivaldo',
            avatar: '⚡',
            text: 'Imagina milhares de espelhos gigantes que seguem o sol! Eles captam a luz e transformam em energia elétrica!',
            isPlayer: false
        },
        {
            speaker: 'Nivaldo',
            avatar: '⚡',
            text: 'Depois eu envio essa energia para as casas de todo mundo! É como ser a "mãe" da energia limpa! ☀️',
            isPlayer: false
        }
    ];
    
    return dialogueData;
}

// Inicializar diálogo do Operador
function initOperadorDialogue() {
    const dialogueData = setupOperadorDialogue();
    
    // Configurar dados globais
    if (typeof window.setupDialogueData === 'function') {
        window.setupDialogueData('operador');
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
    console.log('Operador - Página carregada');
    initOperadorDialogue();
});
