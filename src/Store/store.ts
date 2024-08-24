import { createStore } from 'redux';
import contactReducer from './reducers';

const store = createStore(contactReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
