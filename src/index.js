import logWebpack from './img/logo-webpack.svg';
import './styles/main.scss';
import text from './helpers.json';
import WebpackInfo from './WebpackInfo.js';

const myWebpackInfo = new WebpackInfo();

const p = document.createElement('p');
p.textContent = `Мне нравится ${myWebpackInfo.name} ${myWebpackInfo.version}!`;

const heading = document.createElement('h1');
heading.textContent = text.header;

const logo = new Image();
logo.src = logWebpack;
logo.width = 200;

const root = document.querySelector('#root');
root.append(heading, p, logo);