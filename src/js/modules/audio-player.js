import allMusic from './music-list';

/**
 * Инициализирует работу плеера
 *
 */
function showAudioPlayer() {
  const audioPlayerWrapper = document.querySelector('.audio-player__wrapper');
  const audioPlayer = document.querySelector('#audio-player');
  const musicImg = audioPlayer.querySelector('.audio-player__img-area');
  const musicName = audioPlayer.querySelector(
    '.audio-player__song-details .audio-player__song-name'
  );
  const musicArtist = audioPlayer.querySelector(
    '.audio-player__song-details .audio-player__artist'
  );
  const mainAudio = audioPlayer.querySelector('#main-audio');
  const playPauseBtn = audioPlayer.querySelector('.play-pause');
  const prevBtn = audioPlayer.querySelector('#prev');
  const nextBtn = audioPlayer.querySelector('#next');
  const progressBar = audioPlayer.querySelector('.audio-control__progress-bar');
  const progressArea = audioPlayer.querySelector(
    '.audio-control__progress-area'
  );
  const repeatBtn = audioPlayer.querySelector('#repeat-plist');
  const musicList = audioPlayer.querySelector('.music-list');
  const showMoreBtn = audioPlayer.querySelector('#more-music');
  const hideMusicBtn = audioPlayer.querySelector('#close');
  const ulTag = audioPlayer.querySelector('ul');
  const volumeButton = audioPlayer.querySelector('.volume__button');
  const volumeSlider = audioPlayer.querySelector('.volume__slider');

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

  /**
   * Выбирает и запускает следующую мелодию (1) Увеличивает индекс композиции на единицу (2) Устанавливаем переход после последней мелодии к первой (3) Загружаем и запускаем мелодию, меняем для нее стили в плей листе с помощью соответствующих функций
   *
   */
  function nextMusic() {
    musicIndex++;
    musicIndex = musicIndex > allMusic.length ? 1 : musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
  }

  /**
   * Выбирает и запускает предыдущую мелодию (1) Уменьшает индекс композиции на единицу (2) Устанавливаем переход после первой мелодии к последней (3) Загружаем и запускаем мелодию, меняем для нее стили в плей листе с помощью соответствующих функций
   *
   */
  function prevMusic() {
    musicIndex--;
    musicIndex = musicIndex < 1 ? allMusic.length : musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
  }

  createPlayList();

  window.addEventListener('load', () => {
    loadMusic(musicIndex);
    playingNow();
  });

  playPauseBtn.addEventListener('click', () => {
    const isMusicPaused = audioPlayer.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
  });

  nextBtn.addEventListener('click', () => {
    nextMusic();
  });

  prevBtn.addEventListener('click', () => {
    prevMusic();
  });

  mainAudio.addEventListener('timeupdate', (event) => {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = audioPlayer.querySelector('.audio-control__current');
    let musicDuration = audioPlayer.querySelector('.audio-control__duration');

    mainAudio.addEventListener('loadeddata', () => {
      let audioDuration = mainAudio.duration;
      let totalMin = Math.floor(audioDuration / 60);
      let totalSec = Math.floor(audioDuration % 60);
      if (totalSec < 10) {
        totalSec = `0${totalSec}`;
      }
      musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
      currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });

  progressArea.addEventListener('click', (event) => {
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = event.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;

    playMusic();
  });

  volumeButton.addEventListener('click', () => {
    const volumeEl = audioPlayer.querySelector('.volume__container i');
    mainAudio.muted = !mainAudio.muted;
    if (mainAudio.muted) {
      volumeEl.innerText = 'volume_off';
    } else {
      volumeEl.innerText = 'volume_up';
    }
  });

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

  repeatBtn.addEventListener('click', () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
      case 'repeat':
        repeatBtn.innerText = 'repeat_one';
        repeatBtn.setAttribute('title', 'Song looped');
        break;
      case 'repeat_one':
        repeatBtn.innerText = 'shuffle';
        repeatBtn.setAttribute('title', 'Playback shuffle');
        break;
      case 'shuffle':
        repeatBtn.innerText = 'repeat';
        repeatBtn.setAttribute('title', 'Playlist looped');
        break;
    }
  });

  mainAudio.addEventListener('ended', () => {
    let getText = repeatBtn.innerText;
    switch (getText) {
      case 'repeat':
        nextMusic();
        break;
      case 'repeat_one':
        mainAudio.currentTime = 0;
        loadMusic(musicIndex);
        playMusic();
        break;
      case 'shuffle':
        let randIndex = Math.floor(Math.random() * allMusic.length + 1);
        do {
          randIndex = Math.floor(Math.random() * allMusic.length + 1);
        } while (musicIndex == randIndex);
        musicIndex = randIndex;
        loadMusic(musicIndex);
        playMusic();
        playingNow();
        break;
    }
  });

  showMoreBtn.addEventListener('click', () => {
    musicList.classList.toggle('show');
  });

  hideMusicBtn.addEventListener('click', () => {
    showMoreBtn.click();
  });
}

export default showAudioPlayer;
