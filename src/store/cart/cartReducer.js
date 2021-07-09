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
  return  {
    ...state,
    items: [...state.items, item],
    totalPrice: refactorPrice(parseFloat(state.totalPrice) + parseFloat(item.price)),

  }
}

const removeItemFromState = (state, item, index) => {
  return  {
    ...state,
    items: state.items.filter((pr, ind) => ind != index),
    totalPrice: refactorPrice(parseFloat(state.totalPrice) - parseFloat(item.price)),
  }
}

const refactorPrice = (totalPrice) => {
  totalPrice = Math.round(totalPrice * 100) / 100

  if (totalPrice % 1 === 0)
    return totalPrice.toString() + ".00";
  else {
    let decimals = totalPrice.toString().split('.')[1];
    if (decimals.length === 1)
        return totalPrice.toString() + '0';
  }
  return totalPrice.toString();
}


