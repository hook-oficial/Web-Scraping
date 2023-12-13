import parsedHTML from "./parsedHTML";
import getVideoArray from "./youtube/getVideoArray";

export default function getHtmlFromElectron(){
  window.ipcRenderer.on('html-result',(_e, textHTML)=>{
      const html = parsedHTML(textHTML);
      const videoResult = html.querySelectorAll('.ytd-rich-item-renderer');
      const arrayVideos = getVideoArray(videoResult);
      console.log(arrayVideos);
    });
};