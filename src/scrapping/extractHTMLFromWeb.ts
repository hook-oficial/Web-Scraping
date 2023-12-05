import { BrowserWindow, WebContents } from "electron";

const extractOnlyHTML = async (webContents: WebContents) => {
    const HTMLData = await webContents.executeJavaScript(`
    const title = document.title;
    const description = document.querySelector('meta[name="description"]').getAttribute('content');
    const favicon = document.querySelector('link[rel="icon"]').getAttribute('href');
    const bodyHTML = document.body.innerHTML;

    ({ title, description, logo:favicon, DOM:bodyHTML });`);

    return HTMLData;
};

export default function extractHTMLFromWeb(window: BrowserWindow, url: string) {
    const pupperWindow = new BrowserWindow({ show: false });
    pupperWindow.loadURL(url);
    pupperWindow.webContents.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
    pupperWindow.webContents.on('did-finish-load', async () => {
        const html = await extractOnlyHTML(pupperWindow.webContents);
        window?.webContents.send('html-result', html);
        pupperWindow.close();
    })
}

