import { useState, useEffect } from 'react';
//@ts-ignore
import db from '../lib/firebase';
import { doc, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { Button, IconButton, List, ListItem, ListItemText, TextField } from '@mui/material';
import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = () => {
	//@ts-ignore
	const initialState = [];

	//@ts-ignore
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

	//@ts-ignore
	const onChangeTask = (event) => {
		setTask(event.target.value);
	};
	//@ts-ignore
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
	const changeTodoStatus = (index: number) => {
		const newTodos = todos.map((todo, todoIndex) => {
			if (todoIndex === index) todo.isCompleted = !todo.isCompleted;
			return todo;
		});
		setTodos(newTodos);
	};
	const removeTodo = async (index: number) => {
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
				<TextField
					variant="standard"
					value={task}
					placeholder="Add New Task"
					onChange={onChangeTask}
				/>
				<Button variant="text" type="submit">Add</Button>
			</form>
			<List>
				{todos.map((todo, index) => (
					<ListItem key={index}>
						<ListItemText onClick={() => changeTodoStatus(index)}>
							<span style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
								{todo.task}
							</span>
						</ListItemText>
						<IconButton onClick={() => changeTodoStatus(index)}>
							<CheckBox style={{ visibility: todo.isCompleted ? "visible" : "hidden" }} />
						</IconButton>
						<IconButton onClick={() => changeTodoStatus(index)}>
							<CheckBoxOutlineBlankIcon style={{ visibility: !todo.isCompleted ? "visible" : "hidden" }} />
						</IconButton>
						<IconButton onClick={() => removeTodo(index)}>
							<DeleteIcon />
						</IconButton>
					</ListItem>
				))}
			</List>
		</div >
	);
};

export default TodoList;
