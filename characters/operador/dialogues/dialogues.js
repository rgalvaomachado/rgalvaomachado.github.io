// Diálogos do Operador (Nivaldo)
const operadorDialogues = [
    {
        npc: false,
        text: "Uau! Quantos botões e cabos! Oi, moço! Você é o responsável por cuidar de toda essa energia?"
    },
    {
        npc: true,
        text: "Oi, garotão! Sou sim! Eu ajudo a manter a rede elétrica funcionando direitinho, pra que a luz chegue na casa de todo mundo"
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

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.operadorDialogues = operadorDialogues;
}