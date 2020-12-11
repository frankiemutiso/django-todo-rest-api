import "./App.css";

import Header from "./Header";
import Form from "./Form";
import TodoList from "./TodoList";
import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [activeItem, setActiveItem] = useState({
    id: null,
    title: "",
    completed: false
  });
  const [editing, setEditing] = useState(false);

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("http://127.0.0.1:8000/api/todos/")
      .then((response) => response.json())
      .then((data) => setTodos(data.results));
  };

  const handleChange = (e) => {
    let value = e.target.value;

    setActiveItem({ ...activeItem, title: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let csrftoken = getCookie("csrftoken");

    var url = "http://127.0.0.1:8000/api/todos/";

    if (editing === true) {
      url = `http://127.0.0.1:8000/api/todos/${activeItem.id}/`;

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": csrftoken
        },
        body: JSON.stringify(activeItem)
      })
        .then(() => {
          fetchTasks();
          setActiveItem({
            activeItem: { id: null, title: "", completed: false }
          });
        })
        .catch((error) => console.log("Error:", error));

      setEditing(false);
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken
      },
      body: JSON.stringify(activeItem)
    })
      .then(() => {
        fetchTasks();
        setActiveItem({
          activeItem: { id: null, title: "", completed: false }
        });
      })
      .catch((error) => console.log("Error:", error));

    setActiveItem({ id: null, title: "", completed: false });
  };

  const handleEdit = (todo) => {
    setEditing(true);
    setActiveItem(todo);
  };

  const handleDelete = (todo) => {
    let csrftoken = getCookie("csrftoken");

    fetch(`http://127.0.0.1:8000/api/todos/${todo.id}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken
      }
    }).then(() => fetchTasks());
  };

  const toggleComplete = (todo) => {
    todo.completed = !todo.completed;

    let csrftoken = getCookie("csrftoken");
    let url = `http://127.0.0.1:8000/api/todos/${todo.id}/`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrftoken
      },
      body: JSON.stringify({ completed: todo.completed, title: todo.title })
    }).then(() => {
      fetchTasks();
    });
  };

  return (
    <div className="app">
      <Header />
      <Form
        activeItem={activeItem}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {todos.map((todo) => (
        <TodoList
          key={todo.id}
          todo={todo}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default App;
