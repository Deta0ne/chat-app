import { useState } from 'react';
import Add from '../img/addAvatar.png';
import { auth, storage, db } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [hata, setHata] = useState(false);
    const [yükleniyor, setYükleniyor] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setYükleniyor(true);
        setHata(false);

        const kullaniciAdi = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const avatar = e.target[3].files[0];

        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            const date = new Date().getTime();
            const storageRef = ref(storage, `${kullaniciAdi + date}`);

            await uploadBytesResumable(storageRef, avatar).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(response.user, {
                            displayName: kullaniciAdi,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, 'kullanicilar', response.user.uid), {
                            uid: response.user.uid,
                            kullaniciAdi,
                            email,
                            fotoURLD: downloadURL,
                        });
                        await setDoc(doc(db, 'kullaniciChatler', response.user.uid), {});
                        navigate('/');
                    } catch (error) {
                        setHata(error.message);
                        setYükleniyor(false);
                    }
                });
            });
            setYükleniyor(false);
        } catch (error) {
            setHata(error.message);
            setYükleniyor(false);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Mertys Chat Uygulaması</span>
                <span className="title"> Üye Ol</span>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder="Kullanıcı Adınız" />
                    <input required type="text" placeholder="Email Adresiniz" />
                    <input required type="password" placeholder="Parolanız" />
                    <input required style={{ display: 'none' }} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={Add} />
                        <span>Avatar Ekle</span>
                    </label>
                    <button disabled={yükleniyor}>Üye Ol</button>
                    {yükleniyor && <span>Üyelik Oluşturuluyor...</span>}
                    {hata && <p>{hata}</p>}
                </form>
                {!yükleniyor && (
                    <p>
                        Üyeliğiniz bulunuyorsa <Link to="/login">Giriş Yapınız</Link>
                    </p>
                )}
            </div>
        </div>
    );
}
