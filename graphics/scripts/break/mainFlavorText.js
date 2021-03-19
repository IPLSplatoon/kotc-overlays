const mainFlavorTl = gsap.timeline();

mainFlavorText.on('change', newValue => {
    textOpacitySwap(newValue, document.getElementById('main-flavor-text'), mainFlavorTl);
});
