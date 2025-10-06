// Estado da aplicação
let currentScreen = 'apresentacao';
let visitedCharacters = [];

// Sistema de diálogos cinematográficos
let currentDialogue = 0;
let currentDialogueData = [];
let isTyping = false;

// Aguardar o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado - iniciando jogo infantil');
    
    // Esconder todas as telas exceto a de apresentação
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        if (screen.id !== 'apresentacao') {
            screen.classList.add('hidden');
        }
    });
    
    // Mostrar apenas a tela de apresentação
    showScreen('apresentacao');
    
    console.log('Jogo infantil inicializado');
});

// Função para mostrar telas com transição suave
function showScreen(screenId) {
    console.log('Mostrando tela:', screenId);
    
    const targetScreen = document.getElementById(screenId);
    if (!targetScreen) {
        console.error('Tela não encontrada:', screenId);
        return;
    }
    
    // Se já é a tela atual, não fazer nada
    if (currentScreen === screenId) {
        return;
    }
    
    // Encontrar tela atual
    const currentScreenElement = document.getElementById(currentScreen);
    
    // Adicionar efeito de transição suave
    if (currentScreenElement) {
        // Fade out da tela atual
        currentScreenElement.style.opacity = '0';
        currentScreenElement.style.transform = 'translateX(-20px) scale(0.98)';
        
        setTimeout(() => {
            currentScreenElement.classList.add('hidden');
            
            // Mostrar nova tela
            targetScreen.classList.remove('hidden');
            targetScreen.style.opacity = '0';
            targetScreen.style.transform = 'translateX(20px) scale(0.98)';
            
            // Fade in da nova tela
            setTimeout(() => {
                targetScreen.style.opacity = '1';
                targetScreen.style.transform = 'translateX(0) scale(1)';
                currentScreen = screenId;
                console.log('Tela mostrada:', screenId);
            }, 50);
        }, 300);
    } else {
        // Primeira vez - mostrar diretamente
        targetScreen.classList.remove('hidden');
        targetScreen.style.opacity = '1';
        targetScreen.style.transform = 'translateX(0) scale(1)';
        currentScreen = screenId;
        console.log('Tela mostrada:', screenId);
    }
}

// Funções de navegação do jogo

// 1. Iniciar aventura (Apresentação -> História)
function iniciarAventura() {
    console.log('Iniciando aventura do Lucas');
    // Configurar diálogos do tio
    setupDialogueData('tio');
    showScreen('historia');
    // Iniciar diálogo após a transição
    setTimeout(() => {
        startCinematicDialogue();
    }, 500);
}

// 2. Conhecer amigos (História -> Escolha de Personagens)
function conhecerAmigos() {
    console.log('Conhecendo os amigos do tio João');
    showScreen('escolhaPersonagem');
}

// 3. Conversar com personagem (Escolha -> Conversa)
function conversarComPersonagem(personagem) {
    console.log('Conversando com:', personagem);
    
    // Verificar se pode conversar com o astronauta
    if (personagem === 'astronauta') {
        const requiredCharacters = ['agricultor', 'piloto', 'operador'];
        const hasTalkedToAll = requiredCharacters.every(char => visitedCharacters.includes(char));
        
        if (!hasTalkedToAll) {
            showMessage('Você precisa conversar com todos os outros amigos primeiro!', 'warning');
            return;
        }
    }
    
    // Adicionar personagem à lista de visitados
    if (!visitedCharacters.includes(personagem)) {
        visitedCharacters.push(personagem);
    }
    
    // Configurar diálogos baseado no personagem
    setupDialogueData(personagem);
    
    // Mostrar tela de conversa correspondente
    const screenMap = {
        'tio': 'historia',
        'agricultor': 'conversandoAgricultor',
        'piloto': 'conversandoPiloto',
        'astronauta': 'conversandoAstronauta',
        'operador': 'conversandoOperador'
    };
    
    const targetScreen = screenMap[personagem];
    if (targetScreen) {
        showScreen(targetScreen);
        // Iniciar diálogo após a transição
        setTimeout(() => {
            startCinematicDialogue();
        }, 500);
    }
}

// Configurar dados de diálogo para cada personagem
function setupDialogueData(personagem) {
    const dialogueData = {
        'tio': [
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
        ],
        'agricultor': [
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
        ],
        'piloto': [
            {
                speaker: 'Capitã Ana',
                avatar: '✈️',
                text: 'Olá Lucas! Eu sou a Capitã Ana! ✈️',
                isLucas: false
            },
            {
                speaker: 'Capitã Ana',
                avatar: '✈️',
                text: 'Você sabia que o sol é meu GPS natural? Ele me ajuda a saber para onde estou indo!',
                isLucas: false
            },
            {
                speaker: 'Lucas',
                avatar: '👦',
                text: 'Nossa! Como o sol pode ser um GPS? 🤔',
                isLucas: true
            },
            {
                speaker: 'Capitã Ana',
                avatar: '✈️',
                text: 'Antigamente, os pilotos usavam o sol para se orientar! Agora temos aviões que voam usando energia solar!',
                isLucas: false
            },
            {
                speaker: 'Capitã Ana',
                avatar: '✈️',
                text: 'E nos aeroportos, temos painéis solares gigantes que geram energia limpa! É incrível! ☀️',
                isLucas: false
            }
        ],
        'astronauta': [
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
        ],
        'operador': [
            {
                speaker: 'Engenheira Maria',
                avatar: '⚡',
                text: 'Oi Lucas! Eu sou a Engenheira Maria! ⚡',
                isLucas: false
            },
            {
                speaker: 'Engenheira Maria',
                avatar: '⚡',
                text: 'Eu trabalho em uma usina solar gigante! É como se eu fosse a "chefe" da energia do sol!',
                isLucas: false
            },
            {
                speaker: 'Lucas',
                avatar: '👦',
                text: 'Uau! Como funciona uma usina solar? 🤔',
                isLucas: true
            },
            {
                speaker: 'Engenheira Maria',
                avatar: '⚡',
                text: 'Imagina milhares de espelhos gigantes que seguem o sol! Eles captam a luz e transformam em energia elétrica!',
                isLucas: false
            },
            {
                speaker: 'Engenheira Maria',
                avatar: '⚡',
                text: 'Depois eu envio essa energia para as casas de todo mundo! É como ser a "mãe" da energia limpa! ☀️',
                isLucas: false
            }
        ]
    };
    
    currentDialogueData = dialogueData[personagem] || [];
    currentDialogue = 0;
}

// Iniciar diálogo cinematográfico
function startCinematicDialogue() {
    if (currentDialogueData.length === 0) return;
    
    // Atualizar spotlight dos personagens
    updateCharacterSpotlight();
    
    // Mostrar primeiro diálogo
    showDialogue(currentDialogueData[currentDialogue]);
    
    // Atualizar progresso
    updateDialogueProgress();
}

// Mostrar diálogo específico
function showDialogue(dialogue) {
    // Encontrar elementos na tela atual
    const currentScreen = document.querySelector('.screen:not(.hidden)');
    const speakerName = currentScreen ? currentScreen.querySelector('#speakerName') : null;
    const speakerAvatar = currentScreen ? currentScreen.querySelector('#speakerAvatar') : null;
    const dialogueText = currentScreen ? currentScreen.querySelector('#dialogueText') : null;
    
    if (speakerName) speakerName.textContent = dialogue.speaker;
    if (speakerAvatar) speakerAvatar.textContent = dialogue.avatar;
    
    if (dialogueText) {
        // Efeito de digitação
        typeText(dialogueText, dialogue.text);
    }
    
    // Atualizar spotlight
    updateCharacterSpotlight(dialogue.isLucas);
}

// Efeito de digitação
function typeText(element, text) {
    isTyping = true;
    element.innerHTML = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
        }
    }, 50);
}

// Atualizar spotlight dos personagens
function updateCharacterSpotlight(isLucas = null) {
    const lucasSpotlight = document.querySelector('.lucas-spotlight');
    const npcSpotlight = document.querySelector('.npc-spotlight');
    
    if (lucasSpotlight && npcSpotlight) {
        if (isLucas === true) {
            lucasSpotlight.classList.add('active');
            npcSpotlight.classList.remove('active');
        } else if (isLucas === false) {
            npcSpotlight.classList.add('active');
            lucasSpotlight.classList.remove('active');
        } else {
            lucasSpotlight.classList.remove('active');
            npcSpotlight.classList.remove('active');
        }
    }
}

// Próximo diálogo
function nextDialogue() {
    if (isTyping) {
        // Se ainda está digitando, completar imediatamente
        const currentScreen = document.querySelector('.screen:not(.hidden)');
        const dialogueText = currentScreen ? currentScreen.querySelector('#dialogueText') : null;
        if (dialogueText && currentDialogueData[currentDialogue]) {
            dialogueText.innerHTML = currentDialogueData[currentDialogue].text;
            isTyping = false;
        }
        return;
    }
    
    currentDialogue++;
    
    if (currentDialogue < currentDialogueData.length) {
        showDialogue(currentDialogueData[currentDialogue]);
        updateDialogueProgress();
    } else {
        // Diálogo terminou
        endDialogue();
    }
}

// Atualizar progresso do diálogo
function updateDialogueProgress() {
    const currentScreen = document.querySelector('.screen:not(.hidden)');
    const dots = currentScreen ? currentScreen.querySelectorAll('.dot') : [];
    dots.forEach((dot, index) => {
        if (index === currentDialogue) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Finalizar diálogo
function endDialogue() {
    // Mostrar botão de continuar
    const currentScreen = document.querySelector('.screen:not(.hidden)');
    const continueBtn = currentScreen ? currentScreen.querySelector('#continueBtn') : null;
    
    if (continueBtn) {
        // Verificar se é o astronauta (final da história)
        if (currentScreen.id === 'conversandoAstronauta') {
            continueBtn.innerHTML = '<i class="fas fa-star"></i>';
            continueBtn.onclick = finalizarAventura;
        } else {
            continueBtn.innerHTML = '<i class="fas fa-handshake"></i>';
            continueBtn.onclick = voltarEscolha;
        }
    }
    
    // Atualizar spotlight
    updateCharacterSpotlight();
}

// Exportar função para uso global
window.nextDialogue = nextDialogue;

// 4. Voltar para escolha de personagens (Conversa -> Escolha)
function voltarEscolha() {
    console.log('Voltando para escolha de personagens');
    showScreen('escolhaPersonagem');
    
    // Atualizar indicadores visuais após a transição
    setTimeout(() => {
        updateCharacterCards();
    }, 500);
}

// 5. Voltar para história (Escolha -> História)
function voltarHistoria() {
    console.log('Voltando para história');
    showScreen('historia');
}

// 6. Voltar para início (Qualquer tela -> Apresentação)
function voltarInicio() {
    console.log('Voltando para início');
    showScreen('apresentacao');
}

// 7. Finalizar aventura (Astronauta -> Fim)
function finalizarAventura() {
    console.log('Finalizando aventura');
    showScreen('fim');
}

// 8. Reiniciar aventura (Fim -> Apresentação)
function reiniciarAventura() {
    console.log('Reiniciando aventura');
    // Limpar estado
    visitedCharacters = [];
    showScreen('apresentacao');
}

// Sistema de mensagens
function showMessage(message, type = 'info') {
    // Remover mensagens existentes
    const existingMessage = document.querySelector('.game-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Criar elemento de mensagem
    const messageElement = document.createElement('div');
    messageElement.className = `game-message game-message-${type}`;
    messageElement.innerHTML = `
        <div class="message-content">
            <div class="message-icon">
                ${type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️'}
            </div>
            <div class="message-text">${message}</div>
            <button class="message-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Adicionar estilos
    messageElement.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'warning' ? '#FF6B35' : type === 'success' ? '#32CD32' : '#4A90E2'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        text-align: center;
        font-family: 'Fredoka', cursive;
        font-weight: 600;
        animation: slideDown 0.3s ease-out;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(messageElement);
    
    // Auto remover após 4 segundos
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.style.animation = 'slideUp 0.3s ease-in';
            setTimeout(() => messageElement.remove(), 300);
        }
    }, 4000);
}

// Adicionar CSS para animações de mensagem
const messageStyle = document.createElement('style');
messageStyle.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
    
    .message-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .message-icon {
        font-size: 1.2rem;
    }
    
    .message-text {
        flex: 1;
    }
    
    .message-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s ease;
    }
    
    .message-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(messageStyle);

// Efeitos visuais para o jogo

// Animar personagens
function animateCharacters() {
    const lucasAvatars = document.querySelectorAll('.lucas-avatar, .lucas-avatar-small');
    lucasAvatars.forEach(avatar => {
        avatar.style.animation = 'bounce 2s infinite';
    });
}

// Efeito de partículas para celebração
function createCelebrationParticles() {
    const celebrationScene = document.querySelector('#fim');
    if (!celebrationScene) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'celebration-particle';
        particle.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            animation: float-up 3s ease-out infinite;
            left: ${Math.random() * 100}%;
            top: 100%;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        celebrationScene.appendChild(particle);
    }
}

// Adicionar CSS para partículas de celebração
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Efeitos sonoros simulados (visual)
function playSoundEffect(type) {
    console.log('Efeito sonoro:', type);
    // Aqui você pode adicionar efeitos sonoros reais se quiser
}

// Animar diálogos
function animateDialogue() {
    const dialogueBoxes = document.querySelectorAll('.dialogue-box');
    dialogueBoxes.forEach((box, index) => {
        setTimeout(() => {
            box.style.animation = 'slideInUp 0.5s ease-out';
        }, index * 200);
    });
}

// Adicionar CSS para animação de diálogos
const dialogueStyle = document.createElement('style');
dialogueStyle.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(dialogueStyle);

// Efeito de hover para cards de personagens
function initCharacterHoverEffects() {
    const characterCards = document.querySelectorAll('.character-card');
    characterCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            playSoundEffect('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicializar efeitos quando a tela de escolha de personagens for mostrada
function initCharacterSelectionEffects() {
    if (currentScreen === 'escolhaPersonagem') {
        setTimeout(() => {
            animateDialogue();
            initCharacterHoverEffects();
            updateCharacterCards();
        }, 500);
    }
}

// Atualizar visual dos cards de personagens
function updateCharacterCards() {
    const characterCards = document.querySelectorAll('.character-card');
    
    // Limpar indicadores existentes
    characterCards.forEach(card => {
        card.classList.remove('visited', 'locked');
        const existingIndicator = card.querySelector('.visit-indicator, .lock-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
    });
    
    characterCards.forEach(card => {
        const characterName = card.querySelector('h3').textContent.toLowerCase();
        let characterId = '';
        
        // Mapear nomes para IDs
        if (characterName.includes('zé')) characterId = 'agricultor';
        else if (characterName.includes('ana')) characterId = 'piloto';
        else if (characterName.includes('pedro')) characterId = 'astronauta';
        else if (characterName.includes('maria')) characterId = 'operador';
        
        // Verificar se já foi visitado
        const isVisited = visitedCharacters.includes(characterId);
        const isAstronauta = characterId === 'astronauta';
        const canVisitAstronauta = isAstronauta ? 
            ['agricultor', 'piloto', 'operador'].every(char => visitedCharacters.includes(char)) : true;
        
        // Adicionar indicadores visuais
        if (isVisited) {
            card.classList.add('visited');
            const checkmark = document.createElement('div');
            checkmark.className = 'visit-indicator';
            checkmark.innerHTML = '✅';
            checkmark.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 1.5rem;
                z-index: 10;
            `;
            card.appendChild(checkmark);
        } else if (isAstronauta && !canVisitAstronauta) {
            card.classList.add('locked');
            const lock = document.createElement('div');
            lock.className = 'lock-indicator';
            lock.innerHTML = '🔒';
            lock.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 1.5rem;
                z-index: 10;
            `;
            card.appendChild(lock);
        }
    });
    
    // Atualizar barra de progresso
    updateProgressBar();
}

// Atualizar barra de progresso
function updateProgressBar() {
    const requiredCharacters = ['agricultor', 'piloto', 'operador'];
    const visitedCount = requiredCharacters.filter(char => visitedCharacters.includes(char)).length;
    const progressPercentage = (visitedCount / requiredCharacters.length) * 100;
    
    const progressCount = document.getElementById('progressCount');
    const progressFill = document.getElementById('progressFill');
    
    if (progressCount) {
        progressCount.textContent = visitedCount;
    }
    
    if (progressFill) {
        progressFill.style.width = progressPercentage + '%';
    }
    
    // Mostrar mensagem de progresso
    if (visitedCount === requiredCharacters.length) {
        showMessage('Parabéns! Agora você pode conversar com o Comandante Pedro! 🚀', 'success');
    }
}

// Inicializar efeitos de celebração quando a tela de fim for mostrada
function initCelebrationEffects() {
    if (currentScreen === 'fim') {
        setTimeout(() => {
            createCelebrationParticles();
            animateDialogue();
        }, 500);
    }
}

// Observar mudanças de tela para aplicar efeitos
const originalShowScreen = showScreen;
showScreen = function(screenId) {
    originalShowScreen(screenId);
    
    // Aplicar efeitos específicos da tela
    setTimeout(() => {
        if (screenId === 'escolhaPersonagem') {
            initCharacterSelectionEffects();
        } else if (screenId === 'fim') {
            initCelebrationEffects();
        }
    }, 100);
};

// Controle de teclado para o jogo
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'Enter':
            // Avançar na tela atual
            if (currentScreen === 'apresentacao') {
                iniciarAventura();
            } else if (currentScreen === 'historia') {
                conhecerAmigos();
            }
            break;
        case 'Escape':
            // Voltar para tela anterior
            if (currentScreen === 'escolhaPersonagem') {
                voltarHistoria();
            } else if (currentScreen.includes('conversando')) {
                voltarEscolha();
            } else if (currentScreen === 'historia') {
                voltarInicio();
            }
            break;
    }
});

// Exportar funções para uso global
window.iniciarAventura = iniciarAventura;
window.conhecerAmigos = conhecerAmigos;
window.conversarComPersonagem = conversarComPersonagem;
window.voltarEscolha = voltarEscolha;
window.voltarHistoria = voltarHistoria;
window.voltarInicio = voltarInicio;
window.finalizarAventura = finalizarAventura;
window.reiniciarAventura = reiniciarAventura;

console.log('Jogo infantil carregado - funções disponíveis:', {
    iniciarAventura,
    conhecerAmigos,
    conversarComPersonagem,
    voltarEscolha,
    voltarHistoria,
    voltarInicio,
    finalizarAventura,
    reiniciarAventura
});