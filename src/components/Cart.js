import React from 'react';
import { pluralize, calculateProductTotals } from '../helpers';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stripe: null
    };
  }

  componentDidMount() {
    this.setState({
      stripe: window.Stripe('pk_test_U78fJAAuXr0aN5ETF5qSNR1n', {betas: ['checkout_beta_3']}) 
    })
  }

  renderStatus() {
    const cartItems = this.props.cart.items;
    let status = "Nothing in your cart yet :(.";

    if (cartItems.length) {
      const totals = calculateProductTotals(cartItems);
      status = `It looks like you're buying <strong>${totals.amount} ${pluralize(totals.amount, 'dragon')}</strong> for a grand total of <strong>$${totals.price}</strong>. Sweet!`;
    }

    return { __html: status };
  }

  handleCheckout(e) {
    e.preventDefault();

    const items = this.props.cart.items.map(item => {
      return { sku: item.sku.id, quantity: item.amount };
    })

    this.state.stripe.redirectToCheckout({
      items,
      successUrl: 'http://localhost:8000#success',
      cancelUrl: 'http://localhost:8000#cancelled',
    }).then(function (result) {
      // Display result.error.message to your customer
      console.error(result);
    });
  }

  renderCartItems() {
    return this.props.cart.items.map(item => {
      return (
        <li className="cart-item" key={item.id}>
          <div className="cancel" onClick={(e) => this.props.removeFromCart(item.id)}>remove</div>
          <img src={item.sku.image} alt={item.sku.attributes.name} />
          <p className="description">{item.amount} {item.sku.size}, {item.sku.color} <br/> {pluralize(item.amount, 'dragon')}</p>
          <p className="price">${item.totalPrice}</p>
        </li>
      );
    });
  }

  render() {
    if (!this.props.cart.items.length) {
      return <p className="status" dangerouslySetInnerHTML={this.renderStatus()} />;
    }

    return (
      <div>
        <p className="status" dangerouslySetInnerHTML={this.renderStatus()} />
        <button className="buy" name="buy" onClick={(e) => this.handleCheckout(e)}>Buy Now!</button>
        <button className="clear-cart" name="clear-cart" onClick={this.props.removeAllFromCart}>Clear All</button>
        <ul className="cart-items">
          {this.renderCartItems()}
        </ul>
      </div>
    );
  }
};

export default Cart;