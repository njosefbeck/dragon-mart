import React from 'react';
import uuidv4 from 'uuid/v4';
import { pluralize } from '../helpers';

class OptionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelection(e) {
    let sku = this.props.selection.sku;
    let color = sku.color;
    let size = sku.size;
    let amount = this.props.selection.amount;
    let totalPrice = this.props.selection.totalPrice;

    switch(e.target.name) {
      case 'color':
        color = e.target.value;
        break;
      case 'size':
        size = e.target.value;
        break;
      case 'amount':
        amount = parseInt(e.target.value);
        break;
      default:
        break;
    }

    sku = this.props.skus.find(sku => sku.attributes.name === `${size} ${color} Dragon`);
    totalPrice = amount * sku.priceDollars;

    this.props.updateSelection({
      amount,
      totalPrice,
      sku
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const item = {
      id: uuidv4(),
      sku: this.props.selection.sku,
      amount: this.props.selection.amount,
      totalPrice: this.props.selection.totalPrice
    };

    this.props.addToCart(item);
  }

  isSubmitDisabled() {
    return this.props.selection.amount === 0 || isNaN(this.props.selection.amount);
  }

  renderOptions(type) {
    if (this.props[type]) {
      return this.props[type].map(value => {
        return <option key={value} value={value}>{value}</option>
      })
    }
  }

  renderButtonText() {
    if (isNaN(this.props.selection.amount)) {
      return `Amount can't be empty!`;
    }

    return `Add ${this.props.selection.amount} ${this.props.selection.sku.size} ${this.props.selection.sku.color} ${pluralize(this.props.selection.amount, 'Dragon')} to cart for $${this.props.selection.totalPrice}?`;
  }

  render() {
    if (!this.props.selection || !this.props.selection.sku) {
      return (
        <div>Loading form..</div>
      );
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-element">
          <p className="error"></p>
          <label>
            <span className="label">Amount:</span>
            <input 
              type="number"
              name="amount"
              min="0"
              value={this.props.selection.amount}
              onChange={this.handleSelection}
            />
          </label>
        </div>
        <div className="form-element">
          <label>
            <span className="label">Color:</span>
            <select
              value={this.props.selection.color}
              name="color"
              onChange={this.handleSelection}
            >
              {this.renderOptions('colors')}
            </select>
          </label>
        </div>
        <div className="form-element">
          <label>
            <span className="label">Size:</span>
            <select
              value={this.props.selection.size}
              name="size"
              onChange={this.handleSelection}
            >
              {this.renderOptions('sizes')}
            </select>
          </label>
        </div>
        <button type="submit" name="submit" disabled={this.isSubmitDisabled()}>
          {this.renderButtonText()}
        </button>
      </form>
    );
  }
};

export default OptionsForm;