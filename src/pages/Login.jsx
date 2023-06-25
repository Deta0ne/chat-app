export default function Login() {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Mertys Chat Uygulaması</span>
                <span className="title"> Giriş</span>
                <form>
                    <input required type="text" placeholder="Email Adresiniz" />
                    <input required type="text" placeholder="Parolanız" />
                    <button>Giriş Yap</button>
                </form>
                <p>
                    Üyeliğiniz bulunmuyorsa <a>Üye Olunuz</a>
                </p>
            </div>
        </div>
    );
}
