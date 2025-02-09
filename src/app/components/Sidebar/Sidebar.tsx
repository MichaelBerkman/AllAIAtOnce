import React, { useState } from 'react';
import './sidebar.css';

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return isOpen ? (
        <div className="sidebar">
            <button className="sidebar-close" onClick={handleClose}>
                ×
            </button>
            <div className="sidebar-header">
                <h1></h1>
            </div>
            <nav className="sidebar-nav">
                <button className="sidebar-item">Chat History</button>
            </nav>
            <div className="sidebar-footer">
                <button className="sidebar-item">Settings</button>
            </div>
        </div>
    ) : null; // Sidebar will disappear when closed
};

export default Sidebar;
