import Link from 'next/link';
import React from 'react';
import './Header.css'

const Header: React.FC = () => {
    return (
        <header className="main-header">
            <Link href="/" className="header-link">
                Home
            </Link>
            <div className="header-link"> AI HUB </div>
            
        </header>
    );
};

export default Header;