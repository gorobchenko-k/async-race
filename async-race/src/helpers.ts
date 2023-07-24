export const getElement = <TElement extends Element = HTMLElement>(selector: string, scope?: HTMLElement): TElement => {
  const element: TElement | null = (scope || document).querySelector(selector);
  if (!element) throw new Error(`Element ${selector} does not exist`);

  return element;
};

export const getElements = <E extends Element = Element>(selector: string, scope?: HTMLElement): NodeListOf<E> => {
  const elements = (scope || document).querySelectorAll<E>(selector);
  return elements;
};

export const createElement = <K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  classes: string[],
  content?: string,
  idName?: string
): HTMLElementTagNameMap[K] => {
  const element = document.createElement(tagName);
  if (classes) {
    element.classList.add(...classes);
  }
  if (content) element.textContent = content;
  if (idName) element.setAttribute('id', idName);
  return element;
};
