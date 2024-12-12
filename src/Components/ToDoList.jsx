import { useState } from 'react';
import ToDoItem from './ToDoItem';
import '../css/output.css';
import Header from './Header';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [editingId, setEditingId] = useState(null);

    function addTask() {
        if (input.trim() === '') return;
        const newTask = {
            id: Date.now(),
            task: input,
            isChecked: false,
        };
        setTasks((prev) => [...prev, newTask]);
        setInput('');
    }

    function removeTask(id) {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    }

    function toggleTask(id) {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, isChecked: !task.isChecked } : task
            )
        );
    }

    function editTask(id, updatedTask, save = false) {
        if (save) {
            // Save the edited task
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === id ? { ...task, task: updatedTask } : task
                )
            );
            setEditingId(null);
        } else {
            // Start editing
            setEditingId(id);
        }
    }

    return (
        <div className="bg-orange-300 p-6 rounded-lg shadow-lg">
            <Header />
            <div className="p-4">
                <div className="flex space-x-2 mb-4">
                    <input
                        type="text"
                        placeholder="Add a new task"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="border-2 border-teal-600 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                    <button
                        onClick={addTask}
                        className="bg-teal-600 text-white hover:bg-teal-700 px-6 py-3 rounded-lg flex items-center transition duration-200"
                    >
                        <span className="mr-2">+</span>
                        Add
                    </button>
                </div>
            </div>
            <div>
                <ul className="space-y-3">
                    {tasks.map((task) => (
                        <ToDoItem
                            key={task.id}
                            id={task.id}
                            task={task.task}
                            isChecked={task.isChecked}
                            isEditing={editingId === task.id}
                            onToggle={toggleTask}
                            onEdit={editTask}
                            onRemove={removeTask}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ToDoList;
