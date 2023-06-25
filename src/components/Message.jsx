import React from 'react';
import resim from '../img/Avatar2.png';
export default function Message() {
    return (
        <div className="message owner">
            <div className="messageInfo">
                <img src={resim} alt="" />
                <span>Biraz önce</span>
            </div>
            <div className="messageContent">
                <p>Merhaba</p>
            </div>
        </div>
    );
}
