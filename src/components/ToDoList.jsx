import { useState, useEffect } from 'react';
import db from '../lib/firebase';
import { doc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';

const TodoList = () => {
	const initialState = [];

	const [todos, setTodos] = useState(initialState);
	const [task, setTask] = useState('');

	useEffect(() => {
		const todoCollectionRef = collection(db, 'todos');
		getDocs(todoCollectionRef).then((querySnapshot) => {
			setTodos(
				querySnapshot.docs.map((doc) => {
					let todo = doc.data();
					todo['id'] = doc.id;
					return todo;
				})
			);
		});
	}, []);

	const onChangeTask = (event) => {
		setTask(event.target.value);
	};
	const submitTodo = async (event) => {
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
	const changeTodoStatus = (index) => {
		const newTodos = todos.map((todo, todoIndex) => {
			if (todoIndex === index) todo.isCompleted = !todo.isCompleted;
			return todo;
		});
		setTodos(newTodos);
	};
	const removeTodo = async (index) => {
		const id = todos[index].id;
		const todoDocumentRef = doc(db, 'todos', id);
		await deleteDoc(todoDocumentRef);

		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	return (
		<div>
			<h1>ToDo List</h1>
			<form onSubmit={submitTodo}>
				Add Task:
				<input
					value={task}
					placeholder="Add New Task"
					onChange={onChangeTask}
				/>
				<button type="submit">Add</button>
			</form>
			<ul>
				{todos.map((todo, index) => (
					<li key={index}>
						{todo.task}
						<span onClick={() => changeTodoStatus(index)}>
							{todo.isCompleted ? '✅' : '🔲'}
						</span>
						<span onClick={() => removeTodo(index)}>X</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TodoList;
