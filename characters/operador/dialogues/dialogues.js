// Dialogues of The Operator (Nivaldo) - Portuguese
const operadorDialoguesPT = [
    {
        npc: false,
        text: "Uau! Quantos botões e cabos! Oi, moço! Você é o responsável por cuidar de toda essa energia?"
    },
    {
        npc: true,
        text: "Oi, %playerName%! Sou sim! Eu ajudo a manter a rede elétrica funcionando direitinho, pra que a luz chegue na casa de todo mundo"
    },
    {
        npc: false,
        text: "Que legal! E ouvi dizer que o Sol às vezes pode atrapalhar o seu trabalho. É verdade?"
    },
    {
        npc: true,
        text: "É verdade, sim. Quando o Sol solta muita energia numa tempestade solar, parte dela pode chegar aqui e bagunçar os fios e equipamentos que transmitem eletricidade. Em dias assim, a gente precisa ficar de olho para evitar apagões"
    },
    {
        type: "html",
        media: "characters/operador/assets/html/desafio.html",
        caption: "Desafio Operador"
    },
    {
        npc: false,
        text: "Nossa! Então até a energia da minha casa pode ser afetada pelas tempestades do Sol?"
    },
    {
        npc: true,
        text: "Pode, mas não precisa se preocupar. Os cientistas e nós, operadores, ficamos atentos para deixar tudo funcionando direitinho"
    },
    {
        npc: false,
        text: "Que bom! O Sol é mesmo poderoso… e cheio de truques!"
    },
    {
        npc: true,
        text: "Isso mesmo! E é por isso que é importante conhecer esses fenômenos, pra gente entender melhor como o Sol conversa com a Terra. Li esses dias que a NASA vai lançar mais um pacote de instrumentos meteorológicos espaciais, o HERMES. Legal demais!"   
    }
];

// Dialogues of The Operator (Nivaldo) - English
const operadorDialoguesEN = [
    {
        npc: false,
        text: "Wow! So many buttons and cables! Hi, sir! Are you responsible for taking care of all this energy?"
    },
    {
        npc: true,
        text: "Hi, kiddo! Yes I am! I help keep the electrical grid working properly, so that electricity reaches everyone's house"
    },
    {
        npc: false,
        text: "That's cool! And I heard that the Sun can sometimes interfere with your work. Is that true?"
    },
    {
        npc: true,
        text: "Yes, it's true. When the Sun releases a lot of energy in a solar storm, some of it can reach here and mess up the wires and equipment that transmit electricity. On days like that, we need to keep an eye out to avoid blackouts"
    },
    {
        type: "html",
        media: "characters/operador/assets/html/desafio.html",
        caption: "Operator Challenge"
    },
    {
        npc: false,
        text: "Wow! So even my house's electricity can be affected by the Sun's storms?"
    },
    {
        npc: true,
        text: "It can, but don't worry. Scientists and us operators stay alert to keep everything working properly"
    },
    {
        npc: false,
        text: "That's good! The Sun is really powerful... and full of tricks!"
    },
    {
        npc: true,
        text: "Oh yeah! And that's why it's important to know about these phenomena, so we can better understand how the Sun interact with Earth. I saw the other day that NASA’s getting ready to launch a new set of space weather instruments called HERMES. Pretty cool!"   
    }
];

// Export for global use
if (typeof window !== 'undefined') {
    window.operadorDialoguesPT = operadorDialoguesPT;
    window.operadorDialoguesEN = operadorDialoguesEN;
    // Keep backward compatibility
    window.operadorDialogues = operadorDialoguesEN;
}