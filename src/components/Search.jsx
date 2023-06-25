import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Search() {
    const [arananKullanici, setArananKullanici] = useState('');
    const [kullanici, setKullanici] = useState(null);
    const [hata, setHata] = useState(false);

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
                <div className="userChat">
                    <img src={kullanici.fotoURLD} />
                    <div className="userChatInfo">
                        <span>{kullanici.kullaniciAdi}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
