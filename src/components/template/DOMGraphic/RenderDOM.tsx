import useRenderDOM from "../../../hooks/useRenderDOM";
import TreeBranch from "./TreeBranch";

interface Props {
    DOM: Document,
    loadJsonDomToInput: (dom: ReactNodeStructure[])=>void
}
function RenderDOM({ DOM, loadJsonDomToInput }: Props) {
    const {findChildrens, currentJsonDom} = useRenderDOM(DOM, loadJsonDomToInput);
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