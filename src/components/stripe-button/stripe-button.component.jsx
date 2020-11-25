import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_51HrQNqBy92TjUARYW5up16oDIcYTrOtOFheX9BkZXgS3maOTcrxOJxYFzQGxOBXWpeWliYEFMf0eeoPUwMBylZR100KCSyC4RS';

const onToken = token => {
    console.log(token);
    alert('Payment Successful');
}

    return (
        <StripeCheckout
        label= 'Pay Now'
        name='HEHE Clothing'
        billingAddress
        shippingAddress
        image= 'https://sendeyo.com/up/d/f3eb2117da'
        description={`Your total is R$${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishablekey}


      />
    );
};

export default StripeCheckoutButton;