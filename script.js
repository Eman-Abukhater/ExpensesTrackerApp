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

    // Get input values
    const amount = amountInput.value.trim();
    const category = categoryInput.value.trim();
    const date = dateInput.value;

    // Validate input
    if (amount && category && category) {
        if (editingID) {
            // Update existing expense
            expenses = expenses.map(expense => expense.id === editingId? {id: editingId, amount, category, date} : expense);
            editingId = null;
            submitButton.textContent = "Add Expense"; 
            localStorage.setItem("expenses", JSON.stringify(expenses));

        }
        
        // Add new expense
        else {
            const newExpense = {
                id: Date.now(),
                amount,
                category,
                date
            };

            expenses.push(newExpense);
            localStorage.setItem("expenses", JSON.stringify(expenses));

        }
        
        // Clear input fields
        form.reset();

        // Update expense list
        updateUI();
    }

  
}

// Function to update the UI
function updateUI() {
    expenseList.innerHTML = "";
    let total = 0;

    expenses.forEach((expense) => {
        total += parseFloat(expense.amount);
        renderExpense(expense);
    });

    totalDisplay.textContent = total.toFixed(2);
    saveExpenseToLocalStorage();
}