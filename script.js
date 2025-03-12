const form = document.getElementById('expense-form');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const expenseList = document.getElementById('expense-list');
const totalExpense = document.getElementById('total');
const submitButton = document.getElementById("submit-btn");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editingId = null; // Track ID of the expense being edited

// Event listener for form submission
submitButton.addEventListener('click', addExpense);

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
    li.innerHTML = `
    ${expense.date} - ${expense.category} : $${expense.amount}
    <div class="expense-actions">
        <button class="edit-btn" data-id="${expense.id}">✏️</button>
        <button class="delete-btn" data-id="${expense.id}">❌</button>
    </div>
`;
expenseList.appendChild(li);

    
}

// Function to save expenses to local storage
function saveExpenseToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}