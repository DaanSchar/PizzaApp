
const initialState = {
  items: [],
  totalCount: 0,
  totalPrice: 0};

export default (state = initialState, action) => {

  switch (action.type) {
    case 'ADD_TO_CART':
      return addItemToState(state, action.item);

    case 'REMOVE_FROM_CART':
      return removeItemFromState(state, action.item, action.index);

    case "SET_CART":
      return action.cart;
  }
  return state;
};

const addItemToState = (state, item) => {

  state = {
    ...state,
    items: [...state.items, item],
    totalPrice: state.totalPrice += item.price,
  }

  return state;
}

const removeItemFromState = (state, item, index) => {

  return  {
    ...state,
    items: state.items.filter((pr, ind) => ind != index),
    totalPrice: state.totalPrice -= item.price,
  }
}


