const sceneTl = gsap.timeline();

activeBreakScene.on('change', (newValue, oldValue) => {
    if (!oldValue) {

    } else {
        switch (oldValue) {
            case 'main':
                sceneTl.add(gsap.set('.info-bar-wrapper', {clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'}));
                break;
            case 'teams':
                break;
            case 'stages':
                break;
            default:

        }
    }

    switch (newValue) {
        case 'main':
            setScenePosition(-960, 0);
            break;
        case 'teams':
            setScenePosition(0, -1280);
            showInfoBar(0);
            break;
        case 'stages':
            setScenePosition(-1920, -1280);
            showInfoBar(1920);
            break;
        default:

    }
});

function setScenePosition(x, y, position = '-=0.0') {
    sceneTl.add(gsap.to('#content-wrapper', {x: x, y: y, ease: 'power2.inOut', duration: 1}), position);
}

function showInfoBar(posX = null) {
    const clipPathFrom = '0% 0%, 0% 0%, 0% 100%, 0% 100%';
    const clipPathTo = '0 0, 100% 0, 100% 100%, 0% 100%';

    sceneTl.add(gsap.set('.info-bar-wrapper', {left: posX, clipPath: `polygon(${clipPathFrom})`}));
    sceneTl.add(gsap.to('.info-bar-wrapper', {duration: 1, clipPath: `polygon(${clipPathTo})`, ease: 'power3.out'}));
}

function hideStageElems(timeline, callback = () => {
}) {
    timeline.add(gsap.to('.stage', {
        opacity: 0,
        stagger: {from: 'start', each: 0.05},
        onComplete: () => {
            gsap.set('.stages-grid', {opacity: 0});
            callback();
        }
    }));
}

function showStageElems(timeline, startPos = '-=0.0') {
    timeline.add(gsap.to('.stage', {
        opacity: 1, stagger: {
            from: 'start', each: 0.05, onStart: () => {
                if (activeBreakScene.value === 'stages') {
                    gsap.set('.stages-grid', {opacity: 1});
                }
            }
        }
    }), startPos);
}
