const initialState = {
  items: [],
  totalCount: 0,
  totalPrice: 0,
  modalIsVisible: false,
  selectedItem: -1,
};

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

    case 'TOGGLE_MODAL_VISIBLE':
      return toggleModalVisible(state);

    case 'SET_SELECTED_ITEM':
      return setSelectedItem(state, action.selected);
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

  let itemList = state.items;
  itemList[index].size = size;
  let oldPrice = itemList[index].price;
  itemList[index].price = itemList[index].sizeOptions[size]
  let newPrice = itemList[index].price;

  return {
    ...state,
    items: [...itemList],
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

const toggleModalVisible = (state) => {
  return {
    ...state,
    modalIsVisible: !state.modalIsVisible,
  }
}

const setSelectedItem = (state, selected) => {
  return {
    ...state,
    selectedItem: selected,
  }
}


