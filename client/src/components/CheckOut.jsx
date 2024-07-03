import React, { useContext } from 'react';
import { CartContext } from '../components/CartContext.jsx';

const CheckOut = () => {
    const { cartItems } = useContext(CartContext);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    return (
        <div className="flex justify-center items-start p-8 bg-blue-100 min-h-screen">
            {/* Payment Summary */}
            <div className="w-1/3 bg-orange-500 text-white p-6 rounded-lg shadow-lg mt-6">
                <h2 className="text-2xl mb-4">Payment Summary</h2>
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index} className="flex justify-between mb-2">
                            <span>{item.name}</span>
                            <span>kshs {(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>kshs {calculateTotal()}</span>
                </div>
            </div>

            {/* Payment Form */}
            <div className="w-2/4 bg-white p-6 rounded-lg shadow-lg ml-8 mt-6">
                <h2 className="text-2xl mb-4">Payment Details</h2>
                <div className="mb-4">
                    <div className="flex mb-2">
                        <button className="w-1/2 p-2 border border-gray-300 rounded-l-lg bg-white text-center hover:bg-gray-100">
                            <img src="visa.png" alt="Visa" className="inline-block h-6" />
                            <img src="amex.png" alt="Amex" className="inline-block h-6" />
                            <img src="mastercard.png" alt="Mastercard" className="inline-block h-6" />
                        </button>
                        <button className="w-1/2 p-2 border border-gray-300 rounded-r-lg bg-gray-100 text-center text-gray-400">
                            <img src="paypal.png" alt="PayPal" className="inline-block h-6" />
                        </button>
                    </div>
                </div>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Card Number</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="1234 - 4567 - 8901 - 2345" />
                    </div>
                    <div className="flex mb-4">
                        <div className="w-1/2 mr-2">
                            <label className="block text-gray-700">Card Holder Name</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Miki Nagai" />
                        </div>
                        <div className="w-1/4 mr-2">
                            <label className="block text-gray-700">CVC</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" placeholder="123" />
                        </div>
                        <div className="w-1/4">
                            <label className="block text-gray-700">Expiration Date</label>
                            <select className="w-full p-2 border border-gray-300 rounded-lg">
                                <option>December</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="w-full p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                        Make a Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CheckOut;
