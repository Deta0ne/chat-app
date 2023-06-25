import React from 'react';
import Messages from './Messages';
import Input from './Input';

export default function Chat() {
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>Ben</span>
            </div>
            <Messages />
            <Input />
        </div>
    );
}
