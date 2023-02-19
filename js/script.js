// Declared the global variables above

const nameField = document.getElementById('name');
const jobRole = document.getElementById('other-job-role');
const title = document.getElementById('title');
const color = document.getElementById('color');
const design = document.getElementById('design');
const option = document.querySelectorAll('option');
const activities = document.getElementById('activities');
const payment = document.getElementById('payment');
const creditCard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
const email = document.getElementById('email');
const creditCardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');
const basicInfo = document.querySelector('.basic-info');
const legendElement = basicInfo.firstElementChild;
const activitiesBox = document.querySelector('#activities-box');
const creditCardBox = document.querySelector('.credit-card-box');
let activitiesTotal = 0;
const checkboxesInput = document.querySelectorAll('input[type="checkbox"]');
const checkboxes = document.querySelectorAll('.activities input');
const paragraphActivitiesCost = document.querySelector('.activities-cost');
let totalCostOfActivities = 0;

// event Listener on the activity checkboxes to show if no activities checked or if more than one is
document.querySelector('#activities').addEventListener('change', event => {
    (event.target.checked) ? activitiesTotal++ : activitiesTotal--;
});

// Step 3, set focus on the name field
nameField.focus();

// Step 4, job role section, the other option shows a new block that says "Other Job Role". If you select another job role this block disappears.
jobRole.style.display = 'none';
title.addEventListener('change', () => {
    if (title.value === 'other') {
        jobRole.style.display = 'block';
        console.log('other');
    } else {
        jobRole.style.display = 'none';
    }
});

// Step 5, T-Shirt Info section, the when design is changed to JS Hearts, or JS Puns, the
// drop down changes accordingly
color.disabled = true;
design.addEventListener('change', function () {
    color.disabled = false;
    for (let option of color.options) {
        const theme = option.getAttribute('data-theme');
        if (theme !== this.value) {
            option.hidden = true;
        } else {
            option.hidden = false;
        }
    }
    color.querySelector(`[data-theme="${this.value}"]`).selected = true;
});

// Step 6, Register for Activities Section. Below is a listener on the activities ID. This code selects the data-cost attribute
// and then adds or minuses the cost of the courses.
document.querySelector('.activities').addEventListener('change', e => {
    const clicked = e.target;
    let clickedType = clicked.getAttribute('data-cost');
    clickedType = Number(clickedType);
    if (clicked.checked) {
        totalCostOfActivities += clickedType;
    }
    if (clicked.checked === false) {
        totalCostOfActivities -= clickedType;
    }

    paragraphActivitiesCost.innerHTML = `Total: $${totalCostOfActivities}`;
});


// Step 7, Payment Info Section, this is where the 3 drop downs for CC, Paypal, and Bitcoin are selected
// If you select CC then the related fields show. If you select Paypal, or Bitcoin then the
// credit card fields disappear.
paypal.style.display = 'none';
bitcoin.style.display = 'none';

let creditCardInitial = payment.children
creditCardInitial = creditCardInitial[1];

creditCardInitial.setAttribute('selected', 'selected');

document.getElementById('payment').addEventListener('change', event => {
    let target = event.target;
    if (payment.value === 'credit-card') {
        creditCard.style.display = 'block';
        bitcoin.style.display = 'none';
        paypal.style.display = 'none';
        console.log('yes');
    } else if (payment.value === 'paypal') {
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';
        creditCard.style.display = 'none';
    } else if (payment.value === 'bitcoin') {
        bitcoin.style.display = 'block';
        paypal.style.display = 'none';
        creditCard.style.display = 'none';
    }
});


// Step 8th, Form Validation, this is a event listener on the form for the name, email, activities,
// CC card number, Zip Code, and CVV, that checks that everything is valid or not depending on the
// regex statements below.
form.addEventListener("submit", e => {

    function validationPass(element) {
        element.parentElement.classList.add('valid');
        element.parentElement.classList.remove('non-valid');
        element.parentElement.lastElementChild.style.display = 'none';
    }

    function validationFail(element) {
        element.parentElement.classList.add('not-valid');
        element.parentElement.classList.remove('valid');
        element.parentElement.lastElementChild.style.display = 'block';
    }

    function checkName(){
        const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameField.value);
        if (nameIsValid === true) {
            validationPass(nameField);
            console.log('yes name is valid');
        } else {
            validationFail(nameField);
            console.log('no name is not valid');
        }
        return nameIsValid;
    }

    function emailValidator(){
        const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
        if (emailIsValid === true){
            console.log('yes email');
            validationPass(email);
        } else {
            console.log('no email');
            validationFail(email);
        }
    }

    function checkActivities() {
        const activitiesChecked = activitiesTotal > 0;
        if (activitiesChecked === true) {
            validationPass(activitiesBox);
        } else {
            validationFail(activitiesBox);
        }
        return activitiesChecked;
    }

    function checkCreditCard(){
        const creditCardChecked = /^\d{13,16}$/.test(creditCardNumber.value);
        if (creditCardChecked === true){
            validationPass(creditCardNumber);
    } else {
            validationFail(creditCardNumber);
    }
    return creditCardChecked;
    }

    function checkZipCode (){
        const creditCardZipCode = /^\d{5}$/.test(zipCode.value);
        if (creditCardZipCode === true){
            validationPass(zipCode);
        } else {
            validationFail(zipCode);
        }
        return creditCardZipCode;
    }

    function checkZipCVV (){
        const creditCardCVV = /^\d{3}$/.test(cvv.value);
        if (creditCardCVV === true){
            validationPass(cvv);
        } else {
            validationFail(cvv);
        }
        return creditCardCVV;
    }

    // These if statements call the functions above, and prevent the form from submitting if incorrect
    if (!checkName()) {
        console.log('Invalid name prevented submission');
        e.preventDefault();
    }

    if (!emailValidator()) {
        console.log('Invalid email prevented submission');
        e.preventDefault();
    }

    if (!checkActivities()) {
        console.log('Invalid activities total prevented submission');
        e.preventDefault();
    }

    if (!checkCreditCard()) {
        console.log('Invalid credit card prevented submission');
        e.preventDefault();
    }

    if (!checkZipCode()) {
        console.log('Invalid credit card zip code prevented submission');
        e.preventDefault();
    }

    if (!checkZipCVV()) {
        console.log('Invalid credit card CVV code prevented submission');
        e.preventDefault();
    }


});

    // Step 9, Accessibility. Shows the focus on the activity elements
function accessibility(){
    for (let i = 0; i < checkboxesInput.length; i++){
        checkboxesInput[i].addEventListener("focus", (e) =>{
            checkboxesInput[i].parentElement.classList.add('focus');
        });
        checkboxesInput[i].addEventListener("blur", e =>{
            checkboxesInput[i].parentElement.classList.remove('focus');
        });
    }
}

accessibility();