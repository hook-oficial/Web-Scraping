import { useDOM } from "../../../store/useDOM";
import {MouseEvent} from 'react';

interface Props {
    dom: ReactNodeStructure,
    indexParent: number,
    findChildrens: (el: Element) => void
}
function TreeBranch({ dom, indexParent, findChildrens }: Props) {
    const { setCopySelectorText } = useDOM();
    const key = `${dom.element.tagName}-${Math.random() * indexParent}`;
    const { childrens, parent } = dom;

    const getNodeText = (node: Element | null) => {
        if (!node) return {tagName: '', className: '', id:''};
        const { tagName, className, id } = node;
        const classNameNoSpace = className && typeof className == 'string' ?  className.replace(/\s/g, '.') : '';
        const classNameToUse = classNameNoSpace.replace(/\.[^.\s]*:[^.\s]*/g, '');
        const allSelector = `${node.parentElement?.tagName.toLowerCase()} ${tagName}${className ? '.' + classNameToUse : ''}${id ? '#' + id : ''}`
        return {
            tagName,
            className: className ? '.' + classNameToUse : '',
            id: id ? '#' + id : '',
            allSelector
        }
    }

    const createNodeText = (node: Element | null) => {
        if (node) {
            const { tagName, className, id } = getNodeText(node);
            return (
                <>
                    <span>{tagName}</span>
                    <span className="text-emerald-600">{className }</span>
                    <span className="text-yellow-600">{id}</span>
                </>
            );
        }
    }
    const handleClickChild = (e: MouseEvent<HTMLHeadingElement>) => (selector:string) => {
        e.preventDefault();
        setCopySelectorText(selector);
    };

    const nodeClasses = 'rounded-lg bg-gray-800 text-white p-4 font-medium text-center break-words';
    return (
        <div key={key} className=" m-4 flex flex-col justify-center  items-center mt-8">
            <h3 className={`${nodeClasses} w-[220px] `}>
                {createNodeText(dom.element)}
            </h3>
            <div className="flex justify-center flex-wrap mt-8">
                {childrens.length > 0 ?
                    childrens.map((children, key) => {
                        const {allSelector} = getNodeText(children.element);
                        return (allSelector && 
                        <h3 onClick={() => findChildrens(children.element)} 
                            onContextMenu={(e)=>handleClickChild(e)(allSelector)}
                            key={(Math.random() * key)} 
                            className={`${nodeClasses} mt-4 w-[200px] select-none cursor-pointer hover:opacity-80 mx-2`}>
                            {createNodeText(children.element)}
                        </h3>)
                    }
                    )
                    : <h4>This element don't have childrens</h4>
                }
            </div>
            {
                parent && <button onClick={() => findChildrens(parent)} className="bg-blue-600 p-3 rounded-md mt-5 font-medium px-4 hover:opacity-80">Back to father</button>
            }
        </div>
    );
}

export default TreeBranch;



