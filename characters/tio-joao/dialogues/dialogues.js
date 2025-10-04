// Dialogues of Uncle João - Portuguese
const tioJoaoDialoguesPT = [
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
        text: "hahaha mais ou menos! Na verdade, esse 'vômito' é uma brincadeira com um fenômeno real chamado tempestade solar. Às vezes, o Sol solta um monte de energia e partículas no espaço"
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
        text: "Exatamente! E essa 'arte' é só uma parte de tudo que acontece por lá. Sabe, várias pessoas na Terra são influenciadas por esses eventos, desde cientistas que estudam o Sol, pilotos de avião e até astronautas no espaço"
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
        text: "Nossa, seria muito legal! Quero descobrir tudo sobre como o Sol faz a sua 'arte' lá no céu!"
    },
    {
        npc: true,
        text: "Então vai lá! E depois me conta tudo que você descobriu, combinado?"
    }
];

// Dialogues of Uncle João - English
const tioJoaoDialoguesEN = [
    {
        npc: false,
        text: "Uncle, have you seen that meme of the Sun vomiting on Earth? I see it all the time and always laugh a lot!"
    },
    {
        npc: true,
        text: "I don't know if I've seen it, show me"
    },
    {
        npc: false,
        text: "Here, look"
    },
    {
        type: "image",
        media: "characters/tio-joao/assets/img/image.png",
        caption: "Meme of the Sun 'vomiting' on Earth"
    },
    {
        npc: true,
        text: "HAHAHA I loved it! But do you really know what's happening?"
    },
    {
        npc: false,
        text: "Hmm... is the Sun feeling sick like Aunt Suzana at the beach?"
    },
    {
        npc: true,
        text: "hahaha more or less! Actually, this 'vomit' is a joke about a real phenomenon called solar storm. Sometimes, the Sun releases a lot of energy and particles into space"
    },
    {
        npc: false,
        text: "And does that reach Earth?"
    },
    {
        npc: true,
        text: "Sometimes yes! When these particles get here, they collide with the air up high in the sky, and that creates auroras, those beautiful colored lights that appear near the poles"
    },
    {
        type: "html",
        media: "characters/tio-joao/assets/html/desafio.html",
        caption: "Uncle João Challenge"
    },
    {
        npc: false,
        text: "Ahhhh, so the Sun isn't sick! It's just making art in the sky!"
    },
    {
        npc: true,
        text: "Exactly! And this 'art' is just one part of everything that happens up there. You know, many people on Earth are influenced by these events, from scientists who study the Sun, airplane pilots and even astronauts in space"
    },
    {
        npc: false,
        text: "Wow, really?"
    },
    {
        npc: true,
        text: "Yes! How about you go talk to some of them? Ask what they know about these solar events, how it affects their daily lives... you'll learn a lot of incredible things!"
    },
    {
        npc: false,
        text: "Wow, that would be really cool! I want to discover everything about how the Sun makes its 'art' up in the sky!"
    },
    {
        npc: true,
        text: "Then go ahead! And then tell me everything you discovered, deal?"
    }
];

// Export for global use
if (typeof window !== 'undefined') {
    window.tioJoaoDialoguesPT = tioJoaoDialoguesPT;
    window.tioJoaoDialoguesEN = tioJoaoDialoguesEN;
    // Keep backward compatibility
    window.tioJoaoDialogues = tioJoaoDialoguesEN;
}
