import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { setTimeout } from 'timers/promises';

export const projectDir = path.join(__dirname, '../');

app.on('ready', async () => {
    const loadingWindow = new BrowserWindow({
        width: 400,
        height: 200,
        resizable: false,
        frame: false,
        alwaysOnTop: true,
        focusable: false,
        transparent: true,
        center: true,
        icon: getIcon()
    });

    await loadingWindow.loadFile(path.join(projectDir, 'assets/loading.html'));
    

    const window = new BrowserWindow({
        minWidth: 800,
        minHeight: 500,
        autoHideMenuBar: true,
        center: true,
        darkTheme: true,
        show: false,
        enableLargerThanScreen: false,
        icon: getIcon(),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    await window.loadFile(path.join(projectDir, 'assets/index.html'));
    await setTimeout(3000);


    loadingWindow.destroy();
    window.show();

    const yesWindow = await getYesWindow();

    ipcMain.on('yes', async () => {
        window.destroy();
        yesWindow.show();
        yesWindow.maximize();
        yesWindow.webContents.openDevTools();
    });

    ipcMain.on('close', app.quit);
});

export function getIcon(): string {
    if (process.platform === 'win32') return path.join(projectDir, 'assets/icons/icon.ico');

    return path.join(projectDir, 'assets/icons/icon.png');
}

async function getYesWindow(): Promise<BrowserWindow> {
    const yesWindow = new BrowserWindow({
        minWidth: 800,
        minHeight: 500,
        transparent: true,
        // alwaysOnTop: true,
        center: true,
        frame: false,
        show: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });

    await yesWindow.loadFile(path.join(projectDir, 'assets/yes.html'))
        .then(() => yesWindow.setMenu(null))
        .catch(err => {
            console.log(err);
            yesWindow.destroy();
        });

    return yesWindow;
}