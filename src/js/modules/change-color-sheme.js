/**
 * Изменяет цветовую схему сайта
 *
 */
function changeColorSheme() {
  const btnDarkMode = document.querySelector('.light-mode-btn');
  const main = document.querySelector('.main');

  /**
   * Активирует светлую тему
   *
   */
  function activateLightSheme() {
    btnDarkMode.classList.add('light-mode-btn--active');
    main.classList.add('light');
  }

  /**
   * Активирует темную тему
   *
   */
  function activateDarcSheme() {
    btnDarkMode.classList.remove('light-mode-btn--active');
    main.classList.remove('light');
  }

  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    activateLightSheme();
  }

  if (localStorage.getItem('darkMode') === 'dark') {
    activateDarcSheme();
  } else if (localStorage.getItem('darkMode') === 'light') {
    activateLightSheme();
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (event) => {
      const newColorSheme = event.matches ? 'dark' : 'light';

      if (newColorSheme === 'dark') {
        activateDarcSheme();
        localStorage.setItem('darkMode', 'dark');
      } else {
        activateLightSheme();
        localStorage.setItem('darkMode', 'light');
      }
    });

  btnDarkMode.addEventListener('click', () => {
    btnDarkMode.classList.toggle('light-mode-btn--active');
    const isLight = main.classList.toggle('light');

    if (isLight) {
      localStorage.setItem('darkMode', 'light');
    } else {
      localStorage.setItem('darkMode', 'dark');
    }
  });
}

export default changeColorSheme;
