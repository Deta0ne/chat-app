import React from 'react';

export default function Navbar() {
    return (
        <div className="navbar">
            <span className="logo">Mertys Chat</span>
            <div className="user">
                <img src="https://images.pexels.com/photos/13160157/pexels-photo-13160157.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" />
                <span>Mert</span>
                <button>Çıkış</button>
            </div>
        </div>
    );
}
