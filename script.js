const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const inputCaptchaValue = document.getElementById("captcha-form");
const button = document.getElementById("submit");


// dark theme

var icon = document.getElementById("icon");
icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.innerText = "☀";
        icon.style.color ="#fff";
    }
    else{
        icon.innerText = "🌙";

    }
}
// Show input error message

function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    
}

// Check email is valid

function checkEmail(input){
const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

if(re.test(input.value.trim())){
 showSuccess(input);
 

}
else{
    showError(input, 'Email is not valid');
}

}

function checkPassword(input){
    const paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
if(input.value.match(paswd)) {
  showSuccess(input);
}
else{
    showError(input, 'Must contain [a-z, A-Z, 0-9, {@,&,#}]')
}

}


// Check required fields
function checkRequired(inputArr){
 inputArr.forEach(function(input){
   if(input.value.trim() === ''){
       showError(input, `${getFieldName(input)} is required`);
   }
   else{
       showSuccess(input);
   }
 });
}

// Check input length

function checkLength(input, min, max) {
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least  ${min} characters`)
    }
    else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }
    else{
        showSuccess(input);
    }

}

// Check passwords match

function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, 'Password do not match');
    }
}

// Get fieldname

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}



// Captcha generator

const fonts = ["cursive", "sans-serif", "monospace"];
let captchaValue = "";
function generateCaptcha() {
    let value = btoa(Math.random()*1000000000);
    value = value.substr(0, 5+Math.random()*5);
    captchaValue = value; 
}

function setCaptcha(){
   let html = captchaValue.split("").map((char)=> {
        const rotate = -20 + Math.trunc(Math.random()*30);
        const font = Math.trunc(Math.random()*fonts.length);
        return `<span styles="
          transform:rotate(${rotate}deg);
          font-family:${fonts[font]}
        ">${char}</span>`
    }).join("");
    document.querySelector(".captcha .preview").innerHTML = html;
}

function initCaptcha(){
    document.querySelector(".captcha-refresh").addEventListener("click", function(e){
        e.preventDefault();
        generateCaptcha();
        setCaptcha();
    });
    generateCaptcha();
        setCaptcha();
}
initCaptcha();


  
  // Captcha Validation

 function checkCaptcha(input){
    if(input.value === captchaValue){
        button.style.cursor = "pointer";
        alert("success");

      }
      else{
        alert("Invalid captcha");
      }
 }
 
// Event Listener
form.addEventListener('submit', function(e){
    
    e.preventDefault();
    
   checkRequired([username, email, password, password2]);
   checkLength(username, 3, 15);
   checkLength(password, 6, 25);
   checkEmail(email);
   checkPassword(password);
   checkPasswordMatch(password, password2);
   checkCaptcha(inputCaptchaValue);
   

});