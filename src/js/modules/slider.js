/**
 * Отвечает за работу слайдера. Периодическая смена слайдев. Управление с помощью кнопок-точек
 *
 */
function showSlider() {
  const slidesList = document.querySelectorAll('.about__slide');
  const dotsList = document.querySelectorAll('.about__dot');

  let index = 0;

  /**
   * Отвечает за смену активного слайда. Удаляет активный класс у всех слайдов, добавляет активный класс, выбранному слайду
   *
   * @param {number} slideIndex Индекс активного слайда.
   */
  function activeSlide(slideIndex) {
    slidesList.forEach((slide) => {
      slide.classList.remove('about__slide--active');
    });

    slidesList[slideIndex].classList.add('about__slide--active');
  }

  /**
   * Отвечает за смену активной кнопки-точки. Удаляет активный класс у всех кнопок-точек, добавляет активный класс, конкретной кнопке-точке
   *
   * @param {number} dotIndex Индекс активной кнопки-точки.
   */
  function activeDot(dotIndex) {
    dotsList.forEach((dot) => {
      dot.classList.remove('about__dot--active');
    });

    dotsList[dotIndex].classList.add('about__dot--active');
  }

  /**
   * Объединяет и одновременно вызывает функции смены активного слайда и активной кнопки-точки
   *
   * @param {number} index Индекс активного элемента.
   */
  function prepareCurrentSlide(index) {
    activeSlide(index);
    activeDot(index);
  }

  /**
   * Отвечает за переключение слайда на следующий. Если слайд последний, происходит переключение на первый слайд
   *
   */
  function nextSlide() {
    if (index === slidesList.length - 1) {
      index = 0;
      prepareCurrentSlide(index);
    } else {
      index++;
      prepareCurrentSlide(index);
    }
  }

  dotsList.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      prepareCurrentSlide(dotIndex);
    });
  });

  setInterval(nextSlide, 4000);
}

export default showSlider;
