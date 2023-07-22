import { createElement } from '../../helpers';
import './footer.css';

const FOOTER_STYLE = {
  footer: ['footer'],
  container: ['footer__container', 'container'],
  linkRss: ['footer__logo'],
};

const FOOTER_TEXT = {
  span: '©2023 by ',
  linkGitHub: 'gorobchenko-k',
};

const FOOTER_LINK = {
  linkGitHub: 'https://github.com/gorobchenko-k',
  linkRss: 'https://rs.school/js/',
};

class Footer {
  constructor() {
    this.createFooter();
  }

  private createFooter(): void {
    const footer = createElement('footer', FOOTER_STYLE.footer);
    const container = createElement('div', FOOTER_STYLE.container);
    const span = createElement('span', [], FOOTER_TEXT.span);
    const linkGitHub = createElement('a', [], FOOTER_TEXT.linkGitHub);
    const linkRss = createElement('a', FOOTER_STYLE.linkRss);

    linkGitHub.href = FOOTER_LINK.linkGitHub;
    linkRss.href = FOOTER_LINK.linkRss;

    span.append(linkGitHub);
    container.append(span, linkRss);
    footer.append(container);
    document.body.append(footer);
  }
}

export { Footer };
