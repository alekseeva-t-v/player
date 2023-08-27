import allMusic from './music-list';

function showAudioPlayer() {
  // Находим сам плеер
  const audioPlayerWrapper = document.querySelector('.audio-player__wrapper');
  const audioPlayer = document.querySelector('#audio-player');
  // Находим блок вывода изображения для композиции
  const musicImg = audioPlayer.querySelector('.audio-player__img-area');
  // Находим блок вывода наименования для композиции
  const musicName = audioPlayer.querySelector(
    '.audio-player__song-details .audio-player__song-name'
  );
  // Находим блок вывода исполнителя для композиции
  const musicArtist = audioPlayer.querySelector(
    '.audio-player__song-details .audio-player__artist'
  );
  // Находим блок вывода самой композиции
  const mainAudio = audioPlayer.querySelector('#main-audio');
  // Находим кнопку ПЛЭЙ / ПАУЗА
  const playPauseBtn = audioPlayer.querySelector('.play-pause');
  // Находим кнопку ВПЕРЕД
  const prevBtn = audioPlayer.querySelector('#prev');
  // Находим кнопку НАЗАД
  const nextBtn = audioPlayer.querySelector('#next');
  // Находим ПРОГРЕСС БАР
  const progressBar = audioPlayer.querySelector('.audio-control__progress-bar');
  // Находим общий блок ПРОГРЕСС БАРА
  const progressArea = audioPlayer.querySelector(
    '.audio-control__progress-area'
  );
  // Находим кнопку ПОВТОР
  const repeatBtn = audioPlayer.querySelector('#repeat-plist');
  const musicList = audioPlayer.querySelector('.music-list');
  const showMoreBtn = audioPlayer.querySelector('#more-music');
  const hideMusicBtn = audioPlayer.querySelector('#close');
  const ulTag = audioPlayer.querySelector('ul');

  let musicIndex = 1;

  /**
   * Создает разметку плей-листа на основе массива песен. Задает для каждой композиции элемент со временем звучания
   *
   */
  function createPlayList() {
    allMusic.forEach((musicElem, indexElem) => {
      let liTag = `
      <li li-index="${indexElem + 1}">
        <div class="music-list__play-pause">
          <i class="material-icons">play_arrow</i>
        </div>
        <div class="music-list__row music-list__info">
          <span>${musicElem.songName}</span>
          <p>${musicElem.artist}</p>
        </div>
        <span id="${musicElem.src}" class="audio-duration">3:40</span>
        <audio class="${musicElem.src}" src ="./files/songs/${
        musicElem.src
      }.mp3"><audio>
      </li>`;

      ulTag.insertAdjacentHTML('beforeend', liTag);

      let liAudioDuration = ulTag.querySelector(`#${musicElem.src}`);
      let liAudioTag = ulTag.querySelector(`.${musicElem.src}`);

      liAudioTag.addEventListener('loadeddata', () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
          totalSec = `0${totalSec}`;
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        liAudioDuration.setAttribute('t-duration', `${totalMin}:${totalSec}`);
      });
    });
  }

  createPlayList();

  /**
   * Загружает композицию ((1) Отображает в разметке название композиции и данные о композиторе; (2) Устанавливает необходимое изображение, как обложку плеера; (3) Устанавливает соответствующее фоновое изображение) (4) Прописывает ссылку на mp3 файл.
   *
   * @param {number} indexNumb Индекс композиции в плей листе.
   */
  function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].songName;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;

    const img = new Image();
    img.src = `./img/jpg/${allMusic[indexNumb - 1].img}.jpg`;
    img.addEventListener('load', () => {
      audioPlayerWrapper.style.backgroundImage = `url(${img.src})`;
      musicImg.style.backgroundImage = `url(${img.src})`;
    });

    mainAudio.src = `./files/songs/${allMusic[indexNumb - 1].src}.mp3`;
  }

  /**
   * Активирует режим ПЛЭЙ ((1) Присваивает аудиоплееру класс paused (2) Меняет значек на кнопке (3) Запускает воспроизведение файла.
   *
   */
  function playMusic() {
    audioPlayer.classList.add('paused');
    playPauseBtn.querySelector('i').innerText = 'pause';
    mainAudio.play();
  }

  /**
   * Активирует режим ПАУЗА ((1) Удаляет у аудиоплеера класс paused (2) Меняет значек на кнопке (3) Останавливает воспроизведение файла.
   *
   */
  function pauseMusic() {
    audioPlayer.classList.remove('paused');
    playPauseBtn.querySelector('i').innerText = 'play_arrow';
    mainAudio.pause();
  }

  /**
   * Задает определенные параметры композиции, которая играет сейчас в плей листе. (1) Находит все пункты плей листа (2) Если есть тег li, li-index которого равен musicIndex, тогда эта музыка сейчас играет, и мы ее стилизуем особым образом
   *
   */
  function playingNow() {
    const allLiTags = ulTag.querySelectorAll('li');

    allLiTags.forEach((liElem) => {
      let audioTag = liElem.querySelector('.audio-duration');

      if (liElem.classList.contains('playing')) {
        liElem.classList.remove('playing');
        let adDuration = audioTag.getAttribute('t-duration');
        audioTag.innerText = adDuration;
        liElem.querySelector('.music-list__play-pause i').innerText =
          'play_arrow';
      }

      if (
        liElem.getAttribute('li-index') == musicIndex &&
        audioPlayer.classList.contains('paused')
      ) {
        liElem.classList.add('playing');
        audioTag.innerText = 'Playing';
        liElem.querySelector('.music-list__play-pause i').innerText = 'pause';
      }
    });
  }

  window.addEventListener('load', () => {
    loadMusic(musicIndex);
    playingNow();
  });

  // Функция для выбора и запуска следующей композиции
  function nextMusic() {
    // Увеличиваем индекс на один
    musicIndex++;
    // Устанавливаем переход после последней мелодии к первой
    musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
    playingNow();
  }

  // Функция для выбора и запуска предыдущей композиции
  function prevMusic() {
    // Уменьшаем индекс на один
    musicIndex--;
    // Устанавливаем переход после первой мелодии к последней
    musicIndex < 1 ? (musicIndex = allMusic.length) : (musicIndex = musicIndex);
    loadMusic(musicIndex);
    playMusic();
    playingNow();
  }

  // Настраиваем поведение после нажатия на кнопку ПЛЭЙ / ПАУЗА
  playPauseBtn.addEventListener('click', () => {
    // Задаем переменную для проверки наличия класса
    const isMusicPaused = audioPlayer.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
  });

  // Настраиваем поведение после нажатия на кнопку ВПЕРЕД
  nextBtn.addEventListener('click', () => {
    nextMusic();
  });

  // Настраиваем поведение после нажатия на кнопку НАЗАД
  prevBtn.addEventListener('click', () => {
    prevMusic();
  });

  // Обновляем прогресс бар в соответствии с текущим временем звучания
  mainAudio.addEventListener('timeupdate', (event) => {
    // Получаем текущее время звучания композиции
    const currentTime = event.target.currentTime;
    // Получаем общее время звучания композиции
    const duration = event.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    // Находим блок для вывода текущего времени звучания композиции
    let musicCurrentTime = audioPlayer.querySelector('.audio-control__current');
    // Находим блок для вывода общего времени звучания композиции
    let musicDuration = audioPlayer.querySelector('.audio-control__duration');

    mainAudio.addEventListener('loadeddata', () => {
      // Обновляем общую продолжительность песни
      let audioDuration = mainAudio.duration;
      let totalMin = Math.floor(audioDuration / 60);
      let totalSec = Math.floor(audioDuration % 60);
      if (totalSec < 10) {
        totalSec = `0${totalSec}`;
      }
      musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    // Обновляем текущее время звучания песни
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });

  // Обновляем текущее время воспроизведения песни в соответствии с шириной индикатора выполнения
  progressArea.addEventListener('click', (event) => {
    // получаем ширину прогресс бара
    let progressWidthVal = progressArea.clientWidth;
    // Получаем значение смещения по оси X
    let clickedOffSetX = event.offsetX;
    // Получаем общую продолжительность песни
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;

    playMusic();
  });

  // Работаем над блоком управления звуком

  // Находим кнопку ОТКЛЮЧЕНИЯ / ВКЛЮЧЕНИЯ ЗВУКА
  const volumeButton = audioPlayer.querySelector('.volume__button');

  // Настраиваем поведение при нажатии на кнопку ОТКЛЮЧЕНИЯ / ВКЛЮЧЕНИЯ ЗВУКА
  volumeButton.addEventListener('click', () => {
    const volumeEl = audioPlayer.querySelector('.volume__container i');
    mainAudio.muted = !mainAudio.muted;
    if (mainAudio.muted) {
      volumeEl.innerText = 'volume_off';
    } else {
      volumeEl.innerText = 'volume_up';
    }
  });

  // Настраиваем поведение ползунка громкости

  // Находим блок ползунка
  const volumeSlider = audioPlayer.querySelector('.volume__slider');
  volumeSlider.addEventListener(
    'click',
    (event) => {
      const sliderWidth = window.getComputedStyle(volumeSlider).width;
      const newVolume = event.offsetX / parseInt(sliderWidth);
      mainAudio.volume = newVolume;
      audioPlayer.querySelector('.volume__percentage').style.width =
        newVolume * 100 + '%';
    },
    false
  );

  // Работаем над повторами, зацикливаем песню при нажатии на иконку
  repeatBtn.addEventListener('click', () => {
    // Сначала мы получаем innerText иконки, затем мы изменим его соответствующим образом
    let getText = repeatBtn.innerText;
    // Cделаем разные изменения при щелчке по другому значку с помощью switch
    switch (getText) {
      case 'repeat': // если иконка repeat, меняем ее на repeat-one
        repeatBtn.innerText = 'repeat_one';
        repeatBtn.setAttribute('title', 'Song looped');
        break;
      case 'repeat_one': // если иконка repeat_one, меняем ее на shuffle
        repeatBtn.innerText = 'shuffle';
        repeatBtn.setAttribute('title', 'Playback shuffle');
        break;
      case 'shuffle': // если иконка shuffle, меняем ее на repeat
        repeatBtn.innerText = 'repeat';
        repeatBtn.setAttribute('title', 'Playlist looped');
        break;
    }
  });

  // После того, как песня закончилась
  mainAudio.addEventListener('ended', () => {
    // Мы будем делать в соответствии со значком т.е., если пользователь установил значок для зацикливания песни, мы повторим текущую песню и будем делать дальше соответственно
    let getText = repeatBtn.innerText; // получение внутреннего текста иконки
    // Делаем разные изменения при щелчке по другому значку с помощью переключателя
    switch (getText) {
      case 'repeat': // Если этот значок repeat, то просто вызываем функцию nextMusic, чтобы воспроизвести следующую песню.
        nextMusic();
        break;
      case 'repeat_one': // Если этот значок repeat_one,  мы изменим текущее время воспроизводимой песни на 0, поэтому песня будет воспроизводиться с самого начала.
        mainAudio.currentTime = 0;
        loadMusic(musicIndex);
        playMusic();
        break;
      case 'shuffle':
        // Генерируем рандомный индекс между максимальным диапазоном длины массива
        let randIndex = Math.floor(Math.random() * allMusic.length + 1);
        do {
          randIndex = Math.floor(Math.random() * allMusic.length + 1);
        } while (musicIndex == randIndex); /// этот цикл продолжается до тех пор, пока следующее случайное число не будет совпадать с текущим музыкальным индексом
        musicIndex = randIndex; // передаем randomIndex в MusicIndex, т.о. будет воспроизводиться случайная песня
        loadMusic(musicIndex);
        playMusic();
        playingNow();
        break;
    }
  });

  // Настраиваем поведение при нажатии на кнопку ПЛЕЙЛИСТ
  showMoreBtn.addEventListener('click', () => {
    // Плейлист отображается за счет присвоения соответствующего класса
    musicList.classList.toggle('show');
  });

  // Настраиваем поведение при нажатии на кнопку ЗАКРЫТЬ в плейлисте
  hideMusicBtn.addEventListener('click', () => {
    showMoreBtn.click();
  });
}

export default showAudioPlayer;
