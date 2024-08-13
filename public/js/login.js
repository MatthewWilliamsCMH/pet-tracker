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

  //console.log(userVal, emailVal, passVal)

  fetch('/api/users/register', { //check to make sure this route is still correct
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
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

  //console.log(userVal, emailVal, passVal)

  fetch('/api/users/register', { //check to make sure this route is still correct
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
  .querySelector('.login-form')
  .addEventListener('submit', logFormHandler);

document
  .querySelector('.register-form')
  .addEventListener('submit', regFormHandler);


// const logFrmHandler = async (event) => {
//   event.preventDefault();

//   const email = document.querySelector('#login-email').value.trim();
//   const password = document.querySelector('#login-password').value.trim();

//   if (email && password) {
//     const response = await fetch('/api/users/login', { //is this route correct?
//       method: 'POST',
//       body: JSON.stringify({ email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/'); //append "/pack" to route?
//     } else {
//       alert('Please register before trying to log in.');
//       document.location.replace('/login');
//     }
//   }
// };

// const regFrmHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#register-user').value.trim();
//   const email = document.querySelector('#register-email').value.trim();
//   const password = document.querySelector('#register-signup').value.trim();

//   if (name && email && password) {
//     const response = await fetch('/api/users', { //is this route correct?
//       method: 'POST',
//       body: JSON.stringify({ name, email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/');
//     } else {
//       alert(response.statusText);
//     };
//   };
// };

// document
//   .querySelector('.login-form')
//   .addEventListener('submit', logFrmHandler);

// document
//   .querySelector('.register-form')
//   .addEventListener('submit', regFrmHandler);