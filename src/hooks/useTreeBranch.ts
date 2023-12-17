import { useDOM } from "../store/useDOM";
import { MouseEvent } from "react";

export default function useTreeBranch(){
    const { setCopySelectorText } = useDOM();

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

 
    const handleClickChild = (e: MouseEvent<HTMLHeadingElement>) => (selector:string) => {
        e.preventDefault();
        setCopySelectorText(selector);
    };

    return {getNodeText, handleClickChild}
}