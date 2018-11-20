import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { navigate } from "gatsby";
import uuidv4 from 'uuid/v4';
import Sku from '../Sku';
import './index.css';

import OptionsForm from '../components/OptionsForm';
import Cart from '../components/Cart';
import Alert from '../components/Alert';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    const skus = props.data.allStripeSku.edges.map(sku => new Sku(sku));
    const colors = new Set(skus.map(sku => sku.color));
    const sizes = new Set(skus.map(sku => sku.size));

    this.state = {
      skus,
      colors: Array.from(colors),
      sizes: Array.from(sizes),
      cart: {
        id: uuidv4(),
        items: []
      },
      selection: {
        amount: 0,
        totalPrice: 0 * skus[0].priceDollars,
        sku: skus[0]
      },
      showAlert: props.location.hash === '#cancelled' || props.location.hash === '#success'
    };

    this.closeAlert = this.closeAlert.bind(this);
    this.updateSelection = this.updateSelection.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.removeAllFromCart = this.removeAllFromCart.bind(this);
  }

  closeAlert(e) {
    e.preventDefault();
    this.setState({ showAlert: false });
    navigate('/');
  }

  updateSelection(payload) {
    this.setState({ selection: payload });
  }

  addToCart(item) {
    const cart = {
      ...this.state.cart,
      items: this.state.cart.items.concat(item)
    };

    this.setState({ cart });
  }

  removeFromCart(id) {
    if (this.state.cart.items.length > 1) {
      const cart = {
        ...this.state.cart,
        items: this.state.cart.items.filter(item => item.id !== id)
      }

      this.setState({ cart });
    }
  }

  removeAllFromCart() {
    const cart = {
      ...this.state.cart,
      items: []
    };

    this.setState({ cart });
  }

  renderImage() {
    if (!this.state.selection.sku) {
      return 'No matching sku :(';
    }

    if (!this.state.selection.sku.image.length) {
      return 'We have no image :(';
    }

    return <img src={this.state.selection.sku.image} alt="Dragon" />;
  }

  render() {
    return (
      <div className="app">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dragon Mart | Gatsby.js + Stripe Checkout POC</title>
          <meta name="description" content="A proof-of-concept showing how to integrate Stripe Checkout with a Gatsby.js static site." />
        </Helmet>
        {this.state.showAlert &&
          <Alert
            hash={this.props.location.hash}
            closeAlert={this.closeAlert}
          />
        }
        <header>
          <h1 className="site-title">Dragon Mart</h1>
        </header>
        <main>
          <p className="intro">Welcome! Here you can pretend buy your very own special dragon. Pick out the color you want, the size, and we'll pretend to ship it directly to your house. We'll never run out of stock, so buy as many dragons as you want!</p>

          <p className="intro">The real purpose of this website is to be a proof of concept e-commerce store powered by GatsbyJS, Netlify, and Stripe Checkout. Check out the <a href="https://github.com/njosefbeck/dragon-mart" target="_blank" rel="noopener noreferrer">repo</a> for more information.</p>

          <p className="intro">You won't be charged and the app won't remember any of your information. Feel free to use credit card number 4242 4242 4242 4242 and any date in the future and any three-digit code to test!</p>

          <section>
            <h2>Your Dragon Options</h2>
            <div className="options-container">
              <div className="form-container">
                <OptionsForm
                  skus={this.state.skus}
                  colors={this.state.colors}
                  sizes={this.state.sizes}
                  selection={this.state.selection}
                  updateSelection={this.updateSelection}
                  addToCart={this.addToCart}
                />
              </div>
              <div className="image-container">{this.renderImage()}</div>
            </div>
          </section>

          <section className="cart">
            <h2>Your Cart</h2>
            <Cart
              cart={this.state.cart}
              removeFromCart={this.removeFromCart}
              removeAllFromCart={this.removeAllFromCart}
            />
          </section>

        </main>
        <footer>
          Built with love by <a href="https://njosefbeck.com" target="_blank" rel="noopener noreferrer">njosefbeck</a>
        </footer>
      </div>
    );
  }
}

export const query = graphql`
  query {
    allStripeSku(
      filter: {
        product: { 
          name: {eq: "Dragon"}
        }
      }
    ) {
      edges {
        node {
          id
          object
          attributes {
            name
          }
          image
          price
          product {
            name
          }
        }
      }
    }
  }
`;

export default IndexPage;
