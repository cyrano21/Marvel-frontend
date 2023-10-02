import "./header.css";
import logo from "../../assets/img/marvel-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// import ModalConnection from "./ModalConnection";
// import ModalInscription from "./ModalInscription";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  // 2. ModalConnection
  const ModalConnection = ({ fermer }) => {
    return (
      <div className="modal">
        <h2>Login</h2>
        <form action="">
          <input type="mail" placeholder="Email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit">Login</button>
          <button onClick={fermer}>Fermer</button>
        </form>
      </div>
    );
  };

  // 3. ModalInscription
  const ModalInscription = ({ fermer }) => {
    return (
      <div className="modal">
        <h2>Signup</h2>
        <form action="">
          <input type="text" name="username" placeholder="username" />
          <input type="email" name="mail" placeholder="Email" />
          <input type="password" name="password" placeholder="password" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
          />

          <button type="submit">Signup</button>
          <button onClick={fermer}>Fermer</button>
        </form>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`center ${scrolled ? "header-scrolled" : ""}`}>
      <div className="log">
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="logo"
        />
      </div>

      <div className="line">
        <div className="customer">
          <button onClick={() => setShowLoginModal(true)}>Login</button>
          <button onClick={() => setShowSignUpModal(true)}>Signup</button>
        </div>

        <nav>
          <Link className="characters" to="/characters">
            Characters
          </Link>
          <Link className="comics" to="/comics">
            Comics
          </Link>
          <Link className="favorites" to="/favorites">
            Favorites
          </Link>
        </nav>
      </div>

      <div className="search">{/* <SearchBarHeader /> */}</div>

      {showSignUpModal && (
        <div className="modal-overlay">
          <ModalInscription fermer={() => setShowSignUpModal(false)} />
        </div>
      )}
      {showLoginModal && (
        <div className="modal-overlay">
          <ModalConnection fermer={() => setShowLoginModal(false)} />
        </div>
      )}
    </header>
  );
}
