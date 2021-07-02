import CartItem from './CartItem'
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

  if (state.items[item.id]) {
    state.items[item.id].quantity += 1;
    state.totalPrice = Math.round((state.totalPrice + parseFloat(item.price)) * 100)/100,
    state.totalCount = state.totalCount + 1

  } else {

    return {
      ...state,
      items: {
        ...state.items,
        [item.id]: new CartItem(item, 1),
      },
      totalPrice: state.totalPrice + parseFloat(item.price),
      totalCount: state.totalCount + 1,
    }

  }

  return state;
}

const removeItemFromState = (state, item) => {

  if (state.items[item.id].quantity === 1) {
    delete state.items[item.id];
    state.totalPrice = Math.round((state.totalPrice - parseFloat(item.price)) * 100)/100,
    state.totalCount = state.totalCount - 1;
  }

  else if (state.items[item.id].quantity > 1) {
    state.items[item.id].quantity -= 1;
    state.totalPrice = Math.round((state.totalPrice - parseFloat(item.price)) * 100)/100,
    state.totalCount = state.totalCount - 1;
  }

  return state;
}

