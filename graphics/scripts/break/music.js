const songTextTl = gsap.timeline();
const songTextElem = document.getElementById('song-text');
const infoBarMusicTl = gsap.timeline();
const topBarMusicElem = document.getElementById('info-row-music-text');

function checkStringEmptyOrUndef(string) {
    string = String(string);
    return (string === 'undefined' || string === '');
}

function getSongName(rep) {
    if (checkStringEmptyOrUndef(rep.artist) && checkStringEmptyOrUndef(rep.song)) {
        return 'No song is playing.'
    }

    if (checkStringEmptyOrUndef(rep.artist)) {
        return rep.song;
    } else if (checkStringEmptyOrUndef(rep.song)) {
        return rep.artist;
    }

    return rep.artist + ' - ' + rep.song;
}

nowPlaying.on('change', newValue => {
    iconTextOpacitySwap(getSongName(newValue),
        songTextElem,
        songTextElem.parentNode.querySelector('i'),
        songTextTl);

    infoBarMusicTl.add(gsap.to([topBarMusicElem, '#info-row-music-icon'], {
        opacity: 0, duration: 0.3, onComplete: function () {
            topBarMusicElem.setAttribute('text', getSongName(newValue));
        }
    }));

    infoBarMusicTl.add(gsap.to([topBarMusicElem, '#info-row-music-icon'], {
        opacity: 1, duration: 0.3
    }));
});

musicShown.on('change', newValue => {
    const elemHeight = newValue ? 70 : 0;
    const elemOpacity = newValue ? 1 : 0;

    gsap.to('.music-timer-wrapper > .music', {
        duration: 0.5,
        height: elemHeight,
        opacity: elemOpacity,
        ease: Power2.easeInOut
    });
});
