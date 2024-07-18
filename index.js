// initial references
let incomeAmount = document.getElementById("income_amount");
let expenseAmount = document.getElementById("expense_amount");
const checkIncomebtn = document.getElementById("check_income");
const checkExpensebtn = document.getElementById("check_expense");
const expenseName = document.getElementById("expense_name");
const user_income = document.getElementById("user_income");
const total_expense = document.getElementById("total_expense");
const balanceAmount = document.getElementById("balance_amount");
const expenseList = document.getElementById("list");
const list = document.getElementById("list")
const searchInput = document.getElementById("search");
const currencyRatesContainer = document.getElementById("currency-rates")


let inputAmount = 0

// set income
checkIncomebtn.addEventListener("click", () => {
    inputAmount = incomeAmount.value;
    user_income.innerText = inputAmount;
    // set balance 
    balanceAmount.innerText = inputAmount - total_expense.innerText;
    //clear input box
    incomeAmount.value = "";
})

//function to disable edit and delete buttons

const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    })
};
 // function to modify list elements
 const modifyElement = (element, edit = false) => {
    // identifying parent and current values
    let parentDiv = element.parentElement;
    let currentBalance = balanceAmount.innerText;
    let currentExpense = total_expense.innerText;
    let parentAmount = document.querySelector(".amount").innerText;
    // editing mode 
    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText
        expenseName.value = parentText;
        expenseAmount.value = parentAmount;
        disableButtons(true)

    }
    balanceAmount.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    total_expense.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
 }

 // function to create expense list
 const listcreator = (expenseName, expenseAmount) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist_Content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class ="product">${expenseName}</p><p class="amount">${expenseAmount}</p>`;
    let editButton = document.createElement("button")
    editButton.classList.add("fa-regular", "fa-pen-to-square", "edit")
    editButton.style.fontSize = "24px";
    editButton.addEventListener("click", () => {
        modifyElement(editButton, true)
    });
    let deleteButton = document.createElement("button")
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete")
    deleteButton.style.fontSize = "24px";
    deleteButton.addEventListener("click", ()=> {
        modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    list.appendChild(sublistContent);
 }


 //function to add expenses
 checkExpensebtn.addEventListener("click", () => {
    // enable button
    disableButtons(false);
    //expense
    let expenditure = parseInt(expenseAmount.value);
    //total expense (existing + new)
    let sum = parseInt(total_expense.innerText) + expenditure;
    total_expense.innerText = sum;
    
    //total balance
    const totalBalance = inputAmount - sum;
    balanceAmount.innerText = totalBalance;

    // create list
    listcreator(expenseName.value, expenseAmount.value);
    // empty input
    expenseName.value = "";
    expenseAmount.value = "";


 })

 // fetch currency rates
fetch("https://api.fastforex.io/fetch-all?api_key=dcb23d2b2c-1ddb1d9f05-sgtngp")
  .then((response) => response.json())
  .then((data) => {
    displayRates(data.results);
  })
  .catch((error) => console.log("error fetching currency rates:", error));

//display rates fuction

function displayRates(rates){
    currencyRatesContainer.innerHTML = '';
    for(let [currency, rate] of Object.entries(rates)){
        const rateDiv = document.createElement("div");
        rateDiv.classList.add("currency");
        rateDiv.textContent = `${currency} : ${rate};`
        currencyRatesContainer.appendChild(rateDiv);
    }
}

// search function
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toUpperCase(); 
    const currency = document.querySelectorAll(".currency");
    currency.forEach(currency => {
        if(currency.textContent.toUpperCase().includes(query)){
            currency.style.display = "block"
        }
        else {
            currency.style.display = "none";
        }
    })
})


