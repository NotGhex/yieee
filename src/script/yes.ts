import { randomInt } from 'crypto';
import { ipcRenderer } from 'electron';
import { readdirSync } from 'fs';
import path from 'path';

const closeButton = document.querySelector<HTMLButtonElement>('.close-window');

closeButton?.addEventListener('click', () => ipcRenderer.send('close'));

(async () => {
    const imagesDir = path.join(__dirname, 'img/yes');
    const images = readdirSync(imagesDir).map(file => path.join(imagesDir, file));
    const objects = document.querySelector('.objects');

    images.forEach(imageURL => {
        const element = document.createElement('img');

        setRandomPosition(element);
        element.src = imageURL;

        objects?.appendChild(element);
    });
})();

function setRandomPosition(element: HTMLElement): void {
    const top = randomInt(window.innerHeight - element.scrollHeight);
    const left = randomInt(window.innerWidth - element.scrollWidth);
    const rotation = randomInt(200);

    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
    element.style.rotate = `${rotation}deg`;
}