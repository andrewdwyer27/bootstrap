import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useContext } from "react";
import { UserDataContext } from "../lib/context";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function CheckoutButton({ customPrice }) {
    const { user } = useContext(UserDataContext);
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  return (
    <form action={`/api/stripe/buy-handbook?email=${user?.email}&customPrice=${customPrice}`} method="POST">
      <section>
        <button type="submit" role="link" className="w-full hover:drop-shadow-lg">
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          button {
            background: rgba(48,131,109,1);
            padding: 10px;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}