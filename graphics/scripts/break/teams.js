const teamsTls = {
	'a': gsap.timeline(),
	'b': gsap.timeline()
}

NodeCG.waitForReplicants(activeRound).then(() => {
	activeRound.on('change', (newValue, oldValue) => {
		if (!oldValue) {
			setTeams(newValue.teamA, 'a');
			setTeams(newValue.teamB, 'b');
			return;
		}

		if (newValue.teamA.id !== oldValue.teamA.id) {
			setTeams(newValue.teamA, 'a');
		}

		if (newValue.teamB.id !== oldValue.teamB.id) {
			setTeams(newValue.teamB, 'b');
		}
	});

	// todo: hiding team images does not function
	// teamImageShown.on('change', newValue => {
	// 	gsap.to('#team-a-image', {opacity: (newValue.teamA && !stringIsBlank(nextRound.value.teamAInfo.logoUrl)) ? 1 : 0, duration: 0.35});
	// 	gsap.to('#team-b-image', {opacity: (newValue.teamB && !stringIsBlank(nextRound.value.teamBInfo.logoUrl)) ? 1 : 0, duration: 0.35});
	// });
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
		opacity: 0, duration: 0.3, onComplete: async () => {
			if (stringIsBlank(data.logoUrl)) {
				teamImageElem.style.backgroundImage = 'unset';
				teamImageElem.style.opacity = '0';
			} else {
				await loadImage(data.logoUrl);
				teamImageElem.style.backgroundImage = `url("${data.logoUrl}")`;
				if (data.showLogo) {
					tl.add(gsap.to(teamImageElem, {opacity: 1, duration: 0.3}));
				}
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

async function loadImage(imageUrl) {
	return new Promise((resolve) => {
		const imageLoaderElem = document.createElement('img');
		imageLoaderElem.src = imageUrl;

		imageLoaderElem.addEventListener('load', () => {
			resolve();
		});
	});
}

