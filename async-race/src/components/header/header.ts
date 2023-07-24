import './header.css';
import { createElement, getElement, getElements } from '../../helpers';

const HEADER_STYLE = {
  header: ['header'],
  container: ['header__container', 'container'],
  title: ['header__title'],
  menu: ['header__menu'],
  link: ['header__link'],
};

const HEADER_TEXT = {
  title: 'Async race',
  links: ['Garage', 'Winner'],
};

class Header {
  constructor() {
    this.createHeader();
  }

  private createHeader(): void {
    const header = createElement('header', HEADER_STYLE.header);
    const container = createElement('div', HEADER_STYLE.container);
    const title = createElement('h1', HEADER_STYLE.title, HEADER_TEXT.title);
    const menu = createElement('ul', HEADER_STYLE.menu);

    HEADER_TEXT.links.forEach((linkText) => {
      const link = createElement('li', [...HEADER_STYLE.link, `${linkText.toLowerCase()}-link`], linkText);
      link.addEventListener('click', () => this.linkHandler(linkText));
      menu.append(link);
    });

    container.append(title, menu);
    header.append(container);
    document.body.append(header);
  }

  private linkHandler(pageName: string): void {
    const pages = getElements('.page');
    const currentPage = getElement(`.${pageName.toLowerCase()}`);
    pages.forEach((page) => {
      page.classList.add('hidden');
    });
    currentPage.classList.remove('hidden');
  }
}

export { Header };
