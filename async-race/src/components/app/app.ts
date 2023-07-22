import { Header } from '../header/header';
import { Main } from '../pages/main';
import { Footer } from '../footer/footer';

class App {
  private header = new Header();

  private main = new Main();

  private footer = new Footer();

  public start(): void {}
}

export { App };
