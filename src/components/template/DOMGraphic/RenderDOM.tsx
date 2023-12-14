import { findElementInJson, recursiveChildren } from "../../../scrapping/buildDOM/recursiveChildren";
import TreeBranch from "./TreeBranch";
import {useState, useEffect} from 'react';

interface Props {
    DOM: Document,
    loadJsonDomToInput: (dom: ReactNodeStructure[])=>void
}
function RenderDOM({ DOM, loadJsonDomToInput }: Props) {
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

    return (
        <div className="text-center">
            <p className="mt-4">DOM graphic representation</p>
            <div className="mt-4">
                {currentJsonDom && currentJsonDom.map((dom, i)=>(
                    <TreeBranch key={i} findChildrens={findChildrens} dom={dom} indexParent={i}/>
                ))}
            </div>
        </div>
    );
}

export default RenderDOM;