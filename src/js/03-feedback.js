import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const loadFormState = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  if (!formData.email || !formData.message) {
    alert('Wypełnij wszystkie pola formularza.');
  } else {
    console.log('Form submitted with data:', formData);

    emailInput.value = '';
    messageTextarea.value = '';

    localStorage.removeItem(STORAGE_KEY);
  }
};

form.addEventListener('input', throttle(saveFormState, 500));

window.addEventListener('load', loadFormState);

form.addEventListener('submit', handleSubmit);
