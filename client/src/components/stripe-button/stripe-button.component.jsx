import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { connect } from 'react-redux';

import { clearCart } from '../../redux/cart/cart.actions';

const StripeCheckoutButton = ({ price, clearCart }) => {
	const priceForStripe = price * 100;
	const publishablekey =
		'pk_test_51HrQNqBy92TjUARYW5up16oDIcYTrOtOFheX9BkZXgS3maOTcrxOJxYFzQGxOBXWpeWliYEFMf0eeoPUwMBylZR100KCSyC4RS';
	const onToken = (token) => {
		axios({
			url: 'http://localhost:5000/payment',
			method: 'post',
			data: {
				amount: priceForStripe,
				token: token,
			},
		})
			.then((response) => {
				alert('succesful payment');
				clearCart();
				window.open('/', '_self');
			})
			.catch((error) => {
				console.log('Payment Error: ', error);
				alert(
					'There was an issue with your payment! Please make sure you use the provided credit card.'
				);
			});
	};

	return (
		<StripeCheckout
			label='Pay Now'
			name='HEHE Clothing'
			billingAddress
			shippingAddress
			image=''
			description={`Your total is R$${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishablekey}
		/>
	);
};

const mapDispatchToProps = (dispatch) => ({
	clearCart: () => dispatch(clearCart()),
});

export default connect(null, mapDispatchToProps)(StripeCheckoutButton);
