let headingText: string = "Заголовок первого уровня.";

const heading = document.createElement('h1');
heading.textContent = headingText;
const root = document.querySelector('#root');
root.append(heading);