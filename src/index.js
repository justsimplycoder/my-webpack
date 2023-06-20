import logoGitHub from './img/logo-github.svg';
import './styles/main.scss';

class Game {
	name = 'Game name!!!!!'
}
const myGame = new Game();

const p = document.createElement('p');
p.textContent = `I like ${myGame.name}.`;

const heading = document.createElement('h1');
heading.textContent = 'Webpack start!';
const root = document.querySelector('#root');
root.append(heading, p);