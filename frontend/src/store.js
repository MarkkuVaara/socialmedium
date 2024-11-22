
import { legacy_createStore as createStore } from 'redux';

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

const store = createStore(pageTurner);

export default store;
