import PropTypes from 'prop-types';
import clsx from 'clsx';

import { CardElement } from 'react-stripe-elements';

import connectStripe from '../connect';
import StripeComponent from '../base';


class StripeCard extends StripeComponent {
  getValue() {
    return this.props.stripe.createToken();
  }

  getPaymentConfirmation(secret) {
    return this.props.stripe.handleCardPayment(secret);
  }

  render() {
    const { label, children } = this.props;
    const error = this.getError();

    const className = clsx('c-stripe_card', this.props.className);
    const inputClassName = clsx('ui-input', { 'ui-input-error': error });
    const paymentProps = this.getDefaultOptions();

    let labelNode;
    if (label) labelNode = <strong className="ui-label">{label}</strong>;

    let errorNode;
    if (error) errorNode = <em className="ui-error">{error}</em>;

    return (
      <label className={className}>
        {labelNode}
        <CardElement {...paymentProps} className={inputClassName} onChange={this.handleChange} />
        {children}
        {errorNode}
      </label>
    );
  }
}

StripeCard.propTypes = {
  ...StripeComponent.propTypes,
  className: PropTypes.string,
  children: PropTypes.node,

  label: PropTypes.node,
};

export default connectStripe(StripeCard);
