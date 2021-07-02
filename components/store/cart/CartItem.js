class CartItem{

  constructor(item, quantity) {
    this.price = item.price;
    this.image = item.image;
    this.title = item.title;
    this.id = item.id;
    this.quantity = quantity;
  }

}

export default CartItem;
