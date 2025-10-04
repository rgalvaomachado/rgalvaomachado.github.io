// Diálogos dA Agricultora (Rosa)
const agricultorDialogues = [
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
        text: "Na verdade, além da projeção de luzes, em uma tempestade solar o Sol também solta uma espécie de ‘bola de gás quente’ chamada Ejeção de Massa Coronal, ou EMC. É como se o Sol jogasse para o espaço um monte de gás brilhante cheio de energia!"
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

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.agricultorDialogues = agricultorDialogues;
}