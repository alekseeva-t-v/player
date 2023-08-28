!function(){"use strict";const e={"page-main":{ru:"Аудио плеер",en:"Audio player"},"about-project":{ru:"О проекте",en:"About the project"},"project-title":{ru:"Аудио плеер",en:"Audio player"},"project-desc":{ru:"Музыкальный плеер, позволяющий по очереди проигрывать музыкальные треки или перелистывать их кликами по кнопкам. Каждому музыкальному треку соответствует определённое фоновое изображение. Адаптивная верстка для экранов 320px и выше.",en:"A music player that allows you to play music tracks one by one or scroll through them by clicking on the buttons. Each music track has a specific background image. Responsive layout for screens 320px and above."},progect:{ru:"Проект",en:"Project"},mini:{ru:"мини",en:"mini"},portfolio:{ru:"Портфолио",en:"Portfolio"},skills:{ru:"Навыки",en:"Skills"},contacts:{ru:"Контакты",en:"Contacts"},copy:{ru:"Алексеева Татьяна",en:"Alekseeva Tatyana"}};var t=[{songName:"Moonlight Sonata",artist:"Paul Pitman",img:"music-1",src:"music-1"},{songName:"Nocturne in B flat minor",artist:"Eduardo Vinuela",img:"music-2",src:"music-2"},{songName:"Cello Suite no. 1",artist:"Accou",img:"music-3",src:"music-3"},{songName:"Sonata 5 (II) Allegro",artist:"Telemann Trio",img:"music-4",src:"music-4"},{songName:"Etude Op. 25 no. 1",artist:"Donald Betts",img:"music-5",src:"music-5"},{songName:"Greensleeves to a Ground",artist:"Ariel Martin Bellio",img:"music-6",src:"music-6"},{songName:"Twelve Spanish Dances, Op. 37",artist:"Monica Alianello",img:"music-7",src:"music-7"}];setTimeout((function(){document.querySelector("body").classList.add("body_visible")}),0),function(){const e=document.querySelector(".light-mode-btn"),t=document.querySelector(".main");function a(){e.classList.add("light-mode-btn--active"),t.classList.add("light")}function r(){e.classList.remove("light-mode-btn--active"),t.classList.remove("light")}window.matchMedia&&window.matchMedia("(prefers-color-scheme: light)").matches&&a(),"dark"===localStorage.getItem("darkMode")?r():"light"===localStorage.getItem("darkMode")&&a(),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(e=>{"dark"==(e.matches?"dark":"light")?(r(),localStorage.setItem("darkMode","dark")):(a(),localStorage.setItem("darkMode","light"))})),e.addEventListener("click",(()=>{e.classList.toggle("light-mode-btn--active"),t.classList.toggle("light")?localStorage.setItem("darkMode","light"):localStorage.setItem("darkMode","dark")}))}(),function(t){let a="ru";const r=["en","ru"],i=e,n=document.querySelector(".lang-btn"),o=document.querySelector("title");!function(){let e=window.location.hash;e=e.substr(1),r.includes(e)||(location.href=`${window.location.pathname}#ru`,location.reload()),"en"===e?n.classList.add("lang-btn--active"):n.classList.remove("lang-btn--active"),o.innerHTML=i[t][e];for(let t in i)document.querySelectorAll(`.lng-${t}`).forEach((a=>{a&&(a.innerHTML=i[t][e])}))}(),n.addEventListener("click",(function(){n.classList.contains("lang-btn--active")?(n.classList.remove("lang-btn--active"),a="ru"):(n.classList.add("lang-btn--active"),a="en"),location.href=`${window.location.pathname}#${a}`,location.reload()}))}("page-main"),function(){const e=document.querySelector(".audio-player__wrapper"),a=document.querySelector("#audio-player"),r=a.querySelector(".audio-player__img-area"),i=a.querySelector(".audio-player__song-details .audio-player__song-name"),n=a.querySelector(".audio-player__song-details .audio-player__artist"),o=a.querySelector("#main-audio"),s=a.querySelector(".play-pause"),l=a.querySelector("#prev"),c=a.querySelector("#next"),u=a.querySelector(".audio-control__progress-bar"),d=a.querySelector(".audio-control__progress-area"),m=a.querySelector("#repeat-plist"),g=a.querySelector(".music-list"),p=a.querySelector("#more-music"),y=a.querySelector("#close"),h=a.querySelector("ul"),f=a.querySelector(".volume__button"),v=a.querySelector(".volume__slider");let S=1;function _(a){i.innerText=t[a-1].songName,n.innerText=t[a-1].artist;const s=new Image;s.src=`./img/jpg/${t[a-1].img}.jpg`,s.addEventListener("load",(()=>{e.style.backgroundImage=`url(${s.src})`,r.style.backgroundImage=`url(${s.src})`})),o.src=`./files/songs/${t[a-1].src}.mp3`}function L(){a.classList.add("paused"),s.querySelector("i").innerText="pause",o.play()}function k(){h.querySelectorAll("li").forEach((e=>{let t=e.querySelector(".audio-duration");if(e.classList.contains("playing")){e.classList.remove("playing");let a=t.getAttribute("t-duration");t.innerText=a,e.querySelector(".music-list__play-pause i").innerText="play_arrow"}e.getAttribute("li-index")==S&&a.classList.contains("paused")&&(e.classList.add("playing"),t.innerText="Playing",e.querySelector(".music-list__play-pause i").innerText="pause")}))}function b(){S++,S=S>t.length?1:S,_(S),L(),k()}t.forEach(((e,t)=>{let a=`\n      <li li-index="${t+1}">\n        <div class="music-list__play-pause">\n          <i class="material-icons">play_arrow</i>\n        </div>\n        <div class="music-list__row music-list__info">\n          <span>${e.songName}</span>\n          <p>${e.artist}</p>\n        </div>\n        <span id="${e.src}" class="audio-duration">3:40</span>\n        <audio class="${e.src}" src ="./files/songs/${e.src}.mp3"><audio>\n      </li>`;h.insertAdjacentHTML("beforeend",a);let r=h.querySelector(`#${e.src}`),i=h.querySelector(`.${e.src}`);i.addEventListener("loadeddata",(()=>{let e=i.duration,t=Math.floor(e/60),a=Math.floor(e%60);a<10&&(a=`0${a}`),r.innerText=`${t}:${a}`,r.setAttribute("t-duration",`${t}:${a}`)}))})),window.addEventListener("load",(()=>{_(S),k()})),s.addEventListener("click",(()=>{a.classList.contains("paused")?(a.classList.remove("paused"),s.querySelector("i").innerText="play_arrow",o.pause()):L(),k()})),c.addEventListener("click",(()=>{b()})),l.addEventListener("click",(()=>{S--,S=S<1?t.length:S,_(S),L(),k()})),o.addEventListener("timeupdate",(e=>{const t=e.target.currentTime;let r=t/e.target.duration*100;u.style.width=`${r}%`;let i=a.querySelector(".audio-control__current"),n=a.querySelector(".audio-control__duration");o.addEventListener("loadeddata",(()=>{let e=o.duration,t=Math.floor(e/60),a=Math.floor(e%60);a<10&&(a=`0${a}`),n.innerText=`${t}:${a}`}));let s=Math.floor(t/60),l=Math.floor(t%60);l<10&&(l=`0${l}`),i.innerText=`${s}:${l}`})),d.addEventListener("click",(e=>{let t=d.clientWidth,a=e.offsetX,r=o.duration;o.currentTime=a/t*r,L()})),f.addEventListener("click",(()=>{const e=a.querySelector(".volume__container i");o.muted=!o.muted,o.muted?e.innerText="volume_off":e.innerText="volume_up"})),v.addEventListener("click",(e=>{const t=window.getComputedStyle(v).width,r=e.offsetX/parseInt(t);o.volume=r,a.querySelector(".volume__percentage").style.width=100*r+"%"}),!1),m.addEventListener("click",(()=>{switch(m.innerText){case"repeat":m.innerText="repeat_one",m.setAttribute("title","Song looped");break;case"repeat_one":m.innerText="shuffle",m.setAttribute("title","Playback shuffle");break;case"shuffle":m.innerText="repeat",m.setAttribute("title","Playlist looped")}})),o.addEventListener("ended",(()=>{switch(m.innerText){case"repeat":b();break;case"repeat_one":o.currentTime=0,_(S),L();break;case"shuffle":let e=Math.floor(Math.random()*t.length+1);do{e=Math.floor(Math.random()*t.length+1)}while(S==e);S=e,_(S),L(),k()}})),p.addEventListener("click",(()=>{g.classList.toggle("show")})),y.addEventListener("click",(()=>{p.click()}))}()}();