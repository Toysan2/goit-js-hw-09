import VimeoPlayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new VimeoPlayer(iframe);

const TIME_UPDATE_INTERVAL = 1000;
const STORAGE_KEY = 'videoplayer-current-time';

player.on('loaded', () => {
  const storedTime = localStorage.getItem(STORAGE_KEY);

  if (storedTime) {
    player.setCurrentTime(parseFloat(storedTime));
  }
});

player.on('timeupdate', throttle(handleTimeUpdate, TIME_UPDATE_INTERVAL));

function handleTimeUpdate(data) {
  const currentTime = data.seconds;
  localStorage.setItem(STORAGE_KEY, currentTime.toString());
}
