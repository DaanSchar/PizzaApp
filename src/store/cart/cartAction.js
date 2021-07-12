export const addToCart = (item) => {
  return { type: 'ADD_TO_CART', item: item};
};

export const removeFromCart = (item, index) => {
  return { type: 'REMOVE_FROM_CART', item: item, index: index};
}

export const updateItemSize = (index, size) => {
  return { type: 'UPDATE_ITEM_SIZE',  index: index, size: size};
}

export const addNote = (index, text) => {
  return { type: 'ADD_NOTE', index: index, text: text};
}

export const toggleModalVisible = () => {
  return { type: 'TOGGLE_MODAL_VISIBLE'};
}

export const setSelectedItem = (selected) => {
  return { type: 'SET_SELECTED_ITEM', selected: selected}
}
