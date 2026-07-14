const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const tasks = [];

function renderTasks() {
  if (!taskList) return;

  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `task-item${task.completed ? ' completed' : ''}`;

    li.innerHTML = `
      <span>${task.text}</span>
      <div class="task-actions">
        <button type="button" class="complete-btn">${task.completed ? 'Undo' : 'Done'}</button>
        <button type="button" class="delete-btn">Delete</button>
      </div>
    `;

    li.querySelector('.complete-btn').addEventListener('click', () => toggleTask(index));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(index));
    taskList.appendChild(li);
  });
}

function addTask(text) {
  tasks.push({ text, completed: false });
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

if (taskForm) {
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;
    addTask(text);
    taskForm.reset();
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d+$/.test(phone);
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !message) {
      formMessage.textContent = 'Please fill in all fields.';
      return;
    }

    if (!validateEmail(email)) {
      formMessage.textContent = 'Please enter a valid email address.';
      return;
    }

    if (!validatePhone(phone)) {
      formMessage.textContent = 'Phone number must contain only digits.';
      return;
    }

    formMessage.textContent = 'Thank you! Your message has been sent.';
    contactForm.reset();
  });
}
