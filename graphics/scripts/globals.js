const DASHBOARD_BUNDLE_NAME = 'ipl-overlay-controls';

function textOpacitySwap(newText, elem, tl) {
    tl.add(gsap.to(elem, {
        opacity: 0, duration: 0.35, onComplete: () => {
            elem.setAttribute('text', newText);
        }
    }));

    tl.add(gsap.to(elem, {opacity: 1, duration: 0.35}));
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function addDots(string = "") {
    const maxNameLength = 48;
    const rolloff = '...';

    if (!string) return string;
    if (string.length > maxNameLength) return string.substring(0, (maxNameLength - rolloff.length)) + rolloff;
    else return string;
}

function loadImagePromise(imageUrl) {
    return new Promise((resolve) => {
        const imageLoaderElem = document.createElement("img");
        imageLoaderElem.src = imageUrl;

        imageLoaderElem.addEventListener('load', () => {
            resolve();
        });
    })
}

function doOnDifference(newValue, oldValue, path, callback) {
    const newObject = _.get(newValue, path);
    const oldObject = _.get(oldValue, path);

    if (newObject != null && (oldObject == null || !_.isEqual(newObject, oldObject))) {
        callback(newObject, oldObject);
    }
}

function doOnOneOrMoreDifference(newValue, oldValue, paths, callback) {
    const newPaths = _.at(newValue, paths);
    const oldPaths = _.at(oldValue, paths);

    const doesNotExist = value => value == null;

    if (!newPaths.every(doesNotExist) && (oldPaths.every(doesNotExist) || !_.isEqual(newPaths, oldPaths))) {
        callback(newPaths);
    }
}

function doOnNoDifference(newValue, oldValue, path, callback) {
    const newObject = _.get(newValue, path);
    const oldObject = _.get(oldValue, path);

    if (newObject != null && (oldObject == null || _.isEqual(newObject, oldObject))) {
        callback(newObject);
    }
}
