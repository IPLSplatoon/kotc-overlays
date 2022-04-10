const stagesLayout = document.getElementById('stages-grid');
const mapNameToImagePath = {
    "Ancho-V Games": "S2_Stage_Ancho-V_Games.png",
    "Arowana Mall": "S2_Stage_Arowana_Mall.png",
    "Blackbelly Skatepark": "S2_Stage_Blackbelly_Skatepark.png",
    "Camp Triggerfish": "S2_Stage_Camp_Triggerfish.png",
    "Goby Arena": "S2_Stage_Goby_Arena.png",
    "Humpback Pump Track": "S2_Stage_Humpback_Pump_Track.png",
    "Inkblot Art Academy": "S2_Stage_Inkblot_Art_Academy.png",
    "Kelp Dome": "S2_Stage_Kelp_Dome.png",
    "MakoMart": "S2_Stage_MakoMart.png",
    "Manta Maria": "S2_Stage_Manta_Maria.png",
    "Moray Towers": "S2_Stage_Moray_Towers.png",
    "Musselforge Fitness": "S2_Stage_Musselforge_Fitness.png",
    "New Albacore Hotel": "S2_Stage_New_Albacore_Hotel.png",
    "Piranha Pit": "S2_Stage_Piranha_Pit.png",
    "Port Mackerel": "S2_Stage_Port_Mackerel.png",
    "Shellendorf Institute": "S2_Stage_Shellendorf_Institute.png",
    "Shifty Station": "S2_Stage_Shifty_Station.png",
    "Snapper Canal": "S2_Stage_Snapper_Canal.png",
    "Starfish Mainstage": "S2_Stage_Starfish_Mainstage.png",
    "Sturgeon Shipyard": "S2_Stage_Sturgeon_Shipyard.png",
    "The Reef": "S2_Stage_The_Reef.png",
    "Wahoo World": "S2_Stage_Wahoo_World.png",
    "Walleye Warehouse": "S2_Stage_Walleye_Warehouse.png",
    "Skipper Pavilion": "S2_Stage_Skipper_Pavilion.png",
    "Unknown Stage": "KC_Unknown-Map.png",
    "Counterpick": "KC_Unknown-Map.png"
};
const winnerTls = {
    0: gsap.timeline(),
    1: gsap.timeline(),
    2: gsap.timeline(),
    3: gsap.timeline(),
    4: gsap.timeline(),
    5: gsap.timeline(),
    6: gsap.timeline(),
};
const stagesTl = gsap.timeline();
const sbTls = {
    'a': gsap.timeline(),
    'b': gsap.timeline()
};

function getUpdatedGames(newActiveRound, oldActiveRound) {
    const gamesWithIndex = newActiveRound.games.map((game, index) => ({
        index,
        ...game
    }));

    if (!oldActiveRound || newActiveRound.match.id !== oldActiveRound.match.id) {
        return {
            isNewMatch: true,
            isFirstLoad: !oldActiveRound,
            changedGames: gamesWithIndex
        };
    }

    return {
        isNewMatch: false,
        isFirstLoad: false,
        changedGames: gamesWithIndex.filter((game, index) => {
            const oldGame = oldActiveRound.games[index];
            return game.stage !== oldGame.stage || game.mode !== oldGame.mode;
        })
    };
}

function getUpdatedWinners(newActiveRound, oldActiveRound) {
    const winners = newActiveRound.games.map((game, index) => ({
        index,
        winner: game.winner,
        oldWinner: oldActiveRound && oldActiveRound.games[index] && oldActiveRound.games[index].winner
    }));

    if (!oldActiveRound || newActiveRound.match.id !== oldActiveRound.match.id) {
        return winners;
    }

    return winners.filter(winner => {
        const oldGame = oldActiveRound.games[winner.index];
        return winner.winner !== oldGame.winner
            || (winner.winner === 'alpha' && newActiveRound.teamA.name !== oldActiveRound.teamA.name)
            || (winner.winner === 'bravo' && newActiveRound.teamB.name !== oldActiveRound.teamB.name);
    });
}

function getWinnerName(activeRound, winner) {
    return addDots(winner === 'alpha' ? activeRound.teamA.name : activeRound.teamB.name);
}

activeRound.on('change', (newValue, oldValue) => {
    document.getElementById('team-a-score-scoreboard').setAttribute('text', newValue.teamA.score);
    document.getElementById('team-b-score-scoreboard').setAttribute('text', newValue.teamB.score);

    if (!oldValue || newValue.teamA.name !== oldValue.teamA.name) {
        updateScoreboardName('a', newValue.teamA.name);
    }
    if (!oldValue || newValue.teamB.name !== oldValue.teamB.name) {
        updateScoreboardName('b', newValue.teamB.name);
    }

    const games = getUpdatedGames(newValue, oldValue);
    const winners = getUpdatedWinners(newValue, oldValue);

    updateGames(games, winners);

    if (!games.isNewMatch) {
        setWinners(winners);
    }
});

function getStageUrl(stageName) {
    return `images/stages/${mapNameToImagePath[stageName]}`;
}

async function updateGames(games, winners) {
    if (games.changedGames.length <= 0) return;

    const stageElementIds = games.changedGames.map(game => `#stage_${game.index}`).join(', ');
    const target = games.isNewMatch ? '#stages-grid > .stage' : stageElementIds;
    const tl = gsap.timeline({
        defaults: {
            immediateRender: false
        }
    });

    function createStageElems() {
        if (games.isNewMatch) {
            stagesLayout.classList.remove('stage-count-3', 'stage-count-5', 'stage-count-7');
            stagesLayout.classList.add(`stage-count-${games.changedGames.length}`);
            let stagesWidth = 0;
            let stagesGap = 0;
            let stageModeMaxWidth = 0;
            let stageNameFontSize = 0;
            let stageModeFontSize = 0;
            switch (games.changedGames.length) {
                case 3:
                    stagesWidth = 1200;
                    stagesGap = 50;
                    stageModeMaxWidth = 352;
                    stageNameFontSize = 40;
                    stageModeFontSize = 37;
                    break;
                case 5:
                    stagesWidth = 1500;
                    stagesGap = 35;
                    stageModeMaxWidth = 250;
                    stageNameFontSize = 35;
                    stageModeFontSize = 35;
                    break;
                case 7:
                    stagesWidth = 1700;
                    stagesGap = 20;
                    stageModeMaxWidth = 190;
                    stageNameFontSize = 30;
                    stageModeFontSize = 31;
            }
            stagesLayout.innerHTML = games.changedGames.reduce((prev, game) => {
                prev += `
			<div class="stage flex-align-center" id="stage_${game.index}" style="transform: rotate(${randomNumber(-2, 2)}deg); opacity: 0">
				<div class="accent">
					<img src="images/stages-text.png">
				</div>
				<div class="stage-content">
					<div class="stage-image"
						style="background-image: url('${getStageUrl(game.stage)}'); filter: saturate(1)">
					</div>
					<div class="stage-text">
						<div class="stage-winner-wrapper flex-align-center" id="winner_${game.index}">
							<div class="stage-winner" style="font-size: ${stageModeFontSize}px"></div>
						</div>
						<div class="stage-info">
							<fitted-text
								class="stage-mode"
								style="font-size: ${stageModeFontSize}px"
								text="${game.mode}"
								max-width="${stageModeMaxWidth}">
							</fitted-text>
							<div class="stage-line"></div>
							<div class="stage-name" style="font-size: ${stageNameFontSize}px">${game.stage}</div>
						</div>
					</div>
				</div>
			</div>`;

                return prev;
            }, '');
            setWinners(winners);
        } else {
            games.changedGames.forEach(game => {
                const stageElem = document.getElementById(`stage_${game.index}`);

                stageElem.querySelector('.stage-image').style.backgroundImage = `url('${getStageUrl(game.stage)}')`;
                stageElem.querySelector('.stage-mode').text = game.mode;
                stageElem.querySelector('.stage-name').innerText = game.stage;
            });
        }

        if (activeBreakScene.value === 'stages') {
            tl.fromTo(target, {
                y: -50
            }, {
                duration: 0.5,
                ease: 'power2.out',
                y: 0,
                opacity: 1,
                stagger: 0.1
            });
        } else {
            gsap.set(target, { opacity: 1 });
        }
    }

    await Promise.all(games.changedGames.map(game => loadImage(getStageUrl(game.stage))));

    if (!games.isFirstLoad && activeBreakScene.value === 'stages') {
        tl.to(target, {
            duration: 0.5,
            ease: 'power2.in',
            y: 50,
            opacity: 0,
            stagger: 0.1,
            onComplete: createStageElems
        });
    } else {
        createStageElems();
    }

    sceneTl.add(tl);
}

function setWinners(winners) {
    winners.forEach(winner => {
        const winnerElem = document.getElementById(`winner_${winner.index}`);
        const winnerText = winnerElem.querySelector('.stage-winner');

        if (winner.winner !== 'none') {
            const winnerName = getWinnerName(activeRound.value, winner.winner);

            if (winner.winner === 'alpha' && winner.oldWinner === 'bravo'
                || winner.winner === 'bravo' && winner.oldWinner === 'alpha'
                || winner.winner === winner.oldWinner) {
                textOpacitySwap(winnerName, winnerText, winnerTls[winner.index]);
            } else {
                winnerText.innerText = winnerName;
            }
        }

        gsap.to(winnerElem, { duration: 0.35, opacity: winner.winner === 'none' ? 0 : 1 });
    });
}

function updateScoreboardName(team, newName) {
    const teamNameElem = document.getElementById(`team-${team}-name-scoreboard`);

    sbTls[team].add(gsap.to(teamNameElem, {
        opacity: 0, duration: 0.35, onComplete: function () {
            teamNameElem.setAttribute('text', addDots(newName));
        }
    }))
        .add(gsap.to(teamNameElem, {opacity: 1, duration: 0.35}));
}
