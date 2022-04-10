const songTextTl = gsap.timeline();
const songTextElem = document.getElementById('song-text');
const infoBarMusicTl = gsap.timeline();
const topBarMusicElem = document.getElementById('info-row-music-text');

function isEmptyString(string) {
    string = String(string);
    return (string === 'undefined' || string === '');
}

function getSongName(rep) {
    const songName = [rep.artist, rep.song].filter(item => !isEmptyString(item)).join(' - ');

    return isEmptyString(songName) ? 'No song is playing.' : songName;
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
