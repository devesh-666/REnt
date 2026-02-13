import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (computer, duration, itemPrice) => {
        setCart((prevCart) => {
            const existing = prevCart.find(
                (item) => item.id === computer.id && item.selectedDuration === duration
            );
            if (existing) {
                return prevCart.map((item) =>
                    item.uniqueId === existing.uniqueId
                        ? { ...item, quantity: item.quantity + 1, itemPrice: item.itemPrice + itemPrice }
                        : item
                );
            }
            const newItem = {
                ...computer,
                uniqueId: Date.now(),
                selectedDuration: duration,
                itemPrice: itemPrice,
                quantity: 1
            };
            return [...prevCart, newItem];
        });
    };

    const removeFromCart = (uniqueId) => {
        setCart((prevCart) => prevCart.filter((item) => item.uniqueId !== uniqueId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.itemPrice, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, calculateTotal }}>
            {children}
        </CartContext.Provider>
    );
};
