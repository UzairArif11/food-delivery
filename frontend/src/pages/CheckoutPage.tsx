import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CheckoutPage: React.FC = () => {
  const { totalPrice, totalItems } = useSelector((state: RootState) => state.cart);

  const handlePlaceOrder = () => {
    // Redirect to FoodPanda's checkout page
    window.location.href = 'https://foodpanda.page.link/jnQ94G2zQ1YiEKzn8';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$5.99</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${(totalPrice + 5.99).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full btn-primary block text-center py-3 rounded-lg font-medium"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CheckoutPage;

