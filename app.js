let availableMoney = 0.0;
let transactions = [];
const h1CurrentAmount = document.getElementById("h1_current_amount");
const divHistory = document.getElementById("div_history");
const select = document.getElementById("select");

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

    divHistory.innerHTML = ''
    filteredArray.forEach(function (transaction) {
        const p = document.createElement('p');
        p.innerText = transaction.getOperation();
        divHistory.appendChild(p)
    });
})

function setCurrentAmountText() {
    h1CurrentAmount.innerText = "Dinero actual: " + availableMoney;
}

function isNotANumber(input) {
    return isNaN(parseFloat(input))
}

function saveAndAlertOperation(operation) {
    transactions.push(operation);
    alert(operation.getOperation());
}

function withdrawMoney(amount) {
    if (isNotANumber(amount)) {
        alert("Por favor ingrese un número");
    } else {
        const amountFloat = parseFloat(amount)
        if (availableMoney - amountFloat < 0) {
            alert("No tiene suficiente dinero");
        } else {
            availableMoney = availableMoney - amountFloat;

            setCurrentAmountText();

            const operation = new Operation("Retiró", amount);

            saveAndAlertOperation(operation);
        }
    }
}

function depositMoney(amount) {
    if (isNotANumber(amount)) {
        alert("Por favor ingrese un número");
    } else {
        const amountFloat = parseFloat(amount)
        availableMoney = availableMoney + amountFloat

        setCurrentAmountText();

        const operation = new Operation("Depositó", amount)

        saveAndAlertOperation(operation);
    }
}

function sendMoney(amount, name) {
    if (isNotANumber(amount)) {
        alert("Por favor ingrese un número");
    } else {
        const amountFloat = parseFloat(amount)
        if (availableMoney - amountFloat < 0) {
            alert("No tiene suficiente dinero");
        } else {
            availableMoney = availableMoney - amountFloat;

            setCurrentAmountText();

            const operation = new Operation("Envió", amount, name)

            saveAndAlertOperation(operation);
        }
    }
}
