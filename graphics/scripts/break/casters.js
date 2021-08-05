const infoBarCasterElem = document.getElementById('info-row-casters-text');
const infoBarTwitterElem = document.getElementById('info-row-casters-twitter-text');
const infoBarCastersTl = gsap.timeline();

casters.on('change', (newValue, oldValue) => {
	let castersText = '';
	let twittersText = '';

	let updateTwitters = (oldValue === undefined);
	let updateNames = (oldValue === undefined);

	Object.keys(newValue).forEach((item, index, arr) => {
		const element = newValue[item];

		if (oldValue) {
			const oldElement = oldValue[item];

			Object.keys(oldValue).forEach(item => {
				if (!newValue[item]) {
					updateTwitters = true;
					updateNames = true;
				}
			});

			if (!oldElement || element.pronouns !== oldElement.pronouns) {
				updateNames = true;
				updateTwitters = true;
			} else {
				if (element.twitter !== oldElement.twitter) {
					updateTwitters = true;
				}
				if (element.name !== oldElement.name) {
					updateNames = true;
				}
			}
		}

		castersText += `${element.name} <span class="pronoun">${element.pronouns}</span>`;
		twittersText += `${element.twitter} <span class="pronoun">${element.pronouns}</span>`;

		if (arr[index + 2]) {
			castersText += ', ';
			twittersText += ', ';
		} else if (arr[index + 1]) {
			castersText += ' & ';
			twittersText += ' & ';
		}
	});

	if (updateNames) {
		infoBarCastersTl.add(gsap.to([infoBarCasterElem, getIcon(infoBarCasterElem)], {
			opacity: 0,
			duration: 0.3,
			onComplete: () => {
				infoBarCasterElem.setAttribute('text', castersText);
			}
		}));

		infoBarCastersTl.add(gsap.to([infoBarCasterElem, getIcon(infoBarCasterElem)], {
			opacity: 1,
			duration: 0.3
		}));
	}

	if (updateTwitters) {
		infoBarCastersTl.add(gsap.to([infoBarTwitterElem, getIcon(infoBarTwitterElem)], {
			opacity: 0,
			duration: 0.3,
			onComplete: () => {
				infoBarTwitterElem.setAttribute('text', twittersText);
			}
		}));

		infoBarCastersTl.add(gsap.to([infoBarTwitterElem, getIcon(infoBarTwitterElem)], {
			opacity: 1,
			duration: 0.3
		}));
	}
});

function getIcon(elem) {
	return elem.parentNode.querySelector('i');
}
