let token = localStorage.getItem('token');

async function login() {
    const user = { username: document.getElementById('username').value, password:  document.getElementById('password').value };
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    const data = await res.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        location.reload();
    } else { alert("Login failed"); }
}

async function register() {
    const user = { username: document.getElementById('username').value, password:  document.getElementById('password').value };
    await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
    alert("Registered! Now Login.");
}

async function loadTasks() {
    if (!token) return;
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('main-section').style.display = 'block';

    const res = await fetch('/api/tasks', {
        headers: { 'Authorization': token }
    });
    const tasks = await res.json();
    const list = document.getElementById('taskList');
    list.innerHTML = tasks.map(t => `<li>${t.text}</li>`).join('');
}

async function addTask() {
    const text = document.getElementById('taskInput').value;
    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        body: JSON.stringify({ text })
    });
    loadTasks();
}

function logout() {
    localStorage.removeItem('token');
    location.reload();
}

loadTasks();