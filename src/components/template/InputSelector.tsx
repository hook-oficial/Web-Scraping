import {useEffect } from 'react';
import useInputSelector from '../../hooks/useInputSelector';

interface Props {
    getSelectorResult: (arrNodes: ArrNodesResult) => void;
    jsonDom: ReactNodeStructure[]
}
function InputSelector({ getSelectorResult, jsonDom }: Props) {
    const {handleChange, selectorValue, arrNodesResult} = useInputSelector(jsonDom);
    
    useEffect(() => {
        getSelectorResult(arrNodesResult);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrNodesResult]);

    return (
        <label className="m-12 w-[80%] p-4 text-center">
            <h4 className="font-bold mb-2">Write your HTML selector to find</h4>
            <p>You can search  by any selector, either tag name, class name or id. Even you can find by father to child selector...</p>
            <input onInput={handleChange} value={selectorValue} className="p-4 mt-6 rounded w-full outline-none focus:opacity-80" type="text" placeholder="main.container#id" />
        </label>
    );
}

export default InputSelector;