import logoGitHub from './img/logo-github.svg';
import './styles/main.scss';

class Game {
	name = 'Gothic 2'
}
const myGame = new Game();

const p = document.createElement('p');
p.textContent = `Мне нравится "${myGame.name}"!`;

const heading = document.createElement('h1');
heading.textContent = 'Webpack start!';
const root = document.querySelector('#root');
root.append(heading, p);