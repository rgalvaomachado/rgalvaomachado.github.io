// Dialogues of The Pilot (Carlos) - Portuguese
const pilotoDialoguesPT = [
    {
        npc: false,
        text: "Oi, Carlos! Soube que o Sol às vezes prega peças até nos aviões. É verdade?"
    },
    {
        npc: true,
        text: "Oi %playerName%! Quando o Sol faz uma grande erupção solar, uma grande explosão de luz, calor e partículas saem voando. Essas partículas carregadas podem atrapalhar os sistemas de comunicação e navegação dos aviões. Às vezes, temos que mudar a rota ou usar rádios alternativos para manter tudo seguro"
    },
    {
        type: "html",
        media: "characters/piloto/assets/html/desafio.html",
        caption: "Desafio Piloto"
    },
    {
        npc: false,
        text: "Uau! Então a atividade solar pode bagunçar o caminho do avião lá no alto?"
    },
    {
        npc: true,
        text: "Exatamente! É incrível pensar que um planeta a 150 milhões de quilômetros de distância pode influenciar nossa vida. É por isso que a NASA continua investindo na pesquisa sobre o clima espacial"
    },
    {
        npc: false,
        text: "Mas o que é o clima espacial exatamente?"  
    },
    {
       npc: true,
        text: "O clima espacial é o campo da ciência que estuda como as atividades e explosões no Sol afetam o ambiente espacial da Terra e de outros planetas"
    },
    {
        npc: false,
        text: "Que legal, será que mais alguém sofre com os impactos do  clima espacial aqui na Terra?"
    }
       
];

// Dialogues of The Pilot (Carlos) - English
const pilotoDialoguesEN = [
    {
        npc: false,
        text: "Hi, Carlos! I heard that the Sun sometimes plays tricks even on airplanes. Is that true?"
    },
    {
        npc: true,
        text: "Hi %playerName%! When the Sun has a big solar eruption, a big explosion of light, heat and particles that go flying. These charged particles can interfere with airplane communication and navigation systems. Sometimes, we have to change routes or use alternative radios to keep everything safe"
    },
    {
        type: "html",
        media: "characters/piloto/assets/html/desafio.html",
        caption: "Pilot Challenge"
    },
    {
        npc: false,
        text: "Wow! So solar activity can mess up the airplane's path up there?"
    },
    {
        npc: true,
        text: "Exactly! It's incredible to think that a planet 150 million kilometers away can influence our lives. That's why NASA continues investing in space weather research"
    },
    {
        npc: false,
        text: "But what is space weather exactly?"  
    },
    {
       npc: true,
        text: "Space weather is the field of science that studies how activities and explosions on the Sun affect the space environment of Earth and other planets"
    },
    {
        npc: false,
        text: "That's cool, I wonder if anyone else suffers from the impacts of space weather here on Earth?"
    }
       
];

// Export for global use
if (typeof window !== 'undefined') {
    window.pilotoDialoguesPT = pilotoDialoguesPT;
    window.pilotoDialoguesEN = pilotoDialoguesEN;
    // Keep backward compatibility
    window.pilotoDialogues = pilotoDialoguesEN;
}
