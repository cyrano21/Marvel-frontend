import { useState } from "react";
import "./modal.css";
import { Link } from "react-router-dom";

const ModalConnexion = ({ setShowConnexionModal, onSignUpClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="modal-root">
      <div className="modal">
        <button
          className="close"
          onClick={() => {
            setShowConnexionModal(false);
          }}
        >
          <p>X</p>
        </button>

        <h2>Se connecter</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className="form-btn" type="submit">
              <Link to="/">Connexion</Link>
            </button>

            <p onClick={onSignUpClick}>s'inscrire</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalConnexion;
