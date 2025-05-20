
async function loginUser(username, password) {
  const res = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.success) {
    localStorage.setItem('user', JSON.stringify(data));
    alert('Вхід успішний');
    window.location.href = 'index.html';
  } else {
    alert(data.error || 'Помилка входу');
  }
}


async function registerUser(username, password) {
  const res = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (data.success) {
    alert('Реєстрація успішна');
    window.location.href = 'login.html';
  } else {
    alert(data.error || 'Помилка реєстрації');
  }
}


async function loadProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();

  const list = document.getElementById('product-list');
  if (!list) return;
  list.innerHTML = '';
  products.forEach(p => {
    const el = document.createElement('div');
    el.className = 'product-item';
    el.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      ${p.image ? `<img src="${p.image}" alt="${p.name}" style="max-width:100px;">` : ''}
    `;
    list.appendChild(el);
  });
}


async function addProduct(name, description, imageBase64) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.isAdmin) {
    alert('Тільки адмін може додавати товари!');
    return;
  }

  const res = await fetch('/api/products/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, image: imageBase64 }),
  });

  const data = await res.json();
  if (data.success) {
    alert('Товар додано');
    loadProducts();
  } else {
    alert('Помилка додавання');
  }
}


function logout() {
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}
