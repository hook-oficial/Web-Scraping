import { BrowserWindow, WebContents } from "electron";

const extractHTMLData = async (webContents: WebContents) => {
    const HTMLData = await webContents.executeJavaScript(`
        const bodyHTML = document.body.innerHTML;
        const title = document.title;
        const descriptionElement = document.querySelector('meta[name="description"]')
        const description = descriptionElement?.getAttribute('content') || 'It seems that this site has no description';
        const iconCases = ['icon', 'shortcut icon', 'alternate icon'];
        const baseHref = window.location.origin;
        const favIcon = iconCases.map(favCase => {
                                    const element = document.querySelector('link[rel="' + favCase + '"]');
                                    if(!element) return 'https://static.vecteezy.com/system/resources/previews/024/604/987/original/internet-flat-icon-go-to-web-sign-for-web-site-design-logo-app-ui-illustration-eps10-vector.jpg';
                                    const href = element.getAttribute('href');
                                    const isRelative = !href.startsWith('http') && !href.startsWith('//');
                                    const absoluteURL = isRelative ? new URL(href, baseHref).href : href;
                                    return absoluteURL;}).find(e=>e);
        ({ title, description, logo:favIcon, DOM:bodyHTML, URL_href:baseHref })`);

    return HTMLData;
};

export default function extractHTMLFromWeb(window: BrowserWindow, url: string) {
    const pupperWindow = new BrowserWindow({ show: false});
    pupperWindow.loadURL(url);
    pupperWindow.webContents.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
    pupperWindow.webContents.on('did-finish-load', async () => {
        try {
            const time = url.includes('youtube') ? 10000 : 4000;
            let scrollValue = 0;
            const interval = setInterval(() => {
                scrollValue += 2000; 
                pupperWindow.webContents.executeJavaScript(`window.scrollTo(0, ${scrollValue});`);
            }, 1000);
            setTimeout(async () => {
                const html = await extractHTMLData(pupperWindow.webContents);
                window?.webContents.send('html-result', html);
                pupperWindow.close();
                clearInterval(interval);
            }, time)
        } catch (error) {
            console.error('Had been a error when window loaded', error);
            pupperWindow.close();
        }
    })
}

