const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();

const port = 3010;
app.use(cors());
app.use(express.static('static'));

let tasks = [];

function addNewTask(task) {
  tasks.push(task);
}

app.get('/tasks/add', (req, res) => {
  let taskId = req.query.taskId;
  let text = req.query.text;
  let priority = req.query.priority;
  task = {
    taskId: taskId,
    text: text,
    priority: priority,
  };
  addNewTask(task);
  console.log(tasks);
  res.json({ tasks: tasks });
});

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.sort(
    (a, b) => parseInt(a.priority) - parseInt(b.priority)
  );
  res.json({ tasks: result });
});

function updateTask(taskId, updatedPriority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks[i].priority = updatedPriority;
      break;
    }
  }
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = req.query.taskId;
  let updatedPriority = req.query.priority;
  updateTask(taskId, updatedPriority);
  console.log(tasks);
  res.json({ tasks: tasks });
});

function updateText(taskId, updatedText) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId == taskId) {
      tasks[i].text = updatedText;
      break;
    }
  }
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = req.query.taskId;
  let updatedText = req.query.text;
  updateText(taskId, updatedText);
  console.log(tasks);
  res.json({ tasks: tasks });
});

app.get('/tasks/delete', (req, res) => {
  let taskId = req.query.taskId;
  let result = tasks;
  result = result.filter((e) => e.taskId != taskId);
  console.log(tasks);
  res.json({ tasks: result });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = req.query.priority;
  let result = tasks;
  result = result.filter((e) => e.priority == priority);
  console.log(tasks);
  res.json({ tasks: result });
});

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
