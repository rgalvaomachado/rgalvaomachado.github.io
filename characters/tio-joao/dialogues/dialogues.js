// Diálogos do Tio João
const tioJoaoDialogues = [
    {
        npc: false,
        text: "Tio, você já viu aquele meme do Sol vomitando na Terra? Eu vejo ele toda hora e sempre dou muita risada!"
    },
    {
        npc: true,
        text: "Não sei se já vi, mostra pra mim"
    },
    {
        npc: false,
        text: "Aqui, olha"
    },
    {
        type: "image",
        media: "characters/tio-joao/assets/img/image.png",
        caption: "Meme do Sol 'vomitando' na Terra"
    },
    {
        npc: true,
        text: "KKKKK adorei! Mas você sabe realmente o que está acontecendo?"
    },
    {
        npc: false,
        text: "Humm... o Sol tá passando mal igual a tia Suzana na praia?"
    },
    {
        npc: true,
        text: "hahaha mais ou menos! Na verdade, esse “vômito” é uma brincadeira com um fenômeno real chamado tempestade solar. Às vezes, o Sol solta um monte de energia e partículas no espaço"
    },
    {
        npc: false,
        text: "E isso vai parar na Terra?"
    },
    {
        npc: true,
        text: "Às vezes sim! Quando essas partículas chegam aqui, elas se chocam com o ar lá no alto do céu, e isso faz as auroras, aquelas luzes coloridas lindas que aparecem perto dos polos"
    },
    {
        type: "html",
        media: "characters/tio-joao/assets/html/desafio.html",
        caption: "Desafio Tio João"
    },
    {
        npc: false,
        text: "Ahhhh, então o Sol não tá doente! Ele só tá fazendo arte no céu!"
    },
    {
        npc: true,
        text: "Exatamente! E essa “arte” é só uma parte de tudo que acontece por lá. Sabe, várias pessoas na Terra são influenciadas por esses eventos, desde cientistas que estudam o Sol, pilotos de avião e até astronautas no espaço"
    },
    {
        npc: false,
        text: "Uau, sério?"
    },
    {
        npc: true,
        text: "Sim! Que tal você ir conversar com algumas delas? Perguntar o que eles sabem sobre esses eventos solares, como isso afeta o dia a dia deles… você vai aprender um monte de coisas incríveis!"
    },
    {
        npc: false,
        text: "Nossa, seria muito legal! Quero descobrir tudo sobre como o Sol faz a sua “arte” lá no céu!"
    },
    {
        npc: true,
        text: "Então vai lá! E depois me conta tudo que você descobriu, combinado?"
    }
];

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.tioJoaoDialogues = tioJoaoDialogues;
}
