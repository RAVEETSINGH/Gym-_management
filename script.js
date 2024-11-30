// Mock database using LocalStorage
const users = JSON.parse(localStorage.getItem("users")) || [
    { username: "admin", password: "admin123", role: "admin" }, // Default admin user
];

const members = JSON.parse(localStorage.getItem("members")) || [];

// DOM Elements
const loginForm = document.getElementById("login-form");
const adminDashboard = document.getElementById("admin-dashboard");
const memberDashboard = document.getElementById("member-dashboard");
const adminContent = document.getElementById("admin-content");
const memberContent = document.getElementById("member-content");

// Event Listeners
loginForm.addEventListener("submit", handleLogin);
document.getElementById("add-member-btn").addEventListener("click", addMember);
document.getElementById("view-members-btn").addEventListener("click", viewMembers);

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (user) {
        if (user.role === "admin") {
            showAdminDashboard();
        } else {
            showMemberDashboard(user);
        }
    } else {
        alert("Invalid username or password!");
    }
}

// Admin Dashboard
function showAdminDashboard() {
    document.querySelector(".login-section").classList.add("hidden");
    adminDashboard.classList.remove("hidden");
}

function addMember() {
    const name = prompt("Enter member's name:");
    const username = prompt("Enter member's username:");
    const password = prompt("Enter member's password:");

    if (name && username && password) {
        members.push({ name, username, password });
        localStorage.setItem("members", JSON.stringify(members));
        alert("Member added successfully!");
    } else {
        alert("Invalid input. Please try again.");
    }
}

function viewMembers() {
    adminContent.innerHTML = "<h3>Members List</h3>";
    members.forEach((member) => {
        adminContent.innerHTML += `<p>${member.name} (${member.username})</p>`;
    });
}

// Member Dashboard
function showMemberDashboard(user) {
    document.querySelector(".login-section").classList.add("hidden");
    memberDashboard.classList.remove("hidden");
    memberContent.innerHTML = `<h3>Welcome, ${user.username}</h3><p>Enjoy your gym membership!</p>`;
}

// Initialization: Save the data in LocalStorage
localStorage.setItem("users", JSON.stringify(users));
