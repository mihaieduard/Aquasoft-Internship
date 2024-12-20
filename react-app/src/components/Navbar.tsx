// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar: React.FC = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [token, setToken] = useState<string | null>(
//     localStorage.getItem("access_token")
//   );

//   const handleMenuToggle = () => {
//     setMenuOpen(!menuOpen);
//   };

//   // Actualizează token-ul la schimbările din localStorage
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setToken(localStorage.getItem("access_token"));
//     };

//     // Adaugă un event listener pentru modificările din localStorage
//     window.addEventListener("storage", handleStorageChange);

//     // Curăță event listener-ul la unmount
//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   // Funcție pentru logout
//   const handleLogout = () => {
//     localStorage.removeItem("access_token"); // Șterge token-ul din localStorage
//     setToken(null); // Actualizează starea token-ului
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="navbar-logo">
//           <Link to="/" className="navbar-logo-link">
//             MyHotelApp
//           </Link>
//         </div>
//         <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
//           <li>
//             <Link to="/" className="navbar-link">
//               Home
//             </Link>
//           </li>

//           {token ? (
//             <>
//               <li>
//                 <Link to="/profile" className="navbar-link">
//                   Profile
//                 </Link>
//               </li>
//               <li>
//                 <button onClick={handleLogout} className="navbar-link">
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <Link to="/auth/login" className="navbar-link">
//                   Login
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/auth/register" className="navbar-link">
//                   Register
//                 </Link>
//               </li>
//             </>
//           )}
//         </ul>
//         <button
//           className={`navbar-toggle ${menuOpen ? "active" : ""}`}
//           onClick={handleMenuToggle}
//         >
//           {menuOpen ? "Close" : "Menu"}
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role")); // Adăugăm un state pentru rol

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Actualizează token-ul și rolul la schimbările din localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("access_token"));
      setRole(localStorage.getItem("role")); // Actualizăm rolul
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Funcție pentru logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role"); // Ștergem și rolul
    setToken(null);
    setRole(null); // Actualizăm starea rolului
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">
            MyHotelApp
          </Link>
        </div>
        <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>

          {/* Verificăm dacă utilizatorul este logat și rolul acestuia */}
          {token ? (
            <>
              <li>
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>
              </li>
              {/* Afișăm link-uri diferite în funcție de rolul utilizatorului */}
              {role === "Administrator" && (
                <li>
                  <Link to="/admin" className="navbar-link">
                    Admin Dashboard
                  </Link>
                </li>
              )}

              {role === "Traveler" && (
                <li>
                  <Link to="/user/dashboard" className="navbar-link">
                    User Dashboard
                  </Link>
                </li>
              )}
              {role === "Hotel Manager" && (
                <li>
                  <Link to="/user/dashboard" className="navbar-link">
                    User Dashboard
                  </Link>
                </li>
              )}
              {role === "Group Manager" && (
                <li>
                  <Link to="/user/dashboard" className="navbar-link">
                    User Dashboard
                  </Link>
                </li>
              )}
              {role === "Data Operator" && (
                <li>
                  <Link to="/user/dashboard" className="navbar-link">
                    User Dashboard
                  </Link>
                </li>
              )}
              <li>
                <button onClick={handleLogout} className="navbar-link">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/auth/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="navbar-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        <button
          className={`navbar-toggle ${menuOpen ? "active" : ""}`}
          onClick={handleMenuToggle}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
