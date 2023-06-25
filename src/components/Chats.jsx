import { useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthContext';

export default function Chats() {
    const [chat, setChat] = useState([]);
    const { girisKullanici } = useContext(AuthContext);

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

    return (
        <div className="chats" key={chat[0]}>
            {Object.entries(chat)?.map((chat) => (
                <div className="userChat">
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
