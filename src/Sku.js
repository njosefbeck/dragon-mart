class Sku {
  constructor(stripeObject) {
    this.id = stripeObject.node.id;
    this.attributes = stripeObject.node.attributes;
    this.image = stripeObject.node.image;
    this.price = stripeObject.node.price;
    this.product = stripeObject.node.product;
    this.object = stripeObject.node.object;
  }
};

export default Sku;