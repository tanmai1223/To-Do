import React, { useState ,useEffect} from "react";

import "../Styles/Form.css";

function Form() {
  const [todo, setTodo] = useState("");
  const [todolist, setTodolist] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    try {
      if (isEditing) {
        // PUT request to update
        const response = await fetch(`http://localhost:3000/todo/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todo }),
        });
        if (!response.ok) throw new Error("Failed to update task");
        const updatedTask = await response.json();

        setTodolist((prev) =>
          prev.map((item) => (item._id === editId ? updatedTask : item))
        );

        setIsEditing(false);
        setEditId(null);
      } else {
        // POST request to create
        const response = await fetch("http://localhost:3000/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ todo }),
        });

        if (!response.ok) throw new Error("Failed to add task");
        const newTodo = await response.json();
        setTodolist((prev) => [...prev, newTodo]);
      }

      setTodo(""); // clear input in both cases
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/todo");
        const data = await res.json();
        setTodolist(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) return console.log("Couldnt delete");
      setTodolist((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form className="single-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="todo"
          name="todo"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
          placeholder="Type Something"
        />
        <button type="submit">{isEditing ? "Update" : "Submit"}</button>

      </form>
      <ul className="task-list">
        {todolist.map((todo) => (
          <li key={todo._id} className="task-item">
            <span className="task-text">{todo.todo}</span>
            <div className="task-buttons">
              <button
                className="edit-btn"
                onClick={() => {
                  setIsEditing(true);
                  setTodo(todo.todo); // load current value into input
                  setEditId(todo._id); // store the id being edited
                }}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  handleDelete(todo._id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Form;
