import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { ChatProvider } from './contexts/ChatContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
        <ChatProvider>
            <App />
        </ChatProvider>
    </AuthContextProvider>,
);
