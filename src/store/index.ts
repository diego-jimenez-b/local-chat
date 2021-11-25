import { combineReducers, createStore } from 'redux';
import { ChatReducer } from './reducers/ChatReducer';

export const rootReducer = combineReducers({
  chat: ChatReducer,
});
export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
