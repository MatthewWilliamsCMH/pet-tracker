// we need to GRAB References
const logform = document.getElementById('login-form');
const logemail = document.getElementById('login-email');
const logpassword = document.getElementById('login-password');

const regform = document.getElementById('register-form');
const reguser = document.getElementById('register-user');
const regemail = document.getElementById('register-email');
const regpassword = document.getElementById('register-password');

const logFormHandler = async (event) => {
  event.preventDefault();

  let emailVal = logemail.value
  let passVal = logpassword.value

  fetch('/login/password', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
          email: emailVal, 
          password: passVal
      })
  })
}

const regFormHandler = async (event) => {
  event.preventDefault();

  let userVal = reguser.value
  let emailVal = regemail.value
  let passVal = regpassword.value

  fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ 
          user: userVal,
          email: emailVal, 
          password: passVal
      })
  })
}

document
  .querySelector('#login-form')
  .addEventListener('submit', logFormHandler);

document
  .querySelector('#register-form')
  .addEventListener('submit', regFormHandler);