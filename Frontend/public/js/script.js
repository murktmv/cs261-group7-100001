function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'; // Show the password
        eyeIcon.src = 'img/eye-open-icon.png';
        eyeIcon.alt = 'Hide Password';
    } else {
        passwordInput.type = 'password'; // Hide the password
        eyeIcon.src = 'img/eye-close-icon.png';
        eyeIcon.alt = 'Show Password';
    }
}

function submitLogin() {
    const UserName = document.getElementById('username').value;
    const PassWord = document.getElementById('password').value;
    const checkDiv = document.getElementById('check');

    if (!UserName || !PassWord) {
        checkDiv.innerText = '*Please enter your username & password*';
        return;
    }

    fetch('/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': ''
        },
        body: 
        JSON.stringify({ 
            UserName, 
            PassWord 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            /************testing**************/
            
            /*********************************/
            addToDB(data)
            window.location.href = 'main.html';
        } else {
            checkDiv.innerText = 'Incorrect username or password\nPlease try again!';
            return;
        }
    })
    .catch(error => console.error('Error:', error));
}
/*
function backtoLogin() {
    document.getElementById('form').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('message').innerText = '';
}
    */

function addToDB(user) {
//to save user's info in to database
//should accessible by profile page
}