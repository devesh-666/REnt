import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { computers } from '../utils/dummyData';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import { Check, Calendar, HardDrive, Cpu, Layers, Monitor, ShoppingCart } from 'lucide-react';
import './RentalDetails.css';

const RentalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [computer, setComputer] = useState(null);
    const [duration, setDuration] = useState('day');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const found = computers.find(c => c.id === parseInt(id));
        if (found) {
            setComputer(found);
            setTotalPrice(found.price.day);
        } else {
            // Handle not found
            navigate('/rentals');
        }
    }, [id, navigate]);

    useEffect(() => {
        if (computer) {
            const price = computer.price[duration] * quantity;
            setTotalPrice(price);
        }
    }, [duration, quantity, computer]);

    const handleAddToCart = () => {
        addToCart(computer, duration, totalPrice);
        alert('Added to cart!');
        navigate('/cart');
    };

    if (!computer) return <div className="loading">Loading...</div>;

    return (
        <div className="rental-details-page">
            <div className="container">
                <div className="details-grid">
                    {/* Image Section */}
                    <div className="details-image-section">
                        <img src={computer.image} alt={computer.name} className="details-img" />
                        <div className={`status-badge-large ${computer.status.toLowerCase()}`}>
                            {computer.status}
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="details-info-section">
                        <span className="category-label">{computer.category}</span>
                        <h1 className="product-title">{computer.name}</h1>
                        <p className="product-brand">Brand: {computer.brand}</p>

                        <div className="specs-container">
                            <h3>Technical Specifications</h3>
                            <ul className="specs-list">
                                <li><Cpu size={18} /> {computer.specs.processor}</li>
                                <li><Layers size={18} /> {computer.specs.ram} RAM</li>
                                <li><HardDrive size={18} /> {computer.specs.storage}</li>
                                {computer.specs.display && <li><Monitor size={18} /> {computer.specs.display}</li>}
                                {computer.specs.gpu && <li><Monitor size={18} /> {computer.specs.gpu}</li>}
                            </ul>
                        </div>

                        <div className="rental-options">
                            <h3>Rental Options</h3>
                            <div className="duration-selector">
                                <button
                                    className={`duration-btn ${duration === 'day' ? 'active' : ''}`}
                                    onClick={() => setDuration('day')}
                                >
                                    Daily (${computer.price.day})
                                </button>
                                <button
                                    className={`duration-btn ${duration === 'week' ? 'active' : ''}`}
                                    onClick={() => setDuration('week')}
                                >
                                    Weekly (${computer.price.week})
                                </button>
                                <button
                                    className={`duration-btn ${duration === 'month' ? 'active' : ''}`}
                                    onClick={() => setDuration('month')}
                                >
                                    Monthly (${computer.price.month})
                                </button>
                            </div>

                            <div className="quantity-selector">
                                <label>Quantity:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                    className="quantity-input"
                                />
                            </div>

                            <div className="total-calculation">
                                <span>Total Price:</span>
                                <span className="total-price">${totalPrice}</span>
                            </div>

                            <div className="action-buttons">
                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={handleAddToCart}
                                    disabled={computer.status !== 'Available'}
                                >
                                    <ShoppingCart size={18} style={{ marginRight: '8px' }} />
                                    {computer.status === 'Available' ? 'Add to Rental Cart' : 'Currently Unavailable'}
                                </button>
                            </div>

                            <div className="features-list">
                                <p><Check size={16} color="green" /> Free technical support</p>
                                <p><Check size={16} color="green" /> Insurance included</p>
                                <p><Check size={16} color="green" /> Fast delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RentalDetails;
