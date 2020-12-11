import React from "react";
import "./TodoList.css";

const TodoList = ({ handleEdit, handleDelete, todo, toggleComplete }) => {
  return (
    <div className="todoList">
      <div className="todoList__container">
        <div onClick={() => toggleComplete(todo)} className="todoList__items">
          {todo.completed ? (
            <strike>
              <p className="todoList__title">{todo.title}</p>
            </strike>
          ) : (
            <p className="todoList__title">{todo.title}</p>
          )}
        </div>
        <div>
          <button onClick={() => handleEdit(todo)} className="todoList__edit">
            Edit
          </button>
          <button
            onClick={() => handleDelete(todo)}
            className="todoList__delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
