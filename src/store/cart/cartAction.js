export const addToCart = (item) => {
  return { type: 'ADD_TO_CART', item: item};
};

export const removeFromCart = (item, index) => {
  return { type: 'REMOVE_FROM_CART', item: item, index: index};
}

export const setCart = (cart) => {
  return { type: 'SET_CART', cart: cart};
}
