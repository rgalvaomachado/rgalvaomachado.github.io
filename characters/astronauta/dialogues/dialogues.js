// Diálogos dA Astronauta (Lúcia)
const astronautaDialogues = [
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
        text: "O Sol passa por um ciclo, como se tivesse “humores”. Às vezes ele fica mais calmo, e às vezes fica mais agitado, soltando muita energia e partículas pelo espaço. Chamamos isso de ciclo de atividade solar, que dura em média 11 anos"
    },
    {
        npc: false,
        text: "E o que são essas partículas que ele solta?"
    },
    {
        npc: true,
        text: "são pedacinhos muito, muito pequenos, como minúsculas bolinhas de energia! A gente chama de eventos de partículas solares. Quando o Sol fica agitado, ele lança um monte dessas partículas, e elas viajam bem rápido pelo espaço"
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
        text: "Isso mesmo! São erupções solares e ejeções de massa coronal. É o Sol trabalhando, brilhando e mandando energia para o espaço. Ele parece calmo, mas está sempre em movimento, girando e soltando energia"
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

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.astronautaDialogues = astronautaDialogues;
}