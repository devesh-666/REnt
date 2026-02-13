import React, { useState, useEffect } from 'react';
import ComputerCard from '../components/ComputerCard';
import { computers } from '../utils/dummyData';
import Footer from '../components/Footer';
import './Rentals.css';

const Rentals = () => {
    const [filteredComputers, setFilteredComputers] = useState(computers);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [maxPrice, setMaxPrice] = useState(200);

    // Extract unique categories and brands for filter options
    const categories = ['All', ...new Set(computers.map(c => c.category))];
    const brands = ['All', ...new Set(computers.map(c => c.brand))];

    useEffect(() => {
        let result = computers;

        // Filter by search term
        if (searchTerm) {
            result = result.filter(c =>
                c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.specs.processor.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== 'All') {
            result = result.filter(c => c.category === selectedCategory);
        }

        // Filter by brand
        if (selectedBrand !== 'All') {
            result = result.filter(c => c.brand === selectedBrand);
        }

        // Filter by price
        result = result.filter(c => c.price.day <= maxPrice);

        setFilteredComputers(result);
    }, [searchTerm, selectedCategory, selectedBrand, maxPrice]);

    return (
        <div className="rentals-page">
            <div className="rentals-header">
                <div className="container">
                    <h1>Find Your Perfect Rental</h1>
                    <p>Browse our extensive collection of high-performance computers</p>
                </div>
            </div>

            <div className="container rentals-content">
                {/* Filters Sidebar (or top bar for simplicity on mobile) */}
                <div className="filters-section">
                    <div className="filter-group search-group">
                        <input
                            type="text"
                            placeholder="Search computers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-row">
                        <div className="filter-group">
                            <label>Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="filter-select"
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Brand</label>
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="filter-select"
                            >
                                {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>Max Price / Day: ${maxPrice}</label>
                            <input
                                type="range"
                                min="0"
                                max="200"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="price-range"
                            />
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="results-info">
                    Showing {filteredComputers.length} results
                </div>

                {filteredComputers.length > 0 ? (
                    <div className="grid rentals-grid">
                        {filteredComputers.map(computer => (
                            <ComputerCard key={computer.id} computer={computer} />
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <h3>No computers found matching your criteria.</h3>
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('All');
                                setSelectedBrand('All');
                                setMaxPrice(200);
                            }}
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Rentals;
