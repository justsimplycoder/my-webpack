let headingText: string = "Заголовок второго уровня.";

const heading2 = document.createElement('h2');
heading2.textContent = headingText;
const root = document.querySelector('#root');
root.append(heading2);