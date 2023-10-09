import { useState } from "react";
import "./modal.css";

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
          <div className="form-btn">
            <button type="submit">Connexion</button>

            <button></button>

            <p onClick={onSignUpClick}>s'inscrire</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalConnexion;
