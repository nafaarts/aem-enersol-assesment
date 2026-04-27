import * as path from 'path';
import { fileURLToPath } from 'url';
import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEV_SERVER_URL = process.env['ELECTRON_START_URL'];
const APP_NAME = 'AEM Dashboard';
const APP_TITLE = 'AEM Dashboard Desktop';

app.name = APP_NAME;

let mainWindow: BrowserWindow | null = null;

const ICONS: Partial<Record<NodeJS.Platform, string>> = {
    win32: '../electron/assets/icon.ico',
    darwin: '../electron/assets/icon.icns',
};

function getIconPath(): string {
    return path.join(__dirname, ICONS[process.platform] ?? '../electron/assets/icon.png');
}

function getStartUrl(): string {
    return DEV_SERVER_URL
        ?? `file://${path.join(__dirname, '../dist/aem-dashboard/index.html')}`;
}

function buildMenu(): Menu {
    const template: MenuItemConstructorOptions[] = [];

    if (process.platform === 'darwin') {
        template.push({
            label: APP_NAME,
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' },
            ],
        });
    }

    template.push(
        {
            label: 'View',
            submenu: [
                { role: 'togglefullscreen' },
            ],
        },
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(process.platform === 'darwin'
                    ? [{ type: 'separator' as const }, { role: 'front' as const }]
                    : [{ role: 'close' as const }]),
            ],
        }
    );

    return Menu.buildFromTemplate(template);
}

function createWindow(): void {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        title: APP_TITLE,
        icon: getIconPath(),
        webPreferences: { nodeIntegration: true, contextIsolation: false },
        show: false,
    });

    mainWindow.loadURL(getStartUrl()).catch(console.error);

    // Disable reload shortcuts (Cmd+R, Ctrl+R, F5) — this is a desktop app,
    // not a browser; reloading resets application state unexpectedly.
    mainWindow.webContents.on('before-input-event', (event, input) => {
        const isReload =
            input.key === 'F5' ||
            (input.key === 'r' && (input.meta || input.control));
        if (isReload) event.preventDefault();
    });

    mainWindow.webContents.on('page-title-updated', event => {
        event.preventDefault();
        mainWindow?.setTitle(APP_TITLE);
    });

    mainWindow.once('ready-to-show', () => mainWindow?.show());
    mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(() => {
    Menu.setApplicationMenu(buildMenu());

    if (process.platform === 'darwin') {
        app.dock?.setIcon(path.join(__dirname, '../electron/assets/icon.png'));
    }

    createWindow();
}).catch(console.error);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (mainWindow === null) createWindow();
});
