const casterElemsContainer = document.getElementById('caster-elements');

casters.on('change', newValue => {
    let elemHtml = '';

    Object.keys(newValue).forEach((item) => {
        const element = newValue[item];

        elemHtml += `
		<div class="caster">
            <fitted-text class="name" use-inner-html text="${element.name} <span class=&quot;pronoun&quot;>${element.pronouns}</span>" max-width="280"></fitted-text>
            <fitted-text class="twitter" text="${element.twitter}" max-width="280"></fitted-text>
        </div>`;
    });

    casterElemsContainer.innerHTML = elemHtml;
});

const castersShowTl = gsap.timeline();

nodecg.listenFor('mainShowCasters', DASHBOARD_BUNDLE_NAME, () => {
    castersShowTl.add(gsap.to('#casters-wrapper', {y: 0, duration: 0.5, ease: Power2.easeOut, force3D: false}));
    castersShowTl.add(gsap.to({}, {duration: 15}));
    castersShowTl.add(gsap.to('#casters-wrapper', {y: 345, duration: 0.5, ease: Power2.easeIn, force3D: false}));
});

gsap.set('#casters-wrapper', {y: 345});
