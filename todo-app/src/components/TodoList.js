import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosAsync } from '../redux/todoSlice';

const TodoList = () => {
	const dispatch = useDispatch();
	//useSelector accepts a function, and returns us the data based on that function.
	const todos = useSelector((state) => state.todos);

	useEffect(() => {
		dispatch(getTodosAsync());
	},[dispatch]);

	return (
		<ul className='list-group'>
			{todos.map((todo) => (
				 <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
			))}
		</ul>
	);
};

export default TodoList;