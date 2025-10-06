const express = require('express');
const { readTasks, addTask, updateTask, deleteTask } = require('./fileUtils');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { id, title, completed } = req.body;

  if (!id || !title || completed === undefined) {
    return res.status(400).json({ message: 'Faltan datos para poder enviar la tarea'});
  }

  addTask({ id, title, completed });
  res.status(201).json({ message: 'Tarea creada exitosamente' })
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;

  const result = updateTask(taskId, updatedTask);

  if (result) {
    res.json({ message: 'Tarea actualizada exitosamente', task: result });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  const deleted = deleteTask(taskId);

  if(deleted) {
    res.json({ message: 'Tarea eliminada exitosamente' });
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});