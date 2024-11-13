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
    const UserName = document.getElementById('username')?.value;
    const PassWord = document.getElementById('password')?.value;
    const checkDiv = document.getElementById('check');

    if (!UserName || !PassWord) {
        if (checkDiv) checkDiv.innerText = '*Please enter both username and password.*';
        return;
    }

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TU6b385dc1f8327e133ed355505488df04cd80b11ff6273eb291fa94ad1a05c456116ca973efcb839f730143f2cb931d4b'
            //^^^token of team project's channel//
            //for easier testing//
        },
        body: JSON.stringify({ "UserName":UserName, "PassWord":PassWord })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status) {
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

function logout() {
    const userConfirmed = confirm("Are you sure you want to log out?");
            
            // If user clicked "OK"
    if (userConfirmed) {
        localStorage.removeItem('user'); // ลบข้อมูลผู้ใช้ (หากมี)

        window.location.href = "login.html";// เปลี่ยนเส้นทางไปยังหน้า login
        console.log('Logging out...'); // ตรวจสอบว่าฟังก์ชันถูก
    }
}

// ฟังก์ชั่น logout สำหรับ session timeout logout
function sessionTimeoutLogout() {
    localStorage.removeItem('user'); // ลบข้อมูลผู้ใช้ (หากมี)
    window.location.href = "login.html"; // เปลี่ยนเส้นทางไปยังหน้า login
    console.log('Session timed out. Logging out...'); // ตรวจสอบว่าฟังก์ชันถูก
}

// ตรวจสอบการเข้าสู่ระบบเมื่อโหลดหน้า main.html
document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const currentPath = window.location.pathname; // รับ path ของหน้าปัจจุบัน เช่น "/login.html"

    // ตรวจสอบว่าผู้ใช้เข้าสู่ระบบหรือยัง และตรวจสอบว่าไม่ใช่หน้า login.html
    if (!user && !currentPath.includes('login.html')) {
        // ถ้าไม่มีข้อมูลผู้ใช้ใน localStorage นำผู้ใช้ไปยังหน้า login
        window.location.href = 'login.html';
    }

    if (currentPath.includes('profile.html')) {
        //TODO: Switch to internal DB for more info
        console.log(user);
        const thname = user.displayname_th.split(" ");
        const enname = user.displayname_en.split(" ");
        document.getElementById("info-box-thname").innerText = thname[0];
        document.getElementById("info-box-thlname").innerText = thname[1];
        document.getElementById("info-box-enname").innerText = enname[0];
        document.getElementById("info-box-enlname").innerText = enname[1];
        document.getElementById("info-box-faculty").innerText = user.faculty;
        document.getElementById("info-box-major").innerText = user.department;
        document.getElementById("info-box-id").innerText = user.username;
    }
});


// กำหนดเวลา timeout (in milliseconds). : minutes * seconds * milliseconds
const sessionTimeout = 15 * 60 * 1000; // 15 minutes
let timeoutId;

// Function to reset the session timeout
function resetTimeout() {
    clearTimeout(timeoutId);
    startTimeout();
}

// Function to start the timeout timer
function startTimeout() {
    timeoutId = setTimeout(() => {
        sessionTimeoutLogout(); // หลังจาก timeout แล้วจะนำ user กลับไปหน้า login
    }, sessionTimeout);
}

// Reset ตัวจับเวลาเมื่อมี interaction
document.addEventListener("mousemove", resetTimeout);
document.addEventListener("keydown", resetTimeout);
document.addEventListener("click", resetTimeout);
document.addEventListener("scroll", resetTimeout);

// Start the session timeout countdown
startTimeout();
