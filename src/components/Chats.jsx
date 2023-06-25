import { useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';

export default function Chats() {
    const [chat, setChat] = useState([]);
    const { girisKullanici } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'kullaniciChatler', girisKullanici.uid), (doc) => {
                setChat(doc.data());
            });
            return () => {
                unsub();
            };
        };
        girisKullanici.uid && getChats();
    }, [girisKullanici.uid]);

    const handleSec = (k) => {
        dispatch({ type: 'CHANGE_USER', payload: k });
    };

    return (
        <div className="chats">
            {Object.entries(chat)
                ?.sort((a, b) => b[1].tarih - a[1].tarih)
                .map((chat) => (
                    <div className="userChat" key={chat[0]} onClick={() => handleSec(chat[1].kullaniciBilgi)}>
                        <img src={chat[1].kullaniciBilgi.fotoURLD} alt="" />
                        <div className="userChatInfo">
                            <span>{chat[1].kullaniciBilgi.kullaniciAdi}</span>
                            <p>{chat[1].sonMesaj?.text}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
}
