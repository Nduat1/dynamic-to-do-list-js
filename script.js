document.addEventListener('DOMContentLoaded', () => {
    
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        // Get tasks from Local Storage or default to an empty array if none exist
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        // Iterate through the stored tasks and add them to the list
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to save tasks to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to get the current list of tasks from the DOM
    function getTasksFromDOM() {
        return [...taskList.querySelectorAll('li')].map(li => li.firstChild.textContent);
    }

    function addTask() {
        var taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task!");
            return; 
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        removeButton.onclick = function() {
            taskList.removeChild(li);
            updateLocalStorage();
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);
        
        taskInput.value = "";
        
    }

    // Function to update Local Storage with the current task list
    function updateLocalStorage() {
        const tasks = getTasksFromDOM();
        saveTasks(tasks);
    }

    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
    // Load tasks from Local Storage when the page loads
    loadTasks();

