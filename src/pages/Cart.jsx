import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { Trash2, CreditCard, DollarSign } from 'lucide-react';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, clearCart, calculateTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Cart, 2: Checkout, 3: Confirmation
    const [orderId, setOrderId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        paymentMethod: 'card'
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleProceedToCheckout = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        setStep(2);
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        const newOrderId = Date.now();
        const order = {
            id: newOrderId,
            user: { name: user.name, email: user.email },
            items: cart.map(item => ({
                name: item.name,
                duration: item.selectedDuration,
                price: item.itemPrice,
                quantity: item.quantity || 1
            })),
            total: (calculateTotal() * 1.1).toFixed(2),
            date: new Date().toISOString(),
            status: 'Active',
            shippingDetails: formData
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push(order);
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        setOrderId(newOrderId);
        setStep(3);
        clearCart();
    };

    if (step === 3) {
        return (
            <div className="cart-page confirmation-step">
                <div className="confirmation-box">
                    <div className="success-icon">&#10003;</div>
                    <h2>Order Confirmed!</h2>
                    <p>Thank you for renting with TechRent.</p>
                    <p>Order ID: #{orderId}</p>
                    <Link to="/" className="btn btn-primary">Return Home</Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="page-title">{step === 1 ? 'Your Cart' : 'Checkout'}</h1>

                {cart.length === 0 && step === 1 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty.</p>
                        <Link to="/rentals" className="btn btn-primary">Browse Rentals</Link>
                    </div>
                ) : (
                    <div className="cart-grid">
                        {/* Left Column: Cart Items or Form */}
                        <div className="cart-items-section">
                            {step === 1 ? (
                                <div className="cart-list">
                                    {cart.map((item) => (
                                        <div key={item.uniqueId} className="cart-item">
                                            <img src={item.image} alt={item.name} className="cart-item-img" />
                                            <div className="cart-item-details">
                                                <h3>{item.name}</h3>
                                                <p className="item-specs">{item.specs.processor} | {item.specs.ram}</p>
                                                <p className="item-duration">Duration: {item.selectedDuration}</p>
                                                {item.quantity > 1 && (
                                                    <p className="item-duration">Qty: {item.quantity}</p>
                                                )}
                                            </div>
                                            <div className="cart-item-price">
                                                ${item.itemPrice}
                                            </div>
                                            <button
                                                className="btn-remove"
                                                onClick={() => removeFromCart(item.uniqueId)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="checkout-form">
                                    <h2>Shipping Details</h2>
                                    <form onSubmit={handleCheckout}>
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Address</label>
                                            <textarea
                                                name="address"
                                                required
                                                value={formData.address}
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>

                                        <h3>Payment Method</h3>
                                        <div className="payment-options">
                                            <label className={`payment-option ${formData.paymentMethod === 'card' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="card"
                                                    checked={formData.paymentMethod === 'card'}
                                                    onChange={handleInputChange}
                                                />
                                                <CreditCard size={20} /> Credit Card
                                            </label>
                                            <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'active' : ''}`}>
                                                <input
                                                    type="radio"
                                                    name="paymentMethod"
                                                    value="cod"
                                                    checked={formData.paymentMethod === 'cod'}
                                                    onChange={handleInputChange}
                                                />
                                                <DollarSign size={20} /> Cash on Delivery
                                            </label>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '2rem' }}>Confirm Order</button>
                                        <button
                                            type="button"
                                            className="btn btn-outline btn-block"
                                            style={{ marginTop: '1rem' }}
                                            onClick={() => setStep(1)}
                                        >
                                            Back to Cart
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Summary */}
                        <div className="cart-summary-section">
                            <div className="order-summary">
                                <h2>Order Summary</h2>
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax (10%)</span>
                                    <span>${(calculateTotal() * 0.1).toFixed(2)}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>${(calculateTotal() * 1.1).toFixed(2)}</span>
                                </div>

                                {step === 1 && (
                                    <button
                                        className="btn btn-primary btn-block"
                                        onClick={handleProceedToCheckout}
                                        disabled={cart.length === 0}
                                    >
                                        Proceed to Checkout
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
