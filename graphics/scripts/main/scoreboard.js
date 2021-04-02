teamScores.on('change', newValue => {
    document.getElementById('team-a-score').setAttribute('text', newValue.teamA);
    document.getElementById('team-b-score').setAttribute('text', newValue.teamB);
});

const sbEditTls = {
    teamA: gsap.timeline(),
    teamB: gsap.timeline(),
    flavorText: gsap.timeline()
};

scoreboardData.on('change', (newValue, oldValue) => {
    if (!oldValue) {
        textOpacitySwap(newValue.teamAInfo.name, document.getElementById('team-a-name'), sbEditTls["teamA"]);
        textOpacitySwap(newValue.teamBInfo.name, document.getElementById('team-b-name'), sbEditTls["teamB"]);
        textOpacitySwap(newValue.flavorText, document.getElementById('scoreboard-flavor-text'), sbEditTls["flavorText"]);
    } else {
        if (newValue.teamAInfo.name !== oldValue.teamAInfo.name) {
            textOpacitySwap(addDots(newValue.teamAInfo.name), document.getElementById('team-a-name'), sbEditTls["teamA"]);
        }

        if (newValue.teamBInfo.name !== oldValue.teamBInfo.name) {
            textOpacitySwap(addDots(newValue.teamBInfo.name), document.getElementById('team-b-name'), sbEditTls["teamB"]);
        }

        if (newValue.flavorText !== oldValue.flavorText) {
            textOpacitySwap(newValue.flavorText, document.getElementById('scoreboard-flavor-text'), sbEditTls["flavorText"]);
        }
    }

    gsap.to('#team-a-color', {
        backgroundColor: newValue.swapColorOrder ? newValue.colorInfo.clrB : newValue.colorInfo.clrA,
        duration: 0.35
    });

    gsap.to('#team-b-color', {
        backgroundColor: newValue.swapColorOrder ? newValue.colorInfo.clrA : newValue.colorInfo.clrB,
        duration: 0.35
    });
});

const sbShowTl = new gsap.timeline();

scoreboardShown.on('change', newValue => {
    if (newValue) {
        sbShowTl.add(gsap.fromTo('#scoreboard-wrapper', {y: -200}, {
            duration: 0.5,
            y: 0,
            ease: Power2.easeOut,
            force3D: false
        }));
    } else {
        sbShowTl.add(gsap.fromTo('#scoreboard-wrapper', {y: 0}, {
            duration: 0.5,
            y: -200,
            ease: Power2.easeIn,
            force3D: false
        }));
    }
});
