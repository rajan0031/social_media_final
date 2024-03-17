// components/Layout.js
import React from 'react';
import Footer from '../pages/Footer';
import NavBar from '../pages/NavBar';

function Layout({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />

            <main className="flex-1">
                {/* Main content area */}
                {children}
            </main>


        </div>
    );
}

export default Layout;
