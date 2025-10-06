// ========================================
// JOGO INFANTIL: DESCOBRINDO O SOL
// Sistema de Aventura Interativa
// ========================================

// ========================================
// VARIÁVEIS GLOBAIS
// ========================================
let currentScreen = 'personalizacao';
let visitedCharacters = [];
let playerName = '';
let selectedCharacter = '';
let conversationCompleted = false;

// Sistema de diálogos
let currentDialogue = 0;
let currentDialogueData = [];
let isTyping = false;

// Mapeamento de imagens
const characterImages = {
    'curioso': 'shared/assets/pj1.png',
    'aventureiro': 'shared/assets/pj2.png',
    'explorador': 'shared/assets/pj3.png',
    'inventor': 'shared/assets/pj4.png'
};

const characterHeadImages = {
    'curioso': 'shared/assets/heads/pj1Head.png',
    'aventureiro': 'shared/assets/heads/pj2Head.png',
    'explorador': 'shared/assets/heads/pj3Head.png',
    'inventor': 'shared/assets/heads/pj4Head.png',
    'tio': 'shared/assets/heads/tioJoaoHead.png',
    'agricultor': 'shared/assets/heads/agricultorHead.png',
    'piloto': 'shared/assets/heads/pilotoHead.png',
    'operador': 'shared/assets/heads/operadorHead.png',
    'astronauta': 'shared/assets/heads/astronautaHead.png'
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌞 Iniciando Descoberta do Sol');
    initializeGame();
});

function initializeGame() {
    // Esconder todas as telas exceto personalização
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.toggle('hidden', screen.id !== 'personalizacao');
    });
    
    // Configurar eventos
    setupPersonalizationEvents();
    console.log('✅ Jogo inicializado com sucesso');
}

// ========================================
// SISTEMA DE PERSONALIZAÇÃO
// ========================================
function setupPersonalizationEvents() {
    const playerNameInput = document.getElementById('playerName');
    const startBtn = document.getElementById('startAdventureBtn');
    
    if (playerNameInput) {
        playerNameInput.addEventListener('input', handleNameInput);
    }
    
    if (startBtn) {
        startBtn.addEventListener('click', handleStartAdventure);
    }
}

function handleNameInput(event) {
    playerName = event.target.value.trim();
    updateStartButton();
}

function handleStartAdventure() {
    if (playerName && selectedCharacter) {
        iniciarAventura();
    }
}

function selectCharacter(character) {
    // Remover seleção anterior
    document.querySelectorAll('.character-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Selecionar novo personagem
    selectedCharacter = character;
    const selectedOption = document.querySelector(`[onclick="selectCharacter('${character}')"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
    }
    
    updatePlayerCharacterImage();
    updateStartButton();
}

function updateStartButton() {
    const startBtn = document.getElementById('startAdventureBtn');
    if (!startBtn) return;
    
    const isValid = playerName && selectedCharacter;
    startBtn.disabled = !isValid;
    
    if (isValid) {
        startBtn.innerHTML = `<i class="fas fa-play"></i> Começar Aventura!`;
    } else {
        startBtn.innerHTML = `<i class="fas fa-play"></i> Escolha seu nome e personagem`;
    }
}

// ========================================
// SISTEMA DE NAVEGAÇÃO
// ========================================
function showScreen(screenId) {
    console.log(`📱 Mudando para tela: ${screenId}`);
    
    // Esconder todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    
    // Mostrar tela atual
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
        currentScreen = screenId;
    } else {
        console.error(`❌ Tela não encontrada: ${screenId}`);
    }
}

// ========================================
// SISTEMA DE AVENTURA
// ========================================
function iniciarAventura() {
    console.log(`🚀 Iniciando aventura: ${playerName} como ${selectedCharacter}`);
    
    // Resetar estado
    visitedCharacters = [];
    conversationCompleted = false;
    
    // Configurar diálogos do Tio João
    setupDialogueData('tio');
    
    // Mostrar tela de história
    showScreen('historia');
    
    // Iniciar diálogo após transição
    setTimeout(() => {
        startCinematicDialogue();
    }, 500);
}

function conhecerAmigos() {
    console.log('👥 Conhecendo os amigos do tio João');
    
    // Mostrar tela de transição
    showScreen('transicao');
    
    // Carregar NPCs em background
    setTimeout(() => {
        updateCharacterCards();
        showScreen('escolhaPersonagem');
    }, 2000); // 2 segundos de transição
}

// ========================================
// SISTEMA DE CONVERSAS
// ========================================
function conversarComPersonagem(personagem) {
    console.log(`💬 Conversando com: ${personagem}`);
    
    // Resetar estado da conversa
    conversationCompleted = false;
    
    // Verificar se pode conversar
    if (!canTalkToCharacter(personagem)) {
        return;
    }
    
    // Adicionar à lista de visitados
    if (!visitedCharacters.includes(personagem)) {
        visitedCharacters.push(personagem);
        console.log(`✅ ${personagem} adicionado aos conhecidos`);
    }
    
    // Configurar diálogos
    setupDialogueData(personagem);
    updatePlayerCharacterImage();
    
    // Mostrar tela de conversa
    const screenMap = {
        'tio': 'historia',
        'agricultor': 'conversandoAgricultor',
        'piloto': 'conversandoPiloto',
        'operador': 'conversandoOperador',
        'astronauta': 'conversandoAstronauta'
    };
    
    const targetScreen = screenMap[personagem];
    if (targetScreen) {
        showScreen(targetScreen);
        setTimeout(() => {
            startCinematicDialogue();
        }, 500);
    }
}

function voltarEscolha() {
    console.log('⬅️ Voltando para escolha de personagens');
    
    // Mostrar tela de transição se precisar atualizar opções
    if (conversationCompleted) {
        showScreen('transicao');
        
        setTimeout(() => {
            updateCharacterCards();
            showScreen('escolhaPersonagem');
            updatePlayerCharacterImage();
            conversationCompleted = false;
        }, 1500); // 1.5 segundos para transição mais rápida
    } else {
        // Transição direta se não precisa atualizar
        showScreen('escolhaPersonagem');
        updatePlayerCharacterImage();
    }
}

function voltarHistoria() {
    console.log('🏠 Voltando para história');
    showScreen('historia');
}

// ========================================
// SISTEMA DE PROGRESSÃO
// ========================================
function canTalkToCharacter(personagem) {
    // Fase 1: Agricultor e Piloto sempre disponíveis
    if (personagem === 'agricultor' || personagem === 'piloto') {
        return true;
    }
    
    // Fase 2: Operador - precisa conhecer pelo menos um dos primeiros
    if (personagem === 'operador') {
        const hasTalkedToFirst = visitedCharacters.includes('agricultor') || visitedCharacters.includes('piloto');
        if (!hasTalkedToFirst) {
            showMessage('Você precisa conhecer o Agricultor ou o Piloto primeiro!', 'warning');
            return false;
        }
        return true;
    }
    
    // Fase 3: Astronauta - precisa conhecer todos os outros
    if (personagem === 'astronauta') {
        const requiredCharacters = ['agricultor', 'piloto', 'operador'];
        const hasTalkedToAll = requiredCharacters.every(char => visitedCharacters.includes(char));
        
        if (!hasTalkedToAll) {
            showMessage('Você precisa conhecer todos os outros amigos primeiro!', 'warning');
            return false;
        }
        return true;
    }
    
    return true;
}

function updateCharacterCards() {
    const charactersGrid = document.getElementById('charactersGrid');
    if (!charactersGrid) {
        console.error('❌ Grid de personagens não encontrado');
        return;
    }
    
    // Limpar grid
    charactersGrid.innerHTML = '';
    
    // Definir personagens
    const characters = [
        { id: 'agricultor', name: 'Seu Zé', title: 'O Agricultor', icon: 'fas fa-seedling', emoji: '🌱', phase: 1, requirements: [] },
        { id: 'piloto', name: 'Capitã Ana', title: 'A Piloto', icon: 'fas fa-plane', emoji: '✈️', phase: 1, requirements: [] },
        { id: 'operador', name: 'Engenheira Maria', title: 'A Operadora', icon: 'fas fa-bolt', emoji: '⚡', phase: 2, requirements: ['agricultor', 'piloto'] },
        { id: 'astronauta', name: 'Comandante Pedro', title: 'O Astronauta', icon: 'fas fa-rocket', emoji: '🚀', phase: 3, requirements: ['agricultor', 'piloto', 'operador'] }
    ];
    
    // Filtrar personagens disponíveis
    const availableCharacters = characters.filter(char => {
        // Não mostrar personagens já conhecidos
        if (visitedCharacters.includes(char.id)) {
            return false;
        }
        
        // Fase 1: Sempre mostrar Agricultor e Piloto
        if (char.phase === 1) return true;
        
        // Fase 2: Mostrar Operador após conhecer pelo menos um dos primeiros
        if (char.phase === 2) {
            return visitedCharacters.includes('agricultor') || visitedCharacters.includes('piloto');
        }
        
        // Fase 3: Mostrar Astronauta após conhecer todos os outros
        if (char.phase === 3) {
            return ['agricultor', 'piloto', 'operador'].every(req => visitedCharacters.includes(req));
        }
        
        return false;
    });
    
    // Criar cards
    availableCharacters.forEach(character => {
        const card = createCharacterCard(character);
        charactersGrid.appendChild(card);
    });
    
    console.log(`📋 ${availableCharacters.length} personagens disponíveis`);
}

function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'character-card available';
    card.onclick = () => conversarComPersonagem(character.id);
    
    const isVisited = visitedCharacters.includes(character.id);
    const canTalk = canTalkToCharacter(character.id);
    
    if (isVisited) {
        card.classList.remove('available');
        card.classList.add('visited');
    } else if (!canTalk) {
        card.classList.remove('available');
        card.classList.add('locked');
    }
    
    // Mapear para imagens das cabeças
    const headImages = {
        'agricultor': 'shared/assets/heads/agricultorHead.png',
        'piloto': 'shared/assets/heads/pilotoHead.png',
        'operador': 'shared/assets/heads/operadorHead.png',
        'astronauta': 'shared/assets/heads/astronautaHead.png'
    };
    
    const headImageSrc = headImages[character.id] || '';
    
    card.innerHTML = `
        <div class="character-avatar ${character.id}">
            ${headImageSrc ? `<img src="${headImageSrc}" alt="${character.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">` : `<i class="${character.icon}"></i>`}
        </div>
        <h3>${character.name}</h3>
        <p>${character.title}</p>
        <div class="character-preview">${character.emoji}</div>
        ${isVisited ? '<div class="visit-indicator">✅</div>' : ''}
        ${!canTalk && !isVisited ? '<div class="lock-indicator">🔒</div>' : ''}
    `;
    
    return card;
}

// ========================================
// SISTEMA DE DIÁLOGOS CINEMATOGRÁFICOS
// ========================================
function setupDialogueData(personagem) {
    currentDialogue = 0;
    currentDialogueData = [];
    
    const dialogues = getDialoguesForCharacter(personagem);
    currentDialogueData = dialogues;
}

function getDialoguesForCharacter(personagem) {
    const dialogues = {
        'tio': [
            { speaker: 'Tio João', avatar: '👨‍🦳', text: `Olá, ${playerName}! Seja bem-vindo à nossa aventura solar!`, isLucas: false },
            { speaker: 'Tio João', avatar: '👨‍🦳', text: 'Vou te apresentar alguns amigos que trabalham com energia solar!', isLucas: false },
            { speaker: playerName, avatar: '👦', text: 'Que legal, tio! Quero conhecer todos eles!', isLucas: true },
            { speaker: 'Tio João', avatar: '👨‍🦳', text: 'Perfeito! Vamos começar conhecendo nossos amigos!', isLucas: false }
        ],
        'agricultor': [
            { speaker: 'Seu Zé', avatar: '🌱', text: `Oi, ${playerName}! Eu sou o Seu Zé, o agricultor!`, isLucas: false },
            { speaker: 'Seu Zé', avatar: '🌱', text: 'Uso painéis solares para irrigar minhas plantações!', isLucas: false },
            { speaker: playerName, avatar: '👦', text: 'Nossa! Como funciona isso?', isLucas: true },
            { speaker: 'Seu Zé', avatar: '🌱', text: 'A energia do sol move as bombas de água! É muito eficiente!', isLucas: false }
        ],
        'piloto': [
            { speaker: 'Capitã Ana', avatar: '✈️', text: `Olá, ${playerName}! Sou a Capitã Ana!`, isLucas: false },
            { speaker: 'Capitã Ana', avatar: '✈️', text: 'Meus aviões usam energia solar para voar!', isLucas: false },
            { speaker: playerName, avatar: '👦', text: 'Aviões movidos a sol? Que incrível!', isLucas: true },
            { speaker: 'Capitã Ana', avatar: '✈️', text: 'Sim! É o futuro da aviação sustentável!', isLucas: false }
        ],
        'operador': [
            { speaker: 'Engenheira Maria', avatar: '⚡', text: `Oi, ${playerName}! Sou a Engenheira Maria!`, isLucas: false },
            { speaker: 'Engenheira Maria', avatar: '⚡', text: 'Opero uma usina solar que gera energia para toda a cidade!', isLucas: false },
            { speaker: playerName, avatar: '👦', text: 'Uau! Como vocês fazem isso?', isLucas: true },
            { speaker: 'Engenheira Maria', avatar: '⚡', text: 'Usamos espelhos para concentrar a luz do sol!', isLucas: false }
        ],
        'astronauta': [
            { speaker: 'Comandante Pedro', avatar: '🚀', text: `Olá, ${playerName}! Sou o Comandante Pedro!`, isLucas: false },
            { speaker: 'Comandante Pedro', avatar: '🚀', text: 'Na estação espacial, usamos energia solar para tudo!', isLucas: false },
            { speaker: playerName, avatar: '👦', text: 'No espaço também? Que legal!', isLucas: true },
            { speaker: 'Comandante Pedro', avatar: '🚀', text: 'Sim! O sol é nossa principal fonte de energia no espaço!', isLucas: false }
        ]
    };
    
    return dialogues[personagem] || [];
}

function startCinematicDialogue() {
    if (currentDialogueData.length === 0) {
        console.error('❌ Nenhum diálogo configurado');
        return;
    }
    
    currentDialogue = 0;
    showDialogue(currentDialogueData[currentDialogue]);
    updateDialogueProgress();
}

function showDialogue(dialogue) {
    const currentScreenElement = document.querySelector('.screen:not(.hidden)');
    if (!currentScreenElement) return;
    
    const speakerName = currentScreenElement.querySelector('#speakerName');
    const speakerAvatar = currentScreenElement.querySelector('#speakerAvatar');
    const dialogueText = currentScreenElement.querySelector('#dialogueText');
    const thinkingIndicator = currentScreenElement.querySelector('#thinkingIndicator');
    
    if (speakerName) speakerName.textContent = dialogue.speaker;
    
    // Atualizar avatar com imagem da cabeça
    if (speakerAvatar) {
        speakerAvatar.innerHTML = '';
        
        let headImageSrc = '';
        if (dialogue.isLucas && selectedCharacter) {
            headImageSrc = characterHeadImages[selectedCharacter] || characterHeadImages['curioso'];
        } else {
            const currentScreenId = currentScreenElement.id;
            if (currentScreenId.includes('Agricultor')) {
                headImageSrc = characterHeadImages['agricultor'];
            } else if (currentScreenId.includes('Piloto')) {
                headImageSrc = characterHeadImages['piloto'];
            } else if (currentScreenId.includes('Operador')) {
                headImageSrc = characterHeadImages['operador'];
            } else if (currentScreenId.includes('Astronauta')) {
                headImageSrc = characterHeadImages['astronauta'];
            } else if (currentScreenId.includes('historia')) {
                headImageSrc = characterHeadImages['tio'];
            }
        }
        
        if (headImageSrc) {
            const img = document.createElement('img');
            img.src = headImageSrc;
            img.alt = dialogue.speaker;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '50%';
            
            img.onerror = function() {
                speakerAvatar.innerHTML = '';
                speakerAvatar.textContent = dialogue.avatar;
            };
            
            speakerAvatar.appendChild(img);
        } else {
            speakerAvatar.textContent = dialogue.avatar;
        }
    }
    
    if (dialogueText) {
        // Mostrar indicador de pensamento
        if (thinkingIndicator) {
            thinkingIndicator.style.display = 'flex';
        }
        
        // Esconder texto anterior
        const typingText = dialogueText.querySelector('.typing-text');
        if (typingText) {
            typingText.style.display = 'none';
        }
        
        // Iniciar digitação após um pequeno delay
        setTimeout(() => {
            if (thinkingIndicator) {
                thinkingIndicator.style.display = 'none';
            }
            if (typingText) {
                typingText.style.display = 'inline-block';
            }
            typeText(dialogueText, dialogue.text);
        }, 800); // 800ms de "pensamento"
    }
    
    updateCharacterSpotlight(dialogue.isLucas);
}

function typeText(element, text) {
    isTyping = true;
    element.innerHTML = '';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            isTyping = false;
        }
    }, 30);
}

function nextDialogue() {
    if (isTyping) {
        // Completar texto atual
        const currentScreenElement = document.querySelector('.screen:not(.hidden)');
        const dialogueText = currentScreenElement ? currentScreenElement.querySelector('#dialogueText') : null;
        if (dialogueText) {
            const currentDialogueData = getDialoguesForCharacter(getCurrentCharacter());
            if (currentDialogueData[currentDialogue]) {
                dialogueText.innerHTML = currentDialogueData[currentDialogue].text;
                isTyping = false;
            }
        }
        return;
    }
    
    currentDialogue++;
    
    if (currentDialogue < currentDialogueData.length) {
        showDialogue(currentDialogueData[currentDialogue]);
        updateDialogueProgress();
    } else {
        endDialogue();
    }
}

function endDialogue() {
    conversationCompleted = true;
    
    const currentScreenElement = document.querySelector('.screen:not(.hidden)');
    const continueBtn = currentScreenElement ? currentScreenElement.querySelector('#continueBtn') : null;
    
    if (continueBtn) {
        if (currentScreenElement.id === 'conversandoAstronauta') {
            continueBtn.innerHTML = '<i class="fas fa-star"></i>';
            continueBtn.onclick = finalizarAventura;
        } else if (currentScreenElement.id === 'historia') {
            setTimeout(() => {
                conhecerAmigos();
            }, 1000);
        } else {
            continueBtn.innerHTML = '<i class="fas fa-handshake"></i>';
            continueBtn.onclick = voltarEscolha;
        }
    }
    
    updateCharacterSpotlight();
}

function updateCharacterSpotlight(isLucas) {
    const currentScreenElement = document.querySelector('.screen:not(.hidden)');
    if (!currentScreenElement) return;
    
    const lucasSpotlight = currentScreenElement.querySelector('.lucas-spotlight');
    const npcSpotlight = currentScreenElement.querySelector('.npc-spotlight');
    
    if (lucasSpotlight && npcSpotlight) {
        if (isLucas) {
            lucasSpotlight.classList.add('active');
            npcSpotlight.classList.remove('active');
        } else {
            lucasSpotlight.classList.remove('active');
            npcSpotlight.classList.add('active');
        }
    }
}

function updateDialogueProgress() {
    const currentScreenElement = document.querySelector('.screen:not(.hidden)');
    if (!currentScreenElement) return;
    
    const dots = currentScreenElement.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentDialogue);
    });
}

// ========================================
// SISTEMA DE IMAGENS
// ========================================
function updatePlayerCharacterImage() {
    // Atualizar imagens do personagem nas conversas
    const playerImages = document.querySelectorAll('#playerCharacterImage');
    if (playerImages.length > 0 && selectedCharacter) {
        playerImages.forEach(img => {
            img.src = characterImages[selectedCharacter] || characterImages['curioso'];
        });
    }
    
    // Atualizar cabeça do personagem na tela de escolha
    const playerCharacterHead = document.getElementById('playerCharacterHead');
    if (playerCharacterHead && selectedCharacter) {
        playerCharacterHead.src = characterHeadImages[selectedCharacter] || characterHeadImages['curioso'];
    }
}

// ========================================
// SISTEMA DE MENSAGENS
// ========================================
function showMessage(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    // Aqui você pode implementar um sistema de notificações visuais
}

// ========================================
// SISTEMA DE FINALIZAÇÃO
// ========================================
function finalizarAventura() {
    console.log('🏆 Finalizando aventura');
    showScreen('fim');
}

function reiniciarAventura() {
    console.log('🔄 Reiniciando aventura');
    
    // Resetar estado
    visitedCharacters = [];
    playerName = '';
    selectedCharacter = '';
    conversationCompleted = false;
    
    // Resetar formulário
    const nameInput = document.getElementById('playerName');
    if (nameInput) nameInput.value = '';
    
    // Resetar seleção de personagem
    document.querySelectorAll('.character-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Voltar para personalização
    showScreen('personalizacao');
    updateStartButton();
}

// ========================================
// FUNÇÕES AUXILIARES
// ========================================
function getCurrentCharacter() {
    const currentScreenElement = document.querySelector('.screen:not(.hidden)');
    if (!currentScreenElement) return '';
    
    const screenId = currentScreenElement.id;
    if (screenId.includes('Agricultor')) return 'agricultor';
    if (screenId.includes('Piloto')) return 'piloto';
    if (screenId.includes('Operador')) return 'operador';
    if (screenId.includes('Astronauta')) return 'astronauta';
    if (screenId.includes('historia')) return 'tio';
    
    return '';
}

// ========================================
// CONTROLE DE TECLADO
// ========================================
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'Enter':
            if (currentScreen === 'apresentacao') {
                iniciarAventura();
            }
            break;
        case 'Escape':
            if (currentScreen === 'escolhaPersonagem') {
                voltarHistoria();
            } else if (currentScreen.includes('conversando')) {
                voltarEscolha();
            }
            break;
    }
});

// ========================================
// EXPORTAÇÕES GLOBAIS
// ========================================
window.selectCharacter = selectCharacter;
window.iniciarAventura = iniciarAventura;
window.conversarComPersonagem = conversarComPersonagem;
window.voltarEscolha = voltarEscolha;
window.voltarHistoria = voltarHistoria;
window.nextDialogue = nextDialogue;
window.finalizarAventura = finalizarAventura;
window.reiniciarAventura = reiniciarAventura;

console.log('✅ Script carregado com sucesso');