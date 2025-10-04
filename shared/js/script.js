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
let dialogueCache = {}; // Cache para armazenar diálogos carregados

// Função para carregar diálogos de arquivos JS
function loadDialogues(character) {
    // Verificar se já está no cache
    if (dialogueCache[character]) {
        return dialogueCache[character];
    }
    
    // Mapear personagens para suas variáveis globais
    const dialogueVariables = {
        'tio': window.tioJoaoDialogues,
        'agricultor': window.agricultorDialogues,
        'piloto': window.pilotoDialogues,
        'operador': window.operadorDialogues,
        'astronauta': window.astronautaDialogues
    };
    
    let dialogueData = dialogueVariables[character];
    
    if (!dialogueData) {
        dialogueData = getFallbackDialogues(character);
    }
    
    // Processar diálogos
    const processedDialogues = dialogueData.map(dialogue => {
        const processedDialogue = {
            ...dialogue,
            speaker: dialogue.npc ? characterNames[character] || 'Personagem' : (playerName || 'Jogador'),
            isPlayer: !dialogue.npc
        };
        
        // Só processar text se existir
        if (dialogue.text) {
            processedDialogue.text = dialogue.text
                .replace(/%playerName%/g, playerName || 'Jogador')
                .replace(/Lucas/g, playerName || 'Jogador');
        }
        
        return processedDialogue;
    });
    
    // Armazenar no cache
    dialogueCache[character] = processedDialogues;
    
    return processedDialogues;
}

// Diálogos de fallback caso não consiga carregar os arquivos
function getFallbackDialogues(character) {
    const fallbackDialogues = {
        'tio': [
            {
                npc: true,
                text: '💭 pensando...'
            }
        ],
        'agricultor': [
            {
                npc: true,
                text: '💭 pensando...'
            }
        ],
        'piloto': [
            {
                npc: true,
                text: '💭 pensando...'
            }
        ],
        'operador': [
            {
                npc: true,
                text: '💭 pensando...'
            }
        ],
        'astronauta': [
            {
                npc: true,
                text: '💭 pensando...'
            }
        ]
    };
    
    return fallbackDialogues[character] || fallbackDialogues['tio'];
}

// Mapeamento de nomes dos personagens
const characterNames = {
    'tio': 'Tio João',
    'agricultor': 'Rosa',
    'piloto': 'Carlos',
    'operador': 'Nivaldo',
    'astronauta': 'Lúcia'
};

// Mapeamento de imagens
const characterImages = {
    'curioso': 'shared/assets/bodies/pj1.png',
    'aventureiro': 'shared/assets/bodies/pj2.png',
    'explorador': 'shared/assets/bodies/pj3.png',
    'inventor': 'shared/assets/bodies/pj4.png'
};

const characterHeadImages = {
    'curioso': 'shared/assets/heads/pj1Head.png',
    'aventureiro': 'shared/assets/heads/pj2Head.png',
    'explorador': 'shared/assets/heads/pj3Head.png',
    'inventor': 'shared/assets/heads/pj4Head.png',
    'tio': 'characters/tio-joao/assets/head/tioJoaoHead.png',
    'agricultor': 'characters/agricultor/assets/head/agricultorHead.png',
    'piloto': 'characters/piloto/assets/head/pilotoHead.png',
    'operador': 'characters/operador/assets/head/operadorHead.png',
    'astronauta': 'characters/astronauta/assets/head/astronautaHead.png'
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
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
    }
}

// ========================================
// SISTEMA DE AVENTURA
// ========================================
function iniciarAventura() {
    // Verificar se o nome foi definido
    if (!playerName) {
        return;
    }
    
    // Resetar estado
    visitedCharacters = [];
    conversationCompleted = false;
    
    // Configurar diálogos do Tio João
    setupDialogueData('tio');
    
    // Mostrar tela de história
    showScreen('historia');
    
    // Iniciar diálogo após transição com delay maior
    setTimeout(() => {
        startCinematicDialogue();
    }, 800);
}

function conhecerAmigos() {
    
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
    
    // Resetar estado da conversa
    conversationCompleted = false;
    
    // Verificar se pode conversar
    if (!canTalkToCharacter(personagem)) {
            return;
    }
    
    // NÃO adicionar à lista de visitados ainda - só após clicar "Entendi!"
    
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
        
        // Iniciar diálogo após transição com delay maior para carregamento
        setTimeout(() => {
            startCinematicDialogue();
        }, 800);
    }
}

function voltarEscolha() {
    
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
            showMessage('Você precisa conhecer A Agricultora ou o Piloto primeiro!', 'warning');
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
        return;
    }
    
    // Limpar grid
    charactersGrid.innerHTML = '';
    
    // Definir personagens
    const characters = [
        { id: 'agricultor', name: 'Rosa', title: 'A Agricultora', icon: 'fas fa-seedling', emoji: '🌱', phase: 1, requirements: [] },
        { id: 'piloto', name: 'Carlos', title: 'O Piloto', icon: 'fas fa-plane', emoji: '✈️', phase: 1, requirements: [] },
        { id: 'operador', name: 'Nivaldo', title: 'O Operador', icon: 'fas fa-bolt', emoji: '⚡', phase: 2, requirements: ['agricultor', 'piloto'] },
        { id: 'astronauta', name: 'Lúcia', title: 'A Astronauta', icon: 'fas fa-rocket', emoji: '🚀', phase: 3, requirements: ['agricultor', 'piloto', 'operador'] }
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
        'agricultor': 'characters/agricultor/assets/head/agricultorHead.png',
        'piloto': 'characters/piloto/assets/head/pilotoHead.png',
        'operador': 'characters/operador/assets/head/operadorHead.png',
        'astronauta': 'characters/astronauta/assets/head/astronautaHead.png'
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
    
    try {
        const dialogueData = loadDialogues(personagem);
        currentDialogueData = dialogueData;
    } catch (error) {
        // Usar diálogos de fallback
        const fallbackData = getFallbackDialogues(personagem);
        currentDialogueData = fallbackData;
    }
}


function startCinematicDialogue() {
    if (currentDialogueData.length === 0) {
        return;
    }
    
    currentDialogue = 0;
    
    // Pequeno delay para garantir que a tela esteja carregada
    setTimeout(() => {
        showDialogue(currentDialogueData[currentDialogue]);
    
        // Configurar botão inicial
        const currentScreenElement = document.querySelector('.screen:not(.hidden)');
        const continueBtn = currentScreenElement ? currentScreenElement.querySelector('#continueBtn') : null;
    
    if (continueBtn) {
            if (currentDialogueData.length > 1) {
                // Há mais diálogos - mostrar flechinha
                continueBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
                continueBtn.onclick = nextDialogue;
        } else {
                    // Último diálogo - mostrar mãos dadas
                    continueBtn.innerHTML = '<i class="fas fa-handshake"></i> Entendi!';
                    continueBtn.onclick = endDialogue;
            }
        }
    }, 100);
}

function showMediaInDialogue(mediaDialogue, currentScreenElement) {
    const speakerName = currentScreenElement.querySelector('#speakerName');
    const speakerAvatar = currentScreenElement.querySelector('#speakerAvatar');
    const dialogueText = currentScreenElement.querySelector('#dialogueText');
    const dialogueBox = currentScreenElement.querySelector('.dialogue-box');
    
    // Esconder elementos de diálogo normal
    if (speakerName) speakerName.style.display = 'none';
    if (speakerAvatar) speakerAvatar.style.display = 'none';
    
    // Fazer a caixa de diálogo ocupar toda a tela
    if (dialogueBox) {
        dialogueBox.style.position = 'fixed';
        dialogueBox.style.top = '0';
        dialogueBox.style.left = '0';
        dialogueBox.style.width = '100vw';
        dialogueBox.style.height = '100vh';
        dialogueBox.style.zIndex = '1000';
        dialogueBox.style.background = 'rgba(0, 0, 0, 0.9)';
        dialogueBox.style.display = 'flex';
        dialogueBox.style.alignItems = 'center';
        dialogueBox.style.justifyContent = 'center';
        dialogueBox.style.flexDirection = 'column';
    }
    
    if (dialogueText) {
        dialogueText.innerHTML = '';
        dialogueText.style.width = '100%';
        dialogueText.style.height = '100%';
        dialogueText.style.display = 'flex';
        dialogueText.style.alignItems = 'center';
        dialogueText.style.justifyContent = 'center';
        dialogueText.style.flexDirection = 'column';
        
        let mediaElement;
        
        switch (mediaDialogue.type) {
            case 'image':
                mediaElement = document.createElement('img');
                mediaElement.src = mediaDialogue.media;
                mediaElement.alt = mediaDialogue.caption || 'Imagem';
                mediaElement.style.maxWidth = '90vw';
                mediaElement.style.maxHeight = '80vh';
                mediaElement.style.objectFit = 'contain';
                mediaElement.style.borderRadius = '12px';
                mediaElement.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                break;
                
            case 'video':
                mediaElement = document.createElement('video');
                mediaElement.src = mediaDialogue.media;
                mediaElement.controls = true;
                mediaElement.autoplay = false;
                mediaElement.muted = false; // Com som
                mediaElement.loop = true; // Loop contínuo
                mediaElement.style.maxWidth = '90vw';
                mediaElement.style.maxHeight = '80vh';
                mediaElement.style.borderRadius = '12px';
                mediaElement.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                
                // Esconder botão de continuar inicialmente
                const continueBtn = currentScreenElement.querySelector('#continueBtn');
                if (continueBtn) {
                    continueBtn.style.display = 'none';
                }
                
                // Adicionar evento para quando o vídeo carregar
                mediaElement.addEventListener('loadeddata', () => {
                    // Ativar o botão de continuar quando o vídeo carregar
                    if (continueBtn) {
                        continueBtn.style.display = 'block';
                        continueBtn.innerHTML = '<i class="fas fa-play"></i> Reproduzir Vídeo';
                        continueBtn.onclick = () => {
                            mediaElement.play();
                            continueBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
                            continueBtn.onclick = nextDialogue;
                        };
                    }
                });
                
                break;
                
            case 'html':
                mediaElement = document.createElement('iframe');
                mediaElement.src = mediaDialogue.media;
                mediaElement.style.width = '90vw';
                mediaElement.style.height = '80vh';
                mediaElement.style.border = 'none';
                mediaElement.style.borderRadius = '12px';
                mediaElement.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
                break;
        }
        
        if (mediaElement) {
            dialogueText.appendChild(mediaElement);
            
            if (mediaDialogue.caption) {
                const caption = document.createElement('p');
                caption.textContent = mediaDialogue.caption;
                caption.style.textAlign = 'center';
                caption.style.marginTop = '20px';
                caption.style.fontStyle = 'italic';
                caption.style.color = '#fff';
                caption.style.fontSize = '18px';
                caption.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.8)';
                dialogueText.appendChild(caption);
            }
        }
    }
}

function restoreDialogueElements(currentScreenElement) {
    const speakerName = currentScreenElement.querySelector('#speakerName');
    const speakerAvatar = currentScreenElement.querySelector('#speakerAvatar');
    const dialogueBox = currentScreenElement.querySelector('.dialogue-box');
    const dialogueText = currentScreenElement.querySelector('#dialogueText');
    
    if (speakerName) speakerName.style.display = 'block';
    if (speakerAvatar) speakerAvatar.style.display = 'block';
    
    // Restaurar caixa de diálogo ao tamanho normal
    if (dialogueBox) {
        dialogueBox.style.position = '';
        dialogueBox.style.top = '';
        dialogueBox.style.left = '';
        dialogueBox.style.width = '';
        dialogueBox.style.height = '';
        dialogueBox.style.zIndex = '';
        dialogueBox.style.background = '';
        dialogueBox.style.display = '';
        dialogueBox.style.alignItems = '';
        dialogueBox.style.justifyContent = '';
        dialogueBox.style.flexDirection = '';
    }
    
    if (dialogueText) {
        dialogueText.style.width = '';
        dialogueText.style.height = '';
        dialogueText.style.display = '';
        dialogueText.style.alignItems = '';
        dialogueText.style.justifyContent = '';
        dialogueText.style.flexDirection = '';
    }
}

function showDialogue(dialogue) {
    const currentScreenElement = document.querySelector('.screen:not(.hidden)');
    if (!currentScreenElement) {
        return;
    }
    
    if (!dialogue) {
        return;
    }
    
    // Verificar se é mídia (imagem, vídeo, HTML)
    if ((dialogue.type === 'image' || dialogue.type === 'video' || dialogue.type === 'html') && dialogue.media) {
        showMediaInDialogue(dialogue, currentScreenElement);
        return;
    }
    
    // Restaurar elementos de diálogo normal
    restoreDialogueElements(currentScreenElement);
    
    const speakerName = currentScreenElement.querySelector('#speakerName');
    const speakerAvatar = currentScreenElement.querySelector('#speakerAvatar');
    const dialogueText = currentScreenElement.querySelector('#dialogueText');
    
    // Atualizar nome do falante
    if (speakerName) {
        speakerName.textContent = dialogue.speaker;
    }
    
    // Atualizar avatar
    if (speakerAvatar) {
        speakerAvatar.innerHTML = '';
        
        let headImageSrc = '';
        if (dialogue.isPlayer && selectedCharacter) {
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
    
    // Mostrar texto diretamente sem efeitos complexos
    if (dialogueText) {
        dialogueText.textContent = dialogue.text;
        dialogueText.style.opacity = '1';
        dialogueText.style.transition = 'none';
    }
    
    updateCharacterSpotlight(dialogue.isPlayer);
}

function typeText(element, text) {
    // Simplificar: mostrar texto diretamente
    isTyping = false;
}

function nextDialogue() {
    
    currentDialogue++;
    
    if (currentDialogue < currentDialogueData.length) {
        // Ainda há mais diálogos - mostrar flechinha
        const currentScreenElement = document.querySelector('.screen:not(.hidden)');
        const continueBtn = currentScreenElement ? currentScreenElement.querySelector('#continueBtn') : null;
        
        if (continueBtn) {
            continueBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
            continueBtn.onclick = nextDialogue;
        }
        
        // Pequeno delay para transição suave
        setTimeout(() => {
        showDialogue(currentDialogueData[currentDialogue]);
        }, 50);
    } else {
        // Fim da conversa - mostrar mãos dadas
        endDialogue();
    }
}

function endDialogue() {
    const currentScreenElement = document.querySelector('.screen:not(.hidden)');
    const continueBtn = currentScreenElement ? currentScreenElement.querySelector('#continueBtn') : null;
    
    if (continueBtn) {
        if (currentScreenElement.id === 'conversandoAstronauta') {
            // Astronauta - finalizar aventura
            continueBtn.innerHTML = '<i class="fas fa-star"></i> Finalizar Aventura!';
            continueBtn.onclick = finalizarAventura;
        } else if (currentScreenElement.id === 'historia') {
            // Tio João - transição automática
            setTimeout(() => {
                conhecerAmigos();
            }, 1000);
        } else {
            // Outros personagens - mãos dadas para entender
            continueBtn.innerHTML = '<i class="fas fa-handshake"></i> Entendi!';
            continueBtn.onclick = function() {
                // Adicionar personagem à lista de visitados APENAS quando clicar em "Entendi!"
                const currentPersonagem = getCurrentPersonagem();
                if (currentPersonagem && !visitedCharacters.includes(currentPersonagem)) {
                    visitedCharacters.push(currentPersonagem);
                }
                
                // Marcar conversa como completada
                conversationCompleted = true;
                voltarEscolha();
            };
        }
    }
    
    updateCharacterSpotlight();
}

function updateCharacterSpotlight(isPlayer) {
    const currentScreenElement = document.querySelector('.screen:not(.hidden)');
    if (!currentScreenElement) return;
    
    const lucasSpotlight = currentScreenElement.querySelector('.lucas-spotlight');
    const npcSpotlight = currentScreenElement.querySelector('.npc-spotlight');
    
    if (lucasSpotlight && npcSpotlight) {
        if (isPlayer) {
            lucasSpotlight.classList.add('active');
            npcSpotlight.classList.remove('active');
        } else {
            lucasSpotlight.classList.remove('active');
            npcSpotlight.classList.add('active');
        }
    }
}

// Função removida - bolinhas de progresso não são mais usadas

// ========================================
// SISTEMA DE IDENTIFICAÇÃO DE PERSONAGENS
// ========================================
function getCurrentPersonagem() {
    const currentScreenElement = document.querySelector('.screen:not(.hidden)');
    if (!currentScreenElement) return null;
    
    const screenId = currentScreenElement.id;
    
    // Mapear IDs das telas para nomes dos personagens
    const screenToPersonagem = {
        'conversandoAgricultor': 'agricultor',
        'conversandoPiloto': 'piloto',
        'conversandoOperador': 'operador',
        'conversandoAstronauta': 'astronauta'
    };
    
    return screenToPersonagem[screenId] || null;
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
    // Aqui você pode implementar um sistema de notificações visuais
}

// ========================================
// SISTEMA DE FINALIZAÇÃO
// ========================================
function finalizarAventura() {
    showScreen('fim');
}

function reiniciarAventura() {
    
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
