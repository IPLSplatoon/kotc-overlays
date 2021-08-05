const sbEditTls = {
    teamA: gsap.timeline(),
    teamB: gsap.timeline(),
    flavorText: gsap.timeline()
};

const sbShowTl = new gsap.timeline();

activeRound.on('change', (newValue, oldValue) => {
    doOnDifference(newValue, oldValue, 'teamA.score',
        value => document.getElementById('team-a-score').setAttribute('text', value));
    doOnDifference(newValue, oldValue, 'teamB.score',
        value => document.getElementById('team-b-score').setAttribute('text', value))

    doOnDifference(newValue, oldValue, 'teamA.name',
        value => textOpacitySwap(addDots(value), document.getElementById('team-a-name'), sbEditTls["teamA"]));
    doOnDifference(newValue, oldValue, 'teamB.name',
        value => textOpacitySwap(addDots(value), document.getElementById('team-b-name'), sbEditTls["teamB"]));

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
    doOnDifference(newValue, oldValue, 'flavorText',
        value => textOpacitySwap(value, document.getElementById('scoreboard-flavor-text'), sbEditTls["flavorText"]))

    doOnDifference(newValue, oldValue, 'isVisible',
        value => {
            if (value) {
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
});
