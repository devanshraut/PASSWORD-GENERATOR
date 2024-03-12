const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

console.log("JS started");

 
let password = '';
let inputLength = 10;
let checkedArray = [getUpperCase];

function starter(){
    lengthDisplay.innerText = inputLength;
    uppercaseCheck.checked = true;
}
starter();

function getRandomInteger(max,min){
    return Math.floor(Math.random()*(max-min) )+ min;   
}

function getRandomNumber() {
    return getRandomInteger(0,9);
}
function getUpperCase() {
    return String.fromCharCode(getRandomInteger(65,91))

}
function getLowerCase() {
    return String.fromCharCode(getRandomInteger(97,123))

}
function getSymbols() {
    const randNum = getRandomInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

inputSlider.addEventListener('input',function() {
    var content = inputSlider.value;
    lengthDisplay.innerHTML = content ;
    inputLength = content;
    console.log(inputLength);
});

uppercaseCheck.addEventListener('change',function() {
    if (uppercaseCheck.checked == true){
        checkedArray.push(getUpperCase);
      } else {
        let index = checkedArray.indexOf(getUpperCase);
        if (index > -1) { // only splice array when item is found
            checkedArray.splice(index, 1); // 2nd parameter means remove one item only
          }
      }
      console.log(checkedArray);
});

lowercaseCheck.addEventListener('change',function() {
    if (lowercaseCheck.checked == true){
        checkedArray.push(getLowerCase);
      } else {
        let index = checkedArray.indexOf(getLowerCase);
        if (index > -1) { // only splice array when item is found
            checkedArray.splice(index, 1); // 2nd parameter means remove one item only
          }
      }
      console.log(checkedArray);
});
numbersCheck.addEventListener('change',function() {
    if (numbersCheck.checked == true){
        checkedArray.push(getRandomNumber);
      } else {
        let index = checkedArray.indexOf(getRandomNumber);
        if (index > -1) { // only splice array when item is found
            checkedArray.splice(index, 1); // 2nd parameter means remove one item only
          }
      }
      console.log(checkedArray);
});
symbolsCheck.addEventListener('change',function() {
    if (symbolsCheck.checked == true){
        checkedArray.push(getSymbols);
      } else {
        let index = checkedArray.indexOf(getSymbols);
        if (index > -1) { // only splice array when item is found
            checkedArray.splice(index, 1); // 2nd parameter means remove one item only
          }
      }
      console.log(checkedArray);
});

async function copyToClipboard() {
    
 // Copy the text inside the text field
 if(passwordDisplay.value){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
 }
 else
 alert("Genrate The password First");
  
}

function shuffel() {
    
}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && inputLength >= 8) {
      setIndicator("#0f0");
    } else if(
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      inputLength >= 6
    ){
      setIndicator("#ff0");
    }else{
      setIndicator("#f00");
    }
}

generateBtn.addEventListener('click', function(){
    if(checkedArray.length == 0) return ;
    
    password = '';

    for(let i=0 ; i<checkedArray.length && i<inputLength;i++){
        password += checkedArray[i]();
    }

    for(let i=checkedArray.length  ; i<inputLength ; i++){
        let val = getRandomInteger(0,checkedArray.length)
        password += checkedArray[val]();
    }
    console.log(password);
    password = shufflePassword(Array.from(password));
    
    passwordDisplay.value=password;
    calcStrength();
});
