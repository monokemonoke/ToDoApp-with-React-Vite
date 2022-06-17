// import { useState } from 'react';
import db from '../lib/firebase';
import { doc, getDocs, addDoc } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';

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
	];

	const [todos, setTodos] = useState(initialState);
	const [task, setTask] = useState('');

	useEffect(() => {
		const todoCollectionRef = collection(db, 'todos');
		getDocs(todoCollectionRef).then((querySnapshot) => {
			setTodos(querySnapshot.docs.map((doc) => doc.data()));
		});
	}, []);

	const handleNewTask = (event) => {
		setTask(event.target.value);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (task === '') return;
		setTodos((todos) => [...todos, { task, isCompleted: false }]);
		const todoCollectionRef = collection(db, 'todos');
		await addDoc(todoCollectionRef, {
			task: task,
			isCompleted: false,
		});
		setTask('');
	};
	const handleUpdateTask = (index) => {
		const newTodos = todos.map((todo, todoIndex) => {
			if (todoIndex === index) todo.isCompleted = !todo.isCompleted;
			return todo;
		});
		setTodos(newTodos);
	};
	const handleRemoveTask = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	return (
		<div>
			<h1>ToDo List</h1>
			<form onSubmit={handleSubmit}>
				Add Task:
				<input
					value={task}
					placeholder="Add New Task"
					onChange={handleNewTask}
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{todos.map((todo, index) => (
					<li key={index}>
						{todo.task}
						<span onClick={() => handleUpdateTask(index)}>
							{todo.isCompleted ? '✅' : '⬜'}
						</span>
						<span onClick={() => handleRemoveTask(index)}>X</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
