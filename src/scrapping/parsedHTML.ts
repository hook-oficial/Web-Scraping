export default function parsedHTML(html:string){
    const parser = new DOMParser();
    const convertedHtml = parser.parseFromString(html, "text/html");
    return convertedHtml;
};