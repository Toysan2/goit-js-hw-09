import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

const datePicker = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

let intervalId;

function startCountdown() {
  const startButton = document.querySelector('[data-start]');
  const selectedDate = datePicker.selectedDates[0];
  if (!selectedDate || selectedDate <= new Date()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  if (startButton.textContent === 'Start') {
    startButton.textContent = 'Stop';
    intervalId = setInterval(() => {
      const now = new Date();
      const remainingMs = selectedDate - now;
      if (remainingMs <= 0) {
        clearInterval(intervalId);
        updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        Notiflix.Notify.success('The countdown has ended!');
        startButton.textContent = 'Start';
      } else {
        updateTimerDisplay(convertMs(remainingMs));
      }
    }, 1000);
  } else {
    clearInterval(intervalId);
    startButton.textContent = 'Start';
    Notiflix.Notify.warning('The countdown has stopped!');
  }
}

document
  .querySelector('[data-start]')
  .addEventListener('click', startCountdown);
