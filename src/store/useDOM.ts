import {create} from 'zustand';

interface DOMStateTypes {
    DOM: Document | null,
    webSiteData: WebSiteData, 
    copySelectorText: string,
    setDOM: (newDom:Document | null)=>void,
    setWebSiteData:(newWebSiteData: WebSiteData)=> void,
    setCopySelectorText: (newSelector: string) => void
}

export const useDOM = create<DOMStateTypes>((set)=>({
    DOM: null,
    webSiteData: {title:'',description: '',logo: '', URL_href: ''},
    copySelectorText: '',
    setDOM:(newDom)=> set(()=> ({DOM: newDom})),
    setWebSiteData:(newWebSiteData)=> set(()=> ({webSiteData: newWebSiteData})),
    setCopySelectorText:(newSelectorText)=> set(()=>({copySelectorText: newSelectorText}))
}))