export const addToCart = (item) => {
  return { type: 'ADD_TO_CART', item: item};
};

export const removeFromCart = (item) => {
  return { type: 'REMOVE_FROM_CART', item: item};
}

export const setCart = (cart) => {
  return { type: 'SET_CART', cart: cart};
}
