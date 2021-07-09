import CartItem from './CartItem'
import { useEffect } from "react";
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

  if (state.items[itemIndex(item)]) {
    state.items[itemIndex(item)].quantity += 1;
    state.totalPrice = Math.round((state.totalPrice + parseFloat(item.price)) * 100)/100,
    state.totalCount = state.totalCount + 1

  } else {

    return Object.assign({}, state,{
      ...state,
      items: {
        ...state.items,
        [itemIndex(item)]: new CartItem(item, 1),
      },
      totalPrice: state.totalPrice + parseFloat(item.price),
      totalCount: state.totalCount + 1,
    })

  }

  return state;
}

const removeItemFromState = (state, item) => {

  if (state.items[itemIndex(item)].quantity === 1) {
    delete state.items[itemIndex(item)];
    state.totalPrice = Math.round((state.totalPrice - parseFloat(item.price)) * 100)/100,
    state.totalCount = state.totalCount - 1;
  }

  else if (state.items[itemIndex(item)].quantity > 1) {
    state.items[itemIndex(item)].quantity -= 1;
    state.totalPrice = Math.round((state.totalPrice - parseFloat(item.price)) * 100)/100,
    state.totalCount = state.totalCount - 1;
  }

  return state;
}

const itemIndex = (item) => {
  let index = item.id + item.size

  return index
}

