const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const btn = form.querySelector('button');
const phoneInput = form.phone;

// Проверка: вводим только цифры в поле телефона
phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, '');
});

// Обработка отправки формы
form.onsubmit = e => {
  e.preventDefault();

  // Проверка, что телефон состоит только из цифр и не пустой
  if (!/^\d+$/.test(phoneInput.value)) {
    status.textContent = 'Пожалуйста, введите только цифры в поле телефона';
    status.style.color = 'red';
    phoneInput.focus();
    return;
  }

  // Если все поля корректны
  status.textContent = 'Заказ оформлен';
  status.style.color = 'green';
};

// Обработка кнопки "Скачать билет"
document.getElementById('printTicket').onclick = () => {
  // Проверяем, что телефон валиден перед печатью
  if (!/^\d+$/.test(phoneInput.value)) {
    status.textContent = 'Пожалуйста, введите только цифры в поле телефона';
    status.style.color = 'red';
    phoneInput.focus();
    return;
  }

  // Заполняем билет данными из формы
  document.getElementById('tFio').textContent = form.fio.value;
  document.getElementById('tPhone').textContent = form.phone.value;
  document.getElementById('tCity').textContent = form.city.value;
  document.getElementById('tTo').textContent = form.to.value;
  document.getElementById('tDate').textContent = form.date.value;
  document.getElementById('tId').textContent = Math.floor(Math.random() * 1000000);

  window.print();
};
