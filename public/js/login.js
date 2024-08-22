

const email = document.getElementById('login-username');
const pass = document.getElementById('login-password');
const loginForm = document.getElementById('login-form');


function handleLogin(event) {
    console.log("Submitting...")
    event.preventDefault();

    let emailVal = email.value;
    let passVal = pass.value;
    console.log("Data: ", emailVal, passVal);

    if(emailVal && passVal) {
       fetch('/api/users/login/password', {
            method: 'POST',
            body: JSON.stringify({ emailVal, passVal }),
            headers: { 'Content-Type': 'application/json'}
       }).then(data => {
        if(data) {
            window.location.pathname = '/packroute'
        }
       })
    }
}


loginForm.addEventListener('submit', handleLogin)

