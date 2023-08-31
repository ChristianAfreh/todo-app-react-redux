import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



//1. import createAsyncThunk to create thunk(a func that returns another function)
//2. this thunk is the new action which we dispatch from our components.
//3. This will in turn dispatch its own action when the response completes, with the 
// data from the response as the payload.
export const getTodosAsync = createAsyncThunk(
    'todos/getTodosAsync',
    async () => {
        const resp = await fetch('http://localhost:7000/todos');
        if(resp.ok){
            const todos = await resp.json();
            return {todos};
        }
    }
);


//Add a new todo item
export const addTodoAsync = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const resp = await fetch('http://localhost:7000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: payload.title }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);


//update completed property of todo
export const toggleCompleteAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completed: payload.completed }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

//delete a todo item passing the id
export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodoAsync',
    async(payload) =>{
        const resp = await fetch(`http://localhost:7000/todos/${payload.id}`,{
            method: 'DELETE'
        });

        if(resp.ok){
            return {id: payload.id};
        }

    }
);

//1. a slice gives us a way to store a piece(or slice) of data
//and gives us all things we need to change and retrieve that data
export const todoSlice = createSlice({
    name: 'todos',
    initialState:[
        {id: 1, title: 'todo1', completed: false},
        {id: 2, title: 'todo2', completed: false},
        {id: 3, title: 'todo3', completed: true},
        {id: 4, title: 'todo4', completed: false},
        {id: 5, title: 'todo5', completed: false},
    ],

    reducers: {
        addTodo: (state,action) => {
            const todo = {
                id: new Date(),
                title: action.payload.title,
                completed: false
            };
            state.push(todo);
           //return [...state,todo];
        },
        toggleComplete: (state,action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state,action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        }
    },

    extraReducers: {
        [getTodosAsync.fulfilled]: (state,action) => {
            return action.payload.todos;
        },

        [addTodoAsync.fulfilled]: (state, action) => {
			state.push(action.payload.todo);
		},

        [toggleCompleteAsync.fulfilled]: (state, action) => {
			const index = state.findIndex(
				(todo) => todo.id === action.payload.todo.id
			);
			state[index].completed = action.payload.todo.completed;
		},

        [deleteTodoAsync.fulfilled]: (state,action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        }
    }
});

export const {addTodo,toggleComplete,deleteTodo} = todoSlice.actions;

export default todoSlice.reducer;