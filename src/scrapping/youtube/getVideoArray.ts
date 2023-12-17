import { turnUniqueObjArray } from "../../helpers/turnUniqueObjArray";

export default function getVideoArray(videoHtmlSelector: NodeList){
    const videos = [...videoHtmlSelector];
    const youtubeLink = 'https://youtube.com/';
    
      const arrayVideos = [...videos].map((video)=>{
        const videoElement = video as HTMLElement;
        const videoTitle = videoElement.querySelector('#video-title');
        const linkVideoLocal = videoElement.querySelector('a')?.href?.split('watch');
        if(!linkVideoLocal) return;
        const linkVideo = `${youtubeLink}watch${linkVideoLocal[1]}`;
        const textTitle = videoTitle?.textContent;
        const thumbnailVideo = videoElement.querySelector('img')?.src;
        return {
          title: textTitle, 
          linkVideo,
          img: thumbnailVideo
        }
      });
      return turnUniqueObjArray(arrayVideos, 'title');
}