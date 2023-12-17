import { useEffect, useState } from "react";
import { findElementInJson, recursiveChildren } from "../scrapping/buildDOM/recursiveChildren";

export default function useRenderDOM(DOM: Document, loadJsonDomToInput: (d: ReactNodeStructure[])=>void){
    const [jsonDom, setJsonDom] = useState<ReactNodeStructure[]>([]);
    const [currentJsonDom, setcurrentJsonDom] = useState<ReactNodeStructure[]>();
    const mapDOM=()=>{
        const prevDomData = {
            element: DOM.body, 
            parent: null, 
            childrens: recursiveChildren(DOM.body)
        };
        setJsonDom([prevDomData]);
        setcurrentJsonDom([prevDomData]);
        loadJsonDomToInput([prevDomData]);
    };
    useEffect(() => {
        mapDOM();
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const findChildrens=(element: Element)=>{
        if(!currentJsonDom) return;
        jsonDom.forEach(dom=>{
            const currentJsonFind = findElementInJson((elementCb)=>  element === elementCb, dom);
            if(currentJsonFind){
                setcurrentJsonDom([currentJsonFind]);
            }
        })
    }
    return {
        findChildrens, currentJsonDom
    }
}