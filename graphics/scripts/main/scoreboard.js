const sbEditTls = {
    teamA: gsap.timeline(),
    teamB: gsap.timeline(),
    flavorText: gsap.timeline()
};

activeRound.on('change', (newValue, oldValue) => {
    document.getElementById('team-a-score').setAttribute('text', newValue.teamA.score);
    document.getElementById('team-b-score').setAttribute('text', newValue.teamB.score);

    if (!oldValue) {
        textOpacitySwap(newValue.teamA.name, document.getElementById('team-a-name'), sbEditTls["teamA"]);
        textOpacitySwap(newValue.teamB.name, document.getElementById('team-b-name'), sbEditTls["teamB"]);
    } else {
        if (newValue.teamA.name !== oldValue.teamA.name) {
            textOpacitySwap(addDots(newValue.teamA.name), document.getElementById('team-a-name'), sbEditTls["teamA"]);
        }

        if (newValue.teamB.name !== oldValue.teamB.name) {
            textOpacitySwap(addDots(newValue.teamB.name), document.getElementById('team-b-name'), sbEditTls["teamB"]);
        }
    }

    gsap.to('#team-a-color', {
        backgroundColor: newValue.teamA.color,
        duration: 0.35
    });

    gsap.to('#team-b-color', {
        backgroundColor: newValue.teamB.color,
        duration: 0.35
    });
});

scoreboardData.on('change', (newValue, oldValue) => {
    if (!oldValue || newValue.flavorText !== oldValue.flavorText) {
        textOpacitySwap(newValue.flavorText, document.getElementById('scoreboard-flavor-text'), sbEditTls["flavorText"]);
    }

    if (!oldValue || newValue.isVisible !== oldValue.isVisible) {
        if (newValue.isVisible) {
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
    }
});

const sbShowTl = new gsap.timeline();

scoreboardShown.on('change', newValue => {

});
