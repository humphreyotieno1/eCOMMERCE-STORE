import React, { useContext, useState } from 'react';
import { CartContext } from '../components/CartContext.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import mastercardLogo from '../assets/mastercard.svg';
import visaLogo from '../assets/visa.svg';
import mpesaLogo from '../assets/mpesa.webp';
import paypalLogo from '../assets/paypal.svg';

const CheckOut = () => {
    const { cartItems } = useContext(CartContext);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const [expirationDate, setExpirationDate] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    return (
        <div className="flex justify-center items-start p-8 bg-blue-100 min-h-screen">
            {/* Payment Summary */}
            <div className="w-1/3 bg-blue-500 text-white p-6 rounded-lg shadow-lg mt-6">
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
                        <button
                            className="w-1/2 p-2 border border-gray-300 rounded-l-lg bg-white text-center hover:bg-gray-100"
                            onClick={() => setSelectedPaymentMethod('card')}
                        >
                            <img src={visaLogo} alt="Visa" className="inline-block h-20" />
                            <img src={mastercardLogo} alt="Mastercard" className="inline-block h-20" />
                        </button>
                        <button
                            className="w-1/3 p-2 border border-gray-300 rounded-r-lg bg-gray-100 text-center text-gray-400"
                            onClick={() => setSelectedPaymentMethod('mpesa')}
                        >
                            <img src={mpesaLogo} alt="Mpesa" className="inline-block h-20" />
                        </button>
                        <button
                            className="w-1/3 p-2 border border-gray-300 rounded-r-lg bg-gray-100 text-center text-gray-400"
                            onClick={() => setSelectedPaymentMethod('paypal')}
                        >
                            <img src={paypalLogo} alt="PayPal" className="inline-block h-20" />
                        </button>
                    </div>
                </div>
                {selectedPaymentMethod === 'card' && (
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700">Card Number</label>
                            <input type="text" className="w-full p-2 border border-gray-300 bg-blue-100 rounded-lg" placeholder="1234 - 4567 - 8901 - 2345" />
                        </div>
                        <div className="flex mb-4">
                            <div className="w-1/2 mr-2">
                                <label className="block text-gray-700">Card Holder Name</label>
                                <input type="text" className="w-full p-2 border border-gray-300 bg-blue-100  rounded-lg" placeholder="Miki Nagai" />
                            </div>
                            <div className="w-1/4 mr-2">
                                <label className="block text-gray-700">CVC</label>
                                <input type="text" className="w-full p-2 border border-gray-300  bg-blue-100 rounded-lg" placeholder="123" />
                            </div>
                            <div className="w-1/4">
                                <label className="block text-gray-700">Expiration Date</label>
                                <DatePicker
                                    selected={expirationDate}
                                    onChange={(date) => setExpirationDate(date)}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    className="w-full p-2 border border-gray-300 bg-blue-100 rounded-lg"
                                    placeholderText="MM / YYYY"
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-orange-600">
                            Make a Payment
                        </button>
                    </form>
                )}
                {selectedPaymentMethod === 'mpesa' && (
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700">Mpesa Phone Number</label>
                            <input type="text" className="w-full p-2 border border-gray-300 bg-blue-100 rounded-lg" placeholder="07XX XXX XXX" />
                        </div>
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-green-600">
                            Make a Payment
                        </button>
                    </form>
                )}
                {selectedPaymentMethod === 'paypal' && (
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700">PayPal Email</label>
                            <input type="email" className="w-full p-2 border border-gray-300 bg-blue-100 rounded-lg" placeholder="you@example.com" />
                        </div>
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-gray-800">
                            Make a Payment
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CheckOut;