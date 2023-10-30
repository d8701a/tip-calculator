
const billInput = document.querySelector("#bill");
const peopleInput = document.querySelector("#people");
const tipPerson = document.querySelector("#tip-person")
const totalPerson = document.querySelector("#total-person");
const customTipInput = document.querySelector("#custom");
const buttonsContainer = document.querySelector(".tip-options");
const buttons = document.querySelectorAll(".tip-button");
const reset = document.querySelector(".sbmt-btn");
const error = document.querySelector(".error-msg");


// Reset button //

reset.addEventListener("click", () => {
    billInput.value = 0;
    peopleInput.value = "1";
    customTipInput.value = " ";
    tipPerson.innerHTML = "$0.00";
    totalPerson.innerHTML = "$0.00";
    error.classList.add("hidden");
})


let tipValue = "0";

buttonsContainer.addEventListener("click", function (e) {
    if (e.target && e.target.hasAttribute("data-tip")) { 
        tipValue = e.target.getAttribute("data-tip") }
    
    else if (e.target.classList.contains("tip-button") && e.target.tagName === "INPUT") {
        // Handle the custom input differently
        const customInput = document.querySelector("#custom");
        if (customInput.value !== "") {
            tipValue = customInput.value;

        }
    }   
           calculateTip();
}
)

// Calculator function //

function calculateTip () {
  
    const billValue = parseFloat(billInput.value);
    const numberOfPeople = parseInt(peopleInput.value);
    const tipValueNumber = parseFloat(tipValue);

    
    if (isNaN(tipValueNumber) || isNaN(numberOfPeople)) {
        tipPerson.textContent = "$0.00";
        totalPerson.textContent = "$0.00"; 
        return;
    }

   
    const tipGeneral = (tipValueNumber / 100) * billValue.toFixed(2);
    
    const tipAmount = (tipGeneral / numberOfPeople);

    const totalAmount = (billValue / numberOfPeople) + tipAmount;

    tipPerson.textContent = tipAmount.toFixed(2);
    totalPerson.textContent = totalAmount.toFixed(2);
 
}

// calculateTip();

billInput.addEventListener("input", function (e) {
    calculateTip()
});

peopleInput.addEventListener("input", function (e) {
    calculateTip()
});

customTipInput.addEventListener("input", function (e) {
    tipValue = customTipInput.value;
        calculateTip();
    });


// Error message display when people < 1 //

peopleInput.addEventListener("input", (e) => {
    const inputValue = e.target.value;

    if (inputValue === "0") {
        error.classList.remove("hidden");
        tipPerson.innerHTML = "$0.00";
        totalPerson.innerHTML = "$0.00";
        peopleInput.style.outlineColor = "#FF0000";
    }
    else if (inputValue > 0) { 
       error.classList.add("hidden");
       peopleInput.style.outlineColor = "hsl(172, 67%, 45%)";
    }
    });
