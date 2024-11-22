const gameData = [
    // Stage 1 - Index 0
    {
        question: `Parece que a conexão está estável, você pode pode me ajudar?`,
        answers: {
            "sim": {
                response: `Certo, agradeço por isso, vamos começar.`,
                nextStage: 1
            },
            "não": {
                response: `Certo, quando estiver preparado(a), digite sim.`,
                nextStage: 0
            },
            "nao": {
                response: `Certo, quando estiver preparado(a), digite sim.`,
                nextStage: 0
            }
        },
        defaultAnswer: `Não sei se entendi muito bem, vou perguntar novamente.`,
        acceptAnyInput: false,
        title: `[Conexão Concluida]`
    },
    // Stage 2 - Index 1
    {
        question: `As informações sobre o Jota chegaram até você, certo? Preciso que decifre algo para mim, você está disposto(a)?`,
        answers: {
            "sim": {
                response: `Certo. É só responder com a resposta do enigma.`,
                nextStage: 2
            },
            "informações": {
                response: `Sim, as informações, a imagem, você não viu? Tente o twitter.`,
                nextStage: 1
            },
            "informação": {
                response: `Sim, as informações, a imagem, você não viu? Tente o twitter.`,
                nextStage: 1
            }
        },
        defaultAnswer: `Não sei se entendi muito bem, vou perguntar novamente.`,
        acceptAnyInput: true,
        nextStage: 2,
        title: `[start connection]`
    },
    // Stage 3 - Index 2
    {
        question: `qwfq qwuf nqwdkaolc qpfdpk fqwf`,
        answers: {
            "sim": {
                response: `Certo. É só responder com a resposta do enigma.`,
                nextStage: 2
            },
            "informações": {
                response: `it's... it's it again, it's coming back, it's coming back for me...`,
                nextStage: 2
            },
            "informação": {
                response: `it's... it's it again, it's coming back, it's coming back for me...`,
                nextStage: 2
            },
            "down": {
                response: `our facility is going down, it's coming back, it's coming back for me...`,
                nextStage: 2
            }
        },
        defaultAnswer: `...`,
        acceptAnyInput: true,
        nextStage: 2,
        title: `caos`
    }
];

export default gameData;