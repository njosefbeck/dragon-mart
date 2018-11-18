const uuidv4 = require('uuid/v4');

class Cart {
  constructor() {
    this.id = uuidv4();
    this.date = Date.now();
    this.items = [];
  }
};

export default Cart;