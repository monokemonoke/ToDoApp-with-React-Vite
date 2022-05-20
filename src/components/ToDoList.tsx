import { useState } from 'react';

const TodoList = () => {
    const initialState = [
        {
            task: 'Learn vue.js',
            isCompleted: false,
        },
        {
            task: 'Learn React',
            isCompleted: false,
        },
        {
            task: 'Learn vite',
            isCompleted: false,
        },
    ]

    const [todos, setTodos] = useState(initialState);
    const [task, setTask] = useState('');

    const handleNewTask = (event: any) => {
        setTask(event.target.value);
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (task === '') return;
        setTodos(todos => [...todos, { task, isCompleted: false }]);
        setTask('');
    }

    return (
        <div>
            <h1>ToDo List</h1>
            <form onSubmit={handleSubmit}>
                Add Task:
                <input
                    value={task}
                    placeholder='Add New Task'
                    onChange={handleNewTask}
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo.task}
                        <button>{todo.isCompleted ? "Fin" : "WIP"}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;