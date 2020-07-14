const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

// const dummyTransactions = [{
//     id: 1,
//     text: 'Flower',
//     amount: -20
//   },
//   {
//     id: 2,
//     text: 'Salary',
//     amount: 300
//   },
//   {
//     id: 3,
//     text: 'Book',
//     amount: -10
//   },
//   {
//     id: 4,
//     text: 'Camera',
//     amount: 150
//   }
// ]

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
//  grab what is entered in LS (parse from string to obj) 
// pull out as object(array) / store as string. 

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];
// if there is something stored in LS pass it into localStorageTrans



// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount')
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = ''
    amount.value = '';
  }
}
// if text and/or amount values are equal to nothing show alert.
// else initialise var called transaction which is an object
// the properties inside have id (generated randonmly from generateID func), text which is the text.value and amount which is amount.value.
// push that to transactions array
// call addTransDOM and pass in our transaction to fill dom
// call updateValues() 
// reset text and amount values

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000);
}

// Add transactions to DOM list
function addTransactionDOM(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
  `;

  list.appendChild(item);
}
// for each amount in array work out whether value less than 0 if it is (?) then '-' minus sign.   else: '+'
// next create an li element 
// add a class to li based on its amount property if less than 0 add 'minus' class else 'plus'
// in the innerHTML dynamically insert the transaction.text. 
// sign and transaction amount inside of a span. Math.abs the trans amount for an absolute number.
// add a delete button on also.
// append item which is li to list



// Update the balance, income and expense.
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0).toFixed(2);

  const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  balance.innerText = `£${total}`;
  money_plus.innerText = `£${income}`;
  money_minus.innerText = `£${expense}`;
}
// get the amounts from running map on transactions array targeting .amount property
// next run reduce on the amounts: reduce uses an accumulator and the item/number 
// from that accumulate += each item (total them) and start from 0
// .toFixed for 2 decimal places.

// next get expenses by grabbing amounts and using .filter on it, select only the items/numbers which are less than 0
// next use reduce to total the selected items(expenses), start from 0    then   * -1   (to minus them)




// remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}



// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}
// storing transactions in LS


// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}
// clear list html
// run forEach on transactions using the addTransactionDOM func.

init();

form.addEventListener('submit', addTransaction);