const teamsTls = {
	'a': gsap.timeline(),
	'b': gsap.timeline()
}

NodeCG.waitForReplicants(nextTeams, teamImageShown).then(() => {
	nextTeams.on('change', (newValue, oldValue) => {
		if (!oldValue) {
			setTeams(newValue.teamAInfo, 'a');
			setTeams(newValue.teamBInfo, 'b');
			return;
		}

		if (newValue.teamAInfo.id !== oldValue.teamAInfo.id) {
			setTeams(newValue.teamAInfo, 'a');
		}

		if (newValue.teamBInfo.id !== oldValue.teamBInfo.id) {
			setTeams(newValue.teamBInfo, 'b');
		}
	});

	teamImageShown.on('change', newValue => {
		gsap.to('#team-a-image', {opacity: (newValue.teamA && !stringIsBlank(nextTeams.value.teamAInfo.logoUrl)) ? 1 : 0, duration: 0.35});
		gsap.to('#team-b-image', {opacity: (newValue.teamB && !stringIsBlank(nextTeams.value.teamBInfo.logoUrl)) ? 1 : 0, duration: 0.35});
	});
});

function setTeams(data, team) {
	const tl = teamsTls[team];

	const teamNameElem = document.getElementById(`team-${team}-name`);
	tl.add(gsap.to(teamNameElem, {
		opacity: 0, duration: 0.3, onComplete: function () {
			teamNameElem.setAttribute('text', addDots(data.name));
		}
	}));
	tl.add(gsap.to(teamNameElem, {opacity: 1, duration: 0.3}));

	const teamImageElem = document.getElementById(`team-${team}-image`);

	tl.add(gsap.to(teamImageElem, {
		opacity: 0, duration: 0.3, onComplete: () => {
			if (stringIsBlank(data.logoUrl)) {
				teamImageElem.style.backgroundImage = 'unset';
				teamImageElem.style.opacity = '0';
			} else {
				loadImage(data.logoUrl, () => {
					teamImageElem.style.backgroundImage = `url("${data.logoUrl}")`;
					if ((team === 'a' && teamImageShown.value.teamA === true) || (team === 'b' && teamImageShown.value.teamB === true)) {
						tl.add(gsap.to(teamImageElem, {opacity: 1, duration: 0.3}));
					}
				});
			}
		}
	}), '-=0.6');

	const teamPlayersElem = document.getElementById(`team-${team}-players`);
	tl.add(gsap.to(teamPlayersElem, {
		opacity: 0, duration: 0.3, onComplete: function () {
			teamPlayersElem.innerHTML = '';
			for (let i = 0; i < data.players.length; i++) {
				const player = data.players[i];

				const playerNameElem = document.createElement('fitted-text');
				playerNameElem.classList.add('team-player');
				playerNameElem.setAttribute('text', addDots(player.name));
				playerNameElem.setAttribute('max-width', '485');
				playerNameElem.setAttribute('align', team === 'a' ? 'right' : 'left');

				teamPlayersElem.appendChild(playerNameElem);
			}
		}
	}), '-=0.6');
	tl.add(gsap.to(teamPlayersElem, {opacity: 1, duration: 0.3}), '-=0.3');
}

function stringIsBlank(str) {
	return (str === '' || str === undefined || str === null);
}

function loadImage(imageUrl, callback) {
	const imageLoaderElem = document.createElement("img");
	imageLoaderElem.src = imageUrl;

	imageLoaderElem.addEventListener('load', () => {
		callback();
	});
}
