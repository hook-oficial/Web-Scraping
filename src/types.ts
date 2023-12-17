interface ReactNodeStructure {
    element: Element;
    parent: Element | undefined | null;
    childrens: ReactNodeStructure[];
  }

interface WebSiteData {
  title:string, description:string, logo:string, URL_href:string
}

type ElementCallback = (element: Element) => boolean;

interface NodeElementList {
    id: string;
    element: string;
    parent: HTMLElement | null;
    className: string;
    idElement: string;
    text: string | undefined;
    src: string;
    link: string;
    childs: Element[];
}[]

type ArrNodesResult = NodeElementList[]