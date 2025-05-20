

document.getElementById('register-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const users = JSON.parse(localStorage.getItem('users') || '{}');
  if (users[email]) {
    alert('Користувач з таким email вже існує.');
    return;
  }

  users[email] = { password };
  localStorage.setItem('users', JSON.stringify(users));
  alert('Реєстрація успішна! Тепер увійдіть.');
});

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const users = JSON.parse(localStorage.getItem('users') || '{}');

  if (users[email] && users[email].password === password) {
    localStorage.setItem('currentUser', email);
    alert('Вхід успішний!');
    window.location.href = 'admin.html';
  } else {
    alert('Невірні дані для входу.');
  }
});
