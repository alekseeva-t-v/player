import showBody from './modules/show-body';
import changeColorSheme from './modules/change-color-sheme';
import changeLang from './modules/change-lang';
import showAudioPlayer from './modules/audio-player';

// const lang = window.location.hash.substr(1);

setTimeout(showBody, 0);
changeColorSheme();
changeLang('page-main');
showAudioPlayer();
