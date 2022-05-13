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

    return (
        <div>
            <h1>ToDo List</h1>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index}>{todo.task}</li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;