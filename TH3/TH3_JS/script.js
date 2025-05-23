// Thêm công việc mới (giữ nguyên)
function addTask() {
  const input = document.getElementById("task-input");
  const name = input.value.trim();
  if (name === "") {
    alert("Vui lòng nhập nội dung công việc.");
    return;
  }

  const task = {
    id: Date.now(),
    name,
    isDone: false
  };
  tasks.push(task);
  saveTasksToLocalStorage();
  renderTasks();
  input.value = "";
}

// Xóa công việc có xác nhận (giữ nguyên)
function deleteTask(id) {
  const confirmDelete = confirm("Bạn có chắc muốn xóa công việc này?");
  if (!confirmDelete) return;
  tasks = tasks.filter(t => t.id !== id);
  saveTasksToLocalStorage();
  renderTasks();
}

// Đánh dấu hoàn thành (giữ nguyên)
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.isDone = !task.isDone;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Sửa tên công việc bằng nút Sửa
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  const newName = prompt("Sửa tên công việc:", task.name);
  if (newName && newName.trim() !== "") {
    task.name = newName.trim();
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Hiển thị danh sách công việc, thêm nút Sửa
function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  const filter = document.getElementById("filter").value;
  let filteredTasks = tasks;

  if (filter === "done") {
    filteredTasks = tasks.filter(t => t.isDone);
  } else if (filter === "not-done") {
    filteredTasks = tasks.filter(t => !t.isDone);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    if (task.isDone) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = task.name;
    span.style.flexGrow = "1";
    span.style.cursor = "pointer";
    span.onclick = () => toggleTask(task.id);

    // Nút sửa với icon bút chì
    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';
    editBtn.className = "btn btn-warning btn-sm ms-2";
    editBtn.title = "Sửa công việc";
    editBtn.onclick = () => editTask(task.id);

    // Nút xóa với icon thùng rác
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-outline-danger btn-sm";
    deleteBtn.title = "Xóa công việc";
    deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`;
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}


// Lưu danh sách vào Local Storage (giữ nguyên)
function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Tải danh sách từ Local Storage (giữ nguyên)
function loadTasksFromLocalStorage() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tasks = JSON.parse(data);
    renderTasks();
  }
}

// Xử lý sự kiện nhấn Enter trong ô input để thêm công việc
document.getElementById("task-input").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Khi trang được load
window.onload = () => {
  loadTasksFromLocalStorage();
};
