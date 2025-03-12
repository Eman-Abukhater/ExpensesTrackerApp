const form = document.getElementById('expense-form');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const dateInput = document.getElementById('date');
const expenseList = document.getElementById('expense-list');
const totalExpense = document.getElementById('total');
const submitButton = document.getElementById("submit-btn");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

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
    if (!amount && !category && !category) {
       
            const newExpense = {
                id: Date.now(),
                amount,
                category,
                date
            };

            expenses.push(newExpense);
            localStorage.setItem("expenses", JSON.stringify(expenses));

        
        
        // Clear input fields
        form.reset();

        // Update expense list
        updateUI();






    }

  
}
