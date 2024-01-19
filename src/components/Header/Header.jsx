import "./header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/img/marvelLogo.png";
// import ModalInscription from "../Modal/ModalInscription";

export default function Header({
  showInscriptionModal,
  setShowInscriptionModal,
  showConnexionModal,
  setShowConnexionModal,
}) {
  const [showLinks, setShowLinks] = useState(false);

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <header className="header">
      <div className="line">
        <div className="customer">
          <button
            onClick={() => {
              setShowConnexionModal(!showConnexionModal);
            }}
          >
            Connexion
          </button>
          <button
            onClick={() => {
              setShowInscriptionModal(!showInscriptionModal);
            }}
          >
            S'inscrire
          </button>
        </div>
        <div className="header-bar">
          <div className="navbar_logo">
            <img src={logo} alt="logo" />
          </div>
          <button className="navbar_burger" onClick={handleShowLinks}>
            <span className="burger-bar"></span>
          </button>
          <nav className={`burger_navbar ${showLinks ? "show-nav" : ""}`}>
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
            </ul>
          </nav>
          <div className="navbar_item">
            <Link className="favorites" to="/favorites">
              FAVORIS
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// import "./header.css";
// import { Link } from "react-router-dom";
// import { useState } from "react";
// import logo from "../../assets/img/marvelLogo.png";

// export default function Header({
//   showInscriptionModal,
//   setShowInscriptionModal,
//   showConnexionModal,
//   setShowConnexionModal,
// }) {
//   const [showLinks, setShowLinks] = useState(false);

//   const handleShowLinks = () => {
//     setShowLinks(!showLinks);
//   };

//   return (
//     <header className="header">
//       <div className="line">
//         <div className="customer">
//           <button
//             onClick={() => {
//               setShowConnexionModal(!showConnexionModal);
//             }}
//           >
//             Connexion
//           </button>
//           <button
//             onClick={() => {
//               setShowInscriptionModal(!showInscriptionModal);
//             }}
//           >
//             S'inscrire
//           </button>
//         </div>
//         <div className="header-bar">
//           <div className="navbar_logo">
//             <img src={logo} alt="logo" />
//           </div>
//           <button className="burger burger-menu" onClick={handleShowLinks}>
//             <span className="burger-bar"></span>
//           </button>
//           <nav className={`navbar ${showLinks ? "show-nav" : ""}`}>
//             <ul className="navbar_links">
//               <li className="navbar_item">
//                 <Link
//                   className="navbar_link"
//                   to="/characters"
//                   onClick={handleShowLinks}
//                 >
//                   PERSONNAGES
//                 </Link>
//               </li>
//               <li className="navbar_item">
//                 <Link
//                   className="navbar_link"
//                   to="/comics"
//                   onClick={handleShowLinks}
//                 >
//                   COMICS
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//           <div className="navbar_item">
//             <Link className="favorites" to="/favorites">
//               FAVORIS
//             </Link>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
