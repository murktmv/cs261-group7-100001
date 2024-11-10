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
            'Application-Key': 'TU6b385dc1f8327e133ed355505488df04cd80b11ff6273eb291fa94ad1a05c456116ca973efcb839f730143f2cb931d4b'
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
            const statusDiv = document.getElementById('status');
            const messageDiv = document.getElementById('message');
            
            if (statusDiv) {
                statusDiv.innerText = `Login successful!\nHello and Welcome,\n`;
            }
            if (messageDiv) {
                messageDiv.innerText = 
                    `Username: ${data.username}\n` +
                    `Name: ${data.displayname_en}\n` +
                    `Role: ${data.type}\n` +
                    `Faculty: ${data.faculty}, ${data.department}\n` +
                    `Contact: ${data.email}`;
            }
            
            addToDB(data); 
            window.location.href = 'main.html'; 
        } else {
            if (checkDiv) checkDiv.innerText = 'Incorrect username or password. Please try again!';
        }
    })
    .catch(error => console.error('Error:', error));
}

function addToDB(user) {
    localStorage.setItem('user', JSON.stringify(user)); 
}