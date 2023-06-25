import { useState, useContext } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, getDoc, doc, updateDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { AuthContext } from '../contexts/AuthContext';

export default function Search() {
    const [arananKullanici, setArananKullanici] = useState('');
    const [kullanici, setKullanici] = useState(null);
    const [hata, setHata] = useState(false);

    const { girisKullanici } = useContext(AuthContext);

    const handleAra = async () => {
        const q = query(collection(db, 'kullanicilar'), where('kullaniciAdi', '==', arananKullanici));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setKullanici(doc.data());
            });
        } catch (error) {
            setHata(error);
        }
    };

    const handleKey = (e) => {
        e.code === 'Enter' && handleAra();
    };

    const handleSec = async () => {
        const birlerştirilmişId =
            girisKullanici.uid > kullanici.uid
                ? girisKullanici.uid + kullanici.uid
                : kullanici.uid + girisKullanici.uid;

        try {
            const response = await getDoc(doc(db, 'sohbetler', birlerştirilmişId));
            if (!response.exists()) {
                await setDoc(doc(db, 'sohbetler', birlerştirilmişId), { mesajlar: [] });

                await updateDoc(doc(db, 'kullaniciChatler', girisKullanici.uid), {
                    [birlerştirilmişId + '.kullaniciBilgi']: {
                        uid: kullanici.uid,
                        kullaniciAdi: kullanici.kullaniciAdi,
                        fotoURLD: kullanici.fotoURLD,
                    },
                    [birlerştirilmişId + '.tarih']: serverTimestamp(),
                });
                await updateDoc(doc(db, 'kullaniciChatler', kullanici.uid), {
                    [birlerştirilmişId + '.kullaniciBilgi']: {
                        uid: girisKullanici.uid,
                        kullaniciAdi: girisKullanici.displayName,
                        fotoURLD: girisKullanici.photoURL,
                    },
                    [birlerştirilmişId + '.tarih']: serverTimestamp(),
                });
            }
        } catch (error) {}
        setKullanici(null);
        setArananKullanici('');
    };

    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Kullanıcı Ara"
                    onKeyDown={handleKey}
                    onChange={(e) => setArananKullanici(e.target.value)}
                    value={arananKullanici}
                />
            </div>
            {hata && <p>Kullanıcı Bulunamadı</p>}
            {kullanici && (
                <div className="userChat" onClick={handleSec}>
                    <img src={kullanici.fotoURLD} />
                    <div className="userChatInfo">
                        <span>{kullanici.kullaniciAdi}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
