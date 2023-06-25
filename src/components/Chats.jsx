import React from 'react';

export default function Chats() {
    return (
        <div className="chats">
            <div className="userChat">
                <img
                    src="https://images.pexels.com/photos/13160157/pexels-photo-13160157.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Mert</span>
                    <p>Son Mesaj</p>
                </div>
            </div>
            <div className="userChat">
                <img
                    src="https://images.pexels.com/photos/13160157/pexels-photo-13160157.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Cuma</span>
                    <p>İkinci Mesaj</p>
                </div>
            </div>
            <div className="userChat">
                <img
                    src="https://images.pexels.com/photos/13160157/pexels-photo-13160157.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                    alt=""
                />
                <div className="userChatInfo">
                    <span>Yıldız</span>
                    <p>Üçüncü Mesaj</p>
                </div>
            </div>
        </div>
    );
}
