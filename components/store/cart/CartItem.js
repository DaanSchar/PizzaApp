class CartItem{

  constructor(item, quantity) {
    this.price = item.price;
    this.image = item.image;
    this.title = item.title;
    this.id = item.id;
    this.quantity = quantity;
    this.size = item.selectedSize;
  }

}

export default CartItem;
