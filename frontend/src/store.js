
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
  if (action.type === 'ALL_VIDEOS') {
    state = action.payload
    return state
  }

  return state
}

const viewReducer = (state = [], action) => {
  if (action.type === 'NEW_VIEW') {
    state.push(action.payload)
    return state
  }
  if (action.type === 'ALL_VIEWS') {
    state = action.payload
    return state
  }

  return state
}

const commentReducer = (state = [], action) => {
  if (action.type === 'NEW_COMMENT') {
    state.push(action.payload)
    return state
  }
  if (action.type === 'ALL_COMMENTS') {
    state = action.payload
    return state
  }

  return state
}

const reactionReducer = (state = [], action) => {
  if (action.type === 'NEW_REACTION') {
    state.push(action.payload)
    return state
  }
  if (action.type === 'ALL_REACTIONS') {
    state = action.payload
    return state
  }

  return state
}

const rootReducer = combineReducers({
  pageTurner: pageTurner, 
  videoReducer: videoReducer,
  viewReducer: viewReducer,
  commentReducer: commentReducer,
  reactionReducer: reactionReducer
});

const store = createStore(rootReducer);

export default store;
