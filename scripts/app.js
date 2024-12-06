const form = document.getElementById('transaction-form');
const inputName = document.getElementById('transaction-name');
const inputAmount = document.getElementById('transaction-amount');
const listContainer = document.getElementById('transaction-list');
const balanceDisplay = document.getElementById('total-balance');

let transactionList = JSON.parse(localStorage.getItem('transactionList')) || [];

const addTransaction = (event) => {
  event.preventDefault();

  const name = inputName.value.trim();
  const amount = parseInt(inputAmount.value.trim());

  if (!name || isNaN(amount)) {
    alert('올바른 입력값을 작성해주세요.');
    return;
  }

  const transaction = {
    id: Date.now(),
    name,
    amount,
  };

  transactionList.push(transaction);
  updateUI();
  form.reset();
};

const updateUI = () => {
  listContainer.innerHTML = '';
  let total = 0;

  transactionList.forEach((transaction) => {
    const listItem = document.createElement('li');
    listItem.classList.add(transaction.amount > 0 ? 'income' : 'expense');
    listItem.innerHTML = `
      ${transaction.name}
      <span>${
        transaction.amount > 0 ? '+' : ''
      }${transaction.amount.toLocaleString('ko-KR')}원</span>
      <button class="delete-btn" data-id="${transaction.id}">X</button>
    `;
    listContainer.appendChild(listItem);

    total += transaction.amount;
    balanceDisplay.textContent = `${total.toLocaleString('ko-KR')}원`;

    const deleteBtn = listItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () =>
      deleteTransaction(transaction.id)
    );
  });

  localStorage.setItem('transactionList', JSON.stringify(transactionList));
};

const deleteTransaction = (id) => {
  transactionList = transactionList.filter(
    (transaction) => transaction.id !== id
  );
  updateUI();
};

form.addEventListener('submit', addTransaction);

updateUI();
