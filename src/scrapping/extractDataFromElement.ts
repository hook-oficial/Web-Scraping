export function extractDataFromElement(elementArr: Element[], URL_href:string){
    return elementArr.map((element, id)=>{
        const urlRegex = /\bhttp:\/\/localhost:\d{4}\b/;
        const imageElement = ['IMG', 'AUDIO', 'VIDEO'].includes(element.tagName) ? element as HTMLImageElement | HTMLAudioElement | HTMLVideoElement : null;
        const imgSrc = imageElement ? imageElement.src : '';
        const checkLocalHostInSrc = urlRegex.test(imgSrc);
        const imgSrcToUse = checkLocalHostInSrc ? imgSrc.replace(urlRegex, URL_href) : imgSrc;
        const anchorElement = element.tagName == 'A' ? element as HTMLAnchorElement : null;
        const anchorLink = anchorElement ? anchorElement.href : ''; 
        const checkLocalHostInLink = urlRegex.test(anchorLink);
        const anchorToUse = checkLocalHostInLink ? anchorLink.replace(urlRegex, URL_href) : anchorLink;
        return {
            id: String(id),
            element: element.tagName.toLocaleLowerCase(),
            parent: element.parentElement,
            className: element.className,
            idElement: element.id,
            text: element.textContent?.trim(),
            src: imgSrcToUse,
            link: anchorToUse,
            childs: [...element.children]
        }
    });


}