import parsedHTML from "./parsedHTML";

interface DataHTMLFromElectron{
  DOM: Document | null, 
  webSiteData: WebSiteData
}

export default function getHtmlFromElectron():Promise<DataHTMLFromElectron> {
  return new Promise((resolve, reject) => {
    window.ipcRenderer.once('html-result', (_, htmlData) => {
      try {
        const { title, description, logo, DOM, URL_href } = htmlData;
        const viteDOM = parsedHTML(DOM);
        const allTagsScripts = viteDOM.querySelectorAll('script');
        allTagsScripts.forEach(script => script.remove())
        const allTagsLinks = viteDOM.querySelectorAll('link');
        allTagsLinks.forEach(link => link.remove());
        const webSiteData = { title, description, logo, URL_href};
        const result = { DOM: viteDOM, webSiteData };
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
}