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

    case "UPDATE_ITEM_SIZE":
      return updateItemSize(state, action.index, action.size);

    case 'ADD_NOTE':
      return addNote(state, action.index, action.text);
  }
  return state;
};

const addItemToState = (state, item) => {
  return  {
    ...state,
    items: [...state.items, {...item}],
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

const updateItemSize = (state, index, size) => {

  let items = state.items;
  items[index].size = size;
  let oldPrice = items[index].price;
  items[index].price = items[index].sizeOptions[size]
  let newPrice = items[index].price;

  return {
    ...state,
    items: items,
    totalPrice: refactorPrice(parseFloat(state.totalPrice) - parseFloat(oldPrice) + parseFloat(newPrice)),
  }
}

const addNote = (state, index, text) => {
   let items = state.items;
   items[index].notes = text;

   return {
     ...state,
     items: items,
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


