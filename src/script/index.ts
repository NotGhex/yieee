import { randomInt } from 'crypto';
import { ipcRenderer } from 'electron';

const noButtons = document.querySelectorAll<HTMLButtonElement>('.no-tf');
const yesButton = document.querySelector<HTMLButtonElement>('.yes-uwu');

let useFakeButton = false;

noButtons.forEach(e => {
    e.addEventListener('mousedown', noClicked);
    e.addEventListener('keydown', k => k.key == 'Enter' ? noClicked() : void 0);
});

yesButton?.addEventListener('click', () => {
    ipcRenderer.send('yes');
});

function noClicked() {
    const originalNoButton = document.querySelector<HTMLButtonElement>('.no-tf.original-no')!;
    const fakeNoButton = document.querySelector<HTMLButtonElement>('.no-tf.fake-no')!;

    if (!useFakeButton) {
        fakeNoButton.style.width = `${originalNoButton.scrollWidth}px`;

        originalNoButton.classList.add('hidden');
        fakeNoButton.classList.remove('hidden');
    }

    enabledObjects();
    setRandomPosition(fakeNoButton);

    setTimeout(() => {
        fakeNoButton.focus();
    }, 100);
}

function enabledObjects() {
    const objectsCollection = document.querySelectorAll<HTMLImageElement>('.objects > img');
    const objects: HTMLImageElement[] = [];
    const usedObjects: HTMLImageElement[] = [];

    objectsCollection.forEach(o => {
        if (o.classList.contains('hidden')) {
            objects.push(o);
        } else {
            usedObjects.push(o);
        }
    });

    let randomObject: HTMLImageElement;

    if (!objects.length) {
        if (usedObjects.length < 2) return;
        const node = usedObjects[usedObjects.length > 1 ? randomInt(usedObjects.length - 1) : 0];
        const element = document.createElement('img');

        element.src = node.src;

        randomObject = node.parentElement?.appendChild(element)!;
        if (!randomObject) return;
    } else {
        randomObject = objects[objects.length > 1 ? randomInt(objects.length - 1) : 0];
    }

    randomObject.className = 'visible';
    setRandomPosition(randomObject);
}

function setRandomPosition(element: HTMLElement): void {
    const top = randomInt(window.innerHeight - element.scrollHeight);
    const left = randomInt(window.innerWidth - element.scrollWidth);

    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
}