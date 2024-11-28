
import { legacy_createStore as createStore, combineReducers } from 'redux';

const pageTurner = (state = 0, action) => {
  switch (action.type) {
    case 'BASE':
      return 0
    case 'TIMELINE':
      return 1
    case 'INTERACTION':
      return 2
    default:
    return state
  }
};

const videoReducer = (state = [], action) => {
  if (action.type === 'NEW_VIDEO') {
    state.push(action.payload)
    return state
  }

  return state
}

const rootReducer = combineReducers({
  pageTurner: pageTurner, 
  videoReducer: videoReducer
});

const store = createStore(rootReducer);

export default store;
