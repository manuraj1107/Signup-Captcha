const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

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

// // dark mode

// function darkMode(){
//     var SetTheme = document.getElementsByClassName("dark-mode");
//     SetTheme.toggle("dark-mode");
//     let body = document.querySelector("body");
//     let container = document.querySelector("container");
    

//     var theme;
//     if(SetTheme.classList.toggle("dark-mode")){
//         console.log("Dark mode");
//         theme="Dark"
//         body.style.backgroundColor = "#18181b";
//     container.style.backgroundColor = "#000";
//     }
//     else{
//         console.log("Light mode");
//         theme = "Light"
//     }

//     localStorage.setItem("PageTheme", JSON.stringify(theme));
// }

// let GetTheme = JSON.parse(localStorage.getItem("PageTheme"));

// if(GetTheme === "Dark"){
//     document.body.classList = "dark-mode";
// }


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
    document.querySelector(".captcha .captcha-refresh").addEventListener("click", function(){
        generateCaptcha();
        setCaptcha();
    });
    generateCaptcha();
        setCaptcha();
}
initCaptcha();

let inputCaptchaValue = document.querySelector(".captcha-form .captcha-input").value;
  
  
 function checkCaptcha(value){
    if(value === captchaValue){
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