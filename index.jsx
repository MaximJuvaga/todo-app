import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Загружаем задачи из LocalStorage при загрузке
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(savedTasks);
    }, []);

    // Сохраняем задачи в LocalStorage при изменении
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    const toggleTask = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h1>To Do List</h1>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Добавить задачу"
                    style={{ width: "calc(100% - 50px)", marginRight: "10px" }}
                />
                <button onClick={addTask}>Добавить</button>
            </div>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {tasks.map((task, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                        <span
                            onClick={() => toggleTask(index)}
                            style={{
                                textDecoration: task.completed ? "line-through" : "none",
                                cursor: "pointer",
                            }}
                        >
                            {task.text}
                        </span>
                        <button
                            onClick={() => deleteTask(index)}
                            style={{
                                marginLeft: "10px",
                                background: "red",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
