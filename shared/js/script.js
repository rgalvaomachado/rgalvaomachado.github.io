// ========================================
// CHILDREN'S GAME: DISCOVERING THE SUN
// Interactive Adventure System
// ========================================

// ========================================
// GLOBAL VARIABLES
// ========================================
let currentScreen = 'personalizacao';
let visitedCharacters = [];
let playerName = '';
let selectedCharacter = '';
let conversationCompleted = false;
let currentLanguage = 'en'; // Default language

// ========================================
// LANGUAGE SYSTEM
// ========================================
const translations = {
    pt: {
        // Main page
        gameTitle: "🌟 Descobrindo o Sol 🌟",
        gameSubtitle: "Vamos criar sua aventura solar!",
        nameQuestion: "Qual é o seu nome?",
        namePlaceholder: "Digite seu nome aqui...",
        characterQuestion: "Escolha seu personagem:",
        startAdventure: "Iniciar Aventura!",
        chooseNameAndCharacter: "Escolha seu nome e personagem",
        
        // Character selection
        chooseFriend: "Escolha um amigo para conhecer!",
        friendDescription: "Clique em um dos amigos do tio João para descobrir como eles usam o sol! 🌟",
        backButton: "Voltar",
        
        // Transition
        transitionTitle: "Conhecendo os Amigos...",
        transitionSubtitle: "Preparando as conversas incríveis!",
        
        // Final screen
        congratulations: "Parabéns!",
        completedAdventure: "Você completou a aventura solar!",
        friendsTitle: "Seus Amigos Conhecidos:",
        playAgain: "Jogar Novamente!",
        
        // Character names
        uncleJoao: "Tio João",
        rosa: "Rosa",
        carlos: "Carlos",
        nivaldo: "Nivaldo",
        lucia: "Lúcia",
        
        // Character titles
        theFarmer: "A Agricultora",
        thePilot: "O Piloto",
        theOperator: "O Operador",
        theAstronaut: "A Astronauta",
        
        // Messages
        needToMeetFarmerOrPilot: "Você precisa conhecer A Agricultora ou o Piloto primeiro!",
        needToMeetAllFriends: "Você precisa conhecer todos os outros amigos primeiro!",
        gotIt: "Entendi!",
        finishAdventure: "Finalizar Aventura!",
        playVideo: "Reproduzir Vídeo",
        thinking: "💭 pensando...",
        
        // Button states
        startButtonText: "Começar Aventura!",
        chooseNameText: "Escolha seu nome e personagem"
    },
    en: {
        // Main page
        gameTitle: "🌟 Discovering the Sun 🌟",
        gameSubtitle: "Let's create your solar adventure!",
        nameQuestion: "What's your name?",
        namePlaceholder: "Type your name here...",
        characterQuestion: "Choose your character:",
        startAdventure: "Start Adventure!",
        chooseNameAndCharacter: "Choose your name and character",
        
        // Character selection
        chooseFriend: "Choose a friend to meet!",
        friendDescription: "Click on one of Uncle João's friends to discover how they deal with space weather! 🌟",
        backButton: "Back",
        
        // Transition
        transitionTitle: "Meeting the Friends...",
        transitionSubtitle: "Preparing the amazing conversations!",
        
        // Final screen
        congratulations: "Congratulations!",
        completedAdventure: "You completed the solar adventure!",
        friendsTitle: "Your Friends Met:",
        playAgain: "Play Again!",
        
        // Character names
        uncleJoao: "Uncle João",
        rosa: "Rosa",
        carlos: "Carlos",
        nivaldo: "Nivaldo",
        lucia: "Lúcia",
        
        // Character titles
        theFarmer: "The Farmer",
        thePilot: "The Pilot",
        theOperator: "The Operator",
        theAstronaut: "The Astronaut",
        
        // Messages
        needToMeetFarmerOrPilot: "You need to meet The Farmer or The Pilot first!",
        needToMeetAllFriends: "You need to meet all the other friends first!",
        gotIt: "Take care!",
        finishAdventure: "Finish Adventure!",
        playVideo: "Play Video",
        thinking: "💭 thinking...",
        
        // Button states
        startButtonText: "Start Adventure!",
        chooseNameText: "Choose your name and character"
    }
};

// Language management functions
function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('gameLanguage', lang);
    updateLanguageUI();
    updateAllTexts();
}

function updateLanguageUI() {
    const langPt = document.getElementById('langPt');
    const langEn = document.getElementById('langEn');
    
    if (langPt && langEn) {
        langPt.classList.toggle('active', currentLanguage === 'pt');
        langEn.classList.toggle('active', currentLanguage === 'en');
    }
}

function updateAllTexts() {
    const t = translations[currentLanguage];
    
    // Clear dialogue cache when language changes
    dialogueCache = {};
    
    // Update main page elements
    updateElement('gameTitle', t.gameTitle);
    updateElement('gameSubtitle', t.gameSubtitle);
    updateElement('nameQuestion', t.nameQuestion);
    updateElement('characterQuestion', t.characterQuestion);
    updateElement('chooseFriendText', t.chooseFriend);
    updateElement('friendDescription', t.friendDescription);
    updateElement('backButtonText', t.backButton);
    updateElement('transitionTitle', t.transitionTitle);
    updateElement('transitionSubtitle', t.transitionSubtitle);
    updateElement('congratulationsTitle', t.congratulations);
    updateElement('congratulationsSubtitle', t.completedAdventure);
    updateElement('friendsTitle', t.friendsTitle);
    updateElement('playAgainText', t.playAgain);
    
    // Update input placeholder
    const nameInput = document.getElementById('playerName');
    if (nameInput) {
        nameInput.placeholder = t.namePlaceholder;
    }
    
    // Update character names in characterNames object
    characterNames.tio = t.uncleJoao;
    characterNames.agricultor = t.rosa;
    characterNames.piloto = t.carlos;
    characterNames.operador = t.nivaldo;
    characterNames.astronauta = t.lucia;
    
    // Update start button
    updateStartButton();
}

function updateElement(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

// Load saved language preference
function loadLanguagePreference() {
    const savedLang = localStorage.getItem('gameLanguage');
    if (savedLang && (savedLang === 'pt' || savedLang === 'en')) {
        currentLanguage = savedLang;
    }
    updateLanguageUI();
    updateAllTexts();
}

// Dialogue system
let currentDialogue = 0;
let currentDialogueData = [];
let isTyping = false;
let dialogueCache = {}; // Cache to store loaded dialogues

// Function to load dialogues from JS files
function loadDialogues(character) {
    // Check if already in cache
    if (dialogueCache[character]) {
        return dialogueCache[character];
    }
    
    // Map characters to their language-specific global variables
    const dialogueVariables = {
        'tio': currentLanguage === 'pt' ? window.tioJoaoDialoguesPT : window.tioJoaoDialoguesEN,
        'agricultor': currentLanguage === 'pt' ? window.agricultorDialoguesPT : window.agricultorDialoguesEN,
        'piloto': currentLanguage === 'pt' ? window.pilotoDialoguesPT : window.pilotoDialoguesEN,
        'operador': currentLanguage === 'pt' ? window.operadorDialoguesPT : window.operadorDialoguesEN,
        'astronauta': currentLanguage === 'pt' ? window.astronautaDialoguesPT : window.astronautaDialoguesEN
    };
    
    let dialogueData = dialogueVariables[character];
    
    
    if (!dialogueData) {
        dialogueData = getFallbackDialogues(character);
    }
    
    // Process dialogues
    const processedDialogues = dialogueData.map(dialogue => {
        const processedDialogue = {
            ...dialogue,
            speaker: dialogue.npc ? characterNames[character] || 'Character' : (playerName || 'Player'),
            isPlayer: !dialogue.npc
        };
        
        // Only process text if it exists
        if (dialogue.text) {
            processedDialogue.text = dialogue.text
                .replace(/%playerName%/g, playerName || 'Player')
                .replace(/Lucas/g, playerName || 'Player');
        }
        
        return processedDialogue;
    });
    
    // Store in cache
    dialogueCache[character] = processedDialogues;
    
    return processedDialogues;
}

// Fallback dialogues in case files can't be loaded
function getFallbackDialogues(character) {
    const fallbackDialogues = {
        'tio': [
            {
                npc: true,
                text: translations[currentLanguage].thinking
            }
        ],
        'agricultor': [
            {
                npc: true,
                text: translations[currentLanguage].thinking
            }
        ],
        'piloto': [
            {
                npc: true,
                text: translations[currentLanguage].thinking
            }
        ],
        'operador': [
            {
                npc: true,
                text: translations[currentLanguage].thinking
            }
        ],
        'astronauta': [
            {
                npc: true,
                text: translations[currentLanguage].thinking
            }
        ]
    };
    
    return fallbackDialogues[character] || fallbackDialogues['tio'];
}

// Character names mapping
const characterNames = {
    'tio': 'Uncle João',
    'agricultor': 'Rosa',
    'piloto': 'Carlos',
    'operador': 'Nivaldo',
    'astronauta': 'Lúcia'
};

// Image mapping
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
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});
    
function initializeGame() {
    // Load language preference first
    loadLanguagePreference();
    
    // Hide all screens except personalization
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.toggle('hidden', screen.id !== 'personalizacao');
    });
    
    // Setup events
    setupPersonalizationEvents();
}

// ========================================
// PERSONALIZATION SYSTEM
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
    
    const t = translations[currentLanguage];
    if (isValid) {
        startBtn.innerHTML = `<i class="fas fa-play"></i> <span id="startButtonText">${t.startButtonText}</span>`;
    } else {
        startBtn.innerHTML = `<i class="fas fa-play"></i> <span id="startButtonText">${t.chooseNameText}</span>`;
    }
}

// ========================================
// NAVIGATION SYSTEM
// ========================================
function showScreen(screenId) {
    
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    
    // Show current screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('hidden');
        currentScreen = screenId;
    } else {
    }
}

// ========================================
// ADVENTURE SYSTEM
// ========================================
function iniciarAventura() {
    // Check if name was defined
    if (!playerName) {
        return;
    }
    
    // Reset state
    visitedCharacters = [];
    conversationCompleted = false;
    
    // Setup Uncle João's dialogues
    setupDialogueData('tio');
    
    // Show story screen
    showScreen('historia');
    
    // Start dialogue after transition with longer delay
    setTimeout(() => {
        startCinematicDialogue();
    }, 800);
}

function conhecerAmigos() {
    
    // Show transition screen
    showScreen('transicao');
    
    // Load NPCs in background
    setTimeout(() => {
        updateCharacterCards();
    showScreen('escolhaPersonagem');
    }, 2000); // 2 seconds transition
}

// ========================================
// CONVERSATION SYSTEM
// ========================================
function conversarComPersonagem(personagem) {
    
    // Reset conversation state
    conversationCompleted = false;
    
    // Check if can talk
    if (!canTalkToCharacter(personagem)) {
            return;
    }
    
    // DON'T add to visited list yet - only after clicking "Take care!"
    
    // Setup dialogues
    setupDialogueData(personagem);
    updatePlayerCharacterImage();
    
    // Show conversation screen
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
        
        // Start dialogue after transition with longer delay for loading
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
            const t = translations[currentLanguage];
            showMessage(t.needToMeetFarmerOrPilot, 'warning');
            return false;
        }
        return true;
    }
    
    // Fase 3: Astronauta - precisa conhecer todos os outros
    if (personagem === 'astronauta') {
        const requiredCharacters = ['agricultor', 'piloto', 'operador'];
        const hasTalkedToAll = requiredCharacters.every(char => visitedCharacters.includes(char));
        
        if (!hasTalkedToAll) {
            const t = translations[currentLanguage];
            showMessage(t.needToMeetAllFriends, 'warning');
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
    
    // Define characters
    const t = translations[currentLanguage];
    const characters = [
        { id: 'agricultor', name: t.rosa, title: t.theFarmer, icon: 'fas fa-seedling', emoji: '🌱', phase: 1, requirements: [] },
        { id: 'piloto', name: t.carlos, title: t.thePilot, icon: 'fas fa-plane', emoji: '✈️', phase: 1, requirements: [] },
        { id: 'operador', name: t.nivaldo, title: t.theOperator, icon: 'fas fa-bolt', emoji: '⚡', phase: 2, requirements: ['agricultor', 'piloto'] },
        { id: 'astronauta', name: t.lucia, title: t.theAstronaut, icon: 'fas fa-rocket', emoji: '🚀', phase: 3, requirements: ['agricultor', 'piloto', 'operador'] }
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
                // There are more dialogues - show arrow
                continueBtn.innerHTML = '<i class="fas fa-arrow-right"></i>';
                continueBtn.onclick = nextDialogue;
        } else {
            // Last dialogue - show handshake
            const t = translations[currentLanguage];
            continueBtn.innerHTML = `<i class="fas fa-handshake"></i> ${t.gotIt}`;
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
                        const t = translations[currentLanguage];
                        continueBtn.innerHTML = `<i class="fas fa-play"></i> ${t.playVideo}`;
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
                // Use language-specific HTML file
                let htmlSrc = mediaDialogue.media;
                if (currentLanguage === 'en' && htmlSrc.includes('desafio.html')) {
                    htmlSrc = htmlSrc.replace('desafio.html', 'desafio_en.html');
                }
                mediaElement.src = htmlSrc;
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
        // There are still more dialogues - show arrow
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
        // End of conversation - show handshake
        endDialogue();
    }
}

function endDialogue() {
    const currentScreenElement = document.querySelector('.screen:not(.hidden)');
    const continueBtn = currentScreenElement ? currentScreenElement.querySelector('#continueBtn') : null;
    
    if (continueBtn) {
        const t = translations[currentLanguage];
        if (currentScreenElement.id === 'conversandoAstronauta') {
            // Astronaut - finish adventure
            continueBtn.innerHTML = `<i class="fas fa-star"></i> ${t.finishAdventure}`;
            continueBtn.onclick = finalizarAventura;
        } else if (currentScreenElement.id === 'historia') {
            // Uncle João - automatic transition
            setTimeout(() => {
                conhecerAmigos();
            }, 1000);
        } else {
            // Other characters - handshake to understand
            continueBtn.innerHTML = `<i class="fas fa-handshake"></i> ${t.gotIt}`;
            continueBtn.onclick = function() {
                // Add character to visited list ONLY when clicking "Take care!"
                const currentPersonagem = getCurrentPersonagem();
                if (currentPersonagem && !visitedCharacters.includes(currentPersonagem)) {
                    visitedCharacters.push(currentPersonagem);
                }
                
                // Mark conversation as completed
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
// GLOBAL EXPORTS
// ========================================
window.selectCharacter = selectCharacter;
window.iniciarAventura = iniciarAventura;
window.conversarComPersonagem = conversarComPersonagem;
window.voltarEscolha = voltarEscolha;
window.voltarHistoria = voltarHistoria;
window.nextDialogue = nextDialogue;
window.finalizarAventura = finalizarAventura;
window.reiniciarAventura = reiniciarAventura;
window.setLanguage = setLanguage;
