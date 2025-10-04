// Dialogues of The Astronaut (Lúcia) - Portuguese
const astronautaDialoguesPT = [
    {
        type: "html",
        media: "characters/astronauta/assets/html/desafio.html",
        caption: "Desafio Astronauta"
    },
    {
        npc: false,
        text: "Uaaau! Que vista incrível! Lá está a Terra… e olha só o Sol brilhando de pertinho!"
    },
    {
        npc: false,
        text: "Oi! Você é uma astronauta?"
    },
    {
        npc: true,
        text: "Oi, sou sim, meu nome é Lúcia! Você chegou bem na hora, o Sol está bem animado hoje!"
    },
    {
        npc: false,
        text: "Animado? Como assim?"
    },
    {
        npc: true,
        text: "O Sol passa por um ciclo, como se tivesse 'humores'. Às vezes ele fica mais calmo, e às vezes fica mais agitado, soltando muita energia e partículas pelo espaço. Chamamos isso de ciclo de atividade solar, que dura em média 11 anos"
    },
    {
        npc: false,
        text: "E o que são essas partículas que ele solta?"
    },
    {
        npc: true,
        text: "São pedacinhos muito, muito pequenos, como minúsculas bolinhas de energia! A gente chama de eventos de partículas solares. Quando o Sol fica agitado, ele lança um monte dessas partículas, e elas viajam bem rápido pelo espaço"
    },
    {
        npc: false,
        text: "Uau! E vocês aqui em cima sentem isso?"
    },
    {
        npc: true,
        text: "Sentimos sim! Por isso usamos trajes e naves com proteção especial. Essas partículas podem ser perigosas, então precisamos ficar de olho nos alertas dos cientistas"   
    },
    {
        npc: false,
        text: "Olha só! Dá pra ver o Sol soltando umas faíscas lá!"
    },
    {
        type: "video",
        media: "characters/astronauta/assets/video/play.mp4",
        caption: "Olhando para o Sol"
    },
    {
        npc: true,
        text: "Isso são erupções solares e ejeções de massa coronal. É o Sol trabalhando, brilhando e mandando energia para o espaço. Ele parece calmo, mas está sempre em movimento, girando e soltando energia"
    },
    {
        npc: false,
        text: "Que incrível! O Sol é mesmo cheio de atitude!"
    },
    {
        npc: true,
        text: "É sim! Ele é como o coração do nosso sistema solar, dá luz, calor e energia para todos os planetas. Mas, às vezes, ele se empolga um pouquinho!"
    },
    {
        npc: false,
        text: "Hahaha! Então o Sol é animado mesmo!"
    },
    {
        npc: true,
        text: "É! E agora que você já conheceu tanta gente que sente a influência dele, que tal voltar para Terra e contar o que aprendeu?"
    }
];

// Dialogues of The Astronaut (Lúcia) - English
const astronautaDialoguesEN = [
    {
        type: "html",
        media: "characters/astronauta/assets/html/desafio.html",
        caption: "Astronaut Challenge"
    },
    {
        npc: false,
        text: "Wooow! What an incredible view! There's Earth... and look at the Sun shining so close!"
    },
    {
        npc: false,
        text: "Hi! Are you an astronaut?"
    },
    {
        npc: true,
        text: "Hi, yes I am, my name is Lúcia! You arrived just in time, the Sun is very active today!"
    },
    {
        npc: false,
        text: "Active? What do you mean?"
    },
    {
        npc: true,
        text: "The Sun goes through a cycle, as if it had 'moods'. Sometimes it's calmer, and sometimes it gets more agitated, releasing a lot of energy and particles into space. We call this the solar activity cycle, which lasts on average 11 years"
    },
    {
        npc: false,
        text: "And what are these particles it releases?"
    },
    {
        npc: true,
        text: "They are very, very small pieces, like tiny energy balls! We call them solar particle events. When the Sun gets agitated, it launches a bunch of these particles, and they travel very fast through space"
    },
    {
        npc: false,
        text: "Wow! And do you guys up here feel that?"
    },
    {
        npc: true,
        text: "Yes we do! That's why we use suits and ships with special protection. These particles can be dangerous, so we need to keep an eye on scientists' alerts"   
    },
    {
        npc: false,
        text: "Look! You can see the Sun releasing some sparks there!"
    },
    {
        type: "video",
        media: "characters/astronauta/assets/video/play.mp4",
        caption: "Looking at the Sun"
    },
    {
        npc: true,
        text: "That's right! Those are solar flares and coronal mass ejections. It's the Sun working, shining and sending energy into space. It looks calm, but it's always in motion, rotating and releasing energy"
    },
    {
        npc: false,
        text: "How incredible! The Sun really has attitude!"
    },
    {
        npc: true,
        text: "Yes! It's like the heart of our solar system, giving light, heat and energy to all the planets. But sometimes, it gets a little excited!"
    },
    {
        npc: false,
        text: "Hahaha! So the Sun is really animated!"
    },
    {
        npc: true,
        text: "Yes! And now that you've met so many people who feel its influence, how about going back to Earth and telling what you learned?"
    }
];

// Export for global use
if (typeof window !== 'undefined') {
    window.astronautaDialoguesPT = astronautaDialoguesPT;
    window.astronautaDialoguesEN = astronautaDialoguesEN;
    // Keep backward compatibility
    window.astronautaDialogues = astronautaDialoguesEN;
}