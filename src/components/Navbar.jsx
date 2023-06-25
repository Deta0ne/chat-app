import { useContext } from 'react';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
    const { girisKullanici } = useContext(AuthContext);

    return (
        <div className="navbar">
            <span className="logo">Mertys Chat</span>
            <div className="user">
                <img src={girisKullanici.photoURL} />
                <span>{girisKullanici.displayName}</span>
                <button onClick={() => signOut(auth)}>Çıkış</button>
            </div>
        </div>
    );
}
