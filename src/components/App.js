import React from 'react';
import Helmet from 'react-helmet';
import './app.css';

class App extends React.Component {
  componentDidMount() {
    this.props.buildSkus(this.props.data.allStripeSku.edges);
  }
  
  render() {
    return (
      <div className="app">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Dragon Mart | Gatsby.js + Stripe Checkout POC</title>
          <meta name="description" content="A proof-of-concept showing how to integrate Stripe Checkout with a Gatsby.js static site." />
        </Helmet>
        <header>
          <h1 className="site-title">Dragon Mart</h1>
        </header>
        <main>
          <p className="intro">Welcome! Here you can pretend buy your very own special dragon. Pick out the color you want, the size, and we'll pretend to ship it directly to your house. We'll never run out of stock, so buy as many dragons as you want!</p>

          <p className="intro">The real purpose of this website is to be a proof of concept e-commerce store powered by GatsbyJS, Netlify, and Stripe Checkout. Check out the <a href="https://github.com/njosefbeck/dragon-mart" target="_blank" rel="noopener noreferrer">repo</a> for more information.</p>

          <p className="intro">You won't be charged and the app won't remember any of your information. Feel free to use credit card number 4242 4242 4242 4242 and any date in the future and any three-digit code to test!</p>
        </main>
        <footer>
          Built with love by <a href="https://njosefbeck.com" target="_blank" rel="noopener noreferrer">njosefbeck</a>
        </footer>
      </div>
    );
  }
}

export default App;
