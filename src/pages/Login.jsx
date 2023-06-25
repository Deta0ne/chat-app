import { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [hata, setHata] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setHata(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Mertys Chat Uygulaması</span>
                <span className="title"> Giriş</span>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder="Email Adresiniz" />
                    <input required type="password" placeholder="Parolanız" />
                    <button>Giriş Yap</button>
                    {hata && <p>Email veya Parola Hatalı</p>}
                </form>
                <p>
                    Üyeliğiniz bulunmuyorsa <Link to="/register">Üye Olunuz</Link>
                </p>
            </div>
        </div>
    );
}
