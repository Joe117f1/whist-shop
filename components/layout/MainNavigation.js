import { useState, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MobileMenu from './MobileMenu';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const router = useRouter();
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const isAdmin = router.pathname === '/admin';

  const addActiveClass = path => {
    return (router.pathname === path) ? classes.marked : '';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  return (
    <Fragment>
      <header className={classes.header}>
        <nav>
          <ul>
            <li >
              <Link href='/' >
                <a className={addActiveClass('/')}>Admin</a>
              </Link>
            </li>
            <li >
              <Link href='/home' >
                <a className={addActiveClass('/home')}>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/stats'>
                <a className={addActiveClass('/stats')}>Stats</a>
              </Link>
            </li>
            {isAdmin && <li>
              <button>Add Product</button>
            </li>}
          </ul>
          <button className={classes.btn} onClick={toggleMobileMenu}>
            |||
            {/* TODO: real burger icon, like:  <FontAwesomeIcon icon={faBars} /> */}
          </button>
        </nav>
      </header>
      {isMobileMenu && <MobileMenu onToggleMenu={toggleMobileMenu} />}
    </Fragment>
  );
};

export default MainNavigation;
