interface ReactNodeStructure {
    element: Element;
    parent: Element | undefined | null;
    childrens: ReactNodeStructure[];
  }

interface WebSiteData {
  title:string, description:string, logo:string, URL_href:string
}