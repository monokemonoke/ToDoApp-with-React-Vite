import { useState } from 'react';
import db from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const getTodoListFromFirestore = async () => {
	// const todoRef = db.collection('todos');
	// const todos = [];

	// todoRef.get().then((querySnapshot) => {
	// 	querySnapshot.forEach((doc) => {
	// 		todos.push(doc.date());
	// 	});
	// });
	// return todos;
	const firebaseConfig = {
		apiKey: 'AIzaSyAul-IcZtmL1-iHLYhmUOqVyMsbiF9hHkU',
		authDomain: 'todoapp-21c6a.firebaseapp.com',
		projectId: 'todoapp-21c6a',
		storageBucket: 'todoapp-21c6a.appspot.com',
		messagingSenderId: '776048101146',
		appId: '1:776048101146:web:2f32f50484076da64acea3',
		measurementId: 'G-MHE91BDY5V',
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	db.collection('todos')
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(`${doc.id} => ${doc.data()}`);
			});
		});

	// const docRef = doc(db, "todos", "QNzCFw3SZM0oQe98Ylk7");
	// const doc = await getDocFromCache(docRef);
	// console.log(doc.data());

	return [];
};

const TodoList = () => {
	getTodoListFromFirestore();

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

	const handleNewTask = (event) => {
		setTask(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		if (task === '') return;
		setTodos((todos) => [...todos, { task, isCompleted: false }]);
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
