export function recursiveChildren(element: Element, parent?: Element | null): ReactNodeStructure[] {
    const childrens = [...element.children];
    const parentElement = parent || element;
    const childStructure = childrens.map((child) => {
        return {
            element: child,
            parent: parentElement,
            childrens: recursiveChildren(child, child),
        };
    });
    return childStructure;
}

export function findElementInJson(callBack: ElementCallback, root: ReactNodeStructure): ReactNodeStructure | null {
  if (callBack(root.element)) {
      return root;
    }
  
    for (const child of root.childrens) {
      const foundElement = findElementInJson(callBack, child);
      if (foundElement) {
        return foundElement;
      }
    }
  
    return null;
  }
