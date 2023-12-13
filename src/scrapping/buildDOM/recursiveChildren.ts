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

export function findElementInJson(root: ReactNodeStructure, element: Element): ReactNodeStructure | null {
  if (root.element === element) {
      return root;
    }
  
    for (const child of root.childrens) {
      const foundElement = findElementInJson(child, element);
      if (foundElement) {
        return foundElement;
      }
    }
  
    return null;
  }