
const initialState = {
  items: [],
  totalCount: 0,
  totalPrice: 0};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'ADD_TO_CART':
      return addItemToState(state, action.item);

    case 'REMOVE_FROM_CART':
      return removeItemFromState(state, action.item);

    case "SET_CART":
      return action.cart;
  }
  return state;
};

const addItemToState = (state, item) => {

  state = {
    ...state,
    items: [...state.items, item]
  }

  return state;
}

/**
 * TODO: sort array , dont use quantities.
 */

const removeItemFromState = (state, item) => {

  return {
    ...state,
    items: state.items.filter(stateItem => itemIndex(stateItem) !== itemIndex(item))
  }

  return state;
}

const itemIndex = (item) => {
  let index = item.id + item.size

  return index
}

