import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/images/Bomblise.png";
import { useContext, useEffect } from "react";
import { AppState } from "../../Context/DataContext";
function Header() {
  const { user, setUser } = useContext(AppState);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(true);
    }
  }, [user]);
  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
  };
  return (
    <>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="patients" className={styles.link}>
            Patients
          </Link>
          {user ? (
            <Link onClick={() => logout()} className={styles.link}>
              Logout
            </Link>
          ) : (
            <Link to="login" className={styles.link}>
              Login
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
