const nextRoundTimeElem = document.getElementById('timer-text');
let nextStageDate;
let lastDiff;

nextRoundTime.on('change', (newValue, oldValue) => {
    nextStageDate = luxon.DateTime.fromISO(newValue.startTime);

    if (!oldValue || newValue.isVisible !== oldValue.isVisible) {
        const elemHeight = newValue.isVisible ? 70 : 0;
        const elemOpacity = newValue.isVisible ? 1 : 0;
        gsap.to('.music-timer-wrapper > .timer', {
            duration: 0.5,
            height: elemHeight,
            opacity: elemOpacity,
            ease: Power2.easeInOut
        });
    }
});

setInterval(() => {
    const diff = Math.ceil(nextStageDate.diffNow(['minutes']).toObject().minutes);
    if (lastDiff !== diff) {
        lastDiff = diff;
        let newText;

        if (diff < 1) {
            newText = 'Next round starts soon!';
        } else if (diff === 1) {
            newText = `Next round starts in <span id="mins-remaining">~${diff} minute...</span>`;
        } else {
            newText = `Next round starts in <span id="mins-remaining">~${diff} minutes...</span>`;
        }

        nextRoundTimeElem.innerHTML = newText;
    }
}, 1000);
