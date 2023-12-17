import { ChangeEvent, useState, useEffect } from 'react';
import { useDOM } from '../store/useDOM';
import specialSelectors from '../constants/specialSelectors';
import { findElementInJson } from '../scrapping/buildDOM/recursiveChildren';
import { extractDataFromElement } from '../scrapping/extractDataFromElement';

export default function useInputSelector(jsonDom: ReactNodeStructure[]){
    const { DOM, copySelectorText, webSiteData } = useDOM();
    const [selectorValue, setSelectorValue] = useState('');
    const [arrNodesResult, setArrNodesResult] = useState<ArrNodesResult>([]);

    const validateSelector = (selector: string) => {
        try {
            document.querySelector(selector);
            return true;
        } catch (error) {
            return false;
        }
    }

    const getSpecialSelector = (selector:string) => {
        const specialSelectorsKeys = {
            [specialSelectors.getAllTexts]: `h1, h2, h3, h4, h5, h6, p, li, strong, b, small, span`,
            [specialSelectors.link]: `a`,
            [specialSelectors.media]: `img, audio, video`
        };
    
        const parts = selector.split(/\s+/);
        const specialSelector = parts[parts.length - 1];
        const checkRegexIsText = /^".*"$/;

        if(checkRegexIsText.test(selector)){
            for(const dom of jsonDom){
                const selectorClean = selector?.match(/^"(.*?)"$/)?.[1];
                if(!selectorClean) return null;
                const findElement = findElementInJson((e)=> {
                    const textContent = e.textContent?.replace(/\s+/g, ' ')?.trim()?.toLowerCase();
                    return textContent === selectorClean;
                }, dom);
                if(!findElement) return null;
                const {parent, element} = findElement;
                console.log(findElement)
                const regex = /\s*[^ ]*:[^ ]*\s*|\S*\[.*?\]\S*|\S*\[.*?\]/g;
                const classNameToUse = element.className.replace(regex, '');
                const selectorResult = `${parent?.tagName} ${element.tagName}${classNameToUse.trim() ? "." + classNameToUse.split(' ').join('.') : ''}`;
                return !validateSelector(selectorResult) ? null : selectorResult
            }
        }

        if (parts.length > 1 && specialSelectorsKeys[specialSelector]) {
            const parentSelectors = parts.slice(0, -1).join(' ');
            if (specialSelectorsKeys[specialSelector].includes(',')) {
                const textSelectors = specialSelectorsKeys[specialSelector]
                    .split(',')
                    .map(textSelector => `${parentSelectors} ${textSelector.trim()}`)
                    .join(', ');
                return textSelectors;
            }
            return `${parentSelectors} ${specialSelectorsKeys[specialSelector]}`;
        }
        return specialSelectorsKeys[selector] || (!validateSelector(selector) ? null : selector);
    };

    const buildArrayResult = (query: string) => {
        if (!query) return [];
        const queryToUse = getSpecialSelector(query);
        if (!queryToUse) return [];
        const result = DOM?.querySelectorAll(queryToUse);
        if (!result) return [];
        const mapResult = extractDataFromElement([...result], webSiteData.URL_href);
        return mapResult;
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        if (!(input && input instanceof HTMLInputElement)) return;
        const value = input.value.toLowerCase();
        setSelectorValue(value);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            const arrResult = buildArrayResult(selectorValue);
            setArrNodesResult(arrResult);
        }, 1200);
        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectorValue]);

    useEffect(() => {
        if (!copySelectorText) return;
        setSelectorValue(copySelectorText.toLowerCase());
    }, [copySelectorText]);

    return {
        handleChange,
        selectorValue,
        arrNodesResult
    }
}