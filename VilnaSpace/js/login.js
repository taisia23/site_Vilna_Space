let isRegister = false;

function toggleForm() {
  isRegister = !isRegister;
  document.getElementById('form-title').textContent = isRegister ? 'Реєстрація' : 'Вхід';
  document.getElementById('auth-btn').textContent = isRegister ? 'Зареєструватися' : 'Увійти';
  document.getElementById('toggle-text').innerHTML = isRegister
    ? 'Вже маєте акаунт? <a href="#" onclick="toggleForm()">Увійти</a>'
    : 'Немає акаунту? <a href="#" onclick="toggleForm()">Зареєструватися</a>';
  document.getElementById('adminKey').style.display = isRegister ? 'block' : 'none';
  document.getElementById('auth-message').textContent = '';
}

function handleAuth() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const adminKey = document.getElementById('adminKey').value.trim();

  if (!username || !password) {
    showMessage('Будь ласка, заповніть усі поля.', true);
    return;
  }

  const users = JSON.parse(localStorage.getItem('users') || '[]');

  if (isRegister) {
    if (users.find(user => user.username === username)) {
      showMessage('Користувач із таким іменем вже існує.', true);
      return;
    }

    const isAdmin = adminKey === 'admin2024';
    users.push({ username, password, isAdmin });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({ username, isAdmin }));

    window.location.href = 'index.html';
  } else {
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      showMessage('Невірне імʼя або пароль.', true);
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify({ username: user.username, isAdmin: user.isAdmin }));
    window.location.href = 'index.html';
  }
}

function showMessage(msg, isError = false) {
  const el = document.getElementById('auth-message');
  el.textContent = msg;
  el.style.color = isError ? 'crimson' : 'green';
}
