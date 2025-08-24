const express = require('express');
const router = express.Router();
const {
  getTodos, createTodo, updateTodo, deleteTodo, getTodoById
} = require('../controllers/todoControllers');

router.get('/', getTodos);
router.get('/:id', getTodoById);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);


module.exports = router;
