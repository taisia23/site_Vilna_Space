const form = document.getElementById('itemForm');
const itemsList = document.getElementById('itemsList');

let items = JSON.parse(localStorage.getItem('vilnaItems')) || [];
let editId = null;

function renderItems() {
  itemsList.innerHTML = '';
  if (items.length === 0) {
    itemsList.innerHTML = '<p>Товари відсутні</p>';
    return;
  }

  items.forEach((item, index) => {
    const itemCard = document.createElement('div');
    itemCard.className = 'item-card';

    itemCard.innerHTML = `
      <div class="item-info">
        <img src="${item.image}" alt="${item.name}" />
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div class="item-price">${item.price} грн</div>
          <div class="item-category">Категорія: ${item.category}</div>
        </div>
      </div>
      <div class="item-actions">
        <button title="Редагувати" onclick="editItem(${index})">&#9998;</button>
        <button title="Видалити" onclick="deleteItem(${index})">&times;</button>
      </div>
    `;

    itemsList.appendChild(itemCard);
  });
}

function resetForm() {
  form.reset();
  editId = null;
  document.getElementById('itemId').value = '';
}

function editItem(index) {
  const item = items[index];
  editId = index;

  document.getElementById('itemId').value = index;
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemImage').value = item.image;
  document.getElementById('itemPrice').value = item.price;
  document.getElementById('itemCategory').value = item.category;
}

function deleteItem(index) {
  if (confirm('Ви дійсно хочете видалити цей товар?')) {
    items.splice(index, 1);
    localStorage.setItem('vilnaItems', JSON.stringify(items));
    renderItems();
    resetForm();
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = document.getElementById('itemName').value.trim();
  const image = document.getElementById('itemImage').value.trim();
  const price = parseFloat(document.getElementById('itemPrice').value);
  const category = document.getElementById('itemCategory').value;

  if (!name || !image || !price || !category) {
    alert('Будь ласка, заповніть всі поля');
    return;
  }

  const newItem = { name, image, price, category };

  if (editId !== null) {
    items[editId] = newItem;
  } else {
    items.push(newItem);
  }

  localStorage.setItem('vilnaItems', JSON.stringify(items));
  renderItems();
  resetForm();
});


renderItems();
