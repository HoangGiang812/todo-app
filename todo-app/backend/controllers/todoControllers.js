const Todo = require('../models/todoModels');
const Counter = require('../models/todoCounter');

// post

const createTodo = async (req, res) => {
  try {
    let counter = await Counter.findOne({ name: 'todoId' });

    if (!counter) {
      counter = await Counter.create({ name: 'todoId', value: 1 });
    } else {
      counter.value += 1;
      await counter.save();
    }

    const todo = await Todo.create({
      id: counter.value,
      title: req.body.title,
      completed: false
    });

    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });

    const sanitizedTodos = todos.map(todo => {
      const { _id, __v, ...rest } = todo.toObject();
      return rest;
    });

    res.json(sanitizedTodos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// get by id
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const { _id, __v, ...rest } = todo.toObject(); 
    res.json(rest);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// PATCH /:id
const updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Todo not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// delete
const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findOneAndDelete({ id: req.params.id });

    if (!deleted) return res.status(404).json({ message: 'Todo not found' });

    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getTodoById
};
