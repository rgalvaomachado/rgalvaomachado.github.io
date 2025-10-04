// Diálogos dO Piloto (Carlos)
const pilotoDialogues = [
    {
        npc: false,
        text: "Oi, Carlos! Soube que o Sol às vezes prega peças até nos aviões. É verdade?"
    },
    {
        npc: true,
        text: "Oi %playerName%! Quando o Sol faz uma grande erupção solar, uma grande explosão de luz, calor e partículas que saem voando. Essas partículas carregadas podem atrapalhar os sistemas de comunicação e navegação dos aviões. Às vezes, temos que mudar a rota ou usar rádios alternativos para manter tudo seguro"
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

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.pilotoDialogues = pilotoDialogues;
}
