const balance = document.getElementById('balance');

const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')

const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');

// const dummyTransaction = [
//     {id:1, text:'salary', amount: +100},
//     {id:1, text:'salary', amount: 20},
//     {id:1, text:'Flower', amount: -10},
// ]
let localstorageTransactions = JSON.parse(localStorage.getItem('expense_tracker'))
let transactions = localStorage.getItem('expense_tracker') !==null ? localstorageTransactions : [];

function init(){
    list.innerHTML = '';
    transactions.forEach(addTranscationDOM);
    transactions.length <= 0? 'Nothings Here': '';
    updateValues();
}

function formSubmit (e){
    e.preventDefault();
    if ( text.value.trim() === '' || amount.value.trim() ==='' ) alert('Provide success value');
    else{
    const transaction = {
        id: generateId(),
        text: text.value,
        amount: Number(amount.value),

    }
    transactions.push(transaction);
    updateLocalStorage();
    addTranscationDOM(transaction);
    updateValues();
    clearForm();
}

}

function generateId (){
    return new Date().getTime()+''+Math.random(100000)
}

function clearForm(){
    text.value = '';
    amount.value=''

}

function updateLocalStorage(){
    localStorage.setItem('expense_tracker',JSON.stringify(transactions));

}


function updateValues(){
    const amounts = transactions.map( item => item.amount);
    const total = amounts.reduce((acc,item)=> (acc+=item),0);
    const income = (amounts.filter(item => item > 0)).reduce((acc,item) => (acc+=item),0);
    const expense = amounts.filter(item => item < 0).reduce((total,tk)=> (total+=tk),0);
    balance.innerHTML = `${total}`
    money_plus.innerHTML = `${income}`;
    money_minus.innerHTML = `${expense}`;
}

function addTranscationDOM (transaction){
    const sign = transaction.amount < 0? '-':'+';
    const item = document.createElement('li');
    item.classList.add(transaction.amount < 0?"minus":"plus");
    item.innerHTML =`
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
    
}

function deleteTransaction(id){
    transactions = transactions.filter(tr => (tr.id != id));
    updateLocalStorage();
    init(); 
}

init();
form.addEventListener('submit', formSubmit);

