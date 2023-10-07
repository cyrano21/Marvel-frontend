import "./header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/img/marvelLogo.png";
export default function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

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
          <button type="button" onClick={fermer}>
            Fermer
          </button>
        </form>
      </div>
    );
  };

  return (
    <header className="header">
      <div className="line">
        <div className="customer">
          <button className="form" onClick={() => setShowLoginModal(true)}>
            connexion
          </button>
          <button className="form" onClick={() => setShowSignUpModal(true)}>
            S'enregistrer
          </button>
        </div>
        <div className="header-bar">
          <div className="navbar_logo">
            <img src={logo} alt="logo" />
          </div>
          <button className="navbar_burger" onClick={handleShowLinks}>
            <span className="burger-bar"></span>
          </button>
          <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>
            <ul className="navbar_links">
              <li className="navbar_item">
                <Link
                  className="navbar_link"
                  to="/characters"
                  onClick={handleShowLinks}
                >
                  PERSONNAGES
                </Link>
              </li>
              <li className="navbar_item">
                <Link
                  className="navbar_link"
                  to="/comics"
                  onClick={handleShowLinks}
                >
                  COMICS
                </Link>
              </li>
              {/* <li className="navbar_item">
                <a
                  className="navbar_link"
                  href="/apropos"
                  onClick={handleShowLinks}
                >
                  A propos
                </a>
              </li> */}
              {/* <li className="navbar_item">
                <a
                  className="navbar_link"
                  href="/contact"
                  onClick={handleShowLinks}
                >
                  Contact
                </a>
              </li> */}
            </ul>
          </nav>
          <div className="navbar_item">
            <Link className="favorites" to="/favorites">
              FAVORIS
            </Link>
          </div>
        </div>
      </div>

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
