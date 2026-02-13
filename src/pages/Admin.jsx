import React, { useState, useEffect } from 'react';
import { computers as defaultComputers } from '../utils/dummyData';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import { Plus, Trash, Edit, Users, ShoppingBag, BarChart2 } from 'lucide-react';
import './Admin.css';

const Admin = () => {
    const { user } = useAuth();
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem('adminComputers');
        return saved ? JSON.parse(saved) : defaultComputers;
    });
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        category: 'Laptops',
        brand: '',
        price: '',
        image: '',
        status: 'Available'
    });

    useEffect(() => {
        localStorage.setItem('adminComputers', JSON.stringify(items));
    }, [items]);

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0).toFixed(2);
    const activeRentals = orders.filter(o => o.status === 'Active').length;

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        const newComputer = {
            id: Date.now(),
            ...newItem,
            price: { day: Number(newItem.price), week: Number(newItem.price) * 5, month: Number(newItem.price) * 20 },
            specs: { processor: 'New Spec', ram: '8GB' }
        };
        setItems([...items, newComputer]);
        setShowModal(false);
        setNewItem({ name: '', category: 'Laptops', brand: '', price: '', image: '', status: 'Available' });
    };

    return (
        <div className="admin-page">
            <div className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>Admin Panel</h2>
                    {user && <p style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '0.25rem' }}>{user.email}</p>}
                </div>
                <ul className="sidebar-menu">
                    <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
                        <BarChart2 size={20} /> Dashboard
                    </li>
                    <li className={activeTab === 'computers' ? 'active' : ''} onClick={() => setActiveTab('computers')}>
                        <Edit size={20} /> Computers
                    </li>
                    <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
                        <ShoppingBag size={20} /> Orders
                    </li>
                    <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
                        <Users size={20} /> Users
                    </li>
                </ul>
            </div>

            <div className="admin-content">
                {activeTab === 'dashboard' && (
                    <div className="dashboard-stats">
                        <div className="stat-card">
                            <h3>Total Revenue</h3>
                            <p className="stat-value">${totalRevenue}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Active Rentals</h3>
                            <p className="stat-value">{activeRentals}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Available Computers</h3>
                            <p className="stat-value">{items.filter(i => i.status === 'Available').length}</p>
                        </div>
                        <div className="stat-card">
                            <h3>Total Users</h3>
                            <p className="stat-value">{registeredUsers.length}</p>
                        </div>
                    </div>
                )}

                {activeTab === 'computers' && (
                    <div className="computers-management">
                        <div className="page-header">
                            <h2>Manage Computers</h2>
                            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                                <Plus size={18} /> Add New
                            </button>
                        </div>

                        <div className="table-container">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Price/Day</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map(item => (
                                        <tr key={item.id}>
                                            <td>#{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>
                                                <span className={`status-badge-sm ${item.status.toLowerCase()}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td>${item.price.day}</td>
                                            <td>
                                                <button className="icon-btn delete" onClick={() => handleDelete(item.id)}>
                                                    <Trash size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="orders-management">
                        <h2>Recent Orders</h2>
                        {orders.length === 0 ? (
                            <p style={{ padding: '2rem', opacity: 0.6 }}>No orders yet.</p>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>User</th>
                                        <th>Items</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>#{order.id}</td>
                                            <td>{order.user.name}</td>
                                            <td>{order.items.map(i => i.name).join(', ')}</td>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                            <td><span className={`status-pill ${order.status.toLowerCase()}`}>{order.status}</span></td>
                                            <td>${order.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="users-management">
                        <h2>Registered Users</h2>
                        {registeredUsers.length === 0 ? (
                            <p style={{ padding: '2rem', opacity: 0.6 }}>No registered users yet.</p>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registeredUsers.map((u, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{u.name}</td>
                                            <td>{u.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Add New Computer</h2>
                        <form onSubmit={handleAddItem}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })}>
                                    <option>Laptops</option>
                                    <option>Desktops</option>
                                    <option>Gaming PCs</option>
                                    <option>Workstations</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Brand</label>
                                <input type="text" value={newItem.brand} onChange={e => setNewItem({ ...newItem, brand: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Daily Price ($)</label>
                                <input type="number" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} required />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Add Computer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
