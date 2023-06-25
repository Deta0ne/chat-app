import { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { ChatContext } from '../contexts/ChatContext';

export default function Messages() {
    const [mesajlar, setMesajlar] = useState([]);
    const { data } = useContext(ChatContext);
    useEffect(() => {
        console.log(data);
        const unsub = onSnapshot(doc(db, 'sohbetler', data.chatId), (doc) => {
            doc.exists() && setMesajlar(doc.data().mesajlar);
        });

        return () => {
            unsub();
        };
    }, [data.chatId]);

    return (
        <div className="messages">
            {mesajlar.map((m, index) => (console.log(m.id), (<Message mesaj={m} key={index} />)))}
        </div>
    );
}
