function iconTextOpacitySwap(newText, textElem, iconElem, tl) {
    textOpacitySwap(newText, textElem, tl);
    tl.add(gsap.to(iconElem, {duration: 0.35, opacity: 0}), '-=0.7');
    tl.add(gsap.to(iconElem, {duration: 0.35, opacity: 1}), '-=0.35');
}
