import { useContext, useState } from 'react';
import Img from '../img/img.png';
import Attach from '../img/attach.png';
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';
import { db, storage } from '../firebase/config';
import { doc, updateDoc, Timestamp, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export default function Input() {
    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

    const { girisKullanici } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());
            await uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDoc(doc(db, 'sohbetler', data.chatId), {
                        mesajlar: arrayUnion({
                            id: uuid(),
                            text,
                            gonderenId: girisKullanici.uid,
                            tarih: Timestamp.now(),
                            resim: downloadURL,
                        }),
                    });
                });
            });
        } else {
            await updateDoc(doc(db, 'sohbetler', data.chatId), {
                mesajlar: arrayUnion({
                    id: uuid(),
                    text,
                    gonderenId: girisKullanici.uid,
                    tarih: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, 'kullaniciChatler', girisKullanici.uid), {
            [data.chatId + '.sonMesaj']: {
                text,
            },
            [data.chatId + '.tarih']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'kullaniciChatler', data.user.uid), {
            [data.chatId + '.sonMesaj']: {
                text,
            },
            [data.chatId + '.tarih']: serverTimestamp(),
        });

        setText('');
        setImg(null);
    };

    return (
        <div className="input">
            <input
                type="text"
                placeholder="Mesajınızı Yazınız"
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <div className="send">
                <img src={Attach} alt="" />
                <input type="file" style={{ display: 'none' }} id="file" onChange={(e) => setImg(e.target.files[0])} />
                <label htmlFor="file">
                    <img src={Img} alt="" />
                </label>
                <button onClick={handleSend}>Gönder</button>
            </div>
        </div>
    );
}
