import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import './style.scss';

function App() {
    const { girisKullanici } = useContext(AuthContext);

    const YönlendirmeKontrol = ({ children }) => {
        if (!girisKullanici) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={
                            <YönlendirmeKontrol>
                                <Home />
                            </YönlendirmeKontrol>
                        }
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
