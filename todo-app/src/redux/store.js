import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';


//1. This func does all the work by creating the store which holds our state,combines
//our reducers and has some nice built-in middleware for use later.
//2. Returns a store which we export. This allows us to link the store to our app
//3. We need to pass our reducers to the configureStore func which we do by passing an object(as many reducers as we want)
export default configureStore({
	reducer: {
        todos: todoReducer,
    },
});