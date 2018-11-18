import React from 'react';
import Cart from './Cart';
import Sku from './Sku';

export const ShopContext = React.createContext();

export class ShopProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skus: undefined,
      cart: new Cart()
    };

    this.buildSkus = this.buildSkus.bind(this);
  }

  buildSkus(stripeSkus) {
    this.setState({
      skus: stripeSkus.map(sku => new Sku(sku))
    });
  }

  render() {
    return (
      <ShopContext.Provider value={{ ...this.state, buildSkus: this.buildSkus }} >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
};