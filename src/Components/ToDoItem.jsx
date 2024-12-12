import { useState } from 'react';

function ToDoItem({ id, task, isChecked, isEditing, onToggle, onEdit, onRemove }) {
    const [newTask, setNewTask] = useState(task);

    function handleToggle() {
        onToggle(id);
    }

    function handleEditStart() {
        onEdit(id, task);
    }

    function handleSaveEdit() {
        if (newTask.trim() === '') return;
        onEdit(id, newTask, true); 
    }

    return (
        <li className="flex items-center justify-between space-x-4 mx-8  bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center space-x-4">
                <input
                    type="checkbox"
                    onChange={handleToggle}
                    checked={isChecked}
                    className="h-5 w-5 text-green-500 hover:scale-110 transition duration-200"
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="text-green-600 bg-transparent text-lg font-semibold border-b-2 border-green-500 focus:outline-none"
                        placeholder="Edit task"
                    />
                ) : (
                    <span
                        className={`text-xl ${isChecked ? 'line-through text-green-500' : 'text-gray-800'}`}
                    >
                        {task}
                    </span>
                )}
            </div>
            <div className="flex items-center space-x-3">
                {isEditing ? (
                    <button
                        onClick={handleSaveEdit}
                        className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-lg transition duration-200"
                    >
                        Save
                    </button>
                ) : (
                    <button
                        onClick={handleEditStart}
                        className="bg-blue-600 text-white hover:bg-orange-300 px-4 py-2 rounded-lg transition duration-200"
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={() => onRemove(id)}
                    className="bg-blue-600 text-white hover:bg-orange-300 px-4 py-2 rounded-lg transition duration-200"
                >
                    ❌
                </button>
            </div>
        </li>
    );
}

export default ToDoItem;
