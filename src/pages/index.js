import React from 'react';
import App from '../components/App';
import { graphql } from 'gatsby';
import { ShopContext } from '../ShopProvider';
import './index.css';

class IndexPage extends React.Component {
  render() {
    return (
      <ShopContext.Consumer>
        {({ skus, cart, buildSkus }) => (
            <App {...this.props} skus={skus} cart={cart} buildSkus={buildSkus} />
          )
        }
      </ShopContext.Consumer>
    );
  };
};

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
