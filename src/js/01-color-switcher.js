let intervalId;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangingColor() {
  document.querySelector('[data-start]').disabled = true;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function stopChangingColor() {
  document.querySelector('[data-start]').disabled = false;

  clearInterval(intervalId);
}

document
  .querySelector('[data-start]')
  .addEventListener('click', startChangingColor);
document
  .querySelector('[data-stop]')
  .addEventListener('click', stopChangingColor);
