document.addEventListener("DOMContentLoaded", loadExpenses);

const form = document.getElementById('expense-form');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const expenseList = document.getElementById('expense-list');
const totalExpense = document.getElementById('total');
const submitButton = document.getElementById("submit-btn");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editingId = null; // Track ID of the expense being edited

// Event listener f
submitButton.addEventListener('click', addExpense);
expenseList.addEventListener("click", handleExpenseActions);


// Function to add an expense to the list
function addExpense(e) {
    e.preventDefault();
    const amount = amountInput.value.trim();
    const category = categoryInput.value.trim();
    const date = dateInput.value.trim();

    if (amount && category && date) {
        if (editingId) {
            // Update existing expense
            expenses = expenses.map((expense) =>
                expense.id === editingId ? { id: editingId, amount, category, date } : expense
            );
            editingId = null; // Reset after update
            submitButton.textContent = "Add Expense"; // Change button text back
        } else {
            // Add new expense
            const newExpense = { id: Date.now(), amount, category, date };
            expenses.push(newExpense);
        }
        updateUI();
        form.reset();
    }
}
// Function to update the UI
function updateUI() {
    expenseList.innerHTML  = "";
    let total = 0;

    expenses.forEach((expense) => {
        total += parseFloat(expense.amount);
        renderExpense(expense);
    });
    totalExpense.textContent = total.toFixed(2);
    saveExpenseToLocalStorage();

}

// Function to render an expense to the UI

function renderExpense(expense) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${expense.date} - ${expense.category} : $${expense.amount}
        <div class="expense-actions">
            <button class="edit-btn" data-id="${expense.id}">Edit</button>
            <button class="delete-btn" data-id="${expense.id}">Delete</button>
        </div>
    `;
    expenseList.appendChild(li);
      
}


// handle actions on the expense list

function handleExpenseActions(e) {
    const target = e.target;
    const id = Number(target.dataset.id);

    if (target.classList.contains('delete-btn')) {
        expenses = expenses.filter((expense) => expense.id!== id);
        updateUI();
    } else if (target.classList.contains('edit-btn')) {
        const expense = expenses.find((expense) => expense.id === id);
        amountInput.value = expense.amount;
        categoryInput.value = expense.category;
        dateInput.value = expense.date;
        editingId = id;
        submitButton.textContent = "Update Expense";
    }

}


// Function to save expenses to local storage
function saveExpenseToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}


function loadExpenses() {
    updateUI(); 
}
