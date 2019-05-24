class Sku {
  constructor(stripeObject) {
    this.id = stripeObject.node.id;
    this.attributes = stripeObject.node.attributes;
    this.image = stripeObject.node.image;
    this.priceCents = stripeObject.node.price;
    this.product = stripeObject.node.product;
    this.object = stripeObject.node.object;
  }

  static mapNamesToIds(skus) {
    let object = {};
    skus.forEach(sku => object[sku.attributes.name] = sku.id);
    return object;
  }

  get size() {
    // eslint-disable-next-line
    const [size, color, product] = this.attributes.name.split(' ');
    return size;
  }

  get color() {
    // eslint-disable-next-line
    const [size, color, product] = this.attributes.name.split(' ');
    return color;
  }

  get priceDollars() {
    return this.priceCents / 100;
  }
};

export default Sku;