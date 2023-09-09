import showBody from './modules/show-body';
import changeColorSheme from './modules/change-color-sheme';
import showSlider from './modules/slider';

setTimeout(showBody, 0);
changeColorSheme();
showSlider();

const aboutMenuTop = document.querySelector('.lng-about-project');
aboutMenuTop.classList.add('menu__link--active');