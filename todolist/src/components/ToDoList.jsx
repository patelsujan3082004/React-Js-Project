// ToDoList.jsx
import React, { useState } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, editTask } from "../store"; // adjust path if needed

function ToDoList() {
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const tasks = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    if (editIndex !== null) {
      dispatch(editTask(editIndex, task));
      setEditIndex(null);
    } else {
      dispatch(addTask(task));
    }

    setTask("");
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    dispatch(removeTask(index));
    if (editIndex === index) {
      setTask("");
      setEditIndex(null);
    }
  };

  return (<>
    

    <div className="todo-container">
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      <ul className="todo-list">
        {tasks.length === 0 ? (
          <p className="empty-msg"></p>
        ) : (
          tasks.map((taskItem, index) => (
            <li key={index} className="todo-item">
              <span>{taskItem}</span>
              <div className="btn-group">
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(index)}
                >
                <FaPen />
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  <MdDelete />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
    </>
  );
}

export default ToDoList;
