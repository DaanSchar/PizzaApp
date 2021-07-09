import { ADD_TO_FAV , REMOVE_FROM_FAV} from "./favAction";

const initialState = { items: []};

export default (state = initialState, action) => {

  let newState;

  switch (action.type) {
    case ADD_TO_FAV:
      newState = addItemToState(state, action.item);
      return newState;

    case REMOVE_FROM_FAV:
      newState = removeItemFromState(state, action.item);
      return newState;
  }
  return state;
}

const addItemToState = (state, item) => {

  for (let i = 0; i < state.items.length; i++) {
    if (state.items[i].title === item.title) {
      return state;
    }
  }

  return {
    items: [...state.items, item]
  }
}

const removeItemFromState = (state, item) => {
  for (let i = 0; i < state.items.length; i++) {
    if (state.items[i].title === item.title) {
      state.items.splice(i,1);
    }
  }

  return state;
}
