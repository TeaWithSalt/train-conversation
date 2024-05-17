import styles from "./Header.module.css";
import {Link} from "react-router-dom";
import Logo from "../../../../assets/images/LightLogo.svg"
import {useAuth} from "../../../../hooks/use-auth";
import clsx from "clsx";

function Header() {
    const auth = useAuth()

    return (
        <header className={styles.navbar}>
            <nav className={styles.navbarContainer}>
                <Link className={styles.homeLink} to="/">
                    <div className={styles.navbarLogo}><img src={Logo} alt={"logo"}/></div>
                </Link>
                <button type="button" className={styles.navbarToggle} id="navbar-toggle" aria-controls="navbar-menu"
                        aria-label="Toggle menu"
                        aria-expanded="false">
                    <span className={styles.iconBar}></span>
                    <span className={styles.iconBar}></span>
                    <span className={styles.iconBar}></span>
                </button>

                <div id="navbar-menu" aria-labelledby="navbar-toggle">
                    <ul className={styles.navbarLinks}>
                        <>
                            <li className={styles.navbarItem}>
                                <Link className={styles.navbarLink} to="/">
                                    Продукт
                                </Link>
                            </li>
                            <li className={styles.navbarItem}>
                                <Link className={styles.navbarLink} to="/">
                                    Обновления
                                </Link>
                            </li>
                            <li className={styles.navbarItem}>
                                <Link className={styles.navbarLink} to="/">
                                    О нас
                                </Link>
                            </li>
                        </>
                    </ul>
                </div>

                <div id="navbar-menu" aria-labelledby="navbar-toggle" className={styles.navbarLastContainer}>
                    <ul className={styles.navbarLinks}>
                        {
                            !auth.isAuth &&
                            <li className={styles.navbarItem}>
                                <Link className={styles.navbarLink} to="/login">
                                    Войти
                                </Link>
                            </li>
                        }
                        <li className={styles.navbarItem}>
                            {
                                auth.isAuth ?
                                    <Link
                                        className={clsx(styles.navbarLink, styles.navbarLink__highlight)}
                                        to="/home"
                                    >
                                        Перейти в сервис
                                    </Link> :
                                    <Link
                                        className={clsx(styles.navbarLink, styles.navbarLink__highlight)}
                                        to="/registration"
                                    >
                                        Начать работу
                                    </Link>
                            }
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;
