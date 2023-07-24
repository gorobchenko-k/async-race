import { createElement } from '../../helpers';
import { Garage } from './garage/garage';
import './main.css';
import { Winner } from './winner/winner';

const MAIN_STYLE = {
  main: ['main'],
  container: ['main__container', 'container'],
};

class Main {
  private garagePage = new Garage();

  private winnerPage = new Winner();

  constructor() {
    this.createMain();
  }

  private createMain(): void {
    const main = createElement('main', MAIN_STYLE.main);
    const container = createElement('div', MAIN_STYLE.container);
    container.append(this.garagePage.garage, this.winnerPage.winner);
    main.append(container);
    document.body.append(main);
  }
}

export { Main };
