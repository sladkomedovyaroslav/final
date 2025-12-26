const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const phoneInput = form.phone;

// Твой URL Formspree
const FORMSPREE_URL = 'https://formspree.io/f/xkonnjlw';

// Разрешаем ввод только цифр в телефон
phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, '');
});

// Обработка отправки формы
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Проверка телефона
  if (!/^\d+$/.test(phoneInput.value)) {
    status.textContent = 'Пожалуйста, введите только цифры в поле телефона';
    status.style.color = 'red';
    phoneInput.focus();
    return;
  }

  status.textContent = 'Отправка заказа...';
  status.style.color = 'black';

  const formData = new FormData(form);

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      status.textContent = 'Заказ успешно отправлен!';
      status.style.color = 'green';
      form.reset(); // очищаем форму
    } else {
      status.textContent = 'Ошибка отправки. Попробуйте позже.';
      status.style.color = 'red';
    }
  } catch (error) {
    status.textContent = 'Ошибка соединения. Проверьте интернет.';
    status.style.color = 'red';
  }
});

// Кнопка скачать билет
document.getElementById('printTicket').onclick = () => {
  if (!/^\d+$/.test(phoneInput.value)) {
    status.textContent = 'Пожалуйста, введите только цифры в поле телефона';
    status.style.color = 'red';
    phoneInput.focus();
    return;
  }

  document.getElementById('tFio').textContent = form.fio.value;
  document.getElementById('tPhone').textContent = form.phone.value;
  document.getElementById('tCity').textContent = form.city.value;
  document.getElementById('tTo').textContent = form.to.value;
  document.getElementById('tDate').textContent = form.date.value;
  document.getElementById('tId').textContent = Math.floor(Math.random() * 1000000);

  window.print();
};
