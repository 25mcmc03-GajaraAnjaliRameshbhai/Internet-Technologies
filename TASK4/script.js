const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const dobField = document.getElementById("dob");
const phoneField = document.getElementById("phone");
const termsBox = document.getElementById("terms");

const strengthText = document.getElementById("strength");

nameField.addEventListener("input", () => {
    const regex = /^[A-Za-z ]+$/;
    document.getElementById("nameError").innerText =
        regex.test(nameField.value) ? "" : "only alphabets allowed";
});

emailField.addEventListener("input", () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    document.getElementById("emailError").innerText =
        regex.test(emailField.value) ? "" : "invalid email format";
});

passwordField.addEventListener("input", () => {
    let pwd = passwordField.value;
    let score = 0;

    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score < 3) strengthText.innerText = "weak password";
    else if (score < 5) strengthText.innerText = "medium password";
    else strengthText.innerText = "strong password";

    document.getElementById("passwordError").innerText =
        score === 5 ? "" : "password does not meet all rules";
});

dobField.addEventListener("change", () => {
    const dob = new Date(dobField.value);
    const age = new Date().getFullYear() - dob.getFullYear();
    document.getElementById("dobError").innerText =
        age >= 18 ? "" : "must be at least 18 years old";
});

phoneField.addEventListener("input", () => {
    const regex = /^[0-9]{10}$/;
    document.getElementById("phoneError").innerText =
        regex.test(phoneField.value) ? "" : "enter exactly 10 digits";
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
    if (!termsBox.checked) {
        document.getElementById("termsError").innerText = "accept terms to continue";
        e.preventDefault();
    } else {
        document.getElementById("termsError").innerText = "";
        alert("registration successful");
    }
});
