import { langArr } from './lang';

/**
 * Изменяет язык на странице
 *
 */
function changeLang(page) {
  let lang = 'ru';
  const allLang = ['en', 'ru'];
  const langList = langArr;

  const btnLang = document.querySelector('.lang-btn');
  const title = document.querySelector('title');

  /**
   * Изменяет стилизацию кнопки выбора языка. Прописывает в адрес страницы хэш с указанием языка. Перезагружает страницу. Вызывается при нажатии на кнопку выбора языка
   *
   */
  function changeURLLanguageHandler() {
    if (!btnLang.classList.contains('lang-btn--active')) {
      btnLang.classList.add('lang-btn--active');
      lang = 'en';
    } else {
      btnLang.classList.remove('lang-btn--active');
      lang = 'ru';
    }

    location.href = `${window.location.pathname}#${lang}`;
    location.reload();
  }

  /**
   * Использует язык, указанный в хэше. При необходимости меняет стилизацию кнопки на соответствующую. Производит перевод заголовка страницы и элементов страницы, помеченных классом `.lng-${...}`
   *
   */
  function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    if (!allLang.includes(hash)) {
      location.href = `${window.location.pathname}#ru`;
      location.reload();
    }

    if (hash === 'en') {
      btnLang.classList.add('lang-btn--active');
    } else {
      btnLang.classList.remove('lang-btn--active');
    }

    title.innerHTML = langList[page][hash];

    for (let key in langList) {
      let elems = document.querySelectorAll(`.lng-${key}`);
      elems.forEach((elem) => {
        if (elem) {
          elem.innerHTML = langList[key][hash];
        }
      });
    }
  }

  changeLanguage();

  btnLang.addEventListener('click', changeURLLanguageHandler);
}

export default changeLang;
