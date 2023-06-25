import React from 'react';

export default function Search() {
    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="Kullanıcı Ara" />
            </div>
            <div className="userChat">
                <img src="https://images.pexels.com/photos/13160157/pexels-photo-13160157.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" />
                <div className="userChatInfo">
                    <span>Mert</span>
                </div>
            </div>
        </div>
    );
}
