// Dialogues of The Farmer (Rosa) - Portuguese
const agricultorDialoguesPT = [
    {
        npc: false,
        text: "Oi, Rosa! Tudo bem? Ouvi dizer que o Sol anda fazendo umas travessuras lá no céu e que isso pode afetar o seu trabalho"
    },
    {
        npc: true,
        text: "Oi %playerName%! Pois é, alguns eventos solares confundem os sinais do GPS dos meus tratores. Quando isso acontece, fico perdida no meio do campo e preciso ajustar tudo manualmente"
    },
    {
        type: "html",
        media: "characters/agricultor/assets/html/desafio.html",
        caption: "Desafio Agricultura"
    },
    {
        npc: false,
        text: "Uau, então aquelas luzes bonitas no céu podem bagunçar o seu trabalho aqui embaixo?"
    },
    {
        npc: true,
        text: "Na verdade, além da projeção de luzes, em uma tempestade solar o Sol também solta uma espécie de 'bola de gás quente' chamada Ejeção de Massa Coronal, ou EMC. É como se o Sol jogasse para o espaço um monte de gás brilhante cheio de energia!"
    },
    {
        npc: false,
        text: "Que interessante! E como você descobre quando uma tempestade solar vai chegar?"
    },
    {
        npc: true,
        text: "Ah, a gente acompanha notícias e alertas de cientistas da NASA. Eles avisam quando vem uma grande ejeção de massa coronal, aí já preparo tudo antes de ligar os tratores"
    },
    {
        npc: false,
        text: "Nossa, é incrível como o Sol pode influenciar tanta coisa na Terra! Obrigado por me contar, Rosa!"
       }
];

// Dialogues of The Farmer (Rosa) - English
const agricultorDialoguesEN = [
    {
        npc: false,
        text: "Hi, Rosa! How are you? I heard the Sun is causing some trouble up in the sky and this might affect your work"
    },
    {
        npc: true,
        text: "Hi %playerName%! Yes, some solar events confuse the GPS signals of my tractors. When this happens, I get lost in the middle of the field and need to adjust everything manually"
    },
    {
        type: "html",
        media: "characters/agricultor/assets/html/desafio.html",
        caption: "Agriculture Challenge"
    },
    {
        npc: false,
        text: "Wow, so those beautiful lights in the sky can mess up your work down here?"
    },
    {
        npc: true,
        text: "Actually, besides the light projection, during a solar storm the Sun also releases a kind of 'hot gas ball' called Coronal Mass Ejection, or CME. It's like the Sun is throwing a bunch of bright energy-filled gas into space!"
    },
    {
        npc: false,
        text: "How interesting! And how do you find out when a solar storm is coming?"
    },
    {
        npc: true,
        text: "Oh, we follow news and alerts from NASA scientists. They warn us when a big coronal mass ejection is coming, so I prepare everything before turning on the tractors"
    },
    {
        npc: false,
        text: "Wow, it's incredible how the Sun can influence so many things on Earth! Thanks for telling me, Rosa!"
       }
];

// Export for global use
if (typeof window !== 'undefined') {
    window.agricultorDialoguesPT = agricultorDialoguesPT;
    window.agricultorDialoguesEN = agricultorDialoguesEN;
    // Keep backward compatibility
    window.agricultorDialogues = agricultorDialoguesEN;
}