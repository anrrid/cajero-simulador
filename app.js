class TotalMoney {
    constructor(money) {
        this.money = money;
    }
}

//Save the total available money in localStorage
const oldTotalMoney = JSON.parse(localStorage.getItem("availableMoney"));
let availableMoney = null
if (oldTotalMoney == null) {
    availableMoney = new TotalMoney(0.0)
    console.log(true)
} else {
    availableMoney = oldTotalMoney
    console.log(false)
}

let transactions = [];
const h1CurrentAmount = document.getElementById("h1_current_amount");
const divHistory = document.getElementById("div_history");
const select = document.getElementById("select");

//Generate objects from operations
class Operation {
    constructor(operationName, operationAmount, toName) {
        this.operationName = operationName;
        this.operationAmount = operationAmount;
        this.toName = toName;
    }

    getOperation() {
        if (this.toName != null) {
            return this.operationName + " " + this.operationAmount + " a " + this.toName;
        } else {
            return this.operationName + " " + this.operationAmount;
        }
    }
}

setCurrentAmountText()

//listeners for button events

document.getElementById("btn_deposit").addEventListener("click", function () {
    let depositPrompt = prompt("¿Cuánto dinero quiere depositar?");
    depositMoney(depositPrompt)
})

document.getElementById("btn_withdraw").addEventListener("click", function () {
    let withdrawPrompt = prompt("¿Cuánto dinero quiere extraer?");
    withdrawMoney(withdrawPrompt)
})

document.getElementById("btn_send").addEventListener("click", function () {
    let sendPrompt = prompt("¿Cuánto dinero quiere transferir?");
    let whoToSendPromt = prompt("¿A quién quiere transferir?");
    sendMoney(sendPrompt, whoToSendPromt)
})

//Filter the different operations
document.getElementById("btn_history").addEventListener("click", function () {
    let filteredArray;
    switch (select.value) {
        case "deposit":
            filteredArray = transactions.filter(transaction => transaction.operationName == "Depositó");
            break;
        case "withdraw":
            filteredArray = transactions.filter(transaction => transaction.operationName == "Retiró");
            break;
        case "send":
            filteredArray = transactions.filter(transaction => transaction.operationName == "Envió");
            break;
        default:
            filteredArray = transactions
    }

    //Delete the div from history
    divHistory.innerHTML = ''
    filteredArray.forEach(function (transaction) {
        const p = document.createElement('p');
        p.innerText = transaction.getOperation();
        divHistory.appendChild(p)
    });
})

//Modify the text to display in HTML about the value of money available

function setCurrentAmountText() {
    h1CurrentAmount.innerText = "Dinero actual: " + availableMoney.money;
}

function isNotANumber(input) {
    return isNaN(parseFloat(input))
}

//Fuction that prints the operations performed.

function saveAndAlertOperation(operation) {
    transactions.push(operation);
    alert(operation.getOperation());
}

//function that gets the objects from the arrays and saves them in the localStorage

function saveOperation(operation) {
    if (localStorage.getItem("transactionsList") == null) {
        transactions.push(operation)
        localStorage.setItem("transactionsList", JSON.stringify(transactions))
    } else {
        const newTransactions = JSON.parse(localStorage.getItem("transactionsList"))
        newTransactions.push(operation)
        localStorage.setItem("transactionsList", JSON.stringify(newTransactions))
    }
}

const showOperation = () => {

    if (localStorage.getItem("transactionsList") == null) {
        console.log("No hay operaciones registrado");
    } else {
        const data = JSON.parse(localStorage.getItem("transactionsList"))
        console.log(data);
    }

}

//Function that takes money's worth to withdraw.
function withdrawMoney(amount) {
    if (isNotANumber(amount)) {
        alert("Por favor ingrese un número");
    } else {
        const amountFloat = parseFloat(amount)
        if (availableMoney.money - amountFloat < 0) {
            alert("No tiene suficiente dinero");
        } else {
            availableMoney = new TotalMoney(availableMoney.money - amountFloat);

            setCurrentAmountText();

            const operation = new Operation("Retiró", amount);

            saveAndAlertOperation(operation);
            saveOperation(operation);

            localStorage.setItem("availableMoney", JSON.stringify(availableMoney));
        }
    }
}

//Function that takes money's worth to deposit.
function depositMoney(amount) {
    if (isNotANumber(amount)) {
        alert("Por favor ingrese un número");
    } else {
        const amountFloat = parseFloat(amount)
        availableMoney = new TotalMoney(availableMoney.money + amountFloat)

        setCurrentAmountText();

        const operation = new Operation("Depositó", amount)

        saveAndAlertOperation(operation);
        saveOperation(operation);
        showOperation(operation);
        localStorage.setItem("availableMoney", JSON.stringify(availableMoney));
    }
}


//Function that takes money's worth to send.
function sendMoney(amount, name) {
    if (isNotANumber(amount)) {
        alert("Por favor ingrese un número");
    } else {
        const amountFloat = parseFloat(amount)
        if (availableMoney.money - amountFloat < 0) {
            alert("No tiene suficiente dinero");
        } else {
            availableMoney = new TotalMoney(availableMoney.money - amountFloat);

            setCurrentAmountText();

            const operation = new Operation("Envió", amount, name)

            saveAndAlertOperation(operation);
            saveOperation(operation);
            showOperation(operation);
            localStorage.setItem("availableMoney", JSON.stringify(availableMoney));
        }
    }
}
